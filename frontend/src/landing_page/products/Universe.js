import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        
        <div className="col-4 p-3 mt-5">
          <a 
            href="https://www.zerodhafundhouse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            <img
              src="media/images/zerodhaFundhouse.png"
              style={{ width: "60%", height: "80px", objectFit: "contain" }}
            />
            <p className="text-small text-muted">
              Our asset management venture that is creating simple and transparent
              index funds to help you save for your goals.
            </p>
          </a>
        </div>


        <div className="col-4 p-3 mt-5">
          <a 
            href="https://sensibull.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
          <img
            src="media/images/sensibullLogo.svg"
            style={{ width: "60%", height: "80px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
          </a>
        </div>


        <div className="col-4 p-3 mt-5">
          <a 
            href="https://www.tijorifinance.com/ideas-dashboard/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
          <img
            src="media/images/tijori.jpg"
            style={{ width: "60%", height: "80px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
          </a>
        </div>


        <div className="col-4 p-3 mt-5">
          <a 
            href="https://www.streak.tech/home" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
          <img
            src="media/images/streakLogo.png"
            style={{ width: "60%", height: "80px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
          </a>
        </div>


        <div className="col-4 p-3 mt-5">
          <a 
            href="https://smallcase.zerodha.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
          <img
            src="media/images/smallcaseLogo.png"
            style={{ width: "60%", height: "80px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
          </a>
        </div>


        <div className="col-4 p-3 mt-5">
          <a 
            href="https://joinditto.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
          <img
            src="media/images/dittoLogo.png"
            style={{ width: "60%", height: "80px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
          </a>
        </div>


        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5 mt-5"
          style={{ width: "20%", margin: "0 auto", textDecoration: "none" }}
        >
          Signup Now
        </Link>
      </div>
    </div>
  );
}

export default Universe;
