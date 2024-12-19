"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(undefined); // undefined initially to avoid SSR mismatch

  useEffect(() => {
    const storedToken = globalThis?.window?.localStorage?.getItem('token');
    setToken(storedToken);

    if (!storedToken) {
      router.push("/signin");
    }
  }, [router]);

  // Render nothing while checking token to avoid mismatched UI
  if (token === undefined) return null;

  return token ? children : null;
};

export default ProtectedRoute;
