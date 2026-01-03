'use client';
import axios, { type AxiosResponse } from 'axios';
import type { Note } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  tagName?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}
export type RegisterRequest = {
  email: string;
  password: string;
};

export async function fetchNotes(
  currentPage: number,
  search?: string,
  tagName?: string
): Promise<FetchNotesResponse> {
  const getParams = {
    params: {
      search,
      page: currentPage,
      perPage: 12,
      tag: tagName,
    },
  };

  const { data } = await nextServer.get<FetchNotesResponse>(
    '/notes',
    getParams
  );

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await nextServer.post(
    '/notes',
    payload
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await nextServer.delete(`/notes/${id}`);
  return response.data;
}

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function logout(): Promise<void> {
  const { data } = await nextServer.post('/auth/logout');
  return data;
}

type CheckSessionRequest = {
  success: boolean;
};

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data;
}

export async function getMe() {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
}

export type UpdateUserRequest = {
  username?: string;
};

export async function updateMe(payload: UpdateUserRequest) {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
}
