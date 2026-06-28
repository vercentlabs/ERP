import type { Router } from "express";
import { cdcController } from "./controller";
import { manifest } from "./manifest";

export function registerCdcRoutes(router: Router) {
  router.get(manifest.routeBase, cdcController.list);
  router.post(manifest.routeBase, cdcController.create);
  router.patch(`${manifest.routeBase}/:id`, cdcController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, cdcController.transition);
}
