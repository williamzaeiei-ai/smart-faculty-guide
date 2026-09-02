import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search, User, Building2, DoorOpen, MapPin, Calendar, Bot, LogIn,
  LayoutDashboard, Plus, Pencil, Trash2, X, Menu, ChevronRight, ChevronLeft,
  Clock, Mail, Phone, Video as VideoIcon, Image as ImageIcon, Send,
  ArrowLeft, Check, AlertCircle, Sun, Moon, LogOut, Users, Home as HomeIcon,
  Navigation, GraduationCap, UtensilsCrossed, BookOpen, ParkingCircle,
  Stethoscope, Landmark, Info
} from "lucide-react";

/* =========================================================================
   STYLE TOKENS
   ========================================================================= */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');

    .sfg-app {
      --bg: #F7F5EF;
      --surface: #FFFFFF;
      --surface-2: #F0EDE3;
      --ink: #201F1B;
      --ink-soft: #63594A;
      --primary: #1B2A4A;
      --primary-soft: #2E4270;
      --on-primary: #F7F5EF;
      --accent: #B07A1E;
      --accent-soft: #E6C67E;
      --border: #E1DACB;
      --success: #2F7A4F;
      --danger: #B4432F;
      --shadow: 0 1px 2px rgba(27,25,20,0.06), 0 8px 24px -12px rgba(27,25,20,0.18);
      background: var(--bg);
      color: var(--ink);
      font-family: 'Noto Sans Thai', sans-serif;
      min-height: 100%;
      transition: background 0.25s ease, color 0.25s ease;
    }
    .sfg-app[data-theme="dark"] {
      --bg: #14151C;
      --surface: #1C1E28;
      --surface-2: #23252F;
      --ink: #EDEAE0;
      --ink-soft: #A6A091;
      --primary: #9FB4DE;
      --primary-soft: #7791C4;
      --on-primary: #14151C;
      --accent: #E6C67E;
      --accent-soft: #B07A1E;
      --border: #2E313D;
      --success: #6BC28E;
      --danger: #E28A72;
      --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px -12px rgba(0,0,0,0.5);
    }
    .sfg-app * { box-sizing: border-box; }
    .sfg-app h1, .sfg-app h2, .sfg-app h3, .sfg-app h4 {
      font-family: 'Noto Serif Thai', serif;
      margin: 0;
      color: var(--ink);
      line-height: 1.25;
    }
    .sfg-app p, .sfg-app span, .sfg-app div, .sfg-app button, .sfg-app input,
    .sfg-app select, .sfg-app textarea, .sfg-app label { font-family: 'Noto Sans Thai', sans-serif; }
    .sfg-app button { cursor: pointer; }
    .sfg-app a { color: inherit; text-decoration: none; }
    .sfg-app ::selection { background: var(--accent-soft); }
    .sfg-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
    .sfg-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
    .sfg-input {
      width: 100%; border: 1px solid var(--border); background: var(--surface);
      color: var(--ink); border-radius: 10px; padding: 10px 12px; font-size: 14px;
      outline: none; transition: border-color .15s ease;
    }
    .sfg-input:focus { border-color: var(--primary); }
    .sfg-btn {
      display: inline-flex; align-items: center; gap: 6px; border-radius: 10px;
      padding: 10px 16px; font-size: 14px; font-weight: 600; border: 1px solid transparent;
      transition: transform .1s ease, opacity .15s ease; white-space: nowrap;
    }
    .sfg-btn:active { transform: scale(0.97); }
    .sfg-btn-primary { background: var(--primary); color: var(--on-primary); }
    .sfg-btn-primary:hover { opacity: 0.9; }
    .sfg-btn-accent { background: var(--accent); color: #1B160A; }
    .sfg-btn-accent:hover { opacity: 0.9; }
    .sfg-btn-ghost { background: transparent; color: var(--ink); border-color: var(--border); }
    .sfg-btn-ghost:hover { background: var(--surface-2); }
    .sfg-btn-danger { background: transparent; color: var(--danger); border-color: var(--danger); }
    .sfg-btn-danger:hover { background: var(--danger); color: #fff; }
    .sfg-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
      box-shadow: var(--shadow); overflow: hidden;
    }
    .sfg-card-hover { transition: transform .18s ease, box-shadow .18s ease; }
    .sfg-card-hover:hover { transform: translateY(-4px); box-shadow: 0 2px 4px rgba(27,25,20,0.08), 0 20px 36px -16px rgba(27,25,20,0.28); }
    .sfg-dotted-bg {
      background-image: radial-gradient(circle, rgba(255,255,255,0.16) 1.6px, transparent 1.6px);
      background-size: 20px 20px;
    }
    .sfg-feature-icon {
      width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }

    /* ===== Responsive layout helpers ===== */
    .sfg-split { display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; }
    .sfg-split-avatar { display: grid; grid-template-columns: 220px 1fr; gap: 30px; }
    .sfg-admin-layout { display: grid; grid-template-columns: 220px 1fr; gap: 26px; }
    .sfg-admin-nav { display: flex; flex-direction: column; gap: 3px; }
    .sfg-footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 28px; }
    .sfg-office-card { display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; }
    .sfg-hero-stats { margin-top: -70px; }

    @media (max-width: 900px) {
      .sfg-admin-layout { grid-template-columns: 1fr; }
      .sfg-admin-nav { flex-direction: row; overflow-x: auto; padding-bottom: 4px; }
      .sfg-admin-nav button { flex-shrink: 0; }
    }
    @media (max-width: 820px) {
      .sfg-footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 760px) {
      .sfg-split { grid-template-columns: 1fr; }
      .sfg-office-card { grid-template-columns: 1fr; text-align: left; }
    }
    @media (max-width: 700px) {
      .sfg-hero-stats { margin-top: -40px; }
    }
    @media (max-width: 640px) {
      .sfg-split-avatar { grid-template-columns: 1fr; }
      .sfg-split-avatar > div:first-child { max-width: 180px; margin: 0 auto; }
    }
    @media (max-width: 480px) {
      .sfg-hero-stats { margin-top: 16px; }
      .sfg-footer-grid { grid-template-columns: 1fr; }
      .sfg-navbar-logo { width: 40px !important; height: 40px !important; }
      .sfg-navbar-subtitle { display: none; }
      .sfg-admin-btn-label { display: none; }
      .sfg-navbar-search { width: 130px !important; }
    }
    .sfg-badge {
      display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600;
      padding: 3px 10px; border-radius: 999px; background: var(--surface-2); color: var(--ink-soft);
      border: 1px solid var(--border);
    }
    .sfg-tag-thumb {
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--primary-soft), var(--primary));
      color: var(--on-primary);
    }
  `}</style>
);

/* =========================================================================
   CONSTANTS
   ========================================================================= */
const DAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];
const STORAGE_KEY = "smart-faculty-guide-data-v1";
const ADMIN_USER = "admin";
const ADMIN_PASS = "faculty2026";

const PLACE_TYPES = {
  food: { label: "ร้านอาหาร/โรงอาหาร", icon: UtensilsCrossed, color: "#B0492E" },
  library: { label: "ห้องสมุด", icon: BookOpen, color: "#2E6F6B" },
  restroom: { label: "ห้องน้ำ", icon: Home_ICON_FALLBACK, color: "#7D4FA6" },
  atm: { label: "ATM", icon: Landmark, color: "#3D6FB0" },
  office: { label: "สำนักงาน", icon: Building2, color: "#1B2A4A" },
  clinic: { label: "ห้องพยาบาล", icon: Stethoscope, color: "#C24B5F" },
  parking: { label: "ที่จอดรถ", icon: ParkingCircle, color: "#5C8A3A" },
  other: { label: "สิ่งอำนวยความสะดวก", icon: Info, color: "#B07A1E" },
};
function Home_ICON_FALLBACK(props) { return <HomeIcon {...props} />; }

/* Distinct accent color per department / building so cards & banners aren't monotone */
const DEPT_PALETTE = ["#B07A1E", "#2E6F6B", "#7D4FA6", "#B0492E", "#3D6FB0", "#5C8A3A"];
function deptAccent(data, departmentId) {
  const idx = (data.departments || []).findIndex((d) => d.id === departmentId);
  return DEPT_PALETTE[idx >= 0 ? idx % DEPT_PALETTE.length : 0];
}
function idxAccent(data, list, id) {
  const idx = (data[list] || []).findIndex((d) => d.id === id);
  return DEPT_PALETTE[idx >= 0 ? idx % DEPT_PALETTE.length : 0];
}

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.floor(Math.random() * 10000)}`;
}

/* =========================================================================
   SAMPLE / SEED DATA  (สมมติทั้งหมด ไม่ใช่ข้อมูลจริง)
   ========================================================================= */
