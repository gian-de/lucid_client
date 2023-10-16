import ImportClient from "./import/components/client";

// export const revalidate = 3;
//

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen mt-16">
      <ImportClient />
    </main>
  );
}
