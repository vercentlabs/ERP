import type { Router } from "express";
import { equipmentController } from "./controller";
import { manifest } from "./manifest";

export function registerEquipmentRoutes(router: Router) {
  router.get(manifest.routeBase, equipmentController.list);
  router.post(manifest.routeBase, equipmentController.create);
  router.patch(`${manifest.routeBase}/:id`, equipmentController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, equipmentController.transition);
}
