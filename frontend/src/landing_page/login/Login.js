import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from state, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
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

  // Handle form submission
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
        // Redirect to the original destination or dashboard
        navigate(from, { replace: true });
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-container" style={{ padding: '60px 0' }}>
            {/* Header */}
            <div className="text-center mb-4">
              <img 
                src="media/images/logo.svg" 
                alt="Zerodha" 
                style={{ width: '150px', marginBottom: '30px' }}
              />
              <h2 style={{ color: '#333', fontWeight: '600', marginBottom: '8px' }}>
                Login to Zerodha
              </h2>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Don't have an account? <Link to="/signup" style={{ color: '#387ed1', textDecoration: 'none' }}>Sign up now</Link>
              </p>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="alert alert-danger" style={{ borderRadius: '8px', marginBottom: '20px' }}>
                {errors.submit}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    border: '2px solid #e9ecef'
                  }}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="mb-4">
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '6px',
                    border: '2px solid #e9ecef'
                  }}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {/* Forgot Password Link */}
              <div className="text-end mb-3">
                <a href="#" style={{ color: '#387ed1', textDecoration: 'none', fontSize: '14px' }}>
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100"
                style={{
                  backgroundColor: '#387ed1',
                  borderColor: '#387ed1',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '6px'
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Additional Options */}
            <div className="text-center mt-4">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <hr style={{ flex: 1, border: '1px solid #e9ecef' }} />
                <span style={{ padding: '0 15px', color: '#666', fontSize: '14px' }}>or</span>
                <hr style={{ flex: 1, border: '1px solid #e9ecef' }} />
              </div>
              
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                New to trading? 
              </p>
              
              <Link 
                to="/signup"
                className="btn btn-outline-primary w-100"
                style={{
                  borderColor: '#387ed1',
                  color: '#387ed1',
                  padding: '10px',
                  borderRadius: '6px'
                }}
              >
                Open a free account
              </Link>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <p style={{ color: '#666', fontSize: '12px' }}>
                By continuing, you agree to our{' '}
                <a href="#" style={{ color: '#387ed1' }}>Terms & Conditions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;