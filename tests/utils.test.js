/**
 * @jest-environment jsdom
 */

import { describe, expect, test } from "@jest/globals";
import { getLastCharFromString, isOperandValid } from "../js/binary-calculator";

/**
 * Utility functions
 * @group Utils
 */
describe("isOperandValid", () => {
  /**
   * @test {Utils}
   */
  test("should NOT validate the operand", () => {
    expect(isOperandValid("hello")).toBeFalsy();
    expect(isOperandValid("3212")).toBeFalsy();
    expect(isOperandValid("")).toBeFalsy();
    expect(isOperandValid("hell999")).toBeFalsy();
  });

  /**
   * @test {Utils}
   */
  test("should validate the operand", () => {
    expect(isOperandValid("101hello")).toBeTruthy();
    expect(isOperandValid("10110")).toBeTruthy();
    expect(isOperandValid("11001")).toBeTruthy();
    expect(isOperandValid(" 11011 1")).toBeTruthy();
  });
});

/**
 * @group readText
 */
describe("getLastCharacterFromString", () => {
  /**
   * @test {readText}
   */
  test("should get the last character from a string", () => {
    expect(getLastCharFromString("abc")).toMatch(/^c$/);
    expect(getLastCharFromString(" hakunamatata ")).toMatch(/^a$/);
    expect(getLastCharFromString("abc... ")).toMatch(/^\.$/);
    expect(getLastCharFromString("hello ")).toMatch(/^o$/);
  });

  /**
   * @test {readText}
   */
  test("should return empty string", () => {
    expect(getLastCharFromString("")).toHaveLength(0);
    expect(getLastCharFromString("")).toEqual("");
    expect(getLastCharFromString("   ")).toEqual("");
  });
});
