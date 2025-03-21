"use client";

import { useEffect } from "react";

export default function InitTheme() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    if (document.documentElement.getAttribute("data-theme") !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  return null;
}
