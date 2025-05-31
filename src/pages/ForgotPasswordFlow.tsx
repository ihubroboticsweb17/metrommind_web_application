import StepEnterEmail from './StepEnterEmail';
import StepVerifyOtp from './StepVerifyOtp';
import StepResetPassword from './StepResetPassword';
import { useState } from 'react';

const ForgotPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  return (
    <div className="forgot-password-container">
      
      {step === 1 && <StepEnterEmail setStep={setStep} setUserId={setUserId} setEmail={setEmail} />}
      {step === 2 && <StepVerifyOtp setStep={setStep} userId={userId} />}
      {step === 3 && <StepResetPassword userId={userId} />}
    </div>
  );
};

export default ForgotPasswordFlow;useState