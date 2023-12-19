import Navbar from "../components/NavBar"
import { useState, useEffect } from "react"
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
} from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import TaskItem from "../components/TaskItem"

export default function Home() {
  const { currentUser } = useAuth()
  const [docRef, setDocRef] = useState()
  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState([])
  const [completedTasksCount, setCompletedTasksCount] = useState(0)

  useEffect(() => {
    const c = collection(db, `users/${currentUser.uid}/tasks`)
    setDocRef(c)
    console.log("current user changed", c)
  }, [currentUser])

  useEffect(() => {
    if (docRef) {
      console.log("onSnapshot so I can get data update real-time", docRef)
      // onSnapshot so I can get data update real-time
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        let completedCount = 0
        const tasks = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          if (data.completed) {
            completedCount++
          }
          return {
            //return data compatible with data types specified in the tasks variable
            title: data.title,
            completed: data.completed,
            id: doc.id,
          }
        })
        setTasks(tasks)
        setCompletedTasksCount(completedCount)
      })
      return () => {
        unsubscribe()
      }
    }
  }, [docRef])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title !== "") {
      try {
        await addDoc(docRef, {
          title,
          completed: false,
        })
        setTitle("")
        console.log("Task successfully added")
      } catch (e) {
        console.log("Unsuccessful", e)
      }
    }
  }

  const handleComplete = async (id, completed) => {
    await updateDoc(doc(db, `users/${currentUser.uid}/tasks/${id}`), {
      completed: !completed,
    })
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, `users/${currentUser.uid}/tasks/${id}`))
  }

  const handleFilter = async (val) => {
    const q = query(docRef, where("completed", "==", val)) //get collection with respect to if completed is true or not
    const querySnapshot = await getDocs(q)
    const tasks = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        //return data compatible with data types specified in the tasks variable
        title: data.title,
        completed: data.completed,
        id: doc.id,
      }
    })
    // const tasks = mapQuerySnapshotToTasks(querySnapshot) //fetch the document in the collection
    setTasks(tasks)
  }

  const handleFetchAll = async () => {
    const querySnapshot = await getDocs(docRef)
    const tasks = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        //return data compatible with data types specified in the tasks variable
        title: data.title,
        completed: data.completed,
        id: doc.id,
      }
    })
    // const tasks = mapQuerySnapshotToTasks(querySnapshot)
    setTasks(tasks)
  }

  const handleClearCompleted = async () => {
    const q = await getDocs(query(docRef, where("completed", "==", true))) //get the document so we can loop through
    q.forEach(async (doc) => {
      //loop through
      await deleteDoc(doc.ref)
    })
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            width: "300px",
          }}
        >
          <p>Todo List App</p>

          <form
            onSubmit={handleSubmit}
            style={{
              marginTop: "5px",
            }}
          >
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </form>
          <div
            style={{
              marginTop: "10px",
            }}
          >
            {tasks.length > 0 && //since tasks may be undefined
              tasks.map((task) => {
                return (
                  <TaskItem
                    key={task.id}
                    {...task}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                  />
                )
              })}
          </div>
          {/* footer */}
          <footer
            style={{
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button onClick={handleFetchAll}>All</button>
              <button onClick={() => handleFilter(false)}>Active</button>
              <button onClick={() => handleFilter(true)}>Completed</button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button>{completedTasksCount} items left</button>
              <button onClick={handleClearCompleted}>Clear Completed</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
