"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";
import { deleteNote } from "@/services/notes";
import { LuPencil } from "react-icons/lu";
import Link from "next/link";
import { ReadRichText } from "./read-rich-text";
import { friendlyDate } from "@/utils/friendlyDate";

interface FeedItemProps {
  note: Prisma.NoteGetPayload<{
    include: {
      user: true;
    };
  }>;
  isAuthor: boolean;
  userId?: string;
}

function FeedItem({ note, isAuthor, userId }: FeedItemProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!userId) return;

    startTransition(async () => {
      try {
        await deleteNote(note.id, userId);
        toast("Nota excluída com sucesso");
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <Card className="group relative">
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src="user-imagage.here" />
          <AvatarFallback>{note.user.name?.[0] ?? "EM"}</AvatarFallback>
        </Avatar>
        <div>
          <span className="block">{note.user.name}</span>
          <span className="block text-xs">{note.user.email}</span>
        </div>
        {isAuthor && (
          <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 ease-in-out absolute top-3 right-3">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="items-center justify-center"
            >
              <Link href={`/dashboard/my-notes/${note.id}`}>
                <LuPencil />
              </Link>
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="items-center justify-center"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <VscLoading className="animate-spin" />
              ) : (
                <AiOutlineDelete />
              )}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ReadRichText value={note.content} />
      </CardContent>
      <CardFooter>
        <small className="text-zinc-700">{friendlyDate(note.createdAt)}</small>
      </CardFooter>
    </Card>
  );
}

export default FeedItem;
