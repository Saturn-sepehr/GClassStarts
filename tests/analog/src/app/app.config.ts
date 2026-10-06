import { ApplicationConfig, provideZonelessChangeDetection } from "@angular/core";
import { provideFileRouter } from "@analogjs/router";

// Zoneless, matching what the rest of the Angular environments here do. The
// animation engine is entirely outside Angular's change detection either way.
export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(), provideFileRouter()],
};
