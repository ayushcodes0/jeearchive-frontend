'use client';

import Styles from './VerifyEmail.module.css';
import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthButton } from '../AuthButton/AuthButton';
import { FormError } from '../FormError/FormError';
import Logo from '../../../../public/images/logo.png';

export function VerifyEmail() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    // Only allow single digit
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      if (otp[index] !== '') {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (pastedData.match(/^\d+$/)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp);
      
      // Focus on the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpValue }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP code');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    try {
      // TODO: Replace with actual API call
      await fetch('/api/auth/resend-otp', {
        method: 'POST',
      });
      // Show success message or toast
      alert('OTP sent successfully!');
    } catch (err) {
      setError('Failed to resend OTP');
      console.log(err);
    }
  };

  return (
    <div className={Styles.verificationFormContainer}>
      <div className={Styles.verificationHeader}>
        <Image 
          src={Logo} 
          alt="jeearchive-logo" 
          width={60}
          height={60}
          className={Styles.logo}
        />
        <h2 className={Styles.verificationHeading}>Verify your email</h2>
        <p className={Styles.verificationSubtext}>
          We have sent a 6-digit code to your email. Please enter it below.
        </p>
      </div>

      <FormError message={error} />

      <form onSubmit={handleSubmit} className={Styles.verificationForm}>
        <div className={Styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className={Styles.otpInput}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <AuthButton type="submit" loading={loading}>
          <div className='font-medium'>Verify Email</div>
        </AuthButton>

        <div className={Styles.resendSection}>
          <p className={Styles.resendText}>
            Did not receive the code?{' '}
            <button
              type="button"
              onClick={handleResendOTP}
              className={Styles.resendButton}
            >
              Resend OTP
            </button>
          </p>
        </div>

        <p className={Styles.onboardingNavigationText}>
          Wrong email?{' '}
          <Link href="/signup" className={`${Styles.onboardingNavigation} font-medium`}>
            Go back
          </Link>
        </p>
      </form>
    </div>
  );
}
