/* ============================================================
   KrishiX – Seed Script
   Populates MongoDB with all 15 workers, machinery & fine claims
   Run: node seed.js
   ============================================================ */

const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Worker    = require('./models/Worker');
const Machinery = require('./models/Machinery');
const FineClaim = require('./models/FineClaim');

// ── All 15 Labour Worker Profiles ───────────────────────────
const WORKERS = [
  {
    id: "W01", name: "Babanrao Shinde", age: 42, gender: "Male",
    role: "Sugarcane Cutting Squad Leader",
    village: "Sanjivani Factory Road, Kopargaon",
    mobile: "+91 98904 12345", whatsapp: "+91 98904 12345",
    experience: 15, dailyRate: 480, workersInSquad: 12,
    skill: "Sugarcane Cutting & Loading",
    bio: "Expert sugarcane cutting squad operating in Kopargaon, Kolpewadi & Rahata for 15+ years. 12 experienced male & female workers. Specialises in cane cutting, earthing, and trolley loading.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1595074475609-1b3e0bce52d0?w=600&q=80&fit=crop&crop=faces,top",
    rating: 5.0, trustScore: 99, jobsCount: 142, punctuality: "99.8%",
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
    id: "W02", name: "Sunita Bai Pawar", age: 38, gender: "Female",
    role: "Onion Harvest Women Squad Leader",
    village: "Kolpewadi, Kopargaon",
    mobile: "+91 97654 87654", whatsapp: "+91 97654 87654",
    experience: 12, dailyRate: 420, workersInSquad: 10,
    skill: "Onion Digging & Bagging",
    bio: "Skilled women self-help group specialising in onion harvest, grading, and gunny sacking. Operating in Kopargaon & Yeola area. All 10 members are Aadhaar verified with bank accounts.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.9, trustScore: 98, jobsCount: 168, punctuality: "99.5%",
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
    id: "W03", name: "Pandurang Chavan", age: 50, gender: "Male",
    role: "Grape & Pomegranate Pruning Expert",
    village: "Shirdi Road, Kopargaon",
    mobile: "+91 98100 55678", whatsapp: "+91 98100 55678",
    experience: 22, dailyRate: 520, workersInSquad: 4,
    skill: "Spraying & Pruning",
    bio: "22+ years expert in grape vine pruning and pomegranate bahar treatment. Knows exact pruning depth for maximum yield in Nashik-Kopargaon agro-zone.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1504455583697-3a9b04be6397?w=600&q=80&fit=crop&crop=faces,top",
    rating: 5.0, trustScore: 99, jobsCount: 200, punctuality: "100%",
    pastWorkExperience: [
      { year: "2020–2026", title: "Pomegranate Bahar Treatment Lead", client: "Shirdi Road Orchards & Takli Farms", detail: "Pruned 35 pomegranate orchards resulting in 30% higher fruit set." },
      { year: "2018–2024", title: "Export Grape Pruning Specialist", client: "Nashik-Kopargaon Grape Growers Association", detail: "Specialist pruning for Thompson Seedless grape varieties for European export." }
    ],
    reviews: [
      { farmer: "Vijay Tambe (Takli)", stars: 5, text: "द्राक्ष बाग छाटणीचे अतिशय तज्ञ. या माणसाशिवाय आमची बाग पूर्ण होत नाही! 22 वर्षांचा अनुभव जाणवतो." },
      { farmer: "Kishor Ghorpade (Rahata)", stars: 5, text: "Pomegranate pruning done perfectly. Yield increased by 30% after Pandurang's pruning last season." }
    ]
  },
  {
    id: "W04", name: "Dnyaneshwar Kale", age: 45, gender: "Male",
    role: "Wheat & Maize Harvesting Squad",
    village: "Rahata Road, Kopargaon",
    mobile: "+91 98221 44556", whatsapp: "+91 98221 44556",
    experience: 18, dailyRate: 430, workersInSquad: 8,
    skill: "Wheat Harvesting",
    bio: "Heavy crop harvesting squad specialising in wheat, maize, bajra, and jowar cutting across Kopargaon region.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.9, trustScore: 98, jobsCount: 110, punctuality: "99.2%",
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
    id: "W05", name: "Vijay Tambe", age: 35, gender: "Male",
    role: "Certified Chemical Spraying Specialist",
    village: "Takli, Kopargaon",
    mobile: "+91 94230 65432", whatsapp: "+91 94230 65432",
    experience: 9, dailyRate: 450, workersInSquad: 6,
    skill: "Spraying & Pruning",
    bio: "Certified in safe pesticide application and organic spraying for pomegranate, grape, tomato, and onion.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.8, trustScore: 97, jobsCount: 94, punctuality: "98.9%",
    pastWorkExperience: [
      { year: "2024–2025", title: "Tomato & Pomegranate Pest Control", client: "Takli & Dhamori Horticulture Farms", detail: "Executed 65 calibrated spraying rounds with zero crop burn or chemical overdose." }
    ],
    reviews: [
      { farmer: "Eknath Jadhav (Dhamori)", stars: 4.8, text: "द्राक्ष व डाळिंब फवारणीचे तज्ञ. योग्य प्रमाणात औषध वापरतात — पिकाला कोणताही त्रास नाही." },
      { farmer: "Balu Pawar (Kopargaon)", stars: 4.8, text: "Vijay's spraying squad is very precise. No wastage, no excess spray. Best in Kopargaon." }
    ]
  },
  {
    id: "W06", name: "Anita Bai More", age: 34, gender: "Female",
    role: "Onion Sorting & Export Packing",
    village: "Mahegaon Deshmukh, Kopargaon",
    mobile: "+91 97634 88901", whatsapp: "+91 97634 88901",
    experience: 8, dailyRate: 380, workersInSquad: 7,
    skill: "Onion Digging & Bagging",
    bio: "Women self-help group specialising in onion sorting, export-quality grading (A/B/C grade), and gunny sack packing. Familiar with APMC Kopargaon and Lasalgaon standards.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.8, trustScore: 95, jobsCount: 76, punctuality: "98.1%",
    pastWorkExperience: [
      { year: "2024–2025", title: "APMC Onion Export Grading", client: "Mahegaon Onion Growers Association", detail: "Sorted and packed 500+ quintals of export onion in APMC standard bags." }
    ],
    reviews: [
      { farmer: "Balu Pawar (Kopargaon)", stars: 4.8, text: "Anita's team grades onions perfectly. APMC traders praised the uniform sizing." }
    ]
  },
  {
    id: "W07", name: "Santosh Thorat", age: 40, gender: "Male",
    role: "Tractor & Power Tiller Driver",
    village: "Dhamori, Kopargaon",
    mobile: "+91 99700 12233", whatsapp: "+91 99700 12233",
    experience: 16, dailyRate: 500, workersInSquad: 2,
    skill: "Tractor Driver",
    bio: "16 years licensed tractor driver with power tiller, rotavator, and sugarcane harvester attachment experience. Operates in Kopargaon, Rahata, and Nevasa.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.9, trustScore: 96, jobsCount: 130, punctuality: "99.0%",
    pastWorkExperience: [
      { year: "2019–2026", title: "Sugarcane & Wheat Season Tractor Work", client: "40+ Kopargaon Farmers", detail: "Ploughed 200+ acres annually with rotavator and MB plough attachments." }
    ],
    reviews: [
      { farmer: "Rameshwar Patil (Kolpewadi)", stars: 5, text: "संतोष ट्रॅक्टर चालवण्यात तज्ञ आहे. रोटावेटर व नांगर काम वेळेवर व कुशलतेने करतो." }
    ]
  },
  {
    id: "W08", name: "Rukmini Shinde", age: 32, gender: "Female",
    role: "Grape Bunch Thinning & Packaging",
    village: "Pimpalgaon Bahula, Kopargaon",
    mobile: "+91 97665 44322", whatsapp: "+91 97665 44322",
    experience: 7, dailyRate: 400, workersInSquad: 6,
    skill: "Spraying & Pruning",
    bio: "Specialised in grape bunch thinning, berry sizing, export packaging, and cold room stacking for Nashik-Kopargaon export grapes. Team of 6 skilled women workers.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.8, trustScore: 95, jobsCount: 52, punctuality: "98.5%",
    pastWorkExperience: [
      { year: "2023–2025", title: "Export Grape Bunch Thinning", client: "Pimpalgaon Bahula Grape Exporters", detail: "Thinned and packaged 80 tons of Thompson Seedless grapes for European export." }
    ],
    reviews: [
      { farmer: "Pandurang Chavan (Shirdi Road)", stars: 4.8, text: "रुक्मिणीच्या टीमने द्राक्ष छाटणी व पॅकेजिंग अतिशय चांगल्या प्रकारे केले. निर्यातदारांनी कौतुक केले." }
    ]
  },
  {
    id: "W09", name: "Sakharam Jadhav", age: 47, gender: "Male",
    role: "Sugarcane Loader & Trolley Coordinator",
    village: "Kopargaon Bus Stand Area",
    mobile: "+91 98234 56780", whatsapp: "+91 98234 56780",
    experience: 20, dailyRate: 460, workersInSquad: 10,
    skill: "Sugarcane Cutting & Loading",
    bio: "Specialist in sugarcane trolley loading, factory slip management, and weigh bridge coordination at Sanjivani & Pravara sugar mills. 20 years of season experience.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80&fit=crop&crop=top",
    rating: 4.9, trustScore: 97, jobsCount: 155, punctuality: "99.3%",
    pastWorkExperience: [
      { year: "2005–2026", title: "Sugar Factory Trolley Loading Lead", client: "Sanjivani & Pravara Sugar Mills", detail: "Coordinated 500+ trolley dispatches per season with zero slip mismatches." }
    ],
    reviews: [
      { farmer: "Sopanrao Jadhav (Kopargaon)", stars: 5, text: "साखर कारखान्यासाठी ट्रॉली लोडिंगचे अतिशय अनुभवी कोऑर्डिनेटर. स्लिप व वजनकाटा माहित आहे." }
    ]
  },
  {
    id: "W10", name: "Meena Bai Gaikwad", age: 36, gender: "Female",
    role: "Soybean & Cotton Picking Women Squad",
    village: "Kolpewadi Junction, Kopargaon",
    mobile: "+91 94500 78921", whatsapp: "+91 94500 78921",
    experience: 10, dailyRate: 360, workersInSquad: 9,
    skill: "Wheat Harvesting",
    bio: "Women squad for soybean pod picking, cotton boll harvesting, and jowar bundling. Covers Kopargaon, Sangamner, and Rahata talukas. Group of 9 with 10 years of joint experience.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "./assets/labour_squad.jpg",
    rating: 4.7, trustScore: 93, jobsCount: 60, punctuality: "97.8%",
    pastWorkExperience: [
      { year: "2023–2025", title: "Kharif Soybean & Cotton Season", client: "Rahata Road Farmers", detail: "Picked 180 quintals of dry soybean pods from 30 acres. Fast and clean picking." }
    ],
    reviews: [
      { farmer: "Manohar Wagh (Kopargaon)", stars: 4.7, text: "मीनाबाईंच्या टीमने सोयाबीन वेचणी उत्तम केली. एकही शेंगा वाया गेली नाही." }
    ]
  },
  {
    id: "W11", name: "Ganesh Pawar", age: 28, gender: "Male",
    role: "Rice & Paddy Harvest Squad",
    village: "Pimpalgaon Ek, Kopargaon",
    mobile: "+91 91001 23456", whatsapp: "+91 91001 23456",
    experience: 7, dailyRate: 410, workersInSquad: 8,
    skill: "Wheat Harvesting",
    bio: "Rice and paddy harvesting squad with hand-cutting and bundling expertise. Also works in wheat, jowar, and soybean harvesting around Kopargaon and Sangamner.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.7, trustScore: 94, jobsCount: 58, punctuality: "97.5%",
    pastWorkExperience: [
      { year: "2024", title: "Paddy & Soybean Harvest", client: "Pimpalgaon Ek Farmers", detail: "Harvested 20 acres paddy and soybean with clean bundling." }
    ],
    reviews: [
      { farmer: "Ashok Shelke (Kopargaon)", stars: 4.7, text: "भात कापणी चांगली केली. वेळेवर आले आणि संपूर्ण शेत स्वच्छ केले." }
    ]
  },
  {
    id: "W12", name: "Mangal Bai Waghmare", age: 41, gender: "Female",
    role: "Sugarcane Row Weeding Women Squad",
    village: "Takli, Kopargaon",
    mobile: "+91 91234 56789", whatsapp: "+91 91234 56789",
    experience: 14, dailyRate: 370, workersInSquad: 11,
    skill: "Sugarcane Cutting & Loading",
    bio: "Large women's squad of 11 workers for sugarcane inter-row weeding, earthing-up, and trash mulching. 14 years experience in Kopargaon cane belt.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1519057016344-8b8e54f0d7ea?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.6, trustScore: 94, jobsCount: 88, punctuality: "97.0%",
    pastWorkExperience: [
      { year: "2023–2025", title: "Cane Weeding & Mulching", client: "Takli & Kolpewadi Farmers", detail: "Weeded 40 acres of young sugarcane fields." }
    ],
    reviews: [
      { farmer: "Shankar Munde (Kolpewadi)", stars: 4.6, text: "ऊस खुरपणीचे काम चांगले केले. 11 महिला एका दिवसात 3 एकर ऊसाची खुरपणी केली." }
    ]
  },
  {
    id: "W13", name: "Bhimrao Salunke", age: 48, gender: "Male",
    role: "Irrigation Pipe Laying & Drip Setup",
    village: "Babhulgaon, Kopargaon",
    mobile: "+91 98765 43210", whatsapp: "+91 98765 43210",
    experience: 20, dailyRate: 550, workersInSquad: 3,
    skill: "Tractor Driver",
    bio: "20-year expert in drip irrigation pipe laying, lateral shifting, emitter maintenance, and pump set operation. Serves Kopargaon, Shirdi, and Rahata taluka farmers.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.9, trustScore: 97, jobsCount: 67, punctuality: "99.0%",
    pastWorkExperience: [
      { year: "2021–2026", title: "Drip Irrigation Installation Lead", client: "Babhulgaon & Shirdi Farms", detail: "Installed inline and online drip systems across 50+ acres of orchards." }
    ],
    reviews: [
      { farmer: "Pandurang Chavan (Shirdi Road)", stars: 5, text: "ड्रिप पाईप बसवण्याचे काम अतिशय चांगले केले. पाण्याची बचत 40% झाली." },
      { farmer: "Vijay Tambe (Takli)", stars: 4.9, text: "Bhimrao is the best drip irrigation expert in the area. Very professional setup, no leakage." }
    ]
  },
  {
    id: "W14", name: "Nanda Bai Sutar", age: 30, gender: "Female",
    role: "Flower & Fruit Picking Women Squad",
    village: "Yeola Road, Kopargaon",
    mobile: "+91 93456 78901", whatsapp: "+91 93456 78901",
    experience: 6, dailyRate: 350, workersInSquad: 8,
    skill: "Onion Digging & Bagging",
    bio: "Women's squad specialising in tomato & chilli picking, marigold flower harvesting, and grape bunch thinning. Careful handling — no produce bruising.",
    aadhaar: "✓ Aadhaar Verified", available: true,
    photo: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=600&q=80&fit=crop&crop=faces,top",
    rating: 4.7, trustScore: 93, jobsCount: 44, punctuality: "97.2%",
    pastWorkExperience: [
      { year: "2024–2025", title: "Tomato & Marigold Picking", client: "Yeola Road Farms", detail: "Harvested 15 tons tomato and marigold flowers for festival market." }
    ],
    reviews: [
      { farmer: "Rukmini Shinde (Kopargaon)", stars: 4.7, text: "टोमॅटो वेचणी अतिशय काळजीपूर्वक केली. एकही टोमॅटो दाबला गेला नाही — निर्यातयोग्य काम." }
    ]
  },
  {
    id: "W15", name: "Lakshman Bhosale", age: 55, gender: "Male",
    role: "Senior Farm Supervisor & Labour Coordinator",
    village: "Kopargaon Town",
    mobile: "+91 98220 11234", whatsapp: "+91 98220 11234",
    experience: 30, dailyRate: 600, workersInSquad: 1,
    skill: "Tractor Driver",
    bio: "30 years senior farm supervisor with expertise in crop scheduling, labour coordination, harvest planning, and dealing with Kopargaon Sugar Factory. Trusted by 50+ farmers in taluka.",
    aadhaar: "✓ Aadhaar Verified (Senior Supervisor)", available: true,
    photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=600&q=80&fit=crop&crop=faces,top",
    rating: 5.0, trustScore: 99, jobsCount: 280, punctuality: "100%",
    pastWorkExperience: [
      { year: "1995–2026", title: "Senior Farm Manager & Mill Liaison", client: "50+ Kopargaon Farmers & Sanjivani Sakhar Karkhana", detail: "Managed harvest schedules and labour logistics for 30 consecutive sugar factory seasons." }
    ],
    reviews: [
      { farmer: "Multiple Farmers (Kopargaon Taluka)", stars: 5, text: "लक्ष्मण भोसले हे कोपरगावातील सर्वात अनुभवी व विश्वासू शेत पर्यवेक्षक आहेत. 30 वर्षांचा अनुभव!" },
      { farmer: "Rameshwar Patil (Kolpewadi)", stars: 5, text: "Best farm coordinator in Kopargaon. He plans everything — from planting to sugar factory delivery." }
    ]
  }
];

