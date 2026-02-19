import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@247fba.de" },
    update: {},
    create: {
      email: "admin@247fba.de",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
      company: "24/7 FBA Prep",
      phone: "+49 (0) 7022 123456",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create sample client
  const clientPassword = await bcrypt.hash("client123", 12);
  const client = await prisma.user.upsert({
    where: { email: "marcus@mwtrading.de" },
    update: {},
    create: {
      email: "marcus@mwtrading.de",
      name: "Marcus Weber",
      password: clientPassword,
      role: "CLIENT",
      company: "MW Trading GmbH",
      phone: "+49 (0) 711 987654",
    },
  });
  console.log("Client user created:", client.email);

  // Create second client
  const client2Password = await bcrypt.hash("client123", 12);
  const client2 = await prisma.user.upsert({
    where: { email: "sarah@ecogoods.eu" },
    update: {},
    create: {
      email: "sarah@ecogoods.eu",
      name: "Sarah Chen",
      password: client2Password,
      role: "CLIENT",
      company: "EcoGoods Europe",
      phone: "+49 (0) 30 112233",
    },
  });
  console.log("Client user created:", client2.email);

  // Create shipments for Marcus
  const shipment1 = await prisma.shipment.create({
    data: {
      userId: client.id,
      trackingNumber: "SHP-2024-001",
      status: "PREPPING",
      origin: "MW Trading Warehouse, Stuttgart",
      destination: "Amazon FBA DTM2, Dortmund",
      itemCount: 150,
      weight: 45.5,
      notes: "Handle with care - fragile electronics",
      items: {
        create: [
          { productName: "Wireless Bluetooth Earbuds", sku: "WBE-001", quantity: 50, prepType: "POLY_BAG" },
          { productName: "USB-C Charging Cable 2m", sku: "UCC-002", quantity: 100, prepType: "LABELING" },
        ],
      },
    },
  });

  const shipment2 = await prisma.shipment.create({
    data: {
      userId: client.id,
      trackingNumber: "SHP-2024-002",
      status: "DELIVERED",
      origin: "MW Trading Warehouse, Stuttgart",
      destination: "Amazon FBA LEJ1, Leipzig",
      itemCount: 200,
      weight: 30.0,
      items: {
        create: [
          { productName: "Phone Screen Protector", sku: "PSP-010", quantity: 200, prepType: "LABELING" },
        ],
      },
    },
  });

  const shipment3 = await prisma.shipment.create({
    data: {
      userId: client.id,
      trackingNumber: "SHP-2024-003",
      status: "RECEIVED",
      origin: "MW Trading Warehouse, Stuttgart",
      destination: "Amazon FBA HAM2, Hamburg",
      itemCount: 75,
      weight: 22.0,
      notes: "Bundling required per ASIN",
      items: {
        create: [
          { productName: "Bamboo Toothbrush Set (3-pack)", sku: "BTS-020", quantity: 25, prepType: "BUNDLING" },
          { productName: "Organic Cotton Pads", sku: "OCP-021", quantity: 50, prepType: "POLY_BAG" },
        ],
      },
    },
  });

  // Create shipment for Sarah
  const shipment4 = await prisma.shipment.create({
    data: {
      userId: client2.id,
      trackingNumber: "SHP-2024-004",
      status: "QUALITY_CHECK",
      origin: "EcoGoods Berlin Warehouse",
      destination: "Amazon FBA MUC3, Munich",
      itemCount: 300,
      weight: 60.0,
      items: {
        create: [
          { productName: "Reusable Beeswax Wraps", sku: "RBW-100", quantity: 150, prepType: "INSPECTION" },
          { productName: "Bamboo Cutlery Set", sku: "BCS-101", quantity: 150, prepType: "BUBBLE_WRAP" },
        ],
      },
    },
  });

  // Create orders
  const order1 = await prisma.order.create({
    data: {
      userId: client.id,
      shipmentId: shipment1.id,
      status: "PROCESSING",
      totalAmount: 225.0,
      service: "FBA Prep - Growth",
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: client.id,
      shipmentId: shipment2.id,
      status: "COMPLETED",
      totalAmount: 300.0,
      service: "FBA Prep - Growth",
    },
  });

  const order3 = await prisma.order.create({
    data: {
      userId: client.id,
      shipmentId: shipment3.id,
      status: "PENDING",
      totalAmount: 112.5,
      service: "FBA Prep - Starter",
    },
  });

  const order4 = await prisma.order.create({
    data: {
      userId: client2.id,
      shipmentId: shipment4.id,
      status: "PROCESSING",
      totalAmount: 450.0,
      service: "FBA Prep - Pro",
    },
  });

  // Create invoices
  await prisma.invoice.create({
    data: {
      userId: client.id,
      orderId: order2.id,
      amount: 300.0,
      status: "PAID",
      dueDate: new Date("2024-12-15"),
      paidAt: new Date("2024-12-10"),
    },
  });

  await prisma.invoice.create({
    data: {
      userId: client.id,
      orderId: order1.id,
      amount: 225.0,
      status: "SENT",
      dueDate: new Date("2025-01-15"),
    },
  });

  await prisma.invoice.create({
    data: {
      userId: client2.id,
      orderId: order4.id,
      amount: 450.0,
      status: "SENT",
      dueDate: new Date("2025-01-20"),
    },
  });

  // Create operator users
  const opPassword = await bcrypt.hash("operator123", 12);
  const operator1 = await prisma.user.upsert({
    where: { email: "operator1@247fba.de" },
    update: {},
    create: {
      email: "operator1@247fba.de",
      name: "Max Müller",
      password: opPassword,
      role: "OPERATOR",
      phone: "+49 (0) 7022 111111",
    },
  });
  console.log("Operator user created:", operator1.email);

  const operator2 = await prisma.user.upsert({
    where: { email: "operator2@247fba.de" },
    update: {},
    create: {
      email: "operator2@247fba.de",
      name: "Lisa Schmidt",
      password: opPassword,
      role: "OPERATOR",
      phone: "+49 (0) 7022 222222",
    },
  });
  console.log("Operator user created:", operator2.email);

  // Create stations
  const stationReceiving = await prisma.station.create({
    data: {
      name: "Receiving Bay A",
      type: "RECEIVING",
      status: "ACTIVE",
      assignedOperatorId: operator1.id,
      capacity: 20,
      currentLoad: 5,
    },
  });

  const stationInspection = await prisma.station.create({
    data: {
      name: "Inspection Zone 1",
      type: "INSPECTION",
      status: "ACTIVE",
      assignedOperatorId: operator1.id,
      capacity: 15,
      currentLoad: 8,
    },
  });

  const stationPrep = await prisma.station.create({
    data: {
      name: "Prep Station Alpha",
      type: "PREP",
      status: "ACTIVE",
      assignedOperatorId: operator2.id,
      capacity: 25,
      currentLoad: 12,
    },
  });

  const stationQC = await prisma.station.create({
    data: {
      name: "QC Desk 1",
      type: "QC",
      status: "ACTIVE",
      capacity: 10,
      currentLoad: 3,
    },
  });

  await prisma.station.create({
    data: {
      name: "Shipping Dock B",
      type: "SHIPPING",
      status: "ACTIVE",
      assignedOperatorId: operator2.id,
      capacity: 30,
      currentLoad: 7,
    },
  });

  console.log("Stations created");

  // Create tasks
  await prisma.task.createMany({
    data: [
      {
        title: "Receive shipment SHP-2024-003",
        description: "Unload and verify item counts for incoming shipment",
        status: "IN_PROGRESS",
        priority: "HIGH",
        type: "RECEIVE",
        assignedToId: operator1.id,
        shipmentId: shipment3.id,
        stationId: stationReceiving.id,
      },
      {
        title: "Inspect SHP-2024-004 items",
        description: "Quality inspection of Beeswax Wraps and Bamboo Cutlery",
        status: "PENDING",
        priority: "MEDIUM",
        type: "INSPECT",
        assignedToId: operator1.id,
        shipmentId: shipment4.id,
        stationId: stationInspection.id,
      },
      {
        title: "Prep SHP-2024-001 for FBA",
        description: "Apply poly bags and labels per Amazon requirements",
        status: "IN_PROGRESS",
        priority: "URGENT",
        type: "PREP",
        assignedToId: operator2.id,
        shipmentId: shipment1.id,
        stationId: stationPrep.id,
      },
      {
        title: "QC check on prepped items",
        description: "Final quality check before shipping",
        status: "PENDING",
        priority: "MEDIUM",
        type: "QC",
        assignedToId: operator2.id,
        stationId: stationQC.id,
      },
      {
        title: "Ship completed order",
        description: "Package and label for Amazon FBA shipment",
        status: "PENDING",
        priority: "LOW",
        type: "SHIP",
        assignedToId: operator2.id,
        shipmentId: shipment2.id,
      },
    ],
  });

  console.log("Tasks created");

  // Create activity logs
  await prisma.activityLog.createMany({
    data: [
      {
        userId: operator1.id,
        action: "received shipment SHP-2024-003 at Receiving Bay A",
        entityType: "Shipment",
        entityId: shipment3.id,
      },
      {
        userId: operator2.id,
        action: "started prepping shipment SHP-2024-001",
        entityType: "Shipment",
        entityId: shipment1.id,
      },
      {
        userId: admin.id,
        action: "created task \"QC check on prepped items\"",
        entityType: "Task",
      },
      {
        userId: operator1.id,
        action: "claimed task \"Inspect SHP-2024-004 items\"",
        entityType: "Task",
      },
      {
        userId: operator2.id,
        action: "completed task \"Label USB-C cables\"",
        entityType: "Task",
      },
    ],
  });

  console.log("Activity logs created");

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: client.id,
        title: "Shipment Received",
        message: "Your shipment SHP-2024-003 has been received at our warehouse.",
        type: "SHIPMENT",
        read: false,
      },
      {
        userId: client.id,
        title: "Shipment In Progress",
        message: "Your shipment SHP-2024-001 is now being prepped.",
        type: "SHIPMENT",
        read: true,
      },
      {
        userId: client.id,
        title: "Invoice Created",
        message: "A new invoice for €225.00 has been created for your order.",
        type: "INVOICE",
        read: false,
      },
      {
        userId: client.id,
        title: "Shipment Delivered",
        message: "Your shipment SHP-2024-002 has been delivered to Amazon FBA.",
        type: "SHIPMENT",
        read: true,
      },
      {
        userId: client2.id,
        title: "Quality Check",
        message: "Your shipment SHP-2024-004 is undergoing quality check.",
        type: "SHIPMENT",
        read: false,
      },
      {
        userId: client2.id,
        title: "New Invoice",
        message: "A new invoice for €450.00 has been created. Due: Jan 20, 2025.",
        type: "INVOICE",
        read: false,
      },
    ],
  });

  console.log("Seed data created successfully!");
  console.log("\nLogin credentials:");
  console.log("  Admin: admin@247fba.de / admin123");
  console.log("  Client 1: marcus@mwtrading.de / client123");
  console.log("  Client 2: sarah@ecogoods.eu / client123");
  console.log("  Operator 1: operator1@247fba.de / operator123");
  console.log("  Operator 2: operator2@247fba.de / operator123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
