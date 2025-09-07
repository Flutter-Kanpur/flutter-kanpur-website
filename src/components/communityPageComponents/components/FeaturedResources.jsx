"use client";

import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import "../css/FeaturedResources.css";

const ResourceCard = ({ img, title, views }) => (
  <Box className="resource-card" >
    <Box sx={{ position: "relative", width: "100%", height: 84, borderRadius: "15px 15px 0 0", overflow: "hidden" }}>
      <Image src={img} alt={title} layout="fill" objectFit="cover" />
    </Box>
    <Box className="resource-title" mt={1} fontWeight="500" fontSize={14} color="#fff">
      {title}
    </Box>
    <Box className="views" fontSize={11} color="#D9D9D9" display="flex" alignItems="center" gap={0.5}>
      <span>▶</span> {views} Views
    </Box>
  </Box>
);

const FeaturedResources = () => {
  const resources = [
    { img: "/resource1.png", title: "Flutter Animation Masterclass", views: 24 },
    { img: "/resource2.png", title: "Flutter Animation Masterclass", views: 24 },
    { img: "/resource3.png", title: "Flutter Animation Masterclass", views: 24 },
    { img: "/resource4.png", title: "Flutter Animation Masterclass", views: 24 },
  ];

  return (
    <Box className="featured-resources-container" p={2}>
      <Box className="featured-resources-header" mb={2} fontWeight="600" fontSize={18} color="#fff">
        Featured Resources
      </Box>
      <Box className="resource-cards" display="flex" gap={2} flexWrap="wrap">
        {resources.map((res, idx) => (
          <ResourceCard key={idx} img={res.img} title={res.title} views={res.views} />
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedResources;
