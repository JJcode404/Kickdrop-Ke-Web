# Kickdrop KE — API server

Secure Express + Prisma (PostgreSQL) backend for the Kickdrop storefront.

## Stack

- **Express 4** — HTTP layer
- **Prisma 6** — type-safe DB access (no raw SQL, so no SQL injection)
- **PostgreSQL** — data store
- **JWT + bcrypt** — auth

## Setup

```bash
cd server
npm install
cp .env.example .env          # then fill in real secrets
npm run prisma:generate       # generate the Prisma client
npm run prisma:migrate        # create tables (dev)
npm run seed                  # load the product catalogue from ../src/data
npm run dev                   # start on http://localhost:4000
```

## Security measures

| Concern | Mitigation |
| --- | --- |
| Password storage | bcrypt, cost factor 12 |
| Session tokens | Short-lived access JWT (15m) + rotating refresh token (7d) |
| Token theft | Tokens in `httpOnly` + `SameSite` cookies; refresh tokens stored only as SHA-256 hashes and rotated on every use |
| CSRF | Double-submit token (`kd_csrf` cookie + `X-CSRF-Token` header), timing-safe compare |
| Brute force | Per-IP+email rate limit on `/auth` (10 / 15 min); global limit 300 / 15 min |
| Injection | Prisma parameterised queries + Zod validation on every body/query/param |
| Header attacks | Helmet with a locked-down CSP |
| CORS | Strict origin allow-list, credentials on |
| Payload DoS | 16 kb JSON body cap |
| Price tampering | Order totals recomputed server-side from DB prices |
| Info leaks | Generic auth errors; unknown-error details hidden in production |
| Config safety | Env validated at boot (Zod); server refuses to start if misconfigured |

## Endpoints

```
GET    /api/health
GET    /api/csrf                 → { csrfToken }  (also sets kd_csrf cookie)

POST   /api/auth/register        { name, email, password }
POST   /api/auth/login           { email, password }
POST   /api/auth/refresh         (uses refresh cookie)
POST   /api/auth/logout
GET    /api/auth/me              (auth)

GET    /api/products             ?brand&q&sort&limit&offset
GET    /api/products/:id

POST   /api/orders               { customerName, phone, note?, items[] }   (guest or auth)
GET    /api/orders               (auth) → own orders
GET    /api/orders/:id           (auth)

GET    /api/wishlist             (auth)
POST   /api/wishlist             { productId }  (auth)
DELETE /api/wishlist/:id         (auth)  — :id is the productId
```

### Frontend usage

Send `credentials: "include"` on every fetch. Before any POST/PUT/PATCH/DELETE,
fetch `/api/csrf` once, read the `csrfToken`, and send it as the `X-CSRF-Token`
header. On a 401 from an authed call, hit `/api/auth/refresh` then retry.
