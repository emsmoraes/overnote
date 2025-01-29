import React from "react";
import NextTopLoader from "nextjs-toploader";

function TopPageLoader() {
  return (
    <NextTopLoader
      color="#3b82f6"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={false}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
}

export default TopPageLoader;
