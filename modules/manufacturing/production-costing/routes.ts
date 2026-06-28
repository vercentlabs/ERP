import type { Router } from "express";
import { productionCostingController } from "./controller";
import { manifest } from "./manifest";

export function registerProductionCostingRoutes(router: Router) {
  router.get(manifest.routeBase, productionCostingController.list);
  router.post(manifest.routeBase, productionCostingController.create);
  router.patch(`${manifest.routeBase}/:id`, productionCostingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, productionCostingController.transition);
}
