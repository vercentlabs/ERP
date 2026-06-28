import type { Router } from "express";
import { salaryComponentsController } from "./controller";
import { manifest } from "./manifest";

export function registerSalaryComponentsRoutes(router: Router) {
  router.get(manifest.routeBase, salaryComponentsController.list);
  router.post(manifest.routeBase, salaryComponentsController.create);
  router.patch(`${manifest.routeBase}/:id`, salaryComponentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, salaryComponentsController.transition);
}
