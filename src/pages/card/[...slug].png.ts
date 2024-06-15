import fs from "fs/promises";
import { getCollection } from "astro:content";
import satori from "satori";
import sharp from "sharp";
import type { APIRoute } from "astro";
import { CATEGORIES } from "../../consts";
import { getReadingTime } from "../../utils/reading-time";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async function GET({ params, request, props }) {
  const jostData = await fs.readFile(
    "./fonts/Jost-Medium.ttf"
  );
  const notoSansKRData = await fs.readFile(
    "./fonts/NotoSansKR-Medium.ttf"
  );
  const grillPath = [
    "M0,58 h1500 v4 h-1500 z",
    "M0,118 h1500 v4 h-1500 z",
    "M0,178 h1500 v4 h-1500 z",
    "M0,238 h1500 v4 h-1500 z",
    "M0,298 h1500 v4 h-1500 z",
    "M0,358 h1500 v4 h-1500 z",
    "M0,418 h1500 v4 h-1500 z",
    "M0,478 h1500 v4 h-1500 z",
    "M0,538 h1500 v4 h-1500 z",
    "M0,598 h1500 v4 h-1500 z",
    "M0,658 h1500 v4 h-1500 z",
    "M0,718 h1500 v4 h-1500 z",
    "M0,778 h1500 v4 h-1500 z",
    "M0,838 h1500 v4 h-1500 z",
    "M58,0 v900 h4 v-900 z",
    "M118,0 v900 h4 v-900 z",
    "M178,0 v900 h4 v-900 z",
    "M238,0 v900 h4 v-900 z",
    "M298,0 v900 h4 v-900 z",
    "M358,0 v900 h4 v-900 z",
    "M418,0 v900 h4 v-900 z",
    "M478,0 v900 h4 v-900 z",
    "M538,0 v900 h4 v-900 z",
    "M598,0 v900 h4 v-900 z",
    "M658,0 v900 h4 v-900 z",
    "M718,0 v900 h4 v-900 z",
    "M778,0 v900 h4 v-900 z",
    "M838,0 v900 h4 v-900 z",
    "M898,0 v900 h4 v-900 z",
    "M958,0 v900 h4 v-900 z",
    "M1018,0 v900 h4 v-900 z",
    "M1078,0 v900 h4 v-900 z",
    "M1138,0 v900 h4 v-900 z",
    "M1198,0 v900 h4 v-900 z",
  ].join(" ");
  const logoData = await fs.readFile(
    "./public/images/logo.png"
  )
  const category = CATEGORIES?.[props.data.category] ?? CATEGORIES?.["uncategorized"];

  const formatter = new Intl.DateTimeFormat("ko", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const hexToRgb = (hex: string) => {
    let hexsplit = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
               ,(m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g);
      if(hexsplit == null) return null;
      return hexsplit.map(x => parseInt(x, 16));
  }
    
  const bgRgb = hexToRgb(category.color.light.bg);
  const minutesToRead = getReadingTime(props.body) ?? 0;
  const svg = await satori(
    {
      type: "div",
      props: {
        children: [
          // Background
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "1500px",
                height: "900px",
                background: `linear-gradient(4deg, rgba(${bgRgb?.[0] ?? 0},${bgRgb?.[1] ?? 0},${bgRgb?.[2] ?? 0},0) 35%, rgba(${bgRgb?.[0] ?? 0},${bgRgb?.[1] ?? 0},${bgRgb?.[2] ?? 0},0.1) 72%, rgba(${bgRgb?.[0] ?? 0},${bgRgb?.[1] ?? 0},${bgRgb?.[2] ?? 0},1) 80%)`,
                clipPath: `path("${grillPath}")`,
                transform: "translateY(-120px) rotate(-8deg)"
              }
            }
          },
          {
            type: "div",
            props: {
              children: [
                {
                  type: "div",
                  props: {
                    children: `${category.name}`,
                    style: {
                      color: `${category.color.light.text}`,
                      backgroundColor: `${category.color.light.bg}`,
                      padding: "0 4px",
                      fontFamily: "Jost, 'Noto Sans KR'",
                      fontSize: "32px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }
                  }
                }
              ],
              style: {
                display: "flex",
                alignItems: "flex-start",
              }
            }
          },
          {
            type: "h1",
            props: {
              children: `${props.data.title}`,
              style: {
                fontFamily: "Jost, 'Noto Sans KR'",
                fontSize: "64px",
                fontWeight: "500",
                textTransform: "uppercase",
                lineHeight: "1",
                margin: "0 0",
              }
            }
          },
          {
            type: "p",
            props: {
              children: `${formatter.format(new Date(props.data.pubDate))} | ${minutesToRead < 1
                ? "1분 미만 소요"
                : `약 ${Math.ceil(minutesToRead)}분 소요`}`,
              style: {
                color: "rgb(100 116 139)",
                fontFamily: "'Noto Sans KR'",
                fontSize: "24px",
                fontWeight: "500",
                margin: "0 0",
              }
            }
          },
          {
            type: "p",
            props: {
              children: `${props.data.description}`,
              style: {
                color: "rgb(51 65 85)",
                fontFamily: "'Noto Sans KR'",
                fontSize: "36px",
                fontWeight: "500",
                lineHeight: "1.4",
              }
            }
          },
          {
            type: "div",
            props: {
              children: [
                {
                  type: "img",
                  props: {
                    src: `data:image/png;base64,${logoData.toString("base64")}`,
                    width: "200px",
                  }
                }
              ],
              style: {
                display: "flex",
                flexGrow: "1",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }
            }
          }
        ],
        style: {
          position: "relative",
          display: "flex",
          width: "1200px",
          height: "600px",
          padding: "80px 80px 60px 80px",
          gap: "8px",
          flexDirection: "column",
          alignItems: "stretch",
          backgroundColor: "#fff",
        },
      },
    },
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Jost",
          data: jostData,
          weight: 500,
          style: "normal",
        },
        {
          name: "Noto Sans KR",
          data: notoSansKRData,
          weight: 500,
          style: "normal",
        }
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};