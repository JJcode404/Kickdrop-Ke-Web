import bcrypt from "bcryptjs";

const ROUNDS = 12;

export function hashPassword(plain) {
  return bcrypt.hash(plain, ROUNDS);
}

/* bcrypt.compare is constant-time for a given hash, so it does not leak
   password length or content via timing. */
export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}
