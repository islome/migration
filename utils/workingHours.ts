"use client"

import { useEffect, useState } from "react";

type ScheduleItem = {
  day: string;
  time: string;
  isOpen: boolean;
};

export function useWorkingHours() {
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(false);
  const [workingHours, setWorkingHours] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const updateStatus = () => {
      // Toshkent vaqti (UTC+5)
      const now = new Date();
      // Agar server vaqti noto'g'ri bo'lsa, quyidagini qo'llashingiz mumkin:
      // const now = new Date(Date.now() + 5 * 60 * 60 * 1000); // +5 soat

      const dayOfWeek = now.getDay();           // 0 = yakshanba, 1 = dushanba, ..., 6 = shanba
      const hour = now.getHours();
      const minute = now.getMinutes();

      // Dushanba(1) → Shanba(6) → 9:00 dan 18:00 gacha ochiq
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 6;
      const isInTimeRange = hour >= 9 && hour < 18; // 18:00 da yopiladi

      const isOpenNow = isWeekday && isInTimeRange;

      setIsCurrentlyOpen(isOpenNow);

      const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
      const newSchedule: ScheduleItem[] = days.map((day, index) => {
        const isThisDayWeekday = index >= 1 && index <= 6;
        return {
          day,
          time: isThisDayWeekday ? "09:00 - 18:00" : "Yopiq",
          isOpen: isThisDayWeekday,
        };
      });

      setWorkingHours(newSchedule);
    };

    updateStatus();

    // Har 1 daqiqada yangilab turish (ixtiyoriy, lekin real ko'rinish beradi)
    const interval = setInterval(updateStatus, 60_000);
    return () => clearInterval(interval);
  }, []);

  return { workingHours, isCurrentlyOpen };
}