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
}

/**
 * Hook that subscribes to multiple generateFunctionDocs tasks and returns their statuses and outputs.
 *
 * Uses the `useRealtimeRunsWithTag` hook to subscribe to all tasks with the given tag.
 *
 * @param tag the tag used to identify the batch of runs
 */
export function useGenerateFunctionDocs(tag: string) {
  const { runs, error } =
    useRealtimeRunsWithTag<typeof generateFunctionDocs>(tag);

  const runsStatus: RunStatus[] =
    runs?.map((run) => {
      const status: GenerateFunctionDocsStatus = {
        state: run.status === "COMPLETED" ? "completed" : "running",
        progress: 0,
        label: "Initializing...",
        output: run.output?.result,
      };

      // Parse metadata if available
      if (run.metadata) {
        const { progress, label } = parseStatus(run.metadata);
        status.progress = progress;
        status.label = label;
      }

      return {
        id: run.id,
        functionName: run.payload.name,
        status,
      };
    }) ?? [];

  // Calculate aggregate progress
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
    rawRuns: runs, // Include raw runs data if needed
  };
}
