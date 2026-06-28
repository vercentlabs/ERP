import type { Router } from "express";
import { localizationController } from "./controller";
import { manifest } from "./manifest";

export function registerLocalizationRoutes(router: Router) {
  router.get(manifest.routeBase, localizationController.list);
  router.post(manifest.routeBase, localizationController.create);
  router.patch(`${manifest.routeBase}/:id`, localizationController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, localizationController.transition);
}
