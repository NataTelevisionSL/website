"use client";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function ContactForm() {
  const { t } = useLang();
  const f = t.studio.form;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!privacyAccepted) {
      setPrivacyError(true);
      return;
    }
    setPrivacyError(false);
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xlgzovyz", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setPrivacyAccepted(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="contact" className="border-t border-neutral-800 px-8 md:px-14 py-14 bg-neutral-950">
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-10">
        {f.title}
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">{f.name}</span>
            <input
              name="name"
              type="text"
              required
              placeholder={f.namePlaceholder}
              className="w-full bg-transparent border-b border-neutral-700 pb-2 text-white placeholder:text-neutral-600 focus:outline-none focus:border-rose-500 transition"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">{f.email}</span>
            <input
              name="email"
              type="email"
              required
              placeholder={f.emailPlaceholder}
              className="w-full bg-transparent border-b border-neutral-700 pb-2 text-white placeholder:text-neutral-600 focus:outline-none focus:border-rose-500 transition"
            />
          </label>
        </div>

        {/* Project type */}
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">{f.type}</span>
          <div className="relative">
            <select
              name="service"
              defaultValue={f.typeClient}
              className="w-full bg-transparent border-b border-neutral-700 pb-2 text-white appearance-none focus:outline-none focus:border-rose-500 transition cursor-pointer"
            >
              <option value="" disabled className="bg-black">{f.typeDefault}</option>
              <option value={f.typeClient} className="bg-black">{f.typeClient}</option>
              <option value={f.typeCareer} className="bg-black">{f.typeCareer}</option>
              <option value={f.typeCollaboration} className="bg-black">{f.typeCollaboration}</option>
              <option value={f.typeOther} className="bg-black">{f.typeOther}</option>
            </select>
            <span className="pointer-events-none absolute right-0 bottom-2.5 text-neutral-500">▾</span>
          </div>
        </label>

        {/* Message */}
        <label className="block">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">{f.message}</span>
          <textarea
            name="message"
            required
            rows={3}
            placeholder={f.messagePlaceholder}
            className="w-full bg-transparent border-b border-neutral-700 pb-2 text-white placeholder:text-neutral-600 focus:outline-none focus:border-rose-500 transition resize-none"
          />
        </label>

        {/* Privacy consent */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => {
              setPrivacyAccepted(e.target.checked);
              if (e.target.checked) setPrivacyError(false);
            }}
            className="mt-0.5 accent-rose-500"
          />
          <span className="text-xs text-neutral-400 leading-relaxed">
            {f.privacyConsent}{" "}
            <Link
              href="/legal/privacidad"
              className="text-rose-400 hover:underline underline-offset-4"
            >
              {f.privacyLink}
            </Link>
            .
          </span>
        </label>
        {privacyError && (
          <p className="text-xs text-rose-400 -mt-6">{f.privacyRequired}</p>
        )}

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="border border-white text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {status === "sending" ? f.sending : status === "sent" ? f.sent : f.send}
          </button>
          {status === "error" && (
            <p className="mt-3 text-xs text-rose-400">{f.error}</p>
          )}
        </div>
      </form>
      <p className="mt-10 text-xs text-neutral-600 leading-relaxed">
        {f.fallback.split(/(hi@natatelevision\.com|\+34 619 92 63 11)/).map((part, i) => {
          if (part === "hi@natatelevision.com") {
            return (
              <a key={i} href="mailto:hi@natatelevision.com"
                className="text-white font-semibold text-sm tracking-wide hover:opacity-80 transition"
              >
                hi@natatelevision.com
              </a>
            );
          }
          if (part === "+34 619 92 63 11") {
            return (
              <a key={i} href="tel:+34619926311"
                className="text-white font-semibold text-sm tracking-wide hover:opacity-80 transition"
              >
                +34 619 92 63 11
              </a>
            );
          }
          return part;
        })}
      </p>
    </div>
  );
}
