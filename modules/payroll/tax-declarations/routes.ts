import type { Router } from "express";
import { taxDeclarationsController } from "./controller";
import { manifest } from "./manifest";

export function registerTaxDeclarationsRoutes(router: Router) {
  router.get(manifest.routeBase, taxDeclarationsController.list);
  router.post(manifest.routeBase, taxDeclarationsController.create);
  router.patch(`${manifest.routeBase}/:id`, taxDeclarationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, taxDeclarationsController.transition);
}
