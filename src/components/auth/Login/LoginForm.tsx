'use client';

import Styles from './LoginForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthInput } from '../AuthInput/AuthInput';
import { AuthButton } from '../AuthButton/AuthButton';
import { FormError } from '../FormError/FormError';
import Logo from '../../../../public/images/logo.png';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Styles.loginFormContainer}>
      <div className={Styles.loginHeader}>
        <Image 
          src={Logo} 
          alt="jeearchive-logo" 
          width={60}
          height={60}
          className={Styles.logo}
        />
        <h2 className={Styles.loginHeading}>Welcome back</h2>
      </div>

      <FormError message={error} />

      <form onSubmit={handleSubmit} className={Styles.loginForm}>
        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          required
          placeholder="you@example.com"
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          placeholder="••••••••"
        />

        <div className={Styles.formExtras}>
          <div className={Styles.rememberMe}>
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className={Styles.checkbox}
            />
            <label htmlFor="remember-me" className={Styles.checkboxLabel}>
              Remember me
            </label>
          </div>

          <Link href="/forgot-password" className={Styles.forgotPassword}>
            Forgot password?
          </Link>
        </div>


        <AuthButton type="submit" loading={loading}>
          <div className='font-medium'>Sign in</div>
        </AuthButton>
        <p className={Styles.onboardingNavigationText}>
          Dont have an account?{' '}
          <Link href="/signup" className={`${Styles.onboardingNavigation} font-medium`}>
            Sign up
          </Link>
        </p>
      </form>

      {/* <SocialAuth /> */}
    </div>
  );
}
