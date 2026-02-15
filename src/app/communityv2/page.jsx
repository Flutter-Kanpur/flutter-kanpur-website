import PageHeader from "@/v2components/PageHeader";
import BottomNav from "@/v2components/BottomNav";
import CommunityBanner from "@/v2components/CommunityBanner";
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
    <div className="community-container">
      <PageHeader title="Community" showBell showMore />

      <CommunityBanner />

      {/* Featured discussions */}
      <div className="section">
        <div className="section-header">
          <h2>Featured discussions</h2>
          <Link href="/discussion" className="explore-button">
            Explore all
          </Link>
        </div>

        <div className="discussion-scroll">
          
          {safeDiscussions.map((d) => {
  console.log("Discussion ID:", d.id);
  return (
    <DiscussionCard key={d.id} id={d.id} {...d} />
  );
})}

        </div>
      </div>

      {/* Contribute */}
      <div className="section">
        <h2>Contribute</h2>

        <div className="contribute-grid">
          <ContributeCard
            tagLabel="Open to all"
            tagVariant="blue"
            title="Upload Your Projects"
            description="Share your projects with the community to showcase your work."
            href="/project"
          />

          <div className="contribute-right">
            <ContributeCard
              tagLabel="Write for us"
              tagVariant="blue"
              title="Submit a blog request and contribute content that helps the community grow."
              href="/startwriting"
            />

            <ContributeCard
              tagLabel="Get Involved"
              tagVariant="blue"
              title="Join as a Contributor."
              href="/contributor"
            />
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="section">
        <h2>Community Stats</h2>

        <div className="stats-container">
          {statsArray.map((stat) => (
            <StatCard
              key={stat.id}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Join Discord */}
      <div className="section">
        <a
          href={stats.community_discord_link}
          target="_blank"
          rel="noopener noreferrer"
          className="no-link-style"
        >
          <ShadowButton text="Join us on Discord" iconafter={<ArrowRight size={16}/>}/>
        </a>
      </div>

      {/* Team */}
      <div className="section">
        <h2>Our Team</h2>

        <div className="team-scroll-container">
          <div className="scroll-row">
            <div className="scroll-track">
              {[...firstRow, ...firstRow].map((m) => (
                <TeamMemberCard key={m.id} {...m} />
              ))}
            </div>
          </div>

          <div className="scroll-row">
            <div className="scroll-track reverse">
              {[...secondRow, ...secondRow].map((m) => (
                <TeamMemberCard key={m.id} {...m} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <h2>
          Built for the <br />
          flutter <br />
          community!
        </h2>
        <p>Crafted with ❤️ by the Flutter Kanpur Community</p>
      </div>

      <BottomNav />
    </div>
  );
}
