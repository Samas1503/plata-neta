// Seed del demo.db (sqlite) — versión compacta, metadata como string JSON.
import { PrismaClient } from "../src/generated/demo/client.js";

const prisma = new PrismaClient();
const HASH = "46f03c5b1a0a9d40d15f:c0ffee" // placeholder — se setea abajo
import { randomBytes, scryptSync } from "node:crypto";
const hash = (p) => { const s = randomBytes(16).toString("hex"); return `${s}:${scryptSync(p, s, 64).toString("hex")}`; };

const plans = [
  { name: "starter", gmvThreshold: 0n, monthlyPrice: 0n },
  { name: "growth", gmvThreshold: 50_000_000n, monthlyPrice: 1_500_000n },
  { name: "scale", gmvThreshold: 500_000_000n, monthlyPrice: 7_500_000n },
  { name: "enterprise", gmvThreshold: 5_000_000_000n, monthlyPrice: 30_000_000n },
];
const tid = "demo-tenant";
const le = (account, debit, credit, refType, refId, createdAt) => ({ tenantId: tid, account, debitCents: BigInt(debit), creditCents: BigInt(credit), refType, refId, createdAt });
const day = 86400000, now = Date.now();

await prisma.tenant.deleteMany({ where: { id: tid } });
const plan = plans[1];
const p = await prisma.plan.createMany ? plans.map(x => prisma.plan.upsert({ where: { name: x.name }, update: x, create: x })) : [];
const planRows = await Promise.all(p);
const tenant = await prisma.tenant.upsert({ where: { slug: "comercio-demo" }, update: {}, create: { id: tid, name: "Comercio Demo", slug: "comercio-demo", status: "ACTIVE", kycStatus: "VERIFIED", planId: planRows[1]?.id } });
for (const [email, role, name] of [["owner@demo.plata","OWNER","Dueña Demo"],["operator@demo.plata","OPERATOR","Operador Demo"],["viewer@demo.plata","VIEWER","Visor Demo"]]) {
  await prisma.user.upsert({ where: { email }, update: {}, create: { tenantId: tid, email, name, role, passwordHash: hash("demo1234") } });
}
for (const prov of ["mercadopago","uala","modo","brubank","personalpay","cuentadni"]) {
  await prisma.pspCredential.upsert({ where: { tenantId_provider: { tenantId: tid, provider: prov } }, update: {}, create: { tenantId: tid, provider: prov, encryptedKeys: `demo-enc:${prov}` } });
}
const intents = [
  ["mercadopago","SUCCEEDED",1250000,1,"Venta online #1042"],["uala","SUCCEEDED",320000,1,"Pedido #88"],
  ["mercadopago","SUCCEEDED",890000,3,"Venta online #1040"],["modo","SUCCEEDED",45000,4,"Venta QR #210"],
  ["uala","SUCCEEDED",750000,5,"Pedido #84"],["mercadopago","SUCCEEDED",2100000,7,"Venta #1037"],
  ["uala","SUCCEEDED",199000,9,"Pedido #81"],["ripio","SUCCEEDED",500000,10,"Cobro USDC"],
  ["mercadopago","SUCCEEDED",640000,12,"Venta #1034"],["modo","SUCCEEDED",120000,14,"Venta QR #205"],
  ["uala","PROCESSING",300000,0,"Pedido #89"],["mercadopago","PROCESSING",1550000,0,"Venta #1043"],
  ["modo","PENDING",95000,0,"Venta QR #212"],["uala","FAILED",400000,2,"Pedido #86"],
  ["mercadopago","EXPIRED",280000,6,"Venta #1038"],
];
for (const [provider,status,amt,d,desc] of intents) {
  const createdAt = new Date(now - d*day);
  const i = await prisma.paymentIntent.create({ data: { tenantId: tid, provider, amountCents: BigInt(amt), currency: provider==="ripio"?"USDC":"ARS", status, idempotencyKey:`demo-${provider}-${d}-${amt}`, externalRef:`demo-${provider.slice(0,4)}-${d}`, metadata: JSON.stringify({description:desc}), expiresAt: status==="PENDING"?new Date(now+3600e3):null, createdAt, updatedAt: createdAt } });
  const es = [le("pending",amt,0,"payment_intent",i.id,createdAt), le("clearing",0,amt,"payment_intent",i.id,createdAt)];
  if (status==="SUCCEEDED") es.push(le("available",amt,0,"payment_intent",i.id,new Date(createdAt.getTime()+3600e3)), le("pending",0,amt,"payment_intent",i.id,new Date(createdAt.getTime()+3600e3)));
  if (["FAILED","EXPIRED"].includes(status)) es.push(le("clearing",amt,0,"payment_intent",i.id,new Date(createdAt.getTime()+3600e3)), le("pending",0,amt,"payment_intent",i.id,new Date(createdAt.getTime()+3600e3)));
  await prisma.ledgerEntry.createMany({ data: es });
}
const owner = await prisma.user.findFirst({ where: { tenantId: tid, role: "OWNER" } });
const op = await prisma.user.findFirst({ where: { tenantId: tid, role: "OPERATOR" } });
for (const [payee,amt,status,d,app] of [["proveedor.papel.uala",850000,"SUCCEEDED",3,true],["transporte.mp",1200000,"SUCCEEDED",5,true],["insumos.nx",400000,"PENDING",0,false],["luz.uala",600000,"FAILED",2,true]]) {
  const createdAt = new Date(now - d*day);
  const py = await prisma.payout.create({ data: { tenantId: tid, provider:"mercadopago", payeeRef: payee, amountCents: BigInt(amt), currency:"ARS", status, idempotencyKey:`demo-p-${d}-${amt}`, externalRef: status==="SUCCEEDED"?`sandbox-pay-${d}`:null, createdByUserId: op?.id??null, approvedById: app?(owner?.id??null):null, createdAt, updatedAt: createdAt } });
  if (status!=="PENDING") {
    const es=[le("clearing",amt,0,"payout",py.id,createdAt), le("available",0,amt,"payout",py.id,createdAt)];
    if (status==="FAILED") es.push(le("available",amt,0,"payout",py.id,createdAt), le("clearing",0,amt,"payout",py.id,createdAt));
    await prisma.ledgerEntry.createMany({ data: es });
  }
}
await prisma.subscriptionCycle.create({ data: { tenantId: tid, periodStart: new Date(now-30*day), periodEnd: new Date(now-day), gmvSnapshot: 6000000n, tierApplied: "growth", amountCents: 1500000n, invoicedAt: new Date(now-28*day) } });
await prisma.auditLog.createMany({ data: [
  { tenantId: tid, action: "api_key.create", entity: "api_key", entityId: "demo-key", apiKeyId: "demo-key" },
  { tenantId: tid, action: "payout.approve", entity: "payout", entityId: "demo-p", userId: owner?.id },
]});
console.log("demo.db seeded");
await prisma.$disconnect();
