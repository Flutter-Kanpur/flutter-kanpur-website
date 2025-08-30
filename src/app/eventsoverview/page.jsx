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
} from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import EventStepper from '@/components/eventStepper/EventStepper';
import EventPrize from '@/components/eventPrize/EventPrize';
import eventsoverview from '@/lib/eventsoverview';
import EventPrice from '@/components/eventPrice/EventPrice';
import EventDetails from '@/components/eventDetails/EventDetails';
import EventTitleDateTimeImage from '@/components/eventTitleDateTimeImage/EventTitleDateTimeImage';

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
          <EventStepper steps={steps} activeStep={activeStep} />
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
              {eventsoverview.map((event, index) => (
                <EventTitleDateTimeImage key={index} title={event.title} date={event.date} time={event.time} image={event.image} />
              ))}
              {eventsoverview.map((event, index) => (
                <EventPrice key={index} price={event.price} />
              ))}
            </Box>
            {/* Prize */}
            {eventsoverview.map((event, index) => (
              <EventPrize key={index} prize={event.prize} />
            ))}
            {/* Details */}
            {eventsoverview.map((event, index) => (
              <EventDetails key={index} tagline={event.tagline} overview={event.overview} guidelines={event.guidelines} />
            ))} 

            {/* Button */}
            <Box sx={{ mt: 4, ml: 2 }}>
              <ApplyNowButton text="REGISTRATION" style={{ fontFamily: 'Carme' }} fontSize="12px" />
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
