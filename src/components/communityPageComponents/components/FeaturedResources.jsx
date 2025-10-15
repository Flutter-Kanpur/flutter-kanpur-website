"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { BorderBeam } from "@/components/components/ui/border-beam";
import { Skeleton } from "@/components/components/ui/skeleton";

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
            res.resource_URL !== '' &&
            <Box onClick={() => window.open(res.resource_URL, "_blank")} key={i} className="featured-resource-card">
              {isLoading ? (
                <>
                  <Skeleton className="resource-image-skeleton" />
                  <Skeleton className="resource-title-skeleton" />
                  <Skeleton className="resource-subtitle-skeleton" />
                </>
              ) : (
                <>
                  <Typography variant="subtitle1">{res.resource_title}</Typography>
                  <Image
                    className="resource-image"
                    width={200}
                    height={120}
                    src={res.resource_image}
                    alt={res.resource_title}
                  />
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
