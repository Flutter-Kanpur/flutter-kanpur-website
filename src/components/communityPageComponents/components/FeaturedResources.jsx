
"use client";
import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import { BorderBeam } from "@/components/components/ui/border-beam";
import { Skeleton } from "@/components/components/ui/skeleton";
import { EyeIcon } from "lucide-react";

const FeaturedResources = ({ resources = [] }) => {
  const isLoading = !resources.length;

  return (
    <Box className="p-10 bg-gray-800/40 rounded-3xl w-full mt-11 scrollbar-hidden">
      <section>
        <Box className="relative rounded-full shadow-sm w-55 mb-7">
          <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
          <Box className="h-full w-55 py-1 text-center">
            <h3 className="text-lg">Featured Resources</h3>
          </Box>
        </Box>

        <Box className="overflow-x-auto scrollbar-hide">
          <Box className="flex gap-5 snap-x snap-mandatory">
            {(isLoading ? Array(6).fill({}) : resources).map((res, i) => (
              <Box
                key={i}
                className="flex-shrink-0 snap-start border-2 border-gray-600 rounded-3xl p-4 flex flex-col gap-2 w-48"
              >
                {isLoading ? (
                  <>
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </>
                ) : (
                  <>
                    <h2 className="text-lg">{res.title}</h2>
                    <Image
                      className="w-40 rounded-[0.5rem] h-25 object-cover"
                      width={60}
                      height={60}
                      src={res.img}
                      alt={res.title}
                    />
                    <Box className="flex gap-2 items-center">
                      <EyeIcon /> {res.views} Views
                    </Box>
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

export default FeaturedResources;