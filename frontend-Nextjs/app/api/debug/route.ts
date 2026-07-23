import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const event = searchParams.get("event") || "unknown";
  const ts = new Date().toISOString();
  
  // This prints to your terminal/cmd where npm run dev is running
  console.log(`\n🔔 [MOBILE DEBUG] Event: ${event} | Time: ${ts}\n`);
  
  return NextResponse.json({ ok: true, event, ts });
}
