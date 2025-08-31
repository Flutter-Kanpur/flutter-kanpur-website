'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'

const EventPrize = ({prize}) => {
    return (
        <Box
              sx={{
                bgcolor: '#3fd1ff',
                color: '#fff',
                fontWeight: 500,
                mb: 2,
                p: 1,
                width: 'fit-content',
                borderRadius: 2
              }}      
            >
              <Typography>
                {prize}
              </Typography>
            </Box>
    )
}
export default EventPrize