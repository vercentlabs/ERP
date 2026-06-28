import type { Router } from "express";
import { payrollRunsController } from "./controller";
import { manifest } from "./manifest";

export function registerPayrollRunsRoutes(router: Router) {
  router.get(manifest.routeBase, payrollRunsController.list);
  router.post(manifest.routeBase, payrollRunsController.create);
  router.patch(`${manifest.routeBase}/:id`, payrollRunsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, payrollRunsController.transition);
}
