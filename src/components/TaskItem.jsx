import React from "react"

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
        <label style={{}}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => handleComplete(id, completed)}
          />
          {completed ? (
            <s className="completed">{title}</s>
          ) : (
            <span>{title}</span>
          )}
        </label>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </>
  )
}
