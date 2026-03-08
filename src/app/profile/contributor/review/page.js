'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/server/setup';
import { submitContributorApplication } from '@/lib/firebase/server/server-actions';
import ReviewApplication from '@/components/contributorCommunityV2/components/ReviewApplication';
import GradientHeader from '@/components/contributorCommunityV2/GradientHeader';

const STORAGE_KEY = "contributor_application_draft";

export default function ReviewPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const isStrictMobile = useMediaQuery('(max-width:425px)');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (!storedData) {
      router.push('/profile/contributor/apply');
      return;
    }

    const parsed = JSON.parse(storedData);

    setData({
      ...parsed.formData,
      skills: parsed.selectedSkills,
    });

  }, [router]);

  if (!data) return null;

  const handleEdit = () => router.push('/profile/contributor/apply');

  const handleSubmit = async () => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitContributorApplication(currentUser.uid, data);

      if (result.success) {
        localStorage.removeItem(STORAGE_KEY);
        router.push('/profile/contributor/success');
      } else {
        console.error('Submission failed:', result.error);
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{
      bgcolor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>

      {isStrictMobile && (
        <GradientHeader
          title="Review application"
          variant="plain"
          onBack={handleEdit}
        />
      )}

     
      <Box sx={{
        width: '100%',
        ml: { xs: 0, md: '280px' },
        maxWidth: { md: 'calc(100% - 280px)' },
      }}>
        {submitting ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : (
          <ReviewApplication
            data={data}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
          />
        )}
      </Box>
    </Box>
  );
}