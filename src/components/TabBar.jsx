import React, { useState } from "react"
import { Nav } from "react-bootstrap"

export default function TabBar({ tabItems, handleSelectTab }) {
  const [activeKey, setActiveKey] = useState(0)

  return (
    <>
      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={(key) => {
          setActiveKey(key)
          handleSelectTab(key)
        }}
      >
        {tabItems.length > 0 &&
          tabItems.map((tab) => {
            return (
              <Nav.Item key={tab.id}>
                <Nav.Link eventKey={tab.id}>{tab.label}</Nav.Link>
              </Nav.Item>
            )
          })}
      </Nav>
    </>
  )
}
