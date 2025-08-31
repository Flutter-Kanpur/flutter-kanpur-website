"use client";

import React, { useEffect, useState } from "react";
import NavbarComponent from "@/components/navbar/navbar";
import styles from "./members.module.css";
import Footer from "@/components/footer/Footer";
import ViewProfileButton from "@/components/buttons/ViewProfileButton";

// Firestore imports
import { db } from "@/lib/firebase/setup";
import { collection, getDocs } from "firebase/firestore";
import { margin } from "@mui/system";

export default function MembersPage() {
  const [members, setMembers] = useState([]);

  // Fetch members data from Firestore
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "members")); // <-- collection name
        const membersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(membersData, "fetched members data");
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const getDriveDirectLink = (url) => {
    if (!url) return "";
    const match = url.match(/[-\w]{25,}/); // extract fileId
    return match
      ? `https://drive.google.com/thumbnail?id=${match[0]}&sz=w1000`
      : url;
  };

  return (
    <div className={styles.container}>
      <NavbarComponent />
      <div className={styles.contentWrapper}>
        <div className={styles.membersTag}>Community Dashboard</div>
        <div className={styles.membersTitle}>Our Members</div>

        <div className={styles.membersCard}>
          {members.map((member) => (
            <div key={member.id} className={styles.membersFrame}>
              <div className={styles.membersImage}>
                <img
                  src={getDriveDirectLink(member.photoURL)}
                  alt={member.author}
                  width={375.94}
                  height={353}
                  style={{ borderRadius: "18px" }}
                />
              </div>
              <div className={styles.membersName}>{member.name}</div>
              <div className={styles.membersRole}># {member.tagline}</div>
              <div className={styles.membersDescription}>{member.intro}</div>
              <ViewProfileButton
                text="LinkedIn Profile"
                width="176.76px"
                height="35.3px"
                fontSize="14px"
                style={{ marginLeft: "70px", marginTop: "auto" }}
                onClick={() => window.open(member.linkedin, "_blank")}
              />
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
