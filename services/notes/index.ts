"use server";
import { prisma as db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addNote = async (
  data: {
    content: string;
    isPublic: boolean;
  },
  userId: string
) => {
  try {
    await db.note.create({
      data: {
        content: data.content,
        isPublic: data.isPublic,
        userId,
      },
    });

    revalidatePath("/dashboard/my-notes");
  } catch (error) {
    console.error("Error adding note:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const showNote = async (noteId: string) => {
  try {
    const note = await db.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const listNotes = async (userId?: string) => {
  try {
    const notes = userId
      ? await db.note.findMany({
          where: { userId },
          include: {
            user: true,
          },
        })
      : await db.note.findMany({
          where: { isPublic: true },
          include: {
            user: true,
          },
        });

    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const deleteNote = async (noteId: string, userId: string) => {
  try {
    const note = await db.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      throw new Error("Note not found");
    }

    if (note.userId !== userId) {
      throw new Error("You are not authorized to delete this note");
    }

    await db.note.delete({
      where: { id: noteId },
    });
    revalidatePath("/dashboard/my-notes");
    return { message: "Note deleted successfully" };
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
