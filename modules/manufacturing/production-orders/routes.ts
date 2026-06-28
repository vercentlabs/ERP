import type { Router } from "express";
import { productionOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerProductionOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, productionOrdersController.list);
  router.post(manifest.routeBase, productionOrdersController.create);
  router.patch(`${manifest.routeBase}/:id`, productionOrdersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, productionOrdersController.transition);
}
