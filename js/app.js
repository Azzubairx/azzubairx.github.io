// ============================================================
// العقل المدبر - App.js (Lenis, GSAP, i18n, Theme)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. إعداد التمرير الناعم (Lenis - Apple Style Smooth Scroll)
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // 2. إعداد الحركات (GSAP ScrollTrigger)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { y: 40, opacity: 0, filter: "blur(10px)" }, 
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });
  }

  // 3. نظام الترجمة الشامل (i18n Dictionary) لجميع الصفحات
  const translations = {
    ar: {
      // عناصر مشتركة
      nav_home: "الرئيسية", nav_about: "مَن أنا", nav_services: "الخدمات", nav_contact: "التواصل والدَّفع",
      footer_copy: "© 2026 الزبير إبراهيم. جميع الحقوق محفوظة.",
      visits_label: "الزيارات:",
      btn_services: "<i class='fas fa-layer-group'></i> استعرض خدماتي",
      btn_quote: "<i class='fas fa-paper-plane'></i> اطلب تسعيرة",
      btn_contact: "<i class='fas fa-envelope'></i> انتقل إلى صفحة التواصل",
      
      // صفحة من أنا
      about_title: "مَن أنا", about_desc: "نبذة شاملة عن مسيرتي الأكاديمية وخبراتي المهنية في مجالَيْ اللغة والتقنية.",
      about_name: "الزُّبَير إبْرَاهِيم",
      about_quote: '"درست اللغة الإنجليزية لأن اللغة في نظري ليست مجرد أداة تواصل .. بل هي نظام تفكير. وحين بدأت أرصد كيف تُترجم نماذج الذكاء الاصطناعي النصوص العربية وتُجرِّدها من معناها الحقيقي، اتضح لي أن الإشكالية ليست تقنية في جوهرها؛ بل لغوية وثقافية بامتياز."',
      about_p1: "حاصل على بكالوريوس آداب في اللغة الإنجليزية بمرتبة الشرف (91.23%) من جامعة طبرق، بتخصص في اللغويات وعلم الصوتيات ونظريات الترجمة.",
      about_p2: "متاح للعمل عن بُعد، بصيغة مستقلة، تعاقدية، أو بدوام كامل.",
      skills_title: "الكفاءات الأساسية",
      edu_title: "المسار الأكاديمي والمؤهلات", exp_title: "الخبرة المهنية",
      
      // صفحة الخدمات
      srv_title: "الخدمات التي أقدِّمها", srv_desc: "مجموعة متكاملة من الحلول اللغوية والتقنية المصممة بدقة، مصنَّفة حسب تخصصك لتسهيل وصولك إلى ماتحتاجه بالضبط.",
      cat_lang: "الترجمة والخدمات اللغوية", cat_ai: "الذكاء الاصطناعي والتقنية", cat_acad: "الأكاديميا والمستندات", cat_data: "البيانات والإدارة",
      most_req: "الأكثر طلباً <i class='fas fa-fire'></i>",
      terms_title: "شروط الخدمة وضمان الجودة", terms_desc: "مبادئ العمل التي أُقرّها لضمان حقوق الطرفين وتقديم أفضل تجربة مهنية ممكنة.",
      cta_srv_title: "وجدت الخدمة المناسبة لك؟", cta_srv_desc: "تواصل معي الآن لطلب تسعيرة أو للاستفسار عن تفاصيل مشروعك.",
      
      // صفحة التواصل
      cont_title: "التواصل والدفع", cont_desc: "مستعد لبدء مشروعك؟ أرسل التفاصيل أدناه وسأرد عليك في أقرب وقت لتقييم نطاق العمل والشروع فيه فورًا.",
      cont_form_title: "أرسل تفاصيل مشروعك",
      label_name: "الاسم", label_email: "البريد الإلكتروني", label_msg: "وصف مختصر للمشروع",
      btn_submit: "إرسال الطلب",
      pay_title: "طرائق الدفع المتاحة", pay_desc: "بعد الاتفاق على تفاصيل المشروع، يمكن تسديد الدفعات بأمان عبر إحدى الوسائل التالية:"
    },
    en: {
      // Shared Elements
      nav_home: "Home", nav_about: "About Me", nav_services: "Services", nav_contact: "Contact & Pay",
      footer_copy: "© 2026 Azzubair Ibrahim. All rights reserved.",
      visits_label: "Visits:",
      btn_services: "<i class='fas fa-layer-group'></i> Explore Services",
      btn_quote: "<i class='fas fa-paper-plane'></i> Request a Quote",
      btn_contact: "<i class='fas fa-envelope'></i> Go to Contact Page",
      
      // About Page
      about_title: "About Me", about_desc: "A comprehensive overview of my academic journey and professional experience in language and tech.",
      about_name: "Azzubair Ibrahim",
      about_quote: '"I studied English because language is not just a communication tool.. it is a system of thought. When I observed how AI translates Arabic texts stripping them of their true meaning, I realized the issue is not technical, but profoundly linguistic and cultural."',
      about_p1: "BA in English with Honors (91.23%) from University of Tobruk, specializing in Linguistics, Phonetics, and Translation Theories.",
      about_p2: "Available for remote work: freelance, contract, or full-time.",
      skills_title: "Core Competencies",
      edu_title: "Academic Background", exp_title: "Professional Experience",
      
      // Services Page
      srv_title: "My Services", srv_desc: "A comprehensive suite of precisely tailored linguistic and technical solutions, categorized for your convenience.",
      cat_lang: "Translation & Linguistics", cat_ai: "AI & Technology", cat_acad: "Academia & Documents", cat_data: "Data & Management",
      most_req: "High Demand <i class='fas fa-fire'></i>",
      terms_title: "Terms & Quality Assurance", terms_desc: "Work principles established to ensure the rights of both parties and deliver the best professional experience.",
      cta_srv_title: "Found the right service?", cta_srv_desc: "Contact me now to request a quote or inquire about your project details.",
      
      // Contact Page
      cont_title: "Contact & Payment", cont_desc: "Ready to start your project? Send the details below and I will reply shortly to evaluate the scope and begin immediately.",
      cont_form_title: "Send Project Details",
      label_name: "Name", label_email: "Email Address", label_msg: "Brief Project Description",
      btn_submit: "Submit Request",
      pay_title: "Available Payment Methods", pay_desc: "Upon agreement on project details, payments can be securely settled via the following:"
    }
  };

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    let currentLang = localStorage.getItem("lang") || "ar";

    function setLanguage(lang) {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      langBtn.innerText = lang === "ar" ? "EN" : "عربي";
      
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
      });
      localStorage.setItem("lang", lang);
      setTimeout(() => { if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); }, 100);
    }

    setLanguage(currentLang);
    langBtn.addEventListener("click", () => {
      currentLang = currentLang === "ar" ? "en" : "ar";
      setLanguage(currentLang);
    });
  }

  // 4. الوضع الليلي/النهاري (Theme Toggle)
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    const themeIcon = themeBtn.querySelector("i");
    function updateThemeIcon(theme) { themeIcon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon"; }
    themeBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
    updateThemeIcon(document.documentElement.getAttribute("data-theme"));
  }

  // 5. عداد الزيارات المباشر (GoatCounter API)
  async function initGoatCounter() {
    const counterEl = document.getElementById('visit-count');
    if (!counterEl) return;
    try {
      const response = await fetch('https://azzubairx.goatcounter.com/counter/TOTAL.json');
      const data = await response.json();
      const endCount = parseInt(data.count.replace(/,/g, ''), 10);
      let start = Math.max(0, endCount - 30);
      const timer = setInterval(() => {
        start += 1;
        counterEl.innerText = start.toLocaleString('en-US');
        if (start >= endCount) { counterEl.innerText = data.count; clearInterval(timer); }
      }, 30);
    } catch (err) { counterEl.innerText = '∞'; }
  }
  initGoatCounter();
});
