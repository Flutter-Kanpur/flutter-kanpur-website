import TagBadge from "@/v2components/TagBadge";
import "./styles.css";
import Link from "next/link";

const ContributeCard = ({
  tagLabel,
  tagVariant,
  title,
  description,
  href,
}) => {

  const CardContent = (
    <div className="contribute-card">
      <TagBadge label={tagLabel} variant={tagVariant} />

      <h3 className="contribute-title">
        {title}
      </h3>

      <p className="contribute-description">
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-link-style">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default ContributeCard;

