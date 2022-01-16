import { memo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContextElement } from "../../App";

import style from "./Home.module.scss";

function Home() {
  let { setToDashBoard } = useContext(ContextElement);

  useEffect(() => {
    setToDashBoard(false);
  }, []);

  return (
    <>
      <div className="App">
        <section className="nikeapp-section container mb-5 mt-1">
          <div className="nikeapp-section-img ">
            <Link to="/app">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_2.0/w_1101,c_limit/7a1bedb5-5cfa-4fa0-a38a-397ed691cbc6/nike-just-do-it.jpg"
                alt="app-img"
              />
            </Link>
          </div>
          <div className="nikeapp-section-desc section-desc text-center mt-4">
            <h1>YOUR NIKE CONNECTION</h1>
            <p>More sport, more inspriration, more Nike!</p>
            <Link to="/app">
              <button type="button" className="btn btn-dark">
                Get Your Great
              </button>
            </Link>
          </div>
        </section>

        <section className="nikeproduct container mb-5 mt-1">
          <div className="nikeproduct-img ">
            <Link to="/products">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/w_1151,c_limit/bd91e07e-4351-43f3-811b-d8dbd1df6bba/nike-just-do-it.jpg"
                alt="product-img"
              />
            </Link>
          </div>
          <div className="nikeproduct-desc section-desc text-center mt-4">
            <p className="m-0">Member Access: EKIDEN PACK</p>
            <h2 className="h2-bold">RISE TOGETHER</h2>
            <p className={`${style.nikeproduct_text}`}>
              “EKIDEN PACK” is a running collection inspired by the mountainous
              terrain that Ekiden Runners take on for Japan's most popular Race
              during the New Year.
              <br />
              <br />
              The latest collection incorporates flaming colours that represent
              the sunrise as the Race begins, and the passionate energy
              surrounding the event. The Dazzle Camo pattern draws inspiration
              from cityscapes including the Scramble Crossing in Tokyo. Let's
              rise together, to a new era.
            </p>
            <Link to="/products">
              <button type="button" className="btn btn-dark mt-3">
                Shop
              </button>
            </Link>
          </div>
        </section>

        <section className="nikeproduct container mb-5 mt-1 position-relative">
          <div className="nikeproduct-img ">
            <Link to="/products">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/w_1151,c_limit/ae60423a-6b06-4972-b5c6-0c40acad98da/nike-just-do-it.png"
                alt="product-img"
              />
            </Link>
          </div>
          <div
            className={`${style.nikeproduct_position} section-desc mt-4 position-absolute`}
          >
            <h2 className="h2-bold">NEW YEAR, NEW YOU</h2>
            <p className="">Get moving in our latest styles.</p>
            <Link to="/products">
              <button type="button" className="btn btn-dark mt-3">
                Shop
              </button>
            </Link>
          </div>
        </section>

        <section className="nikeproduct container mb-5 mt-1">
          <div className="nikeproduct-img ">
            <Link to="/products">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_2.0/w_1101,c_limit/59a48171-ba35-4f32-b293-f94655497942/nike-just-do-it.jpg"
                alt="product-img"
              />
            </Link>
          </div>
          <div className="nikeproduct-desc section-desc text-center mt-4">
            <h2 className="h2-bold">REACH FUTHER</h2>
            <p>
              Welcome to the space where we're always practicing, learning, and
              growing. Where flushed
              <br /> faces, tumbling poses, and sore muscles are embraced. A
              space that opens its arms to
              <br /> anyone, and everyone, ready to reach a little further.
            </p>
            <Link to="/products">
              <button type="button" className="btn btn-dark">
                Get Your Great
              </button>
            </Link>
          </div>
        </section>

        <section className="featured container mb-5 mt-1 position-relative">
          <h3 className="mb-3">Freatured</h3>
          <div className="row">
            <div className="col-12 col-md-6 mb-5">
              <div className={`${style.featured_left} position-relative`}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/h_700,c_limit/87c900c7-a4b0-450e-84bb-e8f90195570a/nike-just-do-it.jpg"
                  alt="product-img"
                />
                <div
                  className={`${style.featured_position} mt-4 text-white section-desc position-absolute`}
                >
                  <h5>
                    Nike App-Only Access:
                    <br />
                    Blazer Low '77 Jumbo
                  </h5>
                  <Link to="/products">
                    <button type="button" className="btn btn-light mt-3">
                      Shop
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className={`${style.featured_right} position-relative`}>
                <img
                  src="https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/h_700,c_limit/bc6d7b18-a6e4-44f0-b3f5-de0f40788b0e/nike-just-do-it.jpg"
                  alt="product-img"
                />
                <div
                  className={`${style.featured_position}  mt-4 section-desc position-absolute`}
                >
                  <h5>Air Force 1 '07</h5>
                  <Link to="/products">
                    <button type="button" className="btn btn-dark mt-3">
                      Shop
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="nikeproduct container mb-5 mt-1">
          <h3 className="mb-3">Trending</h3>
          <div className="nikeproduct-img">
            <Link to="/products">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/w_1151,c_limit/0f639af5-7e7d-4bc4-b7b1-901937f3df6b/nike-just-do-it.jpg"
                alt="product-img"
              />
            </Link>
          </div>
          <div className="nikeproduct-desc section-desc text-center mt-4">
            <h2 className="h2-bold">THE LEBRON XIX</h2>
            <p className={`${style.nikeproduct_text}`}>
              Step into LeBoron's world where there's always space to dominate..
            </p>
            <Link to="/products">
              <button type="button" className="btn btn-dark mt-3">
                SHOP
              </button>
            </Link>
          </div>
        </section>

        <section className="nikeproduct container mb-5 mt-1">
          <h3 className="mb-3">The Latest</h3>
          <div className="nikeproduct-img">
            <Link to="/products">
              <img
                src="https://static.nike.com/a/images/f_auto/dpr_1.5,cs_srgb/w_1151,c_limit/da063331-e355-4fa5-a191-6e568511a46f/nike-just-do-it.jpg"
                alt="product-img"
              />
            </Link>
          </div>
          <div className="nikeproduct-desc section-desc text-center mt-4">
            <p className="m-0">Member Access</p>
            <h2 className="h2-bold">JORDAN 23 ENGINEERED</h2>
            <p className={`${style.nikeproduct_text}`}>
              Gear up to take on the city in newly engineered Jordan attire
              designed with the planet in mind.
            </p>
            <Link to="/products">
              <button type="button" className="btn btn-dark mt-3">
                Shop
              </button>
            </Link>
          </div>
        </section>

        <section className="home-img">
          <div className="nikeproduct-img">
            <img
              src="https://static.nike.com/a/images/f_auto/dpr_2.0/w_1101,c_limit/5372f111-e51e-45a4-bd86-1cf90c4c438b/nike-just-do-it.jpg"
              alt=""
            />
          </div>
          <button type="button" className="btn btn-light home-btn ">
            <Link to="/products">See Products</Link>
          </button>
        </section>
      </div>
    </>
  );
}
export default memo(Home);
