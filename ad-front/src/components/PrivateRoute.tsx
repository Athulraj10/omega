// components/PrivateRoute.tsx
'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type PropsType = {
  children: ReactNode;
  allowedRoles?: string[]; // Optional
};

export default function PrivateRoute({ children, allowedRoles = [] }: PropsType) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const role = userData?.role;

    if (!token || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [allowedRoles, router]);

  if (!authorized) {
    return null; // or a loader while checking
  }

  return <>{children}</>;
}
