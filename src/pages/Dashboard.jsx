import { useEffect, useState } from "react";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import NavBar from "../components/NavBar";
import { ALERT_CLASSES } from "../constants";
import { useAlert } from "../contexts/AlertContext";
import Breadcrumbs from "../components/FolderBreadcrumbs";
import { CreateEditFolderModal } from "../components/CreateEditFolderModal";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import FolderItem from "../components/FolderItem";

export default function Dashboard() {
  const { showAlert } = useAlert();
  const { currentUser } = useAuth();
  const [docRef, setDocRef] = useState();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCreateEditFolderModal, setShowCreateEditFolderModal] =
    useState(false);
  const [selectedFolder, setSelectedFolder] = useState();
  const [folders, setFolders] = useState();

  useEffect(() => {
    const c = collection(db, `users/${currentUser.uid}/folders`);
    setDocRef(c);
  }, [currentUser]);

  useEffect(() => {
    if (docRef) {
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        const foldersData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            name: data.name,
            id: doc.id,
          };
        });

        setFolders(foldersData);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [docRef]);

  const handleCreateFolder = async (data) => {
    const name = data.name;
    if (name !== "") {
      try {
        await addDoc(docRef, {
          name,
          completed: false,
        });
        console.log("Folder successfully added");
      } catch (e) {
        console.log("Unsuccessful", e);
      }
    }
    setShowCreateEditFolderModal(false);
  };

  const handleEditFolder = async (data, folder) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/folders/${folder.id}`), {
      name: data.name,
    });
    setShowCreateEditFolderModal(false);
  };

  const openCreateEditFolderModal = (folder) => {
    setSelectedFolder(folder);
    setShowCreateEditFolderModal(true);
  };

  return (
    <>
      <CreateEditFolderModal
        showModal={showCreateEditFolderModal}
        setShowModal={setShowCreateEditFolderModal}
        selectedFolder={selectedFolder}
        handleEdit={handleEditFolder}
        handleCreate={handleCreateFolder}
      />

      <NavBar />

      <div className="p-4">
        <div className="flex gap-4">
          <button disabled={loading} className="btn btn-primary">
            {loading && <span className="loading loading-spinner" />}
            Add File
          </button>
          <button
            disabled={loading}
            className="btn btn-primary"
            onClick={() => openCreateEditFolderModal()}
          >
            {loading && <span className="loading loading-spinner" />}
            Create Folder
          </button>
        </div>
        <Breadcrumbs folders={folders} />
        <div className="flex gap-4">
          {folders &&
            folders.map((folder) => (
              <FolderItem key={folder.id} folder={folder} />
            ))}
        </div>
      </div>
    </>
  );
}
