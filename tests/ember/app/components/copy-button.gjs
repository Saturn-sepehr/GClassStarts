import Component from '@glimmer/component';
import { on } from '@ember/modifier';

// One delegated copy button per code block. The text comes from the sibling
// <code>, so a block only needs the button.
export default class CopyButton extends Component {
  <template>
    <button
      type='button'
      class='absolute right-2 top-2 rounded border border-line bg-page px-2 py-1 font-sans text-[11px] font-medium text-muted transition-colors hover:border-brand hover:text-brand'
      aria-label='Copy code'
      {{on 'click' this.copy}}
    >Copy</button>
  </template>

  copy = (event) => {
    const button = event.currentTarget;
    const code = button.parentElement.querySelector('code');
    if (!code) return;

    const done = (label) => {
      button.textContent = label;
      button.classList.add('text-ok', 'border-ok');
      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('text-ok', 'border-ok');
      }, 1400);
    };

    navigator.clipboard
      .writeText(code.textContent)
      .then(() => done('Copied'), () => done('Failed'));
  };
}