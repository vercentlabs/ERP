import type { Router } from "express";
import { taxesController } from "./controller";
import { manifest } from "./manifest";

export function registerTaxesRoutes(router: Router) {
  router.get(manifest.routeBase, taxesController.list);
  router.post(manifest.routeBase, taxesController.create);
  router.patch(`${manifest.routeBase}/:id`, taxesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, taxesController.transition);
}
