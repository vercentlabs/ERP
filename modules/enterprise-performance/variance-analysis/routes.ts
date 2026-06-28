import type { Router } from "express";
import { varianceAnalysisController } from "./controller";
import { manifest } from "./manifest";

export function registerVarianceAnalysisRoutes(router: Router) {
  router.get(manifest.routeBase, varianceAnalysisController.list);
  router.post(manifest.routeBase, varianceAnalysisController.create);
  router.patch(`${manifest.routeBase}/:id`, varianceAnalysisController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, varianceAnalysisController.transition);
}
