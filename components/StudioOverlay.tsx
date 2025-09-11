"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function StudioOverlay({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Fons enfosquit */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.97 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-black "
        onClick={onClose} // tanca clicant el fons
      />

      {/* Contingut Studio */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 overflow-y-auto py-16 text-white mx-auto w-full max-w-screen-3xl px-6"
      >
        {/* Botó de tancar */}
        <button
          onClick={onClose}
          className="absolute top-20 right-6 text-2xl text-rose-500 hover:text-rose-400"
          aria-label="Close Studio"
        >
          ✕
        </button>
        <Link
        href="/"
        className="fixed left-10 top-12 z-[50] hover:opacity-90 transition"
        aria-label="Home"
      >
        <Image src="/svg/logo.svg" alt="Nata TV" width={140} height={40} />
      </Link>
        <div className="fixed bottom-5 right-6 z-[50] text-xs md:text-sm uppercase tracking-wide opacity-80 text-rose-600 font-semibold">
            NATA TELEVISION © 2025
        </div>

        <div className="mx-auto w-full max-w-screen-3xl px-6">
          <h1 className="text-3xl md:text-4xl mb-6 mt-10">
            Creative Production, Post-Production and Animation Studio.
          </h1>
          <p className="text-3xl text-rose-400 mb-6">
            We are a team of artists and directors dedicated to telling engaging 
            stories with bold visuals, exploring the unlimited possibilities of
            film, VFX, animation, interactive arts, and AI.
          </p>

          {/* GRID */}
          <div className=" gap-6 text-sm px-0">
            {/* SERVICES */}
            <div>
              <h2 className="font-semibold mb-0">SERVICES</h2>
              <ul className="space-y-0 opacity-80">
                  Creative Studio,
                  Production,
                  Service Production,
                  Post-Production,
                  VFX,
                  VFX supervision,
                  3d animation,
                  2d animation,
                  Color grading,
                  Editing,
                  Filmmakers,
                  Art Direction,
                  Motion Design,
                  Interactive Arts,
                  Visualizers,
                  Pitch design,
                  Virtual Production,
                  Music videos,
                  Commercials,
                  Film,
              </ul>
            </div>

            {/* CLIENTS */}
            <div>
              <h2 className="font-semibold mt-8">CLIENTS</h2>
              <ul className="opacity-80 space-y-0">
                {["Mama Dousha", "Pijama Studio", "Rumbo Media"].map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            {/* FOLLOW */}
            <div>
              <h2 className="font-semibold  mt-8">FOLLOW</h2>
              <ul className="opacity-80 space-y-0 text-rose-400">
                {[
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/natatelevision/",
                  },
                  {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/company/nata-television/",
                  },
                ].map((s) => (
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

            {/* LOCATION */}
            <div>
              <h2 className="font-semibold  mt-8">LOCATION</h2>
              <p className="opacity-80">
                08015 Barcelona
                <br />
                Spain
              </p>
            </div>

            {/* CONTACT */}
            <div>
              <h2 className="font-semibold mt-8">CONTACT</h2>
              <p className="opacity-80">
                For general inquiries, please contact our production team at{" "}
                hi@natatelevision.com
                <br />
                For careers, submit your CV and portfolio / website / showreel
                to hi@natatelevision.com
              </p>
            </div>
          </div>

        </div>
      </motion.main>
    </>
  );
}
