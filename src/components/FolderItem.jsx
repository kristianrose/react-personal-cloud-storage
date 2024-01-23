import { FolderIcon } from "lucide-react";
import React from "react";

export default function FolderItem({ folder }) {
  return (
    <div className="btn btn-outline">
      <FolderIcon />
      {folder.name}
    </div>
  );
}
