"use client";

import { createContext, type ReactNode } from "react";
import type { SessionUser } from "../lib/auth";

export const AuthContext = createContext<{ user?: SessionUser }>({});

export function AuthProvider({ user, children }: { user?: SessionUser; children: ReactNode }) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
