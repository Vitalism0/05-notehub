import axios from "axios";
import { type Note, type CreateNote } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  query: string,
  page: number,
  perPage: number
): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: query,
      page,
      perPage,
    },
  });
  return data;
}

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const res = await axios.post<Note>("/notes", payload);
  return res.data;
};
export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};
