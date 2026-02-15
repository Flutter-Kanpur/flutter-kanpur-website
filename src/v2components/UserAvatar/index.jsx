"use client";

import "./styles.css";
import Image from "next/image";

const colors = ["color-1", "color-2", "color-3", "color-4"];

const UserAvatar = ({ name, size = "md", imageUrl }) => {

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        className={`avatar avatar-${size}`}
        width={48}
        height={48}
      />
    );
  }

      const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const colorIndex = name.length % colors.length;


  return (
    <div className={`avatar avatar-${size}  ${colors[colorIndex]} `}>
      {initials}
    </div>
  );
};

export default UserAvatar;
