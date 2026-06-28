import type { Router } from "express";
import { budgetingController } from "./controller";
import { manifest } from "./manifest";

export function registerBudgetingRoutes(router: Router) {
  router.get(manifest.routeBase, budgetingController.list);
  router.post(manifest.routeBase, budgetingController.create);
  router.patch(`${manifest.routeBase}/:id`, budgetingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, budgetingController.transition);
}
