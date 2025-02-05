import { Formik, Form, Field, ErrorMessage } from 'formik';
import Header from '../components/Header';
import * as Yup from 'yup';
import api from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Ticket, Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return '#94a3b8';
    if (passwordStrength === 1) return '#ef4444';
    if (passwordStrength === 2) return '#f59e0b';
    if (passwordStrength === 3) return '#06b6d4';
    return '#10b981';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await api.post('/auth/reset-password', {
        token: values.token,
        newPassword: values.password,
      });
      toast.success('Password reset successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
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
          background: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #f59e0b 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="position-absolute" style={{
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          top: '10%', left: '5%'
        }}></div>
        <div className="position-absolute" style={{
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          bottom: '15%', right: '10%'
        }}></div>

        <div className="card shadow-lg border-0 p-0 overflow-hidden" style={{ maxWidth: '460px', width: '100%', borderRadius: '20px' }}>
          <div className="p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{
                width: '64px', height: '64px', borderRadius: '16px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
              }}>
                <Lock size={28} color="white" />
              </div>
              <h3 className="fw-bold">Reset Your Password</h3>
              <p className="text-muted small">Enter your reset token and create a new password</p>
            </div>

            <Formik
              initialValues={{ token: '', password: '', confirmPassword: '' }}
              validationSchema={Yup.object({
                token: Yup.string().required('Token is required'),
                password: Yup.string().min(6, 'At least 6 characters').required('Required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Required'),
              })}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, handleChange }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">Reset Token</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <Ticket size={18} color="#6366f1" />
                      </span>
                      <Field name="token" type="text" className="form-control" placeholder="Paste your token"
                        style={{ borderLeft: 'none', borderRadius: '0 10px 10px 0', border: '1.5px solid #e2e8f0' }} />
                    </div>
                    <ErrorMessage name="token" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">New Password</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <Lock size={18} color="#6366f1" />
                      </span>
                      <Field name="password" type={showPassword ? "text" : "password"} className="form-control"
                        placeholder="New password"
                        style={{ borderLeft: 'none', borderRight: 'none', border: '1.5px solid #e2e8f0' }}
                        onChange={(e) => { handleChange(e); calculateStrength(e.target.value); }} />
                      <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}
                        style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderLeft: 'none', borderRadius: '0 10px 10px 0', cursor: 'pointer' }}>
                        {showPassword ? <EyeOff size={18} color="#6366f1" /> : <Eye size={18} color="#6366f1" />}
                      </span>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                    {values.password && (
                      <div className="mt-2 d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: '6px', borderRadius: '3px' }}>
                          <div className="progress-bar" style={{ width: `${passwordStrength * 25}%`, backgroundColor: getStrengthColor(), borderRadius: '3px' }} role="progressbar"></div>
                        </div>
                        <small style={{ color: getStrengthColor(), fontWeight: 500 }}>{getStrengthText()}</small>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold text-muted">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRight: 'none', borderRadius: '10px 0 0 10px' }}>
                        <Lock size={18} color="#6366f1" />
                      </span>
                      <Field name="confirmPassword" type={showPassword ? "text" : "password"} className="form-control"
                        placeholder="Confirm new password"
                        style={{ borderLeft: 'none', borderRadius: '0 10px 10px 0', border: '1.5px solid #e2e8f0' }} />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 fw-semibold py-2 mb-3">
                    {isSubmitting ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Resetting...</>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center gap-2"><CheckCircle2 size={18} /> Reset Password</span>
                    )}
                  </button>

                  <div className="text-center mt-3">
                    <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-1" style={{ color: '#6366f1' }}>
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

export default ResetPassword;
