import type { Router } from "express";
import { valuationController } from "./controller";
import { manifest } from "./manifest";

export function registerValuationRoutes(router: Router) {
  router.get(manifest.routeBase, valuationController.list);
  router.post(manifest.routeBase, valuationController.create);
  router.patch(`${manifest.routeBase}/:id`, valuationController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, valuationController.transition);
}