function seedData() {
  const departments = [
    { id: "dep1", name: "เทคโนโลยีสารสนเทศ", nameEn: "Information Technology", description: "มุ่งเน้นการพัฒนาซอฟต์แวร์ ระบบเครือข่าย และโครงสร้างพื้นฐานด้านไอทีสำหรับองค์กรยุคดิจิทัล", image: "", video: "" },
    { id: "dep2", name: "วิทยาการคอมพิวเตอร์", nameEn: "Computer Science", description: "ปูพื้นฐานด้านอัลกอริทึม โครงสร้างข้อมูล และทฤษฎีการคำนวณ เพื่อต่อยอดสู่งานวิจัยและนวัตกรรม", image: "", video: "" },
    { id: "dep3", name: "วิศวกรรมซอฟต์แวร์", nameEn: "Software Engineering", description: "เรียนรู้กระบวนการออกแบบและพัฒนาซอฟต์แวร์อย่างเป็นระบบ ตั้งแต่วิเคราะห์ความต้องการจนถึงทดสอบ", image: "", video: "" },
    { id: "dep4", name: "เทคโนโลยีสื่อดิจิทัล", nameEn: "Digital Media Technology", description: "ผสานศาสตร์การออกแบบกับเทคโนโลยี สร้างสรรค์สื่อ แอนิเมชัน และประสบการณ์เชิงโต้ตอบ", image: "", video: "" },
    { id: "dep5", name: "ระบบสารสนเทศเพื่อธุรกิจ", nameEn: "Business Information Systems", description: "เชื่อมโยงความรู้ด้านธุรกิจกับระบบสารสนเทศ เพื่อวิเคราะห์และสนับสนุนการตัดสินใจขององค์กร", image: "", video: "" },
  ];

  const buildings = [
    { id: "b1", name: "อาคาร 1", description: "อาคารสำนักงานคณะและห้องประชุม", floors: 3, image: "" },
    { id: "b2", name: "อาคาร 2", description: "อาคารโรงอาหารและห้องบรรยายรวม", floors: 2, image: "" },
    { id: "b3", name: "อาคาร 3", description: "อาคารเรียนสาขา IT และวิทยาการคอมพิวเตอร์", floors: 4, image: "" },
    { id: "b4", name: "อาคาร 4", description: "อาคารปฏิบัติการและห้อง LAB วิศวกรรม", floors: 3, image: "" },
  ];

  const classrooms = [
    { id: "c1", number: "301", buildingId: "b3", floor: 3, type: "ห้องบรรยาย", capacity: 60, departmentId: "dep1", image: "", video: "" },
    { id: "c2", number: "302", buildingId: "b3", floor: 3, type: "ห้องบรรยาย", capacity: 50, departmentId: "dep2", image: "", video: "" },
    { id: "c3", number: "303", buildingId: "b3", floor: 3, type: "ห้องสัมมนา", capacity: 30, departmentId: "dep3", image: "", video: "" },
    { id: "c4", number: "LAB 1", buildingId: "b4", floor: 1, type: "ห้องปฏิบัติการ", capacity: 40, departmentId: "dep1", image: "", video: "" },
    { id: "c5", number: "LAB 2", buildingId: "b4", floor: 1, type: "ห้องปฏิบัติการ", capacity: 40, departmentId: "dep2", image: "", video: "" },
    { id: "c6", number: "LAB 3", buildingId: "b4", floor: 2, type: "ห้องปฏิบัติการเครือข่าย", capacity: 35, departmentId: "dep1", image: "", video: "" },
    { id: "c7", number: "204", buildingId: "b2", floor: 2, type: "ห้องบรรยายรวม", capacity: 120, departmentId: "dep5", image: "", video: "" },
    { id: "c8", number: "401", buildingId: "b3", floor: 4, type: "ห้องสตูดิโอสื่อ", capacity: 25, departmentId: "dep4", image: "", video: "" },
    { id: "c9", number: "402", buildingId: "b3", floor: 4, type: "ห้องบรรยาย", capacity: 45, departmentId: "dep4", image: "", video: "" },
    { id: "c10", number: "205", buildingId: "b2", floor: 2, type: "ห้องบรรยาย", capacity: 80, departmentId: "dep5", image: "", video: "" },
  ];

  const teachers = [
    { id: "t1", firstName: "สมชาย", lastName: "ใจดี", title: "ผู้ช่วยศาสตราจารย์", departmentId: "dep1", email: "somchai.j@example.ac.th", phone: "02-000-1001", room: "IT-304", buildingId: "b3", floor: 3, bio: "เชี่ยวชาญด้านระบบเครือข่ายและความมั่นคงปลอดภัยไซเบอร์ มีประสบการณ์สอนกว่า 12 ปี", image: "", video: "", officeHours: [{ day: "จันทร์", start: "13:00", end: "16:00" }, { day: "พุธ", start: "09:00", end: "12:00" }] },
    { id: "t2", firstName: "สุภาพร", lastName: "แสงทอง", title: "อาจารย์", departmentId: "dep2", email: "supaporn.s@example.ac.th", phone: "02-000-1002", room: "CS-208", buildingId: "b3", floor: 2, bio: "สอนด้านโครงสร้างข้อมูลและอัลกอริทึม สนใจงานวิจัยด้าน Machine Learning", image: "", video: "", officeHours: [{ day: "อังคาร", start: "10:00", end: "12:00" }, { day: "พฤหัสบดี", start: "13:00", end: "15:00" }] },
    { id: "t3", firstName: "วิชัย", lastName: "ธนสาร", title: "รองศาสตราจารย์", departmentId: "dep3", email: "wichai.t@example.ac.th", phone: "02-000-1003", room: "SE-105", buildingId: "b3", floor: 1, bio: "หัวหน้าสาขาวิศวกรรมซอฟต์แวร์ เชี่ยวชาญด้านสถาปัตยกรรมซอฟต์แวร์และ DevOps", image: "", video: "", officeHours: [{ day: "จันทร์", start: "09:00", end: "11:00" }] },
    { id: "t4", firstName: "กมลวรรณ", lastName: "ศรีสุข", title: "อาจารย์", departmentId: "dep4", email: "kamonwan.s@example.ac.th", phone: "02-000-1004", room: "DMT-401", buildingId: "b3", floor: 4, bio: "สอนวิชาแอนิเมชันและการออกแบบสื่อเชิงโต้ตอบ ผลงานได้รับรางวัลระดับประเทศ", image: "", video: "", officeHours: [{ day: "พุธ", start: "13:00", end: "16:00" }, { day: "ศุกร์", start: "09:00", end: "11:00" }] },
    { id: "t5", firstName: "ธนากร", lastName: "พงษ์พันธุ์", title: "ผู้ช่วยศาสตราจารย์", departmentId: "dep5", email: "thanakorn.p@example.ac.th", phone: "02-000-1005", room: "BIS-204", buildingId: "b2", floor: 2, bio: "เชี่ยวชาญด้านระบบวางแผนทรัพยากรองค์กร (ERP) และการวิเคราะห์ธุรกิจ", image: "", video: "", officeHours: [{ day: "อังคาร", start: "13:00", end: "15:00" }] },
    { id: "t6", firstName: "อรวรรณ", lastName: "รุ่งเรือง", title: "อาจารย์", departmentId: "dep1", email: "orawan.r@example.ac.th", phone: "02-000-1006", room: "IT-206", buildingId: "b3", floor: 2, bio: "สอนด้านการพัฒนาเว็บแอปพลิเคชันและฐานข้อมูล", image: "", video: "", officeHours: [{ day: "จันทร์", start: "10:00", end: "12:00" }, { day: "ศุกร์", start: "13:00", end: "15:00" }] },
    { id: "t7", firstName: "ปิยะ", lastName: "มั่งมี", title: "อาจารย์", departmentId: "dep2", email: "piya.m@example.ac.th", phone: "02-000-1007", room: "CS-108", buildingId: "b3", floor: 1, bio: "สนใจด้านปัญญาประดิษฐ์และการประมวลผลภาษาธรรมชาติ", image: "", video: "", officeHours: [{ day: "พฤหัสบดี", start: "09:00", end: "11:00" }] },
    { id: "t8", firstName: "นภัสสร", lastName: "ทองแท้", title: "ผู้ช่วยศาสตราจารย์", departmentId: "dep3", email: "napassorn.t@example.ac.th", phone: "02-000-1008", room: "SE-306", buildingId: "b3", floor: 3, bio: "เชี่ยวชาญด้านการทดสอบซอฟต์แวร์และการประกันคุณภาพ", image: "", video: "", officeHours: [{ day: "อังคาร", start: "09:00", end: "11:00" }, { day: "พุธ", start: "13:00", end: "15:00" }] },
    { id: "t9", firstName: "เอกชัย", lastName: "วิริยะ", title: "อาจารย์", departmentId: "dep4", email: "ekkachai.w@example.ac.th", phone: "02-000-1009", room: "DMT-402", buildingId: "b3", floor: 4, bio: "สอนด้านการถ่ายภาพและการตัดต่อวิดีโอเชิงสร้างสรรค์", image: "", video: "", officeHours: [{ day: "ศุกร์", start: "10:00", end: "12:00" }] },
    { id: "t10", firstName: "รัตนา", lastName: "ไพศาล", title: "รองศาสตราจารย์", departmentId: "dep5", email: "rattana.p@example.ac.th", phone: "02-000-1010", room: "BIS-101", buildingId: "b2", floor: 1, bio: "หัวหน้าสาขาระบบสารสนเทศเพื่อธุรกิจ เชี่ยวชาญด้าน Data Analytics เพื่อการตัดสินใจ", image: "", video: "", officeHours: [{ day: "จันทร์", start: "13:00", end: "15:00" }, { day: "พฤหัสบดี", start: "10:00", end: "12:00" }] },
  ];

  const schedules = [
    { id: "s1", teacherId: "t1", subject: "การจัดการเครือข่ายคอมพิวเตอร์", day: "จันทร์", start: "09:00", end: "12:00", classroomId: "c1" },
    { id: "s2", teacherId: "t1", subject: "ความมั่นคงปลอดภัยไซเบอร์", day: "อังคาร", start: "13:00", end: "16:00", classroomId: "c6" },
    { id: "s3", teacherId: "t2", subject: "โครงสร้างข้อมูลและอัลกอริทึม", day: "จันทร์", start: "13:00", end: "16:00", classroomId: "c2" },
    { id: "s4", teacherId: "t2", subject: "การเรียนรู้ของเครื่อง", day: "พุธ", start: "09:00", end: "12:00", classroomId: "c5" },
    { id: "s5", teacherId: "t3", subject: "สถาปัตยกรรมซอฟต์แวร์", day: "อังคาร", start: "09:00", end: "12:00", classroomId: "c3" },
    { id: "s6", teacherId: "t4", subject: "หลักการแอนิเมชัน", day: "พฤหัสบดี", start: "09:00", end: "12:00", classroomId: "c8" },
    { id: "s7", teacherId: "t5", subject: "ระบบสารสนเทศเพื่อการจัดการ", day: "พุธ", start: "13:00", end: "16:00", classroomId: "c7" },
    { id: "s8", teacherId: "t6", subject: "การพัฒนาเว็บแอปพลิเคชัน", day: "ศุกร์", start: "09:00", end: "12:00", classroomId: "c1" },
    { id: "s9", teacherId: "t7", subject: "ปัญญาประดิษฐ์เบื้องต้น", day: "พฤหัสบดี", start: "13:00", end: "16:00", classroomId: "c5" },
    { id: "s10", teacherId: "t10", subject: "การวิเคราะห์ข้อมูลธุรกิจ", day: "จันทร์", start: "09:00", end: "12:00", classroomId: "c10" },
  ];

  const places = [
    { id: "p1", name: "โรงอาหารใหญ่", type: "food", buildingId: "b2", floor: 1, description: "โรงอาหารหลักของคณะ มีร้านค้ากว่า 15 ร้าน ที่นั่งกว่า 300 ที่", openTime: "07:00", closeTime: "17:00", image: "", video: "" },
    { id: "p2", name: "โรงอาหารเล็ก", type: "food", buildingId: "b4", floor: 1, description: "จุดพักทานอาหารว่างใกล้อาคารปฏิบัติการ เหมาะสำหรับพักเบรกระหว่างแล็บ", openTime: "08:00", closeTime: "16:00", image: "", video: "" },
    { id: "p3", name: "ห้องสมุดคณะ", type: "library", buildingId: "b1", floor: 2, description: "แหล่งค้นคว้าตำรา วารสาร และมุมอ่านหนังสือส่วนตัว พร้อมคอมพิวเตอร์สืบค้น", openTime: "08:00", closeTime: "18:00", image: "", video: "" },
    { id: "p4", name: "ห้องน้ำ อาคาร 3 ชั้น 1", type: "restroom", buildingId: "b3", floor: 1, description: "ห้องน้ำรวมสำหรับนักศึกษาและบุคลากร แยกชาย-หญิง-ผู้พิการ", openTime: "06:00", closeTime: "20:00", image: "", video: "" },
    { id: "p5", name: "ตู้ ATM", type: "atm", buildingId: "b1", floor: 1, description: "จุดบริการตู้เอทีเอ็มธนาคารพันธมิตร 2 ตู้", openTime: "00:00", closeTime: "24:00", image: "", video: "" },
    { id: "p6", name: "สำนักงานคณะ", type: "office", buildingId: "b1", floor: 1, description: "จุดติดต่องานทะเบียน เอกสาร และธุรการทั่วไปของคณะ", openTime: "08:30", closeTime: "16:30", image: "", video: "" },
    { id: "p7", name: "ห้องธุรการ", type: "office", buildingId: "b1", floor: 1, description: "รับ-ส่งเอกสารราชการ คำร้อง และการเงินของนักศึกษา", openTime: "08:30", closeTime: "16:30", image: "", video: "" },
    { id: "p8", name: "ห้องพยาบาล", type: "clinic", buildingId: "b1", floor: 1, description: "บริการปฐมพยาบาลเบื้องต้นและพักผ่อนกรณีไม่สบาย", openTime: "08:00", closeTime: "17:00", image: "", video: "" },
    { id: "p9", name: "ที่จอดรถคณะ", type: "parking", buildingId: "b2", floor: 1, description: "ลานจอดรถยนต์และรถจักรยานยนต์ รองรับได้กว่า 200 คัน", openTime: "06:00", closeTime: "21:00", image: "", video: "" },
    { id: "p10", name: "ลิฟต์อาคาร 3", type: "other", buildingId: "b3", floor: 1, description: "ลิฟต์โดยสารสำหรับเข้าถึงทุกชั้นของอาคารเรียน รองรับผู้ใช้รถเข็น", openTime: "06:00", closeTime: "20:00", image: "", video: "" },
  ];

  return {
    departments, buildings, classrooms, teachers, schedules, places,
    settings: {
      logoImage: "",
      siteTitle: "20+20+20+7",
      siteSubtitle: "Smart Faculty Guide",
      heroHeadline: "ค้นหาทุกข้อมูลภายในคณะ ได้ง่ายในที่เดียว",
      heroSubtext: "ค้นหาอาจารย์ สาขา ห้องเรียน อาคาร ตารางสอน และสถานที่สำคัญภายในคณะ พร้อม AI Assistant",
      contactEmail: "faculty-office@example.ac.th",
      contactPhone: "02-000-1000",
      contactAddress: "123 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพฯ 10000",
    },
  };
}

/* =========================================================================
   STORAGE HOOK
   ========================================================================= */
function useFacultyData() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setData(JSON.parse(raw));
      } else {
        const seed = seedData();
        setData(seed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      }
    } catch (e) {
      // localStorage unavailable (e.g. private browsing) -> run in-memory only
      setData(seedData());
    } finally {
      setStatus("ready");
    }
  }, []);

  const [saveError, setSaveError] = useState("");

  const persist = (nextData) => {
    setData(nextData);
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
      setSaveError("");
    } catch (e) {
      setSaveError("บันทึกไม่สำเร็จ: พื้นที่จัดเก็บของเบราว์เซอร์อาจเต็ม (มักเกิดจากอัปโหลดรูป/วิดีโอขนาดใหญ่เกินไป) ลองใช้รูปที่มีขนาดไฟล์เล็กลง");
    } finally {
      setSaving(false);
    }
  };

  return { data, status, saving, saveError, persist };
}

/* =========================================================================
   SMALL HELPERS
   ========================================================================= */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return `https://www.youtube.com/embed/${m[1]}`;
  }
  return null;
}
function byId(list, id) { return (list || []).find((x) => x.id === id); }
function fullName(t) { return t ? `${t.title ? t.title + " " : ""}${t.firstName} ${t.lastName}` : ""; }
function currentDayThai() {
  const map = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
  return map[new Date().getDay()];
}
function currentTimeStr() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function isWithin(start, end, now) { return now >= start && now <= end; }
function isTeacherAvailableNow(teacher) {
  const day = currentDayThai();
  const now = currentTimeStr();
  return (teacher.officeHours || []).some((oh) => oh.day === day && isWithin(oh.start, oh.end, now));
}

