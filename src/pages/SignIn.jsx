import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext"; 

function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "At least 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        const users = await response.json();
        const user = users.find(
          (user) => user.email === values.email && user.password === values.password
        );

        if (user) {
          if (values.rememberMe) {
            localStorage.setItem("userEmail", values.email);
          } else {
            localStorage.removeItem("userEmail");
          }
          login(user); 
          navigate("/"); 
        } else {
          setError("Invalid email or password");
          setTimeout(() => setError(""), 3000);
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Server error, please try again later");
      }
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail && !formik.values.email) {
      formik.setValues({
        email: savedEmail,
        password: "",
        rememberMe: true,
      });
    }
  }, []); 

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={formik.handleSubmit} className="shadow p-4 rounded">
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
          {...formik.getFieldProps("email")}
        />
        <div className="invalid-feedback">{formik.errors.email}</div>

        <label className="mt-3">Password</label>
        <input
          type="password"
          className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
          {...formik.getFieldProps("password")}
        />
        <div className="invalid-feedback">{formik.errors.password}</div>

        <div className="form-check mt-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            {...formik.getFieldProps("rememberMe")}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember Me
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-100">Login</button>

        <p className="text-center mt-3">
          Don`t have an account? <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
