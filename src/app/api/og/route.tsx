import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "Md Minaruzzaman Shovon";
    const subtitle =
      searchParams.get("subtitle") ||
      "Full Stack Developer & Security Researcher";
    const category = searchParams.get("category") || "Security Advisory";
    const badge = searchParams.get("badge") || "";
    const badgeColor = searchParams.get("badgeColor") || "#991b1b"; // default red
    const badgeBg = searchParams.get("badgeBg") || "#fef2f2"; // default light red

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#09090b",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #18181b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18181b 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#a1a1aa",
              }}
            >
              <span>{category}</span>
            </div>

            {badge ? (
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  backgroundColor: badgeBg,
                  color: badgeColor,
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {badge}
              </div>
            ) : null}
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
            <div
              style={{
                fontSize: title.length > 50 ? "46px" : "56px",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#f4f4f5",
                letterSpacing: "-0.02em",
                maxHeight: "180px",
                overflow: "hidden",
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: "22px",
                lineHeight: 1.4,
                color: "#a1a1aa",
                fontWeight: 400,
                maxHeight: "90px",
                overflow: "hidden",
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Footer branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid #27272a",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              <span style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
                shovon.bd
              </span>
            </div>

            <span style={{ fontSize: "18px", color: "#71717a", fontWeight: 500 }}>
              Md Minaruzzaman Shovon
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}
