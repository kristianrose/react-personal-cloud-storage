import { CheckCircle2, XCircle } from "lucide-react";

export function Alert({ alert }) {
  return (
    <div className="toast toast-center toast-middle z-50 w-screen max-w-lg">
      <div className={"alert flex text-white " + alert.className} role="alert">
        {alert.className === "alert-success" ? <CheckCircle2 /> : <XCircle />}
        <span className="flex-grow text-wrap text-center ">
          {alert.message}
        </span>
      </div>
    </div>
  );
}
