import AnimInit from 'gclass-tests-ember/components/anim-init';
import CopyButton from 'gclass-tests-ember/components/copy-button';
import RowDemo from 'gclass-tests-ember/components/row-demo';

<template>
  <div class='gc-bar scroll-progress'></div>

  <header
    class='sticky top-0 z-40 expand-down ease-expo border-b border-line bg-page/95 backdrop-blur'
  >
    <div class='mx-auto flex max-w-4xl items-center gap-4 px-6 py-4'>
      <span class='flex shrink-0 items-center gap-2'>
        <svg
          width='32px'
          height='32px'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          role='img'
          aria-label='Ember logo'
        >
          <path
            fill='#e04e39'
            d='M12 1.2c.5 0 .9.2 1.2.5.3.3.5.7.6 1.2l.1.9c0 .4-.2.7-.6.8-.4.2-.8 0-1-.3-.2-.4-.2-.9-.4-1.2-.1-.2-.3-.3-.5-.1-.2.1-.3.4-.3.7 0 .6.2 1.2.4 1.8.2.5.5 1 .9 1.5 1.5 2 3.3 3.7 5.5 4.6 1.4.6 2.9.8 4.4.6.5-.1 1-.2 1.5-.4.4-.1.7-.5.6-.9 0-.4-.4-.7-.8-.6-.3 0-.6.1-.9 0-.9-.1-1.8-.5-2.5-1-.4-.3-.8-.7-1-1.2-.1-.2 0-.5.2-.6.2-.1.5 0 .6.2.3.4.8.7 1.3.8.4.1.8.2 1.2.2.3 0 .5-.1.7-.3.2-.2.3-.5.2-.8-.3-.9-1-1.6-1.9-1.9-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.7.6-.1.2 0 .4.1.6.2.3.5.5.8.5.3 0 .5.2.5.5s-.2.5-.5.4c-.6-.1-1.1-.4-1.4-1-.3-.5-.2-1.2.2-1.6.4-.5 1.1-.7 1.7-.6 1.2.1 2.3.9 2.8 2 .2.5.2 1.1-.1 1.6-.3.5-.9.9-1.5.9-1.4 0-2.7-.6-3.7-1.6C6.2 9.9 5.2 8.2 5.2 6.3c0-1 .2-2 .7-2.9.4-.8 1.1-1.4 2-1.7.9-.4 1.9-.4 2.8-.2.4.1.7.4.7.8 0 .4-.3.7-.7.6-.9-.2-1.9 0-2.6.5-.6.4-1 1-1.2 1.7-.4 1.4-.1 2.9.7 4.1 0 0 .2.4.4.6-.2-.9-.4-1.8-.4-2.7 0-1.6.6-3.2 1.7-4.4.5-.6 1.2-1 1.9-1.2.7-.2 1.5-.2 2.2 0 .5.2 1 .5 1.3 1 .3.4.5.9.5 1.5z'
          />
        </svg>
        +
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 54 54'
          width='32px'
          height='32px'
          role='img'
          aria-label='GClass logo'
        >
          <path
            fill='#e04e39'
            d='M14.64 0 L8.30 23.87 L12.85 25.44 C12.86 25.41 12.88 25.38 12.89 25.36 C13.76 23.58 15.03 22.07 16.62 20.94 L16.62 20.93 C17.14 20.56 17.69 20.25 18.27 19.99 Z M22.70 21.60 C21.06 21.60 19.60 22.05 18.32 22.96 C17.07 23.85 16.09 25.01 15.39 26.45 C14.69 27.86 14.34 29.31 14.34 30.80 C14.34 32.30 14.67 33.72 15.31 35.07 C15.98 36.40 16.91 37.47 18.12 38.29 C19.34 39.12 20.74 39.53 22.31 39.53 C24.16 40.42 25.74 39.93 27.03 38.91 C28.34 37.88 29.24 36.55 29.73 34.93 L30.04 34.88 C30.30 34.79 30.52 34.64 30.69 34.43 C30.87 34.21 30.96 33.94 30.96 33.65 C30.96 33.00 30.68 32.59 30.12 32.42 C29.17 32.12 28.20 31.97 27.21 31.97 C26.51 31.97 25.82 32.01 25.14 32.10 C24.47 32.19 23.99 32.29 23.70 32.42 C23.07 32.68 22.75 33.11 22.75 33.70 C22.75 34.10 22.88 34.42 23.12 34.67 C23.38 34.90 23.69 35.01 24.04 35.01 C24.21 35.01 24.45 34.97 24.74 34.88 C25.46 34.70 26.11 34.60 26.71 34.56 L27.10 34.56 C26.70 35.59 26.08 36.40 25.24 36.97 C24.40 37.53 23.42 37.81 22.31 37.81 C21.17 37.81 20.19 37.50 19.37 36.89 C18.57 36.26 17.96 35.48 17.56 34.53 C17.16 33.59 16.96 32.64 16.96 31.70 C16.96 30.90 17.16 29.98 17.56 28.95 C17.96 27.92 18.59 27.03 19.45 26.28 C20.32 25.51 21.40 25.13 22.70 25.13 C23.94 25.13 24.93 25.41 25.66 25.99 C26.40 26.55 26.92 27.25 27.24 28.09 C27.45 28.64 27.87 28.92 28.49 28.92 C28.88 28.92 29.18 28.82 29.41 28.61 C29.64 28.38 29.75 28.08 29.75 27.72 C29.75 27.23 29.49 26.56 28.97 25.73 C28.44 24.89 27.65 24.14 26.58 23.50 C25.53 22.83 24.24 22.50 22.70 22.50 Z M35.84 23.02 L32.05 26.32 C32.18 26.74 32.25 27.19 32.25 27.72 C32.25 28.57 31.89 29.59 31.23 30.29 C31.81 30.55 32.42 30.86 32.82 31.44 C33.23 32.05 33.41 32.72 33.45 33.33 L53.47 40.22 Z M15.73 40.51 L0 54.19 L23.71 47.53 L22.82 42.92 C22.65 42.93 22.48 42.93 22.31 42.93 C20.31 42.93 18.36 42.37 16.73 41.28 C16.38 41.05 16.05 40.79 15.73 40.51 Z'
          />
        </svg>
      </span>
      <nav class='ml-auto hidden items-center gap-5 text-sm font-medium text-muted sm:flex'>
        <a class='hover:text-brand click-hover amount-2' href='#install'>Install</a>
        <a class='hover:text-brand click-hover amount-2' href='#quick-start'>Quick start</a>
        <a class='hover:text-brand click-hover amount-2' href='#anatomy'>Class anatomy</a>
        <a class='hover:text-brand click-hover amount-2' href='#notes'>Notes</a>
      </nav>
      <a
        class='shrink-0 text-sm font-bold text-brand hover:underline'
        href='https://saturn-sepehr.github.io/GClass/documentation/quick-start/'
        aria-label='Return to the GClass documentation'
      >return to docs</a>
    </div>
  </header>

  <main class='mx-auto max-w-4xl px-6 pb-24'>
    <AnimInit />

    <section class='py-16'>
      <p class='font-mono text-sm text-muted'>
        not affiliated with or endorsed by the Ember team
      </p>
      <p class='font-mono text-sm text-brand underline'>
        <a href='https://emberjs.com/'>Official Ember website</a>
      </p>
      <h1 class='mt-3 font-display text-5xl font-bold leading-[1.1] tracking-tight scroll letter spawn-text-spawn-down'>
        gclass-anims <span class='text-brand'>for Ember</span>
      </h1>
      <p class='mt-6 max-w-2xl text-lg leading-relaxed text-muted scroll typewriter time-2'>
        Ember boots the app, then the router takes over. Call
        <code class='font-mono'>initAnimations()</code>
        once during boot - a component constructor is a good spot - and every
        template Glimmer renders after it animates from its class names alone.
      </p>
      <a
        href='#install'
        class='mt-8 inline-block rounded-lg bg-brand px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-branddark click-expand compatibility amount-4'
      >Get started</a>
    </section>

    <section id='install' class='scroll-mt-24 py-10'>
      <h2 class='font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down'>
        Install
      </h2>
      <p class='mt-3 text-muted scroll typewriter'>
        GClass ships as the npm package gclass-anims. GSAP is a regular dependency
        and is installed automatically - nothing is bundled or redistributed. Ember is
        a peer of this page, not a dependency of the library.
      </p>
      <div class='mt-5'>
        <pre class='group relative overflow-x-auto scroll spawn-down text-left rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-codeink'><code>npm install gclass-anims ember-source</code><CopyButton /></pre>
      </div>
    </section>

    <section id='quick-start' class='scroll-mt-24 py-10'>
      <h2 class='font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down'>
        Quick start
      </h2>
      <p class='mt-3 text-muted scroll typewriter'>
        Import initAnimations once your DOM is ready. From then on, everything is
        class-driven: add a utility class to an element and it animates - no
        per-element JS, no config files.
      </p>

      <h3 class='mt-7 font-display text-lg font-bold'>
        Usage - a component constructor
      </h3>
      <div class='mt-4'>
        <pre class='group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-left text-codeink'><code>// app/components/anim-init.gjs
