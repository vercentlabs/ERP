import type { Router } from "express";
import { receivingController } from "./controller";
import { manifest } from "./manifest";

export function registerReceivingRoutes(router: Router) {
  router.get(manifest.routeBase, receivingController.list);
  router.post(manifest.routeBase, receivingController.create);
  router.patch(`${manifest.routeBase}/:id`, receivingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, receivingController.transition);
}
