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










//'use client';

import React from 'react';
import {
  Box,
} from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import EventStepper from '@/components/eventStepper/EventStepper';
import EventPrize from '@/components/eventPrize/EventPrize';
import eventsoverview from '@/constants/eventsoverview';
import EventPrice from '@/components/eventDateTime/EventDateTime';
import EventDetails from '@/components/eventDetails/EventDetails';
import EventTitleDateTimeImage from '@/components/eventTitleTypeImage/EventTitleTypeImage';
import EventsDummyData from '@/constants/events';
import EventOverviewContainer from '@/components/eventoverviewcontainer/EventOverviewContainer';
import { fetchEventsData } from '@/services/fetch_data_from_firestore';
import { fetchEventsById } from '@/services/fetch_data_from_firestore';


export default async function Eventsoverview({params}){
  // const steps = [
  //   { label: 'Overview', status: 'current' },
  //   { label: 'Personal Information', status: 'upcoming' },
  //   { label: 'Prize Pool', status: 'upcoming' },
  //   { label: 'Confirm', status: 'upcoming' },
  //   { label: 'Success', status: 'upcoming' },
  // ];
  // const activeStep = steps.findIndex((s) => s.status === 'current');

  const { id } = params;
  // let eventsData = EventsDummyData;
  let eventsData;
  // try {
  //   const data = await fetchEventsData('events');
  //   if (Array.isArray(data) && data.length > 0) {
  //     eventsData = data;
  //   }
  // } catch (error) {
  //   console.error('Error fetching events:', error);
  //   // Use EventsDummyData as fallback
  // }

 const data = await fetchEventsById('events', id);
if (data) {
  eventsData = data;
}


  // const events = eventsData.map(event => ({
  //   ...event,
  //   event_date: typeof event.event_date?.toDate === 'function'
  //     ? event.event_date.toDate().toISOString()
  //     : event.event_date
  // }));

  // console.log("Fetched event:", eventsData);

  if (!eventsData) {
  return (
    <Box sx={{ bgcolor: '#010A10', color: 'white', minHeight: '100vh' }}>
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        Event not found
      </Box>
    </Box>
  );
}

// console.log("Event Data:", eventsData);  

const eventDate = data.event_date.toDate();

function getOrdinal(num) {
  const suffixes = ["th", "st", "nd", "rd"];
  const val = num % 100;
  return num + (suffixes[(val - 20) % 10] || suffixes[val] || suffixes[0]);
}

const day = eventDate.getDate();
const month = eventDate.toLocaleString("default", { month: "long" });
const year = eventDate.getFullYear();
const time = eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

const formattedDate = `${month} ${getOrdinal(day)}, ${year}`;

  const formattedEvent = {
    ...eventsData,
    event_date: formattedDate + ' at ' + time,
  };
  
  return (
    <Box sx={{ bgcolor: '#010A10', color: 'white', }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', }}>
          <EventOverviewContainer event={formattedEvent}/>

      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};