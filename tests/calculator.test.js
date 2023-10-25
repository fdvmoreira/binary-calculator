/**
 * @jest-environment jsdom
 */

const calc = require("./../js/binary-calculator.js");

/**
 * Calculate function
 * @group Calculate
 */
describe("calculate function", () => {
  /**
   * @test {Calculate}
   */
  test("shoulda dd 1 plus 1", () => {
    expect(calc.calculate(1, 1, calc.OperatorType.Addition))
      .toEqual(2);
  });

  /**
   * @test {Calculate}
   */
  test("should add negative to positive number", () => {
    expect(calc.calculate(-4, 3, calc.OperatorType.Addition))
      .toEqual(-1);
  });

  /**
   * @test {Calculate}
   */
  test("should add zeros", () => {
    expect(calc.calculate(0, 0, calc.OperatorType.Addition))
      .toBe(0);
  });

  /**
   * @test {Calculate}
   */
  test("should subtract 1 from minus 7", () => {
    expect(calc.calculate(-7, 1, calc.OperatorType.Subtraction))
      .toBe(-8);
  });

  /**
   * @test {Calculate}
   */
  test("should divide 9 by 3", () => {
    expect(calc.calculate(9, 3, calc.OperatorType.Division)).toEqual(3);
  });

  /**
   * @test {Calculate}
   */
  test("should throw DivisionByZeroException exception", () => {
    expect(() => calc.calculate(8, 0, calc.OperatorType.Division)).toThrow();
    expect(() => calc.calculate(8, 0, calc.OperatorType.Division)).toThrowError(
      calc.DivisionByZeroError,
    );
  });

  /**
   * @test {Calculate}
   */
  test("should multiply zero by any number", () => {
    expect(calc.calculate(0, 0, calc.OperatorType.Multiplication)).toEqual(0);
    expect(calc.calculate(0, 6, calc.OperatorType.Multiplication)).toEqual(0);
    expect(calc.calculate(0, 3, calc.OperatorType.Multiplication)).toEqual(0);
    expect(calc.calculate(0, 9, calc.OperatorType.Multiplication)).toEqual(0);
    expect(calc.calculate(0, -2, calc.OperatorType.Multiplication)).toEqual(-0);
    expect(calc.calculate(0, 65, calc.OperatorType.Multiplication)).toEqual(0);
  });

  /**
   * @test {Calculate}
   */
  test("should multiple negative numbers", () => {
    expect(calc.calculate(-9, -9, calc.OperatorType.Multiplication)).toEqual(
      81,
    );
    expect(calc.calculate(-3, -3, calc.OperatorType.Multiplication)).toEqual(9);
    expect(calc.calculate(-3, -2, calc.OperatorType.Multiplication)).toEqual(6);
    expect(calc.calculate(-1, -1, calc.OperatorType.Multiplication)).toEqual(1);
    expect(calc.calculate(-5, -5, calc.OperatorType.Multiplication)).toEqual(
      25,
    );
  });

  /**
   * @test {Calculate}
   */
  test("should turn any number into negative", () => {
    expect(calc.calculate(-9, -9, calc.OperatorType.Multiplication)).toEqual(
      81,
    );
    expect(calc.calculate(-3, 3, calc.OperatorType.Multiplication)).toEqual(-9);
    expect(calc.calculate(3, -2, calc.OperatorType.Multiplication)).toEqual(-6);
    expect(calc.calculate(1, -1, calc.OperatorType.Multiplication)).toEqual(-1);
    expect(calc.calculate(5, -5, calc.OperatorType.Multiplication)).toEqual(
      -25,
    );
  });
});
