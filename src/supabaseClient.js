import { createClient } from "@supabase/supabase-js";

/**
 * ==========================================================================
 *  วางค่าจาก Supabase ของคุณตรงนี้ (Settings -> API ในหน้า Supabase Dashboard)
 *  - SUPABASE_URL: "Project URL" (ขึ้นต้นด้วย https://xxxx.supabase.co)
 *  - SUPABASE_ANON_KEY: "anon public" key (ปลอดภัยที่จะใช้ฝั่ง frontend)
 *
 *  ห้ามใช้ "service_role" key เด็ดขาด — ใช้เฉพาะ "anon public" เท่านั้น
 * ==========================================================================
 */
const SUPABASE_URL = "https://oaejcqdynjfehvybfuds.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZWpjcWR5bmpmZWh2eWJmdWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMDQ0ODksImV4cCI6MjEwNDc4MDQ4OX0.7uzeI3vYEw4VFPc3bVPFiNFsWgHSKRE_AUDWFIp2xNE";

// true เมื่อยังไม่ได้ตั้งค่า -> แอปจะ fallback ไปใช้ localStorage ในเครื่องแทนโดยอัตโนมัติ
export const isSupabaseConfigured =
  SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY" &&
  SUPABASE_URL.startsWith("http");

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ชื่อแถวเดียวที่ใช้เก็บข้อมูลทั้งหมดของเว็บไซต์ (ตาราง app_data มีแถวเดียว id = 1)
export const APP_DATA_ROW_ID = 1;
