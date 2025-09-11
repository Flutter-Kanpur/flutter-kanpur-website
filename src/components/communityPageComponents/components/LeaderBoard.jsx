
"use client";
import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Skeleton } from "@/components/components/ui/skeleton";
import { BorderBeam } from "@/components/components/ui/border-beam";

const Leaderboard = ({ entries = [] }) => {
  const isLoading = !entries.length;

  return (
    <Box className="bg-gray-800/40 rounded-3xl p-6 w-full max-w-md">
      {/* Header */}
      <Box className="relative rounded-full shadow-sm w-1/2 mb-4">
        <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
        <Box className="h-full w-full py-1 text-center">
          <h3 className="text-lg">Leaderboard</h3>
        </Box>
      </Box>

      {/* Entries */}
      <Box className="flex flex-col space-y-4 h-[15.6rem] overflow-y-auto scrollbar-hide">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank, i) => (
          <Box key={i} className="flex-shrink-0 flex items-center gap-5">
            <h1
              className={`text-2xl font-bold ${
                rank === 1
                  ? "text-amber-200"
                  : rank === 2
                  ? "text-white"
                  : rank === 3
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
            >
              {rank}
            </h1>

            {isLoading ? (
              <>
                <Skeleton className="h-12 w-12 rounded-full" />
                <Box className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </Box>
              </>
            ) : (
              <>
                <Image
                  className="rounded-full"
                  width={50}
                  height={50}
                  src={entries[i]?.avatar || "/assets/blue.jpg"}
                  alt={`Rank ${rank}`}
                />
                <Box className="border-b-2 border-gray-600 py-2 w-full">
                  <h2 className="text-lg font-bold">{entries[i]?.name}</h2>
                  <span className="text-sm">{entries[i]?.points} points</span>
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