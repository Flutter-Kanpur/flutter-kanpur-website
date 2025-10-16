'use client';

import { Box, Typography } from '@mui/material'
import React from 'react'

const EventDetails = ({description}) => {
    return (
        <Box >
              <Typography variant="body1" sx={{ mb: 2 }}>
                {description}
              </Typography>

              {/* <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                Overview:
              </Typography>
                <ul>
                  {overview.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>

              <Typography variant="subtitle1" sx={{ color: 'white', mt: 2 }}>
                Guidelines:
              </Typography>
              <ul>
                {guidelines.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul> */}
            </Box>
    )
}
export default EventDetails