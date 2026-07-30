-- ============================================================================
-- BLOG RASM (IMAGE) QO'LLAB-QUVVATLASH
-- Supabase Dashboard -> SQL Editor da ishga tushiring (bir marta).
--
-- Maqsad: blogga video BO'LMAGANDA rasm yuklab qo'yish imkoni (better than nothing).
--   • blogs.image_url — rasm public URL'i uchun yangi ustun
--   • blogs.video_url — endi NULL bo'lishi mumkin (faqat rasmli blog uchun)
--   • blog-images — rasm bucket (public read + anon write, mavjud pattern bilan bir xil)
-- ============================================================================


-- ────────────────────────────────────────────────────────────────────────────
-- 1) blogs jadvali: image_url ustuni + video_url'ni ixtiyoriy qilish
-- ────────────────────────────────────────────────────────────────────────────
alter table public.blogs add column if not exists image_url text;

-- video_url endi majburiy emas (faqat rasm yuklangan blog bo'lishi mumkin)
alter table public.blogs alter column video_url drop not null;


-- ────────────────────────────────────────────────────────────────────────────
-- 2) STORAGE: blog-images bucket (public read + anon upload/update/delete)
--    (videos / country-images bucketlari bilan bir xil model)
-- ────────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public) values
  ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

drop policy if exists "blog-images_read" on storage.objects;
create policy "blog-images_read" on storage.objects
  for select to anon, authenticated using (bucket_id = 'blog-images');

drop policy if exists "blog-images_insert" on storage.objects;
create policy "blog-images_insert" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'blog-images');

drop policy if exists "blog-images_update" on storage.objects;
create policy "blog-images_update" on storage.objects
  for update to anon, authenticated using (bucket_id = 'blog-images') with check (bucket_id = 'blog-images');

drop policy if exists "blog-images_delete" on storage.objects;
create policy "blog-images_delete" on storage.objects
  for delete to anon, authenticated using (bucket_id = 'blog-images');


-- ============================================================================
-- TEKSHIRISH:
--   select column_name, is_nullable from information_schema.columns
--   where table_schema = 'public' and table_name = 'blogs'
--     and column_name in ('video_url','image_url');
--   -- image_url mavjud, video_url is_nullable = YES bo'lishi kerak.
-- ============================================================================
