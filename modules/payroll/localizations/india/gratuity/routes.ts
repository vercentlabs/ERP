import type { Router } from "express";
import { localizationsIndiaGratuityController } from "./controller";
import { manifest } from "./manifest";

export function registerLocalizationsIndiaGratuityRoutes(router: Router) {
  router.get(manifest.routeBase, localizationsIndiaGratuityController.list);
  router.post(manifest.routeBase, localizationsIndiaGratuityController.create);
  router.patch(`${manifest.routeBase}/:id`, localizationsIndiaGratuityController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, localizationsIndiaGratuityController.transition);
}
