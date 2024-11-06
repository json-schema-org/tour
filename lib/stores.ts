import { create } from "zustand";

type Store = {
  editor: any;
  monaco: any;
  setEditor: (editor: any) => void;
  setMonaco: (monaco: any) => void;
};

export const useEditorStore = create<Store>()((set) => ({
  editor: null,
  monaco: null,
  setEditor: (editor) => set({ editor }),
  setMonaco: (monaco) => set({ monaco }),
}));

type CodeData = {
  [key: string]: string | null;
};

type CodeStore = {
  codeData: CodeData;
  persistCode: (chapter: number, lesson: number, code: string) => void;
  getCode: (chapter: number, lesson: number) => string | null;
  clearAllCode: () => void;
};

export const useCodeStore = create<CodeStore>()((set, get) => ({
  codeData:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("codeData") ?? "{}")
      : {},

  persistCode: (chapter: number, lesson: number, code: string) => {
    const key = `${chapter}.${lesson}`;
    set((state) => {
      const newCodeData = { ...state.codeData, [key]: code };
      localStorage.setItem("codeData", JSON.stringify(newCodeData));
      return { codeData: newCodeData };
    });
  },

  getCode: (chapter: number, lesson: number) => {
    const key = `${chapter}.${lesson}`;
    return get().codeData[key] ?? null;
  },

  clearAllCode: () => {
    localStorage.removeItem("codeData");
    set({ codeData: {} });
  },
}));
