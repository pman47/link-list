import HeroForm from "@/components/Forms/HeroForm";

export default function Home() {
  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">Your one link for everything</h1>
          <h2 className="text-gray-500 text-xl mt-6">
            All Your Links in One Place – Effortless Sharing Made Simple
          </h2>
        </div>
        <HeroForm />
      </section>
    </main>
  );
}
