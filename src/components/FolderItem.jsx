import { FolderIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function FolderItem({ folder }) {
  return (
    <Link to={`/folder/${folder.id}`} className="btn btn-outline flex">
      <FolderIcon />
      <span className="max-w-40 truncate">{folder.name}</span>
    </Link>
  );
}
