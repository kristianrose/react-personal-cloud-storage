import { X } from "lucide-react"
import React from "react"
import { Button, Form } from "react-bootstrap"

export default function TaskItem({
  id,
  title,
  completed,
  handleComplete,
  handleDelete,
}) {
  return (
    <>
      <div
        key={id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Form>
          <Form.Check
            type="checkbox"
            checked={completed}
            id={"default-checkbox"}
            onChange={() => handleComplete(id, completed)}
            label={
              completed ? (
                <s className="completed">{title}</s>
              ) : (
                <span>{title}</span>
              )
            }
          />
        </Form>
        <Button variant="light" onClick={() => handleDelete(id)}>
          <X color="#6c757d" />
        </Button>
      </div>
    </>
  )
}
