import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "plata-neta-api",
    env: process.env.APP_ENV ?? "sandbox",
  });
}
