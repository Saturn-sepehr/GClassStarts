<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { DOCS_URL, NAV, SOCIALS } from "../data.js";
import { useTheme } from "../theme.js";

/**
 * The nav bar: title + DocSearch-style button on the left, flyout groups then
 * the theme switch and socials on the right.
 *
 * `open` is the index of the expanded flyout, or -1. One shared index rather
 * than a flag per group means opening Docs closes Ecosystem, which is what the
 * original does too — and it is reactive, so opening one re-renders the rest.
 */
const { theme, toggle } = useTheme();

const open = ref(-1);

function show(i) {
  open.value = open.value === i ? -1 : i;
}

function close() {
  open.value = -1;
}

/* Click-away and Escape close whatever flyout is open. Both listen on the
   document rather than on the groups themselves, so the gap between two
   groups counts as a click-away too. Bound in onMounted so a remount does not
   stack duplicate listeners. */
function onKey(e) {
  if (e.key === "Escape") close();
}

onMounted(() => {
  document.addEventListener("click", close);
  document.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", close);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <header
    class="sticky top-0 z-40 h-[var(--vt-nav-height)] border-b border-line bg-page transition-colors duration-500"
  >
    <!-- --vp-screen-max-width, 1376px. No horizontal padding of its own: the
         original's outer .VPNavBar supplies that, and at 1376px of content the
         two together push the logo to x≈272 on a 1919px viewport — which is
         where the screenshot has it. -->
    <div class="mx-auto flex h-full max-w-7xl items-center justify-between max-[640px]:pr-4">
      <a
        href="#top"
        class="spawn-down flex h-[var(--vt-nav-height)] items-center transition-opacity hover:opacity-60"
      >
       
        <svg viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-512" y="-128" width="1280" height="800" style="fill:none;"></rect> <g id="Icons1" serif:id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif:id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> <path d="M17.595,11.204l8.91,0l5.536,9.391l5.591,-9.391l8.831,0l-14.422,25.359l-14.446,-25.359Z" style="fill:#435466;"></path> <path d="M8.089,11.204l23.952,41.845l24.126,-41.845l-9.704,0l-14.422,25.359l-14.446,-25.359l-9.506,0Z" style="fill:#4dba87;"></path> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif:id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif:id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g></svg>
        +
                    <svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 54 54"
     width="64px"
     height="64px"
     role="img"
     className="order priority-49 spawn-down ease-circ"
     aria-label="GClass logo">
  <path fill="#4dba87" d="M14.64 0 L8.30 23.87 L12.85 25.44 C12.86 25.41 12.88 25.38 12.89 25.36 C13.76 23.58 15.03 22.07 16.62 20.94 L16.62 20.93 C17.14 20.56 17.69 20.25 18.27 19.99 Z M22.70 21.60 C21.06 21.60 19.60 22.05 18.32 22.96 C17.07 23.85 16.09 25.01 15.39 26.45 C14.69 27.86 14.34 29.31 14.34 30.80 C14.34 32.30 14.67 33.72 15.31 35.07 C15.98 36.40 16.91 37.47 18.12 38.29 C19.34 39.12 20.74 39.53 22.31 39.53 C24.16 40.42 25.74 39.93 27.03 38.91 C28.34 37.88 29.24 36.55 29.73 34.93 L30.04 34.88 C30.30 34.79 30.52 34.64 30.69 34.43 C30.87 34.21 30.96 33.94 30.96 33.65 C30.96 33.00 30.68 32.59 30.12 32.42 C29.17 32.12 28.20 31.97 27.21 31.97 C26.51 31.97 25.82 32.01 25.14 32.10 C24.47 32.19 23.99 32.29 23.70 32.42 C23.07 32.68 22.75 33.11 22.75 33.70 C22.75 34.10 22.88 34.42 23.12 34.67 C23.38 34.90 23.69 35.01 24.04 35.01 C24.21 35.01 24.45 34.97 24.74 34.88 C25.46 34.70 26.11 34.60 26.71 34.56 L27.10 34.56 C26.70 35.59 26.08 36.40 25.24 36.97 C24.40 37.53 23.42 37.81 22.31 37.81 C21.17 37.81 20.19 37.50 19.37 36.89 C18.57 36.26 17.96 35.48 17.56 34.53 C17.16 33.59 16.96 32.64 16.96 31.70 C16.96 30.90 17.16 29.98 17.56 28.95 C17.96 27.92 18.59 27.03 19.45 26.28 C20.32 25.51 21.40 25.13 22.70 25.13 C23.94 25.13 24.93 25.41 25.66 25.99 C26.40 26.55 26.92 27.25 27.24 28.09 C27.45 28.64 27.87 28.92 28.49 28.92 C28.88 28.92 29.18 28.82 29.41 28.61 C29.64 28.38 29.75 28.08 29.75 27.72 C29.75 27.23 29.49 26.56 28.97 25.73 C28.44 24.89 27.65 24.14 26.58 23.50 C25.53 22.83 24.24 22.50 22.70 22.50 Z M35.84 23.02 L32.05 26.32 C32.18 26.74 32.25 27.19 32.25 27.72 C32.25 28.57 31.89 29.59 31.23 30.29 C31.81 30.55 32.42 30.86 32.82 31.44 C33.23 32.05 33.41 32.72 33.45 33.33 L53.47 40.22 Z M15.73 40.51 L0 54.19 L23.71 47.53 L22.82 42.92 C22.65 42.93 22.48 42.93 22.31 42.93 C20.31 42.93 18.36 42.37 16.73 41.28 C16.38 41.05 16.05 40.79 15.73 40.51 Z"/>
</svg>
      </a>

    

      <div class="flex gap-10">
        <a href="#install"">Install</a>
        <a href="#quick-start">Quick start</a>
        <a href="#anatomy">Class anatomy </a>
        <a href="#notes">Notes</a>
      </div>
    </div>
  </header>
</template>