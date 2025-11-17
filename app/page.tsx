import { Suspense } from "react";
import { checkDatabaseConnection } from "@/db";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DatabaseConnectionStatus />
      </Suspense>
    </div>
  );
}

async function DatabaseConnectionStatus() {
  const result = await checkDatabaseConnection();

  return (
    <div>
      Hello World {result.success ? "Connected" : "Not Connected"}
    </div>
  );
}
