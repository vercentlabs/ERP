import type { Router } from "express";
import { customerQualityController } from "./controller";
import { manifest } from "./manifest";

export function registerCustomerQualityRoutes(router: Router) {
  router.get(manifest.routeBase, customerQualityController.list);
  router.post(manifest.routeBase, customerQualityController.create);
  router.patch(`${manifest.routeBase}/:id`, customerQualityController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, customerQualityController.transition);
}
