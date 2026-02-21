'use client';

import Link from 'next/link';
import { Box, Typography, Stack, Avatar } from '@mui/material';

function CoreTeamMember({ member, highlight }) {
  return (
    <Stack
      alignItems="center"
      spacing={0.8}
      sx={{
        minWidth: 72,
        cursor: 'pointer',
      }}
    >
      {/* Avatar */}
      <Avatar
        src={member.photo || ''}
        alt={member.name}
        sx={{
          width: 64,
          height: 64,
          fontSize: 22,
          fontWeight: 600,
          bgcolor: member.photo ? 'transparent' : '#4F70F4',
          border: highlight ? '3px solid #FFD6E0' : 'none',
          boxShadow: highlight
            ? '0 0 0 2px rgba(255,182,193,0.6)'
            : 'none',
        }}
      >
        {!member.photo && member.name?.charAt(0)}
      </Avatar>

      {/* Name */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: '#222',
          textAlign: 'center',
          maxWidth: 70,
          lineHeight: 1.2,
        }}
      >
        {member.name}
      </Typography>
    </Stack>
  );
}

export default function CoreTeam({ initialCoreTeamMembers = [] }) {
  const members = Array.isArray(initialCoreTeamMembers)
    ? initialCoreTeamMembers
    : [];

  return (
    <Box sx={{ px: 2.5, pt: 1.5, pb: 1}}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.2}
      >
        <Typography variant="h7" sx={{ fontWeight: 500,mb:2 }}>
          Core team
        </Typography>

        <Typography
          component={Link}
          href="/coreteam"
          sx={{
            fontSize: 15,
            color: '#4F70F4',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          View all
        </Typography>
      </Stack>

      {/* Horizontal Scroll */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          '&::-webkit-scrollbar': { height: 6 },
          '&::-webkit-scrollbar-thumb': {
            background: '#e5e7eb',
            borderRadius: 4,
          },
        }}
      >
        {members.length > 0 ? (
          members.map((member, index) => (
            <CoreTeamMember
              key={member.id}
              member={member}
              highlight={index === 0}
            />
          ))
        ) : (
          <Typography
            sx={{
              fontSize: 14,
              color: '#6b7280',
              py: 2,
            }}
          >
            No core team members yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
