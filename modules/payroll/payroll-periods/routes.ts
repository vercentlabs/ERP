import type { Router } from "express";
import { payrollPeriodsController } from "./controller";
import { manifest } from "./manifest";

export function registerPayrollPeriodsRoutes(router: Router) {
  router.get(manifest.routeBase, payrollPeriodsController.list);
  router.post(manifest.routeBase, payrollPeriodsController.create);
  router.patch(`${manifest.routeBase}/:id`, payrollPeriodsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, payrollPeriodsController.transition);
}
