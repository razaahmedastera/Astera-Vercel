import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail: string;
}

export async function GET(request: NextRequest) {
  const playlistId = request.nextUrl.searchParams.get('id');

  if (!playlistId) {
    return NextResponse.json({ error: 'Missing playlist id' }, { status: 400 });
  }

  try {
    // YouTube RSS feed for playlists — returns up to 15 items, no API key needed
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ videos: [] });
    }

    const xml = await res.text();

    const videos: PlaylistVideo[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xml)) !== null) {
      const entry = match[1];

      const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entry.match(/<media:title>([^<]+)<\/media:title>/) ||
                          entry.match(/<title>([^<]+)<\/title>/);

      if (videoIdMatch?.[1]) {
        const videoId = videoIdMatch[1];
        videos.push({
          id: videoId,
          title: titleMatch?.[1] || 'Untitled',
          thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        });
      }
    }

    return NextResponse.json(
      { videos },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' } }
    );
  } catch (error) {
    console.error('Error fetching YouTube playlist:', error);
    return NextResponse.json({ videos: [] });
  }
}
