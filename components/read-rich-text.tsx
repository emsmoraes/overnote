import React, { useRef, useEffect } from "react";

interface IReadRichText {
  value: string;
}

export const ReadRichText = ({ value }: IReadRichText) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      let shadowRoot = ref.current.shadowRoot;
      if (!shadowRoot) {
        shadowRoot = ref.current.attachShadow({ mode: "open" });
      }

      shadowRoot.innerHTML = `
        <style>
          body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          div {
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: normal;
          }
        </style>
        <div>${value}</div>
      `;
    }
  }, [value]);

  return <div ref={ref} />;
};
