import type { Metadata } from 'next';
import './layout.css';

export const metadata: Metadata = {
  title: 'Authentication - Jeearchive',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='onboarding'>
      {children}
    </div>
  );
}
