/* ============================================================
   KrishiX – Data: 15 Real Kopargaon Labour Profiles,
   Team Squad Bookings, Interactive Fine Claims & Tracking
   ============================================================ */

/* ------------------------------------------------------------------
   REAL DOCUMENTARY FARM WORKER PHOTOS FROM UNSPLASH
   Actual photographs of Indian/South Asian farm workers & rural teams.
   ------------------------------------------------------------------ */
const LABOUR_PHOTOS = {
  W01: "./assets/workers/babanrao_shinde.jpg",
  W02: "./assets/workers/sunita_bai_pawar.jpg",
  W03: "./assets/workers/pandurang_chavan.jpg",
  W04: "./assets/workers/dnyaneshwar_kale.jpg",
  W05: "./assets/workers/vijay_tambe.jpg",
  W06: "./assets/workers/anita_bai_more.jpg",
  W07: "./assets/workers/raosaheb_deshmukh.jpg",
  W08: "./assets/workers/santosh_thorat.jpg",
  W09: "./assets/workers/rukmini_devi_shinde.jpg",
  W10: "./assets/workers/eknath_jadhav.jpg",
  W11: "./assets/workers/govinda_kamble.jpg",
  W12: "./assets/workers/mangal_bai_waghmare.jpg",
  W13: "./assets/workers/bhimrao_salunke.jpg",
  W14: "./assets/workers/nanda_bai_sutar.jpg",
  W15: "./assets/workers/lakshman_bhosale.jpg"
};

/* ------------------------------------------------------------------
   15 INDIVIDUAL LABOUR PROFILES (WITH PAST WORK EXPERIENCE & HISTORY)
   ------------------------------------------------------------------ */
