import { describe, expect, it } from 'vitest';
import { examples } from '../pages/visualcode/examples';
import { traceCode } from '../pages/visualcode/interpreter';

describe('VisualCode examples execution', () => {
  it('includes at least 30 Java, 30 .NET, and 30 PHP examples', () => {
    const javaCount = examples.filter(e => e.language === 'java').length;
    const dotnetCount = examples.filter(e => e.language === 'dotnet').length;
    const phpCount = examples.filter(e => e.language === 'php').length;

    expect(javaCount).toBeGreaterThanOrEqual(30);
    expect(dotnetCount).toBeGreaterThanOrEqual(30);
    expect(phpCount).toBeGreaterThanOrEqual(30);
  });

  it('runs all examples without interpreter error steps', () => {
    for (const ex of examples) {
      const steps = traceCode(ex.code, ex.language);
      expect(steps.length, `${ex.language}:${ex.name} produced no steps`).toBeGreaterThan(0);

      const errorStep = steps.find(s => s.explanation.startsWith('Error:'));
      expect(errorStep, `${ex.language}:${ex.name} has error step`).toBeUndefined();

      const lines = ex.code.split('\n').length;
      for (const s of steps) {
        expect(s.line, `${ex.language}:${ex.name} has invalid line index`).toBeGreaterThanOrEqual(0);
        expect(s.line, `${ex.language}:${ex.name} has line out of range`).toBeLessThan(lines);
        expect(typeof s.explanation).toBe('string');
        expect(Array.isArray(s.output)).toBe(true);
        expect(typeof s.variables).toBe('object');
        expect(Array.isArray(s.callStack)).toBe(true);
      }
    }
  });

  it('runs newly added Python class examples with class instance state', () => {
    const oopPython = examples.filter(
      e => e.language === 'python' && e.name.startsWith('Class ')
    );

    expect(oopPython.length).toBeGreaterThan(0);

    for (const ex of oopPython) {
      const steps = traceCode(ex.code, ex.language);
      const hasMethodCall = steps.some(s => s.type === 'function_call');
      expect(hasMethodCall, `${ex.name} did not trace method calls`).toBe(true);

      const hasClassInstance = steps.some(s =>
        Object.values(s.variables).some(v =>
          v && typeof v === 'object' && !Array.isArray(v) && '__class' in (v as Record<string, unknown>)
        )
      );
      expect(hasClassInstance, `${ex.name} did not expose class instance state`).toBe(true);
    }
  });

  it('runs newly added JavaScript class examples with constructor/method tracing', () => {
    const oopJs = examples.filter(
      e => e.language === 'javascript' && e.name.startsWith('Class ')
    );

    expect(oopJs.length).toBeGreaterThan(0);

    for (const ex of oopJs) {
      const steps = traceCode(ex.code, ex.language);
      const hasMethodCall = steps.some(s => s.type === 'function_call');
      expect(hasMethodCall, `${ex.name} did not trace constructor/method calls`).toBe(true);

      const hasClassInstance = steps.some(s =>
        Object.values(s.variables).some(v =>
          v && typeof v === 'object' && !Array.isArray(v) && '__class' in (v as Record<string, unknown>)
        )
      );
      expect(hasClassInstance, `${ex.name} did not expose class instance state`).toBe(true);
    }
  });

  it('runs Java and .NET class examples with constructor/method tracing', () => {
    const oopJava = examples.filter(e => e.language === 'java' && e.name.includes('Class'));
    const oopDotnet = examples.filter(e => e.language === 'dotnet' && e.name.includes('Class'));

    expect(oopJava.length).toBeGreaterThan(0);
    expect(oopDotnet.length).toBeGreaterThan(0);

    for (const ex of [...oopJava, ...oopDotnet]) {
      const steps = traceCode(ex.code, ex.language);
      const hasMethodCall = steps.some(s => s.type === 'function_call');
      expect(hasMethodCall, `${ex.name} did not trace constructor/method calls`).toBe(true);

      const hasClassInstance = steps.some(s =>
        Object.values(s.variables).some(v =>
          v && typeof v === 'object' && !Array.isArray(v) && '__class' in (v as Record<string, unknown>)
        )
      );
      expect(hasClassInstance, `${ex.name} did not expose class instance state`).toBe(true);
    }
  });

  it('produces correct bubble-sort outputs for Python and JavaScript examples', () => {
    const pyBubble = examples.find(e => e.language === 'python' && e.name === 'Bubble Sort');
    const jsBubble = examples.find(e => e.language === 'javascript' && e.name === 'Bubble Sort');

    expect(pyBubble).toBeDefined();
    expect(jsBubble).toBeDefined();

    const pySteps = traceCode(pyBubble!.code, pyBubble!.language);
    const jsSteps = traceCode(jsBubble!.code, jsBubble!.language);

    const pyOut = pySteps[pySteps.length - 1]?.output?.at(-1);
    const jsOut = jsSteps[jsSteps.length - 1]?.output?.at(-1);

    expect(pyOut).toBe('[1,2,3,5,8]');
    expect(jsOut).toBe('[1,2,3,5,8]');
  });

  it('produces expected outputs for key C while-loop examples', () => {
    const cReverse = examples.find(e => e.language === 'c' && e.name === 'Reverse Number');
    const cDigits = examples.find(e => e.language === 'c' && e.name === 'Count Digits');

    expect(cReverse).toBeDefined();
    expect(cDigits).toBeDefined();

    const reverseSteps = traceCode(cReverse!.code, cReverse!.language);
    const digitsSteps = traceCode(cDigits!.code, cDigits!.language);

    const reverseOut = reverseSteps[reverseSteps.length - 1]?.output?.at(-1);
    const digitsOut = digitsSteps[digitsSteps.length - 1]?.output?.at(-1);

    expect(reverseOut).toBe('54321');
    expect(digitsOut).toBe('5');
  });

  it('executes custom Java main-wrapper code', () => {
    const javaCode = `class Program {
    static void Main(string[] args) {
        int a = 2;
        int b = 9;
        System.out.println(a + b);
    }
}`;

    const steps = traceCode(javaCode, 'java');
    const out = steps[steps.length - 1]?.output?.at(-1);
    expect(out).toBe('11');
  });

  it('executes custom .NET main-wrapper code', () => {
    const dotnetCode = `class Program {
    static void Main(string[] args) {
        int x = 4;
        int y = 5;
        Console.WriteLine(x * y);
    }
}`;

    const steps = traceCode(dotnetCode, 'dotnet');
    const out = steps[steps.length - 1]?.output?.at(-1);
    expect(out).toBe('20');
  });

  it('does not execute else branch when PHP if condition is true', () => {
    const phpCode = `<?php
$n = 8;
if ($n > 0) {
    if ($n % 2 == 0) {
        $tag = 2;
    } else {
        $tag = 1;
    }
}
echo($tag);`;

    const steps = traceCode(phpCode, 'php');
    const out = steps[steps.length - 1]?.output?.at(-1);
    expect(out).toBe('2');
  });

  it('does not execute else branch when JavaScript if condition is true', () => {
    const jsCode = `let n = 8
let tag = 0
if (n > 0) {
  if (n % 2 === 0) {
    tag = 2
  } else {
    tag = 1
  }
}
console.log(tag)`;

    const steps = traceCode(jsCode, 'javascript');
    const out = steps[steps.length - 1]?.output?.at(-1);
    expect(out).toBe('2');
  });

  it('executes else branch when nested PHP if condition is false', () => {
    const phpCode = `<?php
$n = 7;
if ($n > 0) {
    if ($n % 2 == 0) {
        $tag = 2;
    } else {
        $tag = 1;
    }
}
echo($tag);`;

    const steps = traceCode(phpCode, 'php');
    const out = steps[steps.length - 1]?.output?.at(-1);
    expect(out).toBe('1');
  });

  it('executes else branch when nested JavaScript if condition is false', () => {
    const jsCode = `let n = 7
let tag = 0
if (n > 0) {
  if (n % 2 === 0) {
    tag = 2
  } else {
    tag = 1
  }
}
console.log(tag)`;

    const steps = traceCode(jsCode, 'javascript');
    const out = steps[steps.length - 1]?.output?.at(-1);
    expect(out).toBe('1');
  });
});
