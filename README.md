# 20+20+20+7 – Smart Faculty Guide

เว็บไซต์สารสนเทศอัจฉริยะสำหรับแนะนำข้อมูลภายในคณะ (โปรเจกต์สาธิต ข้อมูลทั้งหมดเป็นข้อมูลสมมติ)

## วิธีใช้งาน (รันในเครื่องตัวเอง)

ต้องติดตั้ง [Node.js](https://nodejs.org) เวอร์ชัน 18 ขึ้นไปก่อน

```bash
npm install
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ไปที่ลิงก์ที่ขึ้นมา (ปกติคือ http://localhost:5173)

---

## 🚀 Deploy ขึ้น GitHub Pages ฟรี (แนะนำ)

โปรเจกต์นี้ตั้งค่าให้ deploy อัตโนมัติผ่าน **GitHub Actions** ไว้ให้แล้ว (ไฟล์ `.github/workflows/deploy.yml`)
ทำตามขั้นตอนนี้ครั้งเดียว เว็บจะขึ้นออนไลน์จริงและอัปเดตอัตโนมัติทุกครั้งที่ push โค้ดใหม่

### ขั้นตอน

1. **สร้าง Repository ใหม่บน GitHub**
   ไปที่ [github.com/new](https://github.com/new) → ตั้งชื่อ repo เช่น `smart-faculty-guide` → เลือก Public → กด Create repository (ไม่ต้องติ๊ก "Add a README")

2. **อัปโหลดโค้ดขึ้น repo** (รันในโฟลเดอร์โปรเจกต์นี้)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<ชื่อผู้ใช้ของคุณ>/smart-faculty-guide.git
   git push -u origin main
   ```

3. **เปิดใช้งาน GitHub Pages**
   ไปที่หน้า repo บน GitHub → **Settings** → เมนูซ้าย **Pages** → ในหัวข้อ "Build and deployment" → **Source** เลือก **"GitHub Actions"**

4. **รอสักครู่**
   ไปที่แท็บ **Actions** ของ repo จะเห็น workflow "Deploy to GitHub Pages" กำลังรันอยู่ (ใช้เวลาประมาณ 1-2 นาที) พอเสร็จแล้วเว็บไซต์จะพร้อมใช้งานที่:
   ```
   https://<ชื่อผู้ใช้ของคุณ>.github.io/smart-faculty-guide/
   ```

5. **อัปเดตเว็บในอนาคต**
   แค่แก้โค้ดแล้ว `git add . && git commit -m "update" && git push` ระบบจะ build และ deploy ให้อัตโนมัติทุกครั้ง ไม่ต้องทำซ้ำขั้นตอนข้างบน

> ถ้าตั้งชื่อ repo ไม่ใช่ `smart-faculty-guide` ก็ใช้ได้เหมือนกัน แค่ลิงก์เว็บจะเปลี่ยนตามชื่อ repo ที่ตั้ง — ไม่ต้องแก้โค้ดใด ๆ เพิ่ม เพราะตั้ง `base: "./"` ไว้ใน `vite.config.js` ให้รองรับอัตโนมัติแล้ว

### Deploy ผ่าน Vercel / Netlify (ทางเลือกอื่น)

ถ้าไม่อยากใช้ GitHub Pages ก็อัปโหลดโค้ดขึ้น GitHub ตามขั้นตอน 1-2 ด้านบน แล้วไปที่ [vercel.com](https://vercel.com) หรือ [netlify.com](https://netlify.com) เชื่อมกับ repo นั้น ระบบจะ build (`npm run build`) และ deploy ให้อัตโนมัติเช่นกัน

---

## บัญชี Admin

ตั้งค่าเริ่มต้นไว้ที่ด้านบนของไฟล์ `src/App.jsx`:

```js
const ADMIN_USER = "admin";
const ADMIN_PASS = "faculty2026";
```

**ก่อนนำไปใช้งานจริง (หรือก่อน deploy ขึ้นสาธารณะ) ควรเปลี่ยนค่าทั้งสองนี้เป็นของตัวเอง** เพราะเว็บที่ deploy แล้วใครก็เข้าดูโค้ดหน้าเว็บได้ ไม่ควรเก็บรหัสผ่านจริงไว้ในนี้ถ้าเป็นข้อมูลสำคัญ

## การเก็บข้อมูล — ตั้งค่าให้ถาวรและใช้งานร่วมกันได้จริง (Supabase)

โปรเจกต์นี้เชื่อมต่อกับ **Supabase** (ฐานข้อมูลออนไลน์ฟรี) ไว้ให้พร้อมแล้ว — แค่กรอก URL/Key ของคุณเอง 2 บรรทัดก็ใช้งานได้ทันที

**ถ้ายังไม่ได้ตั้งค่า:** เว็บจะทำงานปกติทุกอย่าง แต่ข้อมูลจะเก็บไว้ใน localStorage ของเบราว์เซอร์เท่านั้น (เหมือนเดิม — ใช้ demo คนเดียวได้ แต่คนอื่นเปิดจากเครื่องอื่นจะไม่เห็นข้อมูลที่แก้)

**ถ้าตั้งค่าแล้ว:** ข้อมูลทั้งหมด (อาจารย์ สาขา ห้องเรียน รูปภาพ ฯลฯ) จะเก็บถาวรบนเซิร์ฟเวอร์ ทุกคนที่เข้าเว็บจากที่ไหนก็เห็นข้อมูลเดียวกันแบบเรียลไทม์ ไม่มีวันหายแม้ล้างเบราว์เซอร์

### ขั้นตอนตั้งค่า (ทำครั้งเดียว)

1. **สมัครและสร้างโปรเจกต์**
   ไปที่ [supabase.com](https://supabase.com) → สมัครด้วย GitHub (ฟรี) → กด "New Project" → ตั้งชื่อ + ตั้งรหัสผ่านฐานข้อมูล (เก็บไว้ดี ๆ) → เลือก Region ใกล้ไทย (Singapore) → รอสร้างเสร็จ

2. **สร้างตารางเก็บข้อมูล**
   ในโปรเจกต์ → เมนูซ้าย **SQL Editor** → New query → เปิดไฟล์ `supabase_schema.sql` ที่แนบมาในโปรเจกต์นี้ → คัดลอกทั้งหมดมาวาง → กด **Run**

3. **คัดลอก URL และ Key**
   เมนูซ้าย **Settings → API** → คัดลอก 2 ค่านี้:
   - **Project URL**
   - **anon public** key (ห้ามใช้ `service_role` เด็ดขาด)

4. **ใส่ค่าในโค้ด**
   เปิดไฟล์ `src/supabaseClient.js` แก้ 2 บรรทัดนี้:
   ```js
   const SUPABASE_URL = "https://xxxxxxxxxxxx.supabase.co"; // Project URL ของคุณ
   const SUPABASE_ANON_KEY = "eyJhbGciOi..."; // anon public key ของคุณ
   ```

5. **Commit ขึ้น GitHub** — ระบบ Actions จะ build และ deploy ให้อัตโนมัติเหมือนเดิม

หลังตั้งค่าเสร็จ เข้า Admin → Dashboard จะเห็นแถบสีเขียว **"เชื่อมต่อฐานข้อมูล Supabase แล้ว"** ที่หน้า Dashboard ยืนยันว่าใช้งานได้จริงแล้ว

Supabase แผนฟรีให้พื้นที่ฐานข้อมูล 500MB ซึ่งเพียงพอสำหรับข้อมูล+รูปภาพของเว็บนี้หลายพันรายการ

## โครงสร้างไฟล์

```
smart-faculty-guide/
├── .github/workflows/deploy.yml   # ตั้งค่า deploy อัตโนมัติขึ้น GitHub Pages
├── supabase_schema.sql            # SQL สร้างตารางฐานข้อมูล (รันครั้งเดียวใน Supabase)
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx            # จุดเริ่มต้นของแอป
    ├── supabaseClient.js   # ตั้งค่า URL/Key ของ Supabase ตรงนี้
    └── App.jsx             # โค้ดเว็บไซต์ทั้งหมด (ทุกหน้า + Admin + AI Chatbot)
```
