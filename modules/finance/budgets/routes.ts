import type { Router } from "express";
import { budgetsController } from "./controller";
import { manifest } from "./manifest";

export function registerBudgetsRoutes(router: Router) {
  router.get(manifest.routeBase, budgetsController.list);
  router.post(manifest.routeBase, budgetsController.create);
  router.patch(`${manifest.routeBase}/:id`, budgetsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, budgetsController.transition);
}
