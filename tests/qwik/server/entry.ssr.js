import{j as v,d as Se,s as $e,e as Ee,F as ne,g as Pe,c as re,i as _,f as oe,h as Ce,k as Re,_ as N,a as L,l as je,S as Le,m as me,n as U,o as Ne,p as H,q,r as Ie,t as Ae,v as Be,w as be,x as S,b as De,y as he,z as Ue,A as se}from"./q-beW-ECHV.js";const le={manifestHash:"io9rk",core:"q-OkV2Rw3T.js",preloader:"q-BKZ00VYc.js",qwikLoader:"q-naDMFAHy.js",bundleGraphAsset:"assets/BKgQGUiu-bundle-graph.json",injections:[],mapping:{s_L13zP4r6WfI:"q-Bpwqxvxg.js",s_O82onrwRboc:"q-Ci10skZF.js",s_gxlxcqykB0I:"q-q6OvyyLj.js",s_IninkUUtZKk:"q-C95pRWyG.js",s_SAY2zeZbJcc:"q-BdxZq4cD.js",s_5ls8FPO8Wa4:"q-BkgDB3dQ.js",s_9jUBkQcsH0Q:"q-Bpwqxvxg.js",s_OR00FUg7jqU:"q-sYhK0kof.js",s_Ri3CndJWpFY:"q-DbU5R3uo.js",s_ZUFhplo34AY:"q-DRKLeHgG.js",s_dqGMo3m0idU:"q-HfYFWldM.js",s_j8H0jtNS4zg:"q-Bjcd9XpK.js",s_yJ0LePK02gQ:"q-Ci10skZF.js",s_CKSVLwSfq8g:"q-BkgDB3dQ.js",s_y5Y21t11M5o:"q-Ci10skZF.js",s_BSjv8P2Ciic:"q-DgC5Y5Ea.js",s_BgsaU9GjGFE:"q-DniBe2O6.js",s_V0KXiorLRCQ:"q-BLLsC5z1.js",s_xM1RqbrGJNU:"q-BCynJtpT.js",s_5WeUZVKYVkc:"q-Ci10skZF.js",s_T6EGEa0Wk0s:"q-HfYFWldM.js",s_TFG60buu3P4:"q-sYhK0kof.js",s_ZKYcyy0h58A:"q-DbU5R3uo.js",s_ZLkbTSLgmPE:"q-Bpwqxvxg.js",s_c8E1YuNMA64:"q-DbU5R3uo.js",s_gL13LSvWPOw:"q-sYhK0kof.js",s_pKUWVGqnwR0:"q-Ci10skZF.js",s_yjSY3UMduE4:"q-DbU5R3uo.js"}};var Te=!1,Oe="",Fe=(e,...t)=>{const n=Qe(Te,e,...t);debugger;return n},ze=e=>e,Qe=(e,t,...n)=>{const r=t instanceof Error?t:new Error(t);return console.error("%cQWIK ERROR",Oe,r.message,...ze(n),r.stack),r},Me=(e,...t)=>`Code(${e}) https://github.com/QwikDev/qwik/blob/main/packages/qwik/src/core/error/error.ts#L${8+e}`,Ke=11,We=(e,...t)=>{const n=Me(e,...t);return Fe(n,...t)},Ye="<sync>";function He(e,t){const n=t?.mapper,r=e.symbolMapper?e.symbolMapper:(a,i,s)=>{if(n){const l=F(a),c=n[l];if(!c){if(l===Ye)return[l,""];if(globalThis.__qwik_reg_symbols?.has(l))return[a,"_"];if(s)return[a,`${s}?qrl=${a}`];console.error("Cannot resolve symbol",a,"in",n,s)}return c}};return{isServer:!0,async importSymbol(a,i,s){const l=F(s),c=globalThis.__qwik_reg_symbols?.get(l);if(c)return c;throw We(Ke,s)},raf:()=>(console.error("server can not rerender"),Promise.resolve()),nextTick:a=>new Promise(i=>{setTimeout(()=>{i(a())})}),chunkForSymbol(a,i,s){return r(a,n,s)}}}async function Ve(e,t){const n=He(e,t);$e(n)}var F=e=>{const t=e.lastIndexOf("_");return t>-1?e.slice(t+1):e},Ge="q:instance",G={$DEBUG$:!1,$invPreloadProbability$:.65},Je=Date.now(),Ze=/\.[mc]?js$/,ve=0,Xe=1,et=2,tt=3,J,Z,nt=(e,t)=>({$name$:e,$state$:Ze.test(e)?ve:tt,$deps$:ye?t?.map(n=>({...n,$factor$:1})):t,$inverseProbability$:1,$createdTs$:Date.now(),$waitedMs$:0,$loadedMs$:0}),rt=e=>{const t=new Map;let n=0;for(;n<e.length;){const r=e[n++],o=[];let a,i=1;for(;a=e[n],typeof a=="number";)a<0?i=-a/10:o.push({$name$:e[a],$importProbability$:i,$factor$:1}),n++;t.set(r,o)}return t},ge=e=>{let t=X.get(e);if(!t){let n;if(Z){if(n=Z.get(e),!n)return;n.length||(n=void 0)}t=nt(e,n),X.set(e,t)}return t},ot=(e,t)=>{t&&("debug"in t&&(G.$DEBUG$=!!t.debug),typeof t.preloadProbability=="number"&&(G.$invPreloadProbability$=1-t.preloadProbability)),!(J!=null||!e)&&(J="",Z=rt(e))},X=new Map,ye,z,we=0,A=[],at=(...e)=>{console.log(`Preloader ${Date.now()-Je}ms ${we}/${A.length} queued>`,...e)},it=()=>{X.clear(),z=!1,ye=!0,we=0,A.length=0},st=()=>{z&&(A.sort((e,t)=>e.$inverseProbability$-t.$inverseProbability$),z=!1)},lt=()=>{st();let e=.4;const t=[];for(const n of A){const r=Math.round((1-n.$inverseProbability$)*10);r!==e&&(e=r,t.push(e)),t.push(n.$name$)}return t},ke=(e,t,n)=>{if(n?.has(e))return;const r=e.$inverseProbability$;if(e.$inverseProbability$=t,!(r-e.$inverseProbability$<.01)&&(J!=null&&e.$state$<et&&(e.$state$===ve&&(e.$state$=Xe,A.push(e),G.$DEBUG$&&at(`queued ${Math.round((1-e.$inverseProbability$)*100)}%`,e.$name$)),z=!0),e.$deps$)){n||(n=new Set),n.add(e);const o=1-e.$inverseProbability$;for(const a of e.$deps$){const i=ge(a.$name$);if(i.$inverseProbability$===0)continue;let s;if(o===1||o>=.99&&ee<100)ee++,s=Math.min(.01,1-a.$importProbability$);else{const l=1-a.$importProbability$*o,c=a.$factor$,u=l/c;s=Math.max(.02,i.$inverseProbability$*u),a.$factor$=u}ke(i,s,n)}}},ce=(e,t)=>{const n=ge(e);n&&n.$inverseProbability$>t&&ke(n,t)},ee,ct=(e,t)=>{if(!e?.length)return;ee=0;let n=t?1-t:.4;if(Array.isArray(e))for(let r=e.length-1;r>=0;r--){const o=e[r];typeof o=="number"?n=1-o/10:ce(o,n)}else ce(e,n)};function dt(e){const t=[],n=r=>{if(r)for(const o of r)t.includes(o.url)||(t.push(o.url),o.imports&&n(o.imports))};return n(e),t}var ut=e=>{const t=Pe(),n=e?.qrls?.map(r=>{const o=r.$refSymbol$||r.$symbol$,a=r.$chunk$,i=t.chunkForSymbol(o,a,r.dev?.file);return i?i[1]:a}).filter(Boolean);return[...new Set(n)]};function pt(e,t,n){const r=t.prefetchStrategy;if(r===null)return[];if(!n?.manifest.bundleGraph)return ut(e);if(typeof r?.symbolsToPrefetch=="function")try{const a=r.symbolsToPrefetch({manifest:n.manifest});return dt(a)}catch(a){console.error("getPrefetchUrls, symbolsToPrefetch()",a)}const o=new Set;for(const a of e?.qrls||[]){const i=F(a.$refSymbol$||a.$symbol$);i&&i.length>=10&&o.add(i)}return[...o]}var ft=(e,t)=>{if(!t?.manifest.bundleGraph)return[...new Set(e)];it();let n=.99;for(const r of e.slice(0,15))ct(r,n),n*=.85;return lt()},te=(e,t)=>{if(t==null)return null;const n=`${e}${t}`.split("/"),r=[];for(const o of n)o===".."&&r.length>0?r.pop():r.push(o);return r.join("/")},mt=(e,t,n,r,o)=>{const a=te(e,t?.manifest?.preloader),i="/"+t?.manifest.bundleGraphAsset;if(a&&i&&n!==!1){const l=typeof n=="object"?{debug:n.debug,preloadProbability:n.ssrPreloadProbability}:void 0;ot(t?.manifest.bundleGraph,l);const c=[];n?.debug&&c.push("d:1"),n?.maxIdlePreloads&&c.push(`P:${n.maxIdlePreloads}`),n?.preloadProbability&&c.push(`Q:${n.preloadProbability}`);const u=c.length?`,{${c.join(",")}}`:"",d=`let b=fetch("${i}");import("${a}").then(({l})=>l(${JSON.stringify(e)},b${u}));`;r.push(v("link",{rel:"modulepreload",href:a,nonce:o,crossorigin:"anonymous"}),v("link",{rel:"preload",href:i,as:"fetch",crossorigin:"anonymous",nonce:o}),v("script",{type:"module",async:!0,dangerouslySetInnerHTML:d,nonce:o}))}const s=te(e,t?.manifest.core);s&&r.push(v("link",{rel:"modulepreload",href:s,nonce:o}))},bt=(e,t,n,r,o)=>{if(r.length===0||n===!1)return null;const{ssrPreloads:a,ssrPreloadProbability:i}=vt(typeof n=="boolean"?void 0:n);let s=a;const l=[],c=[],u=t?.manifest.manifestHash;if(s){const p=t?.manifest.preloader,b=t?.manifest.core,y=ft(r,t);let k=4;const C=i*10;for(const h of y)if(typeof h=="string"){if(k<C)break;if(h===p||h===b)continue;if(c.push(h),--s===0)break}else k=h}const d=te(e,u&&t?.manifest.preloader);let g=c.length?`${JSON.stringify(c)}.map((l,e)=>{e=document.createElement('link');e.rel='modulepreload';e.href=${JSON.stringify(e)}+l;document.head.appendChild(e)});`:"";return d&&(g+=`window.addEventListener('load',f=>{f=_=>import("${d}").then(({p})=>p(${JSON.stringify(r)}));try{requestIdleCallback(f,{timeout:2000})}catch(e){setTimeout(f,200)}})`),g&&l.push(v("script",{type:"module","q:type":"preload",async:!0,dangerouslySetInnerHTML:g,nonce:o})),l.length>0?v(ne,{children:l}):null},ht=(e,t,n,r,o)=>{if(n.preloader!==!1){const a=pt(t,n,r);if(a.length>0){const i=bt(e,r,n.preloader,a,n.serverData?.nonce);i&&o.push(i)}}};function vt(e){return{...gt,...e}}var gt={ssrPreloads:7,ssrPreloadProbability:.5,debug:!1,maxIdlePreloads:25,preloadProbability:.35},yt='const t=document,e=window,n=new Set,o=new Set([t]);let r;const s=(t,e)=>Array.from(t.querySelectorAll(e)),a=t=>{const e=[];return o.forEach(n=>e.push(...s(n,t))),e},i=t=>{w(t),s(t,"[q\\\\:shadowroot]").forEach(t=>{const e=t.shadowRoot;e&&i(e)})},c=t=>t&&"function"==typeof t.then,l=(t,e,n=e.type)=>{a("[on"+t+"\\\\:"+n+"]").forEach(o=>{b(o,t,e,n)})},f=e=>{if(void 0===e._qwikjson_){let n=(e===t.documentElement?t.body:e).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===n.getAttribute("type")){e._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/gi,"<$1"));break}n=n.previousElementSibling}}},p=(t,e)=>new CustomEvent(t,{detail:e}),b=async(e,n,o,r=o.type)=>{const s="on"+n+":"+r;e.hasAttribute("preventdefault:"+r)&&o.preventDefault(),e.hasAttribute("stoppropagation:"+r)&&o.stopPropagation();const a=e._qc_,i=a&&a.li.filter(t=>t[0]===s);if(i&&i.length>0){for(const t of i){const n=t[1].getFn([e,o],()=>e.isConnected)(o,e),r=o.cancelBubble;c(n)&&await n,r&&o.stopPropagation()}return}const l=e.getAttribute(s);if(l){const n=e.closest("[q\\\\:container]"),r=n.getAttribute("q:base"),s=n.getAttribute("q:version")||"unknown",a=n.getAttribute("q:manifest-hash")||"dev",i=new URL(r,t.baseURI);for(const p of l.split("\\n")){const l=new URL(p,i),b=l.href,h=l.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",q=performance.now();let _,d,y;const w=p.startsWith("#"),g={qBase:r,qManifest:a,qVersion:s,href:b,symbol:h,element:e,reqTime:q};if(w){const e=n.getAttribute("q:instance");_=(t["qFuncs_"+e]||[])[Number.parseInt(h)],_||(d="sync",y=Error("sym:"+h))}else{u("qsymbol",g);const t=l.href.split("#")[0];try{const e=import(t);f(n),_=(await e)[h],_||(d="no-symbol",y=Error(`${h} not in ${t}`))}catch(t){d||(d="async"),y=t}}if(!_){u("qerror",{importError:d,error:y,...g}),console.error(y);break}const m=t.__q_context__;if(e.isConnected)try{t.__q_context__=[e,o,l];const n=_(o,e);c(n)&&await n}catch(t){u("qerror",{error:t,...g})}finally{t.__q_context__=m}}}},u=(e,n)=>{t.dispatchEvent(p(e,n))},h=t=>t.replace(/([A-Z])/g,t=>"-"+t.toLowerCase()),q=async t=>{let e=h(t.type),n=t.target;for(l("-document",t,e);n&&n.getAttribute;){const o=b(n,"",t,e);let r=t.cancelBubble;c(o)&&await o,r||(r=r||t.cancelBubble||n.hasAttribute("stoppropagation:"+t.type)),n=t.bubbles&&!0!==r?n.parentElement:null}},_=t=>{l("-window",t,h(t.type))},d=()=>{const s=t.readyState;if(!r&&("interactive"==s||"complete"==s)&&(o.forEach(i),r=1,u("qinit"),(e.requestIdleCallback??e.setTimeout).bind(e)(()=>u("qidle")),n.has("qvisible"))){const t=a("[on\\\\:qvisible]"),e=new IntersectionObserver(t=>{for(const n of t)n.isIntersecting&&(e.unobserve(n.target),b(n.target,"",p("qvisible",n)))});t.forEach(t=>e.observe(t))}},y=(t,e,n,o=!1)=>{t.addEventListener(e,n,{capture:o,passive:!1})},w=(...t)=>{for(const r of t)"string"==typeof r?n.has(r)||(o.forEach(t=>y(t,r,q,!0)),y(e,r,_,!0),n.add(r)):o.has(r)||(n.forEach(t=>y(r,t,q,!0)),o.add(r))};if(!("__q_context__"in t)){t.__q_context__=0;const r=e.qwikevents;r&&(Array.isArray(r)?w(...r):w("click","input")),e.qwikevents={events:n,roots:o,push:w},y(t,"readystatechange",d),d()}',wt=`const doc = document;
const win = window;
const events = /* @__PURE__ */ new Set();
const roots = /* @__PURE__ */ new Set([doc]);
let hasInitialized;
const nativeQuerySelectorAll = (root, selector) => Array.from(root.querySelectorAll(selector));
const querySelectorAll = (query) => {
  const elements = [];
  roots.forEach((root) => elements.push(...nativeQuerySelectorAll(root, query)));
  return elements;
};
const findShadowRoots = (fragment) => {
  processEventOrNode(fragment);
  nativeQuerySelectorAll(fragment, "[q\\\\:shadowroot]").forEach((parent) => {
    const shadowRoot = parent.shadowRoot;
    shadowRoot && findShadowRoots(shadowRoot);
  });
};
const isPromise = (promise) => promise && typeof promise.then === "function";
const broadcast = (infix, ev, type = ev.type) => {
  querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((el) => {
    dispatch(el, infix, ev, type);
  });
};
const resolveContainer = (containerEl) => {
  if (containerEl._qwikjson_ === void 0) {
    const parentJSON = containerEl === doc.documentElement ? doc.body : containerEl;
    let script = parentJSON.lastElementChild;
    while (script) {
      if (script.tagName === "SCRIPT" && script.getAttribute("type") === "qwik/json") {
        containerEl._qwikjson_ = JSON.parse(
          script.textContent.replace(/\\\\x3C(\\/?script)/gi, "<$1")
        );
        break;
      }
      script = script.previousElementSibling;
    }
  }
};
const createEvent = (eventName, detail) => new CustomEvent(eventName, {
  detail
});
const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {
  const attrName = "on" + onPrefix + ":" + eventName;
  if (element.hasAttribute("preventdefault:" + eventName)) {
    ev.preventDefault();
  }
  if (element.hasAttribute("stoppropagation:" + eventName)) {
    ev.stopPropagation();
  }
  const ctx = element._qc_;
  const relevantListeners = ctx && ctx.li.filter((li) => li[0] === attrName);
  if (relevantListeners && relevantListeners.length > 0) {
    for (const listener of relevantListeners) {
      const results = listener[1].getFn([element, ev], () => element.isConnected)(ev, element);
      const cancelBubble = ev.cancelBubble;
      if (isPromise(results)) {
        await results;
      }
      if (cancelBubble) {
        ev.stopPropagation();
      }
    }
    return;
  }
  const attrValue = element.getAttribute(attrName);
  if (attrValue) {
    const container = element.closest("[q\\\\:container]");
    const qBase = container.getAttribute("q:base");
    const qVersion = container.getAttribute("q:version") || "unknown";
    const qManifest = container.getAttribute("q:manifest-hash") || "dev";
    const base = new URL(qBase, doc.baseURI);
    for (const qrl of attrValue.split("\\n")) {
      const url = new URL(qrl, base);
      const href = url.href;
      const symbol = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
      const reqTime = performance.now();
      let handler;
      let importError;
      let error;
      const isSync = qrl.startsWith("#");
      const eventData = {
        qBase,
        qManifest,
        qVersion,
        href,
        symbol,
        element,
        reqTime
      };
      if (isSync) {
        const hash = container.getAttribute("q:instance");
        handler = (doc["qFuncs_" + hash] || [])[Number.parseInt(symbol)];
        if (!handler) {
          importError = "sync";
          error = new Error("sym:" + symbol);
        }
      } else {
        emitEvent("qsymbol", eventData);
        const uri = url.href.split("#")[0];
        try {
          const module = import(
                        uri
          );
          resolveContainer(container);
          handler = (await module)[symbol];
          if (!handler) {
            importError = "no-symbol";
            error = new Error(\`\${symbol} not in \${uri}\`);
          }
        } catch (err) {
          importError || (importError = "async");
          error = err;
        }
      }
      if (!handler) {
        emitEvent("qerror", {
          importError,
          error,
          ...eventData
        });
        console.error(error);
        break;
      }
      const previousCtx = doc.__q_context__;
      if (element.isConnected) {
        try {
          doc.__q_context__ = [element, ev, url];
          const results = handler(ev, element);
          if (isPromise(results)) {
            await results;
          }
        } catch (error2) {
          emitEvent("qerror", { error: error2, ...eventData });
        } finally {
          doc.__q_context__ = previousCtx;
        }
      }
    }
  }
};
const emitEvent = (eventName, detail) => {
  doc.dispatchEvent(createEvent(eventName, detail));
};
const camelToKebab = (str) => str.replace(/([A-Z])/g, (a) => "-" + a.toLowerCase());
const processDocumentEvent = async (ev) => {
  let type = camelToKebab(ev.type);
  let element = ev.target;
  broadcast("-document", ev, type);
  while (element && element.getAttribute) {
    const results = dispatch(element, "", ev, type);
    let cancelBubble = ev.cancelBubble;
    if (isPromise(results)) {
      await results;
    }
    cancelBubble || (cancelBubble = cancelBubble || ev.cancelBubble || element.hasAttribute("stoppropagation:" + ev.type));
    element = ev.bubbles && cancelBubble !== true ? element.parentElement : null;
  }
};
const processWindowEvent = (ev) => {
  broadcast("-window", ev, camelToKebab(ev.type));
};
const processReadyStateChange = () => {
  const readyState = doc.readyState;
  if (!hasInitialized && (readyState == "interactive" || readyState == "complete")) {
    roots.forEach(findShadowRoots);
    hasInitialized = 1;
    emitEvent("qinit");
    const riC = win.requestIdleCallback ?? win.setTimeout;
    riC.bind(win)(() => emitEvent("qidle"));
    if (events.has("qvisible")) {
      const results = querySelectorAll("[on\\\\:qvisible]");
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            dispatch(entry.target, "", createEvent("qvisible", entry));
          }
        }
      });
      results.forEach((el) => observer.observe(el));
    }
  }
};
const addEventListener = (el, eventName, handler, capture = false) => {
  el.addEventListener(eventName, handler, { capture, passive: false });
};
const processEventOrNode = (...eventNames) => {
  for (const eventNameOrNode of eventNames) {
    if (typeof eventNameOrNode === "string") {
      if (!events.has(eventNameOrNode)) {
        roots.forEach(
          (root) => addEventListener(root, eventNameOrNode, processDocumentEvent, true)
        );
        addEventListener(win, eventNameOrNode, processWindowEvent, true);
        events.add(eventNameOrNode);
      }
    } else {
      if (!roots.has(eventNameOrNode)) {
        events.forEach(
          (eventName) => addEventListener(eventNameOrNode, eventName, processDocumentEvent, true)
        );
        roots.add(eventNameOrNode);
      }
    }
  }
};
if (!("__q_context__" in doc)) {
  doc.__q_context__ = 0;
  const qwikevents = win.qwikevents;
  if (qwikevents) {
    if (Array.isArray(qwikevents)) {
      processEventOrNode(...qwikevents);
    } else {
      processEventOrNode("click", "input");
    }
  }
  win.qwikevents = {
    events,
    roots,
    push: processEventOrNode
  };
  addEventListener(doc, "readystatechange", processReadyStateChange);
  processReadyStateChange();
}`;function kt(e={}){return e.debug?wt:yt}function V(){if(typeof performance>"u")return()=>0;const e=performance.now();return()=>(performance.now()-e)/1e6}function xt(e){let t=e.base;return typeof e.base=="function"&&(t=e.base(e)),typeof t=="string"?(t.endsWith("/")||(t+="/"),t):"/build/"}var qt="<!DOCTYPE html>";async function _t(e,t){let n=t.stream,r=0,o=0,a=0,i=0,s="",l;const c=t.streaming?.inOrder??{strategy:"auto",maximunInitialChunk:5e4,maximunChunk:3e4},u=t.containerTagName??"html",d=t.containerAttributes??{},f=n,g=V(),p=xt(t),b=$t(t.manifest),y=t.serverData?.nonce;function k(){s&&(f.write(s),s="",r=0,a++,a===1&&(i=g()))}function C(m){const w=m.length;r+=w,o+=w,s+=m}switch(c.strategy){case"disabled":n={write:C};break;case"direct":n=f;break;case"auto":let m=0,w=!1;const ae=c.maximunChunk??0,Y=c.maximunInitialChunk??0;n={write(R){R==="<!--qkssr-f-->"?w||(w=!0):R==="<!--qkssr-pu-->"?m++:R==="<!--qkssr-po-->"?m--:C(R),m===0&&(w||r>=(a===0?Y:ae))&&(w=!1,k())}};break}u==="html"?n.write(qt):n.write("<!--cq-->"),b||console.warn("Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build."),await Ve(t,b);const h=b?.manifest.injections,$=h?h.map(m=>v(m.tag,m.attributes??{})):[];let x=t.qwikLoader?typeof t.qwikLoader=="object"?t.qwikLoader.include==="never"?2:0:t.qwikLoader==="inline"?1:t.qwikLoader==="never"?2:0:0;const B=b?.manifest.qwikLoader;if(x===0&&!B&&(x=1),x===0)$.unshift(v("link",{rel:"modulepreload",href:`${p}${B}`,nonce:y}),v("script",{type:"module",async:!0,src:`${p}${B}`,nonce:y}));else if(x===1){const m=kt({debug:t.debug});$.unshift(v("script",{id:"qwikloader",type:"module",async:!0,nonce:y,dangerouslySetInnerHTML:m}))}mt(p,b,t.preloader,$,y);const M=V(),K=[];let D=0,E=0;await Se(e,{stream:n,containerTagName:u,containerAttributes:d,serverData:t.serverData,base:p,beforeContent:$,beforeClose:async(m,w,ae,Y)=>{D=M();const R=V();l=await Ee(m,w,void 0,Y);const j=[];ht(p,l,t,b,j);const _e=JSON.stringify(l.state,void 0,void 0);if(j.push(v("script",{type:"qwik/json",dangerouslySetInnerHTML:Et(_e),nonce:y})),l.funcs.length>0){const I=d[Ge];j.push(v("script",{"q:func":"qwik/json",dangerouslySetInnerHTML:Rt(I,l.funcs),nonce:y}))}const ie=Array.from(w.$events$,I=>JSON.stringify(I));if(ie.length>0){const I=`(window.qwikevents||(window.qwikevents=[])).push(${ie.join(",")})`;j.push(v("script",{dangerouslySetInnerHTML:I,nonce:y}))}return Pt(K,m),E=R(),v(ne,{children:j})},manifestHash:b?.manifest.manifestHash||"dev"+St()}),u!=="html"&&n.write("<!--/cq-->"),k();const W=l.resources.some(m=>m._cache!==1/0);return{prefetchResources:void 0,snapshotResult:l,flushes:a,manifest:b?.manifest,size:o,isStatic:!W,timing:{render:D,snapshot:E,firstFlush:i}}}function St(){return Math.random().toString(36).slice(2)}function $t(e){const t=e?{...le,...e}:le;if(!t||"mapper"in t)return t;if(t.mapping){const n={};return Object.entries(t.mapping).forEach(([r,o])=>{n[F(r)]=[r,o]}),{mapper:n,manifest:t,injections:t.injections||[]}}}var Et=e=>e.replace(/<(\/?script)/gi,"\\x3C$1");function Pt(e,t){for(const n of t){const r=n.$componentQrl$?.getSymbol();r&&!e.includes(r)&&e.push(r)}}var Ct='document["qFuncs_HASH"]=';function Rt(e,t){return Ct.replace("HASH",e)+`[${t.join(`,
`)}]`}const jt=S("qc-s"),Lt=S("qc-c"),xe=S("qc-ic"),Nt=S("qc-h"),It=S("qc-l"),At=S("qc-n"),Bt=S("qc-a"),Dt=S("qc-p"),Ut=Be(De("s_BSjv8P2Ciic")),Tt=()=>{if(!oe("containerAttributes"))throw new Error("PrefetchServiceWorker component must be rendered on the server.");Ce();const t=Re(xe);if(t.value&&t.value.length>0){const n=t.value.length;let r=null;for(let o=n-1;o>=0;o--)t.value[o].default&&(r=N(t.value[o].default,{children:r},1,"vu_0"));return N(ne,{children:[r,L("script",{"document:onQCInit$":Ut,"document:onQInit$":je(()=>{((o,a)=>{if(!o._qcs&&a.scrollRestoration==="manual"){o._qcs=!0;const i=a.state?._qCityScroll;i&&o.scrollTo(i.x,i.y),document.dispatchEvent(new Event("qcinit"))}})(window,history)},'()=>{((w,h)=>{if(!w._qcs&&h.scrollRestoration==="manual"){w._qcs=true;const s=h.state?._qCityScroll;if(s){w.scrollTo(s.x,s.y);}document.dispatchEvent(new Event("qcinit"));}})(window,history);}')},null,null,2,"vu_1")]},1,"vu_2")}return Le},Ot=re(_(Tt,"s_j8H0jtNS4zg")),Ft=(e,t)=>new URL(e,t.href),de=(e,t)=>e.origin===t.origin,ue=e=>e.endsWith("/")?e:e+"/",zt=({pathname:e},{pathname:t})=>{const n=Math.abs(e.length-t.length);return n===0?e===t:n===1&&ue(e)===ue(t)},Qt=(e,t)=>e.search===t.search,Q=(e,t)=>Qt(e,t)&&zt(e,t),Mt=e=>e&&typeof e.then=="function",Kt=(e,t,n,r)=>{const o=qe(),i={head:o,withLocale:s=>se(r,s),resolveValue:s=>{const l=s.__id;if(s.__brand==="server_loader"&&!(l in e.loaders))throw new Error("You can not get the returned data of a loader that has not been executed for this request.");const c=e.loaders[l];if(Mt(c))throw new Error("Loaders returning a promise can not be resolved for the head function.");return c},...t};for(let s=n.length-1;s>=0;s--){const l=n[s]&&n[s].head;l&&(typeof l=="function"?pe(o,se(r,()=>l(i))):typeof l=="object"&&pe(o,l))}return i.head},pe=(e,t)=>{typeof t.title=="string"&&(e.title=t.title),T(e.meta,t.meta),T(e.links,t.links),T(e.styles,t.styles),T(e.scripts,t.scripts),Object.assign(e.frontmatter,t.frontmatter)},T=(e,t)=>{if(Array.isArray(t))for(const n of t){if(typeof n.key=="string"){const r=e.findIndex(o=>o.key===n.key);if(r>-1){e[r]=n;continue}}e.push(n)}},qe=()=>({title:"",meta:[],links:[],styles:[],scripts:[],frontmatter:{}}),Wt=()=>be(oe("qwikcity")),fe={},O={navCount:0},Yt=":root{view-transition-name:none}",Ht=e=>{},Vt=async(e,t)=>{const[n,r,o,a]=he(),{type:i="link",forceReload:s=e===void 0,replaceState:l=!1,scroll:c=!0}=typeof t=="object"?t:{forceReload:t};O.navCount++;const u=o.value.dest,d=e===void 0?u:typeof e=="number"?e:Ft(e,a.url);if(fe.$cbs$&&(s||typeof d=="number"||!Q(d,u)||!de(d,u))){const f=O.navCount,g=await Promise.all([...fe.$cbs$.values()].map(p=>p(d)));if(f!==O.navCount||g.some(Boolean)){f===O.navCount&&i==="popstate"&&history.pushState(null,"",u);return}}if(typeof d!="number"&&de(d,u)){if(!s&&Q(d,u)){if(d.href!==a.url.href){const f=new URL(d.href);o.value.dest=f,a.url=f}return}return o.value={type:i,dest:d,forceReload:s,replaceState:l,scroll:c},n.value=void 0,a.isNavigating=!0,new Promise(f=>{r.r=f})}},Gt=({track:e})=>{const[t,n,r,o,a,i,s,l,c,u,d]=he();async function f(){const p=e(u),b=e(t),y=Ue(""),k=d.url,C=b?"form":p.type;p.replaceState;let h,$,x=null;if(h=new URL(p.dest,d.url),x=a.loadedRoute,$=a.response,x){const[B,M,K,D]=x,E=K,W=E[E.length-1];p.dest.search&&Q(h,k)&&(h.search=p.dest.search),Q(h,k)||(d.prevUrl=k),d.url=h,d.params={...M},u.untrackedValue={type:C,dest:h};const P=Kt($,d,E,y);n.headings=W.headings,n.menu=D,r.value=be(E),o.links=P.links,o.meta=P.meta,o.styles=P.styles,o.scripts=P.scripts,o.title=P.title,o.frontmatter=P.frontmatter}}return f()},Jt=e=>{me(_(Yt,"s_y5Y21t11M5o"));const t=Wt();if(!t?.params)throw new Error("Missing Qwik City Env Data for help visit https://github.com/QwikDev/qwik/issues/6237");const n=oe("url");if(!n)throw new Error("Missing Qwik URL Env Data");if(t.ev.originalUrl.pathname!==t.ev.url.pathname)throw new Error('enableRequestRewrite is an experimental feature and is not enabled. Please enable the feature flag by adding `experimental: ["enableRequestRewrite"]` to your qwikVite plugin options.');const r=new URL(n),o=U({url:r,params:t.params,isNavigating:!1,prevUrl:void 0},{deep:!1}),a={},i=Ne(U(t.response.loaders,{deep:!1})),s=H({type:"initial",dest:r,forceReload:!1,replaceState:!1,scroll:!0}),l=U(qe),c=U({headings:void 0,menu:void 0}),u=H(),d=t.response.action,f=d?t.response.loaders[d]:void 0,g=H(f?{id:d,data:t.response.formData,output:{result:f,status:t.response.status}}:void 0),p=_(Ht,"s_5WeUZVKYVkc"),b=_(Vt,"s_pKUWVGqnwR0",[g,a,s,o]);return q(Lt,c),q(xe,u),q(Nt,l),q(It,o),q(At,b),q(jt,i),q(Bt,g),q(Dt,p),Ie(_(Gt,"s_O82onrwRboc",[g,c,u,l,t,b,i,a,e,s,o])),N(Ae,null,3,"vu_3")},Zt=re(_(Jt,"s_yJ0LePK02gQ")),Xt='@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-space-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-tracking:initial;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, monospace;--spacing:.25rem;--container-2xl:42rem;--container-4xl:56rem;--text-sm:.875rem;--text-sm--line-height:calc(1.25 / .875);--text-lg:1.125rem;--text-lg--line-height:calc(1.75 / 1.125);--text-3xl:1.875rem;--text-3xl--line-height: 1.2 ;--text-5xl:3rem;--text-5xl--line-height:1;--text-6xl:3.75rem;--text-6xl--line-height:1;--font-weight-medium:500;--font-weight-bold:700;--tracking-tight:-.025em;--leading-relaxed:1.625;--radius-lg:.5rem;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono);--color-brand:#ac7ef4;--color-accent:#18b6f6;--color-ok:#5468ff;--color-page:#151934;--color-panel:#1b1f3b;--color-ink:#fff;--color-muted:#a3a8c9;--color-line:#2f3560;--color-code:#0f1330;--color-codeink:#cdcde6;--font-display:Inter, -apple-system, ui-sans-serif, system-ui, sans-serif;--font-body:Inter, -apple-system, ui-sans-serif, system-ui, sans-serif}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.visible{visibility:visible}.absolute{position:absolute}.relative{position:relative}.static{position:static}.sticky{position:sticky}.top-0{top:0}.top-2{top:calc(var(--spacing) * 2)}.right-2{right:calc(var(--spacing) * 2)}.z-40{z-index:40}.container{width:100%}@media(min-width:40rem){.container{max-width:40rem}}@media(min-width:48rem){.container{max-width:48rem}}@media(min-width:64rem){.container{max-width:64rem}}@media(min-width:80rem){.container{max-width:80rem}}@media(min-width:96rem){.container{max-width:96rem}}.mx-auto{margin-inline:auto}.mt-1{margin-top:var(--spacing)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mt-4{margin-top:calc(var(--spacing) * 4)}.mt-5{margin-top:calc(var(--spacing) * 5)}.mt-6{margin-top:calc(var(--spacing) * 6)}.mt-7{margin-top:calc(var(--spacing) * 7)}.mt-8{margin-top:calc(var(--spacing) * 8)}.ml-auto{margin-left:auto}.block{display:block}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.table{display:table}.max-w-2xl{max-width:var(--container-2xl)}.max-w-4xl{max-width:var(--container-4xl)}.scroll-mt-24{scroll-margin-top:calc(var(--spacing) * 24)}.items-center{align-items:center}.gap-4{gap:calc(var(--spacing) * 4)}.gap-5{gap:calc(var(--spacing) * 5)}.gap-6{gap:calc(var(--spacing) * 6)}:where(.space-y-4>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)))}.overflow-x-auto{overflow-x:auto}.rounded{border-radius:.25rem}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.border{border-style:var(--tw-border-style);border-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-l-2{border-left-style:var(--tw-border-style);border-left-width:2px}.border-brand{border-color:var(--color-brand)}.border-line{border-color:var(--color-line)}.border-ok{border-color:var(--color-ok)}.bg-brand{background-color:var(--color-brand)}.bg-code{background-color:var(--color-code)}.bg-page{background-color:var(--color-page)}.bg-page\\/90{background-color:#151934e6}@supports (color:color-mix(in lab,red,red)){.bg-page\\/90{background-color:color-mix(in oklab,var(--color-page) 90%,transparent)}}.bg-panel{background-color:var(--color-panel)}.p-4{padding:calc(var(--spacing) * 4)}.p-5{padding:calc(var(--spacing) * 5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-1{padding-block:var(--spacing)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-4{padding-block:calc(var(--spacing) * 4)}.py-10{padding-block:calc(var(--spacing) * 10)}.py-16{padding-block:calc(var(--spacing) * 16)}.pt-8{padding-top:calc(var(--spacing) * 8)}.pr-16{padding-right:calc(var(--spacing) * 16)}.pb-24{padding-bottom:calc(var(--spacing) * 24)}.pl-4{padding-left:calc(var(--spacing) * 4)}.font-display{font-family:var(--font-display)}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-3xl{font-size:var(--text-3xl);line-height:var(--tw-leading,var(--text-3xl--line-height))}.text-5xl{font-size:var(--text-5xl);line-height:var(--tw-leading,var(--text-5xl--line-height))}.text-lg{font-size:var(--text-lg);line-height:var(--tw-leading,var(--text-lg--line-height))}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.leading-\\[1\\.1\\]{--tw-leading:1.1;line-height:1.1}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.font-bold{--tw-font-weight:var(--font-weight-bold);font-weight:var(--font-weight-bold)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.tracking-tight{--tw-tracking:var(--tracking-tight);letter-spacing:var(--tracking-tight)}.text-accent{color:var(--color-accent)}.text-brand{color:var(--color-brand)}.text-codeink{color:var(--color-codeink)}.text-ink{color:var(--color-ink)}.text-muted{color:var(--color-muted)}.text-ok{color:var(--color-ok)}.text-page{color:var(--color-page)}.backdrop-blur{--tw-backdrop-blur:blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-opacity{transition-property:opacity;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}@media(hover:hover){.hover\\:border-brand:hover{border-color:var(--color-brand)}.hover\\:text-brand:hover{color:var(--color-brand)}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-90:hover{opacity:.9}}@media(min-width:40rem){.sm\\:flex{display:flex}.sm\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.sm\\:text-6xl{font-size:var(--text-6xl);line-height:var(--tw-leading,var(--text-6xl--line-height))}}}html{scroll-behavior:smooth}body{font-family:var(--font-body);background:var(--color-page);color:var(--color-ink);-webkit-font-smoothing:antialiased}::selection{background:var(--color-accent);color:var(--color-page)}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-tracking{syntax:"*";inherits:false}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}',en=()=>(me(_(Xt,"s_CKSVLwSfq8g")),N(Zt,{children:[L("head",null,null,[L("meta",null,{charset:"utf-8"},null,3,null),L("meta",null,{name:"viewport",content:"width=device-width, initial-scale=1"},null,3,null),L("title",null,null,"gclass-anims — Qwik",3,null)],3,null),L("body",null,null,N(Ot,null,3,"nK_0"),1,null)]},1,"nK_1")),tn=re(_(en,"s_5ls8FPO8Wa4"));function rn(e){return _t(N(tn,null,3,"nh_0"),{manifest:e.manifest,...e,containerAttributes:{lang:"en",...e.containerAttributes}})}export{rn as default};
