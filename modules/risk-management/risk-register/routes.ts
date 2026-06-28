import type { Router } from "express";
import { riskRegisterController } from "./controller";
import { manifest } from "./manifest";

export function registerRiskRegisterRoutes(router: Router) {
  router.get(manifest.routeBase, riskRegisterController.list);
  router.post(manifest.routeBase, riskRegisterController.create);
  router.patch(`${manifest.routeBase}/:id`, riskRegisterController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, riskRegisterController.transition);
}
