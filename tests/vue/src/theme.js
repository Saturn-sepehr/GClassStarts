import { ref } from "vue";

/**
 * Theme switch.
 *
 * Dark is the default because that is the state of the screenshot this page
 * recreates. The choice lives in localStorage and is applied as a `.dark` class
 * on <html> before Vue mounts (see the inline script in index.html) so the very
 * first paint is already correct — flipping the class in onMounted would flash
 * light.
 *
 * A `ref` rather than a getter object: the switch needs to re-render when it is
 * clicked, so the current value has to be reactive state, not a lazy read.
 */
const STORAGE_KEY = "gclass-vue-theme";

function read() {
  return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

const current = ref(
  typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    ? "dark"
    : "light",
);

export function useTheme() {
  function toggle() {
    current.value = current.value === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", current.value === "dark");
    localStorage.setItem(STORAGE_KEY, current.value);
  }

  return { theme: current, toggle };
}