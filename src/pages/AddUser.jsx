import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddUser() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    image: Yup.string().url("Invalid URL").required("Profile Image URL is required"),
    city: Yup.string().required("City is required"),
    gender: Yup.string().oneOf(["male", "female"], "Select a valid gender").required("Gender is required"),
    phone: Yup.string().matches(/^\d+$/, "Phone number must be only digits").required("Phone number is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
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
      terms: false,
    },
    validationSchema,
   onSubmit: async (values) => {
  try {
    const newUser = { ...values, role: "User" }; 

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    alert("User Added Successfully!");
    navigate("/dashboard/users");
  } catch (error) {
    console.error("Error adding user:", error);
  }
    },
  });

  return (
    <div className="container p-4">
      <h2>Add New User</h2>
      <form onSubmit={formik.handleSubmit}>
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
        <input type="text" className={`form-control ${formik.touched.image && formik.errors.image ? "is-invalid" : ""}`} {...formik.getFieldProps("image")} />
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

        <button type="submit" className="btn btn-success mt-3">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
