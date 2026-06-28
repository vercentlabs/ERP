import type { Router } from "express";
import { projectBillingController } from "./controller";
import { manifest } from "./manifest";

export function registerProjectBillingRoutes(router: Router) {
  router.get(manifest.routeBase, projectBillingController.list);
  router.post(manifest.routeBase, projectBillingController.create);
  router.patch(`${manifest.routeBase}/:id`, projectBillingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, projectBillingController.transition);
}
