import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="p-6 pt-32 max-w-4xl mx-auto">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">Your one link for everything</h1>
          <h2 className="text-gray-500 text-xl mt-6">
            All Your Links in One Place – Effortless Sharing Made Simple
          </h2>
        </div>
        <form
          action=""
          className="inline-flex items-center shadow-lg shadow-gray-700/20"
        >
          <span className="bg-white p-4 pr-0">linklist.to/</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="username"
            className="py-4"
          />
          <button type="submit" className="bg-blue-500 text-white p-4 px-6">
            Join for free
          </button>
        </form>
      </section>
    </main>
  );
}
