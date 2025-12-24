'use client';
const { useRouter } = require("next/navigation");
import Box from "@mui/material/Box";
import { BorderBeam } from "@/components/components/ui/border-beam";
import { Skeleton } from "@/components/components/ui/skeleton";
import { IconMessages } from "@tabler/icons-react";
import { formatTextWithCode } from "@/lib/utils/formatCode";




// Discussion Card
export const DiscussionCard = ({ discussion }) => {
    //  (discussion, "discussion");
    const router = useRouter();
    if (!discussion) {
        return (
            <Box className="discussion-card loading">
                <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} />
                <Box className="discussion-content">
                    <Box className="discussion-text">
                        <Skeleton className="skeleton-title" />
                        <Skeleton className="skeleton-subtitle" />
                        <Box className="discussion-meta">
                            <Skeleton className="skeleton-meta" />
                            <Skeleton className="skeleton-meta" />
                        </Box>
                    </Box>
                    <Skeleton className="skeleton-avatar" />
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => { router.push(`/forum/${discussion.id}`) }}
            className="discussion-card">
            {/* <BorderBeam lightColor="#13fdfd" lightWidth={350} duration={8} /> */}
            <Box className="discussion-content">
                <Box>
                    <h1 className="discussion-title">
                        {discussion.title}
                    </h1>
                    <Box className="discussion-message">
                        {formatTextWithCode(
                            discussion.body.length > 100
                                ? discussion.body.slice(0, 100) + " ... See More"
                                : discussion.body
                        )}
                    </Box>
                    <Box className="discussion-meta">
                        <Box className="meta-item">
                            <IconMessages /> {discussion.answers.length || 1} Replies
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};