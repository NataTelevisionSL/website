import Nav from "@/components/Nav";
import VimeoBackground from "@/components/VimeoBackground";
import VimeoWork from "@/components/VimeoWork";
import { WORKS } from "@/data/works";

export default function Home() {
  return (
    <>
      <main>
        {/* HERO */}
        <h1 className="fixed top-8 left-1/2 -translate-x-1/2 z-[50] hidden md:block text-[10px] sm:text-xs md:text-sm lg:text-base lg:text-lg text-white">
          Creative Production, Post-Production and Animation Studio.
        </h1>

        <section className="relative h-screen">
          <VimeoBackground id="1117688278" poster="/img/posters/main.jpg" />
        </section>

        {/* WORKS */}
        <section id="works" className="mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-1 gap-9">
          {WORKS.map((w) => (
            <article key={w.id}>
              <div className="flex justify-between text-sm opacity-80 font-bold">
                <span>{String(w.id).padStart(3, "0")}</span>
                <span>{String(w.title)}</span>
                <span>{w.year}</span>
              </div>
              {w.description && (
                <p className="text-sm opacity-70 mt-1 mb-2 md:text-justify">{w.description}</p>
              )}
              <div className="relative aspect-[16/9] mb-4 overflow-hidden">
                <VimeoWork id={w.vimeoId} />
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className="fixed bottom-5 right-6 z-[50] text-xs md:text-sm uppercase tracking-wide opacity-80 text-rose-600 font-bold">
        NATA TELEVISION © 2025
      </div>

      <Nav />
    </>
  );
}
