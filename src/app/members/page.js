import React from "react";
import styles from "./members.module.css";
import Footer from "@/components/footer/Footer";
import { fetchMembersData } from "@/services/fetch_data_from_firestore";
import MemberCard from "@/components/membersPageComponents/memberCard";


export default async function MembersPage() {

  let members = [];
  try {
    const data = await fetchMembersData('members');
    if (Array.isArray(data)) {
      members = data;
    }
  } catch (error) {
    console.error('Error fetching members:', error);
    // members will remain as empty array
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.membersTag}>Community Dashboard</div>
        <div className={styles.membersTitle}>Our Members</div>
        <MemberCard members={members} />
        <Footer />
      </div>
    </div>
  );
}


