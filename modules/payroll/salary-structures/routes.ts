import type { Router } from "express";
import { salaryStructuresController } from "./controller";
import { manifest } from "./manifest";

export function registerSalaryStructuresRoutes(router: Router) {
  router.get(manifest.routeBase, salaryStructuresController.list);
  router.post(manifest.routeBase, salaryStructuresController.create);
  router.patch(`${manifest.routeBase}/:id`, salaryStructuresController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, salaryStructuresController.transition);
}