/* Thumbnail block: shows the real uploaded/URL image when present, otherwise a colored icon placeholder */
function Thumb({ icon: Icon = ImageIcon, label, aspect = "16/9", size = 28, src, accent }) {
  if (src) {
    return (
      <div style={{ width: "100%", aspectRatio: aspect, position: "relative", overflow: "hidden", background: "var(--surface-2)" }}>
        <img src={src} alt={label || ""} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {label && (
          <span style={{ position: "absolute", bottom: 8, left: 10, fontSize: 11, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.45)", padding: "2px 8px", borderRadius: 999 }}>{label}</span>
        )}
      </div>
    );
  }
  const bg = accent
    ? `linear-gradient(135deg, ${accent}CC, ${accent})`
    : "linear-gradient(135deg, var(--primary-soft), var(--primary))";
  return (
    <div style={{ width: "100%", aspectRatio: aspect, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: bg, color: "#fff" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.16) 1.5px, transparent 1.5px)", backgroundSize: "16px 16px", opacity: 0.7 }} />
      <Icon size={size} strokeWidth={1.5} style={{ position: "relative" }} />
      {label && (
        <span style={{ position: "absolute", bottom: 8, left: 10, fontSize: 11, opacity: 0.9, fontWeight: 600 }}>{label}</span>
      )}
    </div>
  );
}

/* Thin colored bar used at the top of cards to encode category (department/place-type) at a glance */
function AccentBar({ color }) {
  return <div style={{ height: 4, width: "100%", background: color || "var(--accent)" }} />;
}

function VideoPlaceholder({ label = "ยังไม่มีวิดีโอแนะนำ" }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "16/9", borderRadius: 12, border: "1px dashed var(--border)",
      background: "var(--surface-2)", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 8, color: "var(--ink-soft)",
    }}>
      <VideoIcon size={26} strokeWidth={1.5} />
      <span style={{ fontSize: 13 }}>{label}</span>
    </div>
  );
}

/* Renders a real playable video: YouTube link -> embedded player, direct file link -> <video>, empty -> placeholder */
function VideoBlock({ url, label = "วิดีโอแนะนำ" }) {
  if (!url) return <VideoPlaceholder label={`ยังไม่มี${label}`} />;
  const yt = getYoutubeEmbedUrl(url);
  if (yt) {
    return (
      <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
        <iframe
          src={yt}
          title={label}
          style={{ width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <video
      controls
      style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, border: "1px solid var(--border)", background: "#000" }}
      src={url}
    />
  );
}

function SectionTitle({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 18, gap: 12, flexWrap: "wrap" }}>
      <div>
        {eyebrow && <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{eyebrow}</div>}
        <h2 style={{ fontSize: 26 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function EmptyState({ text = "ยังไม่มีข้อมูล" }) {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--ink-soft)", border: "1px dashed var(--border)", borderRadius: 12 }}>
      <AlertCircle size={22} style={{ marginBottom: 8, opacity: 0.6 }} />
      <div>{text}</div>
    </div>
  );
}

/* =========================================================================
   NAVBAR
   ========================================================================= */
function Navbar({ page, goto, isAdmin, onLogout, theme, toggleTheme, settings, query, setQuery, onSearchSubmit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const links = [
    { key: "home", label: "หน้าแรก", icon: HomeIcon },
    { key: "departments", label: "สาขา", icon: GraduationCap },
    { key: "teachers", label: "อาจารย์", icon: User },
    { key: "classrooms", label: "ห้องเรียน", icon: DoorOpen },
    { key: "buildings", label: "อาคาร", icon: Building2 },
    { key: "places", label: "สถานที่", icon: MapPin },
    { key: "map", label: "แผนผัง", icon: Navigation },
    { key: "contact", label: "ติดต่อ", icon: Phone },
  ];

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const doSearch = (e) => {
    e.preventDefault();
    onSearchSubmit();
    setSearchOpen(false);
  };

  const gotoAndClose = (key) => { goto(key); setMenuOpen(false); };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 40, background: "var(--surface)", borderBottom: "1px solid var(--border)", width: "100%" }}>
      <div style={{ maxWidth: 1180, width: "100%", margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <button onClick={() => goto("home")} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", flexShrink: 1, minWidth: 0, overflow: "hidden" }}>
          {settings.logoImage ? (
            <img src={settings.logoImage} alt="logo" className="sfg-navbar-logo" style={{ width: 52, height: 52, borderRadius: 14, objectFit: "cover", border: "1px solid var(--border)", flexShrink: 0 }} />
          ) : (
            <div className="sfg-navbar-logo" style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, var(--primary-soft), var(--primary))", color: "var(--on-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Serif Thai',serif", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
              {settings.siteTitle}
            </div>
          )}
          <div style={{ textAlign: "left", minWidth: 0, overflow: "hidden" }}>
            <div style={{ fontFamily: "'Noto Serif Thai',serif", fontWeight: 700, fontSize: 20, color: "var(--ink)", lineHeight: 1.15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{settings.siteTitle}</div>
            <div className="sfg-navbar-subtitle" style={{ fontSize: 12.5, color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{settings.siteSubtitle}</div>
          </div>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {searchOpen ? (
            <form onSubmit={doSearch} className="sfg-navbar-search" style={{ position: "relative", width: 200 }}>
              <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: "var(--ink-soft)" }} />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => { if (!query) setSearchOpen(false); }}
                placeholder="ค้นหา..."
                className="sfg-input"
                style={{ paddingLeft: 30, paddingRight: 30, fontSize: 13 }}
              />
              <button type="button" onClick={() => { setSearchOpen(false); setQuery(""); }} style={{ position: "absolute", right: 6, top: 6, background: "none", border: "none", color: "var(--ink-soft)", cursor: "pointer", padding: 4 }}>
                <X size={14} />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="sfg-btn sfg-btn-ghost" style={{ padding: 10 }} title="ค้นหา">
              <Search size={17} />
            </button>
          )}

          <button onClick={toggleTheme} className="sfg-btn sfg-btn-ghost" style={{ padding: 10 }} title="สลับโหมดมืด/สว่าง">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {isAdmin ? (
            <button onClick={() => goto("admin-dashboard")} className="sfg-btn sfg-btn-primary">
              <LayoutDashboard size={16} /> <span className="sfg-admin-btn-label">Dashboard</span>
            </button>
          ) : (
            <button onClick={() => goto("admin-login")} className="sfg-btn sfg-btn-ghost">
              <LogIn size={16} /> <span className="sfg-admin-btn-label">Admin</span>
            </button>
          )}

          <button onClick={() => setMenuOpen((v) => !v)} className="sfg-btn sfg-btn-ghost" style={{ padding: 10 }} title="เมนู">
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 20px", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => gotoAndClose(l.key)}
                className="sfg-btn"
                style={{
                  background: page === l.key ? "var(--surface-2)" : "transparent",
                  color: page === l.key ? "var(--primary)" : "var(--ink-soft)",
                  border: "1px solid " + (page === l.key ? "var(--primary)" : "var(--border)"),
                }}
              >
                <l.icon size={14} /> {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   HOME PAGE
   ========================================================================= */
function HomePage({ data, goto, query, setQuery, onSearchSubmit }) {
  const quickMenu = [
    { icon: User, label: "อาจารย์", key: "teachers", color: "#2E6F6B" },
    { icon: GraduationCap, label: "สาขา", key: "departments", color: "#B07A1E" },
    { icon: DoorOpen, label: "ห้องเรียน", key: "classrooms", color: "#7D4FA6" },
    { icon: Building2, label: "อาคาร", key: "buildings", color: "#3D6FB0" },
    { icon: MapPin, label: "สถานที่", key: "places", color: "#B0492E" },
    { icon: Navigation, label: "แผนผัง", key: "map", color: "#5C8A3A" },
    { icon: Bot, label: "AI Assistant", key: "chatbot", color: "#1B2A4A" },
  ];
  const stats = [
    { label: "สาขาวิชา", value: data.departments.length, icon: GraduationCap, color: "#B07A1E" },
    { label: "อาจารย์", value: data.teachers.length, icon: User, color: "#2E6F6B" },
    { label: "ห้องเรียน", value: data.classrooms.length, icon: DoorOpen, color: "#7D4FA6" },
    { label: "อาคาร", value: data.buildings.length, icon: Building2, color: "#3D6FB0" },
  ];
  const features = [
    { icon: Search, title: "ค้นหาได้ในที่เดียว", desc: "รวมข้อมูลอาจารย์ ห้องเรียน อาคาร และสถานที่สำคัญไว้ในระบบเดียว ไม่ต้องถามหลายที่", color: "#B07A1E" },
    { icon: Bot, title: "ถาม AI ได้ทันที", desc: "Faculty AI Assistant ตอบคำถามจากฐานข้อมูลจริงของคณะ ไม่สร้างข้อมูลขึ้นเอง", color: "#2E6F6B" },
    { icon: Navigation, title: "แผนผังอย่างง่าย", desc: "ดูตำแหน่งอาคารและหาเส้นทางไปยังจุดหมายที่ต้องการได้ทันที", color: "#7D4FA6" },
    { icon: LayoutDashboard, title: "แก้ไขได้เอง ไม่ต้องเขียนโค้ด", desc: "เจ้าหน้าที่คณะอัปเดตข้อมูล รูปภาพ และวิดีโอผ่านหน้า Admin ได้ทุกเมื่อ", color: "#3D6FB0" },
  ];

  return (
    <div>
      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, var(--primary) 0%, var(--primary-soft) 60%, var(--accent) 160%)", borderBottom: "1px solid var(--border)" }}>
        <div className="sfg-dotted-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: "rgba(255,255,255,0.07)", top: -180, left: -120 }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.06)", bottom: -160, right: -80 }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 20px 52px", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 18, background: "rgba(255,255,255,0.15)", color: "#fff", padding: "5px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 600 }}>
            <GraduationCap size={13} /> {data.settings.siteTitle} · {data.settings.siteSubtitle}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 46px)", maxWidth: 720, margin: "0 auto 16px", color: "#fff" }}>{data.settings.heroHeadline}</h1>
          <p style={{ color: "rgba(255,255,255,0.88)", maxWidth: 560, margin: "0 auto 32px", fontSize: 15.5 }}>{data.settings.heroSubtext}</p>

          <form onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); }} style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: 18, top: 17, color: "var(--ink-soft)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาอาจารย์ ห้องเรียน สาขา หรือสถานที่..."
              className="sfg-input"
              style={{ padding: "16px 110px 16px 46px", borderRadius: 14, fontSize: 15, boxShadow: "0 12px 30px -10px rgba(0,0,0,0.4)" }}
            />
            <button type="submit" className="sfg-btn sfg-btn-accent" style={{ position: "absolute", right: 6, top: 6, padding: "10px 18px" }}>ค้นหา</button>
          </form>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 34 }}>
            {quickMenu.map((q) => (
              <button
                key={q.label}
                onClick={() => goto(q.key)}
                className="sfg-btn"
                style={{ background: "rgba(255,255,255,0.14)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)" }}
              >
                <span style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <q.icon size={12} />
                </span>
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px" }}>
        {/* STATS */}
        <div className="sfg-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 52, position: "relative", zIndex: 2 }}>
          {stats.map((s) => (
            <div key={s.label} className="sfg-card sfg-card-hover" style={{ padding: "20px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <div className="sfg-feature-icon" style={{ background: s.color + "1A", color: s.color }}>
                <s.icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontFamily: "'Noto Serif Thai',serif", fontSize: 26, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ color: "var(--ink-soft)", fontSize: 12.5, marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <SectionTitle eyebrow="ทำไมต้องใช้ระบบนี้" title="ครบทุกข้อมูลของคณะ ในเว็บเดียว" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginBottom: 52 }}>
          {features.map((f) => (
            <div key={f.title} className="sfg-card" style={{ padding: 20 }}>
              <div className="sfg-feature-icon" style={{ background: f.color + "1A", color: f.color, marginBottom: 14 }}>
                <f.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontSize: 15.5, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <SectionTitle eyebrow="แนะนำ" title="สถานที่ที่ใช้บ่อย" action={<button onClick={() => goto("places")} className="sfg-btn sfg-btn-ghost">ดูทั้งหมด <ChevronRight size={15} /></button>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16, marginBottom: 52 }}>
          {data.places.slice(0, 3).map((p) => (
            <PlaceCard key={p.id} place={p} data={data} onClick={() => goto("place-detail", p.id)} />
          ))}
        </div>

        <SectionTitle eyebrow="สาขาวิชา" title="สาขาทั้งหมดในคณะ" action={<button onClick={() => goto("departments")} className="sfg-btn sfg-btn-ghost">ดูทั้งหมด <ChevronRight size={15} /></button>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16, marginBottom: 52 }}>
          {data.departments.slice(0, 3).map((d) => (
            <DepartmentCard key={d.id} dept={d} data={data} onClick={() => goto("department-detail", d.id)} />
          ))}
        </div>

        <SectionTitle eyebrow="อาคาร" title="อาคารภายในคณะ" action={<button onClick={() => goto("buildings")} className="sfg-btn sfg-btn-ghost">ดูทั้งหมด <ChevronRight size={15} /></button>} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16 }}>
          {data.buildings.slice(0, 4).map((b) => (
            <BuildingCard key={b.id} b={b} data={data} onClick={() => goto("building-detail", b.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   CARDS
   ========================================================================= */
function DepartmentCard({ dept, data, onClick }) {
  const count = data.teachers.filter((t) => t.departmentId === dept.id).length;
  const accent = deptAccent(data, dept.id);
  return (
    <button onClick={onClick} className="sfg-card sfg-card-hover" style={{ textAlign: "left", border: "1px solid var(--border)" }}>
      <AccentBar color={accent} />
      <Thumb icon={GraduationCap} src={dept.image} accent={accent} />
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 17, marginBottom: 6 }}>{dept.name}</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 13, margin: "0 0 12px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{dept.description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="sfg-badge" style={{ color: accent, borderColor: accent + "55" }}><Users size={12} /> {count} ท่าน</span>
          <span style={{ color: accent, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}>ดูรายละเอียด <ChevronRight size={14} /></span>
        </div>
      </div>
    </button>
  );
}

function TeacherCard({ teacher, data, onClick }) {
  const dept = byId(data.departments, teacher.departmentId);
  const bld = byId(data.buildings, teacher.buildingId);
  const accent = deptAccent(data, teacher.departmentId);
  const available = isTeacherAvailableNow(teacher);
  return (
    <button onClick={onClick} className="sfg-card sfg-card-hover" style={{ textAlign: "left", border: "1px solid var(--border)", position: "relative" }}>
      <AccentBar color={accent} />
      <div style={{ position: "relative" }}>
        <Thumb icon={User} src={teacher.image} accent={accent} />
        <span style={{
          position: "absolute", top: 10, right: 10, fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 999,
          background: available ? "var(--success)" : "rgba(0,0,0,0.5)", color: "#fff", display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} /> {available ? "พบได้ตอนนี้" : "ไม่อยู่"}
        </span>
      </div>
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 16 }}>{fullName(teacher)}</h3>
        <div style={{ color: accent, fontSize: 12.5, fontWeight: 700, margin: "3px 0 8px" }}>{dept?.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12.5, color: "var(--ink-soft)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><DoorOpen size={13} /> ห้อง {teacher.room} · {bld?.name}</span>
        </div>
        <div style={{ marginTop: 10, color: "var(--primary)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}>ดูโปรไฟล์ <ChevronRight size={14} /></div>
      </div>
    </button>
  );
}

function ClassroomCard({ room, data, onClick }) {
  const bld = byId(data.buildings, room.buildingId);
  const accent = room.departmentId ? deptAccent(data, room.departmentId) : "#3D6FB0";
  return (
    <button onClick={onClick} className="sfg-card sfg-card-hover" style={{ textAlign: "left", border: "1px solid var(--border)" }}>
      <AccentBar color={accent} />
      <Thumb icon={DoorOpen} label={room.type} src={room.image} accent={accent} />
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 17 }}>ห้อง {room.number}</h3>
        <div style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "6px 0 10px" }}>{bld?.name} · ชั้น {room.floor}</div>
        <span className="sfg-badge" style={{ color: accent, borderColor: accent + "55" }}><Users size={12} /> {room.capacity} ที่นั่ง</span>
      </div>
    </button>
  );
}

function BuildingCard({ b, data, onClick }) {
  const roomCount = data.classrooms.filter((c) => c.buildingId === b.id).length;
  const placeCount = data.places.filter((p) => p.buildingId === b.id).length;
  const accent = idxAccent(data, "buildings", b.id);
  return (
    <button onClick={onClick} className="sfg-card sfg-card-hover" style={{ textAlign: "left", border: "1px solid var(--border)" }}>
      <AccentBar color={accent} />
      <Thumb icon={Building2} src={b.image} accent={accent} />
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 17 }}>{b.name}</h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 13, margin: "6px 0 12px" }}>{b.description}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span className="sfg-badge" style={{ color: accent, borderColor: accent + "55" }}>{b.floors} ชั้น</span>
          <span className="sfg-badge">{roomCount} ห้องเรียน</span>
          <span className="sfg-badge">{placeCount} สถานที่</span>
        </div>
      </div>
    </button>
  );
}

function PlaceCard({ place, data, onClick }) {
  const bld = byId(data.buildings, place.buildingId);
  const meta = PLACE_TYPES[place.type] || PLACE_TYPES.other;
  return (
    <button onClick={onClick} className="sfg-card sfg-card-hover" style={{ textAlign: "left", border: "1px solid var(--border)" }}>
      <AccentBar color={meta.color} />
      <Thumb icon={meta.icon} label={meta.label} src={place.image} accent={meta.color} />
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: 16 }}>{place.name}</h3>
        <div style={{ fontSize: 12.5, color: "var(--ink-soft)", margin: "6px 0 10px" }}>📍 {bld?.name} ชั้น {place.floor}</div>
        <span className="sfg-badge" style={{ color: meta.color, borderColor: meta.color + "55" }}><Clock size={12} /> {place.openTime}–{place.closeTime}</span>
      </div>
    </button>
  );
}

/* =========================================================================
   LIST PAGES
   ========================================================================= */
function PageBanner({ icon: Icon, title, subtitle, accent = "var(--accent)", stat }) {
  return (
    <div style={{ background: `linear-gradient(120deg, ${accent}, var(--primary) 130%)`, position: "relative", overflow: "hidden" }}>
      <div className="sfg-dotted-bg" style={{ position: "absolute", inset: 0, opacity: 0.55 }} />
      <div style={{
        position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.08)",
        top: -130, right: -60,
      }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "38px 20px", position: "relative", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <div className="sfg-feature-icon" style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(255,255,255,0.2)", color: "#fff" }}>
          <Icon size={28} strokeWidth={1.7} />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontSize: 27, color: "#fff" }}>{title}</h1>
          {subtitle && <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.88)", fontSize: 13.5 }}>{subtitle}</p>}
        </div>
        {stat != null && (
          <div style={{ textAlign: "right", color: "#fff" }}>
            <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'Noto Serif Thai',serif" }}>{stat}</div>
            <div style={{ fontSize: 11.5, opacity: 0.85 }}>รายการทั้งหมด</div>
          </div>
        )}
      </div>
    </div>
  );
}

