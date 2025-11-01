"use client";

import { format } from "date-fns";
import { useState, useEffect } from "react";

export default function FormattedDate({ date }: { date: string | number | Date }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  // Directly format the date. This is safe on the server and client
  // as long as we're not using locale-sensitive formatting that differs.
  const formattedDate = format(new Date(date), "PPpp");

  return <>{formattedDate}</>;
}
