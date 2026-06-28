import type { Router } from "express";
import { creditNotesController } from "./controller";
import { manifest } from "./manifest";

export function registerCreditNotesRoutes(router: Router) {
  router.get(manifest.routeBase, creditNotesController.list);
  router.post(manifest.routeBase, creditNotesController.create);
  router.patch(`${manifest.routeBase}/:id`, creditNotesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, creditNotesController.transition);
}
