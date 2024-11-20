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

  // Convert active runs to RunStatus format
  const runsStatus: RunStatus[] =
    activeRuns?.map((run) => {
      const isCompleted = run.status === "COMPLETED";

      const status: GenerateFunctionDocsStatus = {
        state: isCompleted ? "completed" : "running",
        progress: 0,
        label: "Initializing...",
        output: run.output?.result,
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

  const aggregateStatus = {
    totalRuns: runsStatus.length,
    completedRuns: runsStatus.filter((r) => r.status.state === "completed")
      .length,
    averageProgress:
      runsStatus.reduce((sum, run) => sum + run.status.progress, 0) /
      (runsStatus.length || 1),
    isComplete: runsStatus.every((run) => run.status.state === "completed"),
  };

  return {
    runs: runsStatus,
    aggregate: aggregateStatus,
    error,
  };
}
