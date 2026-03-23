import { describe, expect, it } from 'vitest';
import { examples } from '../pages/visualcode/examples';
import { traceCode } from '../pages/visualcode/interpreter';

describe('VisualCode examples execution', () => {
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
});
