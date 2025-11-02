import { Box, Typography } from '@mui/material';
import React from 'react';
import EventCard from '@/components/containers/EventCard';

async function UpcomingEvents({ events }) {

    // Check if events is defined and has the expected properties
    if (!events || (!events.upcoming_events && !events.past_events)) {
        console.log("Events data is not available or malformed:", events);
        return (
            <Box sx={{
                width: "100%",
                background: "#010A10",
                padding: "80px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography variant="h6" color="text.secondary">
                    No events data available
                </Typography>
            </Box>
        );
    }

    let eventsData = (events.upcoming_events && events.upcoming_events.length) 
        ? events.upcoming_events 
        : (events.past_events || []);

    return (
        <Box sx={{
            width: "100%",
            background: "#010A10",
            padding: "80px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                width: "100%",
                background: "#010A10",
                maxWidth: "1300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
            }}>
                {/* Upcoming Events Label */}
                <Box sx={{
                    background: 'transparent',
                    border: '1px solid #2E3942',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    marginBottom: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#FFFFFF',
                }}>
                    Upcoming Events
                </Box>

                {/* Main Heading */}
                <Typography
                    sx={{
                        fontSize: { xs: "28px", md: "36px" },
                        fontWeight: "700",
                        color: "#FFFFFF",
                        textAlign: "left",
                        marginBottom: "60px",
                        fontFamily: "Encode Sans, sans-serif",
                        lineHeight: "1.2"
                    }}
                >
                    Join workshops, hackathons, and design sprints.
                </Typography>

                {/* Event Cards */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "30px",
                    width: "100%",
                    justifyContent: "space-between"
                }}>
                    {eventsData.map((event, index) => (
                        <EventCard
                            key={index}
                            tag={event.tag}
                            date={event.date}
                            time={event.time}
                            title={event.title}
                            description={event.description}
                            style={{ flex: 1 }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default UpcomingEvents;