"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import "../css/ActiveMembers.css";

const MemberCard = ({ id, name, role, img }) => (
  <article className="member-card">
    <Box sx={{ position: "relative", width: 44, height: 44, borderRadius: "50%", overflow: "hidden", border: "1.5px solid #13FDFD" }}>
      <Image src={img} alt={name} layout="fill" objectFit="cover" />
    </Box>
    <h3 className="member-name">{name}</h3>
    <p className="member-role">{role}</p>
    <Link href={`/profile/${id}`} className="view-btn">
      View
    </Link>
  </article>
);

const ActiveMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempMembers = [
      { id: 1, name: "John K", role: "UI/UX Designer", img: "/images/john.png" },
      { id: 2, name: "Sarah M", role: "Frontend Developer", img: "/images/john.png" },
      { id: 3, name: "David P", role: "Backend Engineer", img: "/images/john.png" },
    ];
    setMembers(tempMembers);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading members...</p>;
  }

  return (
    <section className="active-members-container">
      <button className="active-members-btn">Active Members</button>
      <Box className="members-grid">
        {members.map(({ id, name, role, img }) => (
          <MemberCard key={id} id={id} name={name} role={role} img={img} />
        ))}
      </Box>
    </section>
  );
};

export default ActiveMembers;
