import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Opening() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        setErrors({});
        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setErrors({ submit: result.message });
            }
        } catch (error) {
            setErrors({ submit: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = () => {
        navigate('/product');
    };

    return ( 
        <div className='container p-5 mb-5 mt-5'>
            <div className='row text-center mb-5 mt-5'>
                <div className='col-12 mb-4'>
                    <h4>Open a free demat and trading account online</h4>
                    <p>Start investing brokerage free and join a community of 1.6+ crore investors and traders</p>
                </div>

                <div className='col-md-6 mb-4'>
                    <img src = "media/images/console-coin.png.jpg" alt = "console-coin" className='img-fluid' />
                </div>

                <div className='col-md-6'>
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h5 className="card-title text-center mb-3">Login to your account</h5>
                            <p className="text-center text-muted mb-4">
                                Don't have an account? <a href="#signup-form" className="text-primary text-decoration-none">Sign up now</a>
                            </p>

                            {errors.submit && (
                                <div className="alert alert-danger alert-sm">{errors.submit}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ padding: '10px 12px', fontSize: '14px' }}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        style={{ padding: '10px 12px', fontSize: '14px' }}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100"
                                    style={{ backgroundColor: '#387ed1', borderColor: '#387ed1', padding: '10px' }}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <Link to="/login" className="btn btn-outline-primary btn-sm">
                                    Go to full login page
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-5 mb-5 align-items-center'>
                <div className='col-md-6'>
                    <div className="feature-item mb-4">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa fa-line-chart text-primary me-3" style={{ fontSize: '24px' }}></i>
                            <h6 className="mb-0 fw-bold">Stocks</h6>
                        </div>
                        <p className="text-muted ms-5">Invest in all exchange-listed securities</p>
                    </div>
                    
                    <div className="feature-item mb-4">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa fa-credit-card-alt text-primary me-3" style={{ fontSize: '24px' }}></i>
                            <h6 className="mb-0 fw-bold">IPO</h6>
                        </div>
                        <p className="text-muted ms-5">Apply to the latest IPOs instantly via UPI</p>
                    </div>
                </div>
                
                <div className='col-md-6'>
                    <div className="feature-item mb-4">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa fa-address-card text-primary me-3" style={{ fontSize: '24px' }}></i>
                            <h6 className="mb-0 fw-bold">Mutual Funds</h6>
                        </div>
                        <p className="text-muted ms-5">Invest in commission-free direct mutual funds</p>
                    </div>

                    <div className="feature-item mb-4">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa fa-address-book-o text-primary me-3" style={{ fontSize: '24px' }}></i>
                            <h6 className="mb-0 fw-bold">Futures & Options</h6>
                        </div>
                        <p className="text-muted ms-5">Hedge and mitigate market risk through simplified F&O trading</p>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12 text-center">
                    <button onClick={handleButtonClick} 
                        className="btn btn-primary btn-lg px-4 py-2"
                        style={{ backgroundColor: '#387ed1', borderColor: '#387ed1' }}
                    >
                        Explore Investments
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Opening;