import fs from "fs/promises";
import { getCollection } from "astro:content";
import satori from "satori";
import sharp from "sharp";
import type { APIRoute } from "astro";
import { CATEGORIES } from "@/consts.ts";
import { getReadingTime } from "@/utils/reading-time";
import { hexToRgb } from "@/utils/hex-to-rgb.ts";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}

export const GET: APIRoute = async function GET({ props }) {
  const jostData = await fs.readFile("./fonts/Jost-Medium.ttf");
  const notoSansKRData = await fs.readFile("./fonts/NotoSansKR-Medium.ttf");
  const grillPath = [
    "M0,59 h1500 v2 h-1500 z",
    "M0,119 h1500 v2 h-1500 z",
    "M0,179 h1500 v2 h-1500 z",
    "M0,239 h1500 v2 h-1500 z",
    "M0,299 h1500 v2 h-1500 z",
    "M0,359 h1500 v2 h-1500 z",
    "M0,419 h1500 v2 h-1500 z",
    "M0,479 h1500 v2 h-1500 z",
    "M0,539 h1500 v2 h-1500 z",
    "M0,599 h1500 v2 h-1500 z",
    "M0,659 h1500 v2 h-1500 z",
    "M0,719 h1500 v2 h-1500 z",
    "M0,779 h1500 v2 h-1500 z",
    "M0,839 h1500 v2 h-1500 z",
    "M59,0 v900 h2 v-900 z",
    "M119,0 v900 h2 v-900 z",
    "M179,0 v900 h2 v-900 z",
    "M239,0 v900 h2 v-900 z",
    "M299,0 v900 h2 v-900 z",
    "M359,0 v900 h2 v-900 z",
    "M419,0 v900 h2 v-900 z",
    "M479,0 v900 h2 v-900 z",
    "M539,0 v900 h2 v-900 z",
    "M599,0 v900 h2 v-900 z",
    "M659,0 v900 h2 v-900 z",
    "M719,0 v900 h2 v-900 z",
    "M779,0 v900 h2 v-900 z",
    "M839,0 v900 h2 v-900 z",
    "M899,0 v900 h2 v-900 z",
    "M959,0 v900 h2 v-900 z",
    "M1019,0 v900 h2 v-900 z",
    "M1079,0 v900 h2 v-900 z",
    "M1139,0 v900 h2 v-900 z",
    "M1199,0 v900 h2 v-900 z",
  ].join(" ");
  const logoData = await fs.readFile("./public/images/logo.png");
  const category =
    CATEGORIES?.[props.data.category] ?? CATEGORIES?.["uncategorized"];

  const formatter = new Intl.DateTimeFormat("ko", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const bgRgba = (alpha: number) =>
    `rgba(${hexToRgb(category.color.light.bg).join(", ")}, ${alpha})`;
  const minutesToRead = getReadingTime(props.body) ?? 0;
  const svg = await satori(
    {
      type: "div",
      props: {
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
                background: `linear-gradient(4deg, ${bgRgba(0)} 35%, ${bgRgba(0.1)} 72%, ${bgRgba(1)} 80%)`,
                clipPath: `path("${grillPath}")`,
                transform: "translateY(-120px) rotate(-8deg)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "flex-start",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      color: `${category.color.light.text}`,
                      backgroundColor: `${category.color.light.bg}`,
                      padding: "0 4px",
                      fontFamily: "Jost, 'Noto Sans KR'",
                      fontSize: "32px",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    },
                    children: `${category.name}`,
                  },
                },
              ],
            },
          },
          {
            type: "h1",
            props: {
              style: {
                fontFamily: "Jost, 'Noto Sans KR'",
                fontSize: "56px",
                fontWeight: "500",
                textTransform: "uppercase",
                lineHeight: "1",
                margin: "0 0 8px 0",
                wordBreak: "keep-all",
              },
              children: `${props.data.title}`,
            },
          },
          {
            type: "p",
            props: {
              style: {
                color: "rgb(100 116 139)",
                fontFamily: "'Noto Sans KR'",
                fontSize: "24px",
                fontWeight: "500",
                margin: "0 0",
              },
              children: `${formatter.format(new Date(props.data.pubDate))} | ${
                minutesToRead < 1
                  ? "1분 미만 소요"
                  : `약 ${Math.ceil(minutesToRead)}분 소요`
              }`,
            },
          },
          {
            type: "p",
            props: {
              style: {
                color: "rgb(51 65 85)",
                fontFamily: "'Noto Sans KR'",
                fontSize: "36px",
                fontWeight: "500",
                lineHeight: "1.4",
                margin: "0 0",
                wordBreak: "keep-all",
              },
              children: `${props.data.description}`,
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexGrow: "1",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: `data:image/png;base64,${logoData.toString("base64")}`,
                    width: "200px",
                  },
                },
              ],
            },
          },
        ],
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
        },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
