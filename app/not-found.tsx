import Link from "next/link";

// Global 404 sahifa. Middleware admin bo'lmaganlarni shu sahifaga (404 status
// bilan) rewrite qiladi, shuning uchun admin panel ular uchun "mavjud emas".
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(160deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "420px" }}>
        <p
          style={{
            fontSize: "96px",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-2px",
            margin: 0,
            color: "#89aac3",
          }}
        >
          404
        </p>
        <h1
          style={{
            margin: "12px 0 8px",
            fontSize: "22px",
            fontWeight: 700,
            color: "#0F172A",
          }}
        >
          Sahifa topilmadi
        </h1>
        <p style={{ margin: "0 0 24px", color: "#64748B", fontSize: "15px" }}>
          Siz qidirgan sahifa mavjud emas yoki unga kirish huquqingiz yo'q.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1E293B, #0F172A)",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
