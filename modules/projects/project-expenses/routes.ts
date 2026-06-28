import type { Router } from "express";
import { projectExpensesController } from "./controller";
import { manifest } from "./manifest";

export function registerProjectExpensesRoutes(router: Router) {
  router.get(manifest.routeBase, projectExpensesController.list);
  router.post(manifest.routeBase, projectExpensesController.create);
  router.patch(`${manifest.routeBase}/:id`, projectExpensesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, projectExpensesController.transition);
}
