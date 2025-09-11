"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button"; 
import { BorderBeam } from "@/components/components/ui/border-beam";
import { Skeleton } from "@/components/components/ui/skeleton";

import "../css/ActiveMember.css"

const ActiveMembers = ({ members = [] }) => {
  const isLoading = !members.length;

  return (
    <Box className="active-members-container">
      <section>
        {/* Header */}
        <Box className="active-members-header">
          <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
          <Typography variant="h6">Active Members</Typography>
        </Box>

        {/* Scrollable Row */}
        <Box className="active-members-scroll">
          {(isLoading ? Array(5).fill({}) : members).map((member, i) => (
            <Box key={i} className="active-member-card">
              {isLoading ? (
                <>
                  <Skeleton className="avatar-skeleton" />
                  <Skeleton className="line-skeleton short" />
                  <Skeleton className="line-skeleton medium" />
                  <Skeleton className="button-skeleton" />
                </>
              ) : (
                <>
                  <Image
                    className="avatar"
                    width={60}
                    height={60}
                    src={member.img}
                    alt={member.name}
                  />
                  <Typography variant="subtitle1" align="center">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" className="role-text">
                    Software Engineer
                  </Typography>
                  <Button
                    variant="outlined"
                    className="view-button"
                  >
                    View
                  </Button>
                </>
              )}
            </Box>
          ))}
        </Box>
      </section>
    </Box>
  );
};

export default ActiveMembers;
