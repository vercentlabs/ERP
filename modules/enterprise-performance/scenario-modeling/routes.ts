import type { Router } from "express";
import { scenarioModelingController } from "./controller";
import { manifest } from "./manifest";

export function registerScenarioModelingRoutes(router: Router) {
  router.get(manifest.routeBase, scenarioModelingController.list);
  router.post(manifest.routeBase, scenarioModelingController.create);
  router.patch(`${manifest.routeBase}/:id`, scenarioModelingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, scenarioModelingController.transition);
}
