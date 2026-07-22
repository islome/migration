-- ============================================================================
-- RLS POLICIES — XAVFSIZ holat (server-side API + service_role bilan)
-- Supabase Dashboard -> SQL Editor da ishga tushiring.
--
-- ⚠️  TARTIB MUHIM: avval yangi kodni deploy qiling va Vercel/lokalда
--     SUPABASE_SERVICE_ROLE_KEY ni o'rnating, KEYIN shu SQL'ni ishga tushiring.
--     Aks holda users/admin qulflanadi-yu, server API hali tayyor bo'lmaydi.
--
-- Model:
--   • users, admin — anon uchun YOPIQ. Boshqaruv /api/admin/* server route'lari
--     orqali (service_role RLS'ni chetlab o'tadi, sessiya bilan himoyalangan).
--   • countries, blogs, faq_* — public kontent: anon o'qish + anon yozish (admin
--     hali anon bilan yozadi; xohlasangiz keyin bularni ham server'ga ko'chiramiz).
-- ============================================================================


-- ────────────────────────────────────────────────────────────────────────────
-- 1) PUBLIC KONTENT (anon-write, hozircha) — blogs, faq_items, faq_categories
--    anon SELECT + anon INSERT/UPDATE/DELETE (admin boshqaruvi hali anon).
--    (countries pastda ALOHIDA — u endi server-write, qulflangan.)
-- ────────────────────────────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['blogs','faq_items','faq_categories']
  loop
    begin
      execute format('alter table public.%I enable row level security', t);

      execute format('drop policy if exists "%s_public_select" on public.%I', t, t);
      execute format('create policy "%s_public_select" on public.%I for select to anon, authenticated using (true)', t, t);

      execute format('drop policy if exists "%s_anon_insert" on public.%I', t, t);
      execute format('create policy "%s_anon_insert" on public.%I for insert to anon, authenticated with check (true)', t, t);

      execute format('drop policy if exists "%s_anon_update" on public.%I', t, t);
      execute format('create policy "%s_anon_update" on public.%I for update to anon, authenticated using (true) with check (true)', t, t);

      execute format('drop policy if exists "%s_anon_delete" on public.%I', t, t);
      execute format('create policy "%s_anon_delete" on public.%I for delete to anon, authenticated using (true)', t, t);
    exception when undefined_table then
      raise notice 'Jadval topilmadi, o''tkazib yuborildi: %', t;
    end;
  end loop;
end $$;


-- ────────────────────────────────────────────────────────────────────────────
-- 1b) 🔒 countries — public SELECT (saytda ko'rinadi) + WRITE anon uchun YOPIQ.
--     Yaratish/tahrirlash/o'chirish endi /api/admin/countries (service_role) orqali.
--     (Rasm upload hali anon storage'da — 5-bo'limdagi country-images bucket.)
-- ────────────────────────────────────────────────────────────────────────────
alter table public.countries enable row level security;

drop policy if exists "countries_public_select" on public.countries;
create policy "countries_public_select" on public.countries
  for select to anon, authenticated using (true);

-- eski anon write policy'lar bo'lsa — olib tashlaymiz (anon yoza olmasin)
drop policy if exists "countries_anon_insert" on public.countries;
drop policy if exists "countries_anon_update" on public.countries;
drop policy if exists "countries_anon_delete" on public.countries;
-- (INSERT/UPDATE/DELETE uchun anon policy ATAYIN yaratilmaydi)


-- ────────────────────────────────────────────────────────────────────────────
-- 2) 🔒 users (LEADS: ism, telefon) — anon uchun FAQAT INSERT (register formasi).
--    SELECT/UPDATE/DELETE anon uchun YOPIQ => anon key bilan hech kim mijoz
--    ma'lumotlarini o'qiy/o'chira olmaydi. Admin ro'yxati /api/admin/users orqali.
--
--    Eslatma: register kodida .insert() dan keyin .select() BO'LMASLIGI kerak
--    (INSERT-only policy .select() qaytarishга ruxsat bermaydi).
-- ────────────────────────────────────────────────────────────────────────────
alter table public.users enable row level security;

-- faqat register (public) uchun — INSERT
drop policy if exists "users_public_insert" on public.users;
create policy "users_public_insert" on public.users
  for insert to anon, authenticated with check (true);

-- eski OCHIQ policy'lar bo'lsa — olib tashlaymiz (anon o'qiy/yoza olmasin)
drop policy if exists "users_anon_select" on public.users;
drop policy if exists "users_anon_update" on public.users;
drop policy if exists "users_anon_delete" on public.users;
drop policy if exists "users_public_select" on public.users;
-- (SELECT/UPDATE/DELETE uchun anon policy ATAYIN yaratilmaydi)


-- ────────────────────────────────────────────────────────────────────────────
-- 3) activity_log — logs sahifasi o'qiydi (anon SELECT). Yozuv server-side
--    (service_role) bo'lgani uchun anon INSERT shart emas, lekin zararsiz.
-- ────────────────────────────────────────────────────────────────────────────
do $$
begin
  begin
    alter table public.activity_log enable row level security;

    drop policy if exists "activity_log_anon_select" on public.activity_log;
    create policy "activity_log_anon_select" on public.activity_log
      for select to anon, authenticated using (true);
  exception when undefined_table then
    raise notice 'activity_log jadvali topilmadi, o''tkazib yuborildi';
  end;
end $$;


-- ────────────────────────────────────────────────────────────────────────────
-- 4) admin (username + PAROL) — login ANON key bilan o'qiydi => anon SELECT OCHIQ.
--    ⚠️ XAVF: anon key'i bor har kim admin username+parolni O'QIY oladi
--    (parol hash bo'lsa ham hash ochiladi). Xavfsizroq: service_role login yoki
--    SECURITY DEFINER RPC. Hozir sizning talabingiz bo'yicha anon SELECT ochildi.
--    Yozish (INSERT/UPDATE/DELETE) anon uchun YOPIQ => parolni o'zgartirib bo'lmaydi.
-- ────────────────────────────────────────────────────────────────────────────
alter table public.admin enable row level security;

drop policy if exists "admin_anon_select" on public.admin;
create policy "admin_anon_select" on public.admin
  for select to anon, authenticated using (true);

-- yozuv anon uchun ochilmaydi (eski yozuv policy'lari bo'lsa olib tashlaymiz)
drop policy if exists "admin_anon_insert" on public.admin;
drop policy if exists "admin_anon_update" on public.admin;
drop policy if exists "admin_anon_delete" on public.admin;


-- ────────────────────────────────────────────────────────────────────────────
-- 5) STORAGE: country-images (davlat rasmlari), videos (blog videolari)
--    public read + anon upload/update/delete
-- ────────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public) values
  ('country-images', 'country-images', true),
  ('videos', 'videos', true)
on conflict (id) do update set public = true;

do $$
declare b text;
begin
  foreach b in array array['country-images','videos']
  loop
    execute format('drop policy if exists "%s_read" on storage.objects', b);
    execute format('create policy "%s_read" on storage.objects for select to anon, authenticated using (bucket_id = %L)', b, b);

    execute format('drop policy if exists "%s_insert" on storage.objects', b);
    execute format('create policy "%s_insert" on storage.objects for insert to anon, authenticated with check (bucket_id = %L)', b, b);

    execute format('drop policy if exists "%s_update" on storage.objects', b);
    execute format('create policy "%s_update" on storage.objects for update to anon, authenticated using (bucket_id = %L) with check (bucket_id = %L)', b, b, b);

    execute format('drop policy if exists "%s_delete" on storage.objects', b);
    execute format('create policy "%s_delete" on storage.objects for delete to anon, authenticated using (bucket_id = %L)', b, b);
  end loop;
end $$;


-- ============================================================================
-- TEKSHIRISH:
--   select tablename, policyname, cmd, roles from pg_policies
--   where schemaname = 'public' order by tablename, cmd;
-- users: faqat INSERT ko'rinishi kerak. admin: hech qanday policy bo'lmasligi kerak.
-- ============================================================================
