import { logger, schemaTask } from "@trigger.dev/sdk/v3";
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

    logger.info("Starting task", payload);
    logger.info("Context", ctx);

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

    updateStatus({ progress: 85, label: "Finalizing..." });

    await setTimeout(1000);

    const { data, error } = await supabaseAdmin
      .from("test_table")
      .insert({
        handle_id: `${Math.random()}-${Math.random()}`,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    updateStatus({ progress: 100, label: "Completed!" });

    return {
      result: {
        id: data.id,
        created_at: data.created_at,
        handle_id: data.handle_id,
      },
    };
  },
});
