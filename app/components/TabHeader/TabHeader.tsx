"use client";
import { useUserSolutionStore } from "@/lib/stores";
import styles from "./TabHeader.module.css";

type TabHeaderProps = {
  currentSelectedTab: "description" | "solution";
  setCurrentSelectedTab: (tab: "description" | "solution") => void;
};

const TabHeader = ({
  currentSelectedTab,
  setCurrentSelectedTab,
}: TabHeaderProps & {
  currentSelectedTab: "description" | "solution";
  setCurrentSelectedTab: (tab: "description" | "solution") => void;
}) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabContainer}>
        <button
          onClick={() => setCurrentSelectedTab("description")}
          className={`${styles.tabButton} ${
            currentSelectedTab === "description" ? styles.activeTab : ""
          }`}
        >
          Description
          {currentSelectedTab === "description" && (
            <div className={styles.underline} />
          )}
        </button>

        <button
          onClick={() => setCurrentSelectedTab("solution")}
          className={`${styles.tabButton} ${
            currentSelectedTab === "solution" ? styles.activeTab : ""
          }`}
        >
          Solution
          {currentSelectedTab === "solution" && (
            <div className={styles.underline} />
          )}
        </button>
      </div>
    </div>
  );
};

export default TabHeader;
