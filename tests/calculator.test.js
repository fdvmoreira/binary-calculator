/**
 * @jest-environment jsdom
 */

import { describe, expect, jest, test } from "@jest/globals";

import {
  calculate,
  DivisionByZeroError,
  OperatorType,
} from "./../js/binary-calculator";

/**
 * Calculate function
 * @group Calculate
 */
describe("calculate function", () => {
  /**
   * @test {Calculate}
   */
  test("shoulda dd 1 plus 1", () => {
    expect(calculate(1, 1, OperatorType.Addition))
      .toEqual(2);
  });

  /**
   * @test {Calculate}
   */
  test("should add negative to positive number", () => {
    expect(calculate(-4, 3, OperatorType.Addition))
      .toEqual(-1);
  });

  /**
   * @test {Calculate}
   */
  test("should add zeros", () => {
    expect(calculate(0, 0, OperatorType.Addition))
      .toBe(0);
  });

  /**
   * @test {Calculate}
   */
  test("should subtract 1 from minus 7", () => {
    expect(calculate(-7, 1, OperatorType.Subtraction))
      .toBe(-8);
  });

  /**
   * @test {Calculate}
   */
  test("should divide 9 by 3", () => {
    expect(calculate(9, 3, OperatorType.Division)).toEqual(3);
  });

  /**
   * @test {Calculate}
   */
  test("should throw DivisionByZeroException exception", () => {
    expect(() => calculate(8, 0, OperatorType.Division)).toThrow();
    expect(() => calculate(8, 0, OperatorType.Division)).toThrowError(
      DivisionByZeroError,
    );
  });

  /**
   * @test {Calculate}
   */
  test("should multiply zero by any number", () => {
    expect(calculate(0, 0, OperatorType.Multiplication)).toEqual(0);
    expect(calculate(0, 6, OperatorType.Multiplication)).toEqual(0);
    expect(calculate(0, 3, OperatorType.Multiplication)).toEqual(0);
    expect(calculate(0, 9, OperatorType.Multiplication)).toEqual(0);
    expect(calculate(0, -2, OperatorType.Multiplication)).toEqual(-0);
    expect(calculate(0, 65, OperatorType.Multiplication)).toEqual(0);
  });

  /**
   * @test {Calculate}
   */
  test("should multiple negative numbers", () => {
    expect(calculate(-9, -9, OperatorType.Multiplication)).toEqual(
      81,
    );
    expect(calculate(-3, -3, OperatorType.Multiplication)).toEqual(9);
    expect(calculate(-3, -2, OperatorType.Multiplication)).toEqual(6);
    expect(calculate(-1, -1, OperatorType.Multiplication)).toEqual(1);
    expect(calculate(-5, -5, OperatorType.Multiplication)).toEqual(25);
  });

  /**
   * @test {Calculate}
   */
  test("should turn any number into negative", () => {
    expect(calculate(-9, -9, OperatorType.Multiplication)).toEqual(
      81,
    );
    expect(calculate(-3, 3, OperatorType.Multiplication)).toEqual(-9);
    expect(calculate(3, -2, OperatorType.Multiplication)).toEqual(-6);
    expect(calculate(1, -1, OperatorType.Multiplication)).toEqual(-1);
    expect(calculate(5, -5, OperatorType.Multiplication)).toEqual(-25);
  });
});
