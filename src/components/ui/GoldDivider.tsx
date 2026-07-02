"use client";

import { motion } from "framer-motion";

interface GoldDividerProps {
  width?: string;
  className?: string;
}

export function GoldDivider({ width = "80px", className = "" }: GoldDividerProps) {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent ${className}`}
    />
  );
}
