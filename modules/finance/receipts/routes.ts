import type { Router } from "express";
import { receiptsController } from "./controller";
import { manifest } from "./manifest";

export function registerReceiptsRoutes(router: Router) {
  router.get(manifest.routeBase, receiptsController.list);
  router.post(manifest.routeBase, receiptsController.create);
  router.patch(`${manifest.routeBase}/:id`, receiptsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, receiptsController.transition);
}
