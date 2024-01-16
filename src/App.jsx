import React from "react";
import Signup from "./pages/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./pages/Home"
import Login from "./pages/Login";
// import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./pages/ForgotPassword";
// import UpdateEmail from "./pages/UpdateEmail"
// import UpdatePassword from "./pages/UpdatePassword"

function App() {
  return (
    <div
      className="flex h-screen w-screen justify-center overflow-auto bg-slate-200"
      data-theme="fantasy"
    >
      <Router>
        <AuthProvider>
          <Switch>
            {/* <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/update-email" component={UpdateEmail} />
              <PrivateRoute
                path="/update-password"
                component={UpdatePassword}
              /> */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
