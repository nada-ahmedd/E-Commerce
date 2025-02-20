import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
<section className="hero py-5" style={{ backgroundColor: "#d6d6d6", color: "black" }}>
      <div className="container">
        <div className="row align-items-center">
          
          <div className="col-md-4">
            <h1 className="fw-bold display-4">Upgrade Your Shopping Experience</h1>
            <p className="lead"> Explore a wide range of products, from fashion to home essentials, all at unbeatable prices. </p>

            <Link to="/shop" className="btn btn-warning btn-lg px-4">
              Shop Now <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>

        <div className="col-md-8 text-center"> 
  <img
    src="public/images/hero.webp"
    alt="Shopping"
    className="img-fluid rounded shadow w-80"
  />
</div>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;
