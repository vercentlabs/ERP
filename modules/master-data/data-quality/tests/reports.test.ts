import { describe, expect, it } from "vitest";
import { manifest } from "../manifest";

describe("master-data/data-quality reports", () => {
  it("is tenant-scoped and has a route base", () => {
    expect(manifest.tenantScoped).toBe(true);
    expect(manifest.routeBase).toContain("/api/");
  });
});
