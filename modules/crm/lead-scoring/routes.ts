import type { Router } from "express";
import { leadScoringController } from "./controller";
import { manifest } from "./manifest";

export function registerLeadScoringRoutes(router: Router) {
  router.get(manifest.routeBase, leadScoringController.list);
  router.post(manifest.routeBase, leadScoringController.create);
  router.patch(`${manifest.routeBase}/:id`, leadScoringController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, leadScoringController.transition);
}
