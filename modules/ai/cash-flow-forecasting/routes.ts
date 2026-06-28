import type { Router } from "express";
import { cashFlowForecastingController } from "./controller";
import { manifest } from "./manifest";

export function registerCashFlowForecastingRoutes(router: Router) {
  router.get(manifest.routeBase, cashFlowForecastingController.list);
  router.post(manifest.routeBase, cashFlowForecastingController.create);
  router.patch(`${manifest.routeBase}/:id`, cashFlowForecastingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, cashFlowForecastingController.transition);
}
