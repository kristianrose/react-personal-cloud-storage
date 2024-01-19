import { useState, useEffect } from "react";
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
import { AuthCard } from "../components/AuthCard";
import TaskItem from "../components/TaskItem";
import { CreateEditTaskModal } from "../components/CreateEditTaskModal";
import { ClipboardCheck, Plus } from "lucide-react";

export default function Home() {
  const { currentUser } = useAuth();
  const [docRef, setDocRef] = useState();
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [showCreateEditTaskModal, setShowCreateEditTaskModal] = useState(false);

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
      <CreateEditTaskModal
        showModal={showCreateEditTaskModal}
        setShowModal={setShowCreateEditTaskModal}
        selectedTask={selectedTask}
        handleEdit={handleEdit}
        handleCreate={handleCreate}
      />

      <AuthCard>
        <div className="mb-4 flex items-center justify-center">
          <ClipboardCheck size={25} />
          <span className="text-center text-xl font-semibold text-gray-700">
            Task Manager
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="my-5">
            <h1 className="text-4xl font-medium">Tasks list</h1>
            <p className="text-slate-500">Hi, here are your latest tasks</p>
          </div>

          <button
            className="btn btn-circle bg-primary"
            onClick={() => openCreateEditTaskModal()}
          >
            <Plus color="white" />
          </button>
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
      </AuthCard>
    </div>
  );
}
