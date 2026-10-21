import { prisma, type Prisma } from "@plata-neta/db";

export async function audit(input: {
  tenantId: string;
  userId?: string | undefined;
  apiKeyId?: string | undefined;
  action: string;
  entity: string;
  entityId: string;
  metadata?: Prisma.InputJsonValue | undefined;
}) {
  const { userId, apiKeyId, metadata, ...rest } = input;
  await prisma.auditLog.create({
    data: {
      ...rest,
      ...(userId ? { userId } : {}),
      ...(apiKeyId ? { apiKeyId } : {}),
      ...(metadata ? { metadata } : {}),
    },
  });
}
