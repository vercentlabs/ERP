import type { Router } from "express";
import { shipmentsController } from "./controller";
import { manifest } from "./manifest";

export function registerShipmentsRoutes(router: Router) {
  router.get(manifest.routeBase, shipmentsController.list);
  router.post(manifest.routeBase, shipmentsController.create);
  router.patch(`${manifest.routeBase}/:id`, shipmentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, shipmentsController.transition);
}
