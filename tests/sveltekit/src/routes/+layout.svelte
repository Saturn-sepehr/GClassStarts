<script>
import "../copy.js";
  import { onMount, tick } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { initAnimations } from "gclass-anims";
  import "../app.css";
</script>

<slot />
