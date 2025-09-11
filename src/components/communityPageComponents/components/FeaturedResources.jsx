"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { BorderBeam } from "@/components/components/ui/border-beam";
import { Skeleton } from "@/components/components/ui/skeleton";
import { EyeIcon } from "lucide-react";

import "../css/Featured.css";

const FeaturedResources = ({ resources = [] }) => {
  const isLoading = !resources.length;

  return (
    <Box className="featured-resources-container">
      <section>
        {/* Header */}
        <Box className="featured-resources-header">
          <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
          <Typography variant="h6" align="center">
            Featured Resources
          </Typography>
        </Box>

        {/* Scrollable Row */}
        <Box className="featured-resources-scroll">
          {(isLoading ? Array(6).fill({}) : resources).map((res, i) => (
            <Box key={i} className="featured-resource-card">
              {isLoading ? (
                <>
                  <Skeleton className="resource-image-skeleton" />
                  <Skeleton className="resource-title-skeleton" />
                  <Skeleton className="resource-subtitle-skeleton" />
                </>
              ) : (
                <>
                  <Typography variant="subtitle1">{res.title}</Typography>
                  <Image
                    className="resource-image"
                    width={200}
                    height={120}
                    src={res.img}
                    alt={res.title}
                  />
                  <Box className="resource-views">
                    <EyeIcon /> {res.views} Views
                  </Box>
                </>
              )}
            </Box>
          ))}
        </Box>
      </section>
    </Box>
  );
};

export default FeaturedResources;