// ── Machinery Data ──────────────────────────────────────────
const MACHINERY = [
  {
    id: "M01", name: "Mahindra Arjun 605 DI Heavy Tractor",
    category: "Tractor", hp: "60 HP • MH-17",
    ratePerHour: 700, ratePerAcre: 950,
    owner: "Raosaheb Patil (MH 17 CD 5821)",
    village: "Kopargaon Town (1.8 km away)",
    rating: 4.9, trustScore: 98, reviewsCount: 58, available: true,
    image: "./assets/real_mahindra_arjun_tractor.jpg",
    specs: ["60 HP Heavy Tilling", "Power Steering & AC Cabin", "Sugarcane Hauling"]
  },
  {
    id: "M02", name: "John Deere 5050D Combine Harvester",
    category: "Harvester", hp: "75 HP • Heavy Duty",
    ratePerHour: 1900, ratePerAcre: 2300,
    owner: "Sanjivani Agro Equipment (Kolpewadi)",
    village: "Kolpewadi, Kopargaon (3.5 km away)",
    rating: 5.0, trustScore: 99, reviewsCount: 64, available: true,
    image: "./assets/real_john_deere_harvester.jpg",
    specs: ["Wheat, Maize & Paddy", "2500L Grain Tank", "Zero Crop Loss"]
  },
  {
    id: "M03", name: "AgriDron 20L Precision Spray Drone",
    category: "Drone", hp: "20L Tank • GPS Auto",
    ratePerHour: 1300, ratePerAcre: 350,
    owner: "Godavari Tech Drones (Dhamori)",
    village: "Dhamori, Kopargaon (4.1 km away)",
    rating: 4.9, trustScore: 97, reviewsCount: 82, available: true,
    image: "./assets/drone_sprayer.jpg",
    specs: ["Onion & Pomegranate Spray", "8 Min Per Acre", "Radar Avoidance"]
  },
  {
    id: "M04", name: "Case IH Austoft Heavy Sugarcane Harvester",
    category: "Harvester", hp: "175 HP • Heavy Duty",
    ratePerHour: 2200, ratePerAcre: 2600,
    owner: "Sanjivani Sugarcane Mill Cooperative",
    village: "Sanjivani Factory Road (2.2 km away)",
    rating: 4.9, trustScore: 98, reviewsCount: 74, available: true,
    image: "./assets/real_sugarcane_harvester.png",
    specs: ["175 HP Austoft Billeting", "Direct Mill Transport Loader", "Zero Cane Loss"]
  }
];

