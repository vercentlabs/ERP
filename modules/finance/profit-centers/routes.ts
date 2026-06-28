import type { Router } from "express";
import { profitCentersController } from "./controller";
import { manifest } from "./manifest";

export function registerProfitCentersRoutes(router: Router) {
  router.get(manifest.routeBase, profitCentersController.list);
  router.post(manifest.routeBase, profitCentersController.create);
  router.patch(`${manifest.routeBase}/:id`, profitCentersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, profitCentersController.transition);
}
