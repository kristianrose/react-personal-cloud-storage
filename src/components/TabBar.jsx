import React, { useState } from "react"
import { Nav } from "react-bootstrap"

export default function TabBar({ tabItems }) {
  const [activeKey, setActiveKey] = useState(0)

  return (
    <>
      <Nav variant="tabs" activeKey={activeKey}>
        {tabItems.length > 0 &&
          tabItems.map((tab) => {
            return (
              <Nav.Item key={tab.id}>
                <Nav.Link
                  eventKey={tab.id}
                  onClick={() => {
                    setActiveKey(tab.id)
                    tab.action()
                  }}
                >
                  {tab.label}
                </Nav.Link>
              </Nav.Item>
            )
          })}
      </Nav>
    </>
  )
}
