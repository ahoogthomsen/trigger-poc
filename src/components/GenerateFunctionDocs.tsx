"use client";

import { useGenerateFunctionDocs } from "@/app/hooks/useGenerateFunctionDocs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GenerateFunctionDocsProps {
  tag: string;
  completedRuns: Array<{
    id: string;
    functionName: string;
    output: string;
    completedAt: Date;
  }>;
}

export function GenerateFunctionDocs({
  tag,
  completedRuns,
}: GenerateFunctionDocsProps) {
  const { runs, aggregate, error } = useGenerateFunctionDocs({
    tag,
    completedRuns,
  });

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!runs.length) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Loading...</h2>
            <Progress value={undefined} className="w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Aggregate Progress Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Overall Progress</h2>
            <Progress value={aggregate.averageProgress} className="w-full" />
            <p className="text-muted-foreground">
              {aggregate.completedRuns} of {aggregate.totalRuns} functions
              completed
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Grid of Individual Function Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {runs.map((run) => (
          <Card key={run.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg truncate" title={run.functionName}>
                {run.functionName}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <Progress value={run.status.progress} />
              <p className="text-sm text-muted-foreground">
                {run.status.label}
              </p>

              {run.status.state === "completed" && run.status.output && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">Output:</p>
                  <div className="bg-muted rounded-md p-3 max-h-32 overflow-y-auto">
                    <pre className="text-xs whitespace-pre-wrap">
                      {run.status.output}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
