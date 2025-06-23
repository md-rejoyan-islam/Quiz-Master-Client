"use client";

import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-work";
import Quizzes from "@/components/home/quizzes";
import Statistics from "@/components/home/statistics";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Statistics />
      <Quizzes />
    </>
  );
}
