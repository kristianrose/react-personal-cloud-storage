import { CheckCircle2, XCircle } from "lucide-react";

export function Alert({ alert }) {
  return (
    <div className="toast toast-center toast-middle z-50">
      <div className={"alert text-white " + alert.className} role="alert">
        {alert.className === "alert-success" ? <CheckCircle2 /> : <XCircle />}
        {alert.message}
      </div>
    </div>
  );
}
