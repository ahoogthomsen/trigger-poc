import { GenerateData } from "@/components/GenerateData.client";
import { createClient } from "@/lib/supabase/server";

export type TestTableRun = {
  id: string;
  created_at: string;
  handle_id: string;
};

export default async function Home() {
  const supabase = createClient();

  const { data: existingRuns } = await supabase
    .from("test_table")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Trigger.dev realtime POC</h1>
      <GenerateData initialRuns={existingRuns ?? []} />
    </main>
  );
}
