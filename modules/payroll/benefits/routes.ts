import type { Router } from "express";
import { benefitsController } from "./controller";
import { manifest } from "./manifest";

export function registerBenefitsRoutes(router: Router) {
  router.get(manifest.routeBase, benefitsController.list);
  router.post(manifest.routeBase, benefitsController.create);
  router.patch(`${manifest.routeBase}/:id`, benefitsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, benefitsController.transition);
}
