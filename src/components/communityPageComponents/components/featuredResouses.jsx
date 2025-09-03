import React from "react";
import styles from "../../communityPageComponents/css/communityPage.module.css";

// import resource1 from "../../assets/resource1.png";
// import resource2 from "../../assets/resource2.png";
// import resource3 from "../../assets/resource3.png";
// import resource4 from "../../assets/resource4.png";

const FeaturedResources = () => {
  const resources = [
    { img: "resource1", title: "Flutter Animation Masterclass", views: 24 },
    { img: "resource2", title: "Flutter Animation Masterclass", views: 24 },
    { img: "resource3", title: "Flutter Animation Masterclass", views: 24 },
    { img: "resource4", title: "Flutter Animation Masterclass", views: 24 },
  ];

  return (
    <div className={styles.featured_resources_container}>
      <div className={styles.featured_resources_header}>
        <span>Featured Resources</span>
      </div>

      <div className={styles.resource_cards}>
        {resources.map((res, idx) => (
          <div key={idx} className={styles.resource_card}>
            <img src={res.img} alt={res.title} />
            <div className={styles.resource_title}>{res.title}</div>
            <div className={styles.views}><span>▶</span> {res.views} Views</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedResources;
