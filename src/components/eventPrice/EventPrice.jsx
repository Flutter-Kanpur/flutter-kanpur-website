'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'

const EventPrice = ({price}) => {
    return (
        <Box

                sx={{
                  color: '#fff',
                  border: '1px solid',
                  borderColor: 'transparent',
                  background:
                    'linear-gradient(#0c1217, #0c1217) padding-box, linear-gradient(0deg, #64a9dd, #fff) border-box',
                  fontSize: '1rem',
                  px: 2,
                  py: 0.5,
                  borderRadius: 9
                }}>
                <Typography>
                  {price}
                </Typography>
              </Box>
    )
}
export default EventPrice