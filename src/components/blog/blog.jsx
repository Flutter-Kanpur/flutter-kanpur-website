'use client';

import { Box, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { BorderAllRounded, FitScreen } from '@mui/icons-material';
import { useRouter } from "next/navigation";




const Blog = ({ blogs }) => {

  const router = useRouter();

  return (
    <Grid container spacing={3}>
      {blogs.map((blog) => (
        <Box key={blog.id}
          onClick={() => router.push(`/blogscreen?url=${encodeURIComponent(blog.blogURL)}`)}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            background: 'none',
            color: 'white',
            width: "32.1%",
            border: "1px solid #0f1c25",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <Image src={blog.blogBannerURL} alt={blog.title} height={255} width={400} />

          <Typography color='#a6a6a6' fontSize={'12px'} >
            5 mins read
          </Typography>

          <Typography sx={{ color: "#fff", Variant: "h6", fontWeight: "bold" }}>
            {blog.title}
          </Typography>

          <Typography color='#a6a6a6'>
            {blog.subtitle}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, alignContent: 'center' }}>
            <Image src={blog.author_image} alt={blog.author} height={40} width={40} style={{ borderRadius: "50%" }} />
            <Box sx={{ alignContent: 'center' }}>
              <Typography sx={{ color: "#3fd1ff" }}>
                {blog.author}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};
export default Blog;