import EmptyResults from "@/components/empty-results";
import NoteDetails from "@/components/note-details";
import NoteDetailsSkeleton from "@/components/note-details-skeleton";
import { auth } from "@/lib/auth";
import { showNote } from "@/services/notes";
import React, { Suspense } from "react";

interface PublicNoteProps {
  params: {
    id: string;
  };
}

async function index({ params }: PublicNoteProps) {
  const session = await auth();

  const user = {
    id: session?.user?.id ?? "",
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  const fondedNote = await showNote(params.id, user.id);

  return (
    <Suspense fallback={<NoteDetailsSkeleton />}>
      {!fondedNote && <EmptyResults />}

      <NoteDetails note={fondedNote} />
    </Suspense>
  );
}

export default index;
