import type { Router } from "express";
import { employeeDocumentsController } from "./controller";
import { manifest } from "./manifest";

export function registerEmployeeDocumentsRoutes(router: Router) {
  router.get(manifest.routeBase, employeeDocumentsController.list);
  router.post(manifest.routeBase, employeeDocumentsController.create);
  router.patch(`${manifest.routeBase}/:id`, employeeDocumentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, employeeDocumentsController.transition);
}
