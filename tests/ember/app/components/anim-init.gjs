import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { initAnimations } from 'gclass-anims';

// Renders nothing. Its whole job is the constructor: this component is
// instantiated once during boot, so it is the natural place for the single
// initAnimations() call. Everything Ember renders afterwards - including
// every tracked update that inserts nodes - is covered by the MutationObserver
// that call installs.
export default class AnimInit extends Component {
  @tracked ready = false;

  constructor(owner, args) {
    super(owner, args);
    initAnimations();
    this.ready = true;
  }

  <template>
    {{#if this.ready}}
      <span
        id='anim-init-status'
        class='font-mono text-xs text-muted'
      >initAnimations() ran</span>
    {{/if}}
  </template>
}