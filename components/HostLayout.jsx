import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import logoutUrl from "/assets/images/logout-icon.png"

export default function HostLayout() {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616",
    }
     function fakeLogOut() {
        localStorage.removeItem("loggedin")
        location.reload()
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="income"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Income
                </NavLink>
                
                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>

                <NavLink
                    to="reviews"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Reviews
                </NavLink>
                <NavLink to="login" className="login-link">
               
               <button className="login-link-button"  onClick={fakeLogOut}>
               <img
                      
                       src={logoutUrl}
                       className="login-icon"
                   /></button>
                   </NavLink> 

            </nav>
            <Outlet />
        </>
    )
}