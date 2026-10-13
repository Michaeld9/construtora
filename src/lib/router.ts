import { useSyncExternalStore } from "react";

export type Route = "construtora" | "interiores";

const NAV_EVENT = "basalto:navigate";

const pathFor = (route: Route) => (route === "interiores" ? "/interiores" : "/");
const routeFromPath = (path: string): Route =>
  path.replace(/\/+$/, "").endsWith("/interiores") ? "interiores" : "construtora";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(NAV_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(NAV_EVENT, onChange);
  };
}

export function useRoute(): Route {
  return useSyncExternalStore(subscribe, () => routeFromPath(window.location.pathname));
}

export function navigate(route: Route, hash?: string) {
  const target = pathFor(route) + (hash ? `#${hash}` : "");
  if (routeFromPath(window.location.pathname) === route) {
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", target);
  window.dispatchEvent(new Event(NAV_EVENT));
}
