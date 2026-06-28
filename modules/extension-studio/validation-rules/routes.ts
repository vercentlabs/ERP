import type { Router } from "express";
import { validationRulesController } from "./controller";
import { manifest } from "./manifest";

export function registerValidationRulesRoutes(router: Router) {
  router.get(manifest.routeBase, validationRulesController.list);
  router.post(manifest.routeBase, validationRulesController.create);
  router.patch(`${manifest.routeBase}/:id`, validationRulesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, validationRulesController.transition);
}
