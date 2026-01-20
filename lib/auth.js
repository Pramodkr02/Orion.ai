import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key-change-this-in-production";
const key = new TextEncoder().encode(SECRET_KEY);

/**
 * Encrypts a payload into a JWT.
 * Compatible with Edge Runtime.
 */
export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

/**
 * Decrypts a JWT into a payload.
 * Compatible with Edge Runtime.
 */
export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Updates the session expiration (Rolling Session).
 * Compatible with Middleware (takes NextRequest).
 */
export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Verify and parse
  const parsed = await decrypt(session);
  if (!parsed) return;
  
  // Extend expiration
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // +24 hours
  
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}