"use server";

import { tasks } from "@trigger.dev/sdk/v3";
import type { generateFunctionDocs } from "@/trigger/tasks";
import { redirect } from "next/navigation";

// Mock functions to document
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
  const tag = "user-12345";

  // Create batch items from mock functions
  const batchItems = Object.entries(mockFunctionsToDocument).map(
    ([name, code]) => ({
      payload: {
        name,
        code,
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

  await tasks.batchTrigger<typeof generateFunctionDocs>(
    "generate-function-docs",
    batchItems
  );

  redirect(`/runs/${tag}`);
}

// // Keep this utility function for future use
// function getFunctionDetails(obj: any): Array<{ name: string; code: string }> {
//   return Object.getOwnPropertyNames(obj)
//     .filter((name) => typeof obj[name] === "function")
//     .map((name) => ({
//       name,
//       code: obj[name].toString(),
//     }));
// }
