import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Instance from "../axiosInstance/Instance";
import Cookies from "js-cookie";
// Example country codes (expand as needed)
const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+44", name: "United Kingdom" },
  { code: "+91", name: "India" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  { code: "+20", name: "Egypt" },
];

const validateName = (name) => /^[A-Za-z]{2,}$/.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
const validatePhone = (phone) => /^[0-9]{7,15}$/.test(phone);

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodes[0].code);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateName(firstName)) {
      newErrors.firstName =
        "First name must be at least 2 letters and contain only letters.";
    }
    if (!validateName(lastName)) {
      newErrors.lastName =
        "Last name must be at least 2 letters and contain only letters.";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }
    if (!validatePhone(phone)) {
      newErrors.phone = "Phone must be 7-15 digits.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await Instance.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        phone: countryCode + phone,
        password,
      });
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      window.location.href = "/";
    } catch (error) {
      setErrors({ api: error.response?.data?.message || error.message });
    }
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center mt-5 mb-5 bg-light">
      <div
        className="card p-4 border shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}
      >
        <h2 className="text-center mb-4 text-primary">Register</h2>
        <form onSubmit={handleRegister} style={{ margin: "0" }}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label fw-semibold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label fw-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <div className="input-group">
              <select
                className="form-select"
                style={{ maxWidth: 110 }}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                maxLength={15}
              />
              {errors.phone && (
                <div className="invalid-feedback d-block">{errors.phone}</div>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          {errors.api && (
            <div className="alert alert-danger py-1">{errors.api}</div>
          )}
          <button type="submit" className="btn btn-primary w-100 shadow-sm">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">
            Do you have an account?{" "}
            <Link to="/login" className="text-primary">
              login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
