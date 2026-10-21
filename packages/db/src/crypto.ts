import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

// Cifrado en reposo de PspCredential (RULES.MD §3).
// Clave: ENCRYPTION_KEY en base64 (32 bytes). Formato: "iv:tag:cipher" base64.

function key(): Buffer {
  const raw = process.env.ENCRYPTION_KEY;
  if (!raw) throw new Error("ENCRYPTION_KEY not set");
  const buf = Buffer.from(raw, "base64");
  if (buf.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes base64");
  return buf;
}

export function encryptJson(value: unknown): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}:${tag.toString("base64")}:${data.toString("base64")}`;
}

export function decryptJson<T>(blob: string): T {
  const [iv, tag, data] = blob.split(":").map((p) => Buffer.from(p, "base64"));
  const decipher = createDecipheriv("aes-256-gcm", key(), iv!);
  decipher.setAuthTag(tag!);
  const plain = Buffer.concat([decipher.update(data!), decipher.final()]);
  return JSON.parse(plain.toString("utf8")) as T;
}
