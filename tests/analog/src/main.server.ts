// Analog's server entry. Required even when `ssr: false` — Analog's build
// pipeline always resolves it, and nitro's prerenderer loads the app through
// it to produce the static HTML.
//
// It never actually runs a server: the prerenderer imports the app, renders
// `/`, and writes the result out.
import { bootstrapApplication } from "@angular/platform-browser";
import { provideClientHydration } from "@angular/platform-browser";
import { config as appConfig } from "./app/app.config.server";
import { AppComponent } from "./app/app.component";

const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

export default bootstrap;
