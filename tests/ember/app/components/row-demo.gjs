import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// The rows demo. Each click appends one entry to a @tracked array; Glimmer
// inserts the matching <li> into the live DOM, which is exactly the insertion
// case gclass-anims watches for - so the row animates without anything
// re-initialising.
export default class RowDemo extends Component {
  @tracked rows = [];

  @action
  add() {
    this.rows = [...this.rows, this.rows.length + 1];
  }

  @action
  reset() {
    this.rows = [];
  }

  <template>
    <div class='mt-5 flex flex-wrap items-center gap-3'>
      <button
        type='button'
        class='rounded-md bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-branddark click-hover amount-2'
        {{on 'click' this.add}}
      >
        Add a row with a Glimmer component
      </button>
      <button
        type='button'
        class='rounded-md border border-line px-4 py-2 text-sm font-bold text-muted transition-colors hover:border-brand hover:text-brand click-hover amount-2'
        {{on 'click' this.reset}}
      >
        Reset
      </button>
      <span class='font-mono text-xs text-muted'>{{this.rows.length}} rows</span>
    </div>

    <ul class='mt-4 grid gap-2'>
      {{#each this.rows as |n|}}
        <li
          class='appear spawn-up time-1 rounded-lg border border-line bg-panel p-4 font-mono text-[13px]'
        >
          row {{n}} - rendered by a Glimmer component
        </li>
      {{/each}}
    </ul>
  </template>
}