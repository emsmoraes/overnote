"use client";

import { Prisma } from "@prisma/client";
import React from "react";
import { ReadRichText } from "./read-rich-text";
import { friendlyDate } from "@/utils/friendlyDate";
import { Separator } from "./ui/separator";
import BackButton from "./back-button";

interface NoteDetailsProps {
  note: Prisma.NoteGetPayload<{
    include: {
      user: true;
    };
  }>;
}

function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-14">
      <BackButton to="/dashboard/public-notes"/>
      <ReadRichText value={note.content} />
      <Separator />
      <div>
        <small className="block">{friendlyDate(note.createdAt)}</small>
        <small className="block">
          Por <strong>{note.user.name}</strong>
        </small>
      </div>
    </div>
  );
}

export default NoteDetails;
