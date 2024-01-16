// import { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { AuthHeader } from "../components/AuthHeader";
import { AuthBottomRedirect } from "../components/AuthBottomRedirect";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showErrors, setShowErrors] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  // const emailRef = useRef()
  // const passwordRef = useRef()
  // const { login } = useAuth()
  // const [error, setError] = useState("")
  // const [loading, setLoading] = useState(false)
  // const history = useHistory()

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   try {
  //     setError("")
  //     setLoading(true)
  //     await login(emailRef.current.value, passwordRef.current.value)
  //     setLoading(false)
  //     history.push("/")
  //   } catch {
  //     setLoading(false)
  //     setError("Failed to log in")
  //   }
  // }

  /* <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required autoComplete="on" />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div> */

  return (
    <AuthCard>
      <AuthHeader title="Login" subtitle="Hi, Welcome back 👋" />

      {/* <div>
        <button className="my-3 flex w-full items-center justify-center space-x-2 rounded-lg border border-slate-200 py-3 text-center text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="h-6 w-6"
            alt=""
          />{" "}
          <span>Login with Google</span>
        </button>
      </div>

      <span className="w-full text-center text-lg text-slate-500">Or</span> */}

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
          <input
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                // matchPattern: (value) =>
                //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                //     value,
                //   ),
              },
            })}
            type="password"
            placeholder="Enter Password"
            className={
              "input input-bordered w-full" +
              (showErrors && errors.password ? " input-error" : "")
            }
          />
          {showErrors && (
            <div>
              {errors.password?.type === "required" && (
                <p className="text-error">Password is required</p>
              )}
              {errors.password?.type === "checkLength" && (
                <p className="text-error">
                  Password should be at-least 6 characters
                </p>
              )}
              {errors.password?.type === "matchPattern" && (
                <p className="text-error">
                  Password should contain at least one uppercase letter,
                  lowercase letter, digit, and special symbol
                </p>
              )}
            </div>
          )}
        </div>

        <div className="link link-primary p-1 hover:text-neutral-900">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button
          className="btn btn-primary btn-block"
          type="submit"
          onClick={() => setShowErrors(true)}
        >
          Login
        </button>

        <AuthBottomRedirect
          text="Not registered yet?"
          linkText="Register now"
          linkTo="/signup"
        />
      </form>
    </AuthCard>
  );
}