import Component from '@glimmer/component';
import { initAnimations } from 'gclass-anims';

export default class AnimInit extends Component {
  constructor(owner, args) {
    super(owner, args);
    initAnimations();
  }

  &lt;template&gt;&lt;/template&gt;
}</code><CopyButton /></pre>
      </div>

      <p class='mt-4 border-l-2 border-brand pl-4 text-sm text-muted'>
        Instantiated once from the application template, so it runs during boot -
        before the router renders anything. Nothing re-initialises afterwards.
      </p>

      <h3 class='mt-7 font-display text-lg font-bold'>
        Live - rows added by a Glimmer component
      </h3>
      <p class='mt-3 text-muted scroll typewriter'>
        Each click appends one entry to a
        <code class='font-mono'>@tracked</code>
        array. Glimmer inserts the matching
        <code class='font-mono'>&lt;li&gt;</code>
        into the live DOM, and the row animates - the MutationObserver set up during
        boot covers every insertion the app makes from then on.
      </p>
      <RowDemo />
      <div class='mt-4'>
        <pre class='group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-left text-codeink'><code>@tracked rows = [];

@action
add() {
  this.rows = [...this.rows, this.rows.length + 1];
}

&lt;template&gt;
  &#123;&#123;#each this.rows as |n|&#125;&#125;
    &lt;li class='appear spawn-up time-1'&gt;row n&lt;/li&gt;
  &#123;&#123;/each&#125;&#125;
