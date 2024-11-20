import { z } from "zod";

export const ExampleMetadataSchema = z.object({
  status: z.object({
    progress: z.number(),
    label: z.string(),
  }),
});

export const completedRunSchema = z.object({
  id: z.string(),
  tag: z.string(),
  functionName: z.string(),
  output: z.string(),
  completedAt: z.date(),
});

export type CompletedRun = z.infer<typeof completedRunSchema>;
