interface ValidationResult {
  code: string;
  testCaseResults: any[];
  totalTestCases: number;
  validationStatus: "valid" | "invalid" | "neutral";
  timestamp: number;
  chapterIndex: number;
  stepIndex: number;
}

export function saveValidationResult(
  chapterIndex: number, 
  stepIndex: number, 
  code: string, 
  testCaseResults: any[], 
  totalTestCases: number, 
  validationStatus: "valid" | "invalid" | "neutral"
): boolean {
  if (typeof window === "undefined") return false;
  
  const key = `validation-${chapterIndex}-${stepIndex}`;
  const validationData: ValidationResult = {
    code,
    testCaseResults,
    totalTestCases,
    validationStatus,
    timestamp: Date.now(),
    chapterIndex,
    stepIndex
  };
  
  try {
    localStorage.setItem(key, JSON.stringify(validationData));
    return true;
  } catch (error) {
    console.warn('Failed to save validation result:', error);
    return false;
  }
}

export function getValidationResult(chapterIndex: number, stepIndex: number): ValidationResult | null {
  if (typeof window === "undefined") return null;
  
  const key = `validation-${chapterIndex}-${stepIndex}`;
  const stored = localStorage.getItem(key);
  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse validation result:', error);
      return null;
    }
  }
  return null;
}

export function hasValidationResult(chapterIndex: number, stepIndex: number): boolean {
  if (typeof window === "undefined") return false;
  
  const key = `validation-${chapterIndex}-${stepIndex}`;
  return localStorage.getItem(key) !== null;
}

export function clearValidationResult(chapterIndex: number, stepIndex: number): boolean {
  if (typeof window === "undefined") return false;
  
  const key = `validation-${chapterIndex}-${stepIndex}`;
  localStorage.removeItem(key);
  return true;
}

export function setCheckpoint(path: string) {
  if (typeof window === "undefined") return false;
  const checkpoint = path;

  localStorage.setItem("checkPoint", JSON.stringify(checkpoint));
}

export function getCheckPoint() {
  if (typeof window === "undefined") return false;

  const checkpoint = localStorage.getItem("checkPoint");

  if (checkpoint) {
    return JSON.parse(checkpoint);
  }
  return null;
}
