import { examples, type CodeExample } from "./examples";
import { traceCode, type ExecutionStep, type Language } from "./interpreter";

export const STUDIO_EXAMPLES_PER_LANGUAGE = 30;
export const ALL_CATEGORY = "all";

export interface StudioCodeExample extends CodeExample {
  categories: string[];
  primaryCategory: string;
}

const LANGUAGES: Language[] = ["python", "c", "javascript", "java", "dotnet"];

const CATEGORY_RULES: Array<{ key: string; tokens: string[] }> = [
  { key: "basics", tokens: ["variable", "type", "basic", "print", "hello"] },
  { key: "conditionals", tokens: ["if", "elif", "else", "condition", "branch", "ternary"] },
  { key: "loops", tokens: ["loop", "while", "for", "iterate", "range", "count"] },
  { key: "arrays-lists", tokens: ["array", "list", "vector", "index", "matrix", "grid"] },
  { key: "functions", tokens: ["function", "method", "parameter", "return", "call"] },
  { key: "recursion", tokens: ["recursion", "recursive", "factorial", "fibonacci"] },
  { key: "sorting", tokens: ["sort", "bubble", "selection", "insertion", "quick", "merge"] },
  { key: "searching", tokens: ["search", "linear", "binary", "find"] },
  { key: "math", tokens: ["sum", "average", "power", "gcd", "prime", "mod", "math"] },
  { key: "strings", tokens: ["string", "char", "substring", "palindrome", "reverse"] },
  { key: "oop", tokens: ["class", "object", "constructor", "inheritance", "encapsulation"] },
  { key: "algorithms", tokens: ["algorithm", "dp", "greedy", "two pointer", "stack", "queue"] },
];

const inferCategories = (example: CodeExample): string[] => {
  const blob = `${example.name} ${example.description} ${example.code}`.toLowerCase();
  const out: string[] = [];

  for (const rule of CATEGORY_RULES) {
    if (rule.tokens.some(token => blob.includes(token))) {
      out.push(rule.key);
    }
  }

  if (out.length === 0) {
    out.push("basics");
  }

  return Array.from(new Set(out));
};

const toStudioExample = (example: CodeExample): StudioCodeExample => {
  const categories = inferCategories(example);
  return {
    ...example,
    categories,
    primaryCategory: categories[0],
  };
};

const hasInterpreterError = (steps: ExecutionStep[]): boolean =>
  steps.some(step => step.explanation.startsWith("Error:"));

const hasVariableHistory = (steps: ExecutionStep[]): boolean => {
  const previousByName: Record<string, string> = {};

  for (const step of steps) {
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

const isStudioReadyExample = (example: CodeExample): boolean => {
  try {
    const steps = traceCode(example.code, example.language);
    if (steps.length === 0 || hasInterpreterError(steps)) {
      return false;
    }

    return hasVariableHistory(steps);
  } catch {
    return false;
  }
};

const selectStudioExamplesForLanguage = (language: Language): StudioCodeExample[] => {
  const byLanguage = examples
    .filter(example => example.language === language)
    .map(toStudioExample);
  const ready = byLanguage.filter(isStudioReadyExample).slice(0, STUDIO_EXAMPLES_PER_LANGUAGE);

  if (ready.length >= STUDIO_EXAMPLES_PER_LANGUAGE) {
    return ready;
  }

  const selected = [...ready];
  for (const example of byLanguage) {
    if (selected.length >= STUDIO_EXAMPLES_PER_LANGUAGE) {
      break;
    }
    if (!selected.some(existing => existing.name === example.name)) {
      selected.push(example);
    }
  }

  return selected;
};

export const studioExamplesByLanguage: Record<Language, StudioCodeExample[]> =
  LANGUAGES.reduce<Record<Language, StudioCodeExample[]>>((acc, language) => {
    acc[language] = selectStudioExamplesForLanguage(language);
    return acc;
  }, {
    python: [],
    c: [],
    javascript: [],
    java: [],
    dotnet: [],
  });

export const studioCategoriesByLanguage: Record<Language, string[]> =
  LANGUAGES.reduce<Record<Language, string[]>>((acc, language) => {
    const set = new Set<string>();
    for (const example of studioExamplesByLanguage[language]) {
      for (const category of example.categories) {
        set.add(category);
      }
    }
    acc[language] = Array.from(set).sort((a, b) => a.localeCompare(b));
    return acc;
  }, {
    python: [],
    c: [],
    javascript: [],
    java: [],
    dotnet: [],
  });