const LABOUR_PROFILES = [
  {
    id: "W01",
    name: "Babanrao Shinde",
    age: 42,
    gender: "Male",
    role: "Sugarcane Cutting Squad Leader",
    village: "Sanjivani Factory Road, Kopargaon",
    mobile: "+91 98904 12345",
    whatsapp: "+91 98904 12345",
    experience: 15,
    dailyRate: 480,
    workersInSquad: 12,
    skill: "Sugarcane Cutting & Loading",
    bio: "Expert sugarcane cutting squad operating in Kopargaon, Kolpewadi & Rahata for 15+ years. 12 experienced male & female workers. Specialises in cane cutting, earthing, and trolley loading.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W01,
    rating: 5.0,
    trustScore: 99,
    jobsCount: 142,
    punctuality: "99.8%",
    pastWorkExperience: [
      { year: "2025–2026", title: "Harvested 48 Acres Sugarcane", client: "Sanjivani Sahakari Sakhar Karkhana, Kopargaon", detail: "Completed full cane cutting and trolley loading for 14 farms with zero delays." },
      { year: "2024–2025", title: "Kolpewadi Sugarcane Campaign", client: "Rameshwar Patil & 8 Nearby Farmers", detail: "Finished 32 acres of heavy cane cutting in 10 days. 100% attendance recorded." },
      { year: "2023", title: "Rahata Sugar Mill Transport", client: "Rahata Agro Cooperative", detail: "Loaded 120 tractor-trolleys of sugarcane directly delivered to factory." }
    ],
    reviews: [
      { farmer: "Rameshwar Patil (Kolpewadi)", stars: 5, text: "बबनराव यांच्या टोळीने 2 एकर ऊस एका दिवसात कापून ट्रॉलीत भरला. अतिशय प्रामाणिक व शिस्तप्रिय काम!" },
      { farmer: "Dnyaneshwar Kale (Rahata)", stars: 5, text: "वेळेवर हजेरी आणि एकही ऊस वाया गेला नाही. 100% विश्वासू टोळी — पुढील वर्षीही बुक करेन." },
      { farmer: "Sopanrao Jadhav (Kopargaon)", stars: 5, text: "Best cane cutting team in Kopargaon. Arrived on time, finished 3 acres in one day. Highly recommend!" }
    ]
  },
  {
    id: "W02",
    name: "Sunita Bai Pawar",
    age: 38,
    gender: "Female",
    role: "Onion Harvest Women Squad Leader",
    village: "Kolpewadi, Kopargaon",
    mobile: "+91 97654 87654",
    whatsapp: "+91 97654 87654",
    experience: 12,
    dailyRate: 420,
    workersInSquad: 10,
    skill: "Onion Digging & Bagging",
    bio: "Skilled women self-help group specialising in onion harvest, grading, and gunny sacking. Operating in Kopargaon & Yeola area. All 10 members are Aadhaar verified with bank accounts.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W02,
    rating: 4.9,
    trustScore: 98,
    jobsCount: 168,
    punctuality: "99.5%",
    pastWorkExperience: [
      { year: "2025", title: "Export Quality Onion Sorting & Bagging", client: "Kolpewadi Farmers Producer Co.", detail: "Graded 600 quintals of red onion into export quality bags for APMC market." },
      { year: "2024", title: "Dhamori Onion Digging Season", client: "Eknath Jadhav & 6 Farmers", detail: "Dug out and sacked 25 acres of Kharif onion crop with zero bulb damage." },
      { year: "2022–2023", title: "Women Self-Help Group Leadership", client: "Kopargaon Mahila Vikas Bachat Gat", detail: "Trained 25 local women in systematic onion grading and safe harvest techniques." }
    ],
    reviews: [
      { farmer: "Sopanrao Shinde (Takli)", stars: 5, text: "सुनिताबाईंच्या महिला बचत गटाने 3 एकर कांदा उत्तम छाटून गोणी भरल्या. वेळेवर आल्या आणि काम नीटनेटके केले!" },
      { farmer: "Eknath Jadhav (Dhamori)", stars: 4.9, text: "Women squad arrived on time. Onion grading was excellent — export quality sorting done perfectly." }
    ]
  },
  {
    id: "W03",
    name: "Pandurang Chavan",
    age: 50,
    gender: "Male",
    role: "Grape & Pomegranate Pruning Expert",
    village: "Shirdi Road, Kopargaon",
    mobile: "+91 98100 55678",
    whatsapp: "+91 98100 55678",
    experience: 22,
    dailyRate: 520,
    workersInSquad: 4,
    skill: "Spraying & Pruning",
    bio: "22+ years expert in grape vine pruning and pomegranate bahar treatment (ambiya/mrig/hasta). Knows exact pruning depth for maximum yield in Nashik-Kopargaon agro-zone.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W03,
    rating: 5.0,
    trustScore: 99,
    jobsCount: 200,
    punctuality: "100%",
    pastWorkExperience: [
      { year: "2020–2026", title: "Pomegranate Bahar Treatment Lead", client: "Shirdi Road Orchards & Takli Farms", detail: "Pruned 35 pomegranate orchards resulting in 30% higher fruit set." },
      { year: "2018–2024", title: "Export Grape Pruning Specialist", client: "Nashik-Kopargaon Grape Growers Association", detail: "Specialist pruning for Thompson Seedless grape varieties for European export." },
      { year: "2015–2020", title: "Master Trainer at Kopargaon KVK", client: "Krishi Vigyan Kendra", detail: "Demonstrated scientific canopy management and pruning techniques to 200+ young farmers." }
    ],
    reviews: [
      { farmer: "Vijay Tambe (Takli)", stars: 5, text: "द्राक्ष बाग छाटणीचे अतिशय तज्ञ. या माणसाशिवाय आमची बाग पूर्ण होत नाही! 22 वर्षांचा अनुभव जाणवतो." },
      { farmer: "Kishor Ghorpade (Rahata)", stars: 5, text: "Pomegranate pruning done perfectly. Yield increased by 30% after Pandurang's pruning last season." }
    ]
  },
  {
    id: "W04",
    name: "Dnyaneshwar Kale",
    age: 45,
    gender: "Male",
    role: "Wheat & Maize Harvesting Squad",
    village: "Rahata Road, Kopargaon",
    mobile: "+91 98221 44556",
    whatsapp: "+91 98221 44556",
    experience: 18,
    dailyRate: 430,
    workersInSquad: 8,
    skill: "Wheat Harvesting",
    bio: "Heavy crop harvesting squad specialising in wheat, maize, bajra, and jowar cutting across Kopargaon region. 8 experienced workers with hand tools and machine coordination.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W04,
    rating: 4.9,
    trustScore: 98,
    jobsCount: 110,
    punctuality: "99.2%",
    pastWorkExperience: [
      { year: "2025", title: "Rabi Wheat Harvesting Drive", client: "Rahata Road Farmers Collective", detail: "Harvested 40 acres of wheat across 12 farms in 8 days with zero grain loss." },
      { year: "2024", title: "Kharif Maize Cutting & Threshing", client: "Manohar Wagh & Kopargaon Farmers", detail: "Completed 28 acres of heavy maize harvest and bundle tying." }
    ],
    reviews: [
      { farmer: "Manohar Wagh (Kopargaon)", stars: 5, text: "गहू कापणी वेळेत पूर्ण केली. पेंढ्या सुंदर बांधल्या आणि एकही दाणा वाया गेला नाही." },
      { farmer: "Ashok Shelke (Yeola)", stars: 4.9, text: "Fast and efficient wheat cutting. Completed 5 acres in 2 days — very satisfied with the squad." }
    ]
  },
  {
    id: "W05",
    name: "Vijay Tambe",
    age: 35,
    gender: "Male",
    role: "Certified Chemical Spraying Specialist",
    village: "Takli, Kopargaon",
    mobile: "+91 94230 65432",
    whatsapp: "+91 94230 65432",
    experience: 9,
    dailyRate: 450,
    workersInSquad: 6,
    skill: "Spraying & Pruning",
    bio: "Certified in safe pesticide application and organic spraying for pomegranate, grape, tomato, and onion. Trained in Kopargaon KVK spray techniques — uses calibrated knapsack pumps.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W05,
    rating: 4.8,
    trustScore: 97,
    jobsCount: 94,
    punctuality: "98.9%",
    pastWorkExperience: [
      { year: "2024–2025", title: "Tomato & Pomegranate Pest Control", client: "Takli & Dhamori Horticulture Farms", detail: "Executed 65 calibrated spraying rounds with zero crop burn or chemical overdose." },
      { year: "2023", title: "Organic Fungicide Spraying", client: "Kopargaon Organic Farmer Hub", detail: "Applied bio-fungicides across 20 acres of organic grape vineyards." }
    ],
    reviews: [
      { farmer: "Eknath Jadhav (Dhamori)", stars: 4.8, text: "द्राक्ष व डाळिंब फवारणीचे तज्ञ. योग्य प्रमाणात औषध वापरतात — पिकाला कोणताही त्रास नाही." },
      { farmer: "Balu Pawar (Kopargaon)", stars: 4.8, text: "Vijay's spraying squad is very precise. No wastage, no excess spray. Best in Kopargaon." }
    ]
  },
  {
    id: "W06",
    name: "Anita Bai More",
    age: 34,
    gender: "Female",
    role: "Onion Sorting & Export Packing",
    village: "Mahegaon Deshmukh, Kopargaon",
    mobile: "+91 97634 88901",
    whatsapp: "+91 97634 88901",
    experience: 8,
    dailyRate: 380,
    workersInSquad: 7,
    skill: "Onion Digging & Bagging",
    bio: "Women self-help group specialising in onion sorting, export-quality grading (A/B/C grade), and gunny sack packing. Familiar with APMC Kopargaon and Lasalgaon standards.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W06,
    rating: 4.8,
    trustScore: 96,
    jobsCount: 83,
    punctuality: "98.5%",
    pastWorkExperience: [
      { year: "2025", title: "Lasalgaon & Kopargaon APMC Grade Packing", client: "Mahegaon Farmers Union", detail: "Sorted and packed 450 quintals onion into 50kg export bags." },
      { year: "2024", title: "Onion Storage Shed Sorting", client: "Suresh Patil (Kolpewadi)", detail: "Inspected and de-rotted 150 tons stored onion in chawl sheds." }
    ],
    reviews: [
      { farmer: "Rameshwar Patil (Kopargaon)", stars: 4.8, text: "कांदा ग्रेडिंग व पॅकिंग अत्यंत कुशलतेने केले. निर्यातयोग्य दर्जाचे काम." },
      { farmer: "Suresh Patil (Kolpewadi)", stars: 5, text: "Anita Bai's group is very reliable. They arrive on time and work neatly. Recommended to all onion farmers." }
    ]
  },
  {
    id: "W07",
    name: "Raosaheb Deshmukh",
    age: 36,
    gender: "Male",
    role: "Licensed Heavy Tractor Driver",
    village: "Yeola Road, Kopargaon",
    mobile: "+91 94222 33445",
    whatsapp: "+91 94222 33445",
    experience: 11,
    dailyRate: 500,
    workersInSquad: 1,
    skill: "Tractor Driver",
    bio: "Licensed heavy vehicle driver (MH-17) for Mahindra Arjun 605 DI and trolley sugar factory hauling. Can operate rotavator, disc harrow, and all tractor-mounted implements.",
    aadhaar: "✓ Aadhaar Verified (Commercial License MH-17)",
    available: true,
    photo: LABOUR_PHOTOS.W07,
    rating: 4.9,
    trustScore: 98,
    jobsCount: 125,
    punctuality: "99.6%",
    pastWorkExperience: [
      { year: "2020–2026", title: "Sugarcane Factory Hauling Driver", client: "Kopargaon Sugar Mill & Rahata Transporters", detail: "Drove 120+ heavy sugar cane trolley trips with zero accidents or breakdowns." },
      { year: "2022–2025", title: "Rotavator & Deep Tilling Operator", client: "30 Kopargaon Farmers", detail: "Completed 150 acres of deep rotavator tilling for sugarcane and onion fields." }
    ],
    reviews: [
      { farmer: "Kishor Ghorpade (Rahata)", stars: 5, text: "कारखान्यात ऊस वाहतूक वेळेवर पोहचवली. ट्रॅक्टर चालवणे अतिशय सुरक्षित व अनुभवी." },
      { farmer: "Sopanrao Kale (Kopargaon)", stars: 4.9, text: "Raosaheb is the most trusted driver in Kopargaon. Handles sugar factory hauling with zero delays." }
    ]
  },
  {
    id: "W08",
    name: "Santosh Thorat",
    age: 28,
    gender: "Male",
    role: "Sugarcane Planting & Earthing Worker",
    village: "Kolpewadi, Kopargaon",
    mobile: "+91 94567 23456",
    whatsapp: "+91 94567 23456",
    experience: 5,
    dailyRate: 360,
    workersInSquad: 10,
    skill: "Sugarcane Cutting & Loading",
    bio: "Young energetic squad specialising in sugarcane planting (leni), earthing-up, and weed control in Kolpewadi, Takli, and Dhamori. New to KrishiX but highly motivated.",
    aadhaar: "✓ Aadhaar Verified",
    available: false,
    photo: LABOUR_PHOTOS.W08,
    rating: 4.6,
    trustScore: 93,
    jobsCount: 42,
    punctuality: "96.4%",
    pastWorkExperience: [
      { year: "2025", title: "Sugarcane Planting Drive", client: "Kolpewadi Cane Farmers", detail: "Planted sugarcane setts across 18 acres with high germination rate." }
    ],
    reviews: [
      { farmer: "Balu Pawar (Kopargaon)", stars: 4.6, text: "नवीन टोळी आहे पण काम चांगले करतात. वेळेवर येतात आणि मेहनत करतात. भविष्यात नक्की बुक करेन." }
    ]
  },
  {
    id: "W09",
    name: "Rukmini Devi Shinde",
    age: 44,
    gender: "Female",
    role: "Vegetable Transplanting & Weeding",
    village: "Sanjivani Road, Kopargaon",
    mobile: "+91 99203 67890",
    whatsapp: "+91 99203 67890",
    experience: 16,
    dailyRate: 400,
    workersInSquad: 9,
    skill: "Onion Digging & Bagging",
    bio: "16 years experience in vegetable seedling transplanting, tomato staking, onion weeding, and field cleaning. Expert in crop thinning that improves yield quality.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W09,
    rating: 4.8,
    trustScore: 97,
    jobsCount: 91,
    punctuality: "98.7%",
    pastWorkExperience: [
      { year: "2023–2025", title: "Tomato Staking & Nursery Planting", client: "Sanjivani Road Farmers", detail: "Transplanted 25 acres tomato and chilli seedlings with 98% survival rate." }
    ],
    reviews: [
      { farmer: "Dnyaneshwar Kale (Kopargaon)", stars: 5, text: "रुक्मिणी ताईंच्या गटाने टोमॅटो लागवड व भाजीपाला रोपण अतिशय काळजीपूर्वक व वेळेत केले." },
      { farmer: "Narayan Shinde (Rahata)", stars: 4.8, text: "Very experienced women squad. Tomato transplanting was done at perfect spacing. Great quality work." }
    ]
  },
  {
    id: "W10",
    name: "Eknath Jadhav",
    age: 39,
    gender: "Male",
    role: "Cotton Picking & Weeding Squad",
    village: "Dhamori, Kopargaon",
    mobile: "+91 98500 77889",
    whatsapp: "+91 98500 77889",
    experience: 10,
    dailyRate: 400,
    workersInSquad: 5,
    skill: "Cotton Picking",
    bio: "Cotton picking and manual weeding specialists serving Dhamori, Mahegaon Deshmukh, and Pimpalgaon areas. Experienced in 3-picking cotton farms (BT cotton specialist).",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W10,
    rating: 4.7,
    trustScore: 95,
    jobsCount: 76,
    punctuality: "97.8%",
    pastWorkExperience: [
      { year: "2024–2025", title: "BT Cotton 3-Stage Harvest", client: "Dhamori Cotton Growers", detail: "Picked 35 quintals of high-grade BT cotton across 15 acres." }
    ],
    reviews: [
      { farmer: "Suresh Patil (Dhamori)", stars: 4.7, text: "कापूस वेचणीचे काम वेगाने केले. तीन वेळा वेचणीचा अनुभव आहे — चांगले काम केले." }
    ]
  },
  {
    id: "W11",
    name: "Govinda Kamble",
    age: 32,
    gender: "Male",
    role: "Rice & Paddy Harvesting Specialist",
    village: "Pimpalgaon Ek, Kopargaon",
    mobile: "+91 92345 67890",
    whatsapp: "+91 92345 67890",
    experience: 7,
    dailyRate: 410,
    workersInSquad: 8,
    skill: "Wheat Harvesting",
    bio: "Rice and paddy harvesting squad with hand-cutting and bundling expertise. Also works in wheat, jowar, and soybean harvesting around Kopargaon and Sangamner.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W11,
    rating: 4.7,
    trustScore: 94,
    jobsCount: 58,
    punctuality: "97.5%",
    pastWorkExperience: [
      { year: "2024", title: "Paddy & Soybean Harvest", client: "Pimpalgaon Ek Farmers", detail: "Harvested 20 acres paddy and soybean with clean bundling." }
    ],
    reviews: [
      { farmer: "Ashok Shelke (Kopargaon)", stars: 4.7, text: "भात कापणी चांगली केली. वेळेवर आले आणि संपूर्ण शेत स्वच्छ केले." }
    ]
  },
  {
    id: "W12",
    name: "Mangal Bai Waghmare",
    age: 41,
    gender: "Female",
    role: "Sugarcane Row Weeding Women Squad",
    village: "Takli, Kopargaon",
    mobile: "+91 91234 56789",
    whatsapp: "+91 91234 56789",
    experience: 14,
    dailyRate: 370,
    workersInSquad: 11,
    skill: "Sugarcane Cutting & Loading",
    bio: "Large women's squad of 11 workers for sugarcane inter-row weeding, earthing-up, and trash mulching. 14 years experience in Kopargaon cane belt.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W12,
    rating: 4.6,
    trustScore: 94,
    jobsCount: 88,
    punctuality: "97.0%",
    pastWorkExperience: [
      { year: "2023–2025", title: "Cane Weeding & Mulching", client: "Takli & Kolpewadi Farmers", detail: "Weeded 40 acres of young sugarcane fields." }
    ],
    reviews: [
      { farmer: "Shankar Munde (Kolpewadi)", stars: 4.6, text: "ऊस खुरपणीचे काम चांगले केले. 11 महिला एका दिवसात 3 एकर ऊसाची खुरपणी केली." }
    ]
  },
  {
    id: "W13",
    name: "Bhimrao Salunke",
    age: 48,
    gender: "Male",
    role: "Irrigation Pipe Laying & Drip Setup",
    village: "Babhulgaon, Kopargaon",
    mobile: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    experience: 20,
    dailyRate: 550,
    workersInSquad: 3,
    skill: "Tractor Driver",
    bio: "20-year expert in drip irrigation pipe laying, lateral shifting, emitter maintenance, and pump set operation. Serves Kopargaon, Shirdi, and Rahata taluka farmers.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W13,
    rating: 4.9,
    trustScore: 97,
    jobsCount: 67,
    punctuality: "99.0%",
    pastWorkExperience: [
      { year: "2021–2026", title: "Drip Irrigation Installation Lead", client: "Babhulgaon & Shirdi Farms", detail: "Installed inline and online drip systems across 50+ acres of orchards." }
    ],
    reviews: [
      { farmer: "Pandurang Chavan (Shirdi Road)", stars: 5, text: "ड्रिप पाईप बसवण्याचे काम अतिशय चांगले केले. पाण्याची बचत 40% झाली." },
      { farmer: "Vijay Tambe (Takli)", stars: 4.9, text: "Bhimrao is the best drip irrigation expert in the area. Very professional setup, no leakage." }
    ]
  },
  {
    id: "W14",
    name: "Nanda Bai Sutar",
    age: 30,
    gender: "Female",
    role: "Flower & Fruit Picking Women Squad",
    village: "Yeola Road, Kopargaon",
    mobile: "+91 93456 78901",
    whatsapp: "+91 93456 78901",
    experience: 6,
    dailyRate: 350,
    workersInSquad: 8,
    skill: "Onion Digging & Bagging",
    bio: "Women's squad specialising in tomato & chilli picking, marigold flower harvesting, and grape bunch thinning. Careful handling — no produce bruising. Serves Kopargaon & Yeola.",
    aadhaar: "✓ Aadhaar Verified",
    available: true,
    photo: LABOUR_PHOTOS.W14,
    rating: 4.7,
    trustScore: 93,
    jobsCount: 44,
    pastWorkExperience: [
      { year: "2024–2025", title: "Tomato & Marigold Picking", client: "Yeola Road Farms", detail: "Harvested 15 tons tomato and marigold flowers for festival market." }
    ],
    punctuality: "97.2%",
    reviews: [
      { farmer: "Rukmini Shinde (Kopargaon)", stars: 4.7, text: "टोमॅटो वेचणी अतिशय काळजीपूर्वक केली. एकही टोमॅटो दाबला गेला नाही — निर्यातयोग्य काम." }
    ]
  },
  {
    id: "W15",
    name: "Lakshman Bhosale",
    age: 55,
    gender: "Male",
    role: "Senior Farm Supervisor & Labour Coordinator",
    village: "Kopargaon Town",
    mobile: "+91 98220 11234",
    whatsapp: "+91 98220 11234",
    experience: 30,
    dailyRate: 600,
    workersInSquad: 1,
    skill: "Tractor Driver",
    bio: "30 years senior farm supervisor with expertise in crop scheduling, labour coordination, harvest planning, and dealing with Kopargaon Sugar Factory. Trusted by 50+ farmers in taluka.",
    aadhaar: "✓ Aadhaar Verified (Senior Supervisor)",
    available: true,
    photo: LABOUR_PHOTOS.W15,
    rating: 5.0,
    trustScore: 99,
    jobsCount: 280,
    punctuality: "100%",
    pastWorkExperience: [
      { year: "1995–2026", title: "Senior Farm Manager & Mill Liaison", client: "50+ Kopargaon Farmers & Sanjivani Sakhar Karkhana", detail: "Managed harvest schedules and labour logistics for 30 consecutive sugar factory seasons." }
    ],
    reviews: [
      { farmer: "Multiple Farmers (Kopargaon Taluka)", stars: 5, text: "लक्ष्मण भोसले हे कोपरगावातील सर्वात अनुभवी व विश्वासू शेत पर्यवेक्षक आहेत. 30 वर्षांचा अनुभव!" },
      { farmer: "Rameshwar Patil (Kolpewadi)", stars: 5, text: "Best farm coordinator in Kopargaon. He plans everything — from planting to sugar factory delivery." }
    ]
  }
];

