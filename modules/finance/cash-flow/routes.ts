import type { Router } from "express";
import { cashFlowController } from "./controller";
import { manifest } from "./manifest";

export function registerCashFlowRoutes(router: Router) {
  router.get(manifest.routeBase, cashFlowController.list);
  router.post(manifest.routeBase, cashFlowController.create);
  router.patch(`${manifest.routeBase}/:id`, cashFlowController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, cashFlowController.transition);
}
