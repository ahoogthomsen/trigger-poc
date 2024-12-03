"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useAction } from "next-safe-action/hooks";
import { startRunAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { TriggerProvider } from "./TriggerProvider";
import { GenerateFunctionDocs } from "./GenerateFunctionDocs";

export function StartRunButton() {
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
      <Button onClick={() => execute({})} type="button" size="lg">
        Start New Run
      </Button>

      <TriggerProvider accessToken={accessToken}>
        <GenerateFunctionDocs tag={runTag} />
      </TriggerProvider>
    </>
  );
}
