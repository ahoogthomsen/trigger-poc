import { schemaTask } from "@trigger.dev/sdk/v3";
import { setTimeout } from "timers/promises";
import { z } from "zod";
import { updateStatus } from "@/lib/metadataStore";
import { supabaseAdmin } from "@/lib/supabase/admin-client";

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

    const { data, error } = await supabaseAdmin.from("test_table").insert({
      handle_id: `${Math.random()}-${Math.random()}`,
    });

    if (error) {
      throw error;
    }

    updateStatus({ progress: 100, label: "Completed!" });

    console.log(prompt);
    return {
      result: prompt,
    };
  },
});
