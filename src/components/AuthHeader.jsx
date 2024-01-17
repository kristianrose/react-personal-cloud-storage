import React from "react";
import { ClipboardCheck } from "lucide-react";
import PropTypes from "prop-types";

AuthHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export function AuthHeader(props) {
  return (
    <>
      <div className="mb-4 flex items-center justify-center">
        <ClipboardCheck size={25} />
        <span className="text-center text-xl font-semibold text-gray-700">
          Task Manager
        </span>
      </div>

      <div className="my-5">
        <h1 className="text-4xl font-medium">{props.title}</h1>
        <p className="text-slate-500">{props.subtitle}</p>
      </div>
    </>
  );
}
