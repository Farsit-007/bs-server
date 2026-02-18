import app from "./app";
import { prisma } from "./lib/prisma";

async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    app.listen(5000, () => {
      console.log("Server is running on the post 5000");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
