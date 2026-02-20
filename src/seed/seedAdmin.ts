import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

// Async function to seed the Admin user
export async function seedAdmin() {
  console.log("Server");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const adminData = {
    email: "admin@pet.com",
    name: "Admin",
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  try {
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingAdmin) {
      console.log(" Admin already exists:", existingAdmin.email);
      return;
    }

    const admin = await prisma.user.create({
      data: adminData,
    });

    console.log(" Admin seeded successfully:", admin.email);
  } catch (error) {
    console.error(" Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
