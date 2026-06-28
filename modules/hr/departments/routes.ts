import type { Router } from "express";
import { departmentsController } from "./controller";
import { manifest } from "./manifest";

export function registerDepartmentsRoutes(router: Router) {
  router.get(manifest.routeBase, departmentsController.list);
  router.post(manifest.routeBase, departmentsController.create);
  router.patch(`${manifest.routeBase}/:id`, departmentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, departmentsController.transition);
}
