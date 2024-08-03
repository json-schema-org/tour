"use client";

import React, { useEffect, useState } from "react";
import Like from "@/app/styles/icons/BiLike";
import Dislike from "@/app/styles/icons/BiDislike";
import { Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import styles from "./Feedback.module.css";

export default function Feedback() {
  const APIRoute =
    "https://script.google.com/macros/s/AKfycbz0f87eDgEghSelILb3RSdHe-Rr7HKAdMxx8tvTq4fNAfJt0fZ7t-G-p1BrVEQM2Mws/exec";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const submitFeedback = async (feedback: string) => {
    await fetch(APIRoute, {
      method: "POST",
      body: JSON.stringify({
        feedback: feedback,
        path: pathname,
      }),
    });
    const feedbackStorage = localStorage.getItem("feedback");
    if (feedbackStorage) {
      const feedbackData = JSON.parse(feedbackStorage);
      feedbackData.push(pathname);
      localStorage.setItem("feedback", JSON.stringify(feedbackData));
    }
  };

  useEffect(() => {
    const feedbackStorage = localStorage.getItem("feedback");
    if (feedbackStorage) {
      const feedbackData = JSON.parse(feedbackStorage);
      if (feedbackData.includes(pathname)) {
        setIsSubmitted(true);
      }
    } else {
      localStorage.setItem("feedback", JSON.stringify([]));
    }
  }, []);

  if (isSubmitted) {
    return (
      <Flex
        dir="row"
        justifyContent={"end"}
        gap={"10px"}
        className={styles.feedbackSubmitted}
      >
        Feedback submitted. Thank you!
      </Flex>
    );
  }
  return (
    <Flex dir="row" justifyContent={"end"} gap={"10px"}>
      <button
        onClick={() => {
          submitFeedback("like");
          setIsSubmitted(true);
        }}
      >
        <Like />
      </button>
      <button
        onClick={() => {
          submitFeedback("dislike");
          setIsSubmitted(true);
        }}
      >
        <Dislike />
      </button>
    </Flex>
  );
}
