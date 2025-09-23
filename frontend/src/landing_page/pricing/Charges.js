import React from 'react'

function Charges() {
    return (
        <div className="container">
            <div className="row p-3 mt-5 border-bottom">
                <h3>Charges Explained</h3>
            </div>
            
            <div className="row mt-2 p-2">
                {/* Left Column */}
                <div className="col-md-6 pe-4">
                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Securities/Commodities transaction tax</h6>
                        <p className="text-muted fs-6 lh-base">
                            Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.
                        </p>
                        <p className="text-muted fs-6 lh-base">
                            When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Transaction/Turnover Charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.
                        </p>
                        <ul className="text-muted fs-6 lh-base">
                            <li className="mb-2">BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)</li>
                            <li className="mb-2">BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.</li>
                            <li className="mb-2">BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.</li>
                            <li className="mb-2">BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Call & trade</h6>
                        <p className="text-muted fs-6 lh-base">
                            Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Stamp charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">NRI brokerage charges</h6>
                        <ul className="text-muted fs-6 lh-base">
                            <li className="mb-2">For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&O (whichever is lower).</li>
                            <li className="mb-2">For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
                            <li className="mb-2">₹500 + GST as yearly account maintenance charges (AMC) charges.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Account with debit balance</h6>
                        <p className="text-muted fs-6 lh-base">
                            If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Charges for Investor's Protection Fund Trust (IPFT) by NSE</h6>
                        <ul className="text-muted fs-6 lh-base">
                            <li className="mb-2">Equity and Futures - ₹10 per crore + GST of the traded value.</li>
                            <li className="mb-2">Options - ₹50 per crore + GST traded value (premium value).</li>
                            <li className="mb-2">Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Margin Trading Facility (MTF)</h6>
                        <ul className="text-muted fs-6 lh-base">
                            <li className="mb-2">MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.</li>
                            <li className="mb-2">MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.</li>
                            <li className="mb-2">MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6 ps-4">
                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">GST</h6>
                        <p className="text-muted fs-6 lh-base">
                            Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">SEBI Charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">DP (Depository participant) charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.
                        </p>
                        <ul className="text-muted fs-6 lh-base">
                            <li className="mb-2">Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.</li>
                            <li className="mb-2">Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Pledging charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            ₹30 + GST per pledge request per ISIN.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">AMC (Account maintenance charges)</h6>
                        <ul className="text-muted fs-6 lh-base">
                            <li className="mb-2">For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, <a href="#" style={{ textDecoration: "none", color: "#387ed1" }}>Click here</a></li>
                            <li className="mb-2">For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, <a href="#" style={{ textDecoration: "none", color: "#387ed1" }}>Click here</a></li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Corporate action order charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            ₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Off-market transfer charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            ₹25 per transaction.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Physical CMR request</h6>
                        <p className="text-muted fs-6 lh-base">
                            First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Payment gateway charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            ₹9 + GST (Not levied on transfers done via UPI)
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Delayed Payment Charges</h6>
                        <p className="text-muted fs-6 lh-base">
                            Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account. <a href="#" style={{ textDecoration: "none", color: "#387ed1" }}>Learn more.</a>
                        </p>
                    </div>

                    <div className="mb-4">
                        <h6 className="fw-bold fs-6">Trading using 3-in-1 account with block functionality</h6>
                        <ul className="text-muted fs-6 lh-base">
                            <li className="mb-2">Delivery & MTF Brokerage: 0.5% per executed order.</li>
                            <li className="mb-2">Intraday Brokerage: 0.05% per executed order.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='row mt-3 mb-5'>
                <h5>Disclaimer</h5>
                <p className="text-muted fs-6 lh-base">
                    For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.
                </p>
            </div>
        </div>
    );
}

export default Charges;