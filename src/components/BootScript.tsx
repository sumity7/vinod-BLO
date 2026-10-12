"use client";

import { useEffect, useState } from "react";

let hydrated = false;

/**
 * An inline script that must run before first paint. It only does anything in the server HTML: a
 * script React creates later in the browser never runs, and React warns about it. So it is rendered
 * for the server and for hydration (where the browser's own element is reused), and skipped when the
 * layout is rendered again on the client, for example after switching language.
 */
export function BootScript({ code }: { code: string }) {
  const [first] = useState(() => !hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);
  return first ? <script dangerouslySetInnerHTML={{ __html: code }} suppressHydrationWarning /> : null;
}
