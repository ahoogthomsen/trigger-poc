"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useAction } from "next-safe-action/hooks";
import { startRunAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { TriggerProvider } from "./TriggerProvider";
import { GenerateFunctionDocs } from "./GenerateFunctionDocs";
import { TestTableRun } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export function GenerateData({ initialRuns }: { initialRuns: TestTableRun[] }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [runTag, setRunTag] = useState<string | null>(null);

  const { execute } = useAction(startRunAction, {
    onSuccess: (data) => {
      setRunTag(data?.data?.tag ?? null);
      setAccessToken(data?.data?.accessToken ?? null);
    },
  });
  return (
    <>
      <Button
        onClick={() => execute({})}
        className="mb-8"
        type="button"
        size="lg"
      >
        Start New Run
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TriggerProvider accessToken={accessToken}>
          <GenerateFunctionDocs tag={runTag} />
        </TriggerProvider>

        {initialRuns.map((run) => (
          <Card key={run.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg truncate" title={run.handle_id}>
                {run.handle_id}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <Progress value={100} />
              <p className="text-sm text-muted-foreground">Completed</p>

              <div className="mt-2">
                <p className="text-sm font-medium mb-2">Output:</p>
                <div className="bg-muted rounded-md p-3 max-h-32 overflow-y-auto">
                  <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(run)}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
