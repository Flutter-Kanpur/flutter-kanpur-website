
"use client";
import React from "react";
import Box from "@mui/material/Box";
import NavbarComponent from "../../components/navbar/navbar";

import Leaderboard from "../../components/communityPageComponents/LeaderBoard";
import FeaturedResources from "../../components/communityPageComponents/FeaturedResources";
import ActiveMembers from "../../components/communityPageComponents/FeaturedResources";

import { IconMessages } from "@tabler/icons-react";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/components/ui/skeleton";
import { BorderBeam } from "@/components/components/ui/border-beam";

//Discussion Card
const DiscussionCard = ({ discussion }) => {
  if (!discussion) {
    return (
      <Box className="relative rounded-2xl  p-5  ">
        <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
        <Box className="flex justify-between items-center">
          <Box className="flex flex-col gap-2 px-4 mt-3">
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-3 w-40" />
            <Box className="flex gap-6 mt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </Box>
          </Box>
          <Skeleton className="h-12 w-12 rounded-full" />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="relative rounded-2xl p-1 ">
      <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
      <Box className="flex justify-between items-center">
        <Box>
          <h1 className="text-2xl px-5 font-semibold mt-3">{discussion.title}</h1>
          <span className="text-sm px-4 py-0.5 text-gray-400 block">{discussion.message}</span>
          <Box className="flex gap-6 mt-2 text-gray-400 text-xs">
            <Box className="flex gap-2 px-4 mb-1.5 items-center">
              <IconMessages /> {discussion.replies} Replies
            </Box>
            <Box className="flex gap-2 items-center">
              <EyeIcon /> {discussion.views} Views
            </Box>
          </Box>
        </Box>
        <Box className="flex-shrink-0 mr-10 mt-3">
          <Image
            src={discussion.avatar}
            alt={discussion.name || "Discussion Avatar"}
            width={60}
            height={60}
            className="rounded-full border ml-10"
          />
        </Box>
      </Box>
    </Box>
  );
};


const Community = ({ discussions = [], resources = [], members = [], leaderboard = [] }) => {
  return (
    <Box className="community-container min-h-screen bg-[#0f172a] text-white scrollbar-hide">
      <NavbarComponent />

      <Box className="community-section px-16 py-10 space-y-7">
        {/* Dashboard Button */}
        <Box className="relative rounded-[0.275rem] shadow-sm w-fit text-md p-0.5">
          <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
          <Box className="h-full w-full py-2 px-4 text-center">
            <h3 className="text-lg">Community Dashboard</h3>
          </Box>
        </Box>

        {/* Headline */}
        <h1 className="headline text-5xl font-bold">Connect. Collaborate. Grow.</h1>

        {/*  Grid Layout */}
        <Box className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Discussions (left side) */}
          <Box className="col-span-2 space-y-6">
            {discussions.length ? (
              discussions.slice(0, 2).map((d, i) => <DiscussionCard key={i} discussion={d} />)
            ) : (
              <>
                <DiscussionCard />
                <DiscussionCard />
              </>
            )}

            <FeaturedResources resources={resources} />
          </Box>

          {/* Sidebar (right side) */}
          <Box className="col-span-1 space-y-6">
            <Leaderboard entries={leaderboard} />
            <ActiveMembers members={members} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Community;

