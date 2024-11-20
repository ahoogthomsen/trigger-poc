import { GenerateFunctionDocs } from "@/components/GenerateFunctionDocs";
import { TriggerProvider } from "@/components/TriggerProvider";
import { generatePublicAccessToken } from "@/lib/trigger";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function RunsPage({ params }: PageProps) {
  const accessToken = await generatePublicAccessToken(params.id);
  return (
    <TriggerProvider accessToken={accessToken}>
      <GenerateFunctionDocs tag={params.id} />
    </TriggerProvider>
  );
}
