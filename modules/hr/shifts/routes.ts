import type { Router } from "express";
import { shiftsController } from "./controller";
import { manifest } from "./manifest";

export function registerShiftsRoutes(router: Router) {
  router.get(manifest.routeBase, shiftsController.list);
  router.post(manifest.routeBase, shiftsController.create);
  router.patch(`${manifest.routeBase}/:id`, shiftsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, shiftsController.transition);
}
