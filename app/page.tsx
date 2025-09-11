import Nav from "@/components/Nav";
import VimeoBackground from "@/components/VimeoBackground";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen">
        {/* HERO */}
        <h1 className="fixed top-8 left-1/2 -translate-x-1/2 z-[50] hidden md:block text-[10px] sm:text-xs md:text-sm lg:text-base lg:text-lg text-white">
          Creative Production, Post-Production and Animation Studio.
        </h1>

        <section className="relative h-screen">
        <VimeoBackground id="1117685610" />
        </section>

      </main>

      <div className="fixed bottom-5 right-6 z-[50] text-xs md:text-sm uppercase tracking-wide opacity-80 text-rose-600 font-bold">
        NATA TELEVISION © 2025
      </div>

      <Nav />
    </>
  );
}
