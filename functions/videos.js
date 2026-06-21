// Cloudflare Pages Function — GET /videos
// Fetches the channel's public YouTube RSS feed (no API key) and returns
// the latest videos as JSON. New uploads appear automatically (cached ~30 min).

const CHANNEL_ID = "UCyANThBfgLoVWvjtZ6dxGQQ"; // Peace of Mind Planning
const MAX_VIDEOS = 12;

export async function onRequest() {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=1800, s-maxage=1800",
    "access-control-allow-origin": "*",
  };

  const feedUrl =
    "https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL_ID;

  try {
    const res = await fetch(feedUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; PeaceOfMindPlanning/1.0; +https://peace-of-mind-planning.pages.dev)",
        accept: "application/atom+xml, application/xml, text/xml",
      },
      cf: { cacheTtl: 1800, cacheEverything: true },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ videos: [] }), { status: 200, headers });
    }

    const xml = await res.text();
    const videos = parseFeed(xml).slice(0, MAX_VIDEOS);
    return new Response(JSON.stringify({ videos }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ videos: [], error: String(err) }), {
      status: 200,
      headers,
    });
  }
}

function parseFeed(xml) {
  const out = [];
  const parts = xml.split("<entry>");
  for (let i = 1; i < parts.length; i++) {
    const entry = parts[i];
    const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!idMatch) continue;
    const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
    const pubMatch = entry.match(/<published>([^<]+)<\/published>/);
    out.push({
      id: idMatch[1].trim(),
      title: decodeEntities((titleMatch ? titleMatch[1] : "").trim()),
      published: pubMatch ? pubMatch[1].trim() : "",
    });
  }
  return out;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}
