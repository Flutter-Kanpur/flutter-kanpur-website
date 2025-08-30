"use client";

import React from "react";
import NavbarComponent from "@/components/navbar/navbar";
import styles from "./members.module.css";
import Footer from "@/components/footer/Footer";
import ViewProfileButton from "@/components/buttons/ViewProfileButton";

export default function MembersPage() {
  return (
    <div className={styles.container}>
      <NavbarComponent />
      <div className={styles.contentWrapper}>
        <div className={styles.membersTag}>Community Dashboard</div>
        <div className={styles.membersTitle}>Our Members</div>
        <div className={styles.membersCard}>
          <div className={styles.membersFrame}>
            <div className={styles.membersImage}>
              <img
                src="assets/members.svg"
                alt="members"
                width={375.94}
                height={353}
                style={{ borderRadius: "18px", gap: "4px" }}
              />
            </div>
            <div className={styles.membersName}>Ananya Mehta</div>
            <div className={styles.membersRole}>Web Developer</div>
            <div className={styles.membersDescription}>
              A frontend developer who enjoys turning complex problems into
              simple, elegant interfaces. Ravi is always experimenting with new
              frameworks and sipping his third coffee of the day while debugging
              CSS like a champ.
            </div>
            <ViewProfileButton
              text="View Profile"
              width="176.76px"
              height="35.3px"
              fontSize="14px"
              style={{ marginBottom: "20px",marginLeft:"70px" }}
            />
          </div>

          <div className={styles.membersFrame}>
            <div className={styles.membersImage}>
              <img
                src="assets/members.svg"
                alt="members"
                width={375.94}
                height={353}
              />
            </div>
            <div className={styles.membersName}>Ananya Mehta</div>
            <div className={styles.membersRole}>Web Developer</div>
            <div className={styles.membersDescription}>
              A frontend developer who enjoys turning complex problems into
              simple, elegant interfaces. Ravi is always experimenting with new
              frameworks and sipping his third coffee of the day while debugging
              CSS like a champ.
            </div>
            <ViewProfileButton
              text="View Profile"
              width="176.76px"
              height="35.3px"
              fontSize="14px"
              style={{ marginBottom: "20px",marginLeft:"70px" }}
            />
          </div>
          <div className={styles.membersFrame}>
            <div className={styles.membersImage}>
              <img
                src="assets/members.svg"
                alt="members"
                width={375.94}
                height={353}
                style={{ borderRadius: "18px", gap: "4px" }}
              />
            </div>
            <div className={styles.membersName}>Ananya Mehta</div>
            <div className={styles.membersRole}>Web Developer</div>
            <div className={styles.membersDescription}>
              A frontend developer who enjoys turning complex problems into
              simple, elegant interfaces. Ravi is always experimenting with new
              frameworks and sipping his third coffee of the day while debugging
              CSS like a champ.
            </div>
            <ViewProfileButton
              text="View Profile"
              width="176.76px"
              height="35.3px"
              fontSize="14px"
               style={{ marginBottom: "20px",marginLeft:"70px" }}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
