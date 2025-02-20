import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 

function Navbar() {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signup"); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My Store</Link>

        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/shop">Shop</Link></li>
          </ul>
        </div>

        <div className="d-flex me-5">
          <Link to="/cart">
            <button className="btn btn-outline-primary me-2">
              <i className="fa fa-shopping-cart me-2"></i> Cart
            </button>
          </Link>

          {isLoggedIn ? (
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {user?.image ? (
                  <>
                    <img src={user.image} alt="Profile" className="rounded-circle me-2" width="35" height="35" onError={(e) => console.log("Image Load Error:", e)} />
                    <span>{user.username}</span>
                  </>
                ) : (
                  <span>{user?.username}</span>
                )}
              </button>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/profile/${user.id}`}>
                    Profile
                  </Link>
                </li>

                {user?.role === "Admin" && (
                  <li>
                    <Link className="dropdown-item" to="/control">Control</Link>
                  </li>
                )}

                <li>
                  <button className="dropdown-item" onClick={handleLogout}>Log out</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signup">
              <button className="btn btn-outline-success">
                <i className="fa fa-user-plus"></i> Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
