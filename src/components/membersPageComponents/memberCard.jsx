'use client'

import { Box } from '@mui/material'
import React from 'react'
import styles from '../../app/members/members.module.css'
import ViewProfileButton from '../buttons/ViewProfileButton'
import Image from 'next/image'

const MemberCard = ({ members }) => {

    console.log(members, "members data in member card")

    return (
        <Box className={styles.membersCard}>
            {members.map((member) => (
                <Box key={member.id} className={styles.membersFrame}>
                    <Box className={styles.membersImage}>
                        <Image
                            src={member.photoURL}
                            alt={member.author}
                            width={375.94}
                            height={353}
                            style={{ borderRadius: "18px" }}
                        />
                    </Box>
                    <Box className={styles.membersName}>{member.name}</Box>
                    <Box className={styles.membersRole}># {member.tagline}</Box>
                    <Box className={styles.membersDescription}>{member.intro}</Box>

                    <ViewProfileButton
                        text="LinkedIn"
                        width="176.76px"
                        height="35.3px"
                        fontSize="14px"
                        style={{ marginLeft: "70px", marginTop: "auto" }}
                        onClick={() => window.open(member.linkedin, "_blank")}
                    />
                </Box>
            ))}
        </Box>

    )
}

export default MemberCard
