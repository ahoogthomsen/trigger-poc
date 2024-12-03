"use client";

import { parseStatus } from "@/lib/metadataStore";
import { type generateFunctionDocs } from "@/trigger/tasks";
import { useRealtimeRunsWithTag } from "@trigger.dev/react-hooks";

interface GenerateFunctionDocsStatus {
  state: "running" | "completed";
  progress: number;
  label: string;
  output?: string;
}

interface RunStatus {
  id: string;
  functionName: string;
  status: GenerateFunctionDocsStatus;
  completedAt?: Date;
}

export function useGenerateFunctionDocs(tag: string) {
  const { runs: activeRuns, error } =
    useRealtimeRunsWithTag<typeof generateFunctionDocs>(tag);

  const runsStatus: RunStatus[] =
    activeRuns?.map((run) => {
      const isCompleted = run.status === "COMPLETED";

      const status: GenerateFunctionDocsStatus = {
        state: isCompleted ? "completed" : "running",
        progress: 0,
        label: run.status,
        output: JSON.stringify(run.output?.result),
      };

      if (run.metadata) {
        const { progress, label } = parseStatus(run.metadata);
        status.progress = progress;
        status.label = label;
      }

      return {
        id: run.id,
        functionName: run.payload.name,
        status,
        completedAt: isCompleted ? new Date(run.updatedAt) : undefined,
      };
    }) ?? [];

  // If i try to sort the realtime (in order to always show the most recent runs at the top, the realtime subscription stops working)
  // const sortedRuns = [...runsStatus].sort((a, b) => {
  //   return (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0);
  // });

  return {
    runs: runsStatus,
    error,
  };
}
