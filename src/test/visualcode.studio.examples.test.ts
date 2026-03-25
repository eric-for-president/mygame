import { describe, expect, it } from "vitest";
import { traceCode, type Language } from "../pages/visualcode/interpreter";
import {
  ALL_CATEGORY,
  STUDIO_EXAMPLES_PER_LANGUAGE,
  studioCategoriesByLanguage,
  studioExamplesByLanguage,
} from "../pages/visualcode/studioExamples";

const languages: Language[] = ["python", "c", "javascript", "java", "dotnet", "php"];

const hasVariableHistory = (codeSteps: ReturnType<typeof traceCode>): boolean => {
  const previousByName: Record<string, string> = {};

  for (const step of codeSteps) {
    for (const [name, value] of Object.entries(step.variables)) {
      const serialized = JSON.stringify(value);
      if (previousByName[name] !== serialized) {
        return true;
      }
      previousByName[name] = serialized;
    }
  }

  return false;
};

describe("VisualCode Studio examples", () => {
  it("exposes 30 examples for each language category", () => {
    for (const language of languages) {
      expect(studioExamplesByLanguage[language].length).toBe(STUDIO_EXAMPLES_PER_LANGUAGE);
    }
  });

  it("adds category tags for filtering in each language", () => {
    for (const language of languages) {
      const categories = studioCategoriesByLanguage[language];
      expect(categories.length, `${language} has no categories`).toBeGreaterThan(0);
      expect(categories.includes(ALL_CATEGORY), `${language} should not include synthetic all category`).toBe(false);

      for (const example of studioExamplesByLanguage[language]) {
        expect(example.categories.length, `${language}:${example.name} missing categories`).toBeGreaterThan(0);
      }
    }
  });

  it("ensures all studio examples are traceable with statement and variable history", () => {
    for (const language of languages) {
      for (const example of studioExamplesByLanguage[language]) {
        const steps = traceCode(example.code, language);
        expect(steps.length, `${language}:${example.name} produced no steps`).toBeGreaterThan(0);

        const errorStep = steps.find(step => step.explanation.startsWith("Error:"));
        expect(errorStep, `${language}:${example.name} has interpreter error`).toBeUndefined();

        expect(
          hasVariableHistory(steps),
          `${language}:${example.name} has no variable history`,
        ).toBe(true);
      }
    }
  });
});
