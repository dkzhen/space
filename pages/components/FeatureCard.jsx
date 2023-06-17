import React from 'react'
import {send,shield,star,
} from "@/public/assets";
import Image from 'next/image';
import styles,{layout} from "@/styles/style";


export default function FeatureCard({ icon, title, content, index }) {
    const features = [
        {
          id: "feature-1",
          icon: star,
          title: "Rewards",
          content:
            "The best credit cards offer some tantalizing combinations of promotions and prizes",
        },
        {
          id: "feature-2",
          icon: shield,
          title: "100% Secured",
          content:
            "We take proactive steps make sure your information and transactions are secure.",
        },
        {
          id: "feature-3",
          icon: send,
          title: "Balance Transfer",
          content:
            "A balance transfer credit card can save you a lot of money in interest charges.",
        },
      ];
      
  return (
    <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <Image src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
  )
}
