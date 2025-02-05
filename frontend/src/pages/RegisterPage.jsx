import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../components/Header';
import * as Yup from 'yup';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { User, Mail, ShieldCheck, Eye, EyeOff, UserPlus } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = { name: '', email: '', password: '' };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await api.post('/auth/register', values);
      toast.success('Registered successfully! Please log in.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
          background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #064e3b 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="position-absolute" style={{
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          bottom: '-150px', right: '-100px'
        }}></div>
        <div className="position-absolute" style={{
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          top: '-50px', left: '-50px'
        }}></div>

        <div className="card shadow-lg border-0 p-0 overflow-hidden" style={{ maxWidth: '460px', width: '100%', borderRadius: '20px' }}>
          <div className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
              }}>
                <UserPlus size={28} color="white" />
              </div>
              <h3 className="fw-bold">Create Account</h3>
              <p className="text-muted small">Join SplitPal to manage your expenses smarter</p>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <User size={18} color="#10b981" />
                      </span>
                      <Field name="name" type="text" className="form-control" placeholder="John Doe"
                        style={{ borderLeft: 'none', borderRadius: '0 10px 10px 0', border: '1.5px solid #e2e8f0' }} />
                    </div>
                    <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Email</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <Mail size={18} color="#10b981" />
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
                        <ShieldCheck size={18} color="#10b981" />
                      </span>
                      <Field name="password" type={showPassword ? "text" : "password"} className="form-control"
                        placeholder="Min 6 characters"
                        style={{ borderLeft: 'none', borderRight: 'none', border: '1.5px solid #e2e8f0' }} />
                      <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderLeft: 'none', borderRadius: '0 10px 10px 0', cursor: 'pointer' }}>
                        {showPassword ? <EyeOff size={18} color="#10b981" /> : <Eye size={18} color="#10b981" />}
                      </span>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="termsCheck" />
                    <label className="form-check-label small" htmlFor="termsCheck">
                      I agree to the <a href="#" className="text-decoration-none" style={{ color: '#10b981' }}>Terms of Service</a> and <a href="#" className="text-decoration-none" style={{ color: '#10b981' }}>Privacy Policy</a>
                    </label>
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-success w-100 fw-semibold py-2 mb-3">
                    {isSubmitting ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Creating account...</>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center gap-2"><UserPlus size={18} /> Create Account</span>
                    )}
                  </button>

                  <div className="text-center">
                    <small className="text-muted">
                      Already have an account? <Link to="/" className="text-decoration-none fw-bold" style={{ color: '#10b981' }}>Sign In</Link>
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

export default Register;
