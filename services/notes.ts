export interface CreateNotePayload {
    content: string;
    isPublic: boolean;
    userId: string;
  }
  
  export async function createNote(payload: CreateNotePayload) {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create note");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  }
  