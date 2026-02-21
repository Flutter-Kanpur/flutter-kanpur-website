'use client';

import Link from 'next/link';
import { Box, Typography, Stack } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

export default function BottomNav({ activeTab = 'explore' }) {
  const tabs = [
    { label: 'Home', icon: HomeOutlinedIcon, href: '/', key: 'home' },
    { label: 'Community', icon: GroupOutlinedIcon, href: '/communityPage', key: 'community' },
    { label: 'Explore', icon: ExploreIcon, href: '/explore', key: 'explore' },
    { label: 'Profile', icon: PersonOutlinedIcon, href: '/members', key: 'profile' },
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 393,
        maxWidth: 428,
        bgcolor: '#fff',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
        zIndex: 1000,

        /* iPhone safe area */
        pb: 'calc(10px + env(safe-area-inset-bottom))',
        pt: 0.5,
      }}
    >
      <Stack direction="row" justifyContent="space-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;

          return (
            <Stack
              key={tab.key}
              component={Link}
              href={tab.href}
              alignItems="center"
              spacing={0.3}
              sx={{
                textDecoration: 'none',
                color: active ? '#4F70F4' : '#6b7280',
                fontSize: 11,
                fontWeight: 500,
                py: 0.5,
                transition: 'all 0.2s ease',

                '&:hover': {
                  color: active ? '#4F70F4' : '#374151',
                },
              }}
            >
              <Icon sx={{ fontSize: 24 }} />
              <Typography sx={{ fontSize: 11 }}>
                {tab.label}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
}
