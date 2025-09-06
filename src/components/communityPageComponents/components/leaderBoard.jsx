"use client";

import React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import '../css/Leaderboard.css';

const LeaderboardEntry = ({ rank, rankClass, avatar, name, points }) => (
  <>
    <Box className="leaderboard-entry" display="flex" alignItems="center" gap={1}>
      <Box component="span" className={`rank ${rankClass}`} sx={{ minWidth: 20 }}>
        {rank}
      </Box>
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1.5px solid #13FDFD',
          position: 'relative',
        }}
      >
        <Image src={avatar} alt={name} layout="fill" objectFit="cover" priority />
      </Box>
      <Box className="leaderboard-user" display="flex" flexDirection="column" ml={1}>
        <Box component="span" className="name" fontWeight="bold" fontSize={14} color="#fff">
          {name}
        </Box>
        <Box component="span" className="points" fontSize={12} color="#C6E9FF">
          {points} Points
        </Box>
      </Box>
    </Box>
    <hr />
  </>
);

const Leaderboard = () => {
  const entries = [
    { rank: 1, rankClass: 'gold', avatar: '/assets/pic1.png', name: 'Sarah K.', points: 1250 },
    { rank: 2, rankClass: 'silver', avatar: '/assets/pic1.png', name: 'Emma Wilson', points: 1236 },
    { rank: 3, rankClass: 'bronze', avatar: '/assets/pic1.png', name: 'John K.', points: 1210 },
  ];

  return (
    <Box className="leaderboard-container" p={2}>
      <Box className="leaderboard-title-glow" mb={2}>
        <Box className="leaderboard-title-text" fontWeight="600" fontSize={20}>
          Leaderboard
        </Box>
      </Box>
      {entries.map(({ rank, rankClass, avatar, name, points }) => (
        <LeaderboardEntry
          key={rank}
          rank={rank}
          rankClass={rankClass}
          avatar={avatar}
          name={name}
          points={points}
        />
      ))}
    </Box>
  );
};

export default Leaderboard;
