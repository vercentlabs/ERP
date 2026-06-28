import type { Router } from "express";
import { expensesController } from "./controller";
import { manifest } from "./manifest";

export function registerExpensesRoutes(router: Router) {
  router.get(manifest.routeBase, expensesController.list);
  router.post(manifest.routeBase, expensesController.create);
  router.patch(`${manifest.routeBase}/:id`, expensesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, expensesController.transition);
}
