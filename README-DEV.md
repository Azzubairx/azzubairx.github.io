# 🌐 موقع عزوبير حسين — دليل المطوّر

## هيكل المشروع

```
azzubair-site/
│
├── index.html          ← صفحة الموقع الكاملة (HTML)
├── style.css           ← كافة تنسيقات الموقع (CSS)
├── script.js           ← كافة وظائف الموقع (JavaScript)
│
└── assets/
    ├── icons/          ← أيقونات مخصصة (اختياري)
    └── fonts/          ← خطوط محلية (اختياري)
```

---

## شرح كل ملف وكيفية التعديل

### 📄 index.html — هيكل الموقع

هذا الملف يحتوي على كامل محتوى الموقع مقسّماً إلى أقسام واضحة.

**كيفية التعديل:**

| ما تريد تعديله | ابحث عن هذا التعليق في الملف |
|---|---|
| المعلومات الشخصية (اسم، بريد، هاتف) | `<!-- CONTACT -->` أو ابحث عن `2u6air@proton.me` |
| إضافة خدمة جديدة | ابحث عن التعليق `لإضافة خدمة جديدة: انسخ كتلة` وانسخ الـ div |
| تعديل الإحصائيات (الأرقام المتحركة) | ابحث عن `data-target` وغيّر الأرقام |
| تعديل قائمة التنقل | ابحث عن `<ul class="nav__list">` |
| تعديل طرق الدفع | ابحث عن `<!-- PAYMENT -->` |
| تعديل الشروط والأحكام | ابحث عن `<!-- SECTION 5 — TERMS -->` |

---

### 🎨 style.css — تنسيق الموقع

**أهم ما يمكن تعديله بسهولة:**

```css
/* السطور 1-50 تقريباً — المتغيرات الرئيسية */
:root {
  --clr-primary: #1a56db;   /* ← غيّر هذا لتغيير اللون الأساسي للموقع كله */
  --clr-accent:  #f59e0b;   /* ← اللون الذهبي للعناصر المميزة */
  --font-heading: 'Tajawal'; /* ← خط العناوين */
  --font-body:    'Cairo';   /* ← خط النصوص */
}
```

**لتغيير لون الموقع كله:** غيّر فقط `--clr-primary` في أعلى style.css

**لتغيير الخط العربي:** غيّر `--font-heading` و `--font-body` ثم حدّث رابط Google Fonts في index.html

**الخطوط المتاحة من Google للعربية:**
- `Tajawal` (مستخدم حالياً للعناوين)
- `Cairo` (مستخدم حالياً للجسم)
- `Noto Sans Arabic`
- `Almarai`
- `IBM Plex Sans Arabic`

---

### ⚙️ script.js — وظائف الموقع

الوظائف الرئيسية موثقة بتعليقات واضحة:

| الوظيفة | الموقع في الملف | كيف تعدّلها |
|---|---|---|
| سرعة عداد الأرقام | السطر ~38: `const DURATION = 2000` | غيّر الرقم (بالمللي ثانية) |
| إزاحة قائمة التنقل | السطر ~11: `const OFFSET = 90` | غيّر بحسب ارتفاع الهيدر |
| إرسال نموذج الاتصال | ابحث عن `handleFormSubmit` | أضف كود Formspree أو emailjs |

**لتفعيل نموذج الاتصال الحقيقي (مجاناً):**
1. سجّل على [formspree.io](https://formspree.io)
2. أنشئ نموذجاً وانسخ الـ ID
3. في script.js، ابحث عن `مثال مع Formspree` وأزل التعليق

---

## نشر الموقع على GitHub Pages

```bash
# 1. أنشئ مستودعاً باسم: USERNAME.github.io
# 2. ارفع الملفات الثلاثة:
git init
git add index.html style.css script.js
git commit -m "Initial site"
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
# 3. الموقع سيكون متاحاً على: https://USERNAME.github.io
```

---

## الإضافات المستخدمة (CDN — لا تحتاج تحميل)

| المكتبة | الغرض | المصدر |
|---|---|---|
| Google Fonts (Tajawal + Cairo) | الخطوط العربية | fonts.googleapis.com |
| Font Awesome 6.5 | الأيقونات | cdnjs.cloudflare.com |

---

*آخر تحديث: مايو 2026*
