/**
 * Thin client for the Kickdrop API.
 *
 * - Sends the session cookies on every request (`credentials: "include"`).
 * - Primes and caches a CSRF token, echoed back on mutating requests.
 * - Transparently refreshes an expired access token once, then retries.
 *
 * Override the base URL in production with VITE_API_URL.
 */
const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

// Endpoints where a 401 is a real answer (bad credentials / no session),
// not a signal to attempt a token refresh.
const NO_REFRESH = new Set([
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/logout",
]);

let csrfToken = null;
let csrfInFlight = null;

async function getCsrfToken() {
  if (csrfToken) return csrfToken;
  if (!csrfInFlight) {
    csrfInFlight = fetch(`${BASE}/api/csrf`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        csrfToken = d.csrfToken;
        return csrfToken;
      })
      .finally(() => {
        csrfInFlight = null;
      });
  }
  return csrfInFlight;
}

async function refreshSession() {
  try {
    const res = await fetch(`${BASE}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "X-CSRF-Token": await getCsrfToken() },
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function request(path, { method = "GET", body, retry = true } = {}) {
  const headers = {};
  const opts = { method, credentials: "include", headers };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  if (method !== "GET" && method !== "HEAD") {
    headers["X-CSRF-Token"] = await getCsrfToken();
  }

  const res = await fetch(`${BASE}${path}`, opts);

  if (res.status === 401 && retry && !NO_REFRESH.has(path)) {
    if (await refreshSession()) {
      return request(path, { method, body, retry: false });
    }
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError(res.status, data?.error || `Request failed (${res.status})`, data?.details);
  }
  return data;
}

export const api = {
  // Auth
  register: (body) => request("/api/auth/register", { method: "POST", body }),
  login: (body) => request("/api/auth/login", { method: "POST", body }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  me: () => request("/api/auth/me"),

  // Wishlist (all require a session)
  getWishlist: () => request("/api/wishlist"),
  addWishlist: (productId) => request("/api/wishlist", { method: "POST", body: { productId } }),
  removeWishlist: (productId) =>
    request(`/api/wishlist/${encodeURIComponent(productId)}`, { method: "DELETE" }),

  // Orders (available for a future checkout form)
  createOrder: (body) => request("/api/orders", { method: "POST", body }),
  listOrders: () => request("/api/orders"),
};
