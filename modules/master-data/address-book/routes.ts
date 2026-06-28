import type { Router } from "express";
import { addressBookController } from "./controller";
import { manifest } from "./manifest";

export function registerAddressBookRoutes(router: Router) {
  router.get(manifest.routeBase, addressBookController.list);
  router.post(manifest.routeBase, addressBookController.create);
  router.patch(`${manifest.routeBase}/:id`, addressBookController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, addressBookController.transition);
}
