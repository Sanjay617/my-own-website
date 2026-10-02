"use client";

import { useEffect } from "react";

let greeted = false;

// A hello for anyone who opens the browser's developer console.
export default function ConsoleGreeting({ repo }: { repo: string }) {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      "%c> hello, fellow dev 👋",
      "color:#22d3ee;font-family:monospace;font-size:14px;font-weight:bold",
    );
    console.log(`This site is open source: ${repo}\nPress \` on the page to open the terminal.`);
  }, [repo]);

  return null;
}
