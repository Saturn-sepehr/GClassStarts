import { useState } from "react";

import { useCopyCommand } from "../hooks/useCopyCommand";

type Example = {
  id: string;
  label: string;
  title: string;
  body: string;
  file: string;
  code: string;
};

type Category = {
  id: string;
  label: string;
  title: string;
  body: string;
  examples: Example[];
};

/**
 * The stack card.
 *
 * Two nested tablists, exactly as in the reference: an outer row picks a layer
 * of the stack (Server, Data, Auth, …) and an inner row picks an example within
 * it. Only the selected panel is mounted — the reference ships every panel in
 * the DOM with `hidden`, but the panels here are cheap enough that unmounting
 * the inactive ones is simpler and avoids four idle tabpanels being announced.
 *
 * Selection is internal state rather than a URL segment: the reference does not
 * put the tab in the address bar either.
 */
const CATEGORIES: Category[] = [
  {
    id: "server",
    label: "Server",
    title: "Build a complete server with Web APIs",
    body: "Route standard Web Requests through typed middleware and Controllers, then return standard Responses for HTML, JSON, redirects, files, and streams.",
    examples: [
      {
        id: "request",
        label: "Request",
        title: "Receive a standard Request",
        body: "Your server adapter turns an incoming HTTP request into a Web Request, then hands it to the router. The Request remains the common language all the way through.",
        file: "app.tsx",
        code: `import { createRequestListener } from "remix/node-fetch-server"
import { router } from "./app/router.ts"

let server = http.createServer(
  createRequestListener(router.fetch),
)

server.listen(3000)`,
      },
      {
        id: "routes",
        label: "Routes",
        title: "Describe the whole tree once",
        body: "Routes are configuration, not convention. Every URL, method and loader lives in one file that the server and the client both read from.",
        file: "routes.ts",
        code: `export const routes = {
  "/": { index: () => import("./home.tsx") },
  "/docs/:slug": { page: () => import("./doc.tsx") },
} satisfies RouteConfig`,
      },
      {
        id: "resources",
        label: "Resources",
        title: "Resources are just URLs",
        body: "A route module is a resource. Fetching it over HTTP returns the same data the component would have loaded, so the two halves of the app cannot drift.",
        file: "app/routes/api.projects.ts",
        code: `export async function loader() {
  const projects = await db.project.findMany()
  return Response.json(projects)
}`,
      },
      {
        id: "controllers",
        label: "Controllers",
        title: "One handler per resource",
        body: "Controllers hold the HTTP-shaped logic — parsing, validating, responding — and stay free of framework concerns.",
        file: "controllers/project.ts",
        code: `export async function update(request: Request) {
  const form = await request.formData()
  const project = await db.project.update({
    where: { id: String(form.get("id")) },
    data: { name: String(form.get("name")) },
  })
  return Response.json(project)
}`,
      },
      {
        id: "middleware",
        label: "Middleware",
        title: "Typed middleware, composed",
        body: "Middleware runs on the server only, in order, and each layer can wrap the response the next layer returns.",
        file: "server/middleware.ts",
        code: `export const middleware: Middleware[] = [
  session(),
  rateLimit({ max: 100 }),
  csrf(),
]`,
      },
      {
        id: "rendering",
        label: "Rendering",
        title: "Render where it belongs",
        body: "Stream the shell, then the data. gclass-anims initialises once the DOM lands and its MutationObserver handles everything after.",
        file: "root.tsx",
        code: `useEffect(() => {
  initAnimations()
}, [location.pathname])`,
      },
      {
        id: "responses",
        label: "Responses",
        title: "Return anything the web can",
        body: "HTML, JSON, redirects, files and streams all come back through the same Response object, so one handler covers every case.",
        file: "app/routes/report.ts",
        code: `export async function loader() {
  const csv = await renderCsv(await db.report.findMany())
  return new Response(csv, {
    headers: { "Content-Type": "text/csv" },
  })
}`,
      },
    ],
  },
  {
    id: "data",
    label: "Data",
    title: "Load and mutate in one place",
    body: "Loaders read, actions write, and both can be called directly from a component. No data-fetching library in the middle.",
    examples: [
      {
        id: "loader",
        label: "Loaders",
        title: "Read on the server",
        body: "A loader runs before the route renders and its return value is handed to the component as a prop.",
        file: "app/routes/projects._index.tsx",
        code: `export async function loader() {
  return { projects: await db.project.findMany() }
}

export default function Projects({ projects }) {
  return <ul>{projects.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
}`,
      },
      {
        id: "actions",
        label: "Actions",
        title: "Write from the same module",
        body: "Actions are the POST/DELETE/PATCH half of a route. One module owns both reads and writes for a URL.",
        file: "app/routes/projects.ts",
        code: `export async function action({ request }) {
  const intent = await readIntent(request)
  if (intent.type === "delete") return deleteProject(intent.id)
  return createProject(intent.values)
}`,
      },
      {
        id: "forms",
        label: "Forms",
        title: "Progressive enhancement",
        body: "A <Form> works without JavaScript, then upgrades to a client transition when the runtime is there.",
        file: "app/routes/projects.new.tsx",
        code: `<Form method="post">
  <input name="name" />
  <button type="submit">Create</button>
</Form>`,
      },
    ],
  },
  {
    id: "auth",
    label: "Auth",
    title: "Sessions are just cookies",
    body: "No auth framework. Read a cookie, look up a session, return a Set-Cookie header — the whole layer is a few functions.",
    examples: [
      {
        id: "session",
        label: "Sessions",
        title: "A signed cookie and a row",
        body: "Store what you need server-side and keep only an opaque id in the cookie.",
        file: "app/session.server.ts",
        code: `export async function getSession(request: Request) {
  const id = request.headers.get("Cookie")?.match(/session=(\\w+)/)?.[1]
  if (!id) return createSession()
  return db.session.findUnique({ where: { id } })
}`,
      },
      {
        id: "protect",
        label: "Protecting routes",
        title: "Guard in the loader",
        body: "Redirect before rendering anything the user is not allowed to see.",
        file: "app/routes/admin.tsx",
        code: `export async function loader({ request }) {
  const user = await requireUser(request)
  if (!user) throw redirect("/login")
  return { user }
}`,
      },
      {
        id: "passwords",
        label: "Passwords",
        title: "Hash with the platform",
        body: "Node's scrypt and Web Crypto's PBKDF2 are both one call. No dependency required.",
        file: "app/password.server.ts",
        code: `import { scrypt } from "node:crypto"

export const hashPassword = (pw: string) =>
  new Promise<string>((res) => scrypt(pw, "salt", 64, (e, k) => res(k.toString("hex"))))`,
      },
    ],
  },
  {
    id: "assets",
    label: "Assets",
    title: "Import files, get a URL",
    body: "CSS, images and fonts are imported like modules. The bundler fingerprints and serves them.",
    examples: [
      {
        id: "css",
        label: "CSS",
        title: "Side-effect imports",
        body: "Tailwind, plain CSS and CSS modules all work the way they do in any bundler.",
        file: "app/root.tsx",
        code: `import styles from "./styles.css?url"

export const links = () => [{ rel: "stylesheet", href: styles }]`,
      },
      {
        id: "images",
        label: "Images",
        title: "Hashed by default",
        body: "An imported image resolves to its fingerprinted URL, so it can be cached forever.",
        file: "app/hero.tsx",
        code: `import hero from "./hero.png"

export function Hero() {
  return <img src={hero} alt="" width={384} height={384} />
}`,
      },
    ],
  },
  {
    id: "components",
    label: "Components",
    title: "State is JavaScript",
    body: "A component runs setup once and returns a render function. No hooks, no reconciler conventions.",
    examples: [
      {
        id: "counter",
        label: "State",
        title: "An ordinary variable",
        body: "Keep state wherever you like — a closure, an object, a class — then return markup from render.",
        file: "app/components/counter.ts",
        code: `export function counter() {
  let count = 0

  return {
    setup(el) {
      el.textContent = String(count)
      el.addEventListener("click", () => {
        count += 1
        handle.update()
      })
    },
    render() {
      return String(count)
    },
  }
}`,
      },
      {
        id: "attrs",
        label: "Attributes",
        title: "Dynamic styling without a class list",
        body: "Attributes are functions, so a value can be computed at render time rather than toggled through CSS.",
        file: "app/styles.ts",
        code: `export const opacity = (value: number) => ({
  opacity: value,
  transition: "opacity .2s ease",
})`,
      },
    ],
  },
  {
    id: "ui",
    label: "UI",
    title: "Primitives and accessibility",
    body: "Focus management, ARIA wiring and keyboard handling ship as composable mixins rather than a component tree.",
    examples: [
      {
        id: "dialog",
        label: "Dialog",
        title: "Focus trapped, escape handled",
        body: "The behaviour attaches to an element; the markup stays yours.",
        file: "app/dialog.ts",
        code: `export const dialog = (trigger, panel) => {
  trigger.on("click", () => panel.show())
  panel.on("keydown", (e) => {
    if (e.key === "Escape") panel.hide()
  })
  return { role: "dialog", "aria-modal": "true" }
}`,
      },
      {
        id: "listbox",
        label: "Listbox",
        title: "Roving focus",
        body: "Arrow keys move the highlight, Enter commits. The same contract as the runner picker in the command bar.",
        file: "app/listbox.ts",
        code: `export function listbox(options) {
  return {
    onKeydown(e) {
      if (e.key === "ArrowDown") e.preventDefault(), options.next()
      if (e.key === "Enter") options.commit()
    },
  }
}`,
      },
    ],
  },
  {
    id: "animation",
    label: "Animation",
    title: "Motion as a class",
    body: "This is where gclass-anims sits: one call after mount, then behaviour, trigger and tunables in the class attribute.",
    examples: [
      {
        id: "init",
        label: "Init",
        title: "One call, once",
        body: "Call initAnimations() after the DOM is present. A MutationObserver discovers everything that renders after.",
        file: "app/root.tsx",
        code: `import { Outlet, useLocation } from "@remix-run/react"
import { useEffect } from "react"
import { initAnimations } from "gclass-anims"

export default function App() {
  const location = useLocation()

  useEffect(() => {
    initAnimations()
  }, [location.pathname])

  return <Outlet />
}`,
      },
      {
        id: "anatomy",
        label: "Anatomy",
        title: "Behaviour + trigger + tunables",
        body: "Three parts, any order. Order in the class attribute does not matter.",
        file: "app/routes/home.tsx",
        code: `<div class="appear scroll spawn-up">…</div>
<div class="appear scroll order ease-expo time-1 priority-2">…</div>
<div class="float">loops forever</div>
<button class="magnet click-expand">magnet + click</button>`,
      },
      {
        id: "dynamic",
        label: "Dynamic",
        title: "Late mounts keep working",
        body: "Because the observer watches the document, a v-if that swaps in new markup animates without another call.",
        file: "app/routes/home.tsx",
        code: `{items.map((item) => (
  <li class="appear scroll spawn-up order">{item.label}</li>
))}`,
      },
    ],
  },
];

