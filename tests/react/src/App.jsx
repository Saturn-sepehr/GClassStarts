import { useEffect } from "react";
import { initAnimations } from "gclass-anims";
import "./copy.js";

export default function App() {
  // Hooks must live inside the component — calling this at module scope runs
  // before React installs its dispatcher and throws
  // "Cannot read properties of null (reading 'useEffect')".
  //
  // An empty dependency array runs it once after mount. A MutationObserver then
  // discovers .appear and .scroll elements as they render, so nothing else
  // needs wiring.
  //
  // Copy-to-clipboard lives in ./copy.js, installed once on import.
  useEffect(() => {
    initAnimations();
  }, []);

  return (
    <div className="text-[#f6f7f9] font-display text-center">
<div className="gc-bar scroll-progress" />

  <header className="sticky clip-reveal-up top-0 z-40 border-b border-line bg-page/90 backdrop-blur">
    <div className="mx-auto flex max-w-4xl items-center gap-6 px-6 py-4">
      <span className="flex order spawn-down shrink-0 items-center gap-2 font-display text-lg font-bold"><span className="text-brand"><svg className="order spawn-down" fill="#58c4dc" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>react</title> <path d="M14.313 22.211c0.55 0.025 1.112 0.043 1.681 0.043 0.575 0 1.143-0.012 1.7-0.043-0.557 0.72-1.107 1.357-1.689 1.964l0.008-0.008c-0.579-0.6-1.135-1.238-1.659-1.902l-0.041-0.054zM8.615 21.411c1.083 0.275 2.404 0.509 3.752 0.653l0.131 0.011c0.825 1.133 1.659 2.13 2.554 3.068l-0.011-0.012c-1.311 1.463-3.080 2.491-5.081 2.86l-0.055 0.008c-0.004 0-0.008 0-0.012 0-0.248 0-0.482-0.061-0.687-0.169l0.008 0.004c-0.832-0.475-1.193-2.292-0.912-4.627 0.067-0.575 0.177-1.18 0.312-1.797zM23.398 21.398c0.118 0.474 0.229 1.078 0.308 1.692l0.009 0.086c0.287 2.334-0.067 4.149-0.892 4.634-0.184 0.102-0.404 0.162-0.638 0.162-0.023 0-0.046-0.001-0.069-0.002l0.003 0c-2.053-0.375-3.821-1.396-5.129-2.841l-0.007-0.008c0.879-0.923 1.707-1.918 2.466-2.965l0.058-0.084c1.476-0.154 2.799-0.392 4.088-0.717l-0.197 0.042zM9.784 17.666c0.25 0.49 0.512 0.978 0.8 1.468q0.431 0.731 0.881 1.428c-0.868-0.127-1.706-0.287-2.507-0.482 0.225-0.787 0.507-1.602 0.825-2.416zM22.212 17.641c0.331 0.821 0.612 1.64 0.845 2.434-0.8 0.196-1.645 0.362-2.519 0.487 0.3-0.469 0.6-0.952 0.881-1.447 0.281-0.487 0.544-0.985 0.795-1.475zM7.619 12.292c0.436 1.478 0.904 2.714 1.449 3.906l-0.075-0.182c-0.466 1.005-0.927 2.234-1.305 3.499l-0.052 0.205c-0.706-0.217-1.274-0.43-1.827-0.669l0.115 0.044c-2.164-0.921-3.564-2.132-3.564-3.092s1.4-2.177 3.564-3.094c0.525-0.225 1.1-0.428 1.694-0.617zM24.358 12.287c0.605 0.187 1.18 0.396 1.718 0.622 2.164 0.925 3.564 2.134 3.564 3.094-0.006 0.96-1.406 2.174-3.57 3.093-0.525 0.225-1.1 0.427-1.693 0.616-0.44-1.483-0.908-2.718-1.451-3.912l0.076 0.188c0.464-1.004 0.926-2.233 1.303-3.498l0.053-0.206zM20.53 11.444c0.869 0.129 1.706 0.287 2.507 0.484-0.225 0.79-0.506 1.602-0.825 2.416-0.25-0.487-0.512-0.978-0.8-1.467-0.281-0.49-0.581-0.967-0.881-1.432zM11.458 11.444c-0.3 0.471-0.6 0.953-0.88 1.45-0.281 0.487-0.544 0.977-0.794 1.467-0.331-0.82-0.612-1.637-0.845-2.433 0.8-0.187 1.643-0.354 2.518-0.482zM16 11.126c0.925 0 1.846 0.042 2.752 0.116q0.761 1.091 1.478 2.324 0.697 1.2 1.272 2.432c-0.385 0.819-0.807 1.637-1.266 2.437-0.475 0.825-0.966 1.61-1.475 2.337-0.91 0.079-1.832 0.122-2.762 0.122-0.925 0-1.846-0.044-2.752-0.116-0.507-0.727-1.002-1.505-1.478-2.324q-0.697-1.2-1.272-2.432c0.379-0.821 0.807-1.641 1.266-2.442 0.475-0.825 0.966-1.607 1.475-2.334 0.91-0.080 1.832-0.122 2.762-0.122zM15.981 7.845c0.58 0.6 1.136 1.237 1.659 1.901l0.040 0.053c-0.55-0.025-1.112-0.042-1.681-0.042-0.575 0-1.143 0.012-1.7 0.042 0.556-0.72 1.106-1.357 1.689-1.964l-0.008 0.008zM9.88 4.033c2.053 0.376 3.82 1.397 5.129 2.841l0.007 0.008c-0.879 0.924-1.707 1.919-2.466 2.968l-0.058 0.084c-1.475 0.153-2.798 0.389-4.086 0.714l0.196-0.042c-0.14-0.612-0.244-1.205-0.317-1.774-0.287-2.334 0.067-4.149 0.892-4.632 0.206-0.097 0.447-0.157 0.701-0.165l0.003-0zM22.090 4.008v0.008c0.013-0 0.028-0.001 0.044-0.001 0.239 0 0.464 0.059 0.662 0.163l-0.008-0.004c0.832 0.477 1.193 2.293 0.912 4.629-0.067 0.575-0.177 1.181-0.312 1.799-1.085-0.278-2.406-0.513-3.754-0.656l-0.128-0.011c-0.826-1.134-1.66-2.131-2.555-3.070l0.012 0.012c1.311-1.46 3.077-2.488 5.074-2.859l0.056-0.009zM22.096 2.646c-2.442 0.371-4.556 1.557-6.1 3.268l-0.008 0.009c-1.555-1.71-3.669-2.888-6.051-3.245l-0.056-0.007c-0.013-0-0.029-0-0.045-0-0.491 0-0.952 0.129-1.351 0.355l0.014-0.007c-1.718 0.991-2.103 4.079-1.216 7.954-3.804 1.175-6.278 3.053-6.278 5.032 0 1.987 2.487 3.87 6.302 5.036-0.88 3.89-0.487 6.983 1.235 7.973 0.378 0.217 0.832 0.344 1.315 0.344 0.022 0 0.044-0 0.065-0.001l-0.003 0c2.442-0.371 4.556-1.558 6.1-3.27l0.008-0.009c1.555 1.711 3.669 2.889 6.051 3.246l0.056 0.007c0.015 0 0.034 0 0.052 0 0.488 0 0.947-0.128 1.344-0.351l-0.014 0.007c1.717-0.99 2.103-4.078 1.216-7.954 3.79-1.165 6.264-3.047 6.264-5.029 0-1.987-2.487-3.87-6.302-5.039 0.88-3.886 0.487-6.982-1.235-7.973-0.382-0.219-0.84-0.348-1.328-0.348-0.013 0-0.026 0-0.039 0l0.002-0zM18.787 16.005c0 1.543-1.251 2.794-2.794 2.794s-2.794-1.251-2.794-2.794c0-1.543 1.251-2.794 2.794-2.794 0.772 0 1.47 0.313 1.976 0.818v0c0.506 0.506 0.818 1.204 0.818 1.976 0 0 0 0 0 0v0z"></path> </g></svg></span> + <svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 54 54"
     width="32px"
     height="32px"
     role="img"
     aria-label="GClass logo">
  <path fill="#58c4dc" d="M14.64 0 L8.30 23.87 L12.85 25.44 C12.86 25.41 12.88 25.38 12.89 25.36 C13.76 23.58 15.03 22.07 16.62 20.94 L16.62 20.93 C17.14 20.56 17.69 20.25 18.27 19.99 Z M22.70 21.60 C21.06 21.60 19.60 22.05 18.32 22.96 C17.07 23.85 16.09 25.01 15.39 26.45 C14.69 27.86 14.34 29.31 14.34 30.80 C14.34 32.30 14.67 33.72 15.31 35.07 C15.98 36.40 16.91 37.47 18.12 38.29 C19.34 39.12 20.74 39.53 22.31 39.53 C24.16 40.42 25.74 39.93 27.03 38.91 C28.34 37.88 29.24 36.55 29.73 34.93 L30.04 34.88 C30.30 34.79 30.52 34.64 30.69 34.43 C30.87 34.21 30.96 33.94 30.96 33.65 C30.96 33.00 30.68 32.59 30.12 32.42 C29.17 32.12 28.20 31.97 27.21 31.97 C26.51 31.97 25.82 32.01 25.14 32.10 C24.47 32.19 23.99 32.29 23.70 32.42 C23.07 32.68 22.75 33.11 22.75 33.70 C22.75 34.10 22.88 34.42 23.12 34.67 C23.38 34.90 23.69 35.01 24.04 35.01 C24.21 35.01 24.45 34.97 24.74 34.88 C25.46 34.70 26.11 34.60 26.71 34.56 L27.10 34.56 C26.70 35.59 26.08 36.40 25.24 36.97 C24.40 37.53 23.42 37.81 22.31 37.81 C21.17 37.81 20.19 37.50 19.37 36.89 C18.57 36.26 17.96 35.48 17.56 34.53 C17.16 33.59 16.96 32.64 16.96 31.70 C16.96 30.90 17.16 29.98 17.56 28.95 C17.96 27.92 18.59 27.03 19.45 26.28 C20.32 25.51 21.40 25.13 22.70 25.13 C23.94 25.13 24.93 25.41 25.66 25.99 C26.40 26.55 26.92 27.25 27.24 28.09 C27.45 28.64 27.87 28.92 28.49 28.92 C28.88 28.92 29.18 28.82 29.41 28.61 C29.64 28.38 29.75 28.08 29.75 27.72 C29.75 27.23 29.49 26.56 28.97 25.73 C28.44 24.89 27.65 24.14 26.58 23.50 C25.53 22.83 24.24 22.50 22.70 22.50 Z M35.84 23.02 L32.05 26.32 C32.18 26.74 32.25 27.19 32.25 27.72 C32.25 28.57 31.89 29.59 31.23 30.29 C31.81 30.55 32.42 30.86 32.82 31.44 C33.23 32.05 33.41 32.72 33.45 33.33 L53.47 40.22 Z M15.73 40.51 L0 54.19 L23.71 47.53 L22.82 42.92 C22.65 42.93 22.48 42.93 22.31 42.93 C20.31 42.93 18.36 42.37 16.73 41.28 C16.38 41.05 16.05 40.79 15.73 40.51 Z"/>
</svg></span>
      <nav className="ml-auto hidden gap-5 text-sm font-medium text-muted sm:flex"><a className="hover:text-brand order spawn-down click-hover amount-2" href="#install">Install</a><a className="hover:text-brand order spawn-down click-hover amount-2" href="#quick-start">Quick start</a><a className="hover:text-brand order spawn-down click-hover amount-2" href="#anatomy">Class anatomy</a><a className="hover:text-brand order spawn-down click-hover amount-2" href="#notes">Notes</a><a className="order spawn-down hover:text-brand click-hover amount-2" href="https://saturn-sepehr.github.io/GClass/documentation/quick-start/">Return to docs</a></nav>
    </div>
  </header>

  <main className="mx-auto px-6 pb-24 flex flex-col justify-center items-center">
    <div className=" max-w-4xl ">

   
    <section className="py-16">
      <p>not affiliated with or endorsed by React</p><a className="font-mono text-sm text-brand underline scroll typewriter" href="https://react.dev/">Official react website</a>
      <h1 className="mt-3 scroll letter spawn-text-spawn-down font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
        gclass-anims <span className="text-accent">for React</span>
      </h1>
      <p className="mt-6 text-lg leading-relaxed scroll typewriter time-2 text-muted">The library is framework-agnostic — you only need to call initAnimations() once after mount and let the MutationObserver pick up .appear / .scroll elements as they render.</p>
      <a href="#install" className="mt-8 scroll spawn-down click-hover compatibility inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-page">Get started</a>
    </section>
     </div>
     <div className="w-screen bg-page2/90 flex flex-col justify-center items-center border-y border-line">
    <div className=" max-w-4xl ">

    <section id="install" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down">Install</h2>
      <p className="mt-3 text-muted scroll typewriter">GClass ships as the npm package gclass-anims. GSAP is a regular dependency and is installed automatically — nothing is bundled or redistributed.</p>
      <div className="mt-5"><pre className="group relative overflow-x-auto scroll spawn-down text-left rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink"><code className="scroll typewriter">{"npm install gclass-anims"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
    </section>

    <section id="quick-start" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down">Quick start</h2>
      <p className="mt-3 text-muted">Import initAnimations once your DOM is ready. From then on, everything is class-driven: add a utility class to an element and it animates — no per-element JS, no config files.</p>
      <h3 className="mt-7 font-display text-lg font-bold">Usage — Client component / SPA root</h3>
      <div className="mt-4"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-left text-codeink"><code>{"import { useEffect } from 'react'\nimport { initAnimations } from 'gclass-anims'\n\nexport default function App() {\n  useEffect(() => {\n    initAnimations()\n  }, [])\n\n  return <div className=\"appear scroll spawn-up\">hello react</div>\n}"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <p className="mt-4 border-l-2 border-brand pl-4 text-sm text-muted">Call initAnimations() on every pathname change so new routes re-wire (see the docs site's Shared/animInit.js:6).</p>
    </section>

    <section id="anatomy" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down">Class anatomy</h2>
      <p className="mt-3 text-muted scroll typewriter-split letter">Class anatomy: <strong className="text-ink">behaviour</strong> (.spawn-up) + <strong className="text-ink">trigger</strong> (.scroll, .appear) + <strong className="text-ink">tunables</strong> (.time-1, .ease-back, .priority-2). Combine freely — order in class does not matter.</p>
      <div className="mt-5 scroll spawn-down"><pre className="group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-left text-codeink"><code className="scroll typewriter">{"// behaviour + trigger + tunables\n<div class=\"appear scroll spawn-up\">\u2026</div>\n<div class=\"appear scroll order ease-expo time-1 priority-2\">\u2026</div>\n<div class=\"float\">loops forever</div>\n<button class=\"magnet click-expand\">magnet + click</button>"}</code><button type="button" data-copy className="absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand" aria-label="Copy code">Copy</button></pre></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3"><div className="scroll priority-2  spawn-down order rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Behaviour</h4><p className="mt-1 font-mono text-[12px] text-muted">spawn-up, float, marquee, magnet</p></div><div className="scroll spawn-down order rounded-lg border priority-2  border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Trigger</h4><p className="mt-1 font-mono text-[12px] text-muted">appear, scroll, preserve</p></div><div className="scroll spawn-down order priority-2 rounded-lg border border-line bg-panel p-4"><h4 className="font-display font-bold text-brand">Tunables</h4><p className="mt-1 font-mono text-[12px] text-muted">order, ease-expo, time-1, priority-2</p></div></div>
    </section>
</div>
</div>
    <section id="notes" className="scroll-mt-24 py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down ">Notes</h2>
      <ul className="mt-6 space-y-4"><li className="spawn-down order priority-3 rounded-lg border border-line bg-panel p-5"><strong className="text-ink">What's next.</strong> Once wired, add classes like .spawn-up, .float, .magnet directly to JSX className. No wrapper components needed. See quick-start-js for vanilla parity and Toggle & reduced motion for toggleAnimations().</li><li className="rounded-lg scroll spawn-down order priority-3  border border-line bg-panel p-5"><strong className="text-ink">GSAP stays external.</strong> ESM is dist/gclass.esm.js and CJS is dist/gclass.cjs via vite.lib.config.js — GSAP is external, not bundled. The build is tree-shakable with sideEffects: false and prepublishOnly: build.</li><li className="rounded-lg border border-line scroll spawn-down order priority-3   bg-panel p-5"><strong className="text-ink">Dynamic content.</strong> The engine watches the DOM for .appear elements and plays their entrance each time they mount, so markup injected later keeps working.</li></ul>
    </section>

  
  </main>
  <footer>
    <p className="mb-10">All colours sampled from <a href="https://react.dev/" className="underline text-brand">https://react.dev/</a></p>
  </footer>
    </div>
  );
}
