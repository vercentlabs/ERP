import type { Router } from "express";
import { stockBalancesController } from "./controller";
import { manifest } from "./manifest";

export function registerStockBalancesRoutes(router: Router) {
  router.get(manifest.routeBase, stockBalancesController.list);
  router.post(manifest.routeBase, stockBalancesController.create);
  router.patch(`${manifest.routeBase}/:id`, stockBalancesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, stockBalancesController.transition);
}
