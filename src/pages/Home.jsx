// import Navbar from "../components/NavBar"
// import React, { useState } from "react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
// import TabBar from "../components/TabBar"
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { useForm } from "react-hook-form";
import TaskItem from "../components/TaskItem";

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showErrors, setShowErrors] = useState(false);

  const { currentUser } = useAuth();
  const [docRef, setDocRef] = useState();
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const c = collection(db, `users/${currentUser.uid}/tasks`);
    setDocRef(c);
    console.log("current user changed", c);
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

  const onSubmit = async (data) => {
    setShowErrors(true);

    const title = data.title;
    if (title !== "") {
      try {
        await addDoc(docRef, {
          title,
          completed: false,
        });
        reset();
        console.log("Task successfully added");
      } catch (e) {
        console.log("Unsuccessful", e);
      }
    }
  };

  const handleComplete = async (id, completed) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/tasks/${id}`), {
      completed: !completed,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `users/${currentUser.uid}/tasks/${id}`));
  };

  // const handleClearCompleted = async () => {
  //   const q = await getDocs(query(docRef, where("completed", "==", true)))
  //   q.forEach(async (doc) => {
  //     //loop through
  //     await deleteDoc(doc.ref)
  //   })
  // }

  return (
    // <Card
    //   style={{
    //     maxHeight: "95vh",
    //   }}
    // >
    //   <Navbar />
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "center",
    //       alignContent: "center",
    //       overflow: "auto",
    //     }}
    //   >
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         width: "300px",
    //       }}
    //     >
    //       <Form
    //         onSubmit={handleSubmit}
    //         style={{
    //           marginTop: "5px",
    //         }}
    //       >
    //         <InputGroup className="mb-3">
    //           <Form.Control
    //             placeholder="Enter new task"
    //             aria-label="Title"
    //             ref={titleRef}
    //           />
    //         </InputGroup>
    //       </Form>
    //       <TabBar tabItems={tabItems} />
    //       <ListGroup
    //         style={{
    //           marginTop: "10px",
    //           overflow: "auto",
    //         }}
    //       >
    //         {filteredTasks.length > 0 &&
    //           filteredTasks.map((task) => {
    //             return (
    //               <ListGroup.Item key={task.id}>
    //                 <TaskItem
    //                   {...task}
    //                   handleComplete={handleComplete}
    //                   handleDelete={handleDelete}
    //                 />
    //               </ListGroup.Item>
    //             )
    //           })}
    //       </ListGroup>
    //       {/* footer */}
    //       <footer
    //         style={{
    //           marginTop: "10px",
    //           marginBottom: "10px",
    //         }}
    //       >
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             marginTop: "10px",
    //           }}
    //         >
    //           <Button variant="primary" onClick={handleClearCompleted}>
    //             Clear Completed
    //           </Button>
    //         </div>
    //       </footer>
    //     </div>
    //   </div>
    // </Card>
    <div>
      <AuthCard>
        {/* {alertError && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-error">
              <span>Error! {alertError}</span>
            </div>
          </div>
        )} */}

        <AuthHeader
          title="Tasks list"
          subtitle="Hi, here are your latest tasks"
        />

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">
              <span className="label-text text-base">Title</span>
            </label>
            <input
              {...register("title", {
                required: "Title is required.",
              })}
              type="text"
              placeholder="Enter Title"
              className={
                "input input-bordered w-full" +
                (showErrors && errors.title ? " input-error" : "")
              }
            />
            {showErrors && errors.title && (
              <p className="text-error">{errors.title.message}</p>
            )}
          </div>

          {/* <div className="link link-primary p-1 hover:text-neutral-900">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div> */}

          <button
            // disabled={loading}
            className="btn btn-primary btn-block"
            type="submit"
            onClick={() => setShowErrors(true)}
          >
            {/* {loading && <span className="loading loading-spinner" />} */}
            Add
          </button>
        </form>

        <div id="tasks" className="my-5">
          {activeTasks.length > 0 &&
            activeTasks.map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  {...task}
                  handleComplete={handleComplete}
                  handleDelete={handleDelete}
                />
              );
            })}
        </div>

        <div className="collapse collapse-arrow overflow-visible bg-base-200">
          <input type="checkbox" name="completed-tasks-collapse" />
          <div className="collapse-title font-medium">
            Completed ({completedTasks.length})
          </div>
          <div className="collapse-content overflow-hidden">
            <div id="tasks">
              {completedTasks.length > 0 &&
                completedTasks.map((task) => {
                  return (
                    <TaskItem
                      key={task.id}
                      {...task}
                      handleComplete={handleComplete}
                      handleDelete={handleDelete}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
