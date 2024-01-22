import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { CentredContainer } from "../../components/auth/CentredContainer";
import { AuthHeader } from "../../components/auth/AuthHeader";
import { AuthBottomRedirect } from "../../components/auth/AuthBottomRedirect";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components/auth/PasswordInput";

export default function Signup() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showErrors, setShowErrors] = useState(false);
  const { signup } = useAuth();
  const [alertError, setAlertError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function onSubmit(data) {
    try {
      setAlertError(null);
      setLoading(true);
      await signup(data.email, data.password);
      setLoading(false);
      history.push("/");
    } catch {
      setAlertError("Failed to create an account.");
      setTimeout(() => {
        setLoading(false);
      }, 300);
      setTimeout(() => {
        setAlertError(null);
      }, 1000);
    }
  }

  return (
    <CentredContainer>
      {alertError && (
        <div className="toast toast-center toast-middle z-50">
          <div className="alert alert-error">
            <span>Error! {alertError}</span>
          </div>
        </div>
      )}

      <AuthHeader title="Sign Up" subtitle="Hi, Welcome 👋" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="label">
            <span className="label-text text-base">Email</span>
          </label>
          <input
            {...register("email", {
              required: "Email is required",
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
        <div>
          <label className="label">
            <span className="label-text text-base">Password</span>
          </label>
          <PasswordInput
            inputParams={{
              ...register("password", {
                required: "Password is required",
                validate: {
                  checkLength: (value) =>
                    value.length >= 6
                      ? true
                      : "Password should be at-least 6 characters",
                  matchPattern: (value) =>
                    /(?=.*[!@#$*])/.test(value) // /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                      ? true
                      : "Password should contain at least one special symbol", // "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol",
                },
              }),
              placeholder: "Enter Password",
              autoComplete: "new-password",
            }}
            hasError={showErrors && errors.password}
          />
          {showErrors && errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text text-base">Confirm Password</span>
          </label>
          <PasswordInput
            inputParams={{
              ...register("passwordConfirmation", {
                required: "Password is required",
                validate: {
                  checkPasswordsMatch: (val) => {
                    const { password } = getValues();
                    return password === val
                      ? true
                      : "Your passwords do no match";
                  },
                },
              }),
              placeholder: "Enter Password Confirmation",
              autoComplete: "new-password-confirmation",
            }}
            hasError={showErrors && errors.passwordConfirmation}
          />
          {showErrors && errors.passwordConfirmation && (
            <p className="text-error">{errors.passwordConfirmation.message}</p>
          )}
        </div>

        <button
          disabled={loading}
          className="btn btn-primary btn-block my-4"
          type="submit"
          onClick={() => setShowErrors(true)}
        >
          {loading && <span className="loading loading-spinner" />}
          Sign Up
        </button>
      </form>

      <AuthBottomRedirect
        text="Already have an account?"
        linkText="Log In"
        linkTo="/login"
      />
    </CentredContainer>
  );
}
