import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../components/Header';
import * as Yup from 'yup';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await api.post('/auth/forgot-password', { email: values.email });
      toast.success('Password reset link sent to your email!');
      navigate('/reset-password');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
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
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4338ca 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="position-absolute" style={{
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          top: '20%', right: '10%'
        }}></div>
        <div className="position-absolute" style={{
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          bottom: '10%', left: '5%'
        }}></div>

        <div className="card shadow-lg border-0 p-0 overflow-hidden" style={{ maxWidth: '420px', width: '100%', borderRadius: '20px' }}>
          <div className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
              }}>
                <Mail size={28} color="white" />
              </div>
              <h3 className="fw-bold">Forgot Password?</h3>
              <p className="text-muted small">Enter your email to receive a reset link</p>
            </div>

            <Formik
              initialValues={{ email: '' }}
              validationSchema={Yup.object({
                email: Yup.string().email('Invalid email').required('Required'),
              })}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="form-label small fw-semibold text-muted">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <Mail size={18} color="#6366f1" />
                      </span>
                      <Field name="email" type="email" className="form-control" placeholder="you@example.com"
                        style={{ borderLeft: 'none', borderRadius: '0 10px 10px 0', border: '1.5px solid #e2e8f0' }} />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 fw-semibold py-2 mb-3">
                    {isSubmitting ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Sending...</>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center gap-2"><Send size={18} /> Send Reset Link</span>
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/" className="btn btn-outline-primary rounded-pill px-4 d-inline-flex align-items-center gap-2">
                      <ArrowLeft size={16} /> Back to Login
                    </Link>
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

export default ForgotPassword;
