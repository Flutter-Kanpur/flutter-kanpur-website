'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image';

const EventTitleDateTimeImage = ({title,date,time,image}) => {
    return (<Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Image
                  src={image}
                  alt="Event Logo"
                  width={85}
                  height={85}
                />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      background: 'linear-gradient(0deg, #64a9dd, #fff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      opacity: 0.8,
                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#415360' }}>
                    {date} <br /> {time}
                  </Typography>
                </Box>
              </Box>

                )
}
export default EventTitleDateTimeImage