import type { Router } from "express";
import { aiInsightsController } from "./controller";
import { manifest } from "./manifest";

export function registerAiInsightsRoutes(router: Router) {
  router.get(manifest.routeBase, aiInsightsController.list);
  router.post(manifest.routeBase, aiInsightsController.create);
  router.patch(`${manifest.routeBase}/:id`, aiInsightsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, aiInsightsController.transition);
}
