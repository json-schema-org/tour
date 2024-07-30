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
