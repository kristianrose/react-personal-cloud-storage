import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
// import UpdateEmail from "./pages/UpdateEmail"
// import UpdatePassword from "./pages/UpdatePassword"

function App() {
  return (
    <div
      className="flex h-screen w-screen justify-center md:bg-slate-200"
      data-theme="fantasy"
    >
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
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
