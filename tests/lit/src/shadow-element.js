import { LitElement, html } from "lit";
// NOTE: the published docs suggest `import initListeners from
// 'gclass-anims/Listeners.js'`, but that subpath is not present in the
// package's "exports" map, so no bundler can resolve it:
//
//   "./Listeners.js" is not exported under the conditions
//   ["module","browser","production","import"] from package gclass-anims
//
// initListeners *is* re-exported from the public entry, so that is what we
// use here. See tests/lit/FINDINGS.md.
import { initListeners } from "gclass-anims";

// Shadow DOM: the engine queries `document`, not `shadowRoot`, so a scoped
// init is required for elements rendered inside the shadow tree.
class GcShadow extends LitElement {
  firstUpdated() {
    initListeners(this.shadowRoot);
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          max-width: 960px;
          margin: 0 auto;
          padding: 24px;
        }
        .card {
          background: #141821;
          border: 1px solid #22283a;
          border-radius: 12px;
          padding: 18px;
          color: #c7cddb;
          font-size: 13px;
        }
        h2 {
          color: #e6e8ee;
        }
      </style>
      <main>
        <h2>Shadow DOM variant</h2>
        <p class="card appear scroll spawn-up">
          <code>.appear scroll spawn-up</code> &mdash; animated via
          <code>initListeners(this.shadowRoot)</code>
        </p>
      </main>
    `;
  }
}

customElements.define("gclass-shadow", GcShadow);
