import type { Router } from "express";
import { fiscalCalendarsController } from "./controller";
import { manifest } from "./manifest";

export function registerFiscalCalendarsRoutes(router: Router) {
  router.get(manifest.routeBase, fiscalCalendarsController.list);
  router.post(manifest.routeBase, fiscalCalendarsController.create);
  router.patch(`${manifest.routeBase}/:id`, fiscalCalendarsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, fiscalCalendarsController.transition);
}
