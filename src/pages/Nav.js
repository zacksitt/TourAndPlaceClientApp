import { Outlet, Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="/places">Place</a>
        <a className="p-2 text-dark" href="/tours">Tour</a>
      </nav>
    </div>
    </>
  )
};

export default Nav;