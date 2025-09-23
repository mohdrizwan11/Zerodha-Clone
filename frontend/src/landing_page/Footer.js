import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)", color: "#6c757d" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5" style={{ color: "#6c757d" }}>
          <div className="col">
            <img src="media/images/logo.svg" style={{ width: "50%" }} />
            <p className="text-muted">
              &copy; 2010 - 2025, Zerodha Broking Ltd.
            </p>
            <p className="text-muted">All rights reserved.</p>
          </div>
          <div className="col">
            <p><strong>Account</strong></p>
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Open demat account</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Minor demat account</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>NRI demat account</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Commodity</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Dematerialisation</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Fund transfer</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>MTF</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Referral program</a>
            <br />
          </div>
          <div className="col">
            <p><strong>Support</strong></p>
            <Link to="/support" style={{ textDecoration: "none", color: "#6c757d" }}>Contact us</Link>
            <br />
            <Link to="/support" style={{ textDecoration: "none", color: "#6c757d" }}>Support portal</Link>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>How to file a complaint?</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Status of your complaints</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Bulletin</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Circular</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Z-Connect blog</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Downloads</a>
            <br />
          </div>
          <div className="col">
            <p><strong>Company</strong></p>
            <Link to="/about" style={{ textDecoration: "none", color: "#6c757d" }}>About</Link>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Philosophy</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Press & media</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Careers</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Zerodha Cares (CSR)</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Zerodha.tech</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Open source</a>
            <br />
          </div>
          <div className="col">
            <p><strong>Quick links</strong></p>
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Upcoming IPOs</a>
            <br />
            <Link to="/pricing" style={{ textDecoration: "none", color: "#6c757d" }}>Brokerage charges</Link>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Market holidays</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Economic calendar</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Calculators</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Markets</a>
            <br />
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Sectors</a>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances
          </p>

          <p>
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Smart Online Dispute Resolution</a> | <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Grievances Redressal Mechanism</a>
          </p>

          <p>
            Investments in securities market are subject to market risks; read all the related documents carefully before investing.
          </p>

          <p>
            Attention investors: 1) Stock brokers can accept securities as margins from clients only by way of pledge in the depository system w.e.f September 01, 2020. 2) Update your e-mail and phone number with your stock broker / depository participant and receive OTP directly from depository on your e-mail and/or mobile number to create pledge. 3) Check your securities / MF / bonds in the consolidated account statement issued by NSDL/CDSL every month.
          </p>

          <p>
            <strong>India's largest broker based on networth as per NSE.</strong> <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>NSE broker factsheet</a>
          </p>

          <p>
            "Prevent unauthorised transactions in your account. Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day. Issued in the interest of investors. KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary." Dear Investor, if you are subscribing to an IPO, there is no need to issue a cheque. Please write the Bank account number and sign the IPO application form to authorize your bank to make payment in case of allotment. In case of non allotment the funds will remain in your bank account. As a business we don't give stock tips, and have not authorized anyone to trade on behalf of others. If you find anyone claiming to be part of Zerodha and offering such services, please <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>create a ticket here</a>.
          </p>

          <div className="mt-4 text-center">
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>NSE</a>
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>BSE</a>
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>MCX</a>
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>Terms & conditions</a>
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>Policies & procedures</a>
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>Privacy policy</a>
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>Disclosure</a>
            <a href="" className="me-3" style={{ textDecoration: "none", color: "#6c757d" }}>For investor's attention</a>
            <a href="" style={{ textDecoration: "none", color: "#6c757d" }}>Investor charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
