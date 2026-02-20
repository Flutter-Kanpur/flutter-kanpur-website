'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/server/setup';
import { getContributorStatus } from '@/lib/firebase/server/server-actions';

import BottomNav from '@/components/contributorCommunityV2/BottomNav';
import JoinAsContributor from '@/components/contributorCommunityV2/components/JoinAsContributor';
import AlreadyContributor from '@/components/contributorCommunityV2/components/AlreadyContributor';
import ApplicationUnderReview from '@/components/contributorCommunityV2/components/ApplicationRe'
import ApplicationRejected from '@/components/contributorCommunityV2/components/ApplicationRejected';
import AlreadySubmitted from '@/components/contributorCommunityV2/components/AlreadySubmitted';
import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';

export default function ContributorStatusPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState('none'); // none | pending | rejected | accepted
  const [contributorData, setContributorData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isStrictMobile = useMediaQuery('(max-width:425px)');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/profile');
        return;
      }

      setIsLoggedIn(true);

      try {
        const result = await getContributorStatus(user.uid);

        if (!result.exists) {
          setUserStatus('none');
        } else {
          setContributorData(result.data);

          if (result.data.isApproved === true) {
            setUserStatus('accepted');
          } else if (result.data.status === 'rejected') {
            setUserStatus('rejected');
          } else {
            setUserStatus('pending');
          }
        }
      } catch (error) {
        console.error('Error checking contributor status:', error);
        setUserStatus('none');
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

  // Render the appropriate screen based on status
  const renderContent = () => {
    switch (userStatus) {
      case 'accepted':
        return <AlreadyContributor data={contributorData} />;
      case 'pending':
        return <AlreadySubmitted data={contributorData} />;
      case 'rejected':
        return <ApplicationRejected data={contributorData} />;
      case 'none':
      default:
        return <JoinAsContributor />;
    }
  };

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header: Only visible on strict mobile ≤ 425px */}
      {isStrictMobile && (
        <GradientHeader
          title="Join as a Contributor"
          onBack={() => router.back()}

        />
      )}

      {/* Content Section */}
      <Box sx={{
        width: '100%',
        mt: { xs: 0, md: 4 },
        ml: { xs: 0, md: '280px' },
        maxWidth: { md: 'calc(100% - 280px)' },
        pb: '100px'
      }}>
        {renderContent()}
      </Box>

      {/* Bottom Navigation: Only on strict mobile */}
      {isStrictMobile && <BottomNav />}
    </Box>
  );
}