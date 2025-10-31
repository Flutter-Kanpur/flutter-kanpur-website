'use client';

import { useRouter } from "next/navigation";
import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image';
import Footer from '@/components/footer/Footer';
import ApplyNowButton from '@/components/buttons/ApplyNowButton';
import EventStepper from '@/components/eventStepper/EventStepper';
import EventPrize from '@/components/eventPrize/EventPrize';
import eventsoverview from '@/constants/eventsoverview';
import EventPrice from '@/components/eventPrice/EventPrice';
import EventDetails from '@/components/eventDetails/EventDetails';
import EventTitleDateTimeImage from '@/components/eventTitleDateTimeImage/EventTitleDateTimeImage';
import EventsDummyData from '@/constants/events';
import EventSpeaker from "@/components/eventspeaker/EventSpeaker";
import EventHost from "@/components/eventhost/EventHost";

const EventOverviewContainer = ({ event }) => {
  const router = useRouter();

  const RegisterClick = () => {
    router.push({ registration });
  };

  return (
    <Box>
      {/* {event.map((event, index) => ( */}

        {/* <Box
          key={event.id 
            // || index
          }
          sx={{
            bgcolor: '#0c1217',
            borderRadius: 3,
            p: 3,
            color: '#b0b0b0',
            justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
          }}
        > */}
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #333',
              pb: 2,
              mb: 2,
            }}
          >

            <EventTitleDateTimeImage key={event.id} title={event.event_title} date={event.event_date} image={event.event_banner} />


            <EventPrice key={event.id} price={event.event_type} />

          </Box>
          
          {/* Prize
            {events.map((event, index) => (
              <EventPrize key={index} prize={event.prize} />
            ))}  */}
          {/* Details */}

          {/* <EventDetails key={index} tagline={event.tagline} overview={event.overview} guidelines={event.guidelines} /> */}
          <Box >
            <EventDetails key={event.id} description={event.event_description} />
          </Box>

          <EventSpeaker key={event.id} speaker_image={event.speaker_image} speaker_intro={event.speaker_intro} speaker_name={event.speaker_name} speaker_linkedin={event.speaker_linkedin} speaker_twitter={event.speaker_twitter} />

          {event?.host_name && event?.host_image && (
            <EventHost key={event.id} host_image={event.host_image} host_name={event.host_name} />
          )}

          {/* Register Button */}
          {event?.registration && (
            <Box sx={{ mt: 4, ml: 2 }}>
              <ApplyNowButton onClick={RegisterClick} text="REGISTRATION" style={{ fontFamily: 'Carme' }} fontSize="12px" disabled={false} />
            </Box>
          )}
        {/* </Box> */}
      {/* ))} */}
    </Box>
  )
}
export default EventOverviewContainer;