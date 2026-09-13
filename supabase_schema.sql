-- ============================================================
-- Smart Faculty Guide — Supabase schema
-- วิธีใช้: ไปที่ Supabase Dashboard -> SQL Editor -> New query
-- วางโค้ดทั้งหมดนี้ -> กด Run (ครั้งเดียวพอ)
-- ============================================================

-- ตารางเดียวที่เก็บข้อมูลทั้งเว็บไซต์เป็น JSON ก้อนเดียว (แถว id = 1 แถวเดียวเท่านั้น)
create table if not exists app_data (
  id int primary key,
  payload jsonb not null,
  updated_at timestamptz default now()
);

-- เปิดใช้ Row Level Security (จำเป็นสำหรับ Supabase)
alter table app_data enable row level security;

-- อนุญาตให้ทุกคนอ่านข้อมูลได้ (ผู้ใช้ทั่วไปต้องดูเว็บได้)
drop policy if exists "Public read access" on app_data;
create policy "Public read access"
  on app_data for select
  using (true);

-- อนุญาตให้ทุกคนเขียน/แก้ไขข้อมูลได้ (ใช้สำหรับหน้า Admin ของเว็บนี้)
-- หมายเหตุ: ระบบ Admin ของเว็บนี้ใช้รหัสผ่านแบบง่ายฝั่ง frontend เท่านั้น
-- ถ้าต้องการความปลอดภัยสูงขึ้น ควรทำระบบ Auth จริงของ Supabase แทนภายหลัง
drop policy if exists "Public insert access" on app_data;
create policy "Public insert access"
  on app_data for insert
  with check (true);

drop policy if exists "Public update access" on app_data;
create policy "Public update access"
  on app_data for update
  using (true);

-- ============================================================
-- Storage bucket for uploaded images/videos
-- (สำคัญมาก: ถ้าไม่มีส่วนนี้ รูปภาพจะถูกฝังเป็น base64 ในตาราง app_data
--  โดยตรง ซึ่งทำให้ไฟล์ข้อมูลใหญ่เกินไปจนบันทึกไม่สำเร็จ/ค้าง 500 error)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public read for media bucket" on storage.objects;
create policy "Public read for media bucket"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "Public insert for media bucket" on storage.objects;
create policy "Public insert for media bucket"
  on storage.objects for insert
  with check (bucket_id = 'media');

drop policy if exists "Public update for media bucket" on storage.objects;
create policy "Public update for media bucket"
  on storage.objects for update
  using (bucket_id = 'media');

-- หมายเหตุ: ไม่ต้อง insert ข้อมูลเริ่มต้นเอง — แอปจะสร้างแถวแรกให้อัตโนมัติ
-- ตอนเปิดเว็บครั้งแรก (ถ้ายังไม่มีแถว id = 1 ในตาราง)