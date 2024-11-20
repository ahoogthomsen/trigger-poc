"use server";

import { tasks } from "@trigger.dev/sdk/v3";
import type { generateFunctionDocs } from "@/trigger/tasks";
import { redirect } from "next/navigation";

const mockFunctionsToDocument = {
  fetchUserData: `
    async function fetchUserData(userId: string) {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    }
  `,
  calculateTotal: `
    function calculateTotal(items: { price: number; quantity: number }[]) {
      return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  `,
  formatDateTime: `
    function formatDateTime(date: Date) {
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long'
      }).format(date);
    }
  `,
};

export async function startRun() {
  const tag = "user-1234567";
  console.log("Starting run with tag:", tag);

  const batchItems = Object.entries(mockFunctionsToDocument).map(
    ([name, code]) => ({
      payload: {
        name,
        code,
        tag,
      },
      options: {
        tags: [tag],
        queue: {
          name: "function-docs-queue",
          concurrencyLimit: 5,
        },
      },
    })
  );

  console.log(`Triggering batch with ${batchItems.length} items`);

  try {
    const batchHandle = await tasks.batchTrigger<typeof generateFunctionDocs>(
      "generate-function-docs",
      batchItems
    );

    console.log("Batch triggered successfully:", batchHandle);
    redirect(`/runs/${tag}`);
  } catch (error) {
    if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Failed to trigger batch:", error);
    throw error;
  }
}
