import { NextResponse } from "next/server";
import { json } from "@/lib/json";

export function GET() {
  return json({
    status: "ok",
    service: "plata-neta-api",
    env: process.env.APP_ENV ?? "sandbox",
  });
}
