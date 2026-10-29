// The preview card shown when the site is shared on LinkedIn, Slack, iMessage, etc.
import { ImageResponse } from "next/og";
import { profile } from "@/data/resume";
import { site } from "@/data/config";

export const alt = `${profile.name}: ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#0a0a0a",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#e5e5e5",
        }}
      >
        <div style={{ fontSize: 32, color: "#22d3ee" }}>$ whoami</div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 16, letterSpacing: -2 }}>{profile.name}</div>
        <div style={{ fontSize: 40, marginTop: 20, display: "flex" }}>
          <span style={{ color: "#22d3ee", marginRight: 16 }}>&gt;</span>
          {profile.tagline}
        </div>
        <div style={{ fontSize: 28, marginTop: 48, color: "#a3a3a3" }}>
          {new URL(site.url).host.replace(/^www\./, "")}
        </div>
      </div>
    ),
    size,
  );
}
