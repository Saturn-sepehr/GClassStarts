import { ChangeDetectionStrategy, Component, input } from "@angular/core";

// The code block, with its copy button.
//
// This is page structure rather than an animation demo, so it lives in its own
// file. That is not tidiness for its own sake: the page component's decorator
// references CodeBlock in its `imports` array, and that array is evaluated when
// the decorator runs — i.e. before any declaration further down the same file.
// Declaring CodeBlock below the page component and referencing it there is a
// use-before-declaration error.
@Component({
  selector: "code-block",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre class="code-panel group relative overflow-x-auto p-5 pr-16"><code>{{ text() }}</code><button
      type="button"
      data-copy
      class="absolute right-2 top-2 rounded border border-line bg-panel2 px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:text-brand"
      aria-label="Copy code"
    >
      Copy
    </button></pre>
  `,
})
export class CodeBlock {
  // A signal input, which is the direct equivalent of the props every other
  // environment here passes to its code-block component.
  readonly text = input<string>("");
}