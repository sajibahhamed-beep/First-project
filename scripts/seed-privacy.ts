import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dummySections = [
  {
    id: "1",
    title: "Information We Collect",
    description: "We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide."
  },
  {
    id: "2",
    title: "How We Use Information",
    description: "We may use the information we collect about you to Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages."
  },
  {
    id: "3",
    title: "Sharing of Information",
    description: "We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: With Drivers to enable them to provide the Services you request. For example, we share your name, photo (if you provide one), average User rating given by Drivers, and pickup and/or drop-off locations with Drivers."
  },
  {
    id: "4",
    title: "Data Security Measures",
    description: "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no data transmission over the Internet can be guaranteed to be 100% secure. As a result, while we strive to protect your personal information, we cannot guarantee its absolute security."
  }
];

async function main() {
  try {
    const contentString = JSON.stringify(dummySections);
    
    await prisma.siteSetting.upsert({
      where: { key: "site_privacy_policy" },
      update: { value: contentString },
      create: { key: "site_privacy_policy", value: contentString },
    });
    
    console.log("Successfully seeded dummy privacy policy data.");
  } catch (error) {
    console.error("Failed to seed privacy policy:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
