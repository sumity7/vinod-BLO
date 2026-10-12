import { ViewTransition } from "react";

/**
 * A template is mounted afresh for every page, so the page is a `ViewTransition` that fades out and
 * the next one fades in (see the `.page-out` / `.page-in-soft` rules in globals.css). The header is
 * outside it and stays where it is. Without browser support the page simply changes, as before.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in-soft" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
