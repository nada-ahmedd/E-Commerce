import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    image: "",
    city: "",
    gender: "",
    phone: "",
    role: "User",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/dashboard/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container p-4">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label>Last Name</label>
        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label>Username</label>
        <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />

        <label>Password</label>
        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />

        <label>Profile Image URL</label>
        <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} required />

        <label>City</label>
        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />

        <label>Gender</label>
        <select className="form-control" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Phone Number</label>
        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />

      
        <button type="submit" className="btn btn-success mt-3">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUser;
