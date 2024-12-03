"use server";

import { z } from "zod";
import { tasks } from "@trigger.dev/sdk/v3";
import type { generateFunctionDocs } from "@/trigger/tasks";

import { action } from "@/auth/safe-action";
import { generatePublicAccessToken } from "@/lib/trigger";

const schema = z.object({});

export const startRunAction = action.schema(schema).action(async () => {
  const mockFunctionsToDocument: { handler_id: string }[] = [
    {
      handler_id: Math.random().toString(36).substring(2, 15),
    },
    {
      handler_id: Math.random().toString(36).substring(2, 15),
    },
  ];
  const tag = `user-hejsan-${Math.random().toString(36).substring(2, 15)}`;

  const batchItems = mockFunctionsToDocument.map(({ handler_id }) => ({
    payload: {
      handler_id,
    },
    options: {
      tags: [tag],
      queue: {
        name: "function-docs-queue",
        concurrencyLimit: 5,
      },
    },
  }));

  console.log(`Triggering batch with ${batchItems.length} items`);

  try {
    await tasks.batchTrigger<typeof generateFunctionDocs>(
      "generate-function-docs",
      batchItems
    );

    const accessToken = await generatePublicAccessToken(tag);

    return {
      status: "success",
      tag,
      accessToken,
    };
  } catch (error) {
    if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Failed to trigger batch:", error);
    throw error;
  }
});
