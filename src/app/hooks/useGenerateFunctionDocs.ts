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
  source: "realtime" | "database";
}

interface UseGenerateFunctionDocsProps {
  tag: string;
  // Completed runs from the database
  completedRuns: Array<{
    id: string;
    functionName: string;
    output: string;
    completedAt: Date;
  }>;
}

export function useGenerateFunctionDocs({
  tag,
  completedRuns,
}: UseGenerateFunctionDocsProps) {
  const { runs: activeRuns, error } =
    useRealtimeRunsWithTag<typeof generateFunctionDocs>(tag);

  // Convert active runs to RunStatus format
  const activeRunsStatus: RunStatus[] =
    activeRuns?.reduce<RunStatus[]>((acc, run) => {
      const isCompleted = run.status === "COMPLETED";

      // Skip if this run is already in completedRuns
      if (isCompleted && completedRuns.some((cr) => cr.id === run.id)) {
        return acc;
      }

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

      acc.push({
        id: run.id,
        functionName: run.payload.name,
        status,
        completedAt: isCompleted ? new Date(run.updatedAt) : undefined,
        source: "realtime",
      });

      return acc;
    }, []) ?? [];

  // Convert completed runs to RunStatus format
  const completedRunsStatus: RunStatus[] = completedRuns.map((run) => ({
    id: run.id,
    functionName: run.functionName,
    status: {
      state: "completed",
      progress: 100,
      label: "Completed",
      output: run.output,
    },
    completedAt: run.completedAt,
    source: "database",
  }));

  // Combine both arrays, with active runs first
  const allRuns = [...activeRunsStatus, ...completedRunsStatus];

  const aggregateStatus = {
    totalRuns: allRuns.length,
    completedRuns: allRuns.filter((run) => run.status.state === "completed")
      .length,
    averageProgress:
      allRuns.reduce((sum, run) => sum + run.status.progress, 0) /
      (allRuns.length || 1),
    isComplete: allRuns.every((run) => run.status.state === "completed"),
  };

  return {
    runs: allRuns,
    aggregate: aggregateStatus,
    error,
    activeRuns: activeRunsStatus,
    completedRuns: completedRunsStatus,
  };
}
