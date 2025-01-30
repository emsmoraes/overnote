import BackButton from "@/components/back-button";
import EmptyResults from "@/components/empty-results";
import NoteDetails from "@/components/note-details";
import NoteDetailsSkeleton from "@/components/note-details-skeleton";
import { auth } from "@/lib/auth";
import { showNote } from "@/services/note";
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

  const fondedNote = (await showNote(params.id, user.id)) ?? null;

  return (
    <Suspense fallback={<NoteDetailsSkeleton />}>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-14">
        <BackButton to="/dashboard/public-notes" />
        {!fondedNote && <EmptyResults />}

        {fondedNote && <NoteDetails note={fondedNote} />}
      </div>
    </Suspense>
  );
}

export default index;
