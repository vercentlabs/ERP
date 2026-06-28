import type { Router } from "express";
import { learningController } from "./controller";
import { manifest } from "./manifest";

export function registerLearningRoutes(router: Router) {
  router.get(manifest.routeBase, learningController.list);
  router.post(manifest.routeBase, learningController.create);
  router.patch(`${manifest.routeBase}/:id`, learningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, learningController.transition);
}
