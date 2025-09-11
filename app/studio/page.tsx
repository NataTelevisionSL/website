import Nav from "@/components/Nav";
export default function Studio() {
  return (
    <>
    <main className="min-h-screen px-0 py-16">
        <div className="mx-auto w-full max-w-screen-3xl px-6">
            <h1 className="text-3xl md:text-4xl mb-6 mt-10">
            Creative Production, Post-Production and Animation Studio.
            </h1>
            <p className="text-3xl text-rose-600 mb-20">
            We are a collective of artists and directors who tell engaging stories with bold visuals, exploring the unlimited possibilities of film, VFX, animation, interactive arts, and AI.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-sm px-2">
            <div>
                <h2 className="font-semibold mb-0">SERVICES</h2>
                <ul className="space-y-0 opacity-80">
                {["Creative Studio","Production","Service Production","Post-Production","VFX","VFX supervision","3d animation","2d animation","Color grading","Editing","Filmmakers","Art Direction","Motion Design","Interactive Arts","Visualizers","Pitch design","Virtual Production","Music videos","Commercials","Film"].map(s=>(
                    <li key={s}>{s}</li>
                ))}
                </ul>
            </div>
            <div>
                <h2 className="font-semibold mb-0">CLIENTS</h2>
                <ul className="opacity-80 space-y-0">
                {["Mama Dousha","Pijama Studio","Rumbo Media"].map(c=> <li key={c}>{c}</li>)}
                </ul>
            </div>
            <div>
                <h2 className="font-semibold mb-3">FOLLOW</h2>
                <ul className="opacity-80 space-y-0 text-rose-600">
                {[
                    { name: "Instagram", href: "https://www.instagram.com/natatelevision/" },
                    { name: "LinkedIn",  href: "https://www.linkedin.com/company/nata-television/" },
                ].map(s => (
                    <li key={s.name}>
                    <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                        aria-label={`${s.name} (s'obre en una pestanya nova)`}
                    >
                        {s.name}
                    </a>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h2 className="font-semibold mb-0">LOCATION</h2>
                <p className="opacity-80">08015 Barcelona<br/>Spain</p>
            </div>
            <div>
                <h2 className="font-semibold mb-0">CONTACT</h2>
                <p className="opacity-80">
                For general inquiries, please contact our production team at hi@natatelevision.com<br/><br/>
                For careers, submit your CV and portfolio / website / showreel to hi@natatelevision.com
                </p>
            </div>
            </div>
            <div className="fixed bottom-5 right-6 z-[50] text-xs md:text-sm uppercase tracking-wide opacity-80 text-rose-600 font-semibold">
            NATA TELEVISION © 2025
            </div>

        </div>
      </main>
      <Nav />
    </>
  );
}

