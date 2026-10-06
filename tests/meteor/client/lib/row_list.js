// The live demo: a Blaze reactive list.
//
// Blaze tracks a reactive region and re-renders only the parts whose data
// changed. Adding to the list is a real DOM insertion, which is what
// gclass-anims' MutationObserver reacts to - so this template never tells the
// animation engine anything, and there is no second initAnimations() call
// anywhere.
import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";

Template.rowList.onCreated(function () {
  // A ReactiveVar rather than a plain array: Blaze's {{#each}} only tracks it if
  // it is reactive.
  this.rows = new ReactiveVar([]);
});

Template.rowList.helpers({
  rows() {
    return Template.instance().rows.get();
  },

  count() {
    return Template.instance().rows.get().length;
  },
});

Template.rowList.events({
  "click .js-add": function () {
    var instance = Template.instance();
    var rows = instance.rows.get();

    instance.rows.set(rows.concat([rows.length + 1]));
  },

  "click .js-reset": function () {
    Template.instance().rows.set([]);
  },
});
