import { FolderIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function FolderItem({ folder }) {
  return (
    <Link
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      className="btn btn-outline flex flex-grow truncate"
    >
      <FolderIcon />
      <span>{folder.name}</span>
    </Link>
  );
}
