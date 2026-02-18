'use client';

import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const ACTIVITIES = [
  {
    id: 'events',
    title: 'Events',
    description: 'Meetups, workshops and sessions.',
    href: '/event2',
  },
  {
    id: 'contests',
    title: 'Contests',
    description: 'Coding challenges and sprints.',
    href: '/contest2',
  },
  {
    id: 'open-calls',
    title: 'Open Calls',
    description: 'Speakers, volunteers and contributors.',
    href: '/opencalls',
  },
];

/* ---------- Activity Card ---------- */

function ActivityCard({ activity }) {
  return (
    <Card
      component={Link}
      href={activity.href}
      sx={{
        height: 180,                 // 🔥 fixed height (prevents stretch)
        p: 2,
        width:160,
        borderRadius: 4,
        textDecoration: 'none',
        background: '#EEF3FF',
        border: '1px solid #E3E8FF',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <Stack spacing={1}>
        {/* Icon */}
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: '1.5px solid #4F70F4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CodeIcon sx={{ fontSize: 18, color: '#4F70F4' }} />
        </Box>

        {/* Title */}
        <Typography sx={{ fontSize: 17, fontWeight: 600 }}>
          {activity.title}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: 14,
            color: '#6b7280',
            lineHeight: 1.4,
            fontWeight:500,
          }}
        >
          {activity.description}
        </Typography>
      </Stack>
    </Card>
  );
}

/* ---------- Main Section ---------- */

export default function ParticipationActivities() {
  return (
    <Box sx={{ px: 2.5, pt: 2, pb: 2 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
      >
        <Typography variant="h7" sx={{ fontWeight: 500 }}>
          Participation & activities
        </Typography>

        <Typography
          component={Link}
          href="/"
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

      {/* Proper 2-column grid */}
      <Grid container spacing={1.5}>
        {ACTIVITIES.map((activity) => (
          <Grid key={activity.id} xs={6}>
            <ActivityCard activity={activity} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
