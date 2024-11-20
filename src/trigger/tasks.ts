import { schemaTask } from "@trigger.dev/sdk/v3";
import { setTimeout } from "timers/promises";
import { z } from "zod";
import { updateStatus } from "@/lib/metadataStore";

export const generateFunctionDocs = schemaTask({
  id: "generate-function-docs",
  schema: z.object({
    name: z.string(),
    code: z.string(),
  }),
  maxDuration: 300, // 5 minutes
  run: async (payload, { ctx }) => {
    updateStatus({ progress: 0, label: "Initializing..." });

    await setTimeout(1000);

    updateStatus({
      progress: 19,
      label: "Processing data...",
    });

    await setTimeout(1000);

    updateStatus({
      progress: 45,
      label: "Analyzing results...",
    });

    await setTimeout(1000);

    const prompt = `Hello there`;

    updateStatus({ progress: 85, label: "Finalizing..." });

    await setTimeout(1000);

    console.log(prompt);
    return {
      result: prompt,
    };
  },
});
