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
        {entries.map((rank, i) => (
          <Box key={i} className="leaderboard-entry">
            <Typography
              className="leaderboard-rank"
              style={{ color: getRankColor(i) }}
            >
              {i + 1}
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
                {rank?.imageURL ? (
                  <Image
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%", aspectRatio: "1/1", objectFit: "cover" }}
                    src={rank.imageURL}
                    alt={`Rank ${i + 1} Avatar`}
                  />
                ) : (
                  <div
                    style={{
                      width: 75,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "20px"
                    }}
                  >
                    {rank?.member_name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <Box className="entry-info">
                  <Typography variant="subtitle1" className="entry-nam">
                    {rank?.member_name}
                  </Typography>
                  <Typography variant="body2" className="entry-points">
                    {rank?.points} points
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