export function StackCard() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [example, setExample] = useState(CATEGORIES[0].examples[0]);
  const copy = useCopyCommand();

  function pickCategory(next: Category) {
    setCategory(next);
    setExample(next.examples[0]);
  }

  return (
    <div className="rx-card" data-home-card>
      <div role="tablist" aria-label="Remix stack layers" className="rx-card__tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={c.id === category.id}
            data-state={c.id === category.id ? "active" : "inactive"}
            tabIndex={c.id === category.id ? 0 : -1}
            className="rx-card__tab"
            onClick={() => pickCategory(c)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const i = CATEGORIES.indexOf(c);
              const next = CATEGORIES[(i + (e.key === "ArrowRight" ? 1 : CATEGORIES.length - 1)) % CATEGORIES.length];
              pickCategory(next);
              document.getElementById(`tab-${next.id}`)?.focus();
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="rx-card__panel" role="tabpanel">
        <div className="rx-card__examples" role="tablist" aria-label={`${category.label} examples`}>
          {category.examples.map((ex) => (
            <button
              key={ex.id}
              role="tab"
              type="button"
              aria-selected={ex.id === example.id}
              data-state={ex.id === example.id ? "active" : "inactive"}
              tabIndex={ex.id === example.id ? 0 : -1}
              className="rx-pill"
              onClick={() => setExample(ex)}
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="rx-card__body">
          <div className="rx-card__intro">
            <h3 className="rx-card__title">{category.title}</h3>
            <p className="rx-card__lede">{category.body}</p>
          </div>

          <div className="rx-example">
            <div className="rx-example__prose">
              <strong>{example.title}</strong>
              <span>{example.body}</span>
            </div>

            <div className="rx-code">
              <div className="rx-code__head">
                <span className="rx-code__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="rx-code__file">{example.file}</span>
              </div>
              <pre>
                <code>{highlight(example.code)}</code>
              </pre>
              <button
                type="button"
                className="rx-code__copy"
                aria-label={`Copy ${example.file}`}
                data-copy
                onClick={() => copy(example.code, () => {})}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal syntax colouring for the snippet.
 *
 * Not a parser — it matches keywords, strings, comments and numbers in one pass
 * over an already-escaped string and wraps them in spans. Rendering the result
 * with dangerouslySetInnerHTML is safe here only because every token is
 * emitted through React's escaping: the text is split on matches and each piece
 * becomes a child, never a raw HTML string.
 */
function highlight(code: string) {
  const parts = code.split(/(\s+|\b(?:import|from|let|const|export|return|await|async|function|new|throw|if|else|typeof|satisfies)\b|"[^"\n]*"|'[^'\n]*'|\/\/[^\n]*|\b\d+\b)/g);

  return parts.map((part, i) => {
    if (!part.trim()) return part;
    let cls: string | undefined;
    if (/^(import|from|let|const|export|return|await|async|function|new|throw|if|else|typeof|satisfies)$/.test(part)) {
      cls = "tok-kw";
    } else if (/^["']/.test(part)) {
      cls = "tok-str";
    } else if (part.startsWith("//")) {
      cls = "tok-com";
    } else if (/^\d+$/.test(part)) {
      cls = "tok-num";
    }
    return cls ? (
      <span key={i} className={cls}>
        {part}
      </span>
    ) : (
      part
    );
  });
}