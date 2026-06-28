import type { Router } from "express";
import { fiscalYearsController } from "./controller";
import { manifest } from "./manifest";

export function registerFiscalYearsRoutes(router: Router) {
  router.get(manifest.routeBase, fiscalYearsController.list);
  router.post(manifest.routeBase, fiscalYearsController.create);
  router.patch(`${manifest.routeBase}/:id`, fiscalYearsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, fiscalYearsController.transition);
}
