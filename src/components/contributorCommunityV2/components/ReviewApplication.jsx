'use client';

import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RevampButton from '@/components/buttons/revampbutton/RevampButton';
import BottomNav from '../BottomNav';

const ReviewApplication = ({ data, onEdit, onSubmit }) => {


  const sectionLabel = {
    color: '#9e9e9e',
    fontSize: '16px',
    mt: 2.5,
    mb: 0.5,
    fontWeight: 400,
    fontFamily: 'var(--font-product-sans)'
  };

  const labelStyle = sectionLabel;

  const valueStyle = {
    fontWeight: '400',
    fontSize: '18px',
    color: '#1a1a1a',
    fontFamily: 'var(--font-product-sans)',
    mb: 1
  };

  const iconLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    mb: 1.5,
    '& svg': { fontSize: '20px', color: '#4167F2' }
  };

  
  const renderLink = (url, Icon) => {
    if (!url) return null;
    return (
      <Box sx={iconLinkStyle}>
        <Icon />
        <Typography sx={{ ...valueStyle, mb: 0, fontSize: '14px', wordBreak: 'break-all', fontWeight: 500 }}>
          {url}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', px: 3, pt: 2, pb: 12 }}>

      <Box sx={{ bgcolor: '#EFF3FF', p: 2.5, borderRadius: '28px', textAlign: 'center', mb: 4 }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#1a1a1a', fontFamily: 'var(--font-product-sans)' }}>
          Please review your details before submitting.
        </Typography>
      </Box>

      <Typography sx={sectionLabel}>Full name</Typography>
      <Typography sx={valueStyle}>{data.fullName || '—'}</Typography>

      <Typography sx={sectionLabel}>Email address</Typography>
      <Typography sx={valueStyle}>{data.email || '—'}</Typography>

      <Typography sx={sectionLabel}>Current role</Typography>
      <Typography sx={valueStyle}>{data.currentRole || '—'}</Typography>

      {/* ✅ Yahan labelStyle ab properly kaam karega */}
      <Typography sx={labelStyle}>What would you like to contribute to?</Typography>
      <Typography sx={valueStyle}>{data.contribution || '—'}</Typography>

      <Typography sx={sectionLabel}>Relevant skills</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1, mt: 1 }}>
        {data.skills?.length > 0 ? data.skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            sx={{
              borderRadius: '10px',
              bgcolor: '#ffff',
              border: "1px solid #D1D1D1 ",
              fontFamily: 'var(--font-product-sans)',
              fontSize: '13px',
              fontWeight: 500
            }}
          />
        )) : <Typography sx={valueStyle}>—</Typography>}
      </Box>

      <Typography sx={sectionLabel}>Experience level</Typography>
      <Typography sx={valueStyle}>{data.experience || '—'}</Typography>

      <Typography sx={sectionLabel}>Weekly commitment</Typography>
      <Typography sx={valueStyle}>{data.weeklyTime || '—'}</Typography>

      <Typography sx={sectionLabel}>Work/profile links</Typography>
      <Box sx={{ mt: 1.5 }}>
        {renderLink(data.github, GitHubIcon)}
        {renderLink(data.linkedin, LinkedInIcon)}
        {renderLink(data.portfolio, LanguageIcon)}
      </Box>



      <Box sx={{ mt: 6 }}>
        <RevampButton
          text="Submit your application"
          width="100%"
          onClick={onSubmit}
        />
      </Box>

      <Typography
        onClick={onEdit}
        sx={{
          textAlign: 'center',
          mt: 3,
          color: '#000',
          fontWeight: '400',
          cursor: 'pointer',
          fontSize: '16px',
          fontFamily: 'var(--font-product-sans)'
        }}
      >
        Edit details
      </Typography>
      <BottomNav />
    </Box>
  );
};

export default ReviewApplication;