// Home-screen icon for iPhones/iPads: the same ">_" mark as icon.svg.
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0a0a" }}>
        <svg viewBox="0 0 32 32" width="180" height="180">
          <path d="M8 10l6 6-6 6" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 22h8" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
