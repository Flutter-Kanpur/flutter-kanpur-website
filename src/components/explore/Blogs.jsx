'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePhotoURL } from '@/hooks/usePhotoURL';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Button,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BLOG_CATEGORIES = ['DSA', 'Flutter', 'UI/UX'];
const BLOG_LIST = [];

function getBlogList(initialBlogs) {
  if (Array.isArray(initialBlogs) && initialBlogs.length > 0) {
    return initialBlogs;
  }
  return BLOG_LIST;
}

/* ---------- Blog Card ---------- */

function BlogArticleCard({ blog }) {
  const imageURL = usePhotoURL(blog.image || '');

  return (
    <Card
      sx={{
        width: 250, 
        height:290,                
        flexShrink: 0,
        borderRadius: 5,
        p: 1.5,
        border:'2px solid #e5e6e8',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      {/* Image */}
      <Box
        sx={{
          borderRadius: 5,
          overflow: 'hidden',
          mb: 1,
        }}
      >
        <CardMedia
          component="img"
          height="130"
          image={imageURL || ''}
          alt={blog.title}
          sx={{
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
      </Box>

      <CardContent sx={{ p: 0 }}>
        {/* Title */}
        <Typography
          sx={{
            fontSize: 19,          
            fontWeight: 500,
            lineHeight: 1.35,
            p:0.5,
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,          
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {blog.title}
        </Typography>

        {/* Read Time */}
        <Typography
          sx={{
            fontSize: 14,
            color: '#6b7280',
            mb: 1,
            pl:0.5,
          }}
        >
          {blog.readTime ?? '6 min read'}
        </Typography>

        {/* Divider */}
        <Box
          sx={{
            borderTop: '1px dashed #d1d5db',
            mb: 1,
          }}
        />

        {/* Author */}
        <Typography
          component={Link}
          href="/blog2"
          sx={{
            fontSize: 16,          
            color: '#4F70F4',
            textDecoration: 'none',
            pl:0.5,
          }}
        >
          By {blog.author}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* ---------- Main Blogs Section ---------- */

export default function Blogs({ initialBlogs = [] }) {
  const [activeFilter, setActiveFilter] = useState('Flutter');
  const [anchorEl, setAnchorEl] = useState(null);

  const blogList = getBlogList(initialBlogs);

  const displayBlogs = useMemo(() => {
    return blogList.filter((b) => b.tag === activeFilter);
  }, [blogList, activeFilter]);

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ px: 2.5 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1.5}
        mt={1}
      >
        <Typography variant="h7" fontWeight={500}>
          Blogs & Articles
        </Typography>

         <Typography
          component={Link}
          href="/blog2"
          sx={{
            fontSize: 15,
            color: '#4F70F4',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          View all
        </Typography>
      </Stack>

      {/* Filters Row */}
      <Stack direction="row" spacing={1} mb={1.5}>
        {/* Dropdown */}
        <Button
          variant="outlined"
          size="small"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            textTransform: 'none',
            borderRadius: 1.5,
              fontWeight: 600,
            borderColor: '#e5e7eb',
             color: '#222',                
    '&:hover': {
      borderColor: '#d1d5db',
      backgroundColor: '#f9fafb',
    },
          }}
        >
          Filters
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
        >
          {BLOG_CATEGORIES.map((cat) => (
            <MenuItem
              key={cat}
              selected={activeFilter === cat}
              onClick={() => {
                setActiveFilter(cat);
                setAnchorEl(null);
              }}
            >
              {cat}
            </MenuItem>
          ))}
        </Menu>

        {/* Category Chips */}
        {BLOG_CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => setActiveFilter(cat)}
            color={activeFilter === cat ? 'primary' : 'default'}
            sx={{ borderRadius: 1.5 , fontWeight: 600,backgroundColor: activeFilter === cat ? '#4F70F4' : '#ffffff',
    color: activeFilter === cat ? '#ffffff' : '#222',
    border: activeFilter === cat
      ? '1px solid #4F70F4'
      : '1px solid #e5e7eb',

    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor:
        activeFilter === cat ? '#3b5bd9' : '#f9fafb',
    },}}
          />
        ))}
      </Stack>

      {/* Blog Cards */}
      {displayBlogs.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 3,
            color: '#6b7280',
            fontSize: 14,
          }}
        >
          No blogs available for this category.
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': {
              background: '#e5e7eb',
              borderRadius: 4,
            },
          }}
        >
          {displayBlogs.map((blog) => (
            <BlogArticleCard key={blog.id} blog={blog} />
          ))}
        </Box>
      )}
    </Box>
  );
}
