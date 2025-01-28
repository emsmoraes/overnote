import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, isPublic } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const note = await prisma.note.create({
      data: {
        content,
        isPublic: isPublic ?? true,
        userId,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const url = new URL(req.url);
    const userOnly = url.searchParams.get("userOnly") === "true";

    let notes;

    if (userOnly && userId) {
      notes = await prisma.note.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    } else {
      notes = await prisma.note.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, content, isPublic } = await req.json();

    if (!id || !content) {
      return NextResponse.json(
        { error: "ID and content are required" },
        { status: 400 }
      );
    }

    const note = await prisma.note.update({
      where: { id },
      data: {
        content,
        isPublic: isPublic ?? true,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Delete a note
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const note = await prisma.note.delete({
      where: { id },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
