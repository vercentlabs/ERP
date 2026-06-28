import type { Router } from "express";
import { profitabilityController } from "./controller";
import { manifest } from "./manifest";

export function registerProfitabilityRoutes(router: Router) {
  router.get(manifest.routeBase, profitabilityController.list);
  router.post(manifest.routeBase, profitabilityController.create);
  router.patch(`${manifest.routeBase}/:id`, profitabilityController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, profitabilityController.transition);
}
