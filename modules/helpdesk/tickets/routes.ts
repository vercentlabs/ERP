import type { Router } from "express";
import { ticketsController } from "./controller";
import { manifest } from "./manifest";

export function registerTicketsRoutes(router: Router) {
  router.get(manifest.routeBase, ticketsController.list);
  router.post(manifest.routeBase, ticketsController.create);
  router.patch(`${manifest.routeBase}/:id`, ticketsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, ticketsController.transition);
}
