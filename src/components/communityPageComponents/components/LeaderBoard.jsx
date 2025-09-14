"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Skeleton } from "@/components/components/ui/skeleton";
import { BorderBeam } from "@/components/components/ui/border-beam";

import "../css/Leaderboard.css";

const Leaderboard = ({ entries = [] }) => {
  const isLoading = !entries.length;

  const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "#facc15"; // amber-200
      case 2:
        return "#ffffff"; // white
      case 3:
        return "#f87171"; // red-400
      default:
        return "#d1d5db"; // gray-300
    }
  };

  return (
    <Box className="leaderboard-container">
      {/* Header */}
      <Box className="leaderboard-header">
        <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
        <Typography variant="h6" align="center">
          Leaderboard
        </Typography>
      </Box>

      {/* Entries */}
      <Box className="leaderboard-entries">
        {ranks.map((rank, i) => (
          <Box key={i} className="leaderboard-entry">
            <Typography
              className="leaderboard-rank"
              style={{ color: getRankColor(rank) }}
            >
              {rank}
            </Typography>
            {isLoading ? (
              <>
                <Skeleton className="entry-avatar-skeleton" />
                <Box className="entry-info-skeleton">
                  <Skeleton className="entry-name-skeleton" />
                  <Skeleton className="entry-points-skeleton" />
                </Box>
              </>
            ) : (
              <>
                <Image
                  className="entry-avatar"
                  width={50}
                  height={50}
                  src={entries[i]?.avatar || "/assets/blue.jpg"}
                  alt={`Rank ${rank}`}
                />
                <Box className="entry-info">
                  <Typography variant="subtitle1" className="entry-name">
                    {entries[i]?.name}
                  </Typography>
                  <Typography variant="body2" className="entry-points">
                    {entries[i]?.points} points
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Leaderboard;
