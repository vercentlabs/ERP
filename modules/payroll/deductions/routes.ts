import type { Router } from "express";
import { deductionsController } from "./controller";
import { manifest } from "./manifest";

export function registerDeductionsRoutes(router: Router) {
  router.get(manifest.routeBase, deductionsController.list);
  router.post(manifest.routeBase, deductionsController.create);
  router.patch(`${manifest.routeBase}/:id`, deductionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, deductionsController.transition);
}
