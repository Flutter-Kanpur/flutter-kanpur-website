// 'use client';

// import React from 'react';
// import Footer from '@/components/footer/Footer';
// import './events.css';
// import ApplyNowButton from '@/components/buttons/ApplyNowButton';
// import Image from 'next/image';

// const Events = () => {
//     return (
//         <div className='event-screen'>
//             <div className='header'>
//                 <div className='text'>
//                     <p className='small-textw'>Level up your skills and showcase your talent. Join an event today!</p>
//                     <p className='big-text'>Join Inspiring Events &<br></br> Challenges!</p>
//                 </div>
//                 <div className='swipe-down-button'>
//                     <button>Swipe Down <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path d="M14.207 7.50003L12.793 6.08603L8.49997 10.379V0.79303H6.49997V10.379L2.20697 6.08603L0.792969 7.50003L7.49997 14.207L14.207 7.50003Z" fill="#64A9DD" />
//                     </svg>
//                     </button>
//                 </div>
//                 <div className='events-list'>
//                     <div className='event-1'>
//                         <div className='left-part'>
//                             <div className='event-count'>1</div>
//                             <div className='event-details'>
//                                 <h1>UX/UI Design Workshop</h1>
//                                 <p>Unlock your creative potential and take your design skills to the next level! Join industry-leading UX/UI experts in an immersive, hands-on workshop where you’ll learn core design principles, master Figma, and explore real-world case studies. Whether you're a beginner or looking to refine your craft, this workshop is the perfect opportunity to collaborate, network, and create stunning user experiences.</p>
//                             </div>
//                             <div className='info-apply-buttons'>
//                                 <div className='view-details-button'>
//                                     <button>
//                                         <Image src={'/EventPageImages/ViewDetails.png'} width={20} height={18} />
//                                         View Details
//                                     </button>
//                                 </div>
//                                 <ApplyNowButton fontSize='14px' />
//                             </div>
//                         </div>
//                         <div className='right-part'>
//                             <Image src={'/EventPageImages/Event1.png'} width={455} height={388} />
//                         </div>
//                     </div>

//                     <div className='event-2'>
//                         <div className='left-part'>
//                             <div className='event-count'>2</div>
//                             <div className='event-details'>
//                                 <h1>Flutter Hackathon 2025</h1>
//                                 <p>Ready to push your limits and innovate? Join the ultimate 48-hour Flutter Hackathon and collaborate with developers, designers, and tech enthusiasts from around the world.<br></br>
//                                     Build impactful apps, solve real-world problems, and compete for exciting prizes and internship opportunities. Get mentorship from industry experts and showcase your skills on a global stage!.</p>
//                             </div>
//                             <div className='info-apply-buttons'>
//                                 <div className='view-details-button'>
//                                     <button>
//                                         <Image src={'/EventPageImages/ViewDetails.png'} width={20} height={18} />
//                                         View Details
//                                     </button>
//                                 </div>
//                                 <ApplyNowButton fontSize='14px' />
//                             </div>
//                         </div>
//                         <div className='right-part'>
//                             <Image src={'/EventPageImages/Event2.png'} width={455} height={338} />
//                         </div>
//                     </div>

//                     <div className='event-3'>
//                         <div className='left-part'>
//                             <div className='event-count'>3</div>
//                             <div className='event-details'>
//                                 <h1>Ideation Bootcamp: From Concept to Prototype</h1>
//                                 <p>Turn your innovative ideas into reality! This two-day intensive bootcamp is designed to help you brainstorm, validate, and prototype your product concepts. Learn design thinking, wireframing, and rapid prototyping from seasoned mentors while collaborating with like-minded innovators.<br></br>
//                                     Perfect for aspiring product designers and startup enthusiasts!</p>
//                             </div>
//                             <div className='info-apply-buttons'>
//                                 <div className='view-details-button'>
//                                     <button>
//                                         <Image src={'/EventPageImages/ViewDetails.png'} width={20} height={18} />
//                                         View Details
//                                     </button>
//                                 </div>
//                                 <ApplyNowButton fontSize='14px' />
//                             </div>
//                         </div>
//                         <div className='right-part'>
//                             <Image src={'/EventPageImages/Event3.png'} width={455} height={388} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default Events;










