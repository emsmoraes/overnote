"use client";
import React, { useState, useTransition, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";
import { deleteNote } from "@/services/note";
import { LuPencil } from "react-icons/lu";
import Link from "next/link";
import { ReadRichText } from "./read-rich-text";
import { friendlyDate } from "@/utils/friendlyDate";
import { FiLink } from "react-icons/fi";
import { Separator } from "./ui/separator";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const MAX_HEIGHT = 160;

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > MAX_HEIGHT);
    }
  }, [note.content]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/dashboard/public-notes/${note.id}`
    );
    toast("Link copiado para a área de transferência");
  };

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
    <Card className="group relative w-full">
      <CardHeader className="flex flex-row items-center gap-2 pt-16 sm:pt-6">
        <Avatar>
          <AvatarImage src="user-image.here" />
          <AvatarFallback>{note.user.name?.[0] ?? "EM"}</AvatarFallback>
        </Avatar>
        <div>
          <span className="block">{note.user.name}</span>
          <span className="block text-xs">{note.user.email}</span>
        </div>
        <div className="flex gap-2 items-center opacity-100 scale-100 transition-all duration-300 ease-in-out absolute top-3 right-3 sm:opacity-0 sm:group-hover:opacity-100 sm:scale-75 sm:group-hover:scale-100">
          <Button
            variant="outline"
            size="icon"
            className="items-center justify-center"
            onClick={handleCopyLink}
          >
            <FiLink />
          </Button>

          {isAuthor && (
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
          )}

          {isAuthor && (
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
          )}
        </div>
      </CardHeader>

      <Separator className="mb-3" />

      <CardContent
        ref={contentRef}
        style={{ maxHeight: isExpanded ? "none" : `${MAX_HEIGHT}px` }}
        className="relative overflow-hidden transition-all"
      >
        <ReadRichText value={note.content} />

        {!isExpanded && isOverflowing && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </CardContent>

      {isOverflowing && (
        <div className="text-center mt-2">
          <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Ver menos" : "Ver mais"}
          </Button>
        </div>
      )}

      <CardFooter>
        <small className="text-zinc-700">{friendlyDate(note.createdAt)}</small>
      </CardFooter>
    </Card>
  );
}

export default FeedItem;
