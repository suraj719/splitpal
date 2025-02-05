import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Mail, KeyRound, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await api.post('/auth/login', values);
      const { token, user } = res.data;
      login(token, user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Invalid credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 50%, #1e1b4b 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="position-absolute" style={{
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(139, 92, 246, 0.15)',
          top: '-100px', right: '-80px'
        }}></div>
        <div className="position-absolute" style={{
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.1)',
          bottom: '-80px', left: '-60px'
        }}></div>

        <div className="card shadow-lg border-0 p-0 overflow-hidden" style={{ maxWidth: '440px', width: '100%', borderRadius: '20px' }}>
          <div className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
              }}>
                <LogIn size={28} color="white" />
              </div>
              <h3 className="fw-bold" style={{ color: '#0f172a' }}>Welcome Back</h3>
              <p className="text-muted small">Sign in to continue to SplitPal</p>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Email</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <Mail size={18} color="#6366f1" />
                      </span>
                      <Field name="email" type="email" className="form-control" placeholder="you@example.com"
                        style={{ borderLeft: 'none', borderRadius: '0 10px 10px 0', border: '1.5px solid #e2e8f0' }} />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Password</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <KeyRound size={18} color="#6366f1" />
                      </span>
                      <Field name="password" type={showPassword ? "text" : "password"} className="form-control"
                        placeholder="Enter password"
                        style={{ borderLeft: 'none', borderRight: 'none', border: '1.5px solid #e2e8f0' }} />
                      <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderLeft: 'none', borderRadius: '0 10px 10px 0', cursor: 'pointer' }}>
                        {showPassword ? <EyeOff size={18} color="#6366f1" /> : <Eye size={18} color="#6366f1" />}
                      </span>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label small" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <small>
                      <Link to="/forgot-password" className="text-decoration-none" style={{ color: '#6366f1' }}>Forgot password?</Link>
                    </small>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-semibold py-2 mb-3" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Signing in...</>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center gap-2"><LogIn size={18} /> Sign In</span>
                    )}
                  </button>

                  <div className="text-center">
                    <small className="text-muted">
                      Don't have an account? <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#6366f1' }}>Sign Up</Link>
                    </small>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
