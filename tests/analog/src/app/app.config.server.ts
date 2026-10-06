import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import { provideServerRendering } from "@angular/platform-server";
import { appConfig } from "./app.config";

// Merged into the browser config by the prerenderer, so the app has one
// definition of its providers and the server adds only what it needs.
export const serverAppConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverAppConfig);
