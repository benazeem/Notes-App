const STORAGE_KEY = 'my-notes-app';

export const saveNotesToLocalStorage = (notes: any) => {
  try {
    const serialized = JSON.stringify(notes);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error("Could not save notes to localStorage:", error);
  }
};

export const loadNotesFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (error) {
    console.error("Could not load notes from localStorage:", error);
    return undefined;
  }
};
