import type { Router } from "express";
import { generalLedgerController } from "./controller";
import { manifest } from "./manifest";

export function registerGeneralLedgerRoutes(router: Router) {
  router.get(manifest.routeBase, generalLedgerController.list);
  router.post(manifest.routeBase, generalLedgerController.create);
  router.patch(`${manifest.routeBase}/:id`, generalLedgerController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, generalLedgerController.transition);
}
