import { Note } from "@prisma/client";

export interface CreateNotePayload {
  content: string;
  isPublic: boolean;
  userId: string;
}

export async function createNote(
  payload: CreateNotePayload
): Promise<VoidFunction> {
  try {
    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create note");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

export async function indexNotes(userId?: string): Promise<Note[]> {
  try {
    // alterar caso o projeto rodar em outra porta
    const url = userId
      ? `http://localhost:3000/api/notes?userId=${userId}`
      : "http://localhost:3000/api/notes";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch notes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export async function getNote(noteId: string) {
  try {
    const url = `/api/notes/${noteId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch note");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
}
