"use client";

import { Prisma } from "@prisma/client";
import React from "react";
import { ReadRichText } from "./read-rich-text";
import { friendlyDate } from "@/utils/friendlyDate";
import { Separator } from "./ui/separator";

interface NoteDetailsProps {
  note: Prisma.NoteGetPayload<{
    include: {
      user: true;
    };
  }>;
}

function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <>
      <ReadRichText value={note.content} />
      <Separator />
      <div>
        <small className="block">{friendlyDate(note.createdAt)}</small>
        <small className="block">
          Por <strong>{note.user.name}</strong>
        </small>
      </div>
    </>
  );
}

export default NoteDetails;
