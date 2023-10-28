/**
 * @jest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import { describe, expect, jest, test } from "@jest/globals";
import {
  addOperatorToDisplay,
  addTextToDisplay,
  cleanUpDisplay,
  getDisplayText,
  getLastCharFromString,
  InvalidOperandError,
  InvalidOperatorError,
  OperatorType,
} from "./../js/binary-calculator";

const html = fs.readFileSync(path.resolve("./index.html"), "utf8");
const dom = new JSDOM(html);

const display = dom.window.document.querySelector("[data-id='display']");

/**
 * Write Text to Display
 * @group writeToDisplay
 */
describe("addOperatorToDisplay", () => {
  /**
   * @test {writeToDisplay}
   */
  test("should throw InvalidOperatorError", () => {
    const opMap = {
      "+": OperatorType.Addition,
      "-": OperatorType.Subtraction,
      "*": OperatorType.Multiplication,
      "/": OperatorType.Division,
    };

    for (const operator in opMap) {
      addTextToDisplay(display, "1001" + operator);
      expect(() => addOperatorToDisplay(display, opMap[operator])).toThrowError(
        InvalidOperatorError,
      );
    }
  });

  /**
   * @test {writeToDisplay}
   */
  test("should throw InvalidOperandError", () => {
    const opMap = {
      "+": OperatorType.Addition,
      "-": OperatorType.Subtraction,
      "*": OperatorType.Multiplication,
      "/": OperatorType.Division,
    };
    cleanUpDisplay(display);
    for (const operator in opMap) {
      expect(() => addOperatorToDisplay(display, opMap[operator])).toThrowError(
        InvalidOperandError,
      );
    }
  });

  /**
   * @test {writeToDisplay}
   */
  test("should add operator to display", () => {
    const opMap = {
      "+": OperatorType.Addition,
      "-": OperatorType.Subtraction,
      "*": OperatorType.Multiplication,
      "/": OperatorType.Division,
    };

    for (const operator in opMap) {
      addTextToDisplay(display, "10001");
      addOperatorToDisplay(display, operator);
      expect(getLastCharFromString(getDisplayText(display))).toEqual(operator);
    }
  });
});

/**
 * @group writeToDisplay
 */
describe("addTextToDisplay", () => {
  /**
   * @test {addTextToDisplay}
   */
  test("should add text to the display", () => {
    const helloWorld = "hello world!";
    addTextToDisplay(display, helloWorld);
    const text = getDisplayText(display);
    expect(text).toBe(helloWorld);
  });
});

/**
 * @group writeToDisplay
 */
describe("cleanUpDisplay", () => {
  /**
   * @test {addTextToDisplay}
   */
  test("should clean the display", () => {
    addTextToDisplay(display, "heloo");
    cleanUpDisplay(display);
    const text = getDisplayText(display);
    expect(text).toBe("");
  });
});
