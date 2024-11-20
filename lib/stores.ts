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

type UserSolutionsByLesson = {
  [key: string]: string | null;
};

type UserSolutionStore = {
  userSolutionsByLesson: UserSolutionsByLesson;
  saveUserSolutionForLesson: (
    chapter: number,
    lesson: number,
    code: string,
  ) => void;
  getSavedUserSolutionByLesson: (
    chapter: number,
    lesson: number,
  ) => string | null;
  clearAllCode: () => void;
};

export const useUserSolutionStore = create<UserSolutionStore>()((set, get) => ({
  userSolutionsByLesson:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("codeData") ?? "{}")
      : {},

  saveUserSolutionForLesson: (
    chapter: number,
    lesson: number,
    code: string,
  ) => {
    const key = `${chapter}.${lesson}`;
    set((state) => {
      const NewUserSolutionsByLesson = {
        ...state.userSolutionsByLesson,
        [key]: code,
      };
      localStorage.setItem(
        "codeData",
        JSON.stringify(NewUserSolutionsByLesson),
      );
      return { userSolutionsByLesson: NewUserSolutionsByLesson };
    });
  },

  getSavedUserSolutionByLesson: (chapter: number, lesson: number) => {
    const key = `${chapter}.${lesson}`;
    return get().userSolutionsByLesson[key] ?? null;
  },

  clearAllCode: () => {
    localStorage.removeItem("codeData");
    set({ userSolutionsByLesson: {} });
  },
}));
