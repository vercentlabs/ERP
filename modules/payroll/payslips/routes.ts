import type { Router } from "express";
import { payslipsController } from "./controller";
import { manifest } from "./manifest";

export function registerPayslipsRoutes(router: Router) {
  router.get(manifest.routeBase, payslipsController.list);
  router.post(manifest.routeBase, payslipsController.create);
  router.patch(`${manifest.routeBase}/:id`, payslipsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, payslipsController.transition);
}
