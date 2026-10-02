import { LitElement, html } from "lit";
import { initAnimations } from "gclass-anims";

// Light DOM: createRenderRoot returns this, so the engine's document-level
// querySelectorAll can see the utility classes in the template.
class GcLight extends LitElement {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    initAnimations();
  }

  render() {
    return html`
      <main class="gc">
        <h1 class="gc-title appear order ease-expo">
          gclass-anims <span class="gc-ver">1.0.0-beta.23</span>
        </h1>
        <p class="gc-sub appear">Environment: <strong>lit</strong> (light DOM)</p>
        <div class="gc-grid">
          <div class="appear scroll spawn-up"><div class="gc-card"><code>.appear scroll spawn-up</code></div></div>
          <div class="appear scroll spawn-down"><div class="gc-card"><code>.spawn-down</code></div></div>
          <div class="appear scroll spawn-left"><div class="gc-card"><code>.spawn-left</code></div></div>
          <div class="appear scroll spawn-right"><div class="gc-card"><code>.spawn-right</code></div></div>
          <div class="appear scroll spawn-fade"><div class="gc-card"><code>.spawn-fade</code></div></div>
          <div class="appear scroll spawn-blur"><div class="gc-card"><code>.spawn-blur</code></div></div>
          <div class="appear scroll clip-reveal"><div class="gc-card"><code>.clip-reveal</code></div></div>
          <div class="appear scroll typewriter chars-28"><div class="gc-card"><code>.typewriter chars-28</code></div></div>
          <div class="appear scroll scramble"><div class="gc-card"><code>.scramble</code></div></div>
          <div class="appear scroll order ease-expo time-1 priority-2"><div class="gc-card"><code>.order ease-expo time-1 priority-2</code></div></div>
          <div class="float"><div class="gc-card"><code>.float (loop)</code></div></div>
          <div class="marquee"><div class="gc-card"><code>.marquee (loop)</code></div></div>
          <button class="gc-btn magnet click-expand">.magnet .click-expand</button>
        </div>
        <div class="gc-tall parallax-2">.parallax-2 &mdash; tall scroll region</div>
      </main>
    `;
  }
}

customElements.define("gclass-light", GcLight);

// small host element that owns the fixed progress bar
class GcBar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="gc-bar scroll-progress"></div>`;
  }
}

customElements.define("gc-bar", GcBar);
