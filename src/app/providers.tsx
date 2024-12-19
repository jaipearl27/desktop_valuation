"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="className"
        enableSystem={false}
        defaultTheme="dark"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
