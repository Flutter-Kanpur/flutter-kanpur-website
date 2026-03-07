'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dashboard from '@/components/dashboardv2/dashboard/Dashboard';
import SearchScreen from '@/components/dashboardv2/searchScreen/SearchScreen';
import BottomNavBar from '@/components/dashboardv2/bottomNavBar/BottomNavBar';

/**
 * DashboardClient — Client-side wrapper that manages screen state.
 *
 * @param {Array} events        – Event objects from Firestore
 * @param {Array} announcements – Announcement objects from Firestore
 */
const DashboardClient = ({ events = [], announcements = [] }) => {
    const [activeScreen, setActiveScreen] = useState('dashboard');

    // Search screen is a full overlay — no bottom nav
    if (activeScreen === 'search') {
        return (
            <SearchScreen
                events={events}
                onBack={() => setActiveScreen('dashboard')}
            />
        );
    }

    return (
        <>
            <Dashboard
                events={events}
                announcements={announcements}
                onSearchClick={() => setActiveScreen('search')}
            />
            <BottomNavBar />
        </>
    );
};

export default DashboardClient;
