'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/server/setup';
import { getContributorStatus } from '@/lib/firebase/server/server-actions';

import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';
import MyContributions from '@/components/contributorCommunityV2/components/MyContributions';
import ActiveContributorDashboard from '@/components/contributorCommunityV2/components/ActiveContributorDashboard';
import ApplicationUnderReview from '@/components/contributorCommunityV2/components/ApplicationRe';
import BottomNav from '@/components/contributorCommunityV2/BottomNav';

export default function MyContributionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState('none'); // none | pending | approved
  const [contributorData, setContributorData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/profile');
        return;
      }

      try {
        const result = await getContributorStatus(user.uid);

        if (result.exists && result.data) {
          setContributorData(result.data);

          if (result.data.isApproved === true) {
            setUserStatus('approved');
          } else if (result.data.status === 'pending') {
            setUserStatus('pending');
          } else {
            setUserStatus('none');
          }
        } else {
          setUserStatus('none');
        }
      } catch (error) {
        console.error('Error checking contributor status:', error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#fff' }}>
        <CircularProgress />
      </Box>
    );
  }

  const renderContent = () => {
    switch (userStatus) {
      case 'approved':
        return <ActiveContributorDashboard data={contributorData} />;
      case 'pending':
        return <ApplicationUnderReview data={contributorData} />;
      case 'none':
      default:
        return (
          <MyContributions
            onJoinClick={() => router.push('/profile/contributor')}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        bgcolor: '#fff'
      }}
    >
      {/* Gradient Header WITH back button */}
      <GradientHeader
        title="My Contributions"
        onBack={() => router.back()}
      />

      {/* Main Content */}
      {renderContent()}

      {/* Bottom Navigation */}
      <BottomNav />
    </Box>
  );
}
