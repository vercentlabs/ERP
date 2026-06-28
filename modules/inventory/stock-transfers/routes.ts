import type { Router } from "express";
import { stockTransfersController } from "./controller";
import { manifest } from "./manifest";

export function registerStockTransfersRoutes(router: Router) {
  router.get(manifest.routeBase, stockTransfersController.list);
  router.post(manifest.routeBase, stockTransfersController.create);
  router.patch(`${manifest.routeBase}/:id`, stockTransfersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, stockTransfersController.transition);
}
