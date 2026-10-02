"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAnimations } from "gclass-anims";
import "./copy.js";

// The root layout persists across navigations, so re-init per pathname.
export default function AnimInit() {
  const pathname = usePathname();

  useEffect(() => {
    initAnimations();
  }, [pathname]);

  return null;
}
