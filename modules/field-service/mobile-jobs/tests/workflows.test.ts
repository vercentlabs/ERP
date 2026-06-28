import { describe, expect, it } from "vitest";
import { manifest } from "../manifest";

describe("field-service/mobile-jobs workflows", () => {
  it("is tenant-scoped and has a route base", () => {
    expect(manifest.tenantScoped).toBe(true);
    expect(manifest.routeBase).toContain("/api/");
  });
});
