-- ============================================================================
-- RLS POLICIES — admin panel to'liq ishlashi uchun (o'qish + boshqaruv)
-- Supabase Dashboard -> SQL Editor da BIR MARTA ishga tushiring.
--
-- MUAMMO (diagnoz): jadvallarda RLS yoqilgan, lekin policy yo'q. Shu sabab:
--   SELECT           -> bo'sh qaytadi   ("users bor, lekin adminga ko'rinmaydi")
--   INSERT/UPDATE/DEL-> 401             ("country add/edit boshqarib bo'lmaydi")
--
-- ⚠️  DIQQAT: ilova hamma joyda PUBLIC anon key ishlatadi (brauzerda ko'rinadi).
--     Anon'ga ochilgan har bir jadval = anon key'i bor HAR KIM uchun ochiq.
--     Pastdagi "SENSITIVE" bloklarni albatta o'qing.
--
--     Bu fayl eski countries_policies.sql o'rnini bosadi (countries ham shu yerda).
-- ============================================================================


-- ────────────────────────────────────────────────────────────────────────────
-- 1) PUBLIC KONTENT (saytda ko'rinadi -> anon SELECT normal)
--    countries, blogs, faq_items, faq_categories
--    SELECT: hamma  |  INSERT/UPDATE/DELETE: anon (admin boshqaruvi)
--    Risk (o'rta): anon key bilan har kim kontentni o'zgartira/o'chira oladi.
-- ────────────────────────────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['countries','blogs','faq_items','faq_categories']
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
-- 2) ⚠️ SENSITIVE — users (LEADS: ism, telefon, maqsad, status)
--
--    🔴 XAVF: anon SELECT ochilsa => anon key'i bor HAR KIM (brauzer konsolidan)
--    sizning BARCHA mijozlaringiz ism + telefon raqamini o'qiy oladi / eksport
--    qila oladi. Bu shaxsiy ma'lumot (PII).
--
--    RLS bilan "admin o'qisin, boshqalar yo'q" deб bo'lmaydi, chunki admin ham,
--    public ham AYNAN BIR XIL anon key ishlatadi (identity yo'q).
--    To'liq himoya = users'ni service_role orqasidagi server API'ga ko'chirish
--    (session bilan himoyalangan). Hozircha admin "ishlab ketishi" uchun ochamiz:
-- ────────────────────────────────────────────────────────────────────────────
alter table public.users enable row level security;

-- register formasi (public) uchun — INSERT
drop policy if exists "users_public_insert" on public.users;
create policy "users_public_insert" on public.users
  for insert to anon, authenticated with check (true);

-- ⚠️ admin ro'yxati ko'rishi uchun — SELECT (PII ochiladi!)
drop policy if exists "users_anon_select" on public.users;
create policy "users_anon_select" on public.users
  for select to anon, authenticated using (true);

-- status o'zgartirish — UPDATE
drop policy if exists "users_anon_update" on public.users;
create policy "users_anon_update" on public.users
  for update to anon, authenticated using (true) with check (true);

-- o'chirish — DELETE
drop policy if exists "users_anon_delete" on public.users;
create policy "users_anon_delete" on public.users
  for delete to anon, authenticated using (true);


-- ────────────────────────────────────────────────────────────────────────────
-- 3) activity_log (admin amallari tarixi) — SELECT + INSERT
--    O'rta sezgirlik: admin username'lari saqlanadi.
-- ────────────────────────────────────────────────────────────────────────────
do $$
begin
  begin
    alter table public.activity_log enable row level security;

    drop policy if exists "activity_log_anon_select" on public.activity_log;
    create policy "activity_log_anon_select" on public.activity_log
      for select to anon, authenticated using (true);

    drop policy if exists "activity_log_anon_insert" on public.activity_log;
    create policy "activity_log_anon_insert" on public.activity_log
      for insert to anon, authenticated with check (true);
  exception when undefined_table then
    raise notice 'activity_log jadvali topilmadi, o''tkazib yuborildi';
  end;
end $$;


-- ────────────────────────────────────────────────────────────────────────────
-- 4) 🔴🔴 admin (LOGIN jadvali: username + PAROL) — ATAYIN OCHILMAYDI
--
--    Hozir login uni anon key bilan o'qiydi => parollaringiz ALLAQACHON anon
--    key'i bor har kimga ochiq (ustiga ochiq matnda!). Bu eng jiddiy teshik.
--    RLS bilan "tez" tuzatib bo'lmaydi: yopsak login buziladi.
--    TO'G'RI yechim: login'ni service_role bilan server-side qilib, admin
--    jadvalini butunlay yopish. (Buni alohida qilib beraman — so'rang.)
--
--    Login service API'ga ko'chgandan KEYIN quyidagini ishlating (anon o'qiy
--    olmaydigan bo'ladi):
--       alter table public.admin enable row level security;
--       -- hech qanday anon policy YARATMANG => anon SELECT bloklanadi
-- ────────────────────────────────────────────────────────────────────────────


-- ────────────────────────────────────────────────────────────────────────────
-- 5) STORAGE bucketlar: country-images (davlat rasmlari), videos (blog videolari)
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
-- TEKSHIRISH (ixtiyoriy) — yaratilgan policy'larni ko'rish:
--   select tablename, policyname, cmd, roles
--   from pg_policies where schemaname = 'public'
--   order by tablename, cmd;
-- ============================================================================
