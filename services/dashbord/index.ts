"use server";
import { prisma as db } from "@/lib/prisma";
import moment from "moment";

export const countUserNotes = async (userId: string) => {
  try {
    const count = await db.note.count({
      where: { userId },
    });

    return count;
  } catch (error) {
    console.error("Error counting user notes:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const countUsers = async () => {
  try {
    const count = await db.user.count();
    return count;
  } catch (error) {
    console.error("Error counting users:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const countGlobalNotes = async () => {
  try {
    const count = await db.note.count();
    return count;
  } catch (error) {
    console.error("Error counting notes:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};

export const countUserNotesByDayOfMonth = async (userId: string) => {
  try {
    const startOfCurrentMonth = moment().startOf("month").toDate();
    const endOfCurrentMonth = moment().endOf("month").toDate();

    const notes = await db.note.groupBy({
      by: ["createdAt"],
      where: {
        userId,
        createdAt: {
          gte: startOfCurrentMonth,
          lte: endOfCurrentMonth,
        },
      },
      _count: {
        id: true,
      },
    });

    const chartData = [];
    const currentDate = moment(startOfCurrentMonth);

    while (currentDate.isSameOrBefore(endOfCurrentMonth, "day")) {
      const dateKey = currentDate.format("YYYY-MM-DD");
      const count =
        notes.find(
          (note) => moment(note.createdAt).format("YYYY-MM-DD") === dateKey
        )?._count.id || 0;

      chartData.push({ day: dateKey, notes: count });

      currentDate.add(1, "day");
    }

    return chartData;
  } catch (error) {
    console.error("Error counting user notes by day of month:", error);
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );
  }
};
