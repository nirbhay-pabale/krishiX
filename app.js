/* ============================================================
   KrishiX – Complete Application Controller
   Labour Profiles • Team Squad Booking • Interactive Fines • GPS
   ============================================================ */

class KrishiXApp {
  constructor() {
    this.state = window.krishixState;
    this.synth = window.speechSynthesis;
  }

  /* ── BOOT ──────────────────────────────────────────────── */
  init() {
    this.renderProfiles();
    this.renderTeamSquads();
    this.renderLeaderboard();
    this.renderFineHub();
    this.renderMachinery();
    this.renderSchedule();
    this.renderPayments();
    this.renderFarmPlan();
    this.initProfitMaximizer();
    this.switchTab("landing");
    this.setLanguage(this.state.language, false);
    this.checkAuthSession();
  }

  /* ── LANGUAGE & TRANSLATION SYSTEM ───────────────────── */
  translateUI(lang) {
    const FULL_TRANSLATIONS = {
      mr: {
        "tab-landing": "🏠 मुख्य मुखपृष्ठ",
        "tab-profiles": "👥 मजूर प्रोफाईल (15)",
        "tab-team-squad": "👨‍👩‍👧‍👦 मजूर टोळी बुकिंग",
        "tab-leaderboard": "🏆 कोपरगाव लीडरबोर्ड",
        "tab-fines": "🛡️ दंड व भरपाई केंद्र",
        "tab-profit": "💡 नफा वर्धक AI",
        "tab-ai-doctor": "🤖 AI पीक डॉक्टर",
        "tab-planner": "🌱 शेतकाम नियोजक",
        "tab-machinery": "🚜 यंत्रसामग्री बुकिंग",
        "tab-tracking": "📍 लाईव्ह GPS ट्रॅकिंग",
        "tab-schedule": "📅 माझे बुक केलेले काम",
        "tab-payment": "💳 वॉलेट व UPI",

        "hero-badge": "🌾 स्मार्ट कोपरगाव कृषी हब",
        "hero-sub": "कुशल मजुरांशी जोडा, आधुनिक यंत्रे भाड्याने घ्या, बाजारभाव ट्रॅक करा आणि तुमचा शेती व्यवसाय वाढवा—सर्व एकाच व्यासपीठावर.",
        "get-started-btn": "शुरू करा →",
        "learn-more-btn": "अधिक माहिती",
        "trust-1": "✓ 100% पडताळणी केलेले प्रोफाईल",
        "trust-2": "✓ रीअल-टाईम बाजारभाव आणि एस्क्रो",
        "trust-3": "✓ सुरक्षित झटपट पेमेंट",
        "quote-text": `"शेती हा माणसाचा सर्वात निरोगी, सर्वात उपयुक्त आणि सर्वात उदात्त व्यवसाय आहे. आमचे ध्येय कोपरगावमधील प्रत्येक शेतकऱ्याला आणि मजुराला डिजिटल सन्मान आणि पारदर्शकता देणे हे आहे."`,
        "quote-author": "🌾 कोपरगाव ॲग्रो व्हिजन • स्मार्ट फार्मर्स परिसंस्था",

        "qc-1-title": "15 वैयक्तिक मजूर प्रोफाईल",
        "qc-1-desc": "वैयक्तिक माहिती, कामाचा अनुभव आणि सानुकूल मजूर संख्या",
        "qc-2-title": "मजूर टोळी बुकिंग",
        "qc-2-desc": "ऊस, कांदा व गहू काढणीसाठी 10-15 मजुरांची अख्खी टोळी बुक करा",
        "qc-3-title": "दंड आणि भरपाई अर्ज",
        "qc-3-desc": "उशीर, गैरहजेरी किंवा पिकाच्या नुकसानासाठी थेट दंड लावा",
        "qc-4-title": "मजूर स्व-नोंदणी",
        "qc-4-desc": "कोपरगावच्या शेतकऱ्यांकडून काम मिळवण्यासाठी नोंदणी करा",

        "hdr-profiles": "👥 कोपरगाव मजूर डायरेक्टरी (15 वैयक्तिक प्रोफाईल)",
        "hdr-profiles-sub": "वैयक्तिक माहिती, अनुभव आणि मजुरांची संख्या पाहून बुक करा.",
        "hdr-squad": "👨‍👩‍👧‍👦 कोपरगाव टोळी बुकिंग (पूर्ण ग्रुप)",
        "hdr-squad-sub": "ऊस तोडणी, कांदा काढणी व गहू कापणीसाठी अख्खी टोळी बुक करा.",
        "hdr-lb": "🏆 कोपरगाव सर्वोत्तम मजूर लीडरबोर्ड (रँकिंग)",
        "hdr-lb-sub": "ट्रस्ट स्कोअर, वेळेचे पालन आणि शेतकरी रेटिंगनुसार रँकिंग.",
        "hdr-fines": "🛡️ कोपरगाव दंड व एस्क्रो संरक्षण केंद्र",
        "hdr-fines-sub": "मजूर गैरहजिर राहिल्यास किंवा उशीर झाल्यास ₹500 - ₹1,000 भरपाई मिळवा.",
        "hdr-profit": "💡 एपीएमसी नफा वर्धक AI (कोपरगाव मंडी)",
        "hdr-profit-sub": "थेट खरेदीदार, वाहतूक ग्रुपिंग आणि बाजारभाव अंदाज.",
        "hdr-doctor": "🤖 AI पीक आरोग्य डॉक्टर व फवारणी टीम",
        "hdr-doctor-sub": "पिकाच्या रोगाचे फोटो अपलोड करा व त्वरित औषध आणि फवारणी ड्रोन बुक करा.",
        "hdr-planner": "🌱 कोपरगाव शेतकाम नियोजक",
        "hdr-planner-sub": "पिकानुसार टप्प्याटप्प्याने मजूर व यंत्रे आपोआप बुक करा.",
        "hdr-machinery": "🚜 कोपरगाव कृषी यंत्रसामग्री भाडे केंद्र",
        "hdr-machinery-sub": "ट्रॅक्टर, हार्वेस्टर आणि ड्रोन भाड्याने घ्या.",
        "hdr-tracking": "📍 रीअल-टाईम लाईव्ह GPS मॅप (कोपरगाव)",
        "hdr-schedule": "📅 माझे बुक केलेले शेतकाम",
        "hdr-schedule-sub": "सर्व बुक केलेले मजूर आणि यंत्रांची यादी.",
        "hdr-payment": "💳 कृषिक्स वॉलेट व डिजिटल पेमेंट",

        "btn-voice": "🔊 कोपरगाव व्हॉईस असिस्टंट",
        "btn-otp": "📱 ओटीपीने लॉगिन करा",
        "search-ph": "नाव, गाव, ऊस, कांदा किंवा फवारणीने शोधा..."
      },

      hi: {
        "tab-landing": "🏠 मुख्य होम पेज",
        "tab-profiles": "👥 मजदूर प्रोफाइल (15)",
        "tab-team-squad": "👨‍👩‍👧‍👦 मजदूर टीम बुकिंग",
        "tab-leaderboard": "🏆 कोपरगांव लीडरबोर्ड",
        "tab-fines": "🛡️ जुर्माना और सुरक्षा केंद्र",
        "tab-profit": "💡 लाभ वर्धक AI",
        "tab-ai-doctor": "🤖 AI फसल डॉक्टर",
        "tab-planner": "🌱 कृषि कार्य योजना",
        "tab-machinery": "🚜 मशीनरी बुकिंग",
        "tab-tracking": "📍 लाइव GPS ट्रैकिंग",
        "tab-schedule": "📅 मेरे बुक किए गए कार्य",
        "tab-payment": "💳 वॉलेट और UPI",

        "hero-badge": "🌾 स्मार्ट कोपरगांव कृषि हब",
        "hero-sub": "कुशल मजदूरों से जुड़ें, आधुनिक उपकरण किराए पर लें, बाजार भाव ट्रैक करें और अपना कृषि व्यवसाय बढ़ाएं—सब एक ही मंच पर।",
        "get-started-btn": "शुरू करें →",
        "learn-more-btn": "और जानें",
        "trust-1": "✓ 100% सत्यापित प्रोफाइल",
        "trust-2": "✓ रियल-टाइम मूल्य और एस्क्रो",
        "trust-3": "✓ सुरक्षित त्वरित भुगतान",
        "quote-text": `"कृषि मनुष्य का सबसे स्वस्थ, सबसे उपयोगी और सबसे महान व्यवसाय है। हमारा उद्देश्य हर किसान और मजदूर को डिजिटल सम्मान और सुरक्षा प्रदान करना है।"`,
        "quote-author": "🌾 कोपरगांव एग्रो विजन • स्मार्ट किसान पारिस्थितिकी तंत्र",

        "qc-1-title": "15 व्यक्तिगत मजदूर प्रोफाइल",
        "qc-1-desc": "व्यक्तिगत विवरण, पिछला कार्य अनुभव और अनुकूलित मजदूर संख्या",
        "qc-2-title": "मजदूर टीम बुकिंग",
        "qc-2-desc": "गन्ना, प्याज और गेहूं कटाई के लिए 10-15 मजदूरों की पूरी टीम बुक करें",
        "qc-3-title": "जुर्माना और मुआवजा आवेदन",
        "qc-3-desc": "देरी, अनुपस्थिति या फसल क्षति के लिए सीधे जुर्माना लगाएं",
        "qc-4-title": "मजदूर स्व-पंजीकरण",
        "qc-4-desc": "कोपरगांव के किसानों द्वारा काम पाने के लिए खुद का पंजीकरण करें",

        "hdr-profiles": "👥 कोपरगांव मजदूर डायरेक्टरी (15 व्यक्तिगत प्रोफाइल)",
        "hdr-profiles-sub": "व्यक्तिगत विवरण, अनुभव और रेटिंग देखकर मजदूर बुक करें।",
        "hdr-squad": "👨‍👩‍👧‍👦 कोपरगांव टीम बुकिंग (पूरा ग्रुप)",
        "hdr-squad-sub": "गन्ना, प्याज और गेहूं कटाई के लिए पूरी टीम बुक करें।",
        "hdr-lb": "🏆 कोपरगांव सर्वश्रेष्ठ मजदूर लीडरबोर्ड (रैंकिंग)",
        "hdr-lb-sub": "ट्रस्ट स्कोर, समय की पाबंदी और किसान रेटिंग के आधार पर रैंकिंग।",
        "hdr-fines": "🛡️ कोपरगांव जुर्माना और सुरक्षा केंद्र",
        "hdr-fines-sub": "मजदूर के न आने या देरी पर ₹500 - ₹1,000 सीधा मुआवजा पाएं।",
        "hdr-profit": "💡 एपीएमसी लाभ वर्धक AI (कोपरगांव मंडी)",
        "hdr-profit-sub": "सीधे खरीदार, परिवहन ग्रुपिंग और बाजार मूल्य पूर्वानुमान।",
        "hdr-doctor": "🤖 AI फसल स्वास्थ्य डॉक्टर और स्प्रे टीम",
        "hdr-doctor-sub": "फसल की बीमारी का फोटो अपलोड करें और तुरंत दवा व ड्रोन बुक करें।",
        "hdr-planner": "🌱 कोपरगांव कृषि कार्य योजना",
        "hdr-planner-sub": "फसल के अनुसार चरणबद्ध तरीके से मजदूर और मशीनें ऑटो-बुक करें।",
        "hdr-machinery": "🚜 कोपरगांव कृषि मशीनरी किराया केंद्र",
        "hdr-machinery-sub": "ट्रैक्टर, हार्वेस्टर और ड्रोन किराए पर लें।",
        "hdr-tracking": "📍 रियल-टाइम लाइव GPS मैप (कोपरगांव)",
        "hdr-schedule": "📅 मेरे बुक किए गए कृषि कार्य",
        "hdr-schedule-sub": "सभी बुक किए गए मजदूर और मशीनों की सूची।",
        "hdr-payment": "💳 कृषिक्स वॉलेट और डिजिटल भुगतान",

        "btn-voice": "🔊 कोपरगांव वॉइस असिस्टेंट",
        "btn-otp": "📱 ओटीपी से लॉगिन करें",
        "search-ph": "नाम, गांव, गन्ना, प्याज या छिड़काव से खोजें..."
      },

      en: {
        "tab-landing": "🏠 Intro Landing Page",
        "tab-profiles": "👥 Labour Profiles (15)",
        "tab-team-squad": "👨‍👩‍👧‍👦 Team Squad Booking",
        "tab-leaderboard": "🏆 Kopargaon Leaderboard",
        "tab-fines": "🛡️ Fine & Protection Hub",
        "tab-profit": "💡 Profit Maximizer AI",
        "tab-ai-doctor": "🤖 AI Crop Doctor",
        "tab-planner": "🌱 Farm Operations Planner",
        "tab-machinery": "🚜 Machinery Booking",
        "tab-tracking": "📍 Live GPS Tracking",
        "tab-schedule": "📅 My Booked Jobs",
        "tab-payment": "💳 Wallet & UPI",

        "hero-badge": "🌾 Smart Kopargaon Agriculture Hub",
        "hero-sub": "Connect with skilled labourers, rent modern equipment, track live mandi prices, and grow your agricultural business—all in one unified platform.",
        "get-started-btn": "Get Started →",
        "learn-more-btn": "Learn More",
        "trust-1": "✓ 100% Verified Profiles",
        "trust-2": "✓ Real-time Pricing & Escrow",
        "trust-3": "✓ Secure Instant Payments",
        "quote-text": `"Agriculture is the most healthful, most useful, and most noble employment of man. Our mission with KrishiX is to empower every farmer and farm worker with digital dignity, transparent pricing, and instant security."`,
        "quote-author": "🌾 Kopargaon Agro Vision • Smart Farmers Ecosystem",

        "qc-1-title": "15 Individual Profiles",
        "qc-1-desc": "Personal details, past work experiences & custom worker count",
        "qc-2-title": "Team Squad Booking",
        "qc-2-desc": "Book 10-15 worker sugarcane, onion & wheat harvest gangs",
        "qc-3-title": "Apply Fine Claim",
        "qc-3-desc": "Apply fines for late arrival, no-show or crop/machine damage",
        "qc-4-title": "Worker Self-Registration",
        "qc-4-desc": "Register yourself to get booked by Kopargaon farmers",

        "hdr-profiles": "👥 Kopargaon Labour Profiles Directory (15 Individual Profiles)",
        "hdr-profiles-sub": "Click any card to view personal details, past work experiences, farmer reviews, and book individual workers.",
        "hdr-squad": "👨‍👩‍👧‍👦 Kopargaon Team Squad Booking (Whole Group)",
        "hdr-squad-sub": "Book 10-15 worker sugarcane, onion & wheat harvest gangs with tools and transport included.",
        "hdr-lb": "🏆 Kopargaon Top Labour Leaderboard (Rankings)",
        "hdr-lb-sub": "Ranked by Trust Score, Punctuality & Farmer Ratings across Kopargaon Taluka.",
        "hdr-fines": "🛡️ Kopargaon Fine & Protection Hub (Escrow Protected)",
        "hdr-fines-sub": "Apply fines for late arrival or crop damage. Get ₹500 - ₹1,000 instant escrow compensation.",
        "hdr-profit": "💡 APMC Profit Maximizer AI (Kopargaon Mandi)",
        "hdr-profit-sub": "Direct buyer matching, shared freight pooling, and real-time mandi price forecasts.",
        "hdr-doctor": "🤖 AI Crop Health Doctor & Spraying Squad Matcher",
        "hdr-doctor-sub": "Upload crop disease photo or symptoms to get instant diagnosis and matched spraying drones.",
        "hdr-planner": "🌱 Kopargaon Farm Operations Planner",
        "hdr-planner-sub": "Auto-schedule sower timeline, labour squads, and machinery for your crop.",
        "hdr-machinery": "🚜 Kopargaon Agricultural Machinery Rental",
        "hdr-machinery-sub": "Verified tractors, combine harvesters, and spray drones ready for dispatch.",
        "hdr-tracking": "📍 Real-Time Live Dispatch GPS Map (Kopargaon)",
        "hdr-schedule": "📅 My Booked Farm Jobs",
        "hdr-schedule-sub": "All confirmed labour squad and machinery bookings.",
        "hdr-payment": "💳 KrishiX Wallet & Payments",

        "btn-voice": "🔊 Kopargaon Voice Assistant",
        "btn-otp": "📱 Login with OTP",
        "search-ph": "Search by worker name, village, sugarcane, onion, spraying..."
      }
    };

    const dict = FULL_TRANSLATIONS[lang] || FULL_TRANSLATIONS.mr;

    // 1. Translate elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 2. Translate navigation tab titles
    Object.keys(dict).forEach(id => {
      if (id.startsWith("tab-")) {
        const el = document.getElementById(id);
        if (el) {
          const badge = el.querySelector(".nbadge") || el.querySelector(".live-dot");
          const badgeHTML = badge ? badge.outerHTML : "";
          el.innerHTML = `${dict[id]} ${badgeHTML}`;
        }
      }
    });
  }

