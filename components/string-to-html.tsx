import React, { useRef, useEffect } from "react";

interface IStringToHtml {
  value: string;
}

export const StringToHtml = ({ value }: IStringToHtml) => {
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
        </style>
        <div>${value}</div>
      `;
    }
  }, [value]);

  return <div ref={ref} />;
};
