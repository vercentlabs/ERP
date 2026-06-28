import type { Router } from "express";
import { serialBatchesController } from "./controller";
import { manifest } from "./manifest";

export function registerSerialBatchesRoutes(router: Router) {
  router.get(manifest.routeBase, serialBatchesController.list);
  router.post(manifest.routeBase, serialBatchesController.create);
  router.patch(`${manifest.routeBase}/:id`, serialBatchesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, serialBatchesController.transition);
}
