import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center">Profile Information</h2>
      <div className="card shadow p-4">
        <img src={user.image} alt="Profile" className="rounded-circle mx-auto d-block" style={{ width: "300px", height: "300px" }} />
        <h4 className="text-center mt-4">{user.firstName} {user.lastName}</h4>
        <p className="text-center">@{user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
    </div>
  );
}

export default Profile;
