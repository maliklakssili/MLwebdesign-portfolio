import { useEffect, useState, type MouseEvent } from "react";

const CONTACT = {
  name: "Malik Lakssili",
  role: "Founder — MLwebdesign",
  email: "contact@mlwebdesign.ca",
  phone: "+15146647622",
  phoneDisplay: "+1 514 664 7622",
  site: "mlwebdesign.ca",
};

const prefersReducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function BusinessCard() {
  const [flipped, setFlipped] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  function toggle() {
    setFlipped((v) => !v);
  }

  function saveContact(e: MouseEvent) {
    e.stopPropagation();
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Lakssili;Malik;;;",
      "FN:Malik Lakssili",
      "ORG:MLwebdesign",
      "TITLE:Founder",
      `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
      `TEL;TYPE=CELL:${CONTACT.phone}`,
      `URL:https://${CONTACT.site}`,
      "END:VCARD",
    ].join("\r\n");
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "malik-lakssili-mlwebdesign.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setToast("Contact saved");
  }

  function copyEmail(e: MouseEvent) {
    e.stopPropagation();
    navigator.clipboard
      .writeText(CONTACT.email)
      .then(() => setToast("Email copied"))
      .catch(() => setToast("Copy failed"));
  }

  return (
    <div className="w-full max-w-[340px]">
      <div
        className="w-full cursor-pointer select-none"
        style={{ aspectRatio: "1.75 / 1", perspective: "1600px" }}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-label="Flip business card"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            transition: prefersReducedMotion ? "none" : "transform 0.7s cubic-bezier(0.65,0,0.35,1)",
            transform: flipped ? "rotateY(180deg)" : "none",
          }}
        >
          {/* front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[14px] border border-hairline-strong bg-bg p-6"
            style={{ backfaceVisibility: "hidden", boxShadow: "0 30px 60px -25px rgba(0,0,0,0.8)" }}
          >
            <img
              src="/signature-logo.png"
              alt="MLwebdesign"
              className="max-h-[42%] max-w-[42%] rounded-md object-contain"
            />
            <div className="absolute bottom-4 right-5 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.1em] text-caption">
              TAP TO FLIP
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-3-6.7M21 3v6h-6" />
              </svg>
            </div>
          </div>

          {/* back */}
          <div
            className="absolute inset-0 flex flex-col justify-center gap-3.5 rounded-[14px] border border-hairline-strong bg-bg p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "0 30px 60px -25px rgba(0,0,0,0.8)",
            }}
          >
            <div>
              <div className="font-display text-lg font-medium tracking-[-0.01em] text-fg">{CONTACT.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-caption">{CONTACT.role}</div>
            </div>
            <div className="h-px w-full bg-hairline" />
            <div className="flex flex-col gap-1">
              <a
                href={`mailto:${CONTACT.email}`}
                onClick={(e) => e.stopPropagation()}
                className="-mx-2.5 flex items-center gap-2.5 rounded-lg px-2.5 py-1 text-fg transition-colors hover:bg-fill-a"
              >
                <span className="text-caption">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span className="font-mono text-xs">{CONTACT.email}</span>
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="-mx-2.5 flex items-center gap-2.5 rounded-lg px-2.5 py-1 text-fg transition-colors hover:bg-fill-a"
              >
                <span className="text-caption">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.3a16 16 0 0 0 6 6l1.5-1.4a2 2 0 0 1 2.1-.4c1 .4 2 .6 3 .7a2 2 0 0 1 1.4 2Z" />
                  </svg>
                </span>
                <span className="font-mono text-xs">{CONTACT.phoneDisplay}</span>
              </a>
              <a
                href={`https://${CONTACT.site}`}
                target="_blank"
                rel="noopener"
                onClick={(e) => e.stopPropagation()}
                className="-mx-2.5 flex items-center gap-2.5 rounded-lg px-2.5 py-1 text-fg transition-colors hover:bg-fill-a"
              >
                <span className="text-caption">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
                  </svg>
                </span>
                <span className="font-mono text-xs">{CONTACT.site}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={saveContact}
          className="flex-1 rounded-full border border-hairline-strong px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg transition-colors hover:bg-fill-a"
        >
          Save contact
        </button>
        <button
          type="button"
          onClick={copyEmail}
          className="flex-1 rounded-full border border-hairline-strong px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg transition-colors hover:bg-fill-a"
        >
          Copy email
        </button>
      </div>

      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-fg px-4.5 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-bg transition-all duration-300 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>
    </div>
  );
}
