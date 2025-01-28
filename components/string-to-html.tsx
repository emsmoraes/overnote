"use client";
import React, { useCallback } from "react";

import DOMPurify from "dompurify";

interface IStringToHtml {
  value: string;
}

export const StringToHtml: React.FC<IStringToHtml> = ({ value, ...props }) => {
  const sanitizedData = useCallback(
    (value: string) => ({
      __html: DOMPurify.sanitize(value, {}),
    }),
    []
  );

  return <div {...props} dangerouslySetInnerHTML={sanitizedData(value)} />;
};
