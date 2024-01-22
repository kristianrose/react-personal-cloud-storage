import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { ALERT_CLASSES } from "../constants";
import { useAlert } from "../contexts/AlertContext";

export default function Dashboard() {
  const { showAlert } = useAlert();
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <div
        onClick={() => {
          showAlert(ALERT_CLASSES.ERROR, "Count: " + count);
          setCount((count) => count + 1);
        }}
      >
        Dashboard
      </div>
    </>
  );
}
