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
import EventDateTime from '@/components/eventDateTime/EventDateTime';
import EventDetails from '@/components/eventDetails/EventDetails';
import EventTitleTypeImage from '@/components/eventTitleTypeImage/EventTitleTypeImage';
import EventsDummyData from '@/constants/events';
import EventSpeaker from "@/components/eventspeaker/EventSpeaker";
import EventHost from "@/components/eventhost/EventHost";
import { px } from "framer-motion";

const EventOverviewContainer = ({ event }) => {
  const router = useRouter();

  const RegisterClick = () => {
    router.push({ registration });
  };

  return (
    <Box >

      <Box
        sx={{
          mb: '5%',
          mt: '8%',
          mx: '10%',
        }}
      >

        <EventTitleTypeImage key={event.id} title={event.event_title} type={event.event_type} image={event.event_banner} />
      </Box>

      {/* Prize
            {events.map((event, index) => (
              <EventPrize key={index} prize={event.prize} />
            ))}  */}

      <Box sx={{
        mb: '5%',
        mx: '10%',
      }} >
        <EventDetails key={event.id} description={event.event_description} short_description={event.event_short_description} />
      </Box>

      <Box sx={{
        pb: '5%',
      }}>
        <EventDateTime key={event.id} date={event.event_date} />
      </Box>

      <Box sx={{
        mx: '10%',
        mb: '8%',
      }}>
        <EventSpeaker key={event.id} speaker_image={event.speaker_image} speaker_intro={event.speaker_intro} speaker_name={event.speaker_name} speaker_linkedin={event.speaker_linkedin} speaker_twitter={event.speaker_twitter} />
      </Box>


      {event?.host_name && event?.host_image && (
        <Box sx={{
          mx: '10%',
          mb: '8%',
        }}>
          <EventHost key={event.id} host_image={event.host_image} host_name={event.host_name} />
        </Box>
      )}

      {/* Register Button */}
      {event?.registration && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '8%', }}>
          <ApplyNowButton onClick={RegisterClick} text="REGISTER" style={{ fontFamily: 'Carme', px: 14, py: 2 }} fontSize="24px" disabled={false} />
        </Box>
      )}

    </Box>
  )
}
export default EventOverviewContainer;