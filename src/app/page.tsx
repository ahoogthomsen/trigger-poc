import { StartRunButton } from "@/components/StartRunButton";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Trigger.dev realtime POC</h1>
      <StartRunButton />
    </main>
  );
}