/* ------------------------------------------------------------------
   DEDICATED TEAM / SQUAD LABOUR BOOKING DATA (WHOLE GROUP BOOKING)
   ------------------------------------------------------------------ */
const TEAM_SQUAD_BOOKINGS = [
  {
    id: "TS-01",
    squadName: "Sanjivani Sugarcane Cutting & Trolley Loading Gang",
    leader: "Babanrao Shinde (Leader)",
    totalMembers: 14,
    skillType: "Sugarcane Cutting, Stripping & Trolley Loading",
    village: "Sanjivani Factory Road, Kopargaon",
    ratePerDay: 5880,
    perHeadRate: 420,
    capacityAcresPerDay: "2.5 to 3 Acres / Day",
    toolsIncluded: "Heavy Sickles, Cane Loaders & Ropes Included",
    transportIncluded: "Local Mini-Tractor Included",
    aadhaarStatus: "✓ All 14 Members Aadhaar Verified",
    trustScore: 99,
    photo: "./assets/squad_sugarcane_harvest.jpg",
    description: "Experienced sugarcane harvesting gang for Sanjivani & Rahata sugar factory supply. Includes male cutters and female trolley loaders."
  },
  {
    id: "TS-02",
    squadName: "Kolpewadi Women Onion Harvest & Export Sacking Bachat Gat",
    leader: "Sunita Bai Pawar (Leader)",
    totalMembers: 10,
    skillType: "Onion Digging, APMC Grading & 50kg Sacking",
    village: "Kolpewadi, Kopargaon",
    ratePerDay: 4000,
    perHeadRate: 400,
    capacityAcresPerDay: "3 Acres / Day",
    toolsIncluded: "Sorting Screens, Cutter Scissors & Gunny Sacks",
    transportIncluded: "Auto-Rickshaw Shared Transport",
    aadhaarStatus: "✓ All 10 Members Aadhaar Verified",
    trustScore: 98,
    photo: "./assets/squad_onion_harvest.jpg",
    description: "Export-grade onion harvesting and sorting squad. Fast digging, stem cutting, and sorting into APMC 50kg gunny bags."
  },
  {
    id: "TS-03",
    squadName: "Takli & Dhamori Chemical & Drone Spraying Squad",
    leader: "Vijay Tambe (Leader)",
    totalMembers: 6,
    skillType: "Pesticide Spraying & Canopy Management",
    village: "Takli / Dhamori, Kopargaon",
    ratePerDay: 2700,
    perHeadRate: 450,
    capacityAcresPerDay: "8 to 10 Acres / Day",
    toolsIncluded: "Motorised Knapsack Sprayers & Safety Masks",
    transportIncluded: "Motorbike Cargo Unit",
    aadhaarStatus: "✓ All 6 Members Certified & Verified",
    trustScore: 97,
    photo: "./assets/squad_drone_spraying.jpg",
    description: "Certified pesticide spraying team for grape orchards, pomegranate, tomato, and onion crops. Accurate dosage application."
  },
  {
    id: "TS-04",
    squadName: "Shirdi Road Grape & Pomegranate Canopy Pruning Experts",
    leader: "Pandurang Chavan (Leader)",
    totalMembers: 5,
    skillType: "Export Grape Pruning & Pomegranate Bahar Treatment",
    village: "Shirdi Road, Kopargaon",
    ratePerDay: 2600,
    perHeadRate: 520,
    capacityAcresPerDay: "2 Acres / Day",
    toolsIncluded: "German Pruning Shears & Disinfectant Solution",
    transportIncluded: "Pickup Van Included",
    aadhaarStatus: "✓ All 5 Master Pruners Verified",
    trustScore: 99,
    photo: "./assets/squad_grape_pruning.jpg",
    description: "Master pruners specializing in export Thompson Seedless grapes and Pomegranate bahar treatment (Ambiya / Mrig bahar)."
  },
  {
    id: "TS-05",
    squadName: "Godavari Belt Drip Irrigation & Pipe Laying Team",
    leader: "Bhimrao Salunke (Leader)",
    totalMembers: 4,
    skillType: "Drip Pipe Laying, Trenching & Emitter Setup",
    village: "Babhulgaon, Kopargaon",
    ratePerDay: 2200,
    perHeadRate: 550,
    capacityAcresPerDay: "5 Acres / Day",
    toolsIncluded: "Pipe Joiners, Hole Punchers & Flush Valves",
    transportIncluded: "Cargo Utility Vehicle",
    aadhaarStatus: "✓ All 4 Drip Technicians Verified",
    trustScore: 97,
    photo: "./assets/squad_drip_irrigation.jpg",
    description: "20-year experienced drip irrigation setup crew. Submain trenching, lateral laying, emitter cleaning, and pump set hookups."
  },
  {
    id: "TS-06",
    squadName: "Rahata & Mahegaon Wheat, Bajra & Grain Harvest Squad",
    leader: "Dnyaneshwar Kale (Leader)",
    totalMembers: 8,
    skillType: "Rabi Wheat Hand Cutting, Threshing & Bundle Tying",
    village: "Rahata Road / Mahegaon Deshmukh, Kopargaon",
    ratePerDay: 3360,
    perHeadRate: 420,
    capacityAcresPerDay: "4 Acres / Day",
    toolsIncluded: "Grain Sickles & Binding Ropes Included",
    transportIncluded: "Pick-up Van Included",
    aadhaarStatus: "✓ All 8 Members Aadhaar Verified",
    trustScore: 98,
    photo: "./assets/squad_wheat_harvest.jpg",
    description: "Heavy grain harvest squad for wheat, maize, and bajra. Experienced with hand cutting, threshing, and field clearing."
  }
];

