import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number
}

const URL = "https://notehub-public.goit.study/api/notes";
const KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (search: string, page: number = 1, perPage: number = 12): Promise<FetchNotesResponse> => {
    const params: Record<string, unknown> = {
        page: String(page),
        perPage: String(perPage),
    };
    if (search.trim()) {
        params.search = search;
    }
    const config = {
        params,
        headers: { Authorization: `Bearer ${KEY}` },
    };

    const response = await axios.get<FetchNotesResponse>(URL, config);
    return response.data;
};

export const createNote = async (note: { title: string; content: string; tag: string; }): Promise<Note> => {
    const config = {
        headers: { Authorization: `Bearer ${KEY}` },
    };

    const response = await axios.post<Note>(URL, note, config);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const config = {
        headers: { Authorization: `Bearer ${KEY}` },
    };

    const response: AxiosResponse<Note> = await axios.delete(
        `${URL}/${id}`,
        config
    );
    return response.data;
};

const fetchNotebyId = async (id: string): Promise<Note> => {
    const config = {
        headers: { Authorization: `Bearer ${KEY}` },
    };

    const response: AxiosResponse<Note> = await axios.get(
        `${URL}/${id}`,
        config
    );
    return response.data;
};

export default fetchNotebyId;
