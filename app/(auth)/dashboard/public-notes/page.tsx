import EmptyResults from "@/components/empty-results";
import FeedItem from "@/components/feed-item";
import NotesSkeleton from "@/components/notes-skeleton";
import { listNotes } from "@/services/notes";
import React, { Suspense } from "react";

async function page() {
  const notes = await listNotes();

  return (
    <Suspense fallback={<NotesSkeleton count={10} />}>
      {notes.length === 0 && (
        <EmptyResults />
      )}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {notes.map((note) => (
          <FeedItem
            note={note}
            key={note.id}
            isAuthor={false}
          />
        ))}
      </div>
    </Suspense>
  );
}

export default page;