&lt;/template&gt;</code><CopyButton /></pre>
      </div>
    </section>

    <section id='anatomy' class='scroll-mt-24 py-10'>
      <h2 class='font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down'>
        Class anatomy
      </h2>
      <p class='mt-3 text-muted scroll typewriter-split letter'>
        Class anatomy:
        <strong class='text-ink'>behaviour</strong>
        (.spawn-up) +
        <strong class='text-ink'>trigger</strong>
        (.scroll, .appear) +
        <strong class='text-ink'>tunables</strong>
        (.time-1, .ease-back, .priority-2). Combine freely - order in class does not
        matter.
      </p>
      <div class='mt-5 scroll spawn-down'>
        <pre class='group relative overflow-x-auto rounded-lg border border-line bg-code p-4 pr-16 font-mono text-[13px] leading-relaxed text-left text-codeink'><code>// behaviour + trigger + tunables
&lt;div class="appear scroll spawn-up"&gt;…&lt;/div&gt;
&lt;div class="appear scroll order ease-expo time-1 priority-2"&gt;…&lt;/div&gt;
&lt;div class="float"&gt;loops forever&lt;/div&gt;
&lt;button class="magnet click-expand"&gt;magnet + click&lt;/button&gt;</code><CopyButton /></pre>
      </div>
      <div class='mt-6 grid gap-4 sm:grid-cols-3'>
        <div class='rounded-lg border border-line bg-panel p-4 scroll spawn-down order priority-2'>
          <h3 class='font-display font-bold text-brand'>Behaviour</h3>
          <p class='mt-1 font-mono text-[12px] text-muted'>
            spawn-up, float, marquee, magnet
          </p>
        </div>
        <div class='rounded-lg border border-line bg-panel p-4 scroll spawn-down order priority-2'>
          <h3 class='font-display font-bold text-brand'>Trigger</h3>
          <p class='mt-1 font-mono text-[12px] text-muted'>
            appear, scroll, preserve
          </p>
        </div>
        <div class='rounded-lg border border-line bg-panel p-4 scroll spawn-down order priority-2'>
          <h3 class='font-display font-bold text-brand'>Tunables</h3>
          <p class='mt-1 font-mono text-[12px] text-muted'>
            order, ease-expo, time-1, priority-2
          </p>
        </div>
      </div>
    </section>

    <section id='notes' class='scroll-mt-24 py-10'>
      <h2 class='font-display text-3xl font-bold tracking-tight scroll letter spawn-text-spawn-down'>
        Notes
      </h2>
      <ul class='mt-6 space-y-4'>
        <li class='rounded-lg border border-line bg-panel p-5 scroll spawn-down order priority-3'>
          <strong class='text-ink'>One boot-time call.</strong>
          A component constructor runs during boot, so it is the natural place for
          the single
          <code class='font-mono'>initAnimations()</code>
          call. An instance initializer would work equally well; what matters is that
          it runs before the first route renders.
        </li>
        <li class='rounded-lg border border-line bg-panel p-5 scroll spawn-down order priority-3'>
          <strong class='text-ink'>Route changes are covered.</strong>
          Glimmer tears down and rebuilds the DOM between routes, and the engine reads
          every inserted node, so
          <code class='font-mono'>.appear</code>
          replays per route. Put
          <code class='font-mono'>.preserve</code>
          on anything that should stay - the header and nav above.
        </li>
        <li class='rounded-lg border border-line bg-panel p-5 scroll spawn-down order priority-3'>
          <strong class='text-ink'>GSAP stays external.</strong>
          ESM is
          <code class='font-mono'>dist/gclass.esm.js</code>
          and CJS is
          <code class='font-mono'>dist/gclass.cjs</code>
          via
          <code class='font-mono'>vite.lib.config.js</code>
          - GSAP is external, not bundled. The build is tree-shakable with
          <code class='font-mono'>sideEffects: false</code>.
        </li>
      </ul>
    </section>

    <footer class='border-t border-line pt-8 text-sm text-muted'>
      <p>
        Not affiliated with or endorsed by the Ember team. Colours and type sampled
        from
        <a class='text-brand hover:underline' href='https://emberjs.com/'>https://emberjs.com/</a>.
        Running gclass-anims 1.0.0-beta.23 from npm with Ember 7.3.
      </p>
    </footer>
  </main>
</template>