'use client';

import Styles from './SignupForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthInput } from '../AuthInput/AuthInput';
import { AuthButton } from '../AuthButton/AuthButton';
import { FormError } from '../FormError/FormError';
import Logo from '../../../../public/images/logo.png';

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setErrors({});
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    // const name = formData.get('name') as string;
    // const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;

    // Client-side validation
    const newErrors: Record<string, string> = {};
    
    if (password !== confirmPassword) {
      newErrors['confirm-password'] = 'Passwords do not match';
    }
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // });

      // if (!response.ok) {
      //   throw new Error('Email already exists');
      // }

      router.push('/verify-email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.signupFormContainer}>
      <div className={Styles.signupHeader}>
        <Image 
          src={Logo} 
          alt="jeearchive-logo" 
          width={60} // Adjust as needed
          height={60} // Adjust as needed
          className={Styles.logo}
        />
        <h2 className={Styles.signupHeading}>{"Let's get started"}</h2>
      </div>
      <FormError message={error} />

      <form onSubmit={handleSubmit} className={Styles.signupForm}>
        <AuthInput
          id="name"
          name="name"
          type="text"
          label="Full Name"
          required
          placeholder="John Doe"
          error={errors.name}
        />

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          required
          placeholder="you@example.com"
          error={errors.email}
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          placeholder="••••••••"
          error={errors.password}
        />

        <AuthInput
          id="confirm-password"
          name="confirm-password"
          type="password"
          label="Confirm Password"
          required
          placeholder="••••••••"
          error={errors['confirm-password']}
        />


        <AuthButton type="submit" loading={loading}>
          <div className='font-medium'>Create account</div>
        </AuthButton>
        <p className={Styles.onboardingNavigationText}>
          Already have an account?{' '}
          <Link href="/login" className={` ${Styles.onboardingNavigation} font-medium`}>
            Sign in
          </Link>
        </p>
      </form>

      {/* <SocialAuth /> */}
    </div>
  );
}