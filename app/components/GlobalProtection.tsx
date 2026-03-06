"use client";

import { useEffect } from "react";

export default function GlobalProtection() {
  useEffect(() => {
    // Prevent context menu (right-click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Prevent drag start
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // Prevent copy, cut, and paste
    const handleCopyPaste = (e: ClipboardEvent) => {
      // Allow paste if needed, but usually users want to disable copy/cut to protect info
      if (e.type === 'copy' || e.type === 'cut') {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
    };
  }, []);

  return null;
}
