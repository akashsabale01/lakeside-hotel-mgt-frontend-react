import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const NavBarOld = ({ user, logout }) => {
    const [showAccount, setShowAccount] = useState(false);

    const handleAccountClick = () => {
        setShowAccount(!showAccount);
    };

    // const isLoggedIn = localStorage.getItem("token");
    // console.log("isLoggedIn: ", isLoggedIn);
    // const userRole = localStorage.getItem("userRole");
    // console.log("userRole: ", userRole);

    const isLoggedIn = user!=null;
    console.log("isLoggedIn: ", isLoggedIn);
    const userRole = (isLoggedIn)? user.role.toUpperCase():"";
    console.log("userRole: ", userRole);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 py-2 w-100 shadow sticky-top">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">LakeSide Hotel</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/room-list"}>
                                Browse all rooms
                            </NavLink>
                        </li>

                        {isLoggedIn && userRole === "ADMIN" && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Find my booking
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/add-booking"}>
                                Add Booking
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}>
                                Account
                            </a>

                            <ul
                                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby="navbarDropdown">
                                {isLoggedIn ? (
                                    <li>
                                        {/* <Link className="dropdown-item" to={"/logout"}>
                                            Logout
                                        </Link> */}
                                        <button onClick={logout} className="btn btn-secondary dropdown-item">
                                            Logout
                                        </button>
                                    </li>
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to={"/login"}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBarOld;
