import type { Router } from "express";
import { workflowRecommendationsController } from "./controller";
import { manifest } from "./manifest";

export function registerWorkflowRecommendationsRoutes(router: Router) {
  router.get(manifest.routeBase, workflowRecommendationsController.list);
  router.post(manifest.routeBase, workflowRecommendationsController.create);
  router.patch(`${manifest.routeBase}/:id`, workflowRecommendationsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, workflowRecommendationsController.transition);
}
