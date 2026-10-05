import $ from "jquery";
import "./styles.css";
import { initAnimations } from "gclass-anims";

// jQuery owns the whole page: the ready handler is where gclass-anims starts,
// and the copy buttons are a jQuery delegated handler. One ready call is all
// the library needs - anything added to the DOM afterwards is picked up by its
// MutationObserver.
$(function () {
  initAnimations();

  initCopyButtons();

  $("#jquery-version").text($.fn.jquery);

  console.log(
    `gclass-anims 1.0.0-beta.23 initialised (jquery ${$.fn.jquery})`,
  );
});

// One delegated handler on document covers every [data-copy] button, including
// any added later. The text is the sibling <code> block's content.
function initCopyButtons() {
  $(document).on("click", "[data-copy]", function () {
    const $btn = $(this);
    const code = $btn.closest("pre").find("code").first();
    if (!code.length) return;

    const done = (label) => {
      $btn.text(label).addClass("text-ok border-ok");
      setTimeout(() => $btn.text("Copy").removeClass("text-ok border-ok"), 1400);
    };

    navigator.clipboard
      .writeText(code.text())
      .then(() => done("Copied"), () => done("Failed"));
  });
}