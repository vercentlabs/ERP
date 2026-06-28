import type { Router } from "express";
import { sparePartsController } from "./controller";
import { manifest } from "./manifest";

export function registerSparePartsRoutes(router: Router) {
  router.get(manifest.routeBase, sparePartsController.list);
  router.post(manifest.routeBase, sparePartsController.create);
  router.patch(`${manifest.routeBase}/:id`, sparePartsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, sparePartsController.transition);
}
