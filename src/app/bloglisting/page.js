import React from 'react';
import { Box, Typography } from '@mui/material';
import SortByButton from '@/components/buttons/sortByButton/sortByButton';
import Blog from '@/components/blog/blog';
import { BlogsDummyData } from '@/constants/blogs';
import WriteBlog from '@/components/writeBlog/writeBlog';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GoBackButton from '@/components/buttons/goBackButton/goBackButton';
import { fetchBlogsData } from '@/services/fetch_data_from_firestore';

export default async function BlogListing() {

  const data = await fetchBlogsData('blogs');

  const blogData = data.length ? data : BlogsDummyData;

  const blogs = blogData.map(blog => ({
    ...blog,
    posted_on: blog.posted_on?.toDate
      ? blog.posted_on.toDate().toISOString()
      : blog.posted_on
  }));

  return (
    <Box sx={{ pb: 2 }}>
      <Box sx={{ pt: 8, px: 8, pb: 2 }}>
        <Typography
          variant="h4"
          sx={{
            background: 'linear-gradient(0deg, #64a9dd, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0.8,
            fontWeight: 600,
          }}
        >
          Blog & Resources
        </Typography>
        <Typography sx={{
          color: '#fff',
          mt: 1,
          width: '75%'
        }}>
          Dive into articles, tutorials, and insights curated by the Flutter Kanpur community. Whether you're just getting started with Flutter or you're an experienced developer/designer, these blogs will help you sharpen your skills and stay updated with the latest trends.
        </Typography>

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 1
        }}>
          <SortByButton text={"Sort by"} />
        </Box>

        <Blog blogs={blogs} />

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mt: 1
        }}>
          <GoBackButton text={"Go Back"} />
        </Box>
      </Box>
      <WriteBlog />
      <Box sx={{ justifyItems: "center" }}>
        <Typography color='#fff'>
          Made with <FavoriteIcon sx={{ color: "#096df7", verticalAlign: "middle" }} />  by Flutter Kanpur Community
        </Typography>
      </Box>
    </Box>
  );
}
