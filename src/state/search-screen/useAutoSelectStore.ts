import { create } from 'zustand';



type SelectionStore = {
  selectedModels: string[];
  addSelectedModel: (item: string) => void;
};


export const useAutoSelectStore = create<SelectionStore>((set) => ({
  selectedModels: [],
  addSelectedModel: (selectedModel) => set((state) => {
    const isSelected = state.selectedModels.includes(selectedModel);
    return {
      selectedModels: isSelected
        ? state.selectedModels.filter((i) => i !== selectedModel)
        : [...state.selectedModels, selectedModel],
    };
  }),
}));
