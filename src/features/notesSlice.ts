import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { loadNotesFromLocalStorage,saveNotesToLocalStorage } from '../utils/localStorageUtils'; // adjust path as needed


interface Note {
    id: string;
    title: string;
    content: string;
}

interface NotesState {
    notes: Note[];
}

const localNotes = loadNotesFromLocalStorage();
if (!localNotes) toast.error("Couldn't load notes from localStorage");

const defaultNotes: NotesState = {
    notes: [
        {
            id: crypto.randomUUID(), // Generate a unique ID for the note
            title: `Sample Note`,
            content: `This is the content of the sample note`
        }
    ]
};

const initialState: NotesState = {
    notes: localNotes || defaultNotes.notes,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            state.notes.push(action.payload);
            saveNotesToLocalStorage(state.notes); // Save to local storage after adding a note
        },
        updateNote: (state, action: PayloadAction<Note>) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
            saveNotesToLocalStorage(state.notes); // Save to local storage after updating a note
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            saveNotesToLocalStorage(state.notes); // Save to local storage after deleting a note
        },
    },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;