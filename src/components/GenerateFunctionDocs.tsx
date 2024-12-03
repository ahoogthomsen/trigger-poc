"use client";

import { useGenerateFunctionDocs } from "@/app/hooks/useGenerateFunctionDocs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GenerateFunctionDocsProps {
  tag?: string | null;
}

export function GenerateFunctionDocs({ tag }: GenerateFunctionDocsProps) {
  const { runs, error } = useGenerateFunctionDocs(tag ?? "");

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
    return null;
  }

  return (
    <>
      {/* Grid of Individual Function Cards */}

      {runs.map((run) => (
        <Card key={run.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg truncate" title={run.handlerId}>
              {run.handlerId}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <Progress value={run.status.progress} />
            <p className="text-sm text-muted-foreground">{run.status.label}</p>

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
    </>
  );
}
