import type { Router } from "express";
import { stockAdjustmentsController } from "./controller";
import { manifest } from "./manifest";

export function registerStockAdjustmentsRoutes(router: Router) {
  router.get(manifest.routeBase, stockAdjustmentsController.list);
  router.post(manifest.routeBase, stockAdjustmentsController.create);
  router.patch(`${manifest.routeBase}/:id`, stockAdjustmentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, stockAdjustmentsController.transition);
}
