import { Component, OnInit, ChangeDetectionStrategy, inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { initAnimations } from "gclass-anims";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet />
  `,
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    // One initAnimations() call for the whole app.
    //
    // The isPlatformBrowser guard is not decoration: Analog prerenders `/` to
    // static HTML, and that render happens in Node where there is no document.
    // Calling the engine there would throw on `document`. onInit runs on the
    // client bootstrap too, so the guard is what lets the same component serve
    // both the prerender and the hydrated page.
    if (isPlatformBrowser(this.platformId)) {
      initAnimations();

      initCopyButtons();

      console.log("gclass-anims 1.0.0-beta.24 initialised (analog)");
    }
  }
}

// One delegated handler on document covers every [data-copy] button, including
// any a route renders later. The text is the sibling <code> block's content.
function initCopyButtons() {
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const btn = target.closest("[data-copy]");
    if (!btn) return;

    const code = btn.parentElement?.querySelector("code");
    if (!code) return;

    const done = (label: string) => {
      btn.textContent = label;
      btn.classList.add("text-ok");
      setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("text-ok");
      }, 1400);
    };

    navigator.clipboard
      .writeText(code.innerText!)
      .then(() => done("Copied"), () => done("Failed"));
  });
}
