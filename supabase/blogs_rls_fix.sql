-- ============================================================================
-- FIX: "new row violates row-level security policy for table blogs"
--   (rasm-only blog yaratganda — chunki video_url = null yuboriladi)
--
-- Sabab: blogs jadvalidagi anon INSERT policy yo yo'q, yo buzilgan
--   (yoki video_url'ni null bo'lishiga ruxsat bermaydigan shart bor).
--   Bu — jadval RLS'i, bucket bilan aloqasi yo'q (rasm allaqachon yuklangan).
--
-- Supabase Dashboard -> SQL Editor da ishga tushiring.
-- ============================================================================


-- ── (ixtiyoriy) DIAGNOSTIKA: hozir nima borligini ko'rish ───────────────────
-- Quyidagi 2 select'ni alohida ishga tushirib, holatni ko'rishingiz mumkin:

-- select policyname, cmd, roles, with_check
-- from pg_policies
-- where schemaname = 'public' and tablename = 'blogs' and cmd = 'INSERT';

-- select column_name, is_nullable
-- from information_schema.columns
-- where table_schema = 'public' and table_name = 'blogs'
--   and column_name in ('video_url', 'image_url');
--   -- image_url mavjud, video_url is_nullable = YES bo'lishi kerak.


-- ── FIX ─────────────────────────────────────────────────────────────────────

-- 1) video_url endi NULL bo'la oladi (faqat rasmli blog uchun)
alter table public.blogs alter column video_url drop not null;

-- 2) blogs uchun anon INSERT policy'sini OCHIQ (with check true) holatga qaytarish
--    (bu — rls_policies.sql dagi mo'ljallangan holat: blogs = anon-write)
alter table public.blogs enable row level security;

drop policy if exists "blogs_anon_insert" on public.blogs;
create policy "blogs_anon_insert" on public.blogs
  for insert to anon, authenticated with check (true);


-- ── TEKSHIRISH ──────────────────────────────────────────────────────────────
-- Endi with_check = 'true' bo'lishi kerak:
-- select policyname, cmd, with_check from pg_policies
-- where schemaname='public' and tablename='blogs' and cmd='INSERT';
-- ============================================================================