'use client';

import React from 'react';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import Image from 'next/image';

// MUI imports
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const eventsData = [
  {
    id: 1,
    title: 'UX/UI Design Workshop',
    description: `Unlock your creative potential and take your design skills to the next level! Join industry-leading UX/UI experts in an immersive, hands-on workshop where you’ll learn core design principles, master Figma, and explore real-world case studies. Whether you're a beginner or looking to refine your craft, this workshop is the perfect opportunity to collaborate, network, and create stunning user experiences.`,
    image: '/EventPageImages/Event1.png'
  },
  {
    id: 2,
    title: 'Flutter Hackathon 2025',
    description: `Ready to push your limits and innovate? Join the ultimate 48-hour Flutter Hackathon and collaborate with developers, designers, and tech enthusiasts from around the world. 
Build impactful apps, solve real-world problems, and compete for exciting prizes and internship opportunities. Get mentorship from industry experts and showcase your skills on a global stage!`,
    image: '/EventPageImages/Event2.png'
  },
  {
    id: 3,
    title: 'Ideation Bootcamp: From Concept to Prototype',
    description: `Turn your innovative ideas into reality! This two-day intensive bootcamp is designed to help you brainstorm, validate, and prototype your product concepts. Learn design thinking, wireframing, and rapid prototyping from seasoned mentors while collaborating with like-minded innovators. 
Perfect for aspiring product designers and startup enthusiasts!`,
    image: '/EventPageImages/Event3.png'
  }
];

const Events = () => {
  return (
    <Box sx={{ pb: 12, }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', py: 16, mt: 8}}>
        <Typography variant="h6" color="white">
          Level up your skills and showcase your talent. Join an event today!
        </Typography>
        <Typography variant="h1" fontWeight="bold" >
          Join Inspiring Events & Challenges!
        </Typography>
      </Box>

      {/* Swipe Down Button */}
      <Box textAlign="center" mb={18}>
        <Button
          variant="outlined"
          endIcon={<ArrowDownwardIcon />}
          sx={{
            px: 3,
            py: 1.5,
            color: 'white',
            border: '1px solid transparent',
            borderRadius: '50px',
            background: 'linear-gradient(#0c1217, #0c1217) padding-box, linear-gradient(270deg, #3fd1ff, #e5e8ec) border-box'

          }}
        >
          Swipe Down
        </Button>
      </Box>

      {/* Events List */}
      <Container sx={{ mb: 18,display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              gap: 12,}}>
        {eventsData.map((event, index) => (
          <Paper elevation={0}
            key={event.id}
            sx={{
              mb: 8,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 8,
              alignItems: 'center',
              background: 'none',
              color: 'white',
              width: "100%"
            }}
          >
            {/* Left */}
            <Box flex={"0 0 calc(70%-32px)" } >
              <Box
                sx={{
                  border: '1px solid transparent',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  mt:0,
                  mb: 5,
                  width: "20%",
                  background: 'linear-gradient(#0c1217, #0c1217) padding-box, linear-gradient(270deg, #010a10, #37abff) border-box'
                }}
              >
                {event.id}
              </Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom mb={3}>
                {event.title}
              </Typography>
              <Typography variant="body1" color="white">
                {event.description}
              </Typography>
              <Box mt={5} display="flex" justifyContent={"space-between"}>
                <Button
                  variant="contained"
                  startIcon={<Image src="/EventPageImages/ViewDetails.png" width={20} height={18} alt="View" />}
                  sx={{
                    backgroundColor: '#0f1c25',
                    color: 'white',
                    '&:hover': { backgroundColor: '#142832' },
                    flexShrink: 0,
                    flexGrow: 0,
                  }}
                >
                  View Details
                </Button>
                <ApplyNowButton fontSize="14px" />
              </Box>
            </Box>

            {/* Right */}
            <Box flex={"0 1 calc(30%-32px)"}>
              <Image src={event.image} width={455} height={388} alt={event.title} />
            </Box>
          </Paper>
        ))}
      </Container>

      <Footer />
    </Box>
  );
};

export default Events;