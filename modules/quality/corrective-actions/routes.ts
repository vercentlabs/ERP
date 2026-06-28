import type { Router } from "express";
import { correctiveActionsController } from "./controller";
import { manifest } from "./manifest";

export function registerCorrectiveActionsRoutes(router: Router) {
  router.get(manifest.routeBase, correctiveActionsController.list);
  router.post(manifest.routeBase, correctiveActionsController.create);
  router.patch(`${manifest.routeBase}/:id`, correctiveActionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, correctiveActionsController.transition);
}
