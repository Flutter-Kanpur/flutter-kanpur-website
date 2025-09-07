import React from "react";
import NavbarComponent from "@/components/navbar/navbar";
import styles from "./members.module.css";
import Footer from "@/components/footer/Footer";
import { fetchMembersData } from "@/services/fetch_data_from_firestore";
import MemberCard from "@/components/membersPageComponents/memberCard";


export default async function MembersPage() {

  const data = await fetchMembersData('members');
  const members = data || [];

  return (
    <div className={styles.container}>
      <NavbarComponent />
      <div className={styles.contentWrapper}>
        <div className={styles.membersTag}>Community Dashboard</div>
        <div className={styles.membersTitle}>Our Members</div>
        <MemberCard members={members} />
        <Footer />
      </div>
    </div>
  );
}


