import PageHeader from "@/v2components/PageHeader";
import BottomNav from "@/v2components/BottomNav";
import CommunityBanner from "@/v2components/community/CommunityBanner";
import DiscussionCard from "@/v2components/DiscussionCard";
import Link from "next/link";
import ContributeCard from "@/v2components/ContributeCard";
import StatCard from "@/v2components/StatCard";
import TeamMemberCard from "@/v2components/TeamMemberCard";
import ShadowButton from "@/v2components/ShadowButton";
import { ArrowRight } from "lucide-react";


import {
  fetchMembersData,
  fetchQuestionsData,
  fetchDataFromFirestore,
} from "@/services/fetch_data_from_firestore";

import "./styles.css";
import { Box, Typography } from "@mui/material";
import FeaturedDiscussions from "@/v2components/community/FeaturedDiscussions";
import ContributeSection from "@/v2components/community/Contribute";
import CommunityStats from "@/v2components/community/CommunityStats";

export default async function CommunityPage() {

  const [members, discussions, fetchedStats] = await Promise.all([
    fetchMembersData("members"),
    fetchQuestionsData(),
    fetchDataFromFirestore("homescreen_data", "stats_data").catch(() => null),
  ]);


  const defaultStats = {
    community_member: "500+",
    events_hosted: "50+",
    community_lead: "10+",
  };

  const stats = fetchedStats || defaultStats;

  const statsArray = [
    {
      id: 1,
      value: stats?.community_member || "-",
      label: "Community Members",
    },
    {
      id: 2,
      value: stats?.events_hosted || "-",
      label: "Events Hosted",
    },
    {
      id: 3,
      value: stats?.community_lead || "-",
      label: "Community Leads",
    },
  ];

  const safeMembers = members || [];
  const safeDiscussions = discussions || [];

  const firstRow = safeMembers.slice(
    0,
    Math.ceil(safeMembers.length / 2)
  );
  const secondRow = safeMembers.slice(
    Math.ceil(safeMembers.length / 2)
  );

  return (
    <Box sx={{ padding: '16px 16px', maxWidth: "1200px", margin: "0 auto" }}>
      <PageHeader title="Community" showBell showMore />

      <CommunityBanner width={'100%'} />

      {/* Featured discussions */}
      <FeaturedDiscussions safeDiscussions={safeDiscussions} />

      {/* Contribute */}
      <ContributeSection />

      {/* Community Stats */}
      <CommunityStats statsArray={statsArray} stats={stats} />

      {/* Team */}
      <Box>
        <h2>Our Team</h2>
        <Box className="team-scroll-container">
          <Box className="scroll-row">
            <Box className="scroll-track">
              {[...firstRow, ...firstRow].map((m) => (
                <TeamMemberCard key={m.id} {...m} />
              ))}
            </Box>
          </Box>

          <Box className="scroll-row">
            <Box className="scroll-track reverse">
              {[...secondRow, ...secondRow].map((m) => (
                <TeamMemberCard key={m.id} {...m} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box>
        <h2>
          Built for the <br />
          flutter <br />
          community!
        </h2>
        <p>Crafted with ❤️ by the Flutter Kanpur Community</p>
      </Box>

      <BottomNav />
    </Box>
  );
}
