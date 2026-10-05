const DOCS_URL = "https://saturn-sepehr.github.io/GClass/documentation/quick-start/";

const NAV = [
  ["Install", "#install"],
  ["Quick start", "#quick-start"],
  ["Class anatomy", "#anatomy"],
  ["Notes", "#notes"],
];

function GClassLogo() {
  return (
    <svg
      width="32px"
      height="32px"
      viewBox="0 0 54 54"
      role="img"
      aria-label="GClass logo"
    >
      <path
        fill="currentColor"
        d="M14.64 0 L8.30 23.87 L12.85 25.44 C12.86 25.41 12.88 25.38 12.89 25.36 C13.76 23.58 15.03 22.07 16.62 20.94 L16.62 20.93 C17.14 20.56 17.69 20.25 18.27 19.99 Z M22.70 21.60 C21.06 21.60 19.60 22.05 18.32 22.96 C17.07 23.85 16.09 25.01 15.39 26.45 C14.69 27.86 14.34 29.31 14.34 30.80 C14.34 32.30 14.67 33.72 15.31 35.07 C15.98 36.40 16.91 37.47 18.12 38.29 C19.34 39.12 20.74 39.53 22.31 39.53 C24.16 40.42 25.74 39.93 27.03 38.91 C28.34 37.88 29.24 36.55 29.73 34.93 L30.04 34.88 C30.30 34.79 30.52 34.64 30.69 34.43 C30.87 34.21 30.96 33.94 30.96 33.65 C30.96 33.00 30.68 32.59 30.12 32.42 C29.17 32.12 28.20 31.97 27.21 31.97 C26.51 31.97 25.82 32.01 25.14 32.10 C24.47 32.19 23.99 32.29 23.70 32.42 C23.07 32.68 22.75 33.11 22.75 33.70 C22.75 34.10 22.88 34.42 23.12 34.67 C23.38 34.90 23.69 35.01 24.04 35.01 C24.21 35.01 24.45 34.97 24.74 34.88 C25.46 34.70 26.11 34.60 26.71 34.56 L27.10 34.56 C26.70 35.59 26.08 36.40 25.24 36.97 C24.40 37.53 23.42 37.81 22.31 37.81 C21.17 37.81 20.19 37.50 19.37 36.89 C18.57 36.26 17.96 35.48 17.56 34.53 C17.16 33.59 16.96 32.64 16.96 31.70 C16.96 30.90 17.16 29.98 17.56 28.95 C17.96 27.92 18.59 27.03 19.45 26.28 C20.32 25.51 21.40 25.13 22.70 25.13 C23.94 25.13 24.93 25.41 25.66 25.99 C26.40 26.55 26.92 27.25 27.24 28.09 C27.45 28.64 27.87 28.92 28.49 28.92 C28.88 28.92 29.18 28.82 29.41 28.61 C29.64 28.38 29.75 28.08 29.75 27.72 C29.75 27.23 29.49 26.56 28.97 25.73 C28.44 24.89 27.65 24.14 26.58 23.50 C25.53 22.83 24.24 22.50 22.70 22.50 Z M35.84 23.02 L32.05 26.32 C32.18 26.74 32.25 27.19 32.25 27.72 C32.25 28.57 31.89 29.59 31.23 30.29 C31.81 30.55 32.42 30.86 32.82 31.44 C33.23 32.05 33.41 32.72 33.45 33.33 L53.47 40.22 Z M15.73 40.51 L0 54.19 L23.71 47.53 L22.82 42.92 C22.65 42.93 22.48 42.93 22.31 42.93 C20.31 42.93 18.36 42.37 16.73 41.28 C16.38 41.05 16.05 40.79 15.73 40.51 Z"
      />
    </svg>
  );
}

function ExitButton() {
  return (
    <a
      href={DOCS_URL}
      aria-label="Return to the GClass  documentation"
      title="Return to the docs"
      className="shrink-0 bg-[#ededed] p-2 priority-2 spawn-down ease-circ rounded-md text-black transition-colors ml-auto "
    >
     return to docs
    </a>
  );
}

function CodeBlock({ code }) {
  return (
    <pre className="group scroll spawn-down ease-circ relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink">
      <code>{code}</code>
      <button
        type="button"
        data-copy
        aria-label="Copy code"
        className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand"
      >
        Copy
      </button>
    </pre>
  );
}

const CARDS = [
  {
    title: "Install",
    body: "GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically - nothing is bundled or redistributed.",
    href: "#install",
  },
  {
    title: "Quick start",
    body: "Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates - no per-element JS, no config files.",
    href: "#quick-start",
  },
  {
    title: "Class anatomy",
    body: "Behaviour (.spawn-up) + trigger (.scroll, .appear) + tunables (.time-1, .ease-back, .priority-2). Combine freely - order in class does not matter.",
    href: "#anatomy",
  },
];