function PageShell({ title, subtitle, children, icon, accent, stat }) {
  return (
    <div>
      {icon ? (
        <PageBanner icon={icon} title={title} subtitle={subtitle} accent={accent} stat={stat} />
      ) : (
        title && (
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "36px 20px 0" }}>
            <h1 style={{ fontSize: 30 }}>{title}</h1>
            {subtitle && <p style={{ color: "var(--ink-soft)", marginTop: 6 }}>{subtitle}</p>}
          </div>
        )
      )}
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: icon ? "28px 20px 64px" : "26px 20px 64px" }}>
        {children}
      </div>
    </div>
  );
}

function BackButton({ onClick, label = "ย้อนกลับ" }) {
  return <button onClick={onClick} className="sfg-btn sfg-btn-ghost" style={{ marginBottom: 20 }}><ArrowLeft size={15} /> {label}</button>;
}

function DepartmentsPage({ data, goto }) {
  return (
    <PageShell title="สาขาทั้งหมด" subtitle="เลือกสาขาเพื่อดูอาจารย์ ห้องประจำสาขา และรายวิชาที่เปิดสอน" icon={GraduationCap} accent="#B07A1E" stat={data.departments.length}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 18 }}>
        {data.departments.map((d) => <DepartmentCard key={d.id} dept={d} data={data} onClick={() => goto("department-detail", d.id)} />)}
      </div>
    </PageShell>
  );
}

function DepartmentDetail({ data, id, goto }) {
  const dept = byId(data.departments, id);
  if (!dept) return <PageShell title="ไม่พบสาขา"><EmptyState /></PageShell>;
  const teachers = data.teachers.filter((t) => t.departmentId === id);
  const rooms = data.classrooms.filter((c) => c.departmentId === id);
  return (
    <PageShell title={dept.name} subtitle={dept.nameEn} icon={GraduationCap} accent={deptAccent(data, dept.id)}>
      <BackButton onClick={() => goto("departments")} label="สาขาทั้งหมด" />
      {dept.image && (
        <div className="sfg-card" style={{ marginBottom: 24, maxWidth: 640 }}>
          <Thumb icon={GraduationCap} src={dept.image} />
        </div>
      )}
      <div className="sfg-split" style={{ marginBottom: 40 }}>
        <div>
          <p style={{ color: "var(--ink-soft)", lineHeight: 1.8 }}>{dept.description}</p>
        </div>
        <VideoBlock url={dept.video} label="วิดีโอแนะนำสาขา" />
      </div>

      <SectionTitle title={`อาจารย์ในสาขา (${teachers.length})`} />
      {teachers.length === 0 ? <EmptyState text="ยังไม่มีอาจารย์ในสาขานี้" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16, marginBottom: 40 }}>
          {teachers.map((t) => <TeacherCard key={t.id} teacher={t} data={data} onClick={() => goto("teacher-profile", t.id)} />)}
        </div>
      )}

      <SectionTitle title="ห้องเรียนที่ใช้บ่อย" />
      {rooms.length === 0 ? <EmptyState text="ยังไม่มีข้อมูลห้องเรียนประจำสาขา" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
          {rooms.map((r) => <ClassroomCard key={r.id} room={r} data={data} onClick={() => goto("classroom-detail", r.id)} />)}
        </div>
      )}
    </PageShell>
  );
}

function TeachersPage({ data, goto }) {
  const [q, setQ] = useState("");
  const [dep, setDep] = useState("");
  const [bld, setBld] = useState("");
  const filtered = data.teachers.filter((t) =>
    (`${t.firstName}${t.lastName}`.includes(q) || q === "") &&
    (dep === "" || t.departmentId === dep) &&
    (bld === "" || t.buildingId === bld)
  );
  return (
    <PageShell title="อาจารย์ทั้งหมด" subtitle={`พบ ${filtered.length} ท่านจากทั้งหมด ${data.teachers.length} ท่าน`} icon={User} accent="#2E6F6B" stat={data.teachers.length}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: 12, color: "var(--ink-soft)" }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ค้นหาชื่ออาจารย์..." className="sfg-input" style={{ paddingLeft: 30 }} />
        </div>
        <select value={dep} onChange={(e) => setDep(e.target.value)} className="sfg-input" style={{ width: 190 }}>
          <option value="">ทุกสาขา</option>
          {data.departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
        <select value={bld} onChange={(e) => setBld(e.target.value)} className="sfg-input" style={{ width: 160 }}>
          <option value="">ทุกอาคาร</option>
          {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      {filtered.length === 0 ? <EmptyState text="ไม่พบอาจารย์ที่ตรงกับเงื่อนไข" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16 }}>
          {filtered.map((t) => <TeacherCard key={t.id} teacher={t} data={data} onClick={() => goto("teacher-profile", t.id)} />)}
        </div>
      )}
    </PageShell>
  );
}

