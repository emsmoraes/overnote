import BackButton from "@/components/back-button";
import EmptyResults from "@/components/empty-results";
import FeedItem from "@/components/feed-item";
import NotesSkeleton from "@/components/notes-skeleton";
import { listNotes } from "@/services/note";
import React, { Suspense } from "react";

async function page() {
  const notes = await listNotes();

  return (
    <Suspense fallback={<NotesSkeleton count={10} />}>
      <div className="flex flex-col items-center p-4 pt-0">
        <BackButton to="/dashboard" />

        {notes.length === 0 && <EmptyResults />}

        <div className="max-w-[1000px] space-y-4 mt-6 w-full">
          {notes.map((note) => (
            <FeedItem note={note} key={note.id} isAuthor={false} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}

export default page;
