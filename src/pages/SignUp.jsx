
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2"; 

function SignUp() {
  const navigate = useNavigate();
  
  const validationSchema = Yup.object({
    firstName: Yup.string().min(2, "Must be at least 2 characters").required("Required"),
    lastName: Yup.string().min(2, "Must be at least 2 characters").required("Required"),
    username: Yup.string().min(4, "Must be at least 4 characters").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
      image: Yup.string().url("Invalid URL").required("Required"), 
    city: Yup.string().required("Required"),
    gender: Yup.string().oneOf(["male", "female"], "Please select gender").required("Required"),
    phone: Yup.string().matches(/^[0-9]{10,11}$/, "Invalid phone number").required("Required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
          password: "",
          image: "", 

      city: "",
      gender: "",
      phone: "",
      terms: true,
    },
    validationSchema,
   onSubmit: async (values, { setSubmitting, resetForm }) => {
  try {
    const userData = { ...values, role: "user" };

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData), 
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    await Swal.fire({
      icon: "success",
      title: "Registration Successful! ",
      text: "You can now log in.",
      confirmButtonText: "OK",
    });

    resetForm();
    navigate("/signin"); 
  } catch (error) {
    console.error("Error:", error);
    
    Swal.fire({
      icon: "error",
      title: "Registration Failed ",
      text: "An error occurred while creating your account. Please try again.",
      confirmButtonText: "OK",
    });
  } finally {
    setSubmitting(false);
  }
},
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center">Create a New Account</h2>
      <form onSubmit={formik.handleSubmit} className="shadow p-4 rounded">
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <input type="text" className={`form-control ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`} {...formik.getFieldProps("firstName")} />
            <div className="invalid-feedback">{formik.errors.firstName}</div>
          </div>

          <div className="col-md-6">
            <label>Last Name</label>
            <input type="text" className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`} {...formik.getFieldProps("lastName")} />
            <div className="invalid-feedback">{formik.errors.lastName}</div>
          </div>
        </div>

        <label className="mt-3">Username</label>
        <input type="text" className={`form-control ${formik.touched.username && formik.errors.username ? "is-invalid" : ""}`} {...formik.getFieldProps("username")} />
        <div className="invalid-feedback">{formik.errors.username}</div>

        <label className="mt-3">Email</label>
        <input type="email" className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`} {...formik.getFieldProps("email")} />
        <div className="invalid-feedback">{formik.errors.email}</div>

        <label className="mt-3">Password</label>
        <input type="password" className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`} {...formik.getFieldProps("password")} />
        <div className="invalid-feedback">{formik.errors.password}</div>
<label className="mt-3">Profile Image URL</label>
<input 
  type="text" 
  className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""}`} 
  {...formik.getFieldProps("image")} 
/>
<div className="invalid-feedback">{formik.errors.image}</div>

        <label className="mt-3">City</label>
        <input type="text" className={`form-control ${formik.touched.city && formik.errors.city ? "is-invalid" : ""}`} {...formik.getFieldProps("city")} />
        <div className="invalid-feedback">{formik.errors.city}</div>

        <label className="mt-3">Gender</label>
        <select className={`form-control ${formik.touched.gender && formik.errors.gender ? "is-invalid" : ""}`} {...formik.getFieldProps("gender")}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div className="invalid-feedback">{formik.errors.gender}</div>

        <label className="mt-3">Phone Number</label>
        <input type="text" className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`} {...formik.getFieldProps("phone")} />
        <div className="invalid-feedback">{formik.errors.phone}</div>

        <div className="form-check mt-3">
          <input type="checkbox" className="form-check-input" id="terms" {...formik.getFieldProps("terms")} />
          <label className="form-check-label" htmlFor="terms">
            Accept Terms and Conditions
          </label>
        </div>
        {formik.touched.terms && formik.errors.terms && <div className="text-danger">{formik.errors.terms}</div>}

        <button type="submit" className="btn btn-primary mt-4 w-100" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center mt-3">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
