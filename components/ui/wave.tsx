// Bosh sahifadagi to'lqin (wave) ajratgich — rangli bo'limdan oq fonga o'tish.
// 1px pastga chiqariladi: aks holda Retina ekranlarda to'lqin ostida
// bo'limning to'q foni ingichka chiziq bo'lib ko'rinib qoladi.
export function Wave() {
  return (
    // Joylashuv inline style'da — CSS kechikib yangilansa ham to'lqin
    // bo'limning pastidan siljib ketmaydi.
    <div
      className="pointer-events-none overflow-hidden leading-none"
      style={{ position: "absolute", left: 0, right: 0, bottom: -1 }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block h-16 w-full"
        aria-hidden="true"
      >
        <path d="M0,60 C300,120 900,0 1200,60 L1200,121 L0,121 Z" fill="white" />
      </svg>
    </div>
  );
}
