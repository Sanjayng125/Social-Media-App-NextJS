"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return;

  if (resolvedTheme === "dark") {
    return <FiSun onClick={() => setTheme("light")} className="text-3xl" />;
  }
  if (resolvedTheme === "light") {
    return <FiMoon onClick={() => setTheme("dark")} className="text-3xl" />;
  }
};

export default ThemeSwitch;
