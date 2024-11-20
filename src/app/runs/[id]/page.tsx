//import { db } from "@/lib/db";
import { GenerateFunctionDocs } from "@/components/GenerateFunctionDocs";
import { CompletedRun } from "@/lib/schemas";
import { TriggerProvider } from "@/components/TriggerProvider";
import { generatePublicAccessToken } from "@/lib/trigger";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function RunsPage({ params }: PageProps) {
  // const { data: completedRuns, error } = await db
  //   .from("completed_runs")
  //   .select("id, function_name, output, completed_at")
  //   .eq("tag", params.id)
  //   .returns<
  //     Array<{
  //       id: string;
  //       function_name: string;
  //       output: string;
  //       completed_at: string;
  //     }>
  //   >();

  // if (error) {
  //   console.error("Error fetching completed runs:", error);
  //   throw error;
  // }

  // // Transform the data to match our CompletedRun type
  // const formattedRuns: CompletedRun[] = completedRuns.map((run) => ({
  //   id: run.id,
  //   functionName: run.function_name,
  //   output: run.output,
  //   completedAt: new Date(run.completed_at),
  //   tag: params.id,
  // }));

  const formattedRuns: CompletedRun[] = [];

  const accessToken = await generatePublicAccessToken(params.id);
  return (
    <TriggerProvider accessToken={accessToken}>
      <GenerateFunctionDocs tag={params.id} />
    </TriggerProvider>
  );
}
