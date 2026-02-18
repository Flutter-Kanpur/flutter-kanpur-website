'use client';

import { Box, Typography, Stack, Avatar, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav/BottomNav';
import BlogDetailClient from '@/components/BlogDetail/BlogDetailClient';

/* Dummy blog data — later fetch from DB */
const BLOGS = [
  {
    id: '1',
    title: 'Getting Started with Flutter Animations',
    author: 'Angelica Singh',
    date: '18 Apr 2026',
    readTime: '13 min read',
    image: '/flutter.png',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...',
    likes: '14.5k',
    comments: '15.7k',
  },
];

export default function BlogPage({ params }) {
  const blog = BLOGS.find((b) => b.id === params.id);

  if (!blog) return <Typography>Blog not found</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 393,
        mx: 'auto',
        minHeight: '100vh',
        pb: '110px',
        background:
          'linear-gradient(180deg, #cfe0f7 0%, #eaf2ff 6%, #ffffff 12%)',
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ p: 2, position: 'relative' }}
      >
        <Link href="/blog2" style={{ position: 'absolute', left: 16 }}>
          <ArrowBackIcon />
        </Link>
        <Typography fontWeight={600}>Blogs & Articles</Typography>
      </Stack>

      <Box px={2}>
        {/* Title */}
        <Typography fontSize={20} fontWeight={600}>
          {blog.title}
        </Typography>

        <Typography color="#6b7280" fontSize={13} mt={0.5}>
          {blog.readTime} • {blog.date}
        </Typography>

        {/* Author */}
        <Stack direction="row" spacing={1} mt={2} alignItems="center">
          <Avatar>{blog.author[0]}</Avatar>
          <Typography>{blog.author}</Typography>
        </Stack>

        {/* Image */}
        <Box mt={2}>
          <img
            src={blog.image}
            alt={blog.title}
            style={{
              width: '100%',
              borderRadius: 14,
            }}
          />
        </Box>

        {/* Content */}
        <Typography mt={2} lineHeight={1.7}>
          {blog.content}
        </Typography>

        {/* Likes + Comments */}
        <Stack direction="row" spacing={3} mt={2}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FavoriteIcon sx={{ color: '#ef4444' }} />
            <Typography>{blog.likes} likes</Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <ChatBubbleOutlineIcon />
            <Typography>{blog.comments} comments</Typography>
          </Stack>
        </Stack>

        {/* See all responses */}
        <Button
          startIcon={<ExpandMoreIcon />}
          sx={{ mt: 3, borderRadius: 6, textTransform: 'none' }}
        >
          See all responses
        </Button>

        {/* Write block */}
        <Box mt={3}>
          <BlogDetailClient />
        </Box>
      </Box>

      <BottomNav activeTab="explore" />
    </Box>
  );
}
