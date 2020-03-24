import React, { Component } from 'react';
import Logo from '../../images/bp.png';

class Footer extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <footer className="section footer-classic context-dark bg-image">
                    <div className="container">
                    <div className="row row-30">
                        <div className="col-md-4 col-xl-5 mt-4">
                        <div className="pr-xl-4"><a className="brand" href="/"><img className="brand-logo-light" src={Logo} alt="" width="80" /></a>
                            <p>We are an award-winning creative agency, dedicated to the best result in web design, promotion, business consulting, and marketing.</p>
                            <p className="rights"><span>©  </span><span className="copyright-year">2020</span><span> </span><span>Waves</span><span>. </span><span>All Rights Reserved.</span></p>
                        </div>
                        </div>
                        <div className="col-md-4 mt-4">
                        <h5>Contacts</h5>
                        <dl className="contact-list">
                            <dt>Address:</dt>
                            <dd>Himachal India</dd>
                        </dl>
                        <dl className="contact-list">
                            <dt>email:</dt>
                            <dd><a href="mailto:#">pankaj@gmail.com</a></dd>
                        </dl>
                        <dl className="contact-list">
                            <dt>phones:</dt>
                            <dd><a href="tel:#">+91 9876543210</a> 
                            </dd>
                        </dl>
                        </div>
                        <div className="col-md-4 col-xl-3 mt-4">
                        <h5>Links</h5>
                        <ul className="nav-list">
                            <li><a href="/">About</a></li>
                            <li><a href="/">Blog</a></li>
                            <li><a href="/">Contacts</a></li>
                            <li><a href="/">Pricing</a></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
 
export default Footer;