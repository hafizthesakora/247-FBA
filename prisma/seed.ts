import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database…");

  // ── Wipe existing non-user data so seed is idempotent ─────────────────────
  await prisma.activityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.task.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.order.deleteMany();
  await prisma.shipmentItem.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.station.deleteMany();

  // ── Users ──────────────────────────────────────────────────────────────────
  const adminPw    = await bcrypt.hash("admin123",    12);
  const clientPw   = await bcrypt.hash("client123",   12);
  const operatorPw = await bcrypt.hash("operator123", 12);

  const admin = await prisma.user.upsert({
    where:  { email: "admin@247fba.de" },
    update: {},
    create: { email: "admin@247fba.de", name: "Admin User",    password: adminPw,    role: "ADMIN",    company: "24/7 FBA Prep",         phone: "+49 7022 123456" },
  });

  const marcus = await prisma.user.upsert({
    where:  { email: "marcus@mwtrading.de" },
    update: {},
    create: { email: "marcus@mwtrading.de",         name: "Marcus Weber",  password: clientPw, role: "CLIENT", company: "MW Trading GmbH",       phone: "+49 711 987654" },
  });

  const sarah = await prisma.user.upsert({
    where:  { email: "sarah@ecogoods.eu" },
    update: {},
    create: { email: "sarah@ecogoods.eu",            name: "Sarah Chen",    password: clientPw, role: "CLIENT", company: "EcoGoods Europe",        phone: "+49 30 112233" },
  });

  const thomas = await prisma.user.upsert({
    where:  { email: "thomas@globalimports.de" },
    update: {},
    create: { email: "thomas@globalimports.de",      name: "Thomas Braun",  password: clientPw, role: "CLIENT", company: "Global Imports GmbH",    phone: "+49 89 445566" },
  });

  const op1 = await prisma.user.upsert({
    where:  { email: "operator1@247fba.de" },
    update: {},
    create: { email: "operator1@247fba.de", name: "Max Müller",   password: operatorPw, role: "OPERATOR", phone: "+49 7022 111111" },
  });

  const op2 = await prisma.user.upsert({
    where:  { email: "operator2@247fba.de" },
    update: {},
    create: { email: "operator2@247fba.de", name: "Lisa Schmidt",  password: operatorPw, role: "OPERATOR", phone: "+49 7022 222222" },
  });

  const op3 = await prisma.user.upsert({
    where:  { email: "operator3@247fba.de" },
    update: {},
    create: { email: "operator3@247fba.de", name: "Tom Wagner",    password: operatorPw, role: "OPERATOR", phone: "+49 7022 333333" },
  });

  console.log("Users ready");

  // ── Stations — all 5 types, mix of ACTIVE / INACTIVE ──────────────────────
  const stReceivingA  = await prisma.station.create({ data: { name: "Receiving Bay A",      type: "RECEIVING",  status: "ACTIVE",   assignedOperatorId: op1.id, capacity: 20, currentLoad: 8  } });
  const stReceivingB  = await prisma.station.create({ data: { name: "Receiving Bay B",      type: "RECEIVING",  status: "ACTIVE",   assignedOperatorId: op3.id, capacity: 20, currentLoad: 4  } });
  const stInspect1    = await prisma.station.create({ data: { name: "Inspection Zone 1",    type: "INSPECTION", status: "ACTIVE",   assignedOperatorId: op1.id, capacity: 15, currentLoad: 9  } });
  const stInspect2    = await prisma.station.create({ data: { name: "Inspection Zone 2",    type: "INSPECTION", status: "INACTIVE", capacity: 15, currentLoad: 0  } });
  const stPrepAlpha   = await prisma.station.create({ data: { name: "Prep Station Alpha",   type: "PREP",       status: "ACTIVE",   assignedOperatorId: op2.id, capacity: 30, currentLoad: 18 } });
  const stPrepBeta    = await prisma.station.create({ data: { name: "Prep Station Beta",    type: "PREP",       status: "ACTIVE",   assignedOperatorId: op3.id, capacity: 30, currentLoad: 12 } });
  const stQC1         = await prisma.station.create({ data: { name: "QC Desk 1",            type: "QC",         status: "ACTIVE",   assignedOperatorId: op2.id, capacity: 10, currentLoad: 5  } });
  const stQC2         = await prisma.station.create({ data: { name: "QC Desk 2",            type: "QC",         status: "INACTIVE", capacity: 10, currentLoad: 0  } });
  const stShippingA   = await prisma.station.create({ data: { name: "Shipping Dock A",      type: "SHIPPING",   status: "ACTIVE",   assignedOperatorId: op1.id, capacity: 25, currentLoad: 6  } });
  const stShippingB   = await prisma.station.create({ data: { name: "Shipping Dock B",      type: "SHIPPING",   status: "ACTIVE",   assignedOperatorId: op3.id, capacity: 25, currentLoad: 3  } });

  console.log("Stations created");

  // ── Marcus Weber — 9 shipments covering all 8 statuses ────────────────────

  // DRAFT — client just created, not yet submitted
  const mShip1 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2026-001", status: "DRAFT",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA MUC3, Munich",
    itemCount: 80, weight: 24.0, notes: "Seasonal stock — handle before 28 Feb",
    items: { create: [
      { productName: "Garden Solar Lights (4-pack)", sku: "GSL-401", quantity: 40, prepType: "POLY_BAG" },
      { productName: "Outdoor Thermometer",           sku: "OTH-402", quantity: 40, prepType: "LABELING"  },
    ]},
  }});

  // RECEIVED
  const mShip2 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2026-002", status: "RECEIVED",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA DTM2, Dortmund",
    itemCount: 120, weight: 38.5, notes: "Check for transit damage on arrival",
    items: { create: [
      { productName: "Smart LED Bulb E27",  sku: "SLB-101", quantity: 60, prepType: "LABELING"  },
      { productName: "WiFi Smart Plug",     sku: "WSP-102", quantity: 60, prepType: "POLY_BAG"  },
    ]},
  }});

  // INSPECTING
  const mShip3 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2026-003", status: "INSPECTING",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA LEJ1, Leipzig",
    itemCount: 200, weight: 52.0,
    items: { create: [
      { productName: "USB-C Hub 7-in-1",          sku: "UCH-201", quantity: 100, prepType: "BUBBLE_WRAP" },
      { productName: "Laptop Stand Adjustable",    sku: "LSA-202", quantity: 100, prepType: "INSPECTION"  },
    ]},
  }});

  // PREPPING
  const mShip4 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2026-004", status: "PREPPING",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA HAM2, Hamburg",
    itemCount: 150, weight: 45.5, notes: "Amazon FNSKU labels required on every unit",
    items: { create: [
      { productName: "Wireless Bluetooth Earbuds",     sku: "WBE-301", quantity: 75, prepType: "POLY_BAG" },
      { productName: "Silicone Phone Case (assorted)", sku: "SPC-302", quantity: 75, prepType: "LABELING"  },
    ]},
  }});

  // QUALITY_CHECK
  const mShip5 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2026-005", status: "QUALITY_CHECK",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA DUS2, Düsseldorf",
    itemCount: 90, weight: 27.0,
    items: { create: [
      { productName: "Stainless Steel Water Bottle", sku: "SWB-501", quantity: 45, prepType: "BUBBLE_WRAP" },
      { productName: "BPA-Free Lunch Box",           sku: "BLB-502", quantity: 45, prepType: "POLY_BAG"    },
    ]},
  }});

  // READY_TO_SHIP
  const mShip6 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2026-006", status: "READY_TO_SHIP",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA BER3, Berlin",
    itemCount: 60, weight: 18.0,
    items: { create: [
      { productName: "Bamboo Desk Organizer", sku: "BDO-601", quantity: 30, prepType: "BUNDLING"  },
      { productName: "Cork Coasters (6-pack)", sku: "CCK-602", quantity: 30, prepType: "POLY_BAG" },
    ]},
  }});

  // SHIPPED — Nov 2025
  const mShip7 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2025-007", status: "SHIPPED",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA STR1, Stuttgart",
    itemCount: 250, weight: 70.0, createdAt: new Date("2025-11-01"),
    items: { create: [
      { productName: "USB-C Charging Cable 2m",      sku: "UCC-701", quantity: 125, prepType: "LABELING" },
      { productName: "Cable Management Clips (20pk)", sku: "CMC-702", quantity: 125, prepType: "BUNDLING" },
    ]},
  }});

  // DELIVERED — Oct 2025
  const mShip8 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2025-008", status: "DELIVERED",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA FRA5, Frankfurt",
    itemCount: 300, weight: 85.0, createdAt: new Date("2025-10-05"),
    items: { create: [
      { productName: "Phone Screen Protector",         sku: "PSP-801", quantity: 150, prepType: "LABELING"    },
      { productName: "Tempered Glass (tablet, 9-in)",  sku: "TGS-802", quantity: 150, prepType: "BUBBLE_WRAP" },
    ]},
  }});

  // DELIVERED + CANCELLED order — Sep 2025 (cancelled order scenario)
  const mShip9 = await prisma.shipment.create({ data: {
    userId: marcus.id, trackingNumber: "SHP-2025-009", status: "DELIVERED",
    origin: "MW Trading GmbH, Stuttgart", destination: "Amazon FBA CGN1, Cologne",
    itemCount: 50, weight: 12.0, createdAt: new Date("2025-09-10"),
    items: { create: [
      { productName: "Portable Battery Charger 20 000 mAh", sku: "PBC-901", quantity: 50, prepType: "CUSTOM" },
    ]},
  }});

  // ── Sarah Chen — 5 shipments ───────────────────────────────────────────────

  // DRAFT
  const sShip1 = await prisma.shipment.create({ data: {
    userId: sarah.id, trackingNumber: "SHP-2026-010", status: "DRAFT",
    origin: "EcoGoods Europe, Berlin", destination: "Amazon FBA BER3, Berlin",
    itemCount: 100, weight: 20.0, notes: "New spring collection — do not ship before 1 Mar",
    items: { create: [
      { productName: "Organic Cotton Tote Bag",  sku: "OCT-001", quantity: 50, prepType: "POLY_BAG" },
      { productName: "Beeswax Wrap Starter Kit", sku: "BWS-002", quantity: 50, prepType: "BUNDLING" },
    ]},
  }});

  // PREPPING
  const sShip2 = await prisma.shipment.create({ data: {
    userId: sarah.id, trackingNumber: "SHP-2026-011", status: "PREPPING",
    origin: "EcoGoods Europe, Berlin", destination: "Amazon FBA MUC3, Munich",
    itemCount: 180, weight: 42.0,
    items: { create: [
      { productName: "Reusable Beeswax Wraps (3-pack)", sku: "RBW-100", quantity: 90, prepType: "INSPECTION"  },
      { productName: "Bamboo Cutlery Set",               sku: "BCS-101", quantity: 90, prepType: "BUBBLE_WRAP" },
    ]},
  }});

  // QUALITY_CHECK
  const sShip3 = await prisma.shipment.create({ data: {
    userId: sarah.id, trackingNumber: "SHP-2026-012", status: "QUALITY_CHECK",
    origin: "EcoGoods Europe, Berlin", destination: "Amazon FBA DUS2, Düsseldorf",
    itemCount: 240, weight: 55.0,
    items: { create: [
      { productName: "Organic Bamboo Toothbrush (4-pack)", sku: "OBT-201", quantity: 120, prepType: "BUNDLING"  },
      { productName: "Natural Loofah Sponge Set",           sku: "NLS-202", quantity: 120, prepType: "POLY_BAG"  },
    ]},
  }});

  // DELIVERED — Dec 2025
  const sShip4 = await prisma.shipment.create({ data: {
    userId: sarah.id, trackingNumber: "SHP-2025-013", status: "DELIVERED",
    origin: "EcoGoods Europe, Berlin", destination: "Amazon FBA HAM2, Hamburg",
    itemCount: 360, weight: 78.0, createdAt: new Date("2025-12-01"),
    items: { create: [
      { productName: "Organic Cotton Pads (50-pack)", sku: "OCP-301", quantity: 180, prepType: "LABELING"  },
      { productName: "Silk Sleep Mask",               sku: "SSM-302", quantity: 180, prepType: "POLY_BAG"  },
    ]},
  }});

  // SHIPPED — Nov 2025 (overdue invoice)
  const sShip5 = await prisma.shipment.create({ data: {
    userId: sarah.id, trackingNumber: "SHP-2025-014", status: "SHIPPED",
    origin: "EcoGoods Europe, Berlin", destination: "Amazon FBA CGN1, Cologne",
    itemCount: 200, weight: 48.0, createdAt: new Date("2025-11-15"),
    items: { create: [
      { productName: "Recycled Glass Jars (3-pack)",   sku: "RGJ-401", quantity: 100, prepType: "BUBBLE_WRAP" },
      { productName: "Compostable Bin Liners (20-pack)", sku: "CBL-402", quantity: 100, prepType: "LABELING"    },
    ]},
  }});

  // ── Thomas Braun — 4 shipments ─────────────────────────────────────────────

  // RECEIVED (large order)
  const tShip1 = await prisma.shipment.create({ data: {
    userId: thomas.id, trackingNumber: "SHP-2026-015", status: "RECEIVED",
    origin: "Global Imports GmbH, Munich", destination: "Amazon FBA STR1, Stuttgart",
    itemCount: 500, weight: 140.0, notes: "Priority — ship before end of February",
    items: { create: [
      { productName: "Ceramic Coffee Mug (2-pack)",  sku: "CCM-101", quantity: 200, prepType: "BUBBLE_WRAP" },
      { productName: "French Press Coffee Maker",    sku: "FPC-102", quantity: 100, prepType: "INSPECTION"  },
      { productName: "Manual Coffee Grinder",        sku: "CGM-103", quantity: 200, prepType: "LABELING"    },
    ]},
  }});

  // INSPECTING
  const tShip2 = await prisma.shipment.create({ data: {
    userId: thomas.id, trackingNumber: "SHP-2026-016", status: "INSPECTING",
    origin: "Global Imports GmbH, Munich", destination: "Amazon FBA FRA5, Frankfurt",
    itemCount: 320, weight: 95.0,
    items: { create: [
      { productName: "Stainless Steel Kitchen Scale", sku: "SKS-201", quantity: 160, prepType: "INSPECTION" },
      { productName: "Silicone Baking Mat (2-pack)",  sku: "SBM-202", quantity: 160, prepType: "POLY_BAG"   },
    ]},
  }});

  // DELIVERED — Oct 2025
  const tShip3 = await prisma.shipment.create({ data: {
    userId: thomas.id, trackingNumber: "SHP-2025-017", status: "DELIVERED",
    origin: "Global Imports GmbH, Munich", destination: "Amazon FBA DTM2, Dortmund",
    itemCount: 280, weight: 76.0, createdAt: new Date("2025-10-20"),
    items: { create: [
      { productName: "Cast Iron Skillet 28 cm",   sku: "CIS-301", quantity: 140, prepType: "BUBBLE_WRAP" },
      { productName: "Wooden Cutting Board Set",  sku: "WCB-302", quantity: 140, prepType: "LABELING"    },
    ]},
  }});

  // DELIVERED — Sep 2025
  const tShip4 = await prisma.shipment.create({ data: {
    userId: thomas.id, trackingNumber: "SHP-2025-018", status: "DELIVERED",
    origin: "Global Imports GmbH, Munich", destination: "Amazon FBA LEJ1, Leipzig",
    itemCount: 150, weight: 40.0, createdAt: new Date("2025-09-01"),
    items: { create: [
      { productName: "Espresso Cups Set (4-pack)", sku: "ECS-401", quantity: 75, prepType: "BUNDLING"  },
      { productName: "Electric Milk Frother",      sku: "MFE-402", quantity: 75, prepType: "POLY_BAG"  },
    ]},
  }});

  console.log("Shipments created");

  // ── Orders — all 4 statuses ────────────────────────────────────────────────
  // DRAFT shipments have no order (client hasn't submitted yet)

  // Marcus — PENDING
  const mOrd2 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip2.id, status: "PENDING",    totalAmount: 180.00,  service: "FBA Prep - Starter" } });
  // Marcus — PROCESSING
  const mOrd3 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip3.id, status: "PROCESSING", totalAmount: 350.00,  service: "FBA Prep - Growth"  } });
  const mOrd4 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip4.id, status: "PROCESSING", totalAmount: 262.50,  service: "FBA Prep - Growth"  } });
  const mOrd5 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip5.id, status: "PROCESSING", totalAmount: 157.50,  service: "FBA Prep - Starter" } });
  const mOrd6 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip6.id, status: "PROCESSING", totalAmount: 105.00,  service: "FBA Prep - Starter" } });
  // Marcus — COMPLETED
  const mOrd7 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip7.id, status: "COMPLETED",  totalAmount: 437.50,  service: "FBA Prep - Growth",  createdAt: new Date("2025-11-01") } });
  const mOrd8 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip8.id, status: "COMPLETED",  totalAmount: 525.00,  service: "FBA Prep - Pro",     createdAt: new Date("2025-10-05") } });
  // Marcus — CANCELLED
  const mOrd9 = await prisma.order.create({ data: { userId: marcus.id, shipmentId: mShip9.id, status: "CANCELLED",  totalAmount: 87.50,   service: "FBA Prep - Starter", createdAt: new Date("2025-09-10") } });

  // Sarah — PROCESSING
  const sOrd2 = await prisma.order.create({ data: { userId: sarah.id,  shipmentId: sShip2.id, status: "PROCESSING", totalAmount: 315.00,  service: "FBA Prep - Growth"  } });
  const sOrd3 = await prisma.order.create({ data: { userId: sarah.id,  shipmentId: sShip3.id, status: "PROCESSING", totalAmount: 420.00,  service: "FBA Prep - Pro"     } });
  // Sarah — COMPLETED
  const sOrd4 = await prisma.order.create({ data: { userId: sarah.id,  shipmentId: sShip4.id, status: "COMPLETED",  totalAmount: 630.00,  service: "FBA Prep - Pro",     createdAt: new Date("2025-12-01") } });
  const sOrd5 = await prisma.order.create({ data: { userId: sarah.id,  shipmentId: sShip5.id, status: "COMPLETED",  totalAmount: 350.00,  service: "FBA Prep - Growth",  createdAt: new Date("2025-11-15") } });

  // Thomas — PENDING
  const tOrd1 = await prisma.order.create({ data: { userId: thomas.id, shipmentId: tShip1.id, status: "PENDING",    totalAmount: 875.00,  service: "FBA Prep - Pro"     } });
  // Thomas — PROCESSING
  const tOrd2 = await prisma.order.create({ data: { userId: thomas.id, shipmentId: tShip2.id, status: "PROCESSING", totalAmount: 560.00,  service: "FBA Prep - Pro"     } });
  // Thomas — COMPLETED
  const tOrd3 = await prisma.order.create({ data: { userId: thomas.id, shipmentId: tShip3.id, status: "COMPLETED",  totalAmount: 490.00,  service: "FBA Prep - Growth",  createdAt: new Date("2025-10-20") } });
  const tOrd4 = await prisma.order.create({ data: { userId: thomas.id, shipmentId: tShip4.id, status: "COMPLETED",  totalAmount: 262.50,  service: "FBA Prep - Growth",  createdAt: new Date("2025-09-01") } });

  console.log("Orders created");

  // ── Invoices — all 5 statuses ──────────────────────────────────────────────
  // DRAFT (not yet sent to client)
  await prisma.invoice.create({ data: { userId: marcus.id, orderId: mOrd3.id, amount: 350.00,  status: "DRAFT",     dueDate: new Date("2026-03-15") } });
  await prisma.invoice.create({ data: { userId: thomas.id, orderId: tOrd2.id, amount: 560.00,  status: "DRAFT",     dueDate: new Date("2026-03-20") } });

  // SENT
  await prisma.invoice.create({ data: { userId: marcus.id, orderId: mOrd4.id, amount: 262.50,  status: "SENT",      dueDate: new Date("2026-03-01") } });
  await prisma.invoice.create({ data: { userId: marcus.id, orderId: mOrd5.id, amount: 157.50,  status: "SENT",      dueDate: new Date("2026-02-28") } });
  await prisma.invoice.create({ data: { userId: sarah.id,  orderId: sOrd2.id, amount: 315.00,  status: "SENT",      dueDate: new Date("2026-03-05") } });
  await prisma.invoice.create({ data: { userId: sarah.id,  orderId: sOrd3.id, amount: 420.00,  status: "SENT",      dueDate: new Date("2026-03-10") } });

  // PAID
  await prisma.invoice.create({ data: { userId: marcus.id, orderId: mOrd7.id, amount: 437.50,  status: "PAID",      dueDate: new Date("2025-12-01"), paidAt: new Date("2025-11-28") } });
  await prisma.invoice.create({ data: { userId: marcus.id, orderId: mOrd8.id, amount: 525.00,  status: "PAID",      dueDate: new Date("2025-11-05"), paidAt: new Date("2025-11-03") } });
  await prisma.invoice.create({ data: { userId: sarah.id,  orderId: sOrd4.id, amount: 630.00,  status: "PAID",      dueDate: new Date("2026-01-01"), paidAt: new Date("2025-12-28") } });
  await prisma.invoice.create({ data: { userId: thomas.id, orderId: tOrd3.id, amount: 490.00,  status: "PAID",      dueDate: new Date("2025-11-20"), paidAt: new Date("2025-11-19") } });
  await prisma.invoice.create({ data: { userId: thomas.id, orderId: tOrd4.id, amount: 262.50,  status: "PAID",      dueDate: new Date("2025-10-01"), paidAt: new Date("2025-09-29") } });

  // OVERDUE (shipped but payment not received)
  await prisma.invoice.create({ data: { userId: sarah.id,  orderId: sOrd5.id, amount: 350.00,  status: "OVERDUE",   dueDate: new Date("2026-01-15") } });

  // CANCELLED (matching the cancelled order)
  await prisma.invoice.create({ data: { userId: marcus.id, orderId: mOrd9.id, amount: 87.50,   status: "CANCELLED", dueDate: new Date("2025-10-10") } });

  console.log("Invoices created");

  // ── Tasks — all statuses, all priorities, all types ───────────────────────
  const now       = new Date();
  const tomorrow  = new Date(now); tomorrow.setDate(now.getDate() + 1);
  const in2Days   = new Date(now); in2Days.setDate(now.getDate() + 2);
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);

  await prisma.task.createMany({ data: [
    // ── IN_PROGRESS ──────────────────────────────────────────────────────
    {
      title: "Receive SHP-2026-002 (Marcus Weber)",
      description: "Unload and count 120 units. Check for transit damage. Log any discrepancies against packing list.",
      status: "IN_PROGRESS", priority: "HIGH",   type: "RECEIVE",
      assignedToId: op1.id, shipmentId: mShip2.id, stationId: stReceivingA.id,
      dueDate: tomorrow,
    },
    {
      title: "Receive SHP-2026-015 (Thomas Braun) — 500 units",
      description: "Unload 500 units across 3 SKUs. Verify quantities against packing list. Priority shipment.",
      status: "IN_PROGRESS", priority: "URGENT", type: "RECEIVE",
      assignedToId: op3.id, shipmentId: tShip1.id, stationId: stReceivingB.id,
      dueDate: tomorrow,
    },
    {
      title: "Inspect SHP-2026-003 (Marcus Weber)",
      description: "Check USB-C hubs and laptop stands for defects. Approve or reject units per QC SOP.",
      status: "IN_PROGRESS", priority: "HIGH",   type: "INSPECT",
      assignedToId: op1.id, shipmentId: mShip3.id, stationId: stInspect1.id,
      dueDate: in2Days,
    },
    {
      title: "Prep SHP-2026-004 — Poly bag & FNSKU label",
      description: "Apply Amazon FNSKU labels. Individually poly-bag each unit. Target: 150 units by EOD.",
      status: "IN_PROGRESS", priority: "URGENT", type: "PREP",
      assignedToId: op2.id, shipmentId: mShip4.id, stationId: stPrepAlpha.id,
      dueDate: tomorrow,
    },
    {
      title: "Prep SHP-2026-011 — Inspection & bubble wrap (Sarah Chen)",
      description: "Inspect beeswax wraps and bamboo cutlery for damage. Bubble-wrap fragile sets.",
      status: "IN_PROGRESS", priority: "HIGH",   type: "PREP",
      assignedToId: op3.id, shipmentId: sShip2.id, stationId: stPrepBeta.id,
      dueDate: in2Days,
    },
    // ── PENDING ───────────────────────────────────────────────────────────
    {
      title: "Inspect SHP-2026-016 (Thomas Braun)",
      description: "Inspect 320 kitchen items (scales and baking mats). Mark any damaged units for rejection.",
      status: "PENDING", priority: "MEDIUM", type: "INSPECT",
      assignedToId: op1.id, shipmentId: tShip2.id, stationId: stInspect1.id,
      dueDate: in2Days,
    },
    {
      title: "QC check SHP-2026-005 (Marcus Weber)",
      description: "Final quality scan on 90 water bottles and lunch boxes. Verify FNSKU label placement.",
      status: "PENDING", priority: "MEDIUM", type: "QC",
      assignedToId: op2.id, shipmentId: mShip5.id, stationId: stQC1.id,
      dueDate: in2Days,
    },
    {
      title: "QC check SHP-2026-012 (Sarah Chen)",
      description: "Final check on 240 bamboo toothbrushes and loofah sets before marking Ready to Ship.",
      status: "PENDING", priority: "MEDIUM", type: "QC",
      assignedToId: op2.id, shipmentId: sShip3.id, stationId: stQC1.id,
      dueDate: in2Days,
    },
    {
      title: "Ship SHP-2026-006 to Amazon BER3 (Marcus Weber)",
      description: "Box and seal 60 units. Attach Amazon carrier label. Book DHL Express pickup.",
      status: "PENDING", priority: "HIGH",   type: "SHIP",
      assignedToId: op1.id, shipmentId: mShip6.id, stationId: stShippingA.id,
      dueDate: tomorrow,
    },
    {
      title: "Restock poly bags — Prep Station Alpha",
      description: "Poly bag supply below minimum threshold (< 100 left). Collect restocking order from supplies cabinet B-12.",
      status: "PENDING", priority: "LOW",    type: "CUSTOM",
      assignedToId: op2.id, stationId: stPrepAlpha.id,
      dueDate: in2Days,
    },
    // ── COMPLETED ─────────────────────────────────────────────────────────
    {
      title: "Receive SHP-2025-013 (Sarah Chen) — 360 units",
      description: "Received and counted 360 units. All quantities matched packing list.",
      status: "COMPLETED", priority: "MEDIUM", type: "RECEIVE",
      assignedToId: op3.id, shipmentId: sShip4.id, stationId: stReceivingB.id,
      dueDate: new Date("2025-12-03"), completedAt: new Date("2025-12-02"),
    },
    {
      title: "Prep & ship SHP-2025-007 (Marcus Weber)",
      description: "Applied FNSKU labels to 250 cable units. Packed and handed to carrier.",
      status: "COMPLETED", priority: "HIGH",   type: "SHIP",
      assignedToId: op1.id, shipmentId: mShip7.id, stationId: stShippingA.id,
      dueDate: new Date("2025-11-10"), completedAt: new Date("2025-11-09"),
    },
    {
      title: "Monthly calibration — Inspection Zone 1",
      description: "Completed weight scale and barcode scanner calibration. All equipment within tolerance.",
      status: "COMPLETED", priority: "LOW",    type: "CUSTOM",
      assignedToId: op1.id, stationId: stInspect1.id,
      dueDate: new Date("2026-02-01"), completedAt: new Date("2026-02-01"),
    },
    // ── CANCELLED ─────────────────────────────────────────────────────────
    {
      title: "Activate Inspection Zone 2",
      description: "Task cancelled — expansion postponed to Q2 2026. Station remains offline.",
      status: "CANCELLED", priority: "LOW",    type: "CUSTOM",
      assignedToId: op1.id, stationId: stInspect2.id,
      dueDate: yesterday,
    },
  ]});

  console.log("Tasks created");

  // ── Notifications — all 4 types for each client ────────────────────────────
  await prisma.notification.createMany({ data: [
    // ── Marcus ────────────────────────────────────────────────────────────
    { userId: marcus.id, title: "Shipment Received",           type: "SHIPMENT", read: false, message: "Your shipment SHP-2026-002 (Smart LED Bulbs & WiFi Plugs, 120 units) has arrived at our Nürtingen warehouse." },
    { userId: marcus.id, title: "Inspection Underway",         type: "SHIPMENT", read: false, message: "Our team has started inspecting SHP-2026-003 (USB-C Hubs & Laptop Stands). You will be notified once complete." },
    { userId: marcus.id, title: "Prep in Progress",            type: "SHIPMENT", read: true,  message: "SHP-2026-004 is being prepped (poly-bagging & FNSKU labelling). Estimated completion: 2 days." },
    { userId: marcus.id, title: "Ready to Ship!",              type: "SHIPMENT", read: false, message: "SHP-2026-006 has passed QC and is ready for Amazon FBA BER3 carrier pickup." },
    { userId: marcus.id, title: "Order Confirmed",             type: "ORDER",    read: true,  message: "Your order for SHP-2026-003 has been confirmed and is now in processing." },
    { userId: marcus.id, title: "Order Delivered",             type: "ORDER",    read: true,  message: "SHP-2025-008 was successfully delivered to Amazon FBA FRA5. All 300 units received." },
    { userId: marcus.id, title: "Invoice Sent — €262.50",      type: "INVOICE",  read: false, message: "Invoice for SHP-2026-004 has been issued. Amount: €262.50. Due: 1 March 2026. Please pay via bank transfer." },
    { userId: marcus.id, title: "Invoice Sent — €157.50",      type: "INVOICE",  read: true,  message: "Invoice for SHP-2026-005 has been issued. Amount: €157.50. Due: 28 February 2026." },
    { userId: marcus.id, title: "Payment Confirmed — €437.50", type: "INVOICE",  read: true,  message: "Thank you! Your payment for SHP-2025-007 (€437.50) has been received and the invoice marked as paid." },
    { userId: marcus.id, title: "Platform Update",             type: "SYSTEM",   read: false, message: "We now offer same-day prep for Priority tier orders. Contact your account manager or visit our pricing page." },

    // ── Sarah ─────────────────────────────────────────────────────────────
    { userId: sarah.id,  title: "Prep in Progress",            type: "SHIPMENT", read: false, message: "SHP-2026-011 (Beeswax Wraps & Bamboo Cutlery, 180 units) is currently being prepped at our facility." },
    { userId: sarah.id,  title: "Quality Check",               type: "SHIPMENT", read: false, message: "SHP-2026-012 is undergoing final quality check. We'll notify you when it's cleared for shipping." },
    { userId: sarah.id,  title: "Shipment Delivered",          type: "SHIPMENT", read: true,  message: "SHP-2025-013 was delivered to Amazon FBA HAM2. All 360 units received by Amazon." },
    { userId: sarah.id,  title: "Order Processing",            type: "ORDER",    read: false, message: "Your order for SHP-2026-011 is confirmed and in processing." },
    { userId: sarah.id,  title: "Order Completed",             type: "ORDER",    read: true,  message: "SHP-2025-013 order completed. Amazon has confirmed receipt of all units." },
    { userId: sarah.id,  title: "Invoice Sent — €420.00",      type: "INVOICE",  read: false, message: "Invoice for SHP-2026-012 has been issued. Amount: €420.00. Due: 10 March 2026." },
    { userId: sarah.id,  title: "⚠ Invoice Overdue — €350.00", type: "INVOICE",  read: false, message: "Your invoice for SHP-2025-014 (€350.00) was due on 15 January 2026 and remains unpaid. Please arrange payment urgently." },
    { userId: sarah.id,  title: "Scheduled Maintenance",       type: "SYSTEM",   read: false, message: "Planned maintenance on 22 Feb 2026 between 02:00–04:00 CET. The client portal may be briefly unavailable." },

    // ── Thomas ────────────────────────────────────────────────────────────
    { userId: thomas.id, title: "Shipment Received",           type: "SHIPMENT", read: false, message: "SHP-2026-015 (500 units — coffee mugs, French presses, grinders) has arrived. Counting and logging in progress." },
    { userId: thomas.id, title: "Inspection Started",          type: "SHIPMENT", read: false, message: "SHP-2026-016 kitchen equipment (320 units) is now under inspection at Inspection Zone 1." },
    { userId: thomas.id, title: "Order Pending",               type: "ORDER",    read: false, message: "Your order for SHP-2026-015 (€875.00) is queued. Processing will begin once receiving is complete." },
    { userId: thomas.id, title: "Order Delivered",             type: "ORDER",    read: true,  message: "SHP-2025-017 was delivered to Amazon FBA DTM2. All 280 cast iron and cutting board units confirmed received." },
    { userId: thomas.id, title: "Payment Confirmed — €490.00", type: "INVOICE",  read: true,  message: "Payment for SHP-2025-017 (€490.00) received. Invoice marked as paid. Thank you!" },
    { userId: thomas.id, title: "Welcome to 24/7 FBA Prep",   type: "SYSTEM",   read: true,  message: "Your account is active. Track shipments, download invoices, and manage orders from your portal dashboard." },
  ]});

  console.log("Notifications created");

  // ── Activity Logs ──────────────────────────────────────────────────────────
  await prisma.activityLog.createMany({ data: [
    // Ops activity — today
    { userId: op1.id,    action: "started receiving SHP-2026-002 at Receiving Bay A",            entityType: "Shipment",    entityId: mShip2.id },
    { userId: op3.id,    action: "started receiving SHP-2026-015 at Receiving Bay B",            entityType: "Shipment",    entityId: tShip1.id },
    { userId: op1.id,    action: "completed inspection for SHP-2026-003 — 0 defects found",      entityType: "Shipment",    entityId: mShip3.id },
    { userId: op2.id,    action: "claimed prep task for SHP-2026-004 (Wireless Earbuds)",        entityType: "Task" },
    { userId: op3.id,    action: "claimed prep task for SHP-2026-011 (Beeswax Wraps)",           entityType: "Task" },
    { userId: op2.id,    action: "completed QC on SHP-2026-005 — all 90 units passed",           entityType: "Shipment",    entityId: mShip5.id },
    { userId: op1.id,    action: "marked SHP-2026-006 as READY_TO_SHIP",                         entityType: "Shipment",    entityId: mShip6.id },
    // Admin activity
    { userId: admin.id,  action: "issued invoice €262.50 for Marcus Weber — SHP-2026-004",       entityType: "Invoice" },
    { userId: admin.id,  action: "issued invoice €420.00 for Sarah Chen — SHP-2026-012",         entityType: "Invoice" },
    { userId: admin.id,  action: "created station \"Receiving Bay B\" and assigned Tom Wagner",  entityType: "Station",     entityId: stReceivingB.id },
    { userId: admin.id,  action: "set Inspection Zone 2 to INACTIVE",                            entityType: "Station",     entityId: stInspect2.id },
    { userId: admin.id,  action: "created task \"Restock poly bags at Prep Station Alpha\"",     entityType: "Task" },
    { userId: admin.id,  action: "marked invoice for SHP-2025-008 as PAID",                      entityType: "Invoice" },
    // Client activity
    { userId: marcus.id, action: "submitted new shipment SHP-2026-001 (draft)",                  entityType: "Shipment",    entityId: mShip1.id },
    { userId: sarah.id,  action: "submitted new shipment SHP-2026-010 (draft)",                  entityType: "Shipment",    entityId: sShip1.id },
    { userId: thomas.id, action: "viewed invoice for SHP-2025-017",                              entityType: "Invoice" },
    // Historical
    { userId: op3.id,    action: "completed receiving and shipping SHP-2025-013 to Amazon HAM2", entityType: "Shipment",    entityId: sShip4.id },
    { userId: op1.id,    action: "completed task \"Prep & ship SHP-2025-007\"",                  entityType: "Task" },
    { userId: op1.id,    action: "completed monthly calibration of Inspection Zone 1",           entityType: "Station",     entityId: stInspect1.id },
    { userId: admin.id,  action: "registered new client Thomas Braun — Global Imports GmbH",    entityType: "User" },
  ]});

  console.log("Activity logs created");

  console.log("\n✅ Seed complete!\n");
  console.log("─── Accounts ────────────────────────────────────────────");
  console.log("  Admin      admin@247fba.de            admin123");
  console.log("  Client 1   marcus@mwtrading.de        client123  (9 shipments)");
  console.log("  Client 2   sarah@ecogoods.eu          client123  (5 shipments)");
  console.log("  Client 3   thomas@globalimports.de    client123  (4 shipments)");
  console.log("  Operator 1 operator1@247fba.de        operator123");
  console.log("  Operator 2 operator2@247fba.de        operator123");
  console.log("  Operator 3 operator3@247fba.de        operator123");
  console.log("─────────────────────────────────────────────────────────");
  console.log("\n─── Coverage ────────────────────────────────────────────");
  console.log("  Shipment statuses : DRAFT RECEIVED INSPECTING PREPPING");
  console.log("                      QUALITY_CHECK READY_TO_SHIP SHIPPED DELIVERED");
  console.log("  Order statuses    : PENDING PROCESSING COMPLETED CANCELLED");
  console.log("  Invoice statuses  : DRAFT SENT PAID OVERDUE CANCELLED");
  console.log("  Notification types: SHIPMENT ORDER INVOICE SYSTEM");
  console.log("  Task statuses     : PENDING IN_PROGRESS COMPLETED CANCELLED");
  console.log("  Task priorities   : LOW MEDIUM HIGH URGENT");
  console.log("  Task types        : RECEIVE INSPECT PREP QC SHIP CUSTOM");
  console.log("  Station types     : RECEIVING INSPECTION PREP QC SHIPPING");
  console.log("  Station statuses  : ACTIVE INACTIVE");
  console.log("  Prep types        : LABELING POLY_BAG BUBBLE_WRAP BUNDLING INSPECTION CUSTOM");
  console.log("─────────────────────────────────────────────────────────\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
