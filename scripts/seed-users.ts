/**
 * Seed script to insert demo users into the database
 * Run with: npx tsx scripts/seed-users.ts
 * Or: ts-node scripts/seed-users.ts
 */

import { db } from "@/db";
import { users } from "@/db";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env file in project root
dotenv.config({ path: resolve(process.cwd(), ".env") });

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL environment variable is not set!");
  console.log("\n💡 Please create a .env file in the project root with:");
  console.log("   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres");
  console.log("\n   Get your connection string from Supabase:");
  console.log("   Project Settings > Database > Connection string (URI format)");
  process.exit(1);
}

async function seedUsers() {
  try {
    console.log("🌱 Starting to seed users...");

    // Demo users data
    const demoUsers = [
      {
        email: "john.doe@example.com",
        name: "John Doe",
        password: "hashed_password_123", // In production, use proper hashing
        isActive: true,
      },
      {
        email: "jane.smith@example.com",
        name: "Jane Smith",
        password: "hashed_password_456",
        isActive: true,
      },
      {
        email: "bob.johnson@example.com",
        name: "Bob Johnson",
        password: "hashed_password_789",
        isActive: true,
      },
      {
        email: "alice.williams@example.com",
        name: "Alice Williams",
        password: "hashed_password_101",
        isActive: false,
      },
      {
        email: "charlie.brown@example.com",
        name: "Charlie Brown",
        password: "hashed_password_202",
        isActive: true,
      },
    ];

    // Insert users into database
    const insertedUsers = await db.insert(users).values(demoUsers).returning();

    console.log(`✅ Successfully inserted ${insertedUsers.length} users:`);
    insertedUsers.forEach((user) => {
      console.log(`   - ${user.name} (${user.email}) - ID: ${user.id}`);
    });

    console.log("\n✨ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    
    if (error instanceof Error) {
      // Check if it's a unique constraint violation (user already exists)
      if (error.message.includes("duplicate key") || error.message.includes("unique")) {
        console.log("\n💡 Tip: Some users may already exist in the database.");
        console.log("   You can delete existing users or modify the email addresses.");
      }
    }
    
    process.exit(1);
  }
}

// Run the seed function
seedUsers()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });

