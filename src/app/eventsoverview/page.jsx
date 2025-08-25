// 'use client';

// import React from 'react';
// import Footer from '@/components/footer/Footer';
// import './eventsoverview.css';
// import Image from 'next/image';
// import ApplyNowButton from '@/components/buttons/ApplyNowButton';

// const EventsOverview = () => {

//   const steps = [
//     { label: "Overview", status: "current" },
//     { label: "Personal Information", status: "upcoming" },
//     { label: "Payment", status: "upcoming" },
//     { label: "Confirm", status: "upcoming" },
//     { label: "Success", status: "upcoming" }
//   ];

//   return (
//     <div className='event-screen'>
//       <div className='outerBox'>
//         <div className="events-container">

//           <div className="progress-container">
//             {steps.map((step, index) => (
//               <div className="progress-step" key={index}>
//                 <div
//                   className={`circle ${step.status}`}
//                 >
//                   {step.status === "completed" && <span>✔</span>}
//                   {step.status === "current" && <span className="dot"></span>}
//                 </div>
//                 <p className="label">{step.label}</p>
//                 {index < steps.length - 1 && (
//                   <div
//                     className={`line ${steps[index + 1].status === "completed" || steps[index + 1].status === "current" ? "active" : ""}`}
//                   ></div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="event-card">
//             <div className="event-header">
//               <div className='event-header-left'>
//                 <Image src={'/EventPageImages/EventLogo.png'} width={85} height={85} />
//                 <div className="event-info">
//                   <h4>UX/UI Design Sprint Workshop</h4>
//                   <p>April 5, 2025<br />9:00 AM – 4:00 PM IST</p>
//                 </div>
//               </div>
//               <span className="event-price">Free</span>
//             </div>

//             <div className="event-prize">Prizes worth Rs. 1,50,000</div>

//             <div className="event-details">
//               <p>Everything you need to know about INNOVATE-A-THON 3.0<br />
//                 Overview:<br />
//                 <ul>
//                   <li>INNOVATE-A-THON 3.0, East India’s biggest Web3 hackathon, is a national-level event empowering student innovators to build decentralized solutions for real-world wartime and crisis challenges — all for a grand prize pool of ₹1,50,000</li>
//                   <li>Presented by our Title Sponsor, SUD Life Insurance, and Prime Sponsor, Coinbase, the event features an online submission round followed by an electrifying on-campus finale.</li>
//                   <li>To elevate the experience, we’re also hosting exclusive sessions with two of India’s most popular and inspiring figures.</li>
//                   <li>Get ready to learn, build, and make history.</li>
//                 </ul>
//                 Guidelines:<br />
//                 <ul>
//                   <li>Open to all undergraduate and postgraduate students across India</li>
//                   <li>Students from any stream or specialization (technical or non-technical) can apply</li>
//                   <li>Team size: 2–3 members</li>
//                   <li>Inter-college teams: Allowed</li>
//                   <li>Inter-specialization teams: Allowed</li>
//                   <li>Solo participation is not permitted</li>
//                 </ul>
//               </p>
//               <div className='button'>
//                 <ApplyNowButton text='REGISTRATION' style={{ fontFamily: 'Carme' }} fontSize='12px' />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>

//   );
// };

// export default EventsOverview;










'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';

const EventsOverview = () => {
  const steps = [
    { label: 'Overview', status: 'current' },
    { label: 'Personal Information', status: 'upcoming' },
    { label: 'Prize Pool', status: 'upcoming' },
    { label: 'Confirm', status: 'upcoming' },
    { label: 'Success', status: 'upcoming' },
  ];

  const activeStep = steps.findIndex((s) => s.status === 'current');

  return (
    <Box sx={{ bgcolor: '#010A10', color: 'white', pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '50px' }}>
        <Box
          sx={{
            width: { xs: '95%', md: '70%' },
            borderRadius: 3,
             display: 'flex',
             flexDirection: 'column',
             gap: 4,
            
          }}
        >
          <Box sx={{borderRadius: 3, p:3, bgcolor: '#0c1217',}}>
          {/* Progress Stepper */}
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            sx={{
              //mb: 3,
              '& .MuiStepLabel-label': { color: '#fff', fontSize: '0.8rem' },

              "& .MuiStepLabel-label.Mui-active": {
                color: "#fff !important",
              },
              '& .Mui-completed .MuiStepLabel-label': {
                color: '#fff !important', // completed step text
              },
              '& .MuiStepIcon-root': {
                color: '#fff',
              },
              '& .Mui-active .MuiStepIcon-root': {
                color: '#00bfff',
              },
              '& .Mui-completed .MuiStepIcon-root': {
                color: '#00bfff',
              },
              "& .MuiStepIcon-root.Mui-completed svg": {
                color: "#fff",
              },
            }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          </Box>
          {/* Event Card */}
          <Box
            sx={{
              bgcolor: '#0c1217',
              borderRadius: 3,
              p: 3,
              color: '#b0b0b0',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #333',
                pb: 2,
                mb: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Image
                  src={'/EventPageImages/EventLogo.png'}
                  alt="Event Logo"
                  width={85}
                  height={85}
                />
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      background: 'linear-gradient(0deg, #64a9dd, #fff)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      opacity: 0.8,
                      fontWeight: 600,
                    }}
                  >
                    UX/UI Design Sprint Workshop
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#415360' }}>
                    April 5, 2025 <br /> 9:00 AM – 4:00 PM IST
                  </Typography>
                </Box>
              </Box>
              <Box
                
                sx={{
                  color: '#fff',
                  border: '1px solid',
                  borderColor: 'transparent',
                  background:
                    'linear-gradient(#0c1217, #0c1217) padding-box, linear-gradient(0deg, #64a9dd, #fff) border-box',
                  fontSize: '1rem',
                  px: 2,
                  py: 0.5,
                  borderRadius:9
                }}>
                  <Typography>
                    Free
                  </Typography>
                </Box>
              
            </Box>

            {/* Prize */}
            <Box
              sx={{
                bgcolor: '#3fd1ff',
                color: '#fff',
                fontWeight: 500,
                mb: 2,
                p: 1,
                width: 'fit-content',
                borderRadius: 2
              }}      
            >
              <Typography>
                Prizes worth Rs. 1,50,000
              </Typography>
            </Box>
            {/* Details */}
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Everything you need to know about INNOVATE-A-THON 3.0
              </Typography>

              <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                Overview:
              </Typography>
              <ul>
                <li>
                  INNOVATE-A-THON 3.0, East India’s biggest Web3 hackathon, is a
                  national-level event empowering student innovators to build
                  decentralized solutions for real-world wartime and crisis
                  challenges — all for a grand prize pool of ₹1,50,000
                </li>
                <li>
                  Presented by our Title Sponsor, SUD Life Insurance, and Prime
                  Sponsor, Coinbase, the event features an online submission
                  round followed by an electrifying on-campus finale.
                </li>
                <li>
                  To elevate the experience, we’re also hosting exclusive
                  sessions with two of India’s most popular and inspiring
                  figures.
                </li>
                <li>Get ready to learn, build, and make history.</li>
              </ul>

              <Typography variant="subtitle1" sx={{ color: 'white', mt: 2 }}>
                Guidelines:
              </Typography>
              <ul>
                <li>
                  Open to all undergraduate and postgraduate students across
                  India
                </li>
                <li>
                  Students from any stream or specialization (technical or
                  non-technical) can apply
                </li>
                <li>Team size: 2–3 members</li>
                <li>Inter-college teams: Allowed</li>
                <li>Inter-specialization teams: Allowed</li>
                <li>Solo participation is not permitted</li>
              </ul>
            </Box>

            {/* Button */}
            <Box sx={{ mt: 4, ml: 2 }}>
              <ApplyNowButton
                text="REGISTRATION"
                style={{ fontFamily: 'Carme' }}
                fontSize="12px"
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default EventsOverview;
