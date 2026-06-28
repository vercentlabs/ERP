import type { Router } from "express";
import { safetyStockController } from "./controller";
import { manifest } from "./manifest";

export function registerSafetyStockRoutes(router: Router) {
  router.get(manifest.routeBase, safetyStockController.list);
  router.post(manifest.routeBase, safetyStockController.create);
  router.patch(`${manifest.routeBase}/:id`, safetyStockController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, safetyStockController.transition);
}
