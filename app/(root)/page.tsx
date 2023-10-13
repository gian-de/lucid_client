import ImportClient from "./import/components/client";

export const revalidate = 600000;

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen mt-20">
      <ImportClient />
    </main>
  );
}
