"use client"

import { usePathname } from 'next/navigation';

const getBackground = (page) => {
    if (page?.startsWith('/dashboard')) return 'transparent';
    switch (page) {
        case '/':
            return 'radial-gradient(circle at 50% 8%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
        case '/members':
            return 'radial-gradient(circle at 50% 15%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 7%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
        case '/blog2':
            return 'radial-gradient(circle at 50% 32%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 29%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
        case '/communityPage':
            return 'radial-gradient(circle at 50% 30%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 29%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)'
        case '/events':
            return 'radial-gradient(circle at 50% 26%, rgba(9, 186, 240, 0.15) 0%, rgba(63, 209, 255, 0.01) 25%, transparent 50%), radial-gradient(circle at 50% 45%, rgb(1, 9, 11) 36%, rgb(10, 10, 17) 100%)';
        default:
            return 'auto';
    }
};

export default function LayoutBackground({ children }) {
    const pathname = usePathname();
    // console.log(pathname, "pathname");
    return (
        <div
            style={{
                minHeight: '100vh',
                background: getBackground(pathname),
            }}
        >
            {children}
        </div>
    );
}
