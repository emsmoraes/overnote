"use client"
import React, { useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Prisma } from "@prisma/client";
import { StringToHtml } from "./string-to-html";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { Button } from "./ui/button";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";
import { deleteNote } from "@/services/notes";

interface FeedItemProps {
  note: Prisma.NoteGetPayload<{
    include: {
      user: true;
    };
  }>;
  showDelete: boolean;
  userId: string;
}

function FeedItem({ note, showDelete, userId }: FeedItemProps) {
  const formattedDate = moment(note.createdAt).format("DD/MM/YYYY HH:mm");

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
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
          <AvatarImage src="https://i.pinimg.com/736x/60/4d/e5/604de5c77e0a2713956a8f02bdc30606.jpg" />
          <AvatarFallback>{note.user.name?.[0] ?? "EM"}</AvatarFallback>
        </Avatar>
        <div>
          <span className="block">{note.user.name}</span>
          <span className="block text-xs">{note.user.email}</span>
        </div>
        {showDelete && (
          <Button
            variant="destructive"
            size="icon"
            className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 ease-in-out absolute top-3 right-3 items-center justify-center"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <VscLoading className="animate-spin" />
            ) : (
              <AiOutlineDelete />
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <StringToHtml value={note.content} />
      </CardContent>
      <CardFooter>
        <small className="text-zinc-700">Criado em: {formattedDate}</small>
      </CardFooter>
    </Card>
  );
}

export default FeedItem;
