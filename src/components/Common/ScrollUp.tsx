"use client";

import { useEffect } from "react";

export default function ScrollUp() {
  useEffect(() => globalThis?.window.document.scrollingElement?.scrollTo(0, 0), []);

  return null;
}
