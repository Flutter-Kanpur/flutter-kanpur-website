'use client';

import { Box, Typography, Grid, Stack, IconButton } from '@mui/material';
import Image from 'next/image';
import { BorderAllRounded, FitScreen } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import { Twitter, LinkedIn } from '@mui/icons-material';




const EventSpeaker = ({ speaker_image, speaker_name, speaker_intro, speaker_twitter, speaker_linkedin }) => {



  return (
        <Box 
          sx={{
            mb:3
          }}
        >
            <Typography variant='h5' sx={{color: "#ffffff"}}>Speaker</Typography>

          <Box sx={{ display: "flex", gap: 1, alignContent: 'center', mt: 2 }}>
            <Image src={speaker_image} alt={speaker_name} height={80} width={80} style={{ borderRadius: "50%" }} />
            <Box sx={{ alignContent: 'center' }}>
              <Typography sx={{ color: "#3fd1ff" }}>
                {speaker_name}
              </Typography>
              <Typography color='#a6a6a6' fontSize={'14px'} >
            {speaker_intro}
          </Typography>
          <Stack direction="row" >
          <a href={speaker_linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <LinkedIn sx={{ fontSize: 30, color: '#64A9DD' }} />
            </IconButton>
          </a>
          <a
            href={speaker_twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <Twitter sx={{ fontSize: 30, color: '#64A9DD' }} />
            </IconButton>
          </a>
        </Stack>
            </Box>
          </Box>

          

          

          
        </Box>
    
  );
};
export default EventSpeaker;