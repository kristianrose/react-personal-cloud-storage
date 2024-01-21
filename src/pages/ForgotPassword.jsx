import { AuthCard } from "../components/AuthCard";
import { AuthBottomRedirect } from "../components/AuthBottomRedirect";
import { AuthHeader } from "../components/AuthHeader";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "../components/Alert";
import { ALERT_TYPES } from "../constants";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const alertRef = useRef(null);
  const { resetPassword } = useAuth(null);

  async function onSubmit(data) {
    try {
      setLoading(true);
      await resetPassword(data.email);
      setLoading(false);
      alertRef.current.showAlert(
        ALERT_TYPES.SUCCESS,
        "Check your inbox for further instructions.",
      );
    } catch {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      alertRef.current.showAlert(
        ALERT_TYPES.ERROR,
        "Failed to reset the password.",
      );
    }
  }

  return (
    <AuthCard>
      <Alert ref={alertRef} />

      <AuthHeader
        title="Reset password"
        subtitle="Fill up the form to get instructions"
      />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label">
            <span className="label-text text-base">Email</span>
          </label>
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
            type="text"
            autoComplete="email"
            placeholder="Email Address"
            className={
              "input input-bordered w-full" +
              (showErrors && errors.email ? " input-error" : "")
            }
          />
          {showErrors && errors.email && (
            <p className="text-error">{errors.email.message}</p>
          )}
        </div>

        <button
          disabled={loading}
          className="btn btn-primary btn-block"
          type="submit"
          onClick={() => setShowErrors(true)}
        >
          Reset Password
        </button>

        <AuthBottomRedirect
          text="Remember your password?"
          linkText="Login here"
          linkTo="/login"
        />
      </form>
    </AuthCard>
  );
}