/* ------------------------------------------------------------------
   INTERACTIVE FINE & PROTECTION SYSTEM DATA
   ------------------------------------------------------------------ */
const FINE_RULES = [
  {
    id: "FR-01",
    icon: "🕒",
    category: "Labour Late Arrival / No-Show",
    categoryMr: "मजूर गैरहजेरी व उशीर भरपाई",
    penaltyRange: "₹500 – ₹1,000 Compensated to Farmer",
    appliesTo: "Labour Worker / Squad Leader",
    description: "If a booked worker or squad arrives more than 2 hours late without prior notice or fails to show up, escrow auto-deducts ₹500–₹1,000 from worker rating deposit and transfers directly to the farmer.",
    protectionFor: "Farmers"
  },
  {
    id: "FR-02",
    icon: "⚙️",
    category: "Machinery Damage & Misuse",
    categoryMr: "यंत्र मोडतोड व नुकसान दंड",
    penaltyRange: "₹1,500 – ₹5,000 Fine on Farmer",
    appliesTo: "Farmer (Renter)",
    description: "If a farmer misuses rented machinery (clutch burning, gear stripping, blade breaking, improper fuel), KrishiX inspection report triggers an automatic fine deducted from security deposit.",
    protectionFor: "Machine Owners"
  },
  {
    id: "FR-03",
    icon: "🌾",
    category: "Crop Damage by Workers",
    categoryMr: "फसल नुकसान मजूर दंड",
    penaltyRange: "₹1,000 Compensation to Farmer",
    appliesTo: "Worker / Spraying Squad",
    description: "If workers improperly apply wrong chemicals or damage standing crops due to negligence, KrishiX Escrow compensates the farmer directly after field inspection.",
    protectionFor: "Farmers"
  },
  {
    id: "FR-04",
    icon: "❌",
    category: "Last-Minute Cancellation",
    categoryMr: "बुकिंग रद्द दंड",
    penaltyRange: "₹200 – ₹500 Fine",
    appliesTo: "Cancelling Party (Farmer or Worker)",
    description: "Any party cancelling a confirmed booking within 12 hours of the scheduled start time pays a flat cancellation penalty to compensate for lost work time.",
    protectionFor: "Both Parties"
  }
];

