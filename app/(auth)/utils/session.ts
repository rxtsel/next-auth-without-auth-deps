import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const { SESSION_SECRET } = process.env;

const secretKey = SESSION_SECRET!;
const encodeKey = new TextEncoder().encode(secretKey);

/**
 * Creates a new session for a user and sets a session cookie.
 *
 * @param params - The parameters for creating a session.
 * @param params.userId - The ID of the user.
 * @param params.remember - A boolean indicating whether the session should last for 30 days (true) or 1 day (false).
 * @returns A promise that resolves when the session has been created and the cookie has been set.
 */
export async function createSession({
  userId,
  remember,
}: {
  userId: string;
  remember?: boolean;
}) {
  const ONE_DAY = 60 * 60 * 24 * 1000;
  const THIRTY_DAYS = ONE_DAY * 30;

  const expiresAt = remember
    ? new Date(Date.now() + THIRTY_DAYS)
    : new Date(Date.now() + ONE_DAY);

  const session = await encryptSession({
    userId,
    expiresAt,
  });

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: true,
  });
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

/**
 * Encrypts a session payload into a JSON Web Token (JWT).
 *
 * @param session - The session payload to be encrypted.
 * @returns A promise that resolves to the signed JWT.
 */
export async function encryptSession(session: SessionPayload) {
  const jwt = await new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(session.expiresAt.getTime())
    .sign(encodeKey);

  return jwt;
}

/**
 * Decrypts a session token and verifies its authenticity.
 *
 * @param session - The session token to be decrypted. Defaults to an empty string if undefined.
 * @returns A promise that resolves to the payload of the decrypted session token, or undefined if an error occurs.
 */
export async function decryptSession(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log(
      "[DECRIPT_SESSION]: An error occurred while verify session. ",
      error,
    );
  }
}
