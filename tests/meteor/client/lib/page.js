// The page template's behaviour, and the one initAnimations() call for the
// whole app.
//
// onRendered rather than created: Blaze fires `created` before the template's
// DOM has been inserted, so there would be nothing for the engine to walk. By
// onRendered the header, hero and sections are real children of the document.
//
// Everything Blaze renders afterwards - the rows in the rowList template - is a
// real insertion, and the engine's MutationObserver picks those up without a
// second call.
import { Template } from "meteor/templating";
import { initAnimations } from "gclass-anims";

Template.page.helpers({
  version() {
    return "1.0.0-beta.24";
  },
});

Template.page.onRendered(function () {
  initAnimations();

  initCopyButtons();

  console.log("gclass-anims 1.0.0-beta.24 initialised (meteor)");

  // One delegated handler on document covers every code block's copy button,
  // including any Blaze renders later. The text is the block's content.
  function initCopyButtons() {
    document.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-copy]");
      if (!btn) return;

      var code = btn.parentElement.querySelector("code");
      if (!code) return;

      function done(label) {
        btn.textContent = label;
        btn.classList.add("text-ok");
        setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("text-ok");
        }, 1400);
      }

      navigator.clipboard
        .writeText(code.innerText)
        .then(function () { done("Copied"); }, function () { done("Failed"); });
    });
  }
});
