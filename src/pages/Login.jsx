import { useState } from "react";
import { Link } from "react-router-dom";
import Instance from "../axiosInstance/Instance";
import Cookies from "js-cookie";

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const response = await Instance.post("/api/auth/login", {
        email,
        password,
      });
      console.log("Login successful:", response);
      // redirect or show message here (e.g., navigate to dashboard)
      Cookies.set("token", response.data.token, { expires: 1 }); // Store token in cookies for 1 day
      window.location.href = "/"; // Assuming you have a dashboard route
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setErr(error.message);
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 border shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}
      >
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form onSubmit={(e) => e.preventDefault()} style={{ margin: "0" }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="btn btn-primary w-100 shadow-sm"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          {err === "" ? (
            ""
          ) : (
            <p className="alert alert-danger py-1">
              {err == "Request failed with status code 400"
                ? "Invalid credentials"
                : err}
            </p>
          )}
          <small className="text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
