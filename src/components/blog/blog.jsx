'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { BorderAllRounded, FitScreen } from '@mui/icons-material';


const Blog = ({ image,time,title,text,author,date,authorimage}) => {
  return (
<Box
            sx={{
              p:3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              background: 'none',
              color: 'white',
              width: "32.1%",
              border: "1px solid #0f1c25",
              borderRadius: "10px"
            }}
          >
                <Image src={image} alt={title} height={255} width={400} />
          
              <Typography color='#a6a6a6'fontSize={'12px'} >
                {time}
              </Typography>

              <Typography sx={{color:"#fff", Variant: "h6",fontWeight:"bold"}}>
                {title}
              </Typography>

              <Typography color='#a6a6a6'>
                {text}
              </Typography>

              <Box sx={{display:"flex", gap: 1, alignContent:'center'}}>
                <Image src={authorimage} alt={author} height={40} width={40} sx={{BorderAllRounded}}/>
                <Box>
                <Typography sx={{color:"#3fd1ff"}}>
                {author}
              </Typography>
              <Typography color='#a6a6a6' fontSize={'12px'}>
                {date}
              </Typography>
              </Box>
              </Box>
            </Box>

                );};
                export default Blog;