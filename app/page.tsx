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
        <section id="works" className="mx-auto max-w-3xl px-6 py-20 grid grid-cols-1 md:grid-cols-1 gap-9">
          {WORKS.map((w) => (
            <article key={w.id}>
              <div className="flex justify-between text-sm opacity-80 font-bold">
                <span>{String(w.id).padStart(3, "0")}</span>
                <span>{String(w.title)}</span>
                <span>{w.year}</span>
              </div>
              {w.description && (
                <p className="text-sm opacity-40 mt-1 mb-2 md:text-justify">{w.description}</p>
              )}
              <div className="relative aspect-[16/9] mb-4 overflow-hidden">
                <VimeoWork id={w.vimeoId} />
              </div>
            </article>
          ))}
        </section>

        {/* STUDIO */}
        <section id="studio" className="mx-auto px-6 pt-4 pb-20 text-white">
          <h1 className="text-4xl md:text-5xl mb-6 mt-5">
            Creative Production, Post-Production and Animation Studio.
          </h1>
          <p className="text-4xl text-rose-400 mb-6">
            We believe great work starts with listening. Whatever your vision or budget, we work alongside you to find the right creative solution — one that fits your needs and tells your story with care. People are at the heart of everything we make.
          </p>
          <div className="gap-6 text-sm px-0">
            <div>
              <h2 className="font-semibold mb-0">SERVICES</h2>
              <ul className="space-y-0 opacity-80">
                Creative Studio, Production, Service Production, Post-Production,
                VFX, VFX supervision, 3d animation, 2d animation, Color grading,
                Editing, Filmmakers, Art Direction, Motion Design, Interactive Arts,
                Visualizers, Pitch design, Virtual Production, Music videos,
                Commercials, Film.
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mt-8">CLIENTS</h2>
              <ul className="opacity-80 space-y-0">
                {["Mama Dousha", "Pijama Studio", "Rumbo Media", "Universal Pixel Studio", "Trez®"].map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mt-8">FOLLOW</h2>
              <ul className="opacity-80 space-y-0 text-rose-400">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/natatelevision/" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/company/nata-television/" },
                ].map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-semibold mt-8">LOCATION</h2>
              <p className="opacity-80">Carrer Canalejas 3, 08015 Barcelona, Spain</p>
            </div>
            <div>
              <h2 className="font-semibold mt-8">CAREERS</h2>
              <p className="opacity-80">
                For careers, submit your CV and portfolio / website / showreel to hi@natatelevision.com
              </p>
            </div>
            <div>
              <h2 className="font-semibold mt-8">CONTACT</h2>
              <p className="opacity-80">
                For any inquiries or further information you can email us at admin@natatelevision.com,
                +619 92 63 11 (Noé Delaye), or visit us at Carrer Canalejas 3, Barcelona.
                We offer a commission for successful project referrals.
              </p>
            </div>
          </div>
        </section>
      </main>

      <a href="/" className="fixed bottom-5 right-6 z-[50] text-xs md:text-sm uppercase tracking-wide opacity-80 text-rose-600 font-bold hover:opacity-100 transition">
        NATA TELEVISION ©
      </a>

      <Nav />
    </>
  );
}
