import type { Router } from "express";
import { demandForecastingController } from "./controller";
import { manifest } from "./manifest";

export function registerDemandForecastingRoutes(router: Router) {
  router.get(manifest.routeBase, demandForecastingController.list);
  router.post(manifest.routeBase, demandForecastingController.create);
  router.patch(`${manifest.routeBase}/:id`, demandForecastingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, demandForecastingController.transition);
}