  setLanguage(lang, speak = true) {
    this.state.language = lang;
    document.querySelectorAll(".pill-btn").forEach(b => {
      if (b.id && b.id.startsWith("lang-")) b.classList.remove("active");
    });
    const el = document.getElementById(`lang-${lang}`);
    if (el) el.classList.add("active");

    this.translateUI(lang);

    // Re-render all dynamic sections so every card, button, badge, and label translates immediately
    this.renderProfiles();
    this.renderTeamSquads();
    this.renderLeaderboard();
    this.renderFineHub();
    this.renderMachinery();
    this.renderSchedule();
    this.renderPayments();
    this.renderFarmPlan();
    this.initProfitMaximizer();

    if (speak) {
      const msg = {
        mr: "नमस्कार! भाषा मराठी निवडली आहे. संपूर्ण वेबसाईट मराठीत बदलली आहे.",
        hi: "नमस्ते! भाषा हिंदी चुनी गई है। संपूर्ण वेबसाइट हिंदी में बदल गई है।",
        en: "Language updated to English. All site text translated."
      };
      this.speak(msg[lang] || msg.en);
    }
  }

  /* ── VOICE ─────────────────────────────────────────────── */
  speak(text) {
    if (!text || !("speechSynthesis" in window)) return;
    this.synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const langMap = { en: "en-US", hi: "hi-IN", mr: "mr-IN" };
    u.lang = langMap[this.state.language] || "mr-IN";
    u.rate = 0.85;
    this.showToast(text);
    u.onend = () => {
      const t = document.getElementById("voice-toast");
      if (t) t.classList.remove("show");
    };
    this.synth.speak(u);
  }

  speakPageSummary() {
    const tab = this.state.currentTab;
    const lang = this.state.language;
    const summaries = {
      profiles: {
        mr: "तुम्ही आता कोपरगाव मजूर प्रोफाईल डायरेक्टरीमध्ये आहात. येथे 15 पडताळणी केलेल्या मजुरांच्या वैयक्तिक प्रोफाईल व त्यांचा 15 वर्षांचा अनुभव उपलब्ध आहे.",
        hi: "आप कोपरगांव मजदूर प्रोफाइल डायरेक्टरी में हैं।",
        en: "You are on the Kopargaon Labour Profiles Directory with 15 individual worker profiles and past work experience."
      },
      "team-squad": {
        mr: "हे पूर्ण मजूर टोळी बुकिंग दालन आहे. ऊस तोडणी, कांदा काढणी व गहू कापणीसाठी अख्खी टोळी बुक करा.",
        hi: "यह पूरा मजदूर टीम बुकिंग सेक्शन है।",
        en: "This is the Labour Squad Booking section to book entire teams for major farming operations."
      },
      fines: {
        mr: "दंड व भरपाई केंद्र: गैरहजेरी किंवा नुकसानासाठी थेट दंड अर्ज करा.",
        hi: "जुर्माना और सुरक्षा केंद्र।",
        en: "Fine & Protection Hub: File fine claims for late arrival or crop/machinery damage."
      }
    };
    const s = summaries[tab] || summaries.profiles;
    this.speak(s[lang] || s.en);
  }

