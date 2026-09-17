import { describe, expect, test } from "bun:test";
import { numeronym, parts, wordFromPath } from "./n7m";

describe("numeronym", () => {
  test("known numeronyms", () => {
    expect(numeronym("kubernetes")).toBe("k8s");
    expect(numeronym("internationalization")).toBe("i18n");
    expect(numeronym("localization")).toBe("l10n");
    expect(numeronym("numeronym")).toBe("n7m");
  });

  test("empty input returns empty", () => {
    expect(numeronym("")).toBe("");
  });

  test("short words are returned unchanged", () => {
    // Nothing to abbreviate: "a" must not become "a0a", "ab" must not become "a0b".
    expect(numeronym("a")).toBe("a");
    expect(numeronym("ab")).toBe("ab");
    expect(numeronym("abc")).toBe("a1c");
  });

  test("surrounding whitespace is ignored", () => {
    expect(numeronym("  kubernetes\r")).toBe("k8s");
  });
});

describe("parts", () => {
  test("splits into first, middle, last", () => {
    expect(parts("kubernetes")).toEqual(["k", "ubernete", "s"]);
    expect(parts("abc")).toEqual(["a", "b", "c"]);
  });

  test("short words have no middle", () => {
    expect(parts("ab")).toEqual(["ab", "", ""]);
    expect(parts("")).toEqual(["", "", ""]);
  });

  test("surrounding whitespace is ignored", () => {
    expect(parts("  kubernetes\n")).toEqual(["k", "ubernete", "s"]);
  });
});

describe("wordFromPath", () => {
  test("root path has no word", () => {
    expect(wordFromPath("/")).toBe("");
    expect(wordFromPath("")).toBe("");
  });

  test("single segment is the word", () => {
    expect(wordFromPath("/kubernetes")).toBe("kubernetes");
  });

  test("trailing slash is ignored", () => {
    expect(wordFromPath("/kubernetes/")).toBe("kubernetes");
  });

  test("percent encoding is decoded", () => {
    expect(wordFromPath("/%C3%BCber")).toBe("über");
  });

  test("malformed percent encoding is kept as typed", () => {
    expect(wordFromPath("/100%")).toBe("100%");
  });
});
