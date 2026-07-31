import type { ReactNode } from "react";

// Admin toolbaridan keladigan [matn](url) formatdagi linklar
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

// Faqat http(s) yoki ichki (/...) URL'larga ruxsat — javascript: kabi
// sxemalar link bo'lmaydi, matn sifatida qoladi.
function isSafeUrl(url: string) {
  return /^https?:\/\//i.test(url) || url.startsWith("/");
}

// Ro'yxat kartochkalari / metadata uchun: link sintaksisini olib tashlab,
// faqat ko'rinadigan matnni qoldiradi.
export function stripBlogLinks(text: string): string {
  return text.replace(LINK_RE, "$1");
}

// Detail sahifa uchun: [matn](url) ni bosiladigan <a> elementiga aylantiradi,
// qolgan matn (yangi qatorlar bilan) o'z holicha qoladi.
export function renderBlogDescription(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;

  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));

    const [, label, url] = m;
    if (isSafeUrl(url)) {
      nodes.push(
        <a
          key={m.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 transition-colors"
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(label);
    }
    last = m.index + m[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
