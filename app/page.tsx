import { Suspense } from "react";
import { checkDatabaseConnection } from "@/db";
import Link from "next/link";
import { getCurrentUser, requireAuthAndRedirect } from "@/lib/middleware/auth";
import SignoutButton from "@/components/sign-out";

export default async function Home() {
  // Redirect to login if not authenticated
  await requireAuthAndRedirect();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

async function DatabaseConnectionStatus() {
  const result = await checkDatabaseConnection();

  return (
    <div className="p-4 rounded-lg border">
      <h2 className="text-xl font-semibold mb-2">Database Status</h2>
      <p className={result.success ? "text-green-600" : "text-red-600"}>
        {result.success ? "✅ Connected" : "❌ Not Connected"}
      </p>
      {result.error && (
        <p className="text-red-500 text-sm mt-2">{result.error}</p>
      )}
    </div>
  );
}

async function GetCurrentUser() {
  const currentUser = await getCurrentUser()
  console.log(currentUser)
  return (
    <div className="p-4 rounded-lg border">
      <h2 className="text-xl font-semibold mb-2">Current User</h2>
      <p className="text-sm">Email: {currentUser?.email}</p>
      <p className="text-sm">Name: {currentUser?.name}</p>
      <p className="text-sm">ID: {currentUser?.id}</p>
    </div>
  )
}


async function HomeContent() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold mb-8">Better Auth Starter</h1>

        <div className="space-y-4 mb-8">
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Login Page
          </Link>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <DatabaseConnectionStatus />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <GetCurrentUser />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SignoutButton />
        </Suspense>
      </div>
    </div>
  )
}