// Active fine claims filed on the platform
const ACTIVE_FINES = [
  {
    claimId: "CLM-KPG-701",
    filedBy: "Rameshwar Patil (Farmer, Kolpewadi)",
    againstTarget: "Santosh Thorat (Worker Squad)",
    reason: "Late Arrival by 3 Hours on Sugarcane Field",
    amount: 500,
    status: "APPROVED & PAID",
    statusColor: "#16a34a",
    date: "02 Aug 2026",
    details: "Worker squad arrived at 10:15 AM instead of scheduled 07:00 AM start time. Compensation of ₹500 transferred to farmer wallet."
  },
  {
    claimId: "CLM-KPG-652",
    filedBy: "Raosaheb Patil (Tractor Owner)",
    againstTarget: "Sopanrao Shinde (Renter Farmer)",
    reason: "Rotavator Blade Bending due to Rocky Field Misuse",
    amount: 1800,
    status: "UNDER INSPECTION",
    statusColor: "#d97706",
    date: "01 Aug 2026",
    details: "Inspection report submitted by Kopargaon Field Officer. Escrow hold active."
  }
];

/* ------------------------------------------------------------------
   MACHINERY DATA
   ------------------------------------------------------------------ */
const MACHINERY_DATA = [
  {
    id: "M01",
    name: "Mahindra Arjun 605 DI Heavy Tractor",
    category: "Tractor",
    hp: "60 HP • MH-17",
    ratePerHour: 700,
    ratePerAcre: 950,
    owner: "Raosaheb Patil (MH 17 CD 5821)",
    village: "Kopargaon Town (1.8 km away)",
    rating: 4.9, trustScore: 98, reviewsCount: 58,
    available: true,
    image: "./assets/real_mahindra_arjun_tractor.jpg",
    specs: ["60 HP Heavy Tilling", "Power Steering & AC Cabin", "Sugarcane Hauling"]
  },
  {
    id: "M02",
    name: "John Deere 5050D Combine Harvester",
    category: "Harvester",
    hp: "75 HP • Heavy Duty",
    ratePerHour: 1900,
    ratePerAcre: 2300,
    owner: "Sanjivani Agro Equipment (Kolpewadi)",
    village: "Kolpewadi, Kopargaon (3.5 km away)",
    rating: 5.0, trustScore: 99, reviewsCount: 64,
    available: true,
    image: "./assets/real_john_deere_harvester.jpg",
    specs: ["Wheat, Maize & Paddy", "2500L Grain Tank", "Zero Crop Loss"]
  },
  {
    id: "M03",
    name: "AgriDron 20L Precision Spray Drone",
    category: "Drone",
    hp: "20L Tank • GPS Auto",
    ratePerHour: 1300,
    ratePerAcre: 350,
    owner: "Godavari Tech Drones (Dhamori)",
    village: "Dhamori, Kopargaon (4.1 km away)",
    rating: 4.9, trustScore: 97, reviewsCount: 82,
    available: true,
    image: "./assets/drone_sprayer.jpg",
    specs: ["Onion & Pomegranate Spray", "8 Min Per Acre", "Radar Avoidance"]
  },
  {
    id: "M04",
    name: "Case IH Austoft Heavy Sugarcane Harvester",
    category: "Harvester",
    hp: "175 HP • Heavy Duty",
    ratePerHour: 2200,
    ratePerAcre: 2600,
    owner: "Sanjivani Sugarcane Mill Cooperative",
    village: "Sanjivani Factory Road (2.2 km away)",
    rating: 4.9, trustScore: 98, reviewsCount: 74,
    available: true,
    image: "./assets/real_sugarcane_harvester.png",
    specs: ["175 HP Austoft Billeting", "Direct Mill Transport Loader", "Zero Cane Loss"]
  }
];

/* ------------------------------------------------------------------
   GPS TRACKING DATA
   ------------------------------------------------------------------ */
const ACTIVE_TRACKING = {
  bookingId: "KX-KPG-9042",
  resourceName: "Mahindra Arjun 605 DI Tractor",
  vehicleNumber: "MH 17 CD 5821",
  driverName: "Raosaheb Patil",
  phone: "+91 98220 17482",
  trustScore: 98,
  etaMinutes: 6,
  etaSeconds: 30,
  speedKmh: 30,
  distanceKm: 1.8,
  startLocation: { lat: 19.8904, lng: 74.4789, name: "Kopargaon Agro Yard" },
  farmerLocation: { lat: 19.9050, lng: 74.4920, name: "Kolpewadi Sugarcane Farm Field #4, Kopargaon" },
  routePath: [
    [19.8904, 74.4789], [19.8935, 74.4820], [19.8970, 74.4850],
    [19.9005, 74.4880], [19.9030, 74.4905], [19.9050, 74.4920]
  ]
};

/* ------------------------------------------------------------------
   APP STATE
   ------------------------------------------------------------------ */
window.krishixState = {
  currentTab: "profiles",
  currentRole: "farmer",
  language: "mr",           // default Marathi
  profileSearch: "",
  profileSkill: "ALL",
  walletBalance: 4850,
  paymentHistory: [
    { title:"John Deere 5050D Combine Harvester (Machinery)", id:"TXN-JOB-001", date:"10 Aug 2026", amount:7600 },
    { title:"Mahindra Arjun 605 DI Tractor", id:"TXN-KPG-8841", date:"26 July 2026", amount:2800 },
    { title:"Sunita Bai Pawar — Onion Squad (10 workers)", id:"TXN-KPG-7910", date:"22 July 2026", amount:4200 }
  ],
  scheduledJobs: [
    {
      id: "JOB-001", type: "Machinery",
      title: "John Deere 5050D Combine Harvester",
      date: "Tomorrow, 7:00 AM", duration: "4 Hours",
      status: "CONFIRMED", amount: 7600,
      paymentMethod: "Wallet Paid",
      location: "Kolpewadi Field #2, Kopargaon"
    }
  ],
  profitMaximizer: {
    priority: "max-profit",
    cropKey: "Tomato",
    quantityTons: 15,
    location: "Kolpewadi, Kopargaon",
    harvestDate: "2026-08-12",
    currentPrice: 15,
    storageKey: "shirdi-cold",
    storageCostPerKgDay: 1.2,
    storageDays: 5,
    transportKey: "shared-freight",
    transportCostPerTon: 800,
    handlingCostPerTon: 333,
    preferredSellingLoc: "Nashik APMC",
    forecastDays: 5,
    alertActive: true,
    alertMinPrice: 24,
    alertMinProfit: 300000,
    simulatedMarketShift: false
  }
};

/* ------------------------------------------------------------------
   PROFIT MAXIMIZER AI DATA PRESETS
   ------------------------------------------------------------------ */
const CROPS_DATA = {
  Tomato: {
    name: "🍅 Tomato (टोमॅटो)",
    unit: "kg",
    basePrice: 15,
    expectedRise: 28,
    unitMultiplier: 1000, // 1 Ton = 1000 kg
    defaultQty: 15,
    storageCostPerKgDay: 1.2,
    holdingDaysRec: 5,
    transportCostPerTon: 800,
    handlingCostPerTon: 333,
    bestMarket: "Nashik APMC",
    directBuyer: "Sanjivani Foods Processing @ ₹26/kg",
    riskRating: "LOW–MEDIUM",
    confidence: 87,
    forecast: {
      5: { rangeLow: 26, rangeHigh: 30, expected: 28, trend: "up", percent: "+86%" },
      7: { rangeLow: 25, rangeHigh: 31, expected: 29, trend: "up", percent: "+93%" },
      14: { rangeLow: 21, rangeHigh: 27, expected: 24, trend: "down", percent: "+60%" },
      30: { rangeLow: 18, rangeHigh: 23, expected: 20, trend: "stable", percent: "+33%" }
    }
  },
  Onion: {
    name: "🧅 Onion (कांदा)",
    unit: "kg",
    basePrice: 22,
    expectedRise: 32,
    unitMultiplier: 1000,
    defaultQty: 20,
    storageCostPerKgDay: 0.6,
    holdingDaysRec: 10,
    transportCostPerTon: 750,
    handlingCostPerTon: 250,
    bestMarket: "Lasalgaon / Nashik APMC",
    directBuyer: "Maharashtra Agri Exports @ ₹30/kg",
    riskRating: "LOW",
    confidence: 91,
    forecast: {
      5: { rangeLow: 24, rangeHigh: 27, expected: 25.5, trend: "up", percent: "+16%" },
      7: { rangeLow: 26, rangeHigh: 30, expected: 28, trend: "up", percent: "+27%" },
      14: { rangeLow: 30, rangeHigh: 35, expected: 32, trend: "up", percent: "+45%" },
      30: { rangeLow: 28, rangeHigh: 36, expected: 33, trend: "stable", percent: "+50%" }
    }
  },
  Sugarcane: {
    name: "🌾 Sugarcane (ऊस)",
    unit: "Ton",
    basePrice: 3100,
    expectedRise: 3350,
    unitMultiplier: 1,
    defaultQty: 100,
    storageCostPerKgDay: 0,
    holdingDaysRec: 1,
    transportCostPerTon: 220,
    handlingCostPerTon: 150,
    bestMarket: "Sanjivani Sahakari Sakhar Karkhana Mill",
    directBuyer: "Sanjivani Sugar Mill Cooperative",
    riskRating: "VERY LOW",
    confidence: 95,
    forecast: {
      5: { rangeLow: 3100, rangeHigh: 3250, expected: 3200, trend: "up", percent: "+3.2%" },
      7: { rangeLow: 3200, rangeHigh: 3350, expected: 3300, trend: "up", percent: "+6.4%" },
      14: { rangeLow: 3250, rangeHigh: 3400, expected: 3350, trend: "stable", percent: "+8.0%" },
      30: { rangeLow: 3150, rangeHigh: 3350, expected: 3250, trend: "stable", percent: "+4.8%" }
    }
  },
  Wheat: {
    name: "🌾 Wheat (गहू)",
    unit: "kg",
    basePrice: 24,
    expectedRise: 29,
    unitMultiplier: 1000,
    defaultQty: 10,
    storageCostPerKgDay: 0.3,
    holdingDaysRec: 14,
    transportCostPerTon: 600,
    handlingCostPerTon: 200,
    bestMarket: "Kopargaon APMC Mandi",
    directBuyer: "Godavari Flour Mills Ltd @ ₹27.5/kg",
    riskRating: "LOW",
    confidence: 89,
    forecast: {
      5: { rangeLow: 24.5, rangeHigh: 26, expected: 25, trend: "up", percent: "+4%" },
      7: { rangeLow: 25.5, rangeHigh: 27.5, expected: 26.5, trend: "up", percent: "+10%" },
      14: { rangeLow: 27.5, rangeHigh: 30, expected: 29, trend: "up", percent: "+20.8%" },
      30: { rangeLow: 27, rangeHigh: 31, expected: 28.5, trend: "stable", percent: "+18.7%" }
    }
  },
  Soybeans: {
    name: "🫘 Soybeans (सोयाबीन)",
    unit: "kg",
    basePrice: 45,
    expectedRise: 53,
    unitMultiplier: 1000,
    defaultQty: 8,
    storageCostPerKgDay: 0.5,
    holdingDaysRec: 7,
    transportCostPerTon: 700,
    handlingCostPerTon: 250,
    bestMarket: "Latur / Nashik APMC",
    directBuyer: "Patanjali Oil Extractions @ ₹50/kg",
    riskRating: "MEDIUM",
    confidence: 85,
    forecast: {
      5: { rangeLow: 46, rangeHigh: 49, expected: 48, trend: "up", percent: "+6.6%" },
      7: { rangeLow: 50, rangeHigh: 55, expected: 53, trend: "up", percent: "+17.7%" },
      14: { rangeLow: 48, rangeHigh: 54, expected: 51, trend: "stable", percent: "+13.3%" },
      30: { rangeLow: 44, rangeHigh: 52, expected: 47, trend: "down", percent: "+4.4%" }
    }
  }
};

