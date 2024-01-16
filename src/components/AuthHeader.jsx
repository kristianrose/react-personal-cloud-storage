import { ClipboardCheck } from "lucide-react";

export function AuthHeader({ title, subtitle }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-center">
        <ClipboardCheck size={25} />
        <span className="text-center text-xl font-semibold text-gray-700">
          Task Manager
        </span>
      </div>

      <div className="my-5">
        <h1 className="text-4xl font-medium">{title}</h1>
        <p className="text-slate-500">{subtitle}</p>
      </div>
    </>
  );
}
