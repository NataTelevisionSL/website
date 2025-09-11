// app/api/vimeo/thumbnail/route.ts
import { NextResponse } from "next/server";

function upscaleThumb(url: string) {
  // Exemple: https://i.vimeocdn.com/video/123456789_640.jpg
  return url.replace(/_\d+x\d+(\.\w+)$/, "_1920$1"); 
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  const oembedURL = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}`;
  const res = await fetch(oembedURL, { cache: "no-store" });
  if (!res.ok) {
    return NextResponse.json({ error: "oembed failed" }, { status: 500 });
  }

  const data = await res.json();
  const thumb = typeof data.thumbnail_url === "string" ? upscaleThumb(data.thumbnail_url) : null;
  return NextResponse.json({ thumbnail: thumb });
}
