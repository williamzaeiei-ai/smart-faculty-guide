import { createClient } from "@supabase/supabase-js";

/**
 * ==========================================================================
 *  วางค่าจาก Supabase ของคุณตรงนี้ (Settings -> API ในหน้า Supabase Dashboard)
 *  - SUPABASE_URL: "Project URL" (ขึ้นต้นด้วย https://xxxx.supabase.co)
 *  - SUPABASE_ANON_KEY: "anon public" key (ปลอดภัยที่จะใช้ฝั่ง frontend)
 *
 *  ห้ามใช้ "service_role" key เด็ดขาด — ใช้เฉพาะ "anon public" เท่านั้น
 *
 *  ถ้าไม่ต้องการใช้ Supabase ให้ปล่อยค่า placeholder ไว้ — เว็บจะใช้ localStorage
 *  ในเครื่องเต็มรูปแบบโดยอัตโนมัติ
 *
 *  ถ้าตั้งค่าไว้แล้วแต่เชื่อมต่อไม่ได้ (เช่น โปรเจกต์ถูกหยุดชั่วคราว / ออฟไลน์)
 *  แอปจะ fallback ไปใช้ localStorage ให้อัตโนมัติ ไม่ทำให้เว็บค้างหรือพัง
 * ==========================================================================
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

// true เมื่อยังไม่ได้ตั้งค่า -> แอปจะ fallback ไปใช้ localStorage ในเครื่องแทนโดยอัตโนมัติ
export const isSupabaseConfigured =
  SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY" &&
  SUPABASE_URL.startsWith("http");

// หมดเวลา (มิลลิวินาที) ที่ใช้รอ Supabase — ครบกำหนดแล้วยังไม่มีคำตอบถือว่า Supabase ออฟไลน์
export const SUPABASE_TIMEOUT_MS = 6000;

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ชื่อแถวเดียวที่ใช้เก็บข้อมูลทั้งหมดของเว็บไซต์ (ตาราง app_data มีแถวเดียว id = 1)
export const APP_DATA_ROW_ID = 1;

// Bucket used for uploaded images/videos when Supabase is configured (must be created as a
// PUBLIC bucket named "media" in Supabase Dashboard -> Storage -> New bucket).
const MEDIA_BUCKET = "media";

/** ครอบ promise ของ Supabase ด้วย timeout — ถ้าครบกำหนดถือว่าเชื่อมต่อไม่ได้ */
export function withTimeout(promise, ms = SUPABASE_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Supabase timeout (${ms}ms)`)), ms);
    Promise.resolve(promise).then(
      (value) => { clearTimeout(timer); resolve(value); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a file and returns a URL to use in the app's data.
 * - If Supabase is online (skipSupabase = false): uploads to Supabase Storage and returns a short public URL.
 *   This keeps the database row small and fast (base64 embedding was causing save timeouts).
 * - If Supabase is NOT configured / offline / skipSupabase = true: falls back to a base64 data URL
 *   (works fine for the localStorage-only demo mode, since there's no server to upload to).
 *
 * @param {File} file ไฟล์ที่ต้องการอัปโหลด
 * @param {object} [options]
 * @param {number} [options.maxBytes] ขนาดไฟล์สูงสุด (ไฟล์ใหญ่กว่านี้จะ throw ข้อผิดพลาด)
 * @param {number} [options.timeoutMs] หมดเวลารอ Supabase (ค่าเริ่มต้น 8000ms)
 * @param {boolean} [options.skipSupabase] true = ข้าม Supabase แล้วใช้ base64 โดยตรง (โหมด localStorage)
 */
export async function uploadMedia(file, { maxBytes, timeoutMs = 8000, skipSupabase = false } = {}) {
  if (maxBytes != null && file.size > maxBytes) {
    throw new Error(`ไฟล์ขนาดเกินกำหนด (สูงสุด ${Math.round(maxBytes / (1024 * 1024))} MB)`);
  }
  if (isSupabaseConfigured && supabase && !skipSupabase) {
    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const path = `uploads/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await withTimeout(
      supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      }),
      timeoutMs
    );
    if (error) throw error;
    const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }
  return fileToBase64(file);
}