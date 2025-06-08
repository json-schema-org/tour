"use client";
import ContentViewer from "../ContentViewer/ContentViewer";
import { ReactElement, useState } from "react";
import SolutionTab from "../SolutionTab/SolutionTab";
import TabHeader from "../TabHeader/TabHeader";
import { TabType } from "@/lib/types";
import styles from "./Tabs.module.css";

type ContentTabProps = {
  Page?: ReactElement;
  solution: string  
};

function Tabs({ Page,solution}: ContentTabProps) {
  const [currentSelectedTab,setCurrentSelectedTab] = useState<TabType>("description");
  return (
    <div className={styles.container}>
        <TabHeader  currentSelectedTab={currentSelectedTab} setCurrentSelectedTab={setCurrentSelectedTab} />

    <ContentViewer> 
      {
        currentSelectedTab=="description"?
        Page:
        <SolutionTab solution={solution}/>
      }
    </ContentViewer>
      </div>
  );
}

export default Tabs;
