import { describe, expect, it } from "vitest";
import { greet } from "./index.js";

describe("greet", () => {
  it("should return greeting with name", () => {
    expect(greet("John")).toBe("Hello, John!");
  });
});
