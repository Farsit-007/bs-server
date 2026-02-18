import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

// Async function to seed the Admin user
export async function seedAdmin() {
  console.log("Server");
  try {
    // 1️⃣ Hash the admin password for security
    // bcrypt.hash takes the plain password and salt rounds
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 2️⃣ Prepare the admin data payload
    // This object will be used to create the admin user in the DB
    const adminData = {
      email: "admin@pet.com",
      name: "Admin",
      password: hashedPassword,
      role: UserRole.ADMIN,
    };

    // 3️⃣ Upsert the admin user
    // upsert = update if exists, create if not
    const admin = await prisma.user.upsert({
      where: { email: adminData.email },
      update: {}, // if found → do nothing
      create: adminData, // if not found → create the user
    });

    // 4️⃣ Log success message
    console.log(" Admin seeded successfully:", admin.email);
  } catch (error) {
    console.error(" Seeding failed:", error);
  }
}

seedAdmin();
