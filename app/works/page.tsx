import Image from "next/image";
import { WORKS } from "@/data/works";
import Nav from "@/components/Nav";
import VimeoWork from "@/components/VimeoWork";

export const metadata = { title: "Works — Nata Television" };

export default function Works() {
  return (
    <>
      <main className="relative min-h-screen">
        <section
        className="
            mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-1 gap-9
        "
        >
          {WORKS.map((w) => (
            <article key={w.id} className="">
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
        <div className="fixed bottom-5 right-6 z-[50] text-xs md:text-sm uppercase tracking-wide opacity-80 text-rose-600 font-semibold">
            NATA TELEVISION © 2025
            </div>
      </main>
      <Nav />
    </>
  );
}
