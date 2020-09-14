import React from "react";
import styles from "./style.module.scss";

export interface NoticeItemProps {
  heading: string;
  user: string;
  time: string;
  body: string;
}

const NoticeItem: React.FC<NoticeItemProps> = ({
  heading,
  user,
  time,
  body
}: NoticeItemProps) => {
  return (
    <>
      <div style={{ marginTop: "1.25rem" }} className={styles.noticeContainer}>
        <p className={styles.noticeHeading}>{heading}</p>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles.noticeUser}>{user}</p>
          <p className={styles.noticeTime}>{time}</p>
        </span>
        <p className={styles.noticeBody}>{body}</p>
      </div>
    </>
  );
};

export default NoticeItem;
