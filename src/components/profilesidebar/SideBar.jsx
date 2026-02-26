'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Collapse } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';


import {
    LogoIcon,
    ProfileOverviewIcon,
    EditProfileIcon,
    AccountSettingsIcon,
    NotificationPreferencesIcon,
    LoginSecurityIcon,
    DashboardIcon,
    MyEventsIcon,
    MyContestsIcon,
    ProblemOfTheDayIcon,
    PracticeHistoryIcon,
    SavedItemsIcon,
    MyContributionsIcon,
    ForumDiscussionsIcon,
    JoinContributorIcon,
    CommunityGuidelinesIcon,
    ProjectSubmissionsIcon,
    LogoutIconSvg,
    ContactSupportIcon,
    ChevronDownIcon,
} from './SideBarIcons';

const SideBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const outfitFont = 'var(--font-product-sans)';

    const [openSections, setOpenSections] = useState({
        account: true,
        activity: true,
        community: true,
    });

    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const notifDoc = await getDoc(doc(db, 'notifications', user.uid));
                    if (notifDoc.exists()) {
                        const data = notifDoc.data();
                        setNotificationCount(data.unreadCount || 0);
                    }
                } catch (error) {
                    console.error('Error fetching notification count:', error);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    const isActivePath = (path) => pathname === path;

    const inactiveColor = '#6D6D6D';
    const activeColor = '#000000';

    const sections = [
        {
            key: 'account',
            title: 'ACCOUNT',
            items: [
                { label: 'Profile Overview', Icon: ProfileOverviewIcon, path: '/profile', badge: notificationCount },
                { label: 'Edit Profile', Icon: EditProfileIcon, path: '/profile/edit' },
                { label: 'Account Settings', Icon: AccountSettingsIcon, path: '/profile/manage' },
                { label: 'Notification Preferences', Icon: NotificationPreferencesIcon, path: '/notifications' },
                { label: 'Login & Security', Icon: LoginSecurityIcon, path: '/profile/security' },
            ],
        },
        {
            key: 'activity',
            title: 'MY ACTIVITY',
            items: [
                { label: 'Dashboard', Icon: DashboardIcon, path: '/profile/dashboard' },
                { label: 'My Events', Icon: MyEventsIcon, path: '/profile/events' },
                { label: 'My Contests', Icon: MyContestsIcon, path: '/profile/contests' },
                { label: 'Problem of the Day', Icon: ProblemOfTheDayIcon, path: '/profile/potd' },
                { label: 'Practice History', Icon: PracticeHistoryIcon, path: '/profile/history' },
                { label: 'Saved Items', Icon: SavedItemsIcon, path: '/profile/saved' },
            ],
        },
        {
            key: 'community',
            title: 'COMMUNITY',
            items: [
                { label: 'My Contributions', Icon: MyContributionsIcon, path: '/profile/mycontribution' },
                { label: 'Forum Discussions', Icon: ForumDiscussionsIcon, path: '/profile/forum' },
                { label: 'Join as a Contributor', Icon: JoinContributorIcon, path: '/profile/contributor' },
                { label: 'Community Guidelines', Icon: CommunityGuidelinesIcon, path: '/profile/communityrules' },
                { label: 'Project Submissions', Icon: ProjectSubmissionsIcon, path: '/profile/projects' },
            ],
        },
    ];

    return (
        <Box
            sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                width: '280px',
                minWidth: '280px',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                bgcolor: '#F9F9F9',
                borderRight: '1px solid #EBEBEB',
                overflowY: 'auto',
                zIndex: 1100,
                py: 3,
                px: 2,
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    bgcolor: '#D1D5DB',
                    borderRadius: '4px',
                },
            }}
        >
            {/* Logo */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 4,
                    px: 1,
                    cursor: 'pointer',
                }}
                onClick={() => router.push('/')}
            >
                <img
                    src="/assets/sidelogo.png"
                    alt="FlutterKanpur"
                    style={{ height: '32px', objectFit: 'contain' }}
                />
            </Box>

            {/* Sections */}
            {sections.map((section) => (
                <Box key={section.key} sx={{ mb: 3 }}>
                    {/* Section header */}
                    <Box
                        onClick={() => toggleSection(section.key)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: 1,
                            mb: 1,
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 500,
                                fontFamily: outfitFont,
                                color: '#9E9E9E',
                                letterSpacing: '0.5px',
                            }}
                        >
                            {section.title}
                        </Typography>
                        <Box
                            sx={{
                                transition: 'transform 0.2s ease',
                                transform: openSections[section.key] ? 'rotate(0deg)' : 'rotate(-90deg)',
                                display: 'flex',
                            }}
                        >
                            <ChevronDownIcon />
                        </Box>
                    </Box>

                    {/* Section items */}
                    <Collapse in={openSections[section.key]}>
                        {section.items.map((item) => {
                            const active = isActivePath(item.path);
                            const itemColor = active ? activeColor : inactiveColor;
                            return (
                                <Box
                                    key={item.label}
                                    onClick={() => router.push(item.path)}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        px: 1.5,
                                        py: 1.2,
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        bgcolor: active ? '#FFFFFF' : 'transparent',
                                        boxShadow: active ? '0px 1px 3px rgba(0,0,0,0.06)' : 'none',
                                        '&:hover': {
                                            bgcolor: active ? '#FFFFFF' : '#F0F0F0',
                                        },
                                    }}
                                >
                                    <item.Icon color={itemColor} />
                                    <Typography
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: active ? 500 : 500,
                                            fontFamily: outfitFont,
                                            color: itemColor,
                                            flex: 1,
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                    {item.badge > 0 && (
                                        <Box
                                            sx={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                bgcolor: '#EF4444',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>
                                                {item.badge}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </Collapse>
                </Box>
            ))}

            {/* Spacer */}
            <Box sx={{ flex: 1 }} />

            {/* Bottom actions */}
            <Box sx={{ mt: 2, borderTop: '1px solid #EBEBEB', pt: 2 }}>
                <Box
                    onClick={handleLogout}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 1.5,
                        py: 1.2,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#FEF2F2' },
                    }}
                >
                    <LogoutIconSvg color="#EF4444" />
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: outfitFont,
                            color: '#EF4444',
                        }}
                    >
                        Log out
                    </Typography>
                </Box>

                <Box
                    onClick={() => router.push('/support')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 1.5,
                        py: 1.2,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: '#F0F0F0' },
                    }}
                >
                    <ContactSupportIcon color={inactiveColor} />
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            fontFamily: outfitFont,
                            color: inactiveColor,
                        }}
                    >
                        Contact support
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SideBar;
