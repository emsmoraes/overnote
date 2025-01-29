export function cleanHtmlText(input: string): string {
    return input
      .replace(/<[^>]+>/g, "")
      .replace(/[\r\n\t]/g, "")
      .trim(); 
  }
  