/**
 * @jest-environment jsdom
 */

import fs from "fs";
import path from "path";
import { JSDOM } from "jsdom";
import { beforeAll, describe, expect, test } from "@jest/globals";
import { getDisplayText } from "../js/binary-calculator";

const html = fs.readFileSync(path.resolve("./index.html"), "utf8");
const dom = new JSDOM(html);

//extract html elements
const display = dom.window.document.querySelector("[data-id='display']");

beforeAll(() => {
  display.textContent = "helloTestOneTwo";
});
/**
 * @group readText
 */
describe("getDisplayText", () => {
  /**
   * @test {readText}
   */
  test("should read the text from display", () => {
    expect(getDisplayText(display)).toBe("helloTestOneTwo");
  });
});
