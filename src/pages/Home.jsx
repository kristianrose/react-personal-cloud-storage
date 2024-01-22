import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { CentredContainer } from "../components/auth/CentredContainer";
import TaskItem from "../components/TaskItem";
import { CreateEditTaskModal } from "../components/CreateEditTaskModal";
import { ClipboardCheck, Plus, UserCircle } from "lucide-react";
import { useHistory } from "react-router-dom";
import { ALERT_TYPES } from "../constants";
import { Alert } from "../components/Alert";

export default function Home() {
  const alertRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const [docRef, setDocRef] = useState();
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [showCreateEditTaskModal, setShowCreateEditTaskModal] = useState(false);
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      alertRef.current.showAlert(ALERT_TYPES.ERROR, "Failed to log out.");
    }
  }

  useEffect(() => {
    const c = collection(db, `users/${currentUser.uid}/tasks`);
    setDocRef(c);
  }, [currentUser]);

  useEffect(() => {
    if (docRef) {
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        let active = [];
        let completed = [];

        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const task = {
            title: data.title,
            completed: data.completed,
            id: doc.id,
          };

          if (task.completed) {
            completed.push(task);
          } else {
            active.push(task);
          }
        });

        setActiveTasks(active);
        setCompletedTasks(completed);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [docRef]);

  const handleCreate = async (data) => {
    const title = data.title;
    if (title !== "") {
      try {
        await addDoc(docRef, {
          title,
          completed: false,
        });
        console.log("Task successfully added");
      } catch (e) {
        console.log("Unsuccessful", e);
      }
    }
    setShowCreateEditTaskModal(false);
  };

  const handleComplete = async (id, completed) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/tasks/${id}`), {
      completed: !completed,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `users/${currentUser.uid}/tasks/${id}`));
  };

  const handleEdit = async (data, task) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/tasks/${task.id}`), {
      title: data.title,
    });
    setShowCreateEditTaskModal(false);
  };

  const openCreateEditTaskModal = (task) => {
    setSelectedTask(task);
    setShowCreateEditTaskModal(true);
  };

  return (
    <div>
      <Alert ref={alertRef} />

      <CreateEditTaskModal
        showModal={showCreateEditTaskModal}
        setShowModal={setShowCreateEditTaskModal}
        selectedTask={selectedTask}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />

      <CentredContainer>
        <div className="flex justify-between">
          <div className="mb-4 flex items-center justify-center">
            <ClipboardCheck size={25} />
            <span className="text-center text-xl font-semibold text-gray-700">
              Task Manager
            </span>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <UserCircle
                size={25}
                className="text-slate-500 hover:text-slate-600"
              />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a onClick={handleLogout}>Log Out</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="my-5">
            <h1 className="text-4xl font-medium">Tasks list</h1>
            <p className="text-slate-500">Hi, here are your latest tasks</p>
          </div>

          <div className="tooltip tooltip-bottom" data-tip="Add Task">
            <button
              className="btn btn-circle bg-primary"
              onClick={() => openCreateEditTaskModal()}
            >
              <Plus color="white" />
            </button>
          </div>
        </div>

        <div id="tasks" className="my-5">
          {activeTasks.length > 0 &&
            activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
                openCreateEditTaskModal={openCreateEditTaskModal}
              />
            ))}
        </div>

        <div className="collapse collapse-arrow overflow-visible bg-base-200">
          <input type="checkbox" name="completed-tasks-collapse" />
          <div className="collapse-title font-medium">
            Completed ({completedTasks.length})
          </div>
          <div className="collapse-content overflow-hidden">
            <div id="tasks">
              {completedTasks.length > 0 &&
                completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                    openCreateEditTaskModal={openCreateEditTaskModal}
                  />
                ))}
            </div>
          </div>
        </div>
      </CentredContainer>
    </div>
  );
}
