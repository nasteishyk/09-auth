'use client';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createNote, type CreateNotePayload } from '@/lib/api/clientApi';
import { type NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

import { useRouter } from 'next/navigation';
import { useNoteDraft } from '@/lib/store/noteStore';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraft();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['notes'] });
      clearDraft();

      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload: CreateNotePayload = {
      title: formData.get('title') as string,
      content: (formData.get('content') as string) || '',
      tag: formData.get('tag') as NoteTag,
    };

    mutate(payload);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ [event.target.name]: event.target.value });
  };
  const handleCancel = () => {
    router.back();
  };
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        name="title"
        className={css.input}
        defaultValue={draft.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="content"
        className={css.textarea}
        defaultValue={draft.content}
        onChange={handleChange}
      />

      <select
        name="tag"
        className={css.select}
        defaultValue={draft.tag}
        onChange={handleChange}
      >
        {TAGS.map(tag => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>

        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
