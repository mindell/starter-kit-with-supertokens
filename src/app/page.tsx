'use client';

import Image from "next/image";
import Link from "next/link";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { redirectToAuth } from 'supertokens-auth-react';

export default function Home() {
  const session = useSessionContext();

  const handleLogin = () => {
    redirectToAuth();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
              />
            </div>
            <div>
              {session.loading ? (
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              ) : session.doesSessionExist ? (
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="py-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Modern Next.js</span>
              <span className="block text-indigo-600">Starter Template</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get started with a production-ready Next.js template featuring TypeScript, Tailwind CSS, and SuperTokens authentication.
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <Link
                href="https://github.com/your-repo"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-full shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Documentation
              </Link>
            </div>
          </div>

          {/* Feature Section */}
          <div className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="rounded-lg p-2 bg-indigo-100 dark:bg-indigo-900 inline-block">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Lightning Fast</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300">Built on Next.js 14 with server components and streaming SSR.</p>
            </div>

            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="rounded-lg p-2 bg-indigo-100 dark:bg-indigo-900 inline-block">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Secure Auth</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300">Integrated SuperTokens authentication with session management.</p>
            </div>

            <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="rounded-lg p-2 bg-indigo-100 dark:bg-indigo-900 inline-block">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Modern Stack</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300">TypeScript, Tailwind CSS, and modern development tools.</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p> 2024 Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
