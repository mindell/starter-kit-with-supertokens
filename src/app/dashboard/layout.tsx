'use client';

import { useRouter } from 'next/navigation';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Projects', href: '/dashboard/projects', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { name: 'Reports', href: '/dashboard/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { name: 'Pricing', href: '/dashboard/subscription', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSessionContext();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    planId: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    if (!session.loading && session.doesSessionExist) {
      // Get user info when session exists
      session.accessTokenPayload?.email && setUserEmail(session.accessTokenPayload.email);
      
      // Fetch subscription status
      const fetchSubscriptionStatus = async () => {
        try {
          const response = await fetch('/api/subscription-status');
          if (response.ok) {
            const data = await response.json();
            setSubscriptionStatus(data);
          }
        } catch (error) {
          console.error('Error fetching subscription:', error);
        }
      };
      
      fetchSubscriptionStatus();
    }
    if (!session.loading && !session.doesSessionExist) {
      router.push('/auth');
    }
  }, [session, router]);

  if (session.loading || !session.doesSessionExist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        ></div>
      )}

      {/* Layout container */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <Image
                src="/next.svg"
                alt="Logo"
                width={100}
                height={24}
                className="dark:invert"
              />
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden -mr-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-5 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v-8m-6 4h6" />
              </svg>
              Logout
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 w-full">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 shadow">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <div className="flex w-full md:ml-0">
                  {/* Subscription Status Badge */}
                  {subscriptionStatus && (
                    <div className="flex items-center mr-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${subscriptionStatus.planId === 'free' 
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          : subscriptionStatus.planId === 'pro'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                        {subscriptionStatus.planId.charAt(0).toUpperCase() + subscriptionStatus.planId.slice(1)} Plan
                      </span>
                    </div>
                  )}
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      placeholder="Search"
                      className="block h-full w-full border-transparent py-2 pl-10 pr-3 text-gray-900 dark:text-white placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300">{userEmail}</span>
              </div>
            </div>
          </div>

          <main className="py-6">
            <div className="mx-auto px-2 sm:px-4 md:px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
