'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/server/setup';
import { getContributorStatus } from '@/lib/firebase/server/server-actions';
import ApplicationSummary from '@/components/contributorCommunityV2/components/ApplicationSummary';
import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';

export default function SummaryPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isStrictMobile = useMediaQuery('(max-width:425px)');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/profile');
        return;
      }

      try {
        const result = await getContributorStatus(user.uid);

        if (result.exists && result.data) {
          setData({
            fullName: result.data.fullName || '',
            email: result.data.email || '',
            currentRole: result.data.currentRole || '',
            contribution: result.data.contributionOption || '',
            skills: result.data.relevantSkills || [],
            experience: result.data.experienceLevel || '',
            weeklyTime: result.data.timePerWeek || '',
            github: result.data.githubUrl || '',
            linkedin: result.data.linkedinUrl || '',
            portfolio: result.data.portfolioUrl || '',
            reason: result.data.whyContribute || '',
          });
        } else {
          router.push('/profile/contributor');
        }
      } catch (error) {
        console.error('Error fetching contributor data:', error);
        router.push('/profile/contributor');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#fff' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) return null;

  return (
    <Box sx={{
      bgcolor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header: Only visible on mobile ≤ 425px */}
      {isStrictMobile && (
        <GradientHeader
          title="Application Summary"

          onBack={() => router.back()}
        />
      )}

      {/* Content Section */}
      <Box sx={{
        width: '100%',
        ml: { xs: 0, md: '280px' },
        maxWidth: { md: 'calc(100% - 280px)' },
      }}>
        <ApplicationSummary data={data} />
      </Box>
    </Box>
  );
}