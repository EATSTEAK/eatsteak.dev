import fs from "fs/promises";
import { getCollection } from "astro:content";
import satori from "satori";
import sharp from "sharp";
import type { APIRoute } from "astro";
import { CATEGORIES } from "../../consts";

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

  const grillData = await fs.readFile(
    "./public/images/grill.png"
  );
  const category = CATEGORIES?.[props.data.category] ?? CATEGORIES?.["uncategorized"];
  const svg = await satori(
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
              }
            }
          },
          {
            type: "p",
            props: {
              children: `${props.data.pubDate}`,
              style: {
                color: "rgb(100 116 139)",
                fontFamily: "'Noto Sans KR'",
                fontSize: "24px",
                fontWeight: "500"
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
                lineHeight: "1.7",
              }
            }
          },

          // Background
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "1200px",
                height: "600px",
              }
            }
          }
        ],
        style: {
          display: "flex",
          width: "1200px",
          height: "600px",
          padding: "80px",
          gap: "10px",
          flexDirection: "column",
          alignItems: "flex-start",
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