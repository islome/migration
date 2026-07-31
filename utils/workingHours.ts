"use client"

import { useEffect, useState } from "react";

type ScheduleItem = {
  day: string;
  time: string;
  isOpen: boolean;
};

const DEFAULT_DAYS = [
  "Yakshanba",
  "Dushanba",
  "Seshanba",
  "Chorshanba",
  "Payshanba",
  "Juma",
  "Shanba",
];

// dayNames/closedLabel — i18n uchun (berilmasa uz default).
// Jadval statik (kun nomlari + soatlar), faqat "hozir ochiqmi" holati effect'da.
export function useWorkingHours(dayNames?: string[], closedLabel?: string) {
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState(false);

  const days = dayNames && dayNames.length === 7 ? dayNames : DEFAULT_DAYS;
  const closed = closedLabel ?? "Yopiq";

  const workingHours: ScheduleItem[] = days.map((day, index) => {
    // Dushanba(1) → Shanba(6) — ish kunlari
    const isThisDayWeekday = index >= 1 && index <= 6;
    return {
      day,
      time: isThisDayWeekday ? "09:00 - 18:00" : closed,
      isOpen: isThisDayWeekday,
    };
  });

  useEffect(() => {
    const updateStatus = () => {
      // Toshkent vaqti (UTC+5)
      const now = new Date();

      const dayOfWeek = now.getDay(); // 0 = yakshanba, 1 = dushanba, ..., 6 = shanba
      const hour = now.getHours();

      // Dushanba(1) → Shanba(6) → 9:00 dan 18:00 gacha ochiq
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 6;
      const isInTimeRange = hour >= 9 && hour < 18; // 18:00 da yopiladi

      setIsCurrentlyOpen(isWeekday && isInTimeRange);
    };

    updateStatus();

    // Har 1 daqiqada yangilab turish (ixtiyoriy, lekin real ko'rinish beradi)
    const interval = setInterval(updateStatus, 60_000);
    return () => clearInterval(interval);
  }, []);

  return { workingHours, isCurrentlyOpen };
}
