import type { Router } from "express";
import { forecastingController } from "./controller";
import { manifest } from "./manifest";

export function registerForecastingRoutes(router: Router) {
  router.get(manifest.routeBase, forecastingController.list);
  router.post(manifest.routeBase, forecastingController.create);
  router.patch(`${manifest.routeBase}/:id`, forecastingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, forecastingController.transition);
}
