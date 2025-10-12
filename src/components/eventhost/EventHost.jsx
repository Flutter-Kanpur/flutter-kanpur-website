'use client';

import { Box, Typography, Grid, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import { BorderAllRounded, FitScreen } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import { Twitter, LinkedIn } from '@mui/icons-material';




const EventHost = ({ host_image, host_name }) => {



  return (
        <Box 
          sx={{
          }}
        >
            <Typography variant='h5' sx={{color: "#ffffff"}}>Host</Typography>

          <Box sx={{ display: "flex", gap: 1, alignContent: 'center', mt: 2 }}>
            <Image src={host_image} alt={host_name} height={80} width={80} style={{ borderRadius: "50%" }} />
            <Box sx={{ alignContent: 'center' }}>
              <Typography sx={{ color: "#3fd1ff" }}>
                {host_name}
              </Typography>          
            </Box>
          </Box>

          

          

          
        </Box>
    
  );
};
export default EventHost;