import Navbar from "../components/NavBar"
import { useState, useEffect, useRef } from "react"
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
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap"
import TabBar from "../components/TabBar"

export default function Home() {
  const { currentUser } = useAuth()
  const [docRef, setDocRef] = useState()
  const titleRef = useRef()
  const [filteredTasks, setFilteredTasks] = useState([])
  const [filterOption, setFilterOption] = useState()
  const [completedTasksCount, setCompletedTasksCount] = useState(0)
  const [activeTasksCount, setActiveTasksCount] = useState(0)

  useEffect(() => {
    const c = collection(db, `users/${currentUser.uid}/tasks`)
    setDocRef(c)
    console.log("current user changed", c)
  }, [currentUser])

  useEffect(() => {
    if (docRef) {
      const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        let completedCount = 0
        let activeCount = 0
        const tasks = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          if (data.completed) {
            completedCount++
          } else {
            activeCount++
          }
          return {
            //return data compatible with data types specified in the tasks variable
            title: data.title,
            completed: data.completed,
            id: doc.id,
          }
        })
        setFilteredTasks(
          filterOption === undefined
            ? tasks
            : tasks.filter((task) => task.completed === filterOption)
        )
        setCompletedTasksCount(completedCount)
        setActiveTasksCount(activeCount)
      })
      return () => {
        unsubscribe()
      }
    }
  }, [docRef, filterOption])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    if (title !== "") {
      try {
        await addDoc(docRef, {
          title,
          completed: false,
        })
        titleRef.current.value = ""
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

  const handleClearCompleted = async () => {
    const q = await getDocs(query(docRef, where("completed", "==", true)))
    q.forEach(async (doc) => {
      //loop through
      await deleteDoc(doc.ref)
    })
  }

  const tabItems = [
    {
      id: 0,
      label: "All",
      action: () => setFilterOption(),
    },
    {
      id: 1,
      label: `Active (${activeTasksCount})`,
      action: () => setFilterOption(false),
    },
    {
      id: 2,
      label: `Completed (${completedTasksCount})`,
      action: () => setFilterOption(true),
    },
  ]

  return (
    <Card
      style={{
        maxHeight: "95vh",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
          }}
        >
          <Form
            onSubmit={handleSubmit}
            style={{
              marginTop: "5px",
            }}
          >
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter new task"
                aria-label="Title"
                ref={titleRef}
              />
            </InputGroup>
          </Form>
          <TabBar tabItems={tabItems} />
          <ListGroup
            style={{
              marginTop: "10px",
              overflow: "auto",
            }}
          >
            {filteredTasks.length > 0 &&
              filteredTasks.map((task) => {
                return (
                  <ListGroup.Item key={task.id}>
                    <TaskItem
                      {...task}
                      handleComplete={handleComplete}
                      handleDelete={handleDelete}
                    />
                  </ListGroup.Item>
                )
              })}
          </ListGroup>
          {/* footer */}
          <footer
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button variant="primary" onClick={handleClearCompleted}>
                Clear Completed
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </Card>
  )
}
