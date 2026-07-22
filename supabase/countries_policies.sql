-- ============================================================================
-- countries + country-images — YOZISH policy'lari (401 fix)
-- Supabase Dashboard -> SQL Editor da BIR MARTA ishga tushiring.
--
-- ⚠️  XAVFSIZLIK OGOHLANTIRISHI
-- Bu policy'lar brauzerda ko'rinadigan PUBLIC anon key bilan countries jadvaliga
-- INSERT / UPDATE / DELETE va rasm yuklashga ruxsat beradi. Bu 401 ni tuzatadi,
-- LEKIN countries jadvali anon key'i bor har qanday odam uchun yoziladigan bo'lib
-- qoladi. Next.js middleware faqat admin *sahifalarini* himoya qiladi, *jadvalni*
-- emas. To'liq himoya uchun: yozishni server-side API (service_role key) ga
-- ko'chirib, bu anon yozish policy'larini O'CHIRIB qo'ying.
-- ============================================================================

-- ---- countries jadvali -----------------------------------------------------
alter table public.countries enable row level security;

-- public o'qish (mavjud bo'lsa ham qayta yaratamiz)
drop policy if exists "countries_select_public" on public.countries;
create policy "countries_select_public"
  on public.countries for select
  to anon, authenticated
  using (true);

drop policy if exists "countries_insert_anon" on public.countries;
create policy "countries_insert_anon"
  on public.countries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "countries_update_anon" on public.countries;
create policy "countries_update_anon"
  on public.countries for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "countries_delete_anon" on public.countries;
create policy "countries_delete_anon"
  on public.countries for delete
  to anon, authenticated
  using (true);

-- ---- country-images storage bucket -----------------------------------------
-- bucket'ni yaratamiz / public qilamiz (public getPublicUrl ishlashi uchun)
insert into storage.buckets (id, name, public)
values ('country-images', 'country-images', true)
on conflict (id) do update set public = true;

drop policy if exists "country_images_read" on storage.objects;
create policy "country_images_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'country-images');

drop policy if exists "country_images_insert" on storage.objects;
create policy "country_images_insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'country-images');

-- upsert:true ishlatilgani uchun UPDATE ham kerak
drop policy if exists "country_images_update" on storage.objects;
create policy "country_images_update"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'country-images')
  with check (bucket_id = 'country-images');
