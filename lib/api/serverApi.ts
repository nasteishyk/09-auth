import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import { FetchNotesResponse } from './clientApi';

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}

export async function fetchNotes(
  currentPage: number,
  search?: string,
  tagName?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search,
      page: currentPage,
      perPage: 12,
      tag: tagName,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
