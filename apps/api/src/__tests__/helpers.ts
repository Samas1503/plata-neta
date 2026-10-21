import { NextRequest } from "next/server";

export function req(url: string, init?: { method?: string; body?: unknown; auth?: string; headers?: Record<string, string> }) {
  return new NextRequest(new URL(url, "http://localhost:4500"), {
    method: init?.method ?? "GET",
    headers: {
      "content-type": "application/json",
      ...(init?.auth ? { authorization: `Bearer ${init.auth}` } : {}),
      ...(init?.headers ?? {}),
    },
    ...(init?.body ? { body: JSON.stringify(init.body) } : {}),
  });
}