function TeacherProfile({ data, id, goto }) {
  const t = byId(data.teachers, id);
  if (!t) return <PageShell title="ไม่พบอาจารย์"><EmptyState /></PageShell>;
  const dept = byId(data.departments, t.departmentId);
  const bld = byId(data.buildings, t.buildingId);
  const schedule = data.schedules.filter((s) => s.teacherId === t.id);
  const available = isTeacherAvailableNow(t);

  return (
    <PageShell title="">
      <BackButton onClick={() => goto("teachers")} label="อาจารย์ทั้งหมด" />
      <div className="sfg-split-avatar" style={{ marginBottom: 36 }}>
        <div>
          <Thumb icon={User} aspect="1/1" size={56} src={t.image} />
        </div>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>{fullName(t)}</h1>
          <div style={{ color: "var(--accent)", fontWeight: 600, marginBottom: 14 }}>{dept?.name}</div>
          <p style={{ color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: 16, maxWidth: 560 }}>{t.bio}</p>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 13.5, color: "var(--ink)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={14} /> {t.email}</span>
            {t.phone && <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} /> {t.phone}</span>}
          </div>
        </div>
      </div>

      <SectionTitle title="วิดีโอแนะนำตัว" />
      <div style={{ maxWidth: 560, marginBottom: 40 }}><VideoBlock url={t.video} label="วิดีโอแนะนำตัว" /></div>

      <SectionTitle title="ห้องประจำอาจารย์" />
      <div className="sfg-card sfg-office-card" style={{ padding: 22, marginBottom: 40 }}>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          <div><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>ห้อง</div><div style={{ fontWeight: 700, fontSize: 17 }}>{t.room}</div></div>
          <div><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>อาคาร</div><div style={{ fontWeight: 700, fontSize: 17 }}>{bld?.name}</div></div>
          <div><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>ชั้น</div><div style={{ fontWeight: 700, fontSize: 17 }}>{t.floor}</div></div>
        </div>
        <button onClick={() => goto("map", t.buildingId)} className="sfg-btn sfg-btn-primary"><MapPin size={15} /> ดูตำแหน่งห้อง</button>
      </div>

      <SectionTitle title="ตารางสอน" />
      <div className="sfg-card" style={{ overflowX: "auto", marginBottom: 40 }}>
        {schedule.length === 0 ? <div style={{ padding: 24 }}><EmptyState text="ยังไม่มีตารางสอน" /></div> : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead>
              <tr style={{ background: "var(--surface-2)", textAlign: "left" }}>
                {["วัน", "เวลา", "วิชา", "ห้อง", "อาคาร"].map((h) => <th key={h} style={{ padding: "10px 16px", fontWeight: 600 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => {
                const room = byId(data.classrooms, s.classroomId);
                const roomBld = room ? byId(data.buildings, room.buildingId) : null;
                return (
                  <tr key={s.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 16px" }}>{s.day}</td>
                    <td style={{ padding: "10px 16px" }}>{s.start}–{s.end}</td>
                    <td style={{ padding: "10px 16px" }}>{s.subject}</td>
                    <td style={{ padding: "10px 16px" }}>{room?.number || "-"}</td>
                    <td style={{ padding: "10px 16px" }}>{roomBld?.name || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <SectionTitle title="เวลาที่สามารถพบอาจารย์" action={
        <span className="sfg-badge" style={{ color: available ? "var(--success)" : "var(--danger)", borderColor: available ? "var(--success)" : "var(--danger)" }}>
          {available ? "🟢 สามารถพบได้ตอนนี้" : "🔴 ไม่อยู่ / ไม่เปิดให้พบขณะนี้"}
        </span>
      } />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {(t.officeHours || []).length === 0 ? <EmptyState text="ยังไม่มีข้อมูลเวลาพบอาจารย์" /> : t.officeHours.map((oh, i) => (
          <div key={i} className="sfg-card" style={{ padding: "12px 18px", fontSize: 13.5 }}>
            <div style={{ fontWeight: 700 }}>{oh.day}</div>
            <div style={{ color: "var(--ink-soft)" }}>{oh.start}–{oh.end}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function ClassroomsPage({ data, goto }) {
  const [bld, setBld] = useState("");
  const filtered = data.classrooms.filter((c) => bld === "" || c.buildingId === bld);
  return (
    <PageShell title="ห้องเรียนทั้งหมด" subtitle={`ทั้งหมด ${data.classrooms.length} ห้อง`} icon={DoorOpen} accent="#7D4FA6" stat={data.classrooms.length}>
      <div style={{ marginBottom: 22 }}>
        <select value={bld} onChange={(e) => setBld(e.target.value)} className="sfg-input" style={{ width: 200 }}>
          <option value="">ทุกอาคาร</option>
          {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 16 }}>
        {filtered.map((r) => <ClassroomCard key={r.id} room={r} data={data} onClick={() => goto("classroom-detail", r.id)} />)}
      </div>
    </PageShell>
  );
}

function ClassroomDetail({ data, id, goto }) {
  const room = byId(data.classrooms, id);
  if (!room) return <PageShell title="ไม่พบห้องเรียน"><EmptyState /></PageShell>;
  const bld = byId(data.buildings, room.buildingId);
  const schedule = data.schedules.filter((s) => s.classroomId === room.id);
  return (
    <PageShell title={`ห้อง ${room.number}`} subtitle={`${bld?.name} · ชั้น ${room.floor} · ${room.type}`} icon={DoorOpen} accent={room.departmentId ? deptAccent(data, room.departmentId) : "#7D4FA6"}>
      <BackButton onClick={() => goto("classrooms")} label="ห้องเรียนทั้งหมด" />
      <div className="sfg-split" style={{ marginBottom: 36 }}>
        <div className="sfg-card"><Thumb icon={DoorOpen} label={room.type} src={room.image} /></div>
        <VideoBlock url={room.video} label="วิดีโอห้องเรียน" />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
        <span className="sfg-badge">ความจุ {room.capacity} ที่นั่ง</span>
        <button onClick={() => goto("map", bld?.id)} className="sfg-btn sfg-btn-primary" style={{ marginLeft: "auto" }}><MapPin size={15} /> ดูตำแหน่งบนแผนผัง</button>
      </div>
      <SectionTitle title="วิชาที่ใช้ห้องนี้" />
      {schedule.length === 0 ? <EmptyState text="ยังไม่มีวิชาที่ใช้ห้องนี้" /> : (
        <div className="sfg-card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
            <thead><tr style={{ background: "var(--surface-2)", textAlign: "left" }}>{["วัน", "เวลา", "วิชา", "ผู้สอน"].map((h) => <th key={h} style={{ padding: "10px 16px" }}>{h}</th>)}</tr></thead>
            <tbody>
              {schedule.map((s) => {
                const teacher = byId(data.teachers, s.teacherId);
                return (
                  <tr key={s.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 16px" }}>{s.day}</td>
                    <td style={{ padding: "10px 16px" }}>{s.start}–{s.end}</td>
                    <td style={{ padding: "10px 16px" }}>{s.subject}</td>
                    <td style={{ padding: "10px 16px" }}>
                      <button onClick={() => goto("teacher-profile", teacher?.id)} style={{ background: "none", border: "none", color: "var(--primary)", fontWeight: 600, cursor: "pointer" }}>{fullName(teacher)}</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  );
}

function BuildingsPage({ data, goto }) {
  return (
    <PageShell title="อาคารทั้งหมด" subtitle="เลือกอาคารเพื่อดูห้องเรียน ห้องอาจารย์ และสถานที่ในแต่ละชั้น" icon={Building2} accent="#3D6FB0" stat={data.buildings.length}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 18 }}>
        {data.buildings.map((b) => <BuildingCard key={b.id} b={b} data={data} onClick={() => goto("building-detail", b.id)} />)}
      </div>
    </PageShell>
  );
}

function BuildingDetail({ data, id, goto }) {
  const bld = byId(data.buildings, id);
  const [floor, setFloor] = useState(1);
  useEffect(() => { setFloor(1); }, [id]);
  if (!bld) return <PageShell title="ไม่พบอาคาร"><EmptyState /></PageShell>;

  const rooms = data.classrooms.filter((c) => c.buildingId === id && c.floor === floor);
  const teacherRooms = data.teachers.filter((t) => t.buildingId === id && t.floor === floor);
  const places = data.places.filter((p) => p.buildingId === id && p.floor === floor);

  return (
    <PageShell title={bld.name} subtitle={bld.description} icon={Building2} accent={idxAccent(data, "buildings", bld.id)}>
      <BackButton onClick={() => goto("buildings")} label="อาคารทั้งหมด" />
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {Array.from({ length: bld.floors }, (_, i) => i + 1).map((f) => (
          <button key={f} onClick={() => setFloor(f)} className="sfg-btn" style={{
            border: "1px solid var(--border)",
            background: floor === f ? "var(--primary)" : "var(--surface)",
            color: floor === f ? "var(--on-primary)" : "var(--ink)",
          }}>ชั้น {f}</button>
        ))}
      </div>

      <SectionTitle title={`ห้องเรียน — ชั้น ${floor}`} />
      {rooms.length === 0 ? <EmptyState text="ไม่มีห้องเรียนในชั้นนี้" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14, marginBottom: 30 }}>
          {rooms.map((r) => <ClassroomCard key={r.id} room={r} data={data} onClick={() => goto("classroom-detail", r.id)} />)}
        </div>
      )}

      <SectionTitle title={`ห้องอาจารย์ — ชั้น ${floor}`} />
      {teacherRooms.length === 0 ? <EmptyState text="ไม่มีห้องอาจารย์ในชั้นนี้" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 30 }}>
          {teacherRooms.map((t) => <TeacherCard key={t.id} teacher={t} data={data} onClick={() => goto("teacher-profile", t.id)} />)}
        </div>
      )}

      <SectionTitle title={`สถานที่ — ชั้น ${floor}`} />
      {places.length === 0 ? <EmptyState text="ไม่มีสถานที่สำคัญในชั้นนี้" /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
          {places.map((p) => <PlaceCard key={p.id} place={p} data={data} onClick={() => goto("place-detail", p.id)} />)}
        </div>
      )}
    </PageShell>
  );
}

function PlacesPage({ data, goto }) {
  const [type, setType] = useState("");
  const filtered = data.places.filter((p) => type === "" || p.type === type);
  return (
    <PageShell title="สถานที่สำคัญภายในคณะ" subtitle="ค้นหาสิ่งอำนวยความสะดวกและจุดสำคัญต่าง ๆ ในคณะ" icon={MapPin} accent="#B0492E" stat={data.places.length}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        <button onClick={() => setType("")} className="sfg-btn" style={{ border: "1px solid var(--border)", background: type === "" ? "var(--primary)" : "var(--surface)", color: type === "" ? "var(--on-primary)" : "var(--ink)" }}>ทั้งหมด</button>
        {Object.entries(PLACE_TYPES).map(([key, meta]) => (
          <button key={key} onClick={() => setType(key)} className="sfg-btn" style={{ border: "1px solid var(--border)", background: type === key ? "var(--primary)" : "var(--surface)", color: type === key ? "var(--on-primary)" : "var(--ink)" }}>
            <meta.icon size={14} /> {meta.label}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 16 }}>
        {filtered.map((p) => <PlaceCard key={p.id} place={p} data={data} onClick={() => goto("place-detail", p.id)} />)}
      </div>
    </PageShell>
  );
}

function PlaceDetail({ data, id, goto }) {
  const place = byId(data.places, id);
  if (!place) return <PageShell title="ไม่พบสถานที่"><EmptyState /></PageShell>;
  const bld = byId(data.buildings, place.buildingId);
  const meta = PLACE_TYPES[place.type] || PLACE_TYPES.other;
  return (
    <PageShell title={place.name} subtitle={meta.label} icon={meta.icon} accent={meta.color}>
      <BackButton onClick={() => goto("places")} label="สถานที่ทั้งหมด" />
      <div className="sfg-split" style={{ marginBottom: 28 }}>
        <div className="sfg-card"><Thumb icon={meta.icon} src={place.image} /></div>
        <VideoBlock url={place.video} label="วิดีโอแนะนำสถานที่" />
      </div>
      <p style={{ color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: 20, maxWidth: 640 }}>{place.description}</p>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
        <div><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>ตำแหน่ง</div><div style={{ fontWeight: 700 }}>📍 {bld?.name} ชั้น {place.floor}</div></div>
        <div><div style={{ fontSize: 12, color: "var(--ink-soft)" }}>เวลาเปิด–ปิด</div><div style={{ fontWeight: 700 }}>🕐 {place.openTime} – {place.closeTime}</div></div>
      </div>
      <button onClick={() => goto("map", place.buildingId)} className="sfg-btn sfg-btn-primary"><Navigation size={15} /> ดูเส้นทาง / แผนผัง</button>
    </PageShell>
  );
}

/* =========================================================================
   MAP (schematic, no external tiles required)
   ========================================================================= */
function MapPage({ data, focusId, goto }) {
  const [selected, setSelected] = useState(focusId || null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [route, setRoute] = useState(null);
  useEffect(() => { setSelected(focusId || null); }, [focusId]);

  const layout = { b1: { x: 40, y: 40 }, b2: { x: 260, y: 40 }, b3: { x: 40, y: 220 }, b4: { x: 260, y: 220 } };

  const buildingContents = (bid) => {
    const rooms = data.classrooms.filter((c) => c.buildingId === bid);
    const teacherRooms = data.teachers.filter((t) => t.buildingId === bid);
    const places = data.places.filter((p) => p.buildingId === bid);
    return { rooms, teacherRooms, places };
  };

  const allPoints = [
    ...data.buildings.map((b) => ({ id: b.id, name: b.name, type: "อาคาร" })),
  ];

  const computeRoute = () => {
    if (!from || !to) return;
    if (from === to) { setRoute({ text: "จุดเริ่มต้นและปลายทางเป็นที่เดียวกัน" }); return; }
    const fromB = byId(data.buildings, from);
    const toB = byId(data.buildings, to);
    const p1 = layout[from], p2 = layout[to];
    const dist = p1 && p2 ? Math.hypot(p1.x - p2.x, p1.y - p2.y) : 200;
    const minutes = Math.max(1, Math.round(dist / 40));
    setRoute({ text: `จาก ${fromB?.name} เดินตรงไปยัง ${toB?.name} ใช้เวลาประมาณ ${minutes} นาที (เส้นทางเดินเท้าโดยประมาณ)`, from, to });
  };

  const sel = selected ? byId(data.buildings, selected) : null;
  const content = sel ? buildingContents(sel.id) : null;

  return (
    <PageShell title="แผนผังภายในคณะ" subtitle="คลิกที่อาคารบนแผนผังเพื่อดูรายละเอียด หรือใช้ระบบหาเส้นทางอย่างง่าย" icon={Navigation} accent="#5C8A3A">
      <div className="sfg-split" style={{ gap: 24 }}>
        <div className="sfg-card" style={{ padding: 20 }}>
          <svg viewBox="0 0 460 360" style={{ width: "100%", height: "auto" }}>
            <rect x="0" y="0" width="460" height="360" fill="var(--surface-2)" rx="14" />
            {data.buildings.map((b) => {
              const p = layout[b.id] || { x: 40, y: 40 };
              const isSel = selected === b.id;
              return (
                <g key={b.id} onClick={() => setSelected(b.id)} style={{ cursor: "pointer" }}>
                  <rect x={p.x} y={p.y} width="160" height="120" rx="12"
                    fill={isSel ? "var(--accent)" : "var(--primary)"} opacity={isSel ? 1 : 0.9} />
                  <text x={p.x + 80} y={p.y + 55} textAnchor="middle" fill={isSel ? "#1B160A" : "var(--on-primary)"} fontSize="16" fontWeight="700" fontFamily="'Noto Serif Thai',serif">{b.name}</text>
                  <text x={p.x + 80} y={p.y + 78} textAnchor="middle" fill={isSel ? "#1B160A" : "var(--on-primary)"} fontSize="11" opacity="0.85">{b.floors} ชั้น</text>
                </g>
              );
            })}
          </svg>
          <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 10 }}>* แผนผังนี้เป็นแผนผังจำลองสำหรับสาธิตระบบ ไม่ใช่ตำแหน่งจริงตามมาตราส่วน</div>
        </div>

        <div>
          <div className="sfg-card" style={{ padding: 18, marginBottom: 18 }}>
            <h3 style={{ fontSize: 15, marginBottom: 12 }}>หาเส้นทาง</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label style={{ fontSize: 12, color: "var(--ink-soft)" }}>ฉันอยู่ที่</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="sfg-input">
                <option value="">เลือกอาคาร</option>
                {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <label style={{ fontSize: 12, color: "var(--ink-soft)" }}>ต้องการไป</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="sfg-input">
                <option value="">เลือกอาคาร</option>
                {data.buildings.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
              <button onClick={computeRoute} className="sfg-btn sfg-btn-primary" style={{ justifyContent: "center" }}><Navigation size={15} /> แสดงเส้นทาง</button>
              {route && <div style={{ background: "var(--surface-2)", padding: 12, borderRadius: 10, fontSize: 13.5, marginTop: 6 }}>{route.text}</div>}
            </div>
          </div>

          <div className="sfg-card" style={{ padding: 18 }}>
            {sel ? (
              <div>
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{sel.name}</h3>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 12 }}>{sel.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
                  <div>🚪 ห้องเรียน: {content.rooms.length} ห้อง</div>
                  <div>👨‍🏫 ห้องอาจารย์: {content.teacherRooms.length} ห้อง</div>
                  <div>🗺️ สถานที่สำคัญ: {content.places.length} จุด</div>
                </div>
                <button onClick={() => goto("building-detail", sel.id)} className="sfg-btn sfg-btn-ghost" style={{ marginTop: 14 }}>ดูรายละเอียดอาคาร <ChevronRight size={14} /></button>
              </div>
            ) : (
              <EmptyState text="คลิกอาคารบนแผนผังเพื่อดูรายละเอียด" />
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

/* =========================================================================
   SEARCH PAGE
   ========================================================================= */
function SearchPage({ data, query, goto }) {
  const q = (query || "").trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return { teachers: [], departments: [], classrooms: [], buildings: [], places: [] };
    const teachers = data.teachers.filter((t) => `${t.firstName}${t.lastName}${t.room}`.toLowerCase().includes(q));
    const departments = data.departments.filter((d) => d.name.toLowerCase().includes(q));
    const classrooms = data.classrooms.filter((c) => c.number.toLowerCase().includes(q));
    const buildings = data.buildings.filter((b) => b.name.toLowerCase().includes(q));
    const places = data.places.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    return { teachers, departments, classrooms, buildings, places };
  }, [q, data]);

  const total = results.teachers.length + results.departments.length + results.classrooms.length + results.buildings.length + results.places.length;

  return (
    <PageShell title="ผลการค้นหา" subtitle={q ? `พบ ${total} รายการสำหรับ “${query}”` : "พิมพ์คำค้นหาที่แถบด้านบน"} icon={Search} accent="#1B2A4A">
      {total === 0 && q && <EmptyState text="ไม่พบข้อมูลที่ค้นหา ลองใช้คำอื่น" />}

      {results.teachers.length > 0 && (
        <>
          <SectionTitle title="อาจารย์" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 30 }}>
            {results.teachers.map((t) => <TeacherCard key={t.id} teacher={t} data={data} onClick={() => goto("teacher-profile", t.id)} />)}
          </div>
        </>
      )}
      {results.departments.length > 0 && (
        <>
          <SectionTitle title="สาขา" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 30 }}>
            {results.departments.map((d) => <DepartmentCard key={d.id} dept={d} data={data} onClick={() => goto("department-detail", d.id)} />)}
          </div>
        </>
      )}
      {results.classrooms.length > 0 && (
        <>
          <SectionTitle title="ห้องเรียน" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 30 }}>
            {results.classrooms.map((r) => <ClassroomCard key={r.id} room={r} data={data} onClick={() => goto("classroom-detail", r.id)} />)}
          </div>
        </>
      )}
      {results.buildings.length > 0 && (
        <>
          <SectionTitle title="อาคาร" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14, marginBottom: 30 }}>
            {results.buildings.map((b) => <BuildingCard key={b.id} b={b} data={data} onClick={() => goto("building-detail", b.id)} />)}
          </div>
        </>
      )}
      {results.places.length > 0 && (
        <>
          <SectionTitle title="สถานที่" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
            {results.places.map((p) => <PlaceCard key={p.id} place={p} data={data} onClick={() => goto("place-detail", p.id)} />)}
          </div>
        </>
      )}
    </PageShell>
  );
}

/* =========================================================================
   CONTACT PAGE
   ========================================================================= */
function ContactPage({ data }) {
  return (
    <PageShell title="ติดต่อคณะ" subtitle="ช่องทางการติดต่อสำนักงานคณะ" icon={Phone} accent="#B07A1E">
      <div className="sfg-card" style={{ padding: 26, maxWidth: 480 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 14 }}>
          <div style={{ display: "flex", gap: 10 }}><Mail size={17} style={{ color: "var(--accent)" }} /> {data.settings.contactEmail}</div>
          <div style={{ display: "flex", gap: 10 }}><Phone size={17} style={{ color: "var(--accent)" }} /> {data.settings.contactPhone}</div>
          <div style={{ display: "flex", gap: 10 }}><MapPin size={17} style={{ color: "var(--accent)" }} /> {data.settings.contactAddress}</div>
        </div>
      </div>
    </PageShell>
  );
}

/* =========================================================================
   AI CHATBOT
   ========================================================================= */
function answerQuery(raw, data) {
  const q = raw.trim();
  const ql = q.toLowerCase();
  if (!q) return "พิมพ์คำถามเกี่ยวกับอาจารย์ ห้องเรียน อาคาร หรือสถานที่ภายในคณะได้เลยครับ/ค่ะ";

  // teacher match
  const teacher = data.teachers.find((t) => ql.includes(t.firstName.toLowerCase()) || ql.includes(`${t.firstName}${t.lastName}`.toLowerCase()));
  if (teacher) {
    const dept = byId(data.departments, teacher.departmentId);
    const bld = byId(data.buildings, teacher.buildingId);
    if (ql.includes("สอน") || ql.includes("วันนี้") || ql.includes("ตาราง")) {
      const day = currentDayThai();
      const todays = data.schedules.filter((s) => s.teacherId === teacher.id && (ql.includes("วันนี้") ? s.day === day : true));
      if (todays.length === 0) {
        return `วันนี้ (${day}) ${fullName(teacher)} ไม่มีคาบสอนในระบบครับ/ค่ะ`;
      }
      const lines = todays.map((s) => {
        const room = byId(data.classrooms, s.classroomId);
        return `${s.day} เวลา ${s.start}-${s.end} วิชา ${s.subject} ห้อง ${room?.number || "-"}`;
      }).join(" / ");
      return `ตารางสอนของ ${fullName(teacher)}: ${lines}`;
    }
    if (ql.includes("พบ") || ql.includes("เจอ") || ql.includes("office")) {
      const oh = teacher.officeHours || [];
      if (oh.length === 0) return `ยังไม่มีข้อมูลเวลาพบของ ${fullName(teacher)} ในระบบครับ/ค่ะ`;
      const text = oh.map((o) => `${o.day} ${o.start}-${o.end}`).join(", ");
      const status = isTeacherAvailableNow(teacher) ? "ขณะนี้สามารถพบได้ (🟢)" : "ขณะนี้ไม่สามารถพบได้ (🔴)";
      return `${fullName(teacher)} สามารถพบได้ในช่วง: ${text}. ${status}`;
    }
    return `${fullName(teacher)} อยู่ห้อง ${teacher.room} ${bld?.name} ชั้น ${teacher.floor} สาขา ${dept?.name}`;
  }

  // classroom match
  const roomMatch = data.classrooms.find((c) => ql.includes(c.number.toLowerCase()));
  if (roomMatch) {
    const bld = byId(data.buildings, roomMatch.buildingId);
    return `ห้อง ${roomMatch.number} อยู่ที่ ${bld?.name} ชั้น ${roomMatch.floor} (${roomMatch.type}, ความจุ ${roomMatch.capacity} ที่นั่ง)`;
  }

  // place match
  const place = data.places.find((p) => ql.includes(p.name.toLowerCase()));
  if (place) {
    const bld = byId(data.buildings, place.buildingId);
    return `${place.name} อยู่ที่ ${bld?.name} ชั้น ${place.floor} เปิดเวลา ${place.openTime}-${place.closeTime} น.`;
  }

  // department count
  const dept = data.departments.find((d) => ql.includes(d.name.toLowerCase()));
  if (dept) {
    const count = data.teachers.filter((t) => t.departmentId === dept.id).length;
    return `สาขา${dept.name} มีอาจารย์ทั้งหมด ${count} ท่านในระบบ`;
  }

  // simple routing
  if (ql.includes("ไป") && (ql.includes("ยังไง") || ql.includes("อย่างไร") || ql.includes("เดินทาง"))) {
    const fromB = data.buildings.find((b) => ql.includes(b.name.toLowerCase()));
    const toPlace = data.places.find((p) => ql.includes(p.name.toLowerCase()));
    if (fromB && toPlace) {
      const toB = byId(data.buildings, toPlace.buildingId);
      return `จาก ${fromB.name} เดินไปยัง ${toPlace.name} ที่ ${toB?.name} ชั้น ${toPlace.floor} ได้โดยตรง (ดูเส้นทางแบบภาพได้ที่หน้าแผนผัง)`;
    }
  }

  return "ขออภัย ไม่พบข้อมูลนี้ในระบบ กรุณาติดต่อผู้ดูแลคณะ";
}

function ChatbotPanel({ data, embedded = false, onClose, goto }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "สวัสดีครับ/ค่ะ ผม/ดิฉันคือ Faculty AI Assistant ถามข้อมูลอาจารย์ ห้องเรียน อาคาร หรือสถานที่ภายในคณะได้เลยครับ/ค่ะ" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = answerQuery(text, data);
    setMessages((m) => [...m, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  const examples = ["อาจารย์สมชายอยู่ห้องไหน", "ห้อง 302 อยู่ตรงไหน", "โรงอาหารใหญ่อยู่ทางไหน", "สาขาเทคโนโลยีสารสนเทศ มีอาจารย์กี่คน"];

  return (
    <div className="sfg-card" style={{
      display: "flex", flexDirection: "column", height: embedded ? "70vh" : "100%",
      maxWidth: embedded ? 560 : "none", margin: embedded ? "0 auto" : 0,
    }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--primary)", color: "var(--on-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={17} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Faculty AI Assistant</div>
          <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>ตอบจากฐานข้อมูลของคณะเท่านั้น</div>
        </div>
        {onClose && <button onClick={onClose} className="sfg-btn sfg-btn-ghost" style={{ padding: 8 }}><X size={16} /></button>}
      </div>

      <div ref={scrollRef} className="sfg-scroll" style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
            <div style={{
              background: m.role === "user" ? "var(--primary)" : "var(--surface-2)",
              color: m.role === "user" ? "var(--on-primary)" : "var(--ink)",
              padding: "10px 14px", borderRadius: 14, fontSize: 13.5, lineHeight: 1.6,
            }}>{m.text}</div>
          </div>
        ))}
        {messages.length <= 1 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {examples.map((ex) => (
              <button key={ex} onClick={() => setInput(ex)} className="sfg-badge" style={{ cursor: "pointer" }}>{ex}</button>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: 12, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          placeholder="พิมพ์คำถาม เช่น อาจารย์สมชายอยู่ห้องไหน"
          className="sfg-input"
        />
        <button onClick={send} className="sfg-btn sfg-btn-primary" style={{ padding: "10px 14px" }}><Send size={16} /></button>
      </div>
    </div>
  );
}

/* =========================================================================
   ADMIN — LOGIN
   ========================================================================= */
function AdminLoginPage({ onLogin, goto }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      onLogin();
      goto("admin-dashboard");
    } else {
      setErr("บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "70px auto", padding: "0 20px" }}>
      <div className="sfg-card" style={{ padding: 30 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--primary)", color: "var(--on-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}><LogIn size={20} /></div>
          <h2 style={{ fontSize: 20 }}>เข้าสู่ระบบผู้ดูแล</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 13, marginTop: 4 }}>สำหรับเจ้าหน้าที่คณะเท่านั้น</p>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: "var(--ink-soft)" }}>ชื่อผู้ใช้</label>
            <input value={user} onChange={(e) => setUser(e.target.value)} className="sfg-input" placeholder="กรอกชื่อผู้ใช้" />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--ink-soft)" }}>รหัสผ่าน</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="sfg-input" placeholder="••••••••" />
          </div>
          {err && <div style={{ color: "var(--danger)", fontSize: 12.5 }}>{err}</div>}
          <button type="submit" className="sfg-btn sfg-btn-primary" style={{ justifyContent: "center", marginTop: 6 }}>เข้าสู่ระบบ</button>
        </form>
      </div>
    </div>
  );
}

/* =========================================================================
   ADMIN — GENERIC CRUD TABLE
   ========================================================================= */
function GenericAdminTable({ title, items, fields, onAdd, onUpdate, onDelete, renderTitle }) {
  const emptyForm = () => Object.fromEntries(fields.map((f) => [f.key, f.default !== undefined ? f.default : ""]));
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const startAdd = () => { setForm(emptyForm()); setEditingId(null); setShowForm(true); };
  const startEdit = (item) => {
    const f = {};
    fields.forEach((fld) => { f[fld.key] = item[fld.key] !== undefined ? item[fld.key] : (fld.default !== undefined ? fld.default : ""); });
    setForm(f); setEditingId(item.id); setShowForm(true);
  };
  const cancel = () => { setShowForm(false); setEditingId(null); };

  const submit = (e) => {
    e.preventDefault();
    const cleaned = { ...form };
    fields.forEach((f) => { if (f.type === "number") cleaned[f.key] = Number(cleaned[f.key]) || 0; });
    if (editingId) onUpdate(editingId, cleaned); else onAdd(cleaned);
    cancel();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: 18 }}>{title} <span style={{ color: "var(--ink-soft)", fontSize: 13, fontWeight: 400 }}>({items.length})</span></h3>
        {!showForm && <button onClick={startAdd} className="sfg-btn sfg-btn-primary"><Plus size={15} /> เพิ่ม{title}</button>}
      </div>

      {showForm && (
        <form onSubmit={submit} className="sfg-card" style={{ padding: 18, marginBottom: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12 }}>
          {fields.map((f) => (
            <div key={f.key} style={{ gridColumn: f.wide ? "1 / -1" : "auto" }}>
              <label style={{ fontSize: 12, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>{f.label}</label>
              {f.type === "select" ? (
                <select className="sfg-input" value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}>
                  <option value="">เลือก{f.label}</option>
                  {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea className="sfg-input" rows={3} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
              ) : f.type === "image" ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    {form[f.key] ? (
                      <img src={form[f.key]} alt="" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }} />
                    ) : (
                      <div style={{ width: 52, height: 52, borderRadius: 8, border: "1px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-soft)" }}>
                        <ImageIcon size={18} />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="sfg-input"
                      style={{ padding: 6, fontSize: 12 }}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const b64 = await fileToBase64(file);
                          setForm((prev) => ({ ...prev, [f.key]: b64 }));
                        } catch (err) { /* ignore read errors */ }
                      }}
                    />
                  </div>
                  <input
                    className="sfg-input"
                    value={form[f.key] && form[f.key].startsWith("data:") ? "" : form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder="หรือวางลิงก์รูปภาพ (URL)"
                    style={{ fontSize: 12.5 }}
                  />
                </div>
              ) : f.type === "video" ? (
                <input
                  className="sfg-input"
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder="วางลิงก์ YouTube หรือไฟล์วิดีโอ (.mp4)"
                />
              ) : (
                <input
                  className="sfg-input"
                  type={f.type === "number" ? "number" : "text"}
                  value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder || ""}
                />
              )}
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, marginTop: 4 }}>
            <button type="submit" className="sfg-btn sfg-btn-primary"><Check size={15} /> {editingId ? "บันทึกการแก้ไข" : "เพิ่มข้อมูล"}</button>
            <button type="button" onClick={cancel} className="sfg-btn sfg-btn-ghost">ยกเลิก</button>
          </div>
        </form>
      )}

      <div className="sfg-card" style={{ overflowX: "auto" }}>
        {items.length === 0 ? <div style={{ padding: 24 }}><EmptyState /></div> : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--surface-2)", textAlign: "left" }}>
                <th style={{ padding: "10px 14px" }}>รายการ</th>
                {fields.filter((f) => f.showInList).map((f) => <th key={f.key} style={{ padding: "10px 14px" }}>{f.label}</th>)}
                <th style={{ padding: "10px 14px", width: 110 }}>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 600 }}>{renderTitle(item)}</td>
                  {fields.filter((f) => f.showInList).map((f) => (
                    <td key={f.key} style={{ padding: "10px 14px", color: "var(--ink-soft)" }}>
                      {f.type === "select" ? (f.options.find((o) => o.value === item[f.key])?.label || "-") : String(item[f.key] ?? "-")}
                    </td>
                  ))}
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => startEdit(item)} className="sfg-btn sfg-btn-ghost" style={{ padding: 7 }}><Pencil size={14} /></button>
                      <button onClick={() => { if (confirm(`ลบ "${renderTitle(item)}" ใช่หรือไม่?`)) onDelete(item.id); }} className="sfg-btn sfg-btn-danger" style={{ padding: 7 }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   ADMIN — DASHBOARD
   ========================================================================= */
function AdminDashboard({ data, persist, saveError, onLogout, goto }) {
  const [tab, setTab] = useState("overview");

  const update = (key, updater) => persist({ ...data, [key]: updater(data[key]) });
  const addItem = (key, prefix) => (values) => update(key, (list) => [...list, { id: uid(prefix), ...values }]);
  const editItem = (key) => (id, values) => update(key, (list) => list.map((it) => (it.id === id ? { ...it, ...values } : it)));
  const deleteItem = (key) => (id) => update(key, (list) => list.filter((it) => it.id !== id));

  const depOptions = data.departments.map((d) => ({ value: d.id, label: d.name }));
  const bldOptions = data.buildings.map((b) => ({ value: b.id, label: b.name }));
  const roomOptions = data.classrooms.map((c) => ({ value: c.id, label: `ห้อง ${c.number}` }));
  const teacherOptions = data.teachers.map((t) => ({ value: t.id, label: fullName(t) }));
  const dayOptions = DAYS.map((d) => ({ value: d, label: d }));
  const placeTypeOptions = Object.entries(PLACE_TYPES).map(([k, v]) => ({ value: k, label: v.label }));

  const stats = [
    { label: "อาจารย์", value: data.teachers.length, icon: User },
    { label: "สาขา", value: data.departments.length, icon: GraduationCap },
    { label: "ห้องเรียน", value: data.classrooms.length, icon: DoorOpen },
    { label: "อาคาร", value: data.buildings.length, icon: Building2 },
    { label: "สถานที่", value: data.places.length, icon: MapPin },
    { label: "ตารางสอน", value: data.schedules.length, icon: Calendar },
  ];

  const tabs = [
    { key: "overview", label: "Dashboard", icon: LayoutDashboard },
    { key: "teachers", label: "Teachers", icon: User },
    { key: "departments", label: "Departments", icon: GraduationCap },
    { key: "classrooms", label: "Classrooms", icon: DoorOpen },
    { key: "buildings", label: "Buildings", icon: Building2 },
    { key: "places", label: "Places", icon: MapPin },
    { key: "schedules", label: "Schedules", icon: Calendar },
    { key: "settings", label: "Website Settings", icon: Pencil },
  ];

  return (
    <>
      {saveError && (
        <div style={{ maxWidth: 1180, margin: "16px auto 0", padding: "0 20px" }}>
          <div style={{ background: "var(--danger)" + "15", border: "1px solid var(--danger)", color: "var(--danger)", borderRadius: 10, padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} /> {saveError}
          </div>
        </div>
      )}
      <div className="sfg-admin-layout" style={{ maxWidth: 1180, margin: "0 auto", padding: "30px 20px 64px" }}>
      <div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 700, fontFamily: "'Noto Serif Thai',serif", fontSize: 16 }}>Admin Panel</div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>เข้าสู่ระบบในฐานะผู้ดูแล</div>
        </div>
        <div className="sfg-admin-nav">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className="sfg-btn" style={{
              justifyContent: "flex-start", border: "none",
              background: tab === t.key ? "var(--surface-2)" : "transparent",
              color: tab === t.key ? "var(--primary)" : "var(--ink-soft)",
            }}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
          <button onClick={() => { onLogout(); goto("home"); }} className="sfg-btn sfg-btn-ghost" style={{ justifyContent: "flex-start", marginTop: 14 }}>
            <LogOut size={15} /> ออกจากระบบ
          </button>
        </div>
      </div>

      <div>
        {tab === "overview" && (
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 18 }}>ภาพรวมระบบ</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 }}>
              {stats.map((s) => (
                <div key={s.label} className="sfg-card" style={{ padding: 18 }}>
                  <s.icon size={18} style={{ color: "var(--accent)", marginBottom: 10 }} />
                  <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Noto Serif Thai',serif" }}>{s.value}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, fontSize: 13, color: "var(--ink-soft)" }}>
              การแก้ไขข้อมูลทุกส่วนจะถูกบันทึกและแสดงผลให้ผู้ใช้ทั่วไปเห็นทันที
            </div>
          </div>
        )}

        {tab === "teachers" && (
          <GenericAdminTable
            title="อาจารย์"
            items={data.teachers}
            renderTitle={fullName}
            onAdd={addItem("teachers", "t")}
            onUpdate={editItem("teachers")}
            onDelete={deleteItem("teachers")}
            fields={[
              { key: "firstName", label: "ชื่อ", showInList: true },
              { key: "lastName", label: "นามสกุล", showInList: true },
              { key: "title", label: "ตำแหน่ง", showInList: true },
              { key: "departmentId", label: "สาขา", type: "select", options: depOptions, showInList: true },
              { key: "email", label: "อีเมล" },
              { key: "phone", label: "เบอร์โทร" },
              { key: "room", label: "ห้องประจำ", showInList: true },
              { key: "buildingId", label: "อาคาร", type: "select", options: bldOptions },
              { key: "floor", label: "ชั้น", type: "number" },
              { key: "bio", label: "ประวัติ/แนะนำตัว", type: "textarea", wide: true },
              { key: "image", label: "รูปอาจารย์", type: "image", wide: true },
              { key: "video", label: "วิดีโอแนะนำตัว", type: "video", wide: true },
            ]}
          />
        )}

        {tab === "departments" && (
          <GenericAdminTable
            title="สาขา"
            items={data.departments}
            renderTitle={(d) => d.name}
            onAdd={addItem("departments", "dep")}
            onUpdate={editItem("departments")}
            onDelete={deleteItem("departments")}
            fields={[
              { key: "name", label: "ชื่อสาขา (ไทย)", showInList: true },
              { key: "nameEn", label: "ชื่อสาขา (Eng)", showInList: true },
              { key: "description", label: "รายละเอียด", type: "textarea", wide: true },
              { key: "image", label: "รูปสาขา", type: "image", wide: true },
              { key: "video", label: "วิดีโอแนะนำสาขา", type: "video", wide: true },
            ]}
          />
        )}

        {tab === "classrooms" && (
          <GenericAdminTable
            title="ห้องเรียน"
            items={data.classrooms}
            renderTitle={(c) => `ห้อง ${c.number}`}
            onAdd={addItem("classrooms", "c")}
            onUpdate={editItem("classrooms")}
            onDelete={deleteItem("classrooms")}
            fields={[
              { key: "number", label: "เลขห้อง", showInList: true },
              { key: "buildingId", label: "อาคาร", type: "select", options: bldOptions, showInList: true },
              { key: "floor", label: "ชั้น", type: "number", showInList: true },
              { key: "type", label: "ประเภทห้อง", showInList: true },
              { key: "capacity", label: "ความจุ", type: "number" },
              { key: "departmentId", label: "สาขาที่ใช้บ่อย", type: "select", options: depOptions },
              { key: "image", label: "รูปห้องเรียน", type: "image", wide: true },
              { key: "video", label: "วิดีโอห้องเรียน", type: "video", wide: true },
            ]}
          />
        )}

        {tab === "buildings" && (
          <GenericAdminTable
            title="อาคาร"
            items={data.buildings}
            renderTitle={(b) => b.name}
            onAdd={addItem("buildings", "b")}
            onUpdate={editItem("buildings")}
            onDelete={deleteItem("buildings")}
            fields={[
              { key: "name", label: "ชื่ออาคาร", showInList: true },
              { key: "floors", label: "จำนวนชั้น", type: "number", showInList: true },
              { key: "description", label: "รายละเอียด", type: "textarea", wide: true },
              { key: "image", label: "รูปอาคาร", type: "image", wide: true },
            ]}
          />
        )}

        {tab === "places" && (
          <GenericAdminTable
            title="สถานที่"
            items={data.places}
            renderTitle={(p) => p.name}
            onAdd={addItem("places", "p")}
            onUpdate={editItem("places")}
            onDelete={deleteItem("places")}
            fields={[
              { key: "name", label: "ชื่อสถานที่", showInList: true },
              { key: "type", label: "ประเภท", type: "select", options: placeTypeOptions, showInList: true },
              { key: "buildingId", label: "อาคาร", type: "select", options: bldOptions, showInList: true },
              { key: "floor", label: "ชั้น", type: "number" },
              { key: "openTime", label: "เวลาเปิด", placeholder: "07:00" },
              { key: "closeTime", label: "เวลาปิด", placeholder: "17:00" },
              { key: "description", label: "รายละเอียด", type: "textarea", wide: true },
              { key: "image", label: "รูปสถานที่", type: "image", wide: true },
              { key: "video", label: "วิดีโอแนะนำสถานที่", type: "video", wide: true },
            ]}
          />
        )}

        {tab === "schedules" && (
          <GenericAdminTable
            title="ตารางสอน"
            items={data.schedules}
            renderTitle={(s) => s.subject}
            onAdd={addItem("schedules", "s")}
            onUpdate={editItem("schedules")}
            onDelete={deleteItem("schedules")}
            fields={[
              { key: "teacherId", label: "อาจารย์ผู้สอน", type: "select", options: teacherOptions, showInList: true },
              { key: "subject", label: "วิชา", showInList: true },
              { key: "day", label: "วัน", type: "select", options: dayOptions, showInList: true },
              { key: "start", label: "เวลาเริ่ม", placeholder: "09:00" },
              { key: "end", label: "เวลาสิ้นสุด", placeholder: "12:00" },
              { key: "classroomId", label: "ห้องเรียน", type: "select", options: roomOptions, showInList: true },
            ]}
          />
        )}

        {tab === "settings" && (
          <SettingsForm settings={data.settings} onSave={(s) => persist({ ...data, settings: s })} />
        )}
      </div>
    </div>
    </>
  );
}

