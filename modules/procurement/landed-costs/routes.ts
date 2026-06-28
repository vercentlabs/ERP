import type { Router } from "express";
import { landedCostsController } from "./controller";
import { manifest } from "./manifest";

export function registerLandedCostsRoutes(router: Router) {
  router.get(manifest.routeBase, landedCostsController.list);
  router.post(manifest.routeBase, landedCostsController.create);
  router.patch(`${manifest.routeBase}/:id`, landedCostsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, landedCostsController.transition);
}