function Section({ id, title, lede, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-10">
      <h2 className="font-display scroll spawn-text-spawn-up ease-circ randomize-y-[100]-[10] letter text-3xl font-bold tracking-tight">
        {title}
      </h2>
      {lede && <p className="mt-3 text-muted scroll typewriter">{lede}</p>}
      {children}
    </section>
  );
}

export default function Page() {
  return (
    <>
      <div className="gc-bar scroll-progress" />

      <header className="sticky top-0 z-40 time-2 border-b curtain-horizontal border-line bg-[#0a0a0a] backdrop-blur">
        <div className="mx-auto flex items-center gap-6 px-10 py-4">
          <svg className="order priority-49 spawn-down ease-circ" fill="#ffffff" width="32px" height="32px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>Next.js icon</title><path d="M17.813 22.502c-.089.047-.084.066.005.021a.228.228 0 0 0 .07-.047c0-.016-.002-.014-.075.026zm.178-.094c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.117-.071c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.117-.07c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.162-.105c-.082.052-.108.087-.035.047.052-.03.136-.094.122-.096a.466.466 0 0 0-.087.049zM11.214.006c-.052.005-.216.021-.364.033-3.408.307-6.601 2.146-8.623 4.973a11.876 11.876 0 0 0-2.118 5.243c-.096.659-.108.854-.108 1.748s.012 1.088.108 1.748c.652 4.506 3.859 8.292 8.208 9.695.779.251 1.6.422 2.533.525.364.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.206-.106.246-.134.218-.157a231.73 231.73 0 0 1-1.954-2.62l-1.919-2.592-2.404-3.558a332.01 332.01 0 0 0-2.421-3.556c-.009-.002-.019 1.579-.023 3.509-.007 3.38-.009 3.516-.052 3.596a.424.424 0 0 1-.206.213c-.075.038-.141.045-.495.045H7.81l-.108-.068a.442.442 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.34 12.34 0 0 0 2.465-2.163 11.94 11.94 0 0 0 2.824-6.134c.096-.659.108-.854.108-1.748s-.012-1.088-.108-1.748c-.652-4.506-3.859-8.292-8.208-9.695a12.552 12.552 0 0 0-2.498-.523c-.225-.023-1.776-.049-1.97-.03zm4.912 7.258a.471.471 0 0 1 .237.277c.019.061.023 1.365.019 4.304l-.007 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.009-3.096.023-3.15a.484.484 0 0 1 .232-.296c.096-.049.131-.054.5-.054.347 0 .408.005.486.047z"></path></g></svg> 
          <strong className="order priority-49 spawn-down ease-circ">+</strong>
          <span className="flex shrink-0 items-center gap-2 text-gray-1000">
            <svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 54 54"
     width="32px"
     height="32px"
     role="img"
     className="order priority-49 spawn-down ease-circ"
     aria-label="GClass logo">
  <path fill="#ffffff" d="M14.64 0 L8.30 23.87 L12.85 25.44 C12.86 25.41 12.88 25.38 12.89 25.36 C13.76 23.58 15.03 22.07 16.62 20.94 L16.62 20.93 C17.14 20.56 17.69 20.25 18.27 19.99 Z M22.70 21.60 C21.06 21.60 19.60 22.05 18.32 22.96 C17.07 23.85 16.09 25.01 15.39 26.45 C14.69 27.86 14.34 29.31 14.34 30.80 C14.34 32.30 14.67 33.72 15.31 35.07 C15.98 36.40 16.91 37.47 18.12 38.29 C19.34 39.12 20.74 39.53 22.31 39.53 C24.16 40.42 25.74 39.93 27.03 38.91 C28.34 37.88 29.24 36.55 29.73 34.93 L30.04 34.88 C30.30 34.79 30.52 34.64 30.69 34.43 C30.87 34.21 30.96 33.94 30.96 33.65 C30.96 33.00 30.68 32.59 30.12 32.42 C29.17 32.12 28.20 31.97 27.21 31.97 C26.51 31.97 25.82 32.01 25.14 32.10 C24.47 32.19 23.99 32.29 23.70 32.42 C23.07 32.68 22.75 33.11 22.75 33.70 C22.75 34.10 22.88 34.42 23.12 34.67 C23.38 34.90 23.69 35.01 24.04 35.01 C24.21 35.01 24.45 34.97 24.74 34.88 C25.46 34.70 26.11 34.60 26.71 34.56 L27.10 34.56 C26.70 35.59 26.08 36.40 25.24 36.97 C24.40 37.53 23.42 37.81 22.31 37.81 C21.17 37.81 20.19 37.50 19.37 36.89 C18.57 36.26 17.96 35.48 17.56 34.53 C17.16 33.59 16.96 32.64 16.96 31.70 C16.96 30.90 17.16 29.98 17.56 28.95 C17.96 27.92 18.59 27.03 19.45 26.28 C20.32 25.51 21.40 25.13 22.70 25.13 C23.94 25.13 24.93 25.41 25.66 25.99 C26.40 26.55 26.92 27.25 27.24 28.09 C27.45 28.64 27.87 28.92 28.49 28.92 C28.88 28.92 29.18 28.82 29.41 28.61 C29.64 28.38 29.75 28.08 29.75 27.72 C29.75 27.23 29.49 26.56 28.97 25.73 C28.44 24.89 27.65 24.14 26.58 23.50 C25.53 22.83 24.24 22.50 22.70 22.50 Z M35.84 23.02 L32.05 26.32 C32.18 26.74 32.25 27.19 32.25 27.72 C32.25 28.57 31.89 29.59 31.23 30.29 C31.81 30.55 32.42 30.86 32.82 31.44 C33.23 32.05 33.41 32.72 33.45 33.33 L53.47 40.22 Z M15.73 40.51 L0 54.19 L23.71 47.53 L22.82 42.92 C22.65 42.93 22.48 42.93 22.31 42.93 C20.31 42.93 18.36 42.37 16.73 41.28 C16.38 41.05 16.05 40.79 15.73 40.51 Z"/>
</svg>
          
          </span>
          <nav className="hidden gap-5 text-sm font-medium text-muted sm:flex">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="transition-colors order priority-50 spawn-down ease-circ hover:text-brand"
              >
                {label}
              </a>
            ))}
          </nav>
          <ExitButton />
        </div>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col px-6 pb-24">
        {/* hero — the pitch: what if this were just part of Next.js */}
        <section className="relative w-full">
          <div className="relative mx-auto flex w-full flex-col items-center py-16">
            
            <div className="hero-grid-line scroll  curtain-vertical priority-3 left-0 top-0 h-full opacity-30" />
            <div className="hero-grid-line scroll  curtain-vertical priority-3 right-0 top-0 h-full opacity-30" />
            <div className="hero-grid-line scroll curtain-vertical left-[30%] top-0 h-full" />
            <div className="hero-grid-line scroll curtain-vertical right-[30%] top-0 h-full" />
            <svg
              className="hero-grid-circle left-[-12px] top-[90px] max-md:hidden"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="11.5"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="2 3"
                className=" scroll draw time-2"
              />
            </svg>
            <svg
              className="hero-grid-circle bottom-[-12px] right-[-12px] max-md:hidden"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="11.5"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="2 3"
                className="scroll draw time-2"
              />
            </svg>
            <p className="font-mono text-sm text-muted typewriter scroll">
              Not affiliated with or endorsed by Next.js

            </p>
            <p className="font-mono text-sm text-white underline" ><a href="https://nextjs.org/" className="typewriter">Official Next.js website</a></p>
            <h1 className="mt-3 scroll spawn-text-spawn-up randomize-y-[100]-[10] time-2.5 ease-circ letter px-6 text-center font-display text-5xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
              gclass-anims for <span className="text-white">Next.js</span>
            </h1>
            <p className="mt-6 max-w-2xl typewriter-split  scroll text-center text-lg leading-relaxed text-muted">
              The docs site itself is a <strong className="text-white font-medium"> Next.js App Router </strong> app! Re-call <strong className="text-white font-medium">initAnimations()</strong>  on pathname changes because the root layout persists across route navigations.
            </p>
            <div className="mt-8 flex flex-row items-center gap-4 max-sm:flex-col">
              <a
                href="#install"
                className="inline-flex h-9 scroll spawn-down ease-circ click-expand amount-11 pulse compatibility items-center justify-center rounded-md bg-brand px-6 text-sm font-bold text-page hover:opacity-90"
              >
                Get started
              </a>
            </div>
            <div className="mt-10 flex items-center scroll typewriter-split letter gap-1 font-mono text-[13px] text-muted">
              <span aria-hidden="true">G</span>
              <span aria-hidden="true">~</span>
              <span>npm install gclass-anims</span>
            </div>
          </div>
        </section>

        <Section
          title="What&apos;s in the box?"
          lede="Three things: an npm install, one init call, then class names on your markup."
        >
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {CARDS.map((card) => (
              <a
                key={card.href}
                href={card.href}
                className="rounded-lg scroll order priority-100 spawn-down ease-circ border border-line bg-panel p-4 transition-colors hover:border-brand"
              >
                <h3 className="font-display font-bold text-brand">{card.title}</h3>
                <p className="mt-1 text-sm text-muted">{card.body}</p>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="install"
          title="Install"
          lede="GSAP is a regular dependency and is installed automatically - nothing is bundled or redistributed."
        >
          <div className="mt-5">
            <CodeBlock code="npm install gclass-anims" />
          </div>
        </Section>

        <Section
          id="quick-start"
          title="Quick start"
          lede="Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates - no per-element JS, no config files."
        >
          <h3 className="mt-7 scroll typewriter font-display text-lg font-bold">
            Usage - App Router (recommended)
          </h3>
          <div className="mt-4">
            <CodeBlock
              code={`// app/layout.js
import AnimInit from '@/Shared/animInit'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AnimInit />
        {children}
      </body>
    </html>
  )
}

// Shared/animInit.js
"use client"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAnimations } from 'gclass-anims'

export default function AnimInit() {
  const pathname = usePathname()
  useEffect(() => { initAnimations() }, [pathname])
  return null
}`}
            />
          </div>

          <h3 className="mt-7 font-display text-lg scroll typewriter font-bold">Pages Router</h3>
          <div className="mt-4">
            <CodeBlock
              code={`// pages/_app.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { initAnimations } from 'gclass-anims'

export default function App({ Component, pageProps }) {
  const { asPath } = useRouter()
  useEffect(() => { initAnimations() }, [asPath])
  return <Component {...pageProps} />
}`}
            />
          </div>

          <p className="mt-4 border-l-2 border-brand pl-4 scroll typewriter-split letter text-sm text-muted">
            Mark elements you want to keep across navigations with{" "}
            <code className="font-mono">.preserve</code> (header, nav). All other{" "}
            <code className="font-mono">.appear</code> /{" "}
            <code className="font-mono">.scroll</code> elements replay per route.
          </p>
        </Section>

        <Section
          id="anatomy"
          title="Class anatomy"
          lede="Class anatomy: behaviour (.spawn-up) + trigger (.scroll, .appear) + tunables (.time-1, .ease-back, .priority-2). Combine freely - order in class does not matter."
        >
          <div className="mt-5">
            <CodeBlock
              code={`// behaviour + trigger + tunables
<div class="appear scroll spawn-up">…</div>
<div class="appear scroll order ease-expo time-1 priority-2">…</div>
<div class="float">loops forever</div>
<button class="magnet click-expand">magnet + click</button>`}
            />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Behaviour", "spawn-up, float, marquee, magnet"],
              ["Trigger", "appear, scroll, preserve"],
              ["Tunables", "order, ease-expo, time-1, priority-2"],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-lg order spawn-down ease-circ scroll border border-line bg-panel p-4"
              >
                <h4 className="font-display font-bold text-brand">{title}</h4>
                <p className="mt-1 font-mono text-[12px] text-muted">{detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="notes"
          title="Notes"
          lede="Build details and behaviour that is not obvious from the classes."
        >
          <ul className="mt-6 space-y-4 scroll spawn-down ease-circ">
            {[
              <>
                <strong className="text-ink">Dual build.</strong> ESM is{" "}
                <code className="font-mono">dist/gclass.esm.js</code> and CJS is{" "}
                <code className="font-mono">dist/gclass.cjs</code> via{" "}
                <code className="font-mono">vite.lib.config.js</code> - GSAP is
                external, not bundled. The build is tree-shakable with{" "}
                <code className="font-mono">sideEffects: false</code>.
              </>,
              <>
                <strong className="text-ink">GSAP isn&apos;t bundled.</strong> It
                comes in as a regular dependency under the Webflow Standard
                No-Charge GSAP License. Nothing here redistributes it.
              </>,
              <>
                <strong className="text-ink">Dynamic content.</strong> A
                MutationObserver watches the document for insertions - any added
                element carrying <code className="font-mono">.appear</code> plays
                its entrance immediately, so markup rendered after mount keeps
                animating.
              </>,
            ].map((note, i) => (
              <li
                key={i}
                className="rounded-lg border border-line bg-panel p-5"
              >
                {note}
              </li>
            ))}
          </ul>
        </Section>

        <footer className="border-t border-line pt-8 text-sm text-muted">
          <p>
            All colours sampled from <a href="https://nextjs.org/" className="text-white underline">https://nextjs.org</a>
          </p>
        </footer>
      </main>
    </>
  );
}
