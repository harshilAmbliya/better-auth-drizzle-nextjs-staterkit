import { Suspense } from "react";
import { checkDatabaseConnection, db } from "@/db";

export default function Home() {
  return (
    <div>
      <p> Hi Everyone, I am a new developer and this is my first post.</p>
      <Suspense fallback={<div>Loading...</div>}>
        <DatabaseConnectionStatus />
        <DisplayPosts />
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

async function DisplayPosts() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <pre className="text-wrap whitespace-pre-wrap">
      {JSON.stringify(posts, null, 2)}
    </pre>
  );
}


async function getPosts() {
  const posts = await db.query.posts.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        }
      }
    }
  })
  return posts;
}
