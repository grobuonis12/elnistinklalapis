"use client";

import React from "react";
import { cn } from "@/utilities/ui";
import Chat from "../Chat";

interface InternalPageProps {
  title: string;
  chatbot?: string;
}

const styles = {
  container: "w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg",
  titleWrapper: "relative inline-block mb-8",
  title: "relative bg-[#FFDE59] text-black font-bold text-2xl md:text-3xl px-8 py-4 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
};

const InternalPageComponent: React.FC<InternalPageProps> = ({ 
  title,
  chatbot
}) => {
  return (
    <div className={styles.container}>
      {/* Title with shadow effect */}
      <div className="flex justify-center w-full">
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>

      {/* Chat Component */}
      {chatbot && (
        <Chat pageId={chatbot} className="mt-8" />
      )}
    </div>
  );
};

export default InternalPageComponent;