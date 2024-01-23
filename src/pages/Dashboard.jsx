import NavBar from "../components/NavBar";
import Breadcrumbs from "../components/FolderBreadcrumbs";
import FolderItem from "../components/FolderItem";
import CreateFolderButton from "../components/CreateFolderButton";
import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router-dom";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder,
  );

  return (
    <>
      <NavBar />

      <div className="p-4">
        <div className="flex gap-4">
          <button className="btn btn-primary">Add File</button>
          <CreateFolderButton currentFolder={folder} />
        </div>
        <Breadcrumbs childFolders={childFolders} />
        <div className="flex gap-4">
          {childFolders?.length > 0 &&
            childFolders.map((childFolder) => (
              <FolderItem key={childFolder.id} folder={childFolder} />
            ))}
        </div>
      </div>
    </>
  );
}
