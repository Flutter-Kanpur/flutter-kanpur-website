"use client";
import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import { BorderBeam } from "@/components/components/ui/border-beam";
import { Skeleton } from "@/components/components/ui/skeleton";
import { Button } from "@/components/components/ui/button";

const ActiveMembers = ({ members = [] }) => {
  const isLoading = !members.length;

  return (
    <Box className="w-full max-w-md scrollbar-hidden">
      <section>
        <Box className="relative rounded-full shadow-sm w-1/2 mb-4">
          <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
          <Box className="h-full w-full py-1 text-center">
            <h3 className="text-lg">Active Members</h3>
          </Box>
        </Box>

        {/* Scrollable Row */}
        <Box className="overflow-x-auto scrollbar-hide">
          <Box className="flex gap-2 snap-x snap-mandatory">
            {(isLoading ? Array(5).fill({}) : members).map((member, i) => (
              <Box
                key={i}
                className="flex-shrink-0 snap-start border-2 border-gray-600 rounded-3xl p-3.5 flex flex-col items-center gap-2 w-35"
              >
                {isLoading ? (
                  <>
                    <Skeleton className="h-17 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-11 w-16 rounded-full" />
                  </>
                ) : (
                  <>
                    <Image
                      className="rounded-full"
                      width={60}
                      height={60}
                      src={member.img}
                      alt={member.name}
                    />
                    <h2 className="text-lg text-center">{member.name}</h2>
                    <p className="text-sm text-gray-400 text-center">Software Engineer</p>
                    <Button variant="outline" className="rounded-full px-6 py-1.5 text-sm">
                      View
                    </Button>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </section>
    </Box>
  );
};

export default ActiveMembers;