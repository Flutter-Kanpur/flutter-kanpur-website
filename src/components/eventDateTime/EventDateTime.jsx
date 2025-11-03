'use client';

import { Box, Icon, Typography } from '@mui/material'
import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const EventDateTime = ({ date }) => {

  const time = date.trim().split('at ')[1];
  date = date.trim().split(' at ')[0];
  return (
    <Box

      sx={{
        color: '#fff',
        border: '1px solid',
        borderColor: 'transparent',
        background:
          '#0d171e',
        
        px: '10%',
        py: '2%',
        alignContent: 'center',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'space-evenly',

      }}>
      <Box >
        <Typography sx={{fontSize: '20px' }}>
          <Icon component={CalendarMonthIcon} sx={{ mr: 1, verticalAlign: 'middle' }} />
          {date}
        </Typography>
      </Box>

      <Box>
        <Typography sx={{fontSize: '20px' }}>
          <Icon component={AccessTimeIcon} sx={{ mr: 1, verticalAlign: 'middle' }} />
          {time}
        </Typography>
      </Box>

    </Box>
  )
}
export default EventDateTime