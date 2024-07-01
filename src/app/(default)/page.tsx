import HeroForm from "@/components/Forms/HeroForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">Your one link for everything</h1>
          <h2 className="text-gray-500 text-xl mt-6">
            All Your Links in One Place – Effortless Sharing Made Simple
          </h2>
        </div>
        <HeroForm user={session?.user} />
      </section>
    </main>
  );
}
