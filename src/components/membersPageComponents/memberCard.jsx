'use client'

import { Box } from '@mui/material'
import React from 'react'
import styles from '../../app/members/members.module.css'
import ViewProfileButton from '../buttons/ViewProfileButton'
import Image from 'next/image'
import { usePhotoURL } from '@/hooks/usePhotoURL'

const MemberCard = ({ members }) => {

    return (
        <Box className={styles.membersCard}>
            {members.map((member) => (
                <MemberCardItem key={member.id} member={member} />
            ))}
        </Box>

    )
}

function MemberCardItem({ member }) {
    const photoURL = usePhotoURL(member.photoURL || '');

    return (
        <Box className={styles.membersFrame}>
            <Box className={styles.membersImage}>
                <Image
                    src={photoURL || '/placeholder.jpg'}
                    alt={member.author || "author image"}
                    width={350}
                    height={353}
                    style={{ objectFit: "cover", width: "100%", borderRadius: "18px" }}
                    unoptimized
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
    )
}

export default MemberCard
