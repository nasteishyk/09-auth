import { NewNote } from '@/types/note';
import { title } from 'process';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteDraftStore {
  draft: NewNote;
  setDraft: (data: Partial<NewNote>) => void;
  clearDraft: () => void;
}

export const useNoteDraft = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: data =>
        set(state => ({
          draft: { ...state.draft, ...data },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: 'note-draft' }
  )
);
