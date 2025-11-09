"use client";
import { Box, Typography, List, ListItem, IconButton, Stack } from '@mui/material';
import { Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { usePathname } from 'next/navigation';

const FooterMUI = () => {

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Events & Workshop", path: "/events" },
    { name: "Blog & Resources", path: "/bloglisting" },
    { name: "Our Team", path: "/members" },
    { name: "Community Dashboard", path: "/communityPage" },
  ]

  const pathname = usePathname();
  console.log(pathname, "path")

  const arr = ["/", "/events", "/members", "/communityPage"];

  return (
    <Box
      sx={{
        backgroundColor: '#0d171e',
        borderRadius: '15px',
        width: arr.includes(pathname) ? null : "100%",
        m: 4,
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: { xs: 3, md: 0 },
      }}
    >
      {/* Left Part */}
      <Box>
        <Typography variant="h6" sx={{ p: 2, m: 0 }}>
          Quick Links
        </Typography>
        <List sx={{ pl: 2, mt: 0 }}>
          {
            quickLinks.map((item) => (
              <ListItem key={item.name} sx={{ p: 0, mb: 0 }}>
                <a
                  href={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '8px',
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ChevronRightIcon sx={{ verticalAlign: 'middle', color: '#fff' }} />
                  <Typography variant="body1">{item.name}</Typography>
                </a>
              </ListItem>
            ))
          }
        </List>
      </Box>

      {/* Right Part */}
      <Box sx={{ pr: 2, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-end' }, gap: 2, padding: 5 }}>
        {/* Social Icons */}
        <Stack direction="row" spacing={4}>
          <a
            href="https://www.instagram.com/flutterkanpur"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <Instagram sx={{ fontSize: 30, color: '#64A9DD' }} />
            </IconButton>
          </a>
          <a href="https://www.linkedin.com/company/flutterkanpur/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <LinkedIn sx={{ fontSize: 30, color: '#64A9DD' }} />
            </IconButton>
          </a>
          <a
            href="https://x.com/FlutterKanpur"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton>
              <Twitter sx={{ fontSize: 30, color: '#64A9DD' }} />
            </IconButton>
          </a>
        </Stack>

        {/* FlutterSphere */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src={'/landingPageIcons/flutter_icon.svg'} height={36} width={36} alt="flutter sphere" />
          <Typography sx={{ fontFamily: '"Familjen Grotesk", sans-serif', fontSize: '28px', fontWeight: 'bold' }}>
            FlutterKanpur
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default FooterMUI;

