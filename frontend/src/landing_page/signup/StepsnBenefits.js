import React from 'react';

function StepsnBenefits() {
    return ( 
        <div className="container py-5">

            {/* Steps Section */}
            <div className="row align-items-center mb-5 py-5 bg-light rounded-3">
                <div className="col-12 mb-4">
                    <h3 className="text-center fw-bold">Open your account in 3 simple steps</h3>
                    <p className="text-center text-muted">Get started with your investment journey today</p>
                </div>
                <div className="col-md-6">
                    <img src="media/images/Steps.jpg" alt="Steps to open account" className="img-fluid rounded shadow-sm" />
                </div>
                <div className="col-md-6">
                    <div className="ps-md-4">
                        <div className="d-flex mb-4">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '18px', fontWeight: 'bold' }}>
                                1
                            </div>
                            <div>
                                <h5 className="fw-bold mb-2">Fill out the application</h5>
                                <p className="text-muted mb-0">Provide your basic information and upload required documents online</p>
                            </div>
                        </div>
                        
                        <div className="d-flex mb-4">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '18px', fontWeight: 'bold' }}>
                                2
                            </div>
                            <div>
                                <h5 className="fw-bold mb-2">Complete verification</h5>
                                <p className="text-muted mb-0">Digital signature and identity verification through e-KYC process</p>
                            </div>
                        </div>
                        
                        <div className="d-flex">
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '18px', fontWeight: 'bold' }}>
                                3
                            </div>
                            <div>
                                <h5 className="fw-bold mb-2">Start investing!</h5>
                                <p className="text-muted mb-0">Fund your account and begin your investment journey immediately</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="row align-items-center mb-5 mt-5 p-5 py-5">
                <div className='col-md-6 mb-4'>
                    <img src="media/images/Benefits.jpg" alt="Benefits of account" className="img-fluid rounded shadow-sm" />
                </div>

                <div className='col-md-6'>
                    <div className="benefit-item mb-4">
                        <h5 className="fw-bold mb-2" style={{ color: '#333' }}>Unbeatable pricing</h5>
                        <p className="text-muted">Zero charges for equity & mutual fund investments. Flat ₹20 fees for intraday and F&O trades.</p>
                    </div>

                    <div className="benefit-item mb-4">
                        <h5 className="fw-bold mb-2" style={{ color: '#333' }}>Best investing experience</h5>
                        <p className="text-muted">Simple and intuitive trading platform with an easy-to-understand user interface.</p>
                    </div>

                    <div className="benefit-item mb-4">
                        <h5 className="fw-bold mb-2" style={{ color: '#333' }}>No spam or gimmicks</h5>
                        <p className="text-muted">Committed to transparency — no gimmicks, spam, "gamification", or intrusive push notifications.</p>
                    </div>

                    <div className="benefit-item">
                        <h5 className="fw-bold mb-2" style={{ color: '#333' }}>The Zerodha universe</h5>
                        <p className="text-muted">More than just an app — gain free access to the entire ecosystem of our partner products.</p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default StepsnBenefits;