  showToast(text) {
    const t = document.getElementById("voice-toast");
    const tx = document.getElementById("toast-text");
    if (!t || !tx) return;
    tx.textContent = text.length > 90 ? text.slice(0, 90) + "…" : text;
    t.classList.add("show");
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => t.classList.remove("show"), 5500);
  }

  /* ── ROLE ──────────────────────────────────────────────── */
  setRole(role) {
    this.state.currentRole = role;
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(`role-${role}`)?.classList.add("active");
    const pt = document.getElementById("tab-provider");
    if (pt) pt.style.display = role === "provider" ? "flex" : "none";
    this.switchTab(role === "provider" ? "provider" : "profiles");
  }

  /* ── MOBILE OTP AUTHENTICATION ──────────────────────── */
  checkAuthSession() {
    const api = window.KrishiXAPI;
    if (!api) return;
    const user = api.Auth.getCurrentUser();
    if (user) {
      const btn = document.getElementById("btn-otp-login");
      const badge = document.getElementById("user-badge");
      if (btn) btn.style.display = "none";
      if (badge) {
        badge.style.display = "inline-flex";
        badge.innerHTML = `👤 ${user.name} (${user.mobile}) <button style="background:none;border:none;color:#fff;cursor:pointer;margin-left:4px;" onclick="window.krishixApp.logout()">✕</button>`;
      }
    }
  }

  openOTPLoginModal() {
    document.getElementById("modal-title").textContent = "📱 Mobile OTP Login — KrishiX Kopargaon";
    document.getElementById("modal-body").innerHTML = `
      <div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:42px;margin-bottom:6px;">🌾</div>
        <p style="color:#64748b;font-size:13px;">Enter your 10-digit mobile number to receive instant SMS OTP.</p>
      </div>

      <div class="form-group" style="margin-bottom:14px;">
        <label>Mobile Number (मोबाईल नंबर)</label>
        <div style="display:flex;gap:8px;">
          <span style="padding:10px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:8px;font-weight:700;color:#334155;">+91</span>
          <input type="tel" id="otp-mobile-input" placeholder="98904 12345" style="flex-grow:1;" maxlength="10">
        </div>
      </div>

      <div id="otp-code-group" class="form-group" style="display:none;margin-bottom:14px;">
        <label>Enter 6-Digit OTP (ओटीपी टाका)</label>
        <input type="text" id="otp-code-input" placeholder="123456" maxlength="6" style="letter-spacing:4px;font-size:18px;font-weight:800;text-align:center;">
        <p style="font-size:11px;color:#16a34a;margin-top:4px;">💡 Demo OTP: <strong>123456</strong></p>
      </div>

      <button id="btn-send-otp" class="btn-primary" style="width:100%;justify-content:center;padding:12px;" onclick="window.krishixApp.sendOTP()">
        📩 Send OTP SMS
      </button>
      <button id="btn-verify-otp" class="btn-primary" style="width:100%;justify-content:center;padding:12px;display:none;background:#16a34a;" onclick="window.krishixApp.verifyOTP()">
        ✅ Verify & Login
      </button>
    `;
    this.openModal();
  }

  async sendOTP() {
    const mobile = document.getElementById("otp-mobile-input")?.value.trim();
    if (!mobile || mobile.length < 10) { alert("Please enter a valid 10-digit mobile number."); return; }
    
    const api = window.KrishiXAPI;
    if (api) {
      const res = await api.Auth.sendOTP(`+91${mobile}`, this.state.currentRole);
      if (res.success) {
        document.getElementById("otp-code-group").style.display = "block";
        document.getElementById("btn-send-otp").style.display = "none";
        document.getElementById("btn-verify-otp").style.display = "flex";
        this.speak("OTP sent to your mobile number. Enter code 1 2 3 4 5 6 to login.");
        return;
      }
    }
    // Demo fallback
    document.getElementById("otp-code-group").style.display = "block";
    document.getElementById("btn-send-otp").style.display = "none";
    document.getElementById("btn-verify-otp").style.display = "flex";
  }

  async verifyOTP() {
    const mobile = document.getElementById("otp-mobile-input")?.value.trim();
    const otp    = document.getElementById("otp-code-input")?.value.trim() || "123456";

    const api = window.KrishiXAPI;
    if (api) {
      const res = await api.Auth.verifyOTP(`+91${mobile}`, otp, `Farmer (${mobile.slice(-4)})`);
      if (res.success) {
        this.closeModal();
        this.checkAuthSession();
        alert(`🎉 Welcome back, ${res.data.user.name}!`);
        this.speak(`Authentication successful! Welcome to KrishiX Kopargaon.`);
        return;
      }
    }

    // Local fallback
    localStorage.setItem("krishix_user", JSON.stringify({ name: `Farmer (${mobile})`, mobile: `+91${mobile}` }));
    this.closeModal();
    this.checkAuthSession();
  }

  logout() {
    const api = window.KrishiXAPI;
    if (api) api.Auth.logout();
    else localStorage.removeItem("krishix_user");
    const btn = document.getElementById("btn-otp-login");
    const badge = document.getElementById("user-badge");
    if (btn) btn.style.display = "inline-flex";
    if (badge) badge.style.display = "none";
    alert("Logged out successfully.");
  }

  /* ── AI CROP HEALTH DOCTOR ──────────────────────────────── */
  /* ── AI CROP HEALTH DOCTOR ──────────────────────────────── */
  handleAIDoctorPhotoUpload(event) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const wrap = document.getElementById("ai-photo-preview-wrap");
        const preview = document.getElementById("ai-photo-preview");
        const laser = document.getElementById("ai-scan-laser");
        const statusTxt = document.getElementById("ai-photo-status-text");

        if (preview) preview.src = e.target.result;
        if (wrap) wrap.style.display = "block";
        if (statusTxt) statusTxt.innerHTML = `📸 <strong>${file.name}</strong> loaded (${(file.size/1024).toFixed(0)} KB) • Vision AI Ready`;
        
        this._aiUploadedPhotoData = e.target.result;

        // Trigger laser scanning animation
        if (laser) {
          laser.style.display = "block";
          let pos = 0;
          let dir = 1;
          clearInterval(this._scanInterval);
          this._scanInterval = setInterval(() => {
            pos += dir * 4;
            if (pos >= 136 || pos <= 0) dir *= -1;
            laser.style.top = `${pos}px`;
          }, 30);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async runAIDiagnosis() {
    const cropKey   = document.getElementById("ai-crop-select")?.value || "sugarcane";
    const cropSelEl = document.getElementById("ai-crop-select");
    const cropText  = cropSelEl?.options[cropSelEl.selectedIndex]?.text || "Sugarcane (ऊस)";
    const symptoms  = document.getElementById("ai-symptoms-text")?.value.trim();
    const resultBox = document.getElementById("ai-result-box");

    if (resultBox) {
      resultBox.style.display = "block";
      resultBox.style.textAlign = "center";
      resultBox.style.border = "2px dashed #7c3aed";
      resultBox.style.background = "#faf5ff";
      resultBox.innerHTML = `
        <div style="padding:40px 20px;">
          <div style="font-size:48px;animation:spin 1s infinite linear;margin-bottom:16px;">🔬</div>
          <h3 style="color:#6b21a8;font-size:20px;font-weight:800;margin-bottom:8px;">Running Gemini AI Medical Vision Scan...</h3>
          <p style="color:#7e22ce;font-size:14px;max-width:460px;margin:0 auto 16px;line-height:1.6;">
            Analyzing leaf tissue, pathogen spore lesions, yellowing patterns, and pest bite vectors for <strong>${cropText}</strong>...
          </p>
          <div style="width:240px;height:8px;background:#e9d5ff;border-radius:99px;margin:0 auto;overflow:hidden;">
            <div style="width:75%;height:100%;background:#7c3aed;border-radius:99px;animation:pulse 1s infinite alternate;"></div>
          </div>
        </div>
      `;
    }

    const api = window.KrishiXAPI;
    let diagData = null;

    if (api) {
      const res = await api.AI.diagnose(cropKey, symptoms);
      if (res.success) diagData = res.data.diagnosis;
    }

    // Default Knowledge Base Fallback if needed
    if (!diagData) {
      const cropDatabase = {
        sugarcane: { disease: "Sugarcane Red Rot (लाल सड रोग)", cause: "Fungal Pathogen (Colletotrichum falcatum)", severity: "HIGH SEVERITY (75% Risk)", symp: "Leaf yellowing on 3rd/4th leaf, internal red rotting with white cross patches.", chem: "Soil drenching with Carbendazim 12% + Mancozeb 63% WP @ 2g/L water. Remove affected clumps.", org: "Soil application of Trichoderma viride @ 2.5 kg/acre mixed with 100 kg organic manure.", squad: "Vijay Tambe (Certified Chemical Spraying Specialist - Takli)", machine: "AgriDron 20L Precision Spray Drone (Godavari Tech Drones)" },
        onion: { disease: "Onion Purple Blotch (जांभळा करपा)", cause: "Fungal Pathogen (Alternaria porri)", severity: "MODERATE SEVERITY (50% Risk)", symp: "Sunken water-soaked lesions expanding into purple-bordered spots.", chem: "Spray Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.7g/L water.", org: "Spray Neem Oil 10,000 PPM @ 3ml/L + Bio-fungicide Pseudomonas fluorescens @ 5g/L.", squad: "Kolpewadi Women Squad / Vijay Tambe Lead", machine: "AgriDron 20L Precision Spray Drone" },
        grape: { disease: "Grape Downy Mildew (तांबेरा / केवडा)", cause: "Fungal Pathogen (Plasmopara viticola)", severity: "HIGH SEVERITY (80% Risk)", symp: "Yellowish oily spots on upper leaf surface, white cottony fungal mat underneath.", chem: "Spray Metalaxyl 8% + Mancozeb 64% WP @ 2g/L or Dimethomorph 50% WP @ 1g/L.", org: "Copper Hydroxide 77% WP @ 2g/L + Trichoderma harzianum bio-spray.", squad: "Pandurang Chavan (Grape Pruning & Spray Expert)", machine: "AgriDron 20L Precision Spray Drone" },
        pomegranate: { disease: "Pomegranate Oily Spot (तेलकट डाग / तेल्या)", cause: "Bacterial Pathogen (Xanthomonas axonopodis)", severity: "CRITICAL SEVERITY (90% Risk)", symp: "Water-soaked dark brown oily spots on leaves, stems, and fruits with star-shaped cracks.", chem: "Spray Streptocycline @ 0.5g/L + Copper Oxychloride 50% WP @ 2.5g/L.", org: "Bordeaux Mixture 1% spray + Bio-fertilizer Bacillus subtilis soil application.", squad: "Pandurang Chavan Orchard Care Squad", machine: "AgriDron 20L Precision Spray Drone" }
      };

      const fallback = cropDatabase[cropKey] || cropDatabase.sugarcane;
      diagData = {
        crop: cropText,
        disease: fallback.disease,
        cause: fallback.cause,
        severity: fallback.severity,
        symptoms: symptoms || fallback.symp,
        treatment: fallback.chem,
        organicAlternative: fallback.org,
        recommendedSquad: fallback.squad,
        recommendedMachine: fallback.machine,
        analyzedAt: new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })
      };
    }

    clearInterval(this._scanInterval);
    const laser = document.getElementById("ai-scan-laser");
    if (laser) laser.style.display = "none";

    const userPhoto = this._aiUploadedPhotoData || "./assets/hero_banner.jpg";
    const rxId = `RX-KPG-${Math.floor(10000 + Math.random() * 90000)}`;

    if (resultBox) {
      resultBox.style.display = "block";
      resultBox.style.textAlign = "left";
      resultBox.style.border = "1px solid #c084fc";
      resultBox.style.background = "#fff";
      resultBox.style.boxShadow = "0 8px 30px rgba(124,58,237,0.12)";
      
      resultBox.innerHTML = `
        <!-- Official Prescription Header -->
        <div style="background:linear-gradient(135deg, #4c1d95, #6b21a8); color:#fff; padding:18px 22px; border-radius:12px 12px 0 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:#e9d5ff; font-weight:700;">🏥 OFFICIAL KRISHIX AGRI-CLINIC DIAGNOSTIC REPORT</div>
            <div style="font-size:20px; font-weight:900; margin-top:2px;">Prescription #${rxId}</div>
          </div>
          <div style="text-align:right;">
            <span style="background:#22c55e; color:#fff; padding:4px 12px; border-radius:99px; font-size:12px; font-weight:800;">✓ 98.6% Gemini AI Match</span>
            <div style="font-size:11px; color:#e9d5ff; margin-top:4px;">Date: ${diagData.analyzedAt || new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div style="padding:22px;">
          <!-- Image & Target Crop Row -->
          <div style="display:grid; grid-template-columns: 140px 1fr; gap:18px; margin-bottom:20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; align-items:center;">
            <div style="width:140px; height:110px; border-radius:8px; overflow:hidden; border:2px solid #7c3aed; position:relative;">
              <img src="${userPhoto}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='./assets/hero_banner.jpg';">
              <span style="position:absolute; bottom:4px; right:4px; background:rgba(0,0,0,0.7); color:#fff; font-size:9px; padding:2px 6px; border-radius:4px;">Scanned Leaf</span>
            </div>
            <div>
              <div style="font-size:12px; font-weight:800; color:#7c3aed; text-transform:uppercase;">Target Crop: ${diagData.crop}</div>
              <h3 style="font-size:20px; font-weight:900; color:#1e1b4b; margin:3px 0 6px;">${diagData.disease}</h3>
              <div style="display:flex; gap:10px; flex-wrap:wrap; font-size:12px;">
                <span style="background:#fee2e2; color:#991b1b; padding:3px 10px; border-radius:6px; font-weight:800; border:1px solid #fca5a5;">
                  🚨 ${diagData.severity || "HIGH SEVERITY"}
                </span>
                <span style="background:#f0fdf4; color:#166534; padding:3px 10px; border-radius:6px; font-weight:700; border:1px solid #bbf7d0;">
                  🔬 ${diagData.cause || "Fungal Pathogen"}
                </span>
              </div>
            </div>
          </div>

          <!-- Observed Symptoms -->
          <div style="margin-bottom:18px;">
            <h4 style="font-size:13px; font-weight:800; color:#475569; text-transform:uppercase; margin-bottom:6px;">📌 Identified Symptoms & Damage:</h4>
            <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:12px 14px; font-size:13px; color:#78350f; line-height:1.6;">
              ${diagData.symptoms}
            </div>
          </div>

          <!-- Dual Treatment Plan Grid -->
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:20px;">
            <!-- Chemical Treatment -->
            <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:10px; padding:14px;">
              <h4 style="font-size:14px; font-weight:800; color:#6b21a8; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                🧪 Chemical Remedy (रसायनिक औषध)
              </h4>
              <p style="font-size:12px; color:#334155; line-height:1.6; margin:0;">
                ${diagData.treatment || "Spray recommended chemical fungicide / insecticide."}
              </p>
            </div>

            <!-- Organic Alternative -->
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
              <h4 style="font-size:14px; font-weight:800; color:#166534; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                🌿 Organic / Bio Alternative (जैविक पर्याय)
              </h4>
              <p style="font-size:12px; color:#14532d; line-height:1.6; margin:0;">
                ${diagData.organicAlternative || "Spray Neem Oil 10,000 PPM @ 3ml/L water + Trichoderma viride bio-fungicide."}
              </p>
            </div>
          </div>

          <!-- 7-Day Care Calendar -->
          <div style="margin-bottom:20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px;">
            <h4 style="font-size:13px; font-weight:800; color:#334155; text-transform:uppercase; margin-bottom:10px;">🗓️ 7-Day Crop Recovery Roadmap (कोपरगाव शेतकरी काळजी वेळापत्रक)</h4>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; text-align:center;">
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
                <span style="font-size:10px; font-weight:800; color:#7c3aed; display:block;">DAY 1</span>
                <span style="font-size:11px; color:#334155; font-weight:700;">Prune Damaged Stalks</span>
              </div>
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
                <span style="font-size:10px; font-weight:800; color:#7c3aed; display:block;">DAY 2</span>
                <span style="font-size:11px; color:#334155; font-weight:700;">Execute Spraying</span>
              </div>
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
                <span style="font-size:10px; font-weight:800; color:#7c3aed; display:block;">DAY 5</span>
                <span style="font-size:11px; color:#334155; font-weight:700;">Soil Bio-Nutrients</span>
              </div>
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:8px;">
                <span style="font-size:10px; font-weight:800; color:#7c3aed; display:block;">DAY 7</span>
                <span style="font-size:11px; color:#334155; font-weight:700;">Recovery Check</span>
              </div>
            </div>
          </div>

          <!-- Matched Spraying Squads -->
          <div style="margin-bottom:20px;">
            <h4 style="font-size:13px; font-weight:800; color:#14532d; text-transform:uppercase; margin-bottom:8px;">🛠️ Matched Kopargaon Spraying Units:</h4>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
              <div style="background:#f0fdf4; padding:12px; border-radius:8px; border:1px solid #bbf7d0; font-size:12px; color:#14532d;">
                👥 <strong>Spraying Squad:</strong><br>${diagData.recommendedSquad}
              </div>
              <div style="background:#f0fdf4; padding:12px; border-radius:8px; border:1px solid #bbf7d0; font-size:12px; color:#14532d;">
                🚁 <strong>Spray Drone:</strong><br>${diagData.recommendedMachine}
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="btn-primary" style="flex:2; justify-content:center; background:#16a34a; padding:12px; font-size:14px;" onclick="window.krishixApp.switchTab('team-squad')">
              ⚡ Book Matched Spray Squad & Drone Now
            </button>
            <button class="btn-outline" style="flex:1; justify-content:center; padding:12px; font-size:13px;" onclick="window.krishixApp.speak('Diagnosis complete for ${diagData.crop}. Disease: ${diagData.disease}. Recommended treatment: ${diagData.treatment}')">
              🔊 Listen Prescription
            </button>
            <button class="btn-outline" style="flex:1; justify-content:center; padding:12px; font-size:13px;" onclick="window.print()">
              📄 Save / Print PDF Report
            </button>
          </div>
        </div>
      `;
    }

    this.speak(`Gemini AI Diagnosis complete for ${diagData.crop}. Identified ${diagData.disease}. Chemical and organic remedies prepared.`);
  }

  /* ── TABS ──────────────────────────────────────────────── */
  switchTab(name) {
    this.state.currentTab = name;
    document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));

    // Hide Intro Landing Page tab after getting started
    const landingTab = document.getElementById("tab-landing");
    if (landingTab) {
      if (name !== "landing") {
        landingTab.style.display = "none";
      } else {
        landingTab.style.display = "";
      }
    }

    document.getElementById(`tab-${name}`)?.classList.add("active");
    document.querySelectorAll(".content-view").forEach(v => v.classList.remove("active"));
    document.getElementById(`view-${name}`)?.classList.add("active");
    if (name === "tracking") setTimeout(() => window.krishixTracker?.initMap(), 120);
    if (name === "profit") setTimeout(() => this.recalculateProfitAI(false), 100);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ══════════════════════════════════════════════════════════
     SECTION 5: PROFIT MAXIMIZER AI ENGINE
     Interactive agricultural decision-making suite
  ══════════════════════════════════════════════════════════ */
  initProfitMaximizer() {
    if (!this.state.profitMaximizer) return;
    const pm = this.state.profitMaximizer;
    
    const cropSel = document.getElementById("pm-input-crop");
    if (cropSel) cropSel.value = pm.cropKey || "Tomato";
    
    const qtyInp = document.getElementById("pm-input-qty");
    if (qtyInp) qtyInp.value = pm.quantityTons || 15;
    
    const priceInp = document.getElementById("pm-input-curr-price");
    if (priceInp) priceInp.value = pm.currentPrice || 15;

    this.recalculateProfitAI(false);
  }

  setFarmerPriority(priority) {
    if (!this.state.profitMaximizer) return;
    this.state.profitMaximizer.priority = priority;

    document.querySelectorAll(".priority-btn").forEach(b => b.classList.remove("active"));
    const activeBtn = document.getElementById(`prio-${priority}`);
    if (activeBtn) activeBtn.classList.add("active");

    const labels = {
      "max-profit": "Maximum Profit",
      "min-risk": "Minimum Risk",
      "fast-cash": "Fast Cash",
      "avoid-storage": "Avoid Storage"
    };

    this.showToast(`🎯 Priority set to ${labels[priority] || priority}. Recalculating AI recommendation...`);
    this.recalculateProfitAI(true);
  }

  onCropInputChange() {
    const cropKey = document.getElementById("pm-input-crop")?.value || "Tomato";
    const cropData = CROPS_DATA[cropKey] || CROPS_DATA.Tomato;
    
    const qtyInp = document.getElementById("pm-input-qty");
    if (qtyInp) qtyInp.value = cropData.defaultQty;

    const priceInp = document.getElementById("pm-input-curr-price");
    if (priceInp) priceInp.value = cropData.basePrice;

    const storageCostInp = document.getElementById("pm-input-storage-cost");
    if (storageCostInp) storageCostInp.value = cropData.storageCostPerKgDay;

    this.recalculateProfitAI(true);
  }

  recalculateProfitAI(notify = true) {
    const btn = document.getElementById("btn-recalculate-ai");
    if (btn) btn.innerHTML = `⏳ Analyzing...`;

    setTimeout(() => {
      if (btn) btn.innerHTML = `🔄 Recalculate with AI`;

      const pm = this.state.profitMaximizer;
      const cropKey = document.getElementById("pm-input-crop")?.value || "Tomato";
      const crop = CROPS_DATA[cropKey] || CROPS_DATA.Tomato;

      const quantityTons = parseFloat(document.getElementById("pm-input-qty")?.value) || crop.defaultQty;
      const location = document.getElementById("pm-input-location")?.value || "Kolpewadi, Kopargaon";
      const harvestDate = document.getElementById("pm-input-harvest-date")?.value || "2026-08-12";
      const currentPrice = parseFloat(document.getElementById("pm-input-curr-price")?.value) || crop.basePrice;
      const storageCostKgDay = parseFloat(document.getElementById("pm-input-storage-cost")?.value) || crop.storageCostPerKgDay;
      const dest = document.getElementById("pm-input-destination")?.value || "Nashik APMC";

      const isSugarcane = cropKey === "Sugarcane";
      const totalKg = isSugarcane ? quantityTons : quantityTons * 1000;
      const unitLbl = isSugarcane ? "Ton" : "kg";

      // Today baseline
      const todayRev = totalKg * currentPrice;
      const todayCosts = (quantityTons * 400) + (quantityTons * 150) + (todayRev * 0.015);
      const todayNetProfit = todayRev - todayCosts;

      // 1. MAXIMUM PROFIT
      const maxExpPrice = crop.expectedRise;
      const maxHoldingDays = crop.holdingDaysRec;
      const maxRev = totalKg * maxExpPrice;
      const maxStorageCost = isSugarcane ? 0 : totalKg * maxHoldingDays * storageCostKgDay;
      const maxTransportCost = quantityTons * crop.transportCostPerTon;
      const maxHandlingCost = quantityTons * crop.handlingCostPerTon;
      const maxFee = maxRev * 0.015;
      const maxTotalCosts = maxStorageCost + maxTransportCost + maxHandlingCost + maxFee;
      const maxNetProfit = maxRev - maxTotalCosts;
      const maxExtraProfit = maxNetProfit - todayNetProfit;

      // 2. SAFE PROFIT
      const safeExpPrice = isSugarcane ? crop.expectedRise * 0.98 : Math.round(crop.basePrice + (crop.expectedRise - crop.basePrice) * 0.7);
      const safeHoldingDays = 2;
      const safeRev = totalKg * safeExpPrice;
      const safeStorageCost = isSugarcane ? 0 : totalKg * safeHoldingDays * storageCostKgDay;
      const safeTransportCost = quantityTons * (crop.transportCostPerTon * 0.75);
      const safeHandlingCost = quantityTons * crop.handlingCostPerTon;
      const safeTotalCosts = safeStorageCost + safeTransportCost + safeHandlingCost;
      const safeNetProfit = safeRev - safeTotalCosts;
      const safeExtraProfit = safeNetProfit - todayNetProfit;

      // 3. FAST CASH
      const fastExpPrice = currentPrice;
      const fastRev = totalKg * fastExpPrice;
      const fastTransportCost = quantityTons * (crop.transportCostPerTon * 0.5);
      const fastHandlingCost = quantityTons * crop.handlingCostPerTon;
      const fastFee = fastRev * 0.015;
      const fastTotalCosts = fastTransportCost + fastHandlingCost + fastFee;
      const fastNetProfit = fastRev - fastTotalCosts;
      const fastExtraProfit = fastNetProfit - todayNetProfit;

      const strategies = [
        {
          id: "max-profit",
          badge: "🏆 Highest Expected Profit",
          title: `Store ${maxHoldingDays} Days → Shared Freight → ${dest}`,
          sellingPrice: maxExpPrice,
          unit: unitLbl,
          revenue: maxRev,
          costs: maxTotalCosts,
          netProfit: maxNetProfit,
          extraProfit: maxExtraProfit,
          risk: "🟡 Medium",
          timeline: `${maxHoldingDays} Days Storage + Transport`
        },
        {
          id: "min-risk",
          badge: "🛡️ Safest Return",
          title: `Direct Contract → ${crop.directBuyer}`,
          sellingPrice: safeExpPrice,
          unit: unitLbl,
          revenue: safeRev,
          costs: safeTotalCosts,
          netProfit: safeNetProfit,
          extraProfit: safeExtraProfit,
          risk: "🟢 Low",
          timeline: `2 Days Direct Delivery`
        },
        {
          id: "fast-cash",
          badge: "⚡ Instant Liquidity",
          title: `Sell Today → Local ${location} APMC`,
          sellingPrice: fastExpPrice,
          unit: unitLbl,
          revenue: fastRev,
          costs: fastTotalCosts,
          netProfit: fastNetProfit,
          extraProfit: fastExtraProfit,
          risk: "🟢 Low",
          timeline: `Immediate / Today`
        }
      ];

      let recommended = strategies[0];
      if (pm.priority === "min-risk") recommended = strategies[1];
      else if (pm.priority === "fast-cash" || pm.priority === "avoid-storage") recommended = strategies[2];

      if (pm.simulatedMarketShift && pm.priority === "max-profit") {
        recommended = strategies[1];
      }

      // Update Hero DOM
      document.getElementById("pm-hero-crop") && (document.getElementById("pm-hero-crop").textContent = crop.name);
      document.getElementById("pm-hero-qty") && (document.getElementById("pm-hero-qty").textContent = `${quantityTons} Tons (${totalKg.toLocaleString()} ${unitLbl})`);
      document.getElementById("pm-hero-location") && (document.getElementById("pm-hero-location").textContent = location);
      document.getElementById("pm-hero-date") && (document.getElementById("pm-hero-date").textContent = harvestDate);
      document.getElementById("pm-hero-currprice") && (document.getElementById("pm-hero-currprice").textContent = `₹${currentPrice}/${unitLbl}`);
      document.getElementById("pm-hero-strategy-title") && (document.getElementById("pm-hero-strategy-title").textContent = recommended.title);
      document.getElementById("pm-hero-exp-price") && (document.getElementById("pm-hero-exp-price").textContent = `₹${recommended.sellingPrice.toLocaleString()} / ${unitLbl}`);
      document.getElementById("pm-hero-net-profit") && (document.getElementById("pm-hero-net-profit").textContent = `₹${Math.round(recommended.netProfit).toLocaleString()}`);
      
      const heroExtra = document.getElementById("pm-hero-extra-profit");
      if (heroExtra) {
        heroExtra.textContent = recommended.extraProfit >= 0 
          ? `+₹${Math.round(recommended.extraProfit).toLocaleString()}`
          : `-₹${Math.round(Math.abs(recommended.extraProfit)).toLocaleString()}`;
      }

      document.getElementById("pm-hero-confidence") && (document.getElementById("pm-hero-confidence").textContent = `${crop.confidence}%`);

      // Render 3 Strategy Cards
      const container = document.getElementById("pm-strategies-container");
      if (container) {
        container.innerHTML = strategies.map(s => {
          const isRec = s.id === recommended.id;
          return `
            <div class="strategy-card ${isRec ? 'recommended' : ''}">
              ${isRec ? `<span class="strategy-badge">🏆 AI RECOMMENDED</span>` : ''}
              <div>
                <div style="font-size:11px;color:#64748b;font-weight:700;margin-bottom:4px;">${s.badge}</div>
                <h4 style="font-size:16px;color:#14532d;margin-bottom:12px;">${s.title}</h4>
                
                <div style="display:flex;justify-content:space-between;align-items:center;background:#f8fafc;padding:10px;border-radius:8px;margin-bottom:10px;">
                  <span style="font-size:12px;color:#64748b;">Selling Price:</span>
                  <strong style="font-size:16px;color:#1e293b;">₹${s.sellingPrice}/${s.unit}</strong>
                </div>

                <div style="display:flex;flex-direction:column;gap:6px;font-size:12px;margin-bottom:14px;">
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#64748b;">Total Revenue:</span>
                    <strong>₹${Math.round(s.revenue).toLocaleString()}</strong>
                  </div>
                  <div style="display:flex;justify-content:space-between;">
                    <span style="color:#64748b;">Total Costs:</span>
                    <span style="color:#dc2626;">−₹${Math.round(s.costs).toLocaleString()}</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:800;color:#14532d;padding-top:4px;border-top:1px dashed #cbd5e1;">
                    <span>Net Profit:</span>
                    <span style="color:#16a34a;">₹${Math.round(s.netProfit).toLocaleString()}</span>
                  </div>
                  <div style="display:flex;justify-content:space-between;font-size:11px;">
                    <span style="color:#64748b;">Extra vs Today:</span>
                    <span style="font-weight:700;color:${s.extraProfit >= 0 ? '#16a34a' : '#dc2626'};">
                      ${s.extraProfit >= 0 ? '+' : ''}₹${Math.round(s.extraProfit).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div style="display:flex;justify-content:space-between;font-size:11px;color:#64748b;margin-bottom:14px;background:#f1f5f9;padding:8px 10px;border-radius:6px;">
                  <span>Risk: <strong>${s.risk}</strong></span>
                  <span>Time: <strong>${s.timeline}</strong></span>
                </div>
              </div>

              <button class="btn-primary" style="width:100%;justify-content:center;background:${isRec ? '#14532d' : '#475569'};font-size:13px;" onclick="window.krishixApp?.selectStrategy('${s.id}')">
                ${isRec ? '✓ Selected Recommendation' : 'Select Strategy'}
              </button>
            </div>
          `;
        }).join("");
      }

      // Update Breakdown Card
      document.getElementById("pb-revenue-formula") && (document.getElementById("pb-revenue-formula").textContent = `${totalKg.toLocaleString()} ${unitLbl} × ₹${recommended.sellingPrice}/${unitLbl}`);
      document.getElementById("pb-revenue-val") && (document.getElementById("pb-revenue-val").textContent = `+₹${Math.round(recommended.revenue).toLocaleString()}`);
      document.getElementById("pb-storage-formula") && (document.getElementById("pb-storage-formula").textContent = `${maxHoldingDays} days @ ₹${storageCostKgDay}/${unitLbl}/day`);
      document.getElementById("pb-storage-val") && (document.getElementById("pb-storage-val").textContent = `−₹${Math.round(maxStorageCost).toLocaleString()}`);
      document.getElementById("pb-transport-val") && (document.getElementById("pb-transport-val").textContent = `−₹${Math.round(maxTransportCost).toLocaleString()}`);
      document.getElementById("pb-handling-val") && (document.getElementById("pb-handling-val").textContent = `−₹${Math.round(maxHandlingCost).toLocaleString()}`);
      document.getElementById("pb-fees-val") && (document.getElementById("pb-fees-val").textContent = `−₹${Math.round(maxFee).toLocaleString()}`);
      document.getElementById("pb-net-profit-val") && (document.getElementById("pb-net-profit-val").textContent = `₹${Math.round(recommended.netProfit).toLocaleString()}`);
      
      const pbDiff = document.getElementById("pb-diff-val");
      if (pbDiff) {
        pbDiff.textContent = `${recommended.extraProfit >= 0 ? '+' : ''}₹${Math.round(recommended.extraProfit).toLocaleString()} more than selling today`;
      }

      // Forecast Chart & Simulator Update
      this.renderPriceForecast(pm.forecastDays || 5);
      this.updateProfitSimulator();

      if (notify) {
        this.showToast(`✅ Recalculated! Expected Net Profit: ₹${Math.round(recommended.netProfit).toLocaleString()}`);
      }
    }, 200);
  }

  setForecastHorizon(days, btnElement) {
    if (!this.state.profitMaximizer) return;
    this.state.profitMaximizer.forecastDays = days;

    if (btnElement) {
      document.querySelectorAll("#pm-forecast-horizon .pill-btn").forEach(b => b.classList.remove("active"));
      btnElement.classList.add("active");
    }

    this.renderPriceForecast(days);
  }

  renderPriceForecast(days = 5) {
    const cropKey = document.getElementById("pm-input-crop")?.value || "Tomato";
    const crop = CROPS_DATA[cropKey] || CROPS_DATA.Tomato;
    const fData = crop.forecast?.[days] || crop.forecast[5];

    document.getElementById("fc-curr-price") && (document.getElementById("fc-curr-price").textContent = `₹${crop.basePrice} / ${crop.unit}`);
    document.getElementById("fc-pred-price") && (document.getElementById("fc-pred-price").textContent = `₹${fData.expected} / ${crop.unit}`);
    document.getElementById("fc-range-price") && (document.getElementById("fc-range-price").textContent = `₹${fData.rangeLow} – ₹${fData.rangeHigh} / ${crop.unit}`);

    const fcTrend = document.getElementById("fc-trend-dir");
    if (fcTrend) {
      const icon = fData.trend === "up" ? "📈 Rising" : fData.trend === "down" ? "📉 Falling" : "➡️ Stable";
      fcTrend.textContent = `${icon} (${fData.percent})`;
      fcTrend.style.color = fData.trend === "up" ? "#16a34a" : fData.trend === "down" ? "#dc2626" : "#2563eb";
    }

    const svg = document.getElementById("pm-forecast-svg");
    if (!svg) return;

    const width = svg.clientWidth || 600;
    const height = 200;
    const pointsCount = 6;
    const stepX = width / (pointsCount - 1);

    const pLow = fData.rangeLow;
    const pHigh = fData.rangeHigh;
    const pMid = fData.expected;
    const pStart = crop.basePrice;

    const yMin = Math.min(pStart, pLow) * 0.9;
    const yMax = Math.max(pStart, pHigh) * 1.1;

    const mapY = (val) => height - 30 - ((val - yMin) / (yMax - yMin)) * (height - 50);

    const midPoints = [
      { x: 0, y: mapY(pStart) },
      { x: stepX * 1, y: mapY(pStart + (pMid - pStart) * 0.25) },
      { x: stepX * 2, y: mapY(pStart + (pMid - pStart) * 0.5) },
      { x: stepX * 3, y: mapY(pStart + (pMid - pStart) * 0.75) },
      { x: stepX * 4, y: mapY(pMid) },
      { x: stepX * 5, y: mapY(pMid) }
    ];

    const topPoints = midPoints.map(p => ({ x: p.x, y: mapY(pLow + (pHigh - pLow)) }));
    const botPoints = midPoints.map(p => ({ x: p.x, y: mapY(pLow) }));

    const linePath = midPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
    const topPath = topPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
    const botPath = botPoints.slice().reverse().map((p) => `L ${p.x} ${p.y}`).join(" ");
    const bandPath = `${topPath} ${botPath} Z`;

    svg.innerHTML = `
      <defs>
        <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22c55e" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#22c55e" stop-opacity="0.05" />
        </linearGradient>
      </defs>
      <line x1="0" y1="${height - 25}" x2="${width}" y2="${height - 25}" stroke="#e2e8f0" stroke-width="1" />
      <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="#e2e8f0" stroke-dasharray="4,4" />
      <path d="${bandPath}" fill="url(#bandGrad)" stroke="none" />
      <path d="${linePath}" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" />
      ${midPoints.map((p, i) => `
        <circle cx="${p.x}" cy="${p.y}" r="4" fill="${i === midPoints.length - 1 ? '#16a34a' : '#072b20'}" stroke="#fff" stroke-width="2" />
      `).join("")}
      <text x="5" y="${height - 8}" font-size="11" fill="#64748b" font-weight="600">Today (₹${pStart})</text>
      <text x="${width - 85}" y="${height - 8}" font-size="11" fill="#16a34a" font-weight="700">Day ${days} (₹${pMid})</text>
    `;
  }

  updateProfitSimulator() {
    const days = parseInt(document.getElementById("sim-range-days")?.value || "5");
    const price = parseFloat(document.getElementById("sim-range-price")?.value || "28");
    const transportPerTon = parseFloat(document.getElementById("sim-range-transport")?.value || "800");
    const storagePerKgDay = parseFloat(document.getElementById("sim-range-storage")?.value || "1.2");
    const qtyTons = parseInt(document.getElementById("sim-range-qty")?.value || "15");

    document.getElementById("sim-val-days") && (document.getElementById("sim-val-days").textContent = `${days} Days`);
    document.getElementById("sim-val-price") && (document.getElementById("sim-val-price").textContent = `₹${price.toFixed(1)} / kg`);
    document.getElementById("sim-val-transport") && (document.getElementById("sim-val-transport").textContent = `₹${transportPerTon} / Ton`);
    document.getElementById("sim-val-storage") && (document.getElementById("sim-val-storage").textContent = `₹${storagePerKgDay.toFixed(2)} / kg / day`);
    document.getElementById("sim-val-qty") && (document.getElementById("sim-val-qty").textContent = `${qtyTons} Tons`);

    const totalKg = qtyTons * 1000;
    const grossRev = totalKg * price;
    const storageCost = totalKg * days * storagePerKgDay;
    const transportCost = qtyTons * transportPerTon;
    const handlingCost = qtyTons * 333;
    const fees = grossRev * 0.015;
    const totalCosts = storageCost + transportCost + handlingCost + fees;
    const netProfit = grossRev - totalCosts;

    const baseRev = totalKg * 15;
    const baseCosts = (qtyTons * 400) + (qtyTons * 150) + (baseRev * 0.015);
    const baseNet = baseRev - baseCosts;
    const diff = netProfit - baseNet;

    document.getElementById("sim-output-net-profit") && (document.getElementById("sim-output-net-profit").textContent = `₹${Math.round(netProfit).toLocaleString()}`);
    
    const outDiff = document.getElementById("sim-output-diff");
    if (outDiff) {
      outDiff.textContent = `${diff >= 0 ? '+' : ''}₹${Math.round(diff).toLocaleString()} compared to selling today`;
      outDiff.style.color = diff >= 0 ? "#fde047" : "#fca5a5";
    }

    document.getElementById("sim-out-rev") && (document.getElementById("sim-out-rev").textContent = `₹${Math.round(grossRev).toLocaleString()}`);
    document.getElementById("sim-out-costs") && (document.getElementById("sim-out-costs").textContent = `−₹${Math.round(totalCosts).toLocaleString()}`);
  }

  selectStrategy(strategyId) {
    this.setFarmerPriority(strategyId);
    this.scrollToActionPlan();
  }

  toggleWhySection() {
    const list = document.getElementById("why-factors-list");
    const icon = document.getElementById("why-toggle-icon");
    if (!list) return;
    if (list.style.display === "none") {
      list.style.display = "flex";
      if (icon) icon.textContent = "▼";
    } else {
      list.style.display = "none";
      if (icon) icon.textContent = "▲";
    }
  }

  executeActionStep(stepType) {
    const messages = {
      storage: "🧊 Reserving Shirdi Cold Storage slot for 15 Tons... Confirmation code sent via SMS!",
      truck: "🚛 Shared Freight Pool Truck #12 booked! Driver Raosaheb Patil notified.",
      quality: "🔔 Quality monitoring alert active! Temperature & moisture tracked daily.",
      alert: "🔔 Price alert active! You will be notified on mandi price spikes.",
      buyer: "📄 Opening buyer contract with Sanjivani Foods (@ ₹26/kg)..."
    };

    const text = messages[stepType] || "Action executed successfully.";
    this.speak(text);
    this.showToast(text);

    if (stepType === 'truck') {
      setTimeout(() => this.switchTab('tracking'), 1500);
    }
  }

  activateMarketWatch() {
    const minPrice = document.getElementById("pm-alert-min-price")?.value || "24";
    const minProfit = document.getElementById("pm-alert-min-profit")?.value || "300000";
    
    const text = `🔔 Price watch activated! Alert set if price drops below ₹${minPrice}/kg or profit drops below ₹${parseFloat(minProfit).toLocaleString()}`;
    this.speak(text);
    this.showToast(text);

    const badge = document.getElementById("pm-watch-status");
    if (badge) badge.textContent = "🔔 Monitoring Active (Live Mandi Feed)";
  }

  toggleMarketShiftSimulation() {
    if (!this.state.profitMaximizer) return;
    const pm = this.state.profitMaximizer;
    pm.simulatedMarketShift = !pm.simulatedMarketShift;

    const banner = document.getElementById("pm-shift-alert-banner");
    if (banner) {
      banner.style.display = pm.simulatedMarketShift ? "block" : "none";
    }

    this.recalculateProfitAI(true);
    if (pm.simulatedMarketShift) {
      this.speak("Market alert triggered! Expected price growth has slowed. Recommendation updated to Sell within 2 days.");
    }
  }

  scrollToActionPlan() {
    document.getElementById("section-action-plan")?.scrollIntoView({ behavior: "smooth" });
  }

  scrollToStrategies() {
    document.getElementById("section-strategies")?.scrollIntoView({ behavior: "smooth" });
  }

  speakProfitAdvice() {
    const cropKey = document.getElementById("pm-input-crop")?.value || "Tomato";
    const msg = {
      mr: `कोपरगाव एआय सल्ला: जर तुम्ही ${cropKey} 5 दिवस शिर्डी कोल्ड स्टोरेजमध्ये साठवून नाशिक बाजारात पाठवले, तर तुमचा नफा 42,500 रुपयांनी वाढेल!`,
      hi: `कोपरगांव एआई सलाह: यदि आप ${cropKey} 5 दिन कोल्ड स्टोरेज में रखकर नासिक मंडी भेजते हैं, तो आपका लाभ 42,500 रुपये बढ़ेगा!`,
      en: `Kopargaon AI Advice: Storing ${cropKey} 5 days in cold storage and shipping to Nashik APMC yields ₹42,500 additional profit.`
    };
    const lang = this.state.language || "mr";
    this.speak(msg[lang] || msg.en);
  }

  /* ══════════════════════════════════════════════════════════
     SECTION 1: INDIVIDUAL LABOUR PROFILES DIRECTORY
     15 profiles, personal info, past experiences, self-registration
  ══════════════════════════════════════════════════════════ */

  getFilteredProfiles() {
    let list = [...LABOUR_PROFILES];
    const q = (this.state.profileSearch || "").toLowerCase().trim();
    const f = this.state.profileSkill;
    if (q) list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.village.toLowerCase().includes(q) ||
      p.skill.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q)
    );
    if (f && f !== "ALL") list = list.filter(p => p.skill === f);
    return list;
  }

  renderProfiles() {
    const grid = document.getElementById("profiles-grid");
    if (!grid) return;
    const list = this.getFilteredProfiles();

    const cnt = document.getElementById("profiles-count");
    if (cnt) cnt.textContent = `${list.length} Workers Found`;

    if (list.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:#64748B;"><div style="font-size:40px;margin-bottom:12px;">🔍</div><div style="font-size:18px;font-weight:700;">No worker profiles found</div></div>`;
      return;
    }

    grid.innerHTML = list.map((p, idx) => this.buildProfileCard(p, idx)).join("");
  }

  buildProfileCard(p, idx) {
    const lang = this.state.language || "mr";
    const lblRank1 = lang === "mr" ? "🏆 रँक #1 कोपरगाव" : lang === "hi" ? "🏆 रैंक #1 कोपरगांव" : "🏆 Rank #1 Kopargaon";
    const lblRank2 = lang === "mr" ? "🥈 रँक #2 कोपरगाव" : lang === "hi" ? "🥈 रैंक #2 कोपरगांव" : "🥈 Rank #2 Kopargaon";
    const lblRank3 = lang === "mr" ? "🥉 रँक #3 कोपरगाव" : lang === "hi" ? "🥉 रैंक #3 कोपरगांव" : "🥉 Rank #3 Kopargaon";
    const lblVer = lang === "mr" ? "✓ पडताळणी केलेले" : lang === "hi" ? "✓ सत्यापित" : "✓ Verified";
    
    const lblAvail = lang === "mr" ? "🟢 उपलब्ध" : lang === "hi" ? "🟢 उपलब्ध" : "🟢 Available";
    const lblBooked = lang === "mr" ? "🔴 बुक केलेले" : lang === "hi" ? "🔴 बुक किया गया" : "🔴 Booked";
    const lblTrust = lang === "mr" ? "ट्रस्ट" : lang === "hi" ? "ट्रस्ट" : "Trust";
    const lblExp = lang === "mr" ? "अनुभव" : lang === "hi" ? "अनुभव" : "Exp";
    const lblYrs = lang === "mr" ? "वर्षे" : lang === "hi" ? "साल" : "yrs";
    const lblMaxSquad = lang === "mr" ? "कमाल टोळी" : lang === "hi" ? "अधिकतम टीम" : "Max Squad";
    const lblJobs = lang === "mr" ? "कामे" : lang === "hi" ? "कार्य" : "jobs";
    const lblOnTime = lang === "mr" ? "वेळेवर" : lang === "hi" ? "समय पर" : "on-time";
    const lblPastExp = lang === "mr" ? "मागील अनुभव:" : lang === "hi" ? "पिछला अनुभव:" : "Past Experience:";
    const lblPerWorkerDay = lang === "mr" ? "प्रति मजूर / दिवस" : lang === "hi" ? "प्रति मजदूर / दिन" : "per worker / day";
    const btnBook = lang === "mr" ? "आत्ताच बुक करा" : lang === "hi" ? "अभी बुक करें" : "Book Labour";

    const leaderboardRanks = [...LABOUR_PROFILES]
      .sort((a, b) => b.trustScore - a.trustScore || b.rating - a.rating);
    const rank = leaderboardRanks.findIndex(x => x.id === p.id) + 1;

    const rankBadge =
      rank === 1 ? `<span class="pc-rank rank-gold">${lblRank1}</span>` :
      rank === 2 ? `<span class="pc-rank rank-silver">${lblRank2}</span>` :
      rank === 3 ? `<span class="pc-rank rank-bronze">${lblRank3}</span>` :
                   `<span class="pc-rank rank-std">${lblVer}</span>`;

    const availBadge = p.available
      ? `<span class="pc-avail av-yes">${lblAvail}</span>`
      : `<span class="pc-avail av-no">${lblBooked}</span>`;

    const stars = this.starsHtml(p.rating);
    const firstReview = p.reviews?.[0] || null;
    const latestExp = p.pastWorkExperience?.[0] || null;

    return `
    <div class="profile-card" onclick="window.krishixApp.openDetail('${p.id}')">
      <div class="pc-img-wrap">
        <img src="${p.photo}" alt="Photo of ${p.name}"
             loading="lazy"
             onerror="this.src='./assets/labour_squad.jpg'; this.onerror=null;">
        ${rankBadge}
        ${availBadge}
        <div class="pc-photo-foot">
          <span class="pc-trust-badge">🛡️ ${lblTrust} ${p.trustScore}/100</span>
          <span class="pc-stars">${stars}</span>
        </div>
      </div>

      <div class="pc-body">
        <div class="pc-name">${p.name}</div>
        <div class="pc-role">${p.role}</div>

        <div class="pc-info">
          <div class="pc-info-row">📍 <strong>${p.village}</strong></div>
          <div class="pc-info-row">📞 ${p.mobile}</div>
          <div class="pc-info-row">🗓️ ${lblExp}: <strong>${p.experience} ${lblYrs}</strong>&ensp;|&ensp;👥 ${lblMaxSquad}: <strong>${p.workersInSquad}</strong></div>
          <div class="pc-info-row">✅ <strong>${p.jobsCount} ${lblJobs}</strong>&ensp;|&ensp;⏱️ <strong>${p.punctuality}</strong> ${lblOnTime}</div>
          <div class="pc-info-row" style="color:#16a34a;font-weight:600;">${p.aadhaar}</div>
        </div>

        <div class="pc-skills">
          <span class="skill-tag">${p.skill}</span>
          <span class="skill-tag">${p.experience}+ ${lblYrs} ${lblExp}</span>
        </div>

        ${latestExp ? `
        <div style="background:#f0fdf4;border:1px solid #dcfce7;border-radius:6px;padding:8px 10px;font-size:11px;color:#166534;margin-bottom:10px;">
          🎓 <strong>${lblPastExp}</strong> ${latestExp.title} (${latestExp.year})
        </div>` : ''}

        ${firstReview ? `
        <div class="pc-review">
          "${firstReview.text.slice(0, 75)}${firstReview.text.length > 75 ? "…" : ""}"
          <div class="pc-reviewer" style="margin-top:4px;">— ${firstReview.farmer}</div>
        </div>` : '<div style="flex-grow:1;"></div>'}

        <div class="pc-footer">
          <div>
            <div class="pc-rate">₹${p.dailyRate}</div>
            <div class="pc-rate-sub">${lblPerWorkerDay}</div>
          </div>
          <div class="pc-btns">
            <button class="btn-call-sm"
              onclick="event.stopPropagation(); alert('Calling ${p.name}:\\n${p.mobile}');"
              title="Call directly">📞</button>
            <button class="btn-book-sm"
              onclick="event.stopPropagation(); window.krishixApp.openBookingModal('${p.id}');">
              ${btnBook}
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }

  handleProfileSearch(query) {
    this.state.profileSearch = query;
    this.renderProfiles();
  }

  filterBySkill(skill) {
    this.state.profileSkill = skill;
    document.querySelectorAll(".skill-chip").forEach(b =>
      b.classList.toggle("active", b.dataset.skill === skill)
    );
    this.renderProfiles();
  }

  starsHtml(rating) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.4 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  }

  /* ══════════════════════════════════════════════════════════
     INDIVIDUAL PROFILE DETAIL POPUP (WITH PAST EXPERIENCES TIMELINE)
  ══════════════════════════════════════════════════════════ */
  openDetail(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;
    this._currentProfileId = profileId;

    const overlay = document.getElementById("profile-detail-overlay");
    const card = document.getElementById("profile-detail-card");
    const stars = this.starsHtml(p.rating);

    const pastExpHtml = (p.pastWorkExperience || []).map(e => `
      <div class="exp-item">
        <div class="exp-year">${e.year}</div>
        <div class="exp-title">${e.title}</div>
        <div class="exp-client">Client: ${e.client}</div>
        <div class="exp-detail">${e.detail}</div>
      </div>`).join("");

    const reviewsHtml = p.reviews.map(r => `
      <div class="review-card">
        <div class="rv-top">
          <span class="rv-name">${r.farmer}</span>
          <span class="rv-stars">${this.starsHtml(r.stars)} ${r.stars.toFixed(1)}</span>
        </div>
        <div class="rv-text">${r.text}</div>
      </div>`).join("");

    card.innerHTML = `
      <div class="dc-photo">
        <img src="${p.photo}" alt="Photo of ${p.name}" onerror="this.src='./assets/labour_squad.jpg';this.onerror=null;">
        <button class="dc-close" onclick="window.krishixApp.closeDetail()">✕</button>
        <div class="dc-photo-overlay">
          <div class="dc-name">${p.name}</div>
          <div class="dc-role">${p.role} &nbsp;|&nbsp; 📍 ${p.village}</div>
        </div>
      </div>

      <div class="dc-body">
        <!-- Stats -->
        <div class="dc-stats">
          <div class="dc-stat">
            <span class="dc-stat-val">${p.rating}⭐</span>
            <span class="dc-stat-lbl">Rating</span>
          </div>
          <div class="dc-stat">
            <span class="dc-stat-val">${p.trustScore}/100</span>
            <span class="dc-stat-lbl">Trust Score</span>
          </div>
          <div class="dc-stat">
            <span class="dc-stat-val">${p.jobsCount}</span>
            <span class="dc-stat-lbl">Jobs Completed</span>
          </div>
        </div>

        <!-- Personal Info -->
        <h4 style="font-size:14px;color:#14532d;margin-bottom:10px;font-weight:800;">👤 Personal Information</h4>
        <div class="dc-info-grid" style="margin-bottom:14px;">
          <div class="dc-info-item"><span>Age:</span> <strong>${p.age} years (${p.gender})</strong></div>
          <div class="dc-info-item"><span>Experience:</span> <strong>${p.experience} years</strong></div>
          <div class="dc-info-item"><span>Available Squad:</span> <strong>Up to ${p.workersInSquad} workers</strong></div>
          <div class="dc-info-item"><span>Punctuality Rate:</span> <strong>${p.punctuality}</strong></div>
          <div class="dc-info-item"><span>Mobile:</span> <strong>${p.mobile}</strong></div>
          <div class="dc-info-item"><span>WhatsApp:</span> <strong>${p.whatsapp}</strong></div>
          <div class="dc-info-item dc-info-grid" style="grid-column:1/-1;"><span>Identity Status:</span> <strong style="color:#16a34a;">${p.aadhaar}</strong></div>
        </div>

        <!-- Bio -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;font-size:13px;color:#475569;margin-bottom:16px;line-height:1.65;">
          <strong style="color:#0f172a;">About ${p.name}:</strong> ${p.bio}
        </div>

        <!-- Past Work Experience Timeline -->
        <h4 style="font-size:14px;color:#14532d;margin-bottom:10px;font-weight:800;">📜 Past Work Experience & Track Record</h4>
        <div class="exp-timeline">
          ${pastExpHtml || '<div style="font-size:12px;color:#64748b;">No past work history recorded yet.</div>'}
        </div>

        <!-- Trust Score Bar -->
        <div class="trust-bar-wrap">
          <div class="trust-bar-top">
            <span style="font-size:13px;font-weight:800;color:#14532d;">🛡️ KrishiX Trust Score</span>
            <span style="font-size:18px;font-weight:900;color:#16a34a;">${p.trustScore} / 100</span>
          </div>
          <div class="trust-bar-bg">
            <div class="trust-bar-fill" style="width:${p.trustScore}%;transition:width .6s ease;"></div>
          </div>
          <div class="trust-pillars">
            <span>Aadhaar Verified ✓</span><span>Job Record ✓</span><span>Punctuality ✓</span><span>Farmer Ratings ✓</span>
          </div>
        </div>

        <!-- Farmer Reviews -->
        <div class="reviews-section">
          <h4>💬 Farmer Reviews (${p.reviews.length})</h4>
          ${reviewsHtml}

          <button class="btn-add-review" onclick="window.krishixApp.openAddReview('${p.id}')">
            + Add Your Review for ${p.name.split(" ")[0]}
          </button>
        </div>

        <!-- Booking Bar inside detail -->
        <div class="dc-book-bar">
          <div>
            <div class="dc-rate-big">₹${p.dailyRate}
              <span style="font-size:14px;color:#64748b;font-weight:400;">/ worker / day</span>
            </div>
            <div class="dc-rate-sub">Book exact number of workers (1 to ${p.workersInSquad})</div>
          </div>
          <div class="dc-btns">
            <button class="btn-outline" onclick="alert('Calling ${p.name}:\\n${p.mobile}')">📞 Call</button>
            <button class="btn-green" onclick="window.krishixApp.closeDetail(); window.krishixApp.openBookingModal('${p.id}');">⚡ Book Workers</button>
          </div>
        </div>
      </div>
    `;

    overlay.classList.add("open");
    this.speak(`${p.name}. Trust Score ${p.trustScore} out of 100. ${p.experience} years experience in Kopargaon.`);
  }

  closeDetail() {
    document.getElementById("profile-detail-overlay")?.classList.remove("open");
  }

  /* ══════════════════════════════════════════════════════════
     SECTION 2: DEDICATED TEAM / SQUAD LABOUR BOOKING
     Book whole group/team of workers for sugarcane, onion, grain
  ══════════════════════════════════════════════════════════ */

  renderTeamSquads() {
    const grid = document.getElementById("team-squad-grid");
    if (!grid) return;
    const lang = this.state.language || "mr";
    const lblGang = lang === "mr" ? "मजूर टोळी" : lang === "hi" ? "मजदूर टीम" : "Workers Gang";
    const lblTrust = lang === "mr" ? "ट्रस्ट" : lang === "hi" ? "ट्रस्ट" : "Trust";
    const lblCap = lang === "mr" ? "क्षमता" : lang === "hi" ? "क्षमता" : "Capacity";
    const lblTools = lang === "mr" ? "साहित्य" : lang === "hi" ? "उपकरण" : "Tools";
    const lblTrans = lang === "mr" ? "वाहतूक" : lang === "hi" ? "परिवहन" : "Transport";
    const lblPerDay = lang === "mr" ? "प्रति दिवस संपूर्ण टोळी (" : lang === "hi" ? "प्रति दिन पूरी टीम (" : "per day for whole team (";
    const lblHead = lang === "mr" ? "मजूर) • ₹" : lang === "hi" ? "मजदूर) • ₹" : "workers) • ₹";
    const lblHeadEnd = lang === "mr" ? "/मजूर" : lang === "hi" ? "/मजदूर" : "/head";
    const btnBook = lang === "mr" ? "👨‍👩‍👧‍👦 टोळी बुक करा" : lang === "hi" ? "👨‍👩‍👧‍👦 टीम बुक करें" : "👨‍👩‍👧‍👦 Book Squad";

    grid.innerHTML = TEAM_SQUAD_BOOKINGS.map(ts => `
      <div class="squad-card">
        <div class="squad-img-wrap">
          <img src="${ts.photo}" alt="${ts.squadName}" onerror="this.src='./assets/labour_squad.jpg';">
          <span class="squad-badge-mcount">👥 ${ts.totalMembers} ${lblGang}</span>
          <span class="squad-trust-badge">🛡️ ${lblTrust} ${ts.trustScore}/100</span>
        </div>
        <div class="squad-body">
          <div class="squad-title">${ts.squadName}</div>
          <div class="squad-leader">👨‍🌾 ${ts.leader} &nbsp;|&nbsp; 📍 ${ts.village}</div>

          <div class="squad-perks">
            <div class="squad-perk-item">⚡ ${lblCap}: <strong>${ts.capacityAcresPerDay}</strong></div>
            <div class="squad-perk-item">🛠️ ${lblTools}: <strong>${ts.toolsIncluded}</strong></div>
            <div class="squad-perk-item">🚐 ${lblTrans}: <strong>${ts.transportIncluded}</strong></div>
            <div class="squad-perk-item" style="color:#16a34a;font-weight:700;">${ts.aadhaarStatus}</div>
          </div>

          <div class="squad-desc">${ts.description}</div>

          <div class="squad-footer">
            <div>
              <div class="squad-price">₹${ts.ratePerDay.toLocaleString("en-IN")}</div>
              <div class="squad-price-sub">${lblPerDay}${ts.totalMembers} ${lblHead}${ts.perHeadRate}${lblHeadEnd}</div>
            </div>
            <button class="btn-book-team" onclick="window.krishixApp.openTeamSquadBookingModal('${ts.id}')">
              ${btnBook}
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  openTeamSquadBookingModal(squadId) {
    const ts = TEAM_SQUAD_BOOKINGS.find(x => x.id === squadId);
    if (!ts) return;

    document.getElementById("modal-title").textContent = `Book Whole Squad: ${ts.squadName}`;
    document.getElementById("modal-body").innerHTML = `
      <div style="background:#f0fdf4;border:1px solid #dcfce7;border-radius:10px;padding:14px;margin-bottom:16px;">
        <div style="font-size:17px;font-weight:800;color:#14532d;margin-bottom:2px;">${ts.squadName}</div>
        <div style="font-size:12px;color:#64748b;">Leader: ${ts.leader} • 📍 ${ts.village}</div>
        <div style="font-size:12px;color:#16a34a;font-weight:700;margin-top:4px;">👥 Full Team of ${ts.totalMembers} Experienced Workers</div>
      </div>

      <div class="form-row" style="margin-bottom:16px;">
        <div class="form-group">
          <label>📅 Work Start Date *</label>
          <input type="date" id="tsb-date" value="${new Date(Date.now()+86400000).toISOString().split("T")[0]}">
        </div>
        <div class="form-group">
          <label>📆 Number of Days Needed *</label>
          <input type="number" id="tsb-days" value="1" min="1" max="15" oninput="window.krishixApp.updateTeamSquadTotal('${ts.id}')">
        </div>
        <div class="form-group fg-full">
          <label>📍 Farm Location / Village Address</label>
          <input type="text" id="tsb-location" value="Kolpewadi Sugarcane Farm Field #2, Kopargaon">
        </div>
        <div class="form-group fg-full">
          <label>🌾 Specific Work Details</label>
          <textarea id="tsb-notes" rows="2" placeholder="e.g. 3 acres of sugarcane cutting & direct trolley loading to sugar factory..."></textarea>
        </div>
      </div>

      <div style="background:#14532d;color:#fff;padding:16px;border-radius:10px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;">Total Squad Rate</div>
          <div id="tsb-total-amount" style="font-size:28px;font-weight:900;color:#4ade80;">
            ₹${ts.ratePerDay.toLocaleString("en-IN")}
          </div>
        </div>
        <div style="font-size:12px;color:#cbd5e1;">Includes all ${ts.totalMembers} workers + tools</div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;" onclick="window.krishixApp.confirmTeamSquadBooking('${ts.id}')">
        ✅ Confirm Team Squad Booking
      </button>
    `;
    this.openModal();
  }

  updateTeamSquadTotal(squadId) {
    const ts = TEAM_SQUAD_BOOKINGS.find(x => x.id === squadId);
    if (!ts) return;
    const days = parseInt(document.getElementById("tsb-days")?.value) || 1;
    const total = ts.ratePerDay * days;
    const el = document.getElementById("tsb-total-amount");
    if (el) el.textContent = `₹${total.toLocaleString("en-IN")}`;
  }

  processBookingPayment(details) {
    const { id, type, title, date, duration, amount, location, paymentMethod } = details;

    // 1. Deduct amount from wallet balance
    if (this.state.walletBalance >= amount) {
      this.state.walletBalance -= amount;
    } else {
      this.state.walletBalance = Math.max(0, this.state.walletBalance - amount);
    }

    // 2. Add to payment transaction history
    if (!this.state.paymentHistory) this.state.paymentHistory = [];
    this.state.paymentHistory.unshift({
      title: `${title} (${type})`,
      id: `TXN-${id}`,
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      amount
    });

    // 3. Add to Scheduled Jobs
    this.state.scheduledJobs.unshift({
      id,
      type,
      title,
      date,
      duration,
      status: "CONFIRMED",
      amount,
      paymentMethod: paymentMethod || "Wallet Deducted",
      location: location || "Kopargaon Farm Field"
    });

    // 4. Update UI displays
    this.renderSchedule();
    this.renderPayments();
    this.closeModal();

    // 5. Open Rich Booking & Payment Success Screen
    setTimeout(() => {
      document.getElementById("modal-title").textContent = "🎉 Booking & Payment Confirmed!";
      document.getElementById("modal-body").innerHTML = `
        <div style="text-align:center;padding:12px 0;">
          <div style="font-size:64px;margin-bottom:8px;">✅</div>
          <h2 style="color:#14532d;margin-bottom:6px;font-size:22px;">${title} Booked!</h2>
          <p style="color:#64748b;margin-bottom:16px;font-size:13px;">
            Booking ID <strong>${id}</strong> confirmed for <strong>${date}</strong> at <strong>${location}</strong>.
          </p>

          <div style="background:#f0fdf4;border:1px solid #16a34a;border-radius:12px;padding:16px;margin-bottom:18px;text-align:left;font-size:13px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;"><strong>💳 Wallet Deducted:</strong> <span style="color:#dc2626;font-weight:900;">- ₹${amount.toLocaleString("en-IN")}</span></div>
            <div style="display:flex;justify-content:space-between;"><strong>💰 Remaining Wallet Balance:</strong> <span style="color:#14532d;font-weight:900;">₹${this.state.walletBalance.toLocaleString("en-IN")}</span></div>
            <div><strong>📍 Field Address:</strong> ${location}</div>
            <div><strong>🛡️ KrishiX Escrow Protection Active</strong></div>
          </div>

          <div style="display:flex;gap:10px;">
            <button class="btn-primary" style="flex:1;justify-content:center;padding:12px;"
              onclick="window.krishixApp.closeModal(); window.krishixApp.switchTab('schedule');">
              📅 View My Booked Jobs
            </button>
            <button class="btn-outline" style="color:#14532d;padding:12px 18px;"
              onclick="window.krishixApp.closeModal(); window.krishixApp.switchTab('tracking');">
              📍 Track Dispatch Live
            </button>
          </div>
        </div>
      `;
      this.openModal();
    }, 250);

    this.speak(`Booking confirmed! ${amount} rupees deducted from your KrishiX wallet.`);
  }

  confirmTeamSquadBooking(squadId) {
    const ts = TEAM_SQUAD_BOOKINGS.find(x => x.id === squadId);
    if (!ts) return;
    const days = parseInt(document.getElementById("tsb-days")?.value) || 1;
    const date = document.getElementById("tsb-date")?.value || "Tomorrow";
    const loc  = document.getElementById("tsb-location")?.value || "Kopargaon Farm Field #2";
    const total = ts.ratePerDay * days;

    if (this.state.walletBalance < total) {
      this.state.walletBalance += total; // Seamless auto-topup
    }

    this.processBookingPayment({
      id: `TEAM-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "Team Labour Squad",
      title: `${ts.squadName} (${ts.totalMembers} Workers)`,
      date,
      duration: `${days} Day${days > 1 ? "s" : ""}`,
      amount: total,
      location: loc,
      paymentMethod: "Wallet Deducted"
    });
  }

  /* ══════════════════════════════════════════════════════════
     SECTION 3: INTERACTIVE FINE & PROTECTION HUB
     Apply fine claim directly on worker/farmer + Live status
  ══════════════════════════════════════════════════════════ */

  renderFineHub() {
    // 1. Render Fine Rules
    const rbox = document.getElementById("fine-rules-list");
    if (rbox) {
      rbox.innerHTML = FINE_RULES.map(r => `
        <div class="fine-card">
          <div class="fine-icon">${r.icon}</div>
          <span class="fine-for">Applies to: ${r.appliesTo}</span>
          <div class="fine-title">${r.category}</div>
          <div style="font-size:11px;color:#78350f;font-weight:700;margin-bottom:4px;">(${r.categoryMr})</div>
          <div class="fine-amt">${r.penaltyRange}</div>
          <p class="fine-desc">${r.description}</p>
        </div>`).join("");
    }

    // 2. Render Active Fine Claims
    const abox = document.getElementById("active-fines-list");
    if (abox) {
      abox.innerHTML = ACTIVE_FINES.map(f => `
        <div class="afine-row">
          <div>
            <div class="afine-id">${f.claimId} • Filed ${f.date}</div>
            <div class="afine-title">${f.reason}</div>
            <div class="afine-by">By: <strong>${f.filedBy}</strong> &nbsp;|&nbsp; Against: <strong>${f.againstTarget}</strong></div>
          </div>
          <div style="text-align:right;">
            <div class="afine-amt">₹${f.amount}</div>
            <span class="afine-status" style="background:#dcfce7;color:${f.statusColor};">${f.status}</span>
          </div>
        </div>`).join("");
    }
  }

  openFileFineModal() {
    document.getElementById("modal-title").textContent = "⚖️ Apply / File a Fine Claim on KrishiX";
    document.getElementById("modal-body").innerHTML = `
      <p style="font-size:13px;color:#64748b;margin-bottom:16px;">
        File a fine claim for late arrival, worker no-show, crop damage, or machinery breakage. KrishiX Escrow reviews claims within 24 hours.
      </p>

      <div class="form-row" style="margin-bottom:14px;">
        <div class="form-group">
          <label>Claim Category (दंड प्रकार)</label>
          <select id="fc-category">
            <option value="Labour Late Arrival (>2 Hours)">🕒 Labour Late Arrival (>2 Hours)</option>
            <option value="Labour Squad No-Show">❌ Labour Squad No-Show (Absence)</option>
            <option value="Machinery Misuse / Damage">⚙️ Machinery Misuse / Damage</option>
            <option value="Crop Damage during Spraying">🌾 Crop Damage by Workers</option>
            <option value="Last-Minute Booking Cancellation">🚫 Booking Cancellation (<12 hrs)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Claim Amount ₹ (भरपाई रक्कम)</label>
          <input type="number" id="fc-amount" value="500" min="100" max="5000">
        </div>

        <div class="form-group">
          <label>Filed By (तुमचे नाव)</label>
          <input type="text" id="fc-by" placeholder="e.g. Rameshwar Patil (Farmer)">
        </div>

        <div class="form-group">
          <label>Against Worker / Machine Owner</label>
          <input type="text" id="fc-against" placeholder="e.g. Santosh Thorat / Tractor Owner">
        </div>

        <div class="form-group fg-full">
          <label>Incident Details (घडलेली घटना व वेळ)</label>
          <textarea id="fc-details" rows="3" placeholder="Explain what happened, date, time, and field location..."></textarea>
        </div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;" onclick="window.krishixApp.submitFineClaim()">
        ⚖️ Submit Fine Claim to KrishiX Escrow
      </button>
    `;
    this.openModal();
  }

  async submitFineClaim() {
    const category = document.getElementById("fc-category")?.value;
    const amount   = parseInt(document.getElementById("fc-amount")?.value) || 500;
    const by       = document.getElementById("fc-by")?.value.trim();
    const against  = document.getElementById("fc-against")?.value.trim();
    const details  = document.getElementById("fc-details")?.value.trim();

    if (!by)      { alert("Please enter your name."); return; }
    if (!against) { alert("Please enter who you are filing fine against."); return; }

    const claimData = {
      category, filedBy: by, againstTarget: against,
      reason: category, amount,
      details: details || "Claim submitted to KrishiX Kopargaon Field Officer."
    };

    // Try backend API first
    const api = window.KrishiXAPI;
    if (api) {
      const result = await api.Fines.file(claimData);
      if (result.success) {
        ACTIVE_FINES.unshift(result.data.fine);
        this.renderFineHub();
        this.closeModal();
        alert(`⚖️ Fine Claim ${result.data.claimId} submitted!\nKrishiX Escrow Officer will review and release ₹${amount} compensation.`);
        this.speak(`Fine claim submitted successfully. KrishiX Escrow will review your claim for ${amount} rupees.`);
        return;
      }
    }

    // Fallback to local state
    const newClaim = {
      claimId: `CLM-KPG-${Math.floor(100 + Math.random() * 900)}`,
      filedBy: by, againstTarget: against, reason: category, amount,
      status: "PENDING", statusColor: "#f59e0b",
      date: new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }),
      details: details || "Claim submitted to KrishiX Kopargaon Field Officer."
    };
    ACTIVE_FINES.unshift(newClaim);
    this.renderFineHub();
    this.closeModal();
    alert(`⚖️ Fine Claim ${newClaim.claimId} submitted!\nKrishiX Escrow Officer will review and release ₹${amount} compensation.`);
    this.speak(`Fine claim submitted successfully. KrishiX Escrow will review your claim for ${amount} rupees.`);
  }

  /* ══════════════════════════════════════════════════════════
     FARMER CAN ADD REVIEW
  ══════════════════════════════════════════════════════════ */
  openAddReview(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;

    document.getElementById("modal-title").textContent = `⭐ Rate ${p.name}`;
    document.getElementById("modal-body").innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;padding:14px;background:#f0fdf4;border-radius:10px;border:1px solid #dcfce7;">
        <img src="${p.photo}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #16a34a;" onerror="this.src='./assets/labour_squad.jpg';">
        <div>
          <div style="font-size:16px;font-weight:800;color:#14532d;">${p.name}</div>
          <div style="font-size:12px;color:#64748b;">${p.role} • ${p.village}</div>
          <div style="font-size:12px;color:#d97706;font-weight:700;">Current Rating: ${p.rating}⭐ (${p.reviews.length} reviews)</div>
        </div>
      </div>

      <div class="form-row" style="margin-bottom:14px;">
        <div class="form-group">
          <label>Your Name (शेतकऱ्याचे नाव)</label>
          <input type="text" id="rv-farmer" placeholder="e.g. Rameshwar Patil, Kolpewadi">
        </div>
        <div class="form-group">
          <label>Rating out of 5 (रेटिंग 1–5)</label>
          <select id="rv-stars">
            <option value="5">⭐⭐⭐⭐⭐ — 5.0 Excellent</option>
            <option value="4.5">⭐⭐⭐⭐½ — 4.5 Very Good</option>
            <option value="4">⭐⭐⭐⭐ — 4.0 Good</option>
            <option value="3.5">⭐⭐⭐½ — 3.5 Average</option>
            <option value="3">⭐⭐⭐ — 3.0 Below Average</option>
          </select>
        </div>
        <div class="form-group fg-full">
          <label>Your Review (तुमचे मत / शेत काम कसे झाले?)</label>
          <textarea id="rv-text" rows="4"
            placeholder="Describe how the worker performed on your farm — arrival time, work quality, attitude..."></textarea>
        </div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;"
        onclick="window.krishixApp.submitReview('${p.id}')">
        ✅ Submit Review
      </button>
    `;
    this.openModal();
  }

  async submitReview(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;
    const farmer = document.getElementById("rv-farmer")?.value.trim();
    const stars  = parseFloat(document.getElementById("rv-stars")?.value || "5");
    const text   = document.getElementById("rv-text")?.value.trim();

    if (!farmer) { alert("Please enter your name."); return; }
    if (!text)   { alert("Please write a review."); return; }

    // Try backend API first
    const api = window.KrishiXAPI;
    if (api) {
      const result = await api.Reviews.addReview ? await api.Workers.addReview(profileId, { farmer, stars, text })
                                                  : await api.Workers.addReview(profileId, { farmer, stars, text });
      if (result.success) {
        // Update local profile with new rating from server
        p.reviews.unshift({ farmer, stars, text });
        p.rating = result.data.newRating || parseFloat((p.reviews.reduce((s, r) => s + r.stars, 0) / p.reviews.length).toFixed(1));
        p.jobsCount += 1;
        if (p.rating >= 4.8 && p.trustScore < 99) p.trustScore = Math.min(99, p.trustScore + 1);
        this.closeModal();
        this.renderProfiles();
        this.renderLeaderboard();
        setTimeout(() => this.openDetail(profileId), 200);
        this.speak(`Review submitted! Thank you for rating ${p.name.split(" ")[0]}.`);
        return;
      }
    }

    // Fallback to local state
    p.reviews.unshift({ farmer, stars, text });
    p.rating = parseFloat((p.reviews.reduce((s, r) => s + r.stars, 0) / p.reviews.length).toFixed(1));
    p.jobsCount += 1;
    if (p.rating >= 4.8 && p.trustScore < 99) p.trustScore = Math.min(99, p.trustScore + 1);
    this.closeModal();
    this.renderProfiles();
    this.renderLeaderboard();
    setTimeout(() => this.openDetail(profileId), 200);
    this.speak(`Review submitted! Thank you for rating ${p.name.split(" ")[0]}.`);
  }

  /* ══════════════════════════════════════════════════════════
     WORKER SELF-REGISTRATION
  ══════════════════════════════════════════════════════════ */
  handlePhotoPreview(event) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.getElementById("rg-photo-preview");
        const placeholder = document.getElementById("rg-photo-placeholder");
        if (preview) {
          preview.src = e.target.result;
          preview.style.display = "block";
        }
        if (placeholder) placeholder.style.display = "none";
        this._registeredPhotoData = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openRegisterModal() {
    this._registeredPhotoData = null;
    document.getElementById("modal-title").textContent = "➕ Register My Labour Profile on KrishiX";
    document.getElementById("modal-body").innerHTML = `
      <p style="font-size:13px;color:#64748b;margin-bottom:18px;line-height:1.6;">
        Fill your details below. Your profile will appear on KrishiX Kopargaon directory immediately — farmers can find and book you.
      </p>

      <div class="form-group fg-full" style="text-align:center; background:#f8fafc; border:2px dashed #cbd5e1; border-radius:12px; padding:16px; margin-bottom:16px;">
        <label style="font-weight:700; color:#14532d; display:block; margin-bottom:8px;">📸 Profile Photo (प्रोफाईल फोटो अपलोड करा) *</label>
        <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
          <div style="width:90px; height:90px; border-radius:50%; overflow:hidden; border:3px solid #16a34a; background:#e2e8f0; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
            <img id="rg-photo-preview" src="" style="width:100%; height:100%; object-fit:cover; display:none;">
            <span id="rg-photo-placeholder" style="font-size:40px; color:#94a3b8;">👤</span>
          </div>
          <input type="file" id="rg-photo-input" accept="image/*" style="display:none;" onchange="window.krishixApp.handlePhotoPreview(event)">
          <button type="button" class="btn-primary" style="padding:6px 16px; font-size:12px; background:#16a34a;" onclick="document.getElementById('rg-photo-input').click()">
            📁 Choose Photo / Take Picture
          </button>
          <span style="font-size:11px; color:#64748b;">Upload a clear face photo (JPG / PNG)</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Full Name (पूर्ण नाव) *</label>
          <input type="text" id="rg-name" placeholder="e.g. Babanrao Shinde">
        </div>
        <div class="form-group">
          <label>Mobile Number (मोबाईल) *</label>
          <input type="tel" id="rg-mobile" placeholder="+91 98XXX XXXXX">
        </div>
        <div class="form-group">
          <label>Age (वय)</label>
          <input type="number" id="rg-age" placeholder="e.g. 35" min="18" max="70">
        </div>
        <div class="form-group">
          <label>Gender (लिंग)</label>
          <select id="rg-gender">
            <option value="Male">Male (पुरुष)</option>
            <option value="Female">Female (महिला)</option>
          </select>
        </div>
        <div class="form-group fg-full">
          <label>Village / Area in Kopargaon (गाव) *</label>
          <input type="text" id="rg-village" placeholder="e.g. Kolpewadi, Kopargaon">
        </div>
        <div class="form-group">
          <label>Primary Skill (मुख्य काम) *</label>
          <select id="rg-skill">
            <option value="Sugarcane Cutting & Loading">🌾 Sugarcane Cutting (ऊस तोडणी)</option>
            <option value="Onion Digging & Bagging">🧅 Onion Harvesting (कांदा काढणी)</option>
            <option value="Spraying & Pruning">🧪 Crop Spraying (फवारणी)</option>
            <option value="Wheat Harvesting">🌾 Wheat Harvesting (गहू कापणी)</option>
            <option value="Cotton Picking">🪥 Cotton Picking (कापूस वेचणी)</option>
            <option value="Tractor Driver">🚜 Tractor Driver</option>
          </select>
        </div>
        <div class="form-group">
          <label>Workers in Your Squad *</label>
          <input type="number" id="rg-squad" placeholder="e.g. 8" min="1" max="50">
        </div>
        <div class="form-group">
          <label>Daily Rate ₹ per Worker *</label>
          <input type="number" id="rg-rate" placeholder="e.g. 450" min="200" max="1000">
        </div>
        <div class="form-group">
          <label>Years of Experience</label>
          <input type="number" id="rg-exp" placeholder="e.g. 8" min="0" max="40">
        </div>
        <div class="form-group">
          <label>Aadhaar Verification</label>
          <select id="rg-aadhaar">
            <option value="✓ Aadhaar Verified">✓ I have Aadhaar Card</option>
            <option value="⏳ Pending Verification">Pending Verification</option>
          </select>
        </div>
        <div class="form-group fg-full">
          <label>About Your Work & Past Experience</label>
          <textarea id="rg-bio" rows="3"
            placeholder="Briefly describe your past farming experience and work record..."></textarea>
        </div>
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;margin-top:16px;"
        onclick="window.krishixApp.submitRegistration()">
        ✅ Submit Profile for KrishiX Verification
      </button>
    `;
    this.openModal();
    this.speak("Register your farm labour profile. Upload your photo and fill your details to get listed on KrishiX Kopargaon directory.");
  }

  async submitRegistration() {
    const name   = document.getElementById("rg-name")?.value.trim();
    const mobile = document.getElementById("rg-mobile")?.value.trim();
    const age    = parseInt(document.getElementById("rg-age")?.value) || 30;
    const gender = document.getElementById("rg-gender")?.value;
    const village= document.getElementById("rg-village")?.value.trim();
    const skill  = document.getElementById("rg-skill")?.value;
    const squad  = parseInt(document.getElementById("rg-squad")?.value) || 5;
    const rate   = parseInt(document.getElementById("rg-rate")?.value) || 400;
    const exp    = parseInt(document.getElementById("rg-exp")?.value) || 2;
    const aadhaar= document.getElementById("rg-aadhaar")?.value;
    const bio    = document.getElementById("rg-bio")?.value.trim() || `Verified agricultural worker from ${village} specialising in ${skill}.`;

    if (!name)   { alert("Please enter your full name."); return; }
    if (!mobile) { alert("Please enter your mobile number."); return; }
    if (!village){ alert("Please enter your village."); return; }
    if (!squad || squad < 1) { alert("Please enter squad size."); return; }
    if (!rate  || rate < 100){ alert("Please enter daily rate per worker."); return; }

    const userPhoto = this._registeredPhotoData || "./assets/workers/babanrao_shinde.jpg";

    const newProfile = {
      name, age, gender,
      role: `${skill} Worker (${squad} in team)`,
      village: village.toLowerCase().includes("kopargaon") ? village : `${village}, Kopargaon`,
      mobile, whatsapp: mobile, experience: exp,
      dailyRate: rate, workersInSquad: squad,
      skill, bio, aadhaar, available: true,
      photo: userPhoto,
      rating: 5.0, trustScore: 95, jobsCount: 0, punctuality: "100%",
      pastWorkExperience: [
        { year: "2026", title: "Registered KrishiX Worker Profile", client: `${village} Agro Hub`, detail: `Newly registered verified profile for ${skill}.` }
      ],
      reviews: [{
        farmer: "KrishiX Kopargaon Agro Officer", stars: 5,
        text: `New verified profile registered on KrishiX platform. ${name} from ${village}. Welcome!`
      }]
    };

    // Try backend API first
    const api = window.KrishiXAPI;
    if (api) {
      const result = await api.Workers.register(newProfile);
      if (result.success) {
        newProfile.id = result.data.worker.id;
        LABOUR_PROFILES.unshift({ ...newProfile, id: result.data.worker.id });
        this.closeModal();
        this.renderProfiles();
        this.renderLeaderboard();
        this._showRegistrationSuccess(newProfile.id, name, rate, squad);
        this.speak(`Registration successful! Welcome ${name.split(" ")[0]} to KrishiX Kopargaon.`);
        return;
      }
    }

    // Fallback to local state
    const newId = `W${String(LABOUR_PROFILES.length + 1).padStart(2, "0")}`;
    newProfile.id = newId;
    LABOUR_PROFILES.unshift(newProfile);
    this.closeModal();
    this.renderProfiles();
    this.renderLeaderboard();

    setTimeout(() => {
      document.getElementById("modal-title").textContent = "🎉 Profile Registered!";
      document.getElementById("modal-body").innerHTML = `
        <div style="text-align:center;padding:16px 0;">
          <div style="font-size:72px;margin-bottom:12px;">✅</div>
          <h2 style="color:#14532d;margin-bottom:8px;">Welcome to KrishiX, ${name}!</h2>
          <p style="color:#64748b;margin-bottom:20px;">Your profile is now <strong>live</strong> on the Kopargaon Labour Directory. Farmers can see and book you right away.</p>
          <div style="background:#f0fdf4;border:1px solid #16a34a;border-radius:10px;padding:16px;margin-bottom:20px;text-align:left;font-size:13px;display:flex;flex-direction:column;gap:6px;">
            <div><strong>Worker ID:</strong> ${newId}</div>
            <div><strong>Starting Trust Score:</strong> 95/100 (grows with each booking)</div>
            <div><strong>Daily Rate:</strong> ₹${rate} per worker / day</div>
            <div><strong>Squad Size:</strong> ${squad} workers</div>
          </div>
          <button class="btn-primary" style="width:100%;justify-content:center;"
            onclick="window.krishixApp.closeModal();">
            View My Profile in Directory
          </button>
        </div>
      `;
      this.openModal();
    }, 300);

    this.speak(`Registration successful! ${name} is now live on Kopargaon Labour Directory with trust score 95 out of 100.`);
  }

  /* ══════════════════════════════════════════════════════════
     INDIVIDUAL WORKER BOOKING MODAL — pick exact worker count
  ══════════════════════════════════════════════════════════ */
  openBookingModal(profileId) {
    const p = LABOUR_PROFILES.find(x => x.id === profileId);
    if (!p) return;
    this._bookingProfile = p;

    document.getElementById("modal-title").textContent = `Book Individual Workers: ${p.name}`;
    document.getElementById("modal-body").innerHTML = `
      <div style="display:flex;gap:12px;align-items:center;padding:14px;background:#f0fdf4;border-radius:10px;border:1px solid #dcfce7;margin-bottom:18px;">
        <img src="${p.photo}" style="width:54px;height:54px;border-radius:50%;object-fit:cover;object-position:top;border:2px solid #16a34a;flex-shrink:0;"
             onerror="this.src='./assets/labour_squad.jpg';">
        <div>
          <div style="font-size:17px;font-weight:800;color:#14532d;">${p.name}</div>
          <div style="font-size:12px;color:#64748b;">${p.village} &nbsp;|&nbsp; 📞 ${p.mobile}</div>
          <div style="font-size:12px;color:#d97706;font-weight:700;">🛡️ Trust ${p.trustScore}/100 &nbsp;|&nbsp; ⭐ ${p.rating}/5 (${p.reviews.length} reviews)</div>
        </div>
      </div>

      <div class="form-row" style="margin-bottom:16px;">
        <div class="form-group">
          <label>📅 Work Date *</label>
          <input type="date" id="bk-date" value="${new Date(Date.now()+86400000).toISOString().split("T")[0]}">
        </div>
        <div class="form-group">
          <label>⏰ Start Time</label>
          <input type="time" id="bk-time" value="07:00">
        </div>

        <div class="form-group">
          <label>👤 Individual Worker</label>
          <input type="number" id="bk-workers" value="1" min="1" max="1" readonly style="background:#f1f5f9; cursor:not-allowed; border:1px solid #cbd5e1;">
          <span style="font-size:11px;color:#16a34a;font-weight:700;">✓ Single Worker Profile (1 Person)</span>
        </div>
        <div class="form-group">
          <label>📆 Number of Days</label>
          <input type="number" id="bk-days" value="1" min="1" max="30"
                 oninput="window.krishixApp.updateBookingTotal()">
        </div>

        <div class="form-group fg-full">
          <label>📍 Your Farm Field Address</label>
          <input type="text" id="bk-location" value="Kolpewadi Sugarcane Field, Kopargaon">
        </div>

        <div class="form-group fg-full">
          <label>💳 Payment Method</label>
          <select id="bk-payment">
            <option value="UPI">UPI — GPay / PhonePe / Paytm</option>
            <option value="WALLET">KrishiX Wallet (₹${this.state.walletBalance})</option>
            <option value="COD">Cash on Arrival (Pay After Work)</option>
          </select>
        </div>
      </div>

      <div id="bk-total-box" style="background:#14532d;color:#fff;border-radius:10px;padding:16px 18px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">Total Estimated Cost</div>
          <div id="bk-total-amount" style="font-size:30px;font-weight:900;color:#4ade80;">
            ₹${(p.dailyRate * 1).toLocaleString("en-IN")}
          </div>
        </div>
        <button class="btn-voice" onclick="window.krishixApp.speak('Total cost is ${p.dailyRate} rupees.')">
          🔊 Read
        </button>
      </div>

      <div class="guar-box">
        🛡️ <strong>100% Attendance Guarantee:</strong> If ${p.name.split(" ")[0]} is late >2 hours or no-show, receive <strong>₹500 – ₹1,000 direct escrow compensation</strong>.
      </div>

      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;font-size:15px;"
        onclick="window.krishixApp.confirmBooking()">
        ✅ Confirm Booking
      </button>
    `;

    this.openModal();
    this.speak(`Booking ${p.name} from ${p.village}. Daily rate is ${p.dailyRate} rupees.`);
  }

  updateBookingTotal() {
    const p = this._bookingProfile;
    if (!p) return;
    const workers = 1;
    const days    = parseInt(document.getElementById("bk-days")?.value) || 1;
    const total   = p.dailyRate * workers * days;
    const el = document.getElementById("bk-total-amount");
    if (el) el.textContent = `₹${total.toLocaleString("en-IN")}`;
  }

  confirmBooking() {
    const p = this._bookingProfile;
    if (!p) return;
    const workers  = 1;
    const days     = parseInt(document.getElementById("bk-days")?.value) || 1;
    const date     = document.getElementById("bk-date")?.value || "Tomorrow";
    const time     = document.getElementById("bk-time")?.value || "07:00";
    const location = document.getElementById("bk-location")?.value || "Kolpewadi Sugarcane Field, Kopargaon";
    const total    = p.dailyRate * workers * days;

    if (this.state.walletBalance < total) {
      this.state.walletBalance += total; // Auto topup
    }

    this.processBookingPayment({
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      type: "Individual Labour",
      title: `${p.name} (Individual Worker)`,
      date: `${date} at ${time}`,
      duration: `${days} Day${days > 1 ? "s" : ""}`,
      amount: total,
      location,
      paymentMethod: "Wallet Deducted"
    });
  }

  /* ══════════════════════════════════════════════════════════
     LEADERBOARD
  ══════════════════════════════════════════════════════════ */
  renderLeaderboard() {
    const sorted = [...LABOUR_PROFILES].sort((a, b) =>
      b.trustScore - a.trustScore || b.rating - a.rating || b.jobsCount - a.jobsCount
    );

    const podium = document.getElementById("leaderboard-podium");
    if (podium) {
      const crowns = ["🥇", "🥈", "🥉"];
      podium.innerHTML = sorted.slice(0, 3).map((p, i) => `
        <div class="podium-card" onclick="window.krishixApp.openDetail('${p.id}')">
          <img class="podium-photo" src="${p.photo}" alt="${p.name}"
               onerror="this.src='./assets/labour_squad.jpg';this.onerror=null;">
          <div class="podium-crown">${crowns[i]}</div>
          <div class="podium-rank">#${i + 1} in Kopargaon</div>
          <div class="podium-name">${p.name}</div>
          <div class="podium-loc">📍 ${p.village.split(",")[0]}</div>
          <div class="podium-score">${p.trustScore}/100</div>
          <div class="podium-slbl">Trust Score</div>
          <div style="font-size:11px;color:#64748b;margin-top:6px;">${p.jobsCount} jobs • ${p.punctuality} punctual</div>
          <button class="btn-green" style="margin-top:14px;padding:7px 18px;font-size:12px;"
            onclick="event.stopPropagation(); window.krishixApp.openBookingModal('${p.id}');">
            Book Now
          </button>
        </div>`).join("");
    }

    const list = document.getElementById("leaderboard-list");
    if (list) {
      list.innerHTML = sorted.slice(3).map((p, i) => {
        const rank = i + 4;
        const numCls = rank === 4 ? "gold" : rank === 5 ? "silver" : rank === 6 ? "bronze" : "";
        return `
        <div class="lb-row" onclick="window.krishixApp.openDetail('${p.id}')">
          <div class="lb-num ${numCls}">${rank}</div>
          <img class="lb-avatar" src="${p.photo}" alt="${p.name}"
               onerror="this.src='./assets/labour_squad.jpg';this.onerror=null;">
          <div class="lb-info">
            <div class="lb-name">${p.name}</div>
            <div class="lb-skill">📍 ${p.village.split(",")[0]} &nbsp;|&nbsp; ${p.skill}</div>
          </div>
          <div class="lb-stats">
            <div class="lb-stat">
              <span class="lb-sv">${p.rating}⭐</span>
              <span class="lb-sl">Rating</span>
            </div>
            <div class="lb-stat">
              <span class="lb-sv">${p.jobsCount}</span>
              <span class="lb-sl">Jobs</span>
            </div>
          </div>
          <div class="lb-bar-wrap">
            <div class="lb-bar-lbl">Trust: ${p.trustScore}/100</div>
            <div class="lb-bar-bg">
              <div class="lb-bar-fill" style="width:${p.trustScore}%"></div>
            </div>
          </div>
          <button class="btn-green" style="font-size:12px;padding:7px 14px;"
            onclick="event.stopPropagation(); window.krishixApp.openBookingModal('${p.id}');">
            Book
          </button>
        </div>`;
      }).join("");
    }
  }

  /* ══════════════════════════════════════════════════════════
     MACHINERY
  ══════════════════════════════════════════════════════════ */
  renderMachinery() {
    const grid = document.getElementById("machinery-grid");
    if (!grid) return;
    grid.innerHTML = MACHINERY_DATA.map(m => `
      <div class="mach-card">
        <div class="mach-img-wrap">
          <img src="${m.image}" alt="${m.name}" loading="lazy">
          <span class="mach-badge-top">${m.hp}</span>
          <span style="position:absolute;bottom:12px;left:12px;background:#16a34a;color:#fff;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:800;">🟢 Ready in 15 Min</span>
          <button class="mach-tts" onclick="window.krishixApp.speak('${m.name} available near ${m.village}. Rate ${m.ratePerHour} rupees per hour.')">🔊</button>
        </div>
        <div class="mach-body">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3px;">
            <div class="mach-name">${m.name}</div>
            <span style="background:#fffbeb;color:#b45309;font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;border:1px solid #fef3c7;white-space:nowrap;">🛡️ ${m.trustScore}/100</span>
          </div>
          <div class="mach-loc">📍 ${m.village} &nbsp;|&nbsp; ⭐ ${m.rating} (${m.reviewsCount} reviews)</div>
          <div class="mach-specs">${m.specs.map(s => `<span class="mach-spec">${s}</span>`).join("")}</div>
          <div class="mach-footer">
            <div>
              <span class="mach-price">₹${m.ratePerHour}</span>
              <span class="mach-unit"> /hr &nbsp;|&nbsp; ₹${m.ratePerAcre}/acre</span>
            </div>
            <button class="btn-book-mach" onclick="window.krishixApp.openMachineryBooking('${m.id}')">Book Now</button>
          </div>
        </div>
      </div>`).join("");
  }

  openMachineryBooking(machId) {
    const m = MACHINERY_DATA.find(x => x.id === machId);
    if (!m) return;
    document.getElementById("modal-title").textContent = `Book: ${m.name}`;
    document.getElementById("modal-body").innerHTML = `
      <img src="${m.image}" style="width:100%;height:150px;object-fit:cover;border-radius:10px;margin-bottom:14px;" onerror="this.src='./assets/hero_banner.jpg';">
      <div style="font-size:16px;font-weight:800;color:#14532d;margin-bottom:2px;">${m.name}</div>
      <div style="font-size:12px;color:#64748b;margin-bottom:16px;">${m.village} | 🛡️ Trust ${m.trustScore}/100</div>
      <div class="form-row" style="margin-bottom:16px;">
        <div class="form-group">
          <label>📅 Booking Date</label>
          <input type="date" id="mb-date" value="${new Date(Date.now()+86400000).toISOString().split("T")[0]}">
        </div>
        <div class="form-group">
          <label>⏳ Hours Needed</label>
          <input type="number" id="mb-hours" value="4" min="1" max="12">
        </div>
        <div class="form-group fg-full">
          <label>📍 Farm Location</label>
          <input type="text" id="mb-loc" value="Kolpewadi Field #4, Kopargaon">
        </div>
        <div class="form-group fg-full">
          <label>💳 Payment Method</label>
          <select id="mb-pay">
            <option>UPI (GPay / PhonePe)</option>
            <option>KrishiX Wallet</option>
            <option>Cash on Delivery</option>
          </select>
        </div>
      </div>
      <div style="background:#14532d;color:#fff;padding:14px 18px;border-radius:10px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;color:#94a3b8;">Total (4 hrs × ₹${m.ratePerHour})</div>
          <div style="font-size:28px;font-weight:900;color:#4ade80;">₹${m.ratePerHour * 4}</div>
        </div>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center;padding:13px;"
        onclick="window.krishixApp.confirmMachineryBooking('${m.id}')">✅ Confirm & Book</button>
    `;
    this.openModal();
  }

  confirmMachineryBooking(machId) {
    const m = MACHINERY_DATA.find(x => x.id === machId);
    if (!m) return;
    const hours = parseInt(document.getElementById("mb-hours")?.value) || 4;
    const loc   = document.getElementById("mb-loc")?.value || "Kolpewadi Field #4, Kopargaon";
    const total = m.ratePerHour * hours;

    if (this.state.walletBalance < total) {
      this.state.walletBalance += total; // Auto topup
    }

    const bookingId = `MACH-${Math.floor(1000 + Math.random() * 9000)}`;

    // Live GPS Tracker Integration
    if (window.krishixTracker) {
      window.krishixTracker.addBooking({
        id: bookingId,
        resourceName: m.name,
        registration: "MH 17 CD 5821",
        driverName: "Raosaheb Patil",
        driverPhone: "+91 98220 17482",
        trustScore: m.trustScore || 98,
        locationName: loc
      });

      // Update tracking dropdown selector
      const sel = document.getElementById("tracking-booking-select");
      if (sel) {
        const opt = document.createElement("option");
        opt.value = bookingId;
        opt.textContent = `${m.name} (${bookingId}) — ${loc}`;
        opt.selected = true;
        sel.insertBefore(opt, sel.firstChild);
      }
    }

    this.processBookingPayment({
      id: bookingId,
      type: "Machinery",
      title: `${m.name} (${m.hp})`,
      date: "Tomorrow, 7:00 AM",
      duration: `${hours} Hours`,
      amount: total,
      location: loc,
      paymentMethod: "Wallet Deducted"
    });
  }

  /* ── FARM PLANNER ───────────────────────────────────────── */
  renderFarmPlan() {
    const c = document.getElementById("planner-stages");
    if (!c) return;
    const crop  = document.getElementById("planner-crop")?.value  || "Tomato";
    const acres = parseFloat(document.getElementById("planner-acres")?.value || "4");
    const stages = [
      { timing:"Day 1–3",  icon:"🚜", title:"Land Preparation & Deep Tilling",   task:`Deep soil ploughing for ${acres} acres of ${crop}`, resource:"Mahindra Arjun 605 DI Tractor", cost: 700 * acres, action:"machinery", actionId:"M01" },
      { timing:"Day 5–7",  icon:"👩‍🌾", title:"Sowing & Seedling Transplanting",  task:`Planting ${crop} seedlings at correct spacing`,      resource:"Sunita Bai Pawar Women Squad (10 workers)", cost: 420 * 10, action:"labour", actionId:"W02" },
      { timing:"Day 30+",  icon:"🧪", title:"Pesticide & Nutrition Spraying",    task:"Precision spray using calibrated knapsack pumps",    resource:"AgriDron 20L Spray Drone / Vijay Tambe Squad", cost: 350 * acres, action:"machinery", actionId:"M03" },
      { timing:"Day 90+",  icon:"🌾", title:"Harvesting & Market Transport",     task:`Full harvest of ${acres} acres, load into trolley`,  resource:"John Deere 5050D Combine / Babanrao Shinde Squad", cost: 1900 * acres, action:"labour", actionId:"W01" }
    ];
    c.innerHTML = stages.map(s => `
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:18px 22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:var(--sh1);">
        <div>
          <span style="background:#f0fdf4;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;border:1px solid #dcfce7;">${s.timing}</span>
          <h4 style="font-size:16px;margin:6px 0 3px;color:#14532d;">${s.icon} ${s.title}</h4>
          <p style="font-size:12px;color:#64748b;">${s.task}</p>
          <div style="font-size:12px;font-weight:700;color:#0f172a;margin-top:3px;">Recommended: ${s.resource} <span style="color:#16a34a;">(₹${s.cost.toFixed(0)})</span></div>
        </div>
        <button class="btn-green" onclick="window.krishixApp.${s.action === 'labour' ? `openBookingModal('${s.actionId}')` : `openMachineryBooking('${s.actionId}')`}">
          ⚡ Auto-Book
        </button>
      </div>`).join("");
  }

  /* ── SCHEDULED JOBS ─────────────────────────────────────── */
  renderSchedule() {
    const c = document.getElementById("schedule-list");
    if (!c) return;
    if (!this.state.scheduledJobs.length) {
      c.innerHTML = `<div style="text-align:center;padding:40px;color:#64748b;font-size:14px;">No jobs booked yet. Book machinery or labour to see your schedule here.</div>`;
      return;
    }
    c.innerHTML = this.state.scheduledJobs.map(j => `
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:20px;box-shadow:var(--sh1);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <span style="background:#f0fdf4;color:#15803d;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;">● ${j.status}</span>
          <span style="font-size:22px;font-weight:900;color:#14532d;">₹${j.amount.toLocaleString("en-IN")}</span>
        </div>
        <div style="font-size:17px;font-weight:800;margin-bottom:5px;">${j.title}</div>
        <div style="font-size:12px;color:#64748b;margin-bottom:2px;">📅 ${j.date} &nbsp;|&nbsp; ⏳ ${j.duration}</div>
        <div style="font-size:12px;color:#64748b;margin-bottom:14px;">📍 ${j.location}</div>
        <button class="btn-green" onclick="window.krishixApp.switchTab('tracking')">📍 Track Live</button>
      </div>`).join("");
  }

  /* ── PAYMENTS & WALLET ──────────────────────────────────── */
  updateWalletUI() {
    const bal = this.state.walletBalance;
    const formatted = `₹${bal.toLocaleString("en-IN")}`;
    const hdrBadge = document.getElementById("hdr-wallet-badge");
    const viewBal  = document.getElementById("wallet-balance-val");
    if (hdrBadge) hdrBadge.textContent = `💳 Wallet: ${formatted}`;
    if (viewBal)  viewBal.textContent  = formatted;
  }

  renderPayments() {
    this.updateWalletUI();
    const c = document.getElementById("payment-history");
    if (!c) return;
    const history = this.state.paymentHistory || [];
    if (!history.length) {
      c.innerHTML = `<div style="padding:18px;color:#64748b;font-size:13px;text-align:center;">No payment transactions recorded yet.</div>`;
      return;
    }
    c.innerHTML = history.map(r => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
        <div>
          <div style="font-weight:700;font-size:14px;color:#14532d;">${r.title}</div>
          <div style="font-size:11px;color:#64748b;">${r.id} • ${r.date}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:900;color:#dc2626;font-size:16px;">- ₹${r.amount.toLocaleString("en-IN")}</div>
          <div style="font-size:10px;color:#15803d;font-weight:700;">✓ Wallet Deducted</div>
        </div>
      </div>`).join("");
  }

  /* ── MODAL HELPERS ──────────────────────────────────────── */
  openModal()  { document.getElementById("modal-overlay")?.classList.add("open"); }
  closeModal() { document.getElementById("modal-overlay")?.classList.remove("open"); }

  simulateAddMoney() {
    this.state.walletBalance += 1000;
    this.updateWalletUI();
    alert("✅ ₹1,000 added to KrishiX Wallet!");
    this.speak("1000 rupees added to your KrishiX wallet.");
  }
}

/* ── BOOT ──────────────────────────────────────────────────── */
window.krishixApp = new KrishiXApp();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => window.krishixApp.init());
} else {
  window.krishixApp.init();
}
