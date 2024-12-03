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
  handlerId: string;
  status: GenerateFunctionDocsStatus;
  createdAt: Date;
  startedAt?: Date;
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
        handlerId: run.payload.handler_id,
        status,
        createdAt: new Date(run.createdAt),
        startedAt: run.startedAt ? new Date(run.startedAt) : undefined,
      };
    }) ?? [];

  // Ok it works now for unknown reason
  const sortedRuns = [...runsStatus].sort((a, b) => {
    return (b.startedAt?.getTime() ?? 0) - (a.startedAt?.getTime() ?? 0);
  });

  return {
    runs: sortedRuns,
    error,
  };
}
