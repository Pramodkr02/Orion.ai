import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

/**
 * Retrieves the session from cookies in Server Components / API Routes.
 * NOT compatible with Middleware.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
