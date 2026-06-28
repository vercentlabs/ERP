import type { Router } from "express";
import { biConnectorsController } from "./controller";
import { manifest } from "./manifest";

export function registerBiConnectorsRoutes(router: Router) {
  router.get(manifest.routeBase, biConnectorsController.list);
  router.post(manifest.routeBase, biConnectorsController.create);
  router.patch(`${manifest.routeBase}/:id`, biConnectorsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, biConnectorsController.transition);
}
