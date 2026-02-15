"use client";

import { ArrowLeft, MoreVertical, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import "./styles.css";

const PageHeader = ({
  title,
  showBack = false,
  showBell = false,
  showMore = false,
}) => {
  const router = useRouter();

  return (
    <header className="page-header">
      <div className="header-left">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="icon-button"
          >
            <ArrowLeft size={22} />
          </button>
        )}

        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        {showBell && (
          <button className="icon-button">
            <Bell size={20} />
          </button>
        )}

        {showMore && (
          <button className="icon-button">
            <MoreVertical size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
