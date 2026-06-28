import type { Router } from "express";
import { shipmentTrackingController } from "./controller";
import { manifest } from "./manifest";

export function registerShipmentTrackingRoutes(router: Router) {
  router.get(manifest.routeBase, shipmentTrackingController.list);
  router.post(manifest.routeBase, shipmentTrackingController.create);
  router.patch(`${manifest.routeBase}/:id`, shipmentTrackingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, shipmentTrackingController.transition);
}
