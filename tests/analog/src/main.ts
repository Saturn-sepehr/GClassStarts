// Analog's browser entry. The client bootstraps the Angular app; everything else
// on this page is an Angular component.
import { bootstrapApplication } from "@angular/platform-browser";
import "./styles.css";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
