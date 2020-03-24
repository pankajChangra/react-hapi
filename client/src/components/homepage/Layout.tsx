import React from 'react';
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <React.Fragment>
            <Navbar />
            <Homepage />
            <Footer />
        </React.Fragment>
    )
}