function SettingsForm({ settings, onSave }) {
  const [form, setForm] = useState(settings);
  useEffect(() => setForm(settings), [settings]);
  const save = (e) => { e.preventDefault(); onSave(form); };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <form onSubmit={save} className="sfg-card" style={{ padding: 22, maxWidth: 520, display: "flex", flexDirection: "column", gap: 12 }}>
      <h3 style={{ fontSize: 17, marginBottom: 4 }}>ตั้งค่าเว็บไซต์</h3>

      <div>
        <label style={{ fontSize: 12, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>โลโก้เว็บไซต์</label>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {form.logoImage ? (
            <img src={form.logoImage} alt="logo" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", border: "1px solid var(--border)" }} />
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--primary)", color: "var(--on-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
              {form.siteTitle}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="sfg-input"
            style={{ padding: 6, fontSize: 12 }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const b64 = await fileToBase64(file);
                setForm((prev) => ({ ...prev, logoImage: b64 }));
              } catch (err) { /* ignore */ }
            }}
          />
          {form.logoImage && (
            <button type="button" onClick={() => setForm({ ...form, logoImage: "" })} className="sfg-btn sfg-btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }}>
              <X size={13} /> ลบโลโก้
            </button>
          )}
        </div>
      </div>

      {[
        ["siteTitle", "ชื่อโปรเจกต์"], ["siteSubtitle", "คำอธิบายสั้น"],
        ["heroHeadline", "ข้อความหลักหน้าแรก"], ["heroSubtext", "คำอธิบายหน้าแรก"],
        ["contactEmail", "อีเมลติดต่อ"], ["contactPhone", "เบอร์โทรติดต่อ"], ["contactAddress", "ที่อยู่"],
      ].map(([key, label]) => (
        <div key={key}>
          <label style={{ fontSize: 12, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>{label}</label>
          <input className="sfg-input" value={form[key] || ""} onChange={set(key)} />
        </div>
      ))}
      <button type="submit" className="sfg-btn sfg-btn-primary" style={{ marginTop: 6, justifyContent: "center" }}><Check size={15} /> บันทึกการตั้งค่า</button>
    </form>
  );
}

/* =========================================================================
   ROOT APP
   ========================================================================= */
export default function App() {
  const { data, status, saving, saveError, persist } = useFacultyData();
  const [page, setPage] = useState({ name: "home", id: null });
  const [query, setQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState("light");
  const [chatFloatOpen, setChatFloatOpen] = useState(false);

  const goto = (name, id = null) => {
    setPage({ name, id });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  };

  const onSearchSubmit = () => goto("search");

  if (status === "loading" || !data) {
    return (
      <div className="sfg-app" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <GlobalStyle />
        <div style={{ textAlign: "center", color: "var(--ink-soft)" }}>
          <Bot size={26} style={{ marginBottom: 10, opacity: 0.6 }} />
          <div>กำลังโหลดข้อมูลคณะ...</div>
        </div>
      </div>
    );
  }

  let content;
  switch (page.name) {
    case "home": content = <HomePage data={data} goto={goto} query={query} setQuery={setQuery} onSearchSubmit={onSearchSubmit} />; break;
    case "departments": content = <DepartmentsPage data={data} goto={goto} />; break;
    case "department-detail": content = <DepartmentDetail data={data} id={page.id} goto={goto} />; break;
    case "teachers": content = <TeachersPage data={data} goto={goto} />; break;
    case "teacher-profile": content = <TeacherProfile data={data} id={page.id} goto={goto} />; break;
    case "classrooms": content = <ClassroomsPage data={data} goto={goto} />; break;
    case "classroom-detail": content = <ClassroomDetail data={data} id={page.id} goto={goto} />; break;
    case "buildings": content = <BuildingsPage data={data} goto={goto} />; break;
    case "building-detail": content = <BuildingDetail data={data} id={page.id} goto={goto} />; break;
    case "places": content = <PlacesPage data={data} goto={goto} />; break;
    case "place-detail": content = <PlaceDetail data={data} id={page.id} goto={goto} />; break;
    case "map": content = <MapPage data={data} focusId={page.id} goto={goto} />; break;
    case "search": content = <SearchPage data={data} query={query} goto={goto} />; break;
    case "contact": content = <ContactPage data={data} />; break;
    case "chatbot": content = (
      <PageShell title="Faculty AI Assistant" subtitle="ผู้ช่วยตอบคำถามข้อมูลภายในคณะ อ้างอิงจากฐานข้อมูลเท่านั้น">
        <ChatbotPanel data={data} embedded goto={goto} />
      </PageShell>
    ); break;
    case "admin-login": content = <AdminLoginPage onLogin={() => setIsAdmin(true)} goto={goto} />; break;
    case "admin-dashboard":
      content = isAdmin
        ? <AdminDashboard data={data} persist={persist} saveError={saveError} onLogout={() => setIsAdmin(false)} goto={goto} />
        : <AdminLoginPage onLogin={() => setIsAdmin(true)} goto={goto} />;
      break;
    default: content = <HomePage data={data} goto={goto} query={query} setQuery={setQuery} onSearchSubmit={onSearchSubmit} />;
  }

  return (
    <div className="sfg-app" data-theme={theme} style={{ minHeight: "100vh" }}>
      <GlobalStyle />
      <Navbar
        page={page.name}
        goto={goto}
        isAdmin={isAdmin}
        onLogout={() => setIsAdmin(false)}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        settings={data.settings}
        query={query}
        setQuery={setQuery}
        onSearchSubmit={onSearchSubmit}
      />

      {content}

      {page.name !== "chatbot" && (
        <button
          onClick={() => setChatFloatOpen((v) => !v)}
          className="sfg-btn sfg-btn-accent"
          style={{ position: "fixed", right: 20, bottom: 20, borderRadius: 999, padding: "14px 18px", boxShadow: "var(--shadow)", zIndex: 50 }}
        >
          <Bot size={18} /> {chatFloatOpen ? "ปิดแชท" : "AI Assistant"}
        </button>
      )}

      {chatFloatOpen && page.name !== "chatbot" && (
        <div style={{ position: "fixed", right: 20, bottom: 82, width: 340, maxWidth: "calc(100vw - 40px)", zIndex: 50 }}>
          <ChatbotPanel data={data} onClose={() => setChatFloatOpen(false)} goto={goto} />
        </div>
      )}

      <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface-2)", marginTop: 40 }}>
        <div className="sfg-footer-grid" style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 20px 24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              {data.settings.logoImage ? (
                <img src={data.settings.logoImage} alt="logo" style={{ width: 34, height: 34, borderRadius: 9, objectFit: "cover" }} />
              ) : (
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--primary)", color: "var(--on-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{data.settings.siteTitle}</div>
              )}
              <div style={{ fontFamily: "'Noto Serif Thai',serif", fontWeight: 700 }}>{data.settings.siteTitle}</div>
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: 12.5, lineHeight: 1.7, maxWidth: 260 }}>
              {data.settings.siteSubtitle} — โปรเจกต์สาธิตสำหรับส่งอาจารย์ ข้อมูลทั้งหมดในระบบเป็นข้อมูลสมมติ
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>เมนูลัด</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[["departments", "สาขา"], ["teachers", "อาจารย์"], ["classrooms", "ห้องเรียน"], ["buildings", "อาคาร"]].map(([k, l]) => (
                <button key={k} onClick={() => goto(k)} style={{ background: "none", border: "none", textAlign: "left", padding: 0, color: "var(--ink-soft)", fontSize: 12.5, cursor: "pointer" }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>บริการ</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {[["places", "สถานที่สำคัญ"], ["map", "แผนผัง"], ["chatbot", "AI Assistant"], ["contact", "ติดต่อคณะ"]].map(([k, l]) => (
                <button key={k} onClick={() => goto(k)} style={{ background: "none", border: "none", textAlign: "left", padding: 0, color: "var(--ink-soft)", fontSize: 12.5, cursor: "pointer" }}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>ติดต่อ</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12.5, color: "var(--ink-soft)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={13} /> {data.settings.contactEmail}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={13} /> {data.settings.contactPhone}</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border)", padding: "14px 20px", textAlign: "center", color: "var(--ink-soft)", fontSize: 11.5 }}>
          © {new Date().getFullYear()} {data.settings.siteTitle} · {data.settings.siteSubtitle}
          {saving && <span style={{ marginLeft: 8 }}>· กำลังบันทึก...</span>}
        </div>
      </footer>
    </div>
  );
}
