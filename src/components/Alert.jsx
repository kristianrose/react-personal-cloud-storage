import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { ALERT_TYPES } from "../constants";

export const Alert = forwardRef((props, ref) => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  }, [alert, setAlert]);
  
  useImperativeHandle(ref, () => ({
    showAlert: showAlert,
  }));

  function showAlert(type, message) {
    switch (type) {
      case ALERT_TYPES.ERROR:
        setAlert(
          <div className="alert alert-error" role="alert">
            {message}
          </div>,
        );
        break;
      case ALERT_TYPES.SUCCESS:
        setAlert(
          <div className="alert alert-success" role="alert">
            {message}
          </div>,
        );
        break;
      default:
        setAlert(null);
    }
  }

  return (
    <>
      {alert && (
        <div className="toast toast-center toast-middle z-50">{alert}</div>
      )}
    </>
  );
});