// ── Seed Fine Claims ────────────────────────────────────────
const FINE_CLAIMS = [
  {
    claimId: "CLM-KPG-701",
    category: "Labour Late Arrival (>2 Hours)",
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
    category: "Machinery Misuse / Damage",
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

// ── Main Seed Function ──────────────────────────────────────
async function seedDatabase() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI || MONGO_URI.includes('<username>')) {
      console.error('\n❌ MongoDB URI not set in backend/.env');
      console.log('📋 Please follow the setup guide to get your free MongoDB Atlas URI\n');
      process.exit(1);
    }

    console.log('\n🌱 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected!\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Worker.deleteMany({});
    await Machinery.deleteMany({});
    await FineClaim.deleteMany({});

    // Seed Workers
    console.log('👷 Seeding 15 worker profiles...');
    await Worker.insertMany(WORKERS);
    console.log('  ✅ 15 workers seeded');

    // Seed Machinery
    console.log('🚜 Seeding 4 machinery items...');
    await Machinery.insertMany(MACHINERY);
    console.log('  ✅ 4 machines seeded');

    // Seed Fine Claims
    console.log('⚖️  Seeding 2 fine claims...');
    await FineClaim.insertMany(FINE_CLAIMS);
    console.log('  ✅ 2 fine claims seeded\n');

    console.log('🎉 Database seeded successfully!');
    console.log('🚀 You can now run: npm run dev\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seedDatabase();
