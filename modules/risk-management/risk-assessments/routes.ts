import type { Router } from "express";
import { riskAssessmentsController } from "./controller";
import { manifest } from "./manifest";

export function registerRiskAssessmentsRoutes(router: Router) {
  router.get(manifest.routeBase, riskAssessmentsController.list);
  router.post(manifest.routeBase, riskAssessmentsController.create);
  router.patch(`${manifest.routeBase}/:id`, riskAssessmentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, riskAssessmentsController.transition);
}
