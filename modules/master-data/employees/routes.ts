import type { Router } from "express";
import { employeesController } from "./controller";
import { manifest } from "./manifest";

export function registerEmployeesRoutes(router: Router) {
  router.get(manifest.routeBase, employeesController.list);
  router.post(manifest.routeBase, employeesController.create);
  router.patch(`${manifest.routeBase}/:id`, employeesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, employeesController.transition);
}
