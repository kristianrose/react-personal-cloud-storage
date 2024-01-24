import { FileIcon } from "lucide-react";
import React from "react";

export default function FileItem({ file }) {
  return (
    <a
      href={file.url}
      target="_blank"
      className="btn btn-outline flex max-w-96 flex-grow truncate"
    >
      <FileIcon />
      <span>{file.name}</span>
    </a>
  );
}
