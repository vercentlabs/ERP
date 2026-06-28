import type { Router } from "express";
import { formulaFieldsController } from "./controller";
import { manifest } from "./manifest";

export function registerFormulaFieldsRoutes(router: Router) {
  router.get(manifest.routeBase, formulaFieldsController.list);
  router.post(manifest.routeBase, formulaFieldsController.create);
  router.patch(`${manifest.routeBase}/:id`, formulaFieldsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, formulaFieldsController.transition);
}
