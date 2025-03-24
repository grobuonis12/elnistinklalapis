"use client";

import React from "react";
import { cn } from "@/utilities/ui";

interface InternalPageProps {
  title: string;
  description: string;
  embedForm?: string;
}

const styles = {
  container: "w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg",
  titleWrapper: "relative inline-block mb-8",
  title: "relative bg-yellow-400 text-black font-bold text-2xl md:text-3xl px-8 py-4 rounded-full shadow-lg",
  titleShadow: "absolute top-2 left-2 w-full h-full bg-black rounded-full -z-10 blur-md",
  description: "text-lg mb-6 text-black",
};

const InternalPageComponent: React.FC<InternalPageProps> = ({ 
  title, 
  description, 
  embedForm
}) => {
  return (
    <div className={styles.container}>
      {/* Title with shadow effect */}
      <div className="flex justify-center w-full">
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.titleShadow}></div>
        </div>
      </div>

      {/* Description */}
      <p className={styles.description}>{description}</p>

      {/* Embed Form */}
      {embedForm && (
        <div
          className="embed-form text-black mt-6"
          dangerouslySetInnerHTML={{ __html: embedForm }}
        />
      )}
    </div>
  );
};

export default InternalPageComponent;