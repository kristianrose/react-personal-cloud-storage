import NavBar from "../components/NavBar";
import FolderBreadcrumbs from "../components/FolderBreadcrumbs";
import FolderItem from "../components/FolderItem";
import CreateFolderButton from "../components/CreateFolderButton";
import { ROOT_FOLDER, useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router-dom";
import AddFileButton from "../components/AddFileButton";
import FileItem from "../components/FileItem";
import LoadingRing from "../components/LoadingRing";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles, loadingState } = useFolder(
    folderId,
    state.folder,
  );
  const isDataLoading = loadingState.childFolders && loadingState.childFiles;

  return (
    <>
      <NavBar />

      <div className="p-4">
        <div className="flex gap-4">
          <CreateFolderButton currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
        </div>

        <div className="my-4">
          <FolderBreadcrumbs currentFolder={folder} />
        </div>

        {isDataLoading ? (
          <div>
            {childFolders.length == 0 && childFiles.length == 0 && (
              <div className="divider">Create a folder or upload a file</div>
            )}

            <div className="flex flex-wrap gap-4">
              {childFolders?.length > 0 &&
                childFolders.map((childFolder) => (
                  <FolderItem key={childFolder.id} folder={childFolder} />
                ))}
            </div>

            {childFolders.length > 0 && childFiles.length > 0 && (
              <div className="divider"></div>
            )}

            <div className="flex flex-wrap gap-4">
              {childFiles.length > 0 &&
                childFiles.map((childFile) => (
                  <FileItem key={childFile.id} file={childFile} />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full  justify-center">
            <LoadingRing />
          </div>
        )}
      </div>
    </>
  );
}
