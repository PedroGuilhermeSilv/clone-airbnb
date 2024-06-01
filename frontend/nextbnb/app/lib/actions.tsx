"use server";
import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  acessToken: string,
  refreshToken: string
) {
  cookies().set("session_userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookies().set("session_access_token", acessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });

  cookies().set("session_refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function resetAuthCookies() {
  cookies().set("session_userId", "");
  cookies().set("session_access_token", "");
  cookies().set("session_refresh_token", "");
}

export async function getUserId() {
  const user = cookies().get("session_userId")?.value;

  return user ? user : null;
}
