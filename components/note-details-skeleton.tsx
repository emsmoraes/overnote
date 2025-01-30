import React from "react";

function NoteDetailsSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="animate-pulse">
        <div className="h-80 bg-gray-300 rounded-md my-8"></div>

        <div className="mt-2 flex justify-between">
          <div className="w-full h-1 bg-gray-300 rounded-sm"></div>
        </div>
        <div className="mt-8">
          <div className="w-40 h-2 bg-gray-300 rounded-sm"></div>
          <div className="w-80 h-2 my-4 bg-gray-300 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailsSkeleton;
