
const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container text-center text-md-start">
        <div className="row">
          
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h5 className="fw-bold text-uppercase">Your Store</h5>
            <p>Best products at the best prices. Shop now and enjoy an unforgettable experience!</p>
          </div>

          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h5 className="fw-bold text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/shop" className="text-light text-decoration-none">Shop</a></li>
              <li><a href="/profile/:id" className="text-light text-decoration-none">My Account</a></li>
              <li><a href="/support" className="text-light text-decoration-none">Support</a></li>
            </ul>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h5 className="fw-bold text-uppercase">Follow Us</h5>
            <a href="#" className="text-light me-3"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" className="text-light me-3"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="#" className="text-light me-3"><i className="fab fa-twitter fa-lg"></i></a>
          </div>

        </div>

        <div className="text-center mt-4">
          <p className="mb-0">© 2025 All Rights Reserved | Your Store</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
