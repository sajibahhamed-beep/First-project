import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const newContact = await prisma.contactMessage.create({
      data: {
        fullName: "Test User",
        email: "test@example.com",
        whatsapp: "1234567890",
        projectDetails: "This is a test from the audit script to ensure db writes are successful.",
        status: "UNREAD",
      },
    });
    console.log("Database write successful, ID:", newContact.id);

    // Clean up
    await prisma.contactMessage.delete({ where: { id: newContact.id } });
    console.log("Database cleanup successful");
  } catch (error) {
    console.error("Database check failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
