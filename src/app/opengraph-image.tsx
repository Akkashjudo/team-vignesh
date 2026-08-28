import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.brand} — Personal Training, Nutrition & Performance`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card, built around the official logo rather than a rebuilt
 * wordmark. The artwork is read from disk at build time and inlined.
 */
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/tv-logo-full.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#080808",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "#E11D2E",
            display: "flex",
          }}
        />

        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.28em",
              color: "#FF5661",
              fontWeight: 600,
            }}
          >
            PERSONAL TRAINING · NUTRITION · PERFORMANCE
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#F5F3EE",
              fontWeight: 800,
            }}
          >
            <div style={{ display: "flex" }}>Build a stronger</div>
            <div style={{ display: "flex" }}>version of you.</div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              paddingTop: 24,
              borderTop: "1px solid rgba(245,243,238,0.16)",
              fontSize: 24,
              color: "rgba(245,243,238,0.62)",
            }}
          >
            {site.trainer} · {site.phoneDisplay}
          </div>
        </div>

        {/* Official lockup */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={362} height={432} style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size },
  );
}
