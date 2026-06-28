import type { Router } from "express";
import { commissionsController } from "./controller";
import { manifest } from "./manifest";

export function registerCommissionsRoutes(router: Router) {
  router.get(manifest.routeBase, commissionsController.list);
  router.post(manifest.routeBase, commissionsController.create);
  router.patch(`${manifest.routeBase}/:id`, commissionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, commissionsController.transition);
}
