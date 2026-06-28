import type { Router } from "express";
import { localizationsIndiaEsiController } from "./controller";
import { manifest } from "./manifest";

export function registerLocalizationsIndiaEsiRoutes(router: Router) {
  router.get(manifest.routeBase, localizationsIndiaEsiController.list);
  router.post(manifest.routeBase, localizationsIndiaEsiController.create);
  router.patch(`${manifest.routeBase}/:id`, localizationsIndiaEsiController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, localizationsIndiaEsiController.transition);
}
