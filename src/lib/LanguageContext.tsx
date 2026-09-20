import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Language = "uz" | "en" | "ru";
type ProjectDetail = { title: string; description: string; highlights: string[] };

const translations = {
  uz: {
    nav: ["BOSH SAHIFA", "MEN HAQIMDA", "KO‘NIKMALAR", "LOYIHALAR", "TAJRIBA", "ALOQA"],
    hello: "<SALOM DUNYO /> MEN",
    roles: ["FRONTEND DASTURCHI", "UI/UX MUHANDIS", "REACT MUTAXASSISI", "WEB ARXITEKT", "KREATIV KODER"],
    heroDescription: "Zamonaviy texnologiya va ijodiy dizayn uyg‘unligida immersiv raqamli tajribalar yarataman. Har bir kod qatori bilan kelajakni quraman.",
    viewProjects: "[ LOYIHALARNI KO‘RISH ]",
    getInTouch: "BOG‘LANISH →",
    about: "MEN HAQIMDA", aboutTitle: "MEN KIMMAN?",
    skills: "KO‘NIKMALAR VA TEXNOLOGIYALAR", projects: "TANLANGAN LOYIHALAR",
    projectIntro: "Zamonaviy texnologiyalar va ajoyib foydalanuvchi tajribasiga e’tibor bilan yaratilgan so‘nggi ishlarim.",
    featured: "TANLANGAN", viewDetails: "BATAFSIL KO‘RISH →", close: "YOPISH",
    gallery: "LOYIHA GALEREYASI", workDone: "BAJARILGAN ISHLAR", technologies: "TEXNOLOGIYALAR",
    experience: "ISH TAJRIBASI", contact: "BOG‘LANISH", send: "XABAR YUBORISH",
    language: "TIL",
    aboutIntro: "Men interaktiv raqamli tajribalar yaratishga qiziqadigan frontend dasturchiman. Web dasturlashdagi yo‘lim oddiy interfeyslar yaratishdan boshlandi va zamonaviy texnologiyalarni chuqur o‘rganishga aylandi.",
    aboutSpecialty: "React va TypeScript yordamida tezkor, qulay va vizual jihatdan kuchli web ilovalar yarataman. 3D grafika va animatsiyalarni sinab ko‘rishni yaxshi ko‘raman.",
    techStack: "TEXNOLOGIYALAR", stats: ["YIL TAJRIBA", "TUGALLANGAN LOYIHA", "TEXNOLOGIYA", "MIJOZLAR QONIQISHI"],
    journey: "YO‘L", available: "ISH UCHUN OCHIQ", contactIntro: "Loyihangiz bormi? Xabar yuboring — u to‘g‘ridan-to‘g‘ri Telegramimga keladi.",
    buildTitle: "BIRGALIKDA AJOYIB NARSA YARATAMIZ", buildDescription: "Freelance ishlar va full-time imkoniyatlar uchun ochiqman.",
    skillsFrontend: "FRONTEND", skillsTools: "VOSITALAR VA BOSHQA", learning: "Doim yangi texnologiyalarni o‘rganaman", learningDetail: "// Hozir: AI/ML, WebGPU, Rust",
    status: "ISH UCHUN OCHIQ", contactLabels: ["ISM", "EMAIL", "MAVZU", "XABAR", "JOYlashUV", "TELEGRAM", "VAQT ZONASI"], connect: "MEN BILAN BOG‘LANING",
    contactSuccess: "✓ Xabar Telegramimga yuborildi!", contactError: "Xatolik. Qayta urinib ko‘ring.", terminalOnline: "✓ Hamkorlikka tayyorman", responseTime: "24 soatdan kam",
    experiencePositions: ["Frontend Dasturchi", "Web Dasturchi", "Talaba Dasturchi"],
    experienceDescriptions: ["Real-time dashboard, player management va staff coordination imkoniyatlariga ega CIMS yaratdim. JWT authentication va role-based access control qo‘shdim.", "Turli mijozlar uchun e-commerce, landing page va business dashboardlar yaratdim. Responsive design va performancega e’tibor qaratdim.", "Statistik tahlil, data visualization va econometric modelingga oid bir nechta akademik loyihalarni ishlab chiqdim."],
    footerBuilt: "Mirzohid tomonidan 💚 bilan yaratildi", online: "TIZIM ISHLAYAPTI", deployed: "VERCEL’GA JOYLASHTIRILGAN",
    projectDetails: {
      "365-crm": { title: "365 Magazine Sales CRM", description: "Operatorlar va adminlar uchun role-based access, WebSocket operator navbati, mijoz va buyurtmalar boshqaruvi, Telegram broadcast, PDF kanal tracking, obuna rejalari va KPI analytics dashboarddan iborat savdo tizimi.", highlights: ["Operator va admin workflowlari", "WebSocket orqali real-time navbat", "Analytics, PDF tracking va Telegram broadcast"] },
      "kas-crm": { title: "KAS CRM", description: "Lead, chat, product, store, user va AI sozlamalarini boshqaruvchi responsive admin panel. React Query, Zustand, token refresh auth va bulk import bilan to‘liq CRUD jarayonlari amalga oshirilgan.", highlights: ["Lead, chat, product va store boshqaruvi", "Token refresh autentifikatsiya", "Bulk import va to‘liq CRUD"] },
      "cognilabs-cims": { title: "CogniLabs CIMS", description: "CEO dashboard, CRM paneli, permission management, team monitoring, salary estimates, drag-and-drop Kanban va AI chat interfeysiga ega ichki boshqaruv tizimi. Protected route va 3 tilli interfeys qo‘llab-quvvatlanadi.", highlights: ["CEO dashboard va CRM paneli", "Drag-and-drop Kanban boshqaruvi", "Uzbek, English va Russian interfeys"] },
      evoting: { title: "EVote", description: "Ro‘yxatdan o‘tish, aktiv so‘rovlarda qatnashish va real-time natijalarni ko‘rsatadigan elektron ovoz berish platformasi. Admin panelda KPI, chartlar, role-based access va PDF export mavjud.", highlights: ["So‘rovlar va real-time natijalar", "Chartli KPI dashboard", "Superadmin/User rollari"] },
      "1": { title: "Bunyodkor Academy CIMS", description: "Bunyodkor futbol akademiyasi uchun student, to‘lov, attendance, coach panel, group va contract boshqaruviga ega CIMS. 1,500+ faol o‘quvchi, bir nechta to‘lov manbasi va moliyaviy analytics qamrab olingan.", highlights: ["1,500+ faol o‘quvchi boshqaruvi", "To‘lov, attendance va contract tracking", "Moliyaviy dashboard va coach panel"] },
      "2": { title: "3D Portfolio Experience", description: "WebGL, 3D animatsiya va interaktiv particle systemlardan foydalanadigan neo-futuristik portfolio tajribasi.", highlights: ["WebGL 3D sahna", "Interaktiv particle system", "Framer Motion transitionlari"] },
      "3": { title: "Weather Dashboard", description: "Animatsion ob-havo ko‘rsatkichlari, forecast va location-based data bilan yaratilgan dashboard.", highlights: ["Ob-havo forecast interfeysi", "Animatsion vizualizatsiyalar", "Responsive dashboard layout"] },
      "4": { title: "University Club Management System", description: "Real-time inventory, payment integration va admin dashboardga ega universitet klublarini boshqarish tizimi.", highlights: ["Inventory boshqaruvi", "Payment integration", "Admin dashboard"] },
    } as Record<string, ProjectDetail>,
  },
  en: {
    nav: ["HOME", "ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE", "CONTACT"],
    hello: "<HELLO WORLD /> I AM",
    roles: ["FRONTEND DEVELOPER", "UI/UX ENGINEER", "REACT SPECIALIST", "WEB ARCHITECT", "CREATIVE CODER"],
    heroDescription: "Crafting immersive digital experiences through the fusion of cutting-edge technology and creative design. Building the future, one line of code at a time.",
    viewProjects: "[ VIEW PROJECTS ]", getInTouch: "GET IN TOUCH →",
    about: "ABOUT ME", aboutTitle: "WHO AM I?", skills: "SKILLS & TECHNOLOGIES", projects: "FEATURED PROJECTS",
    projectIntro: "A showcase of my recent work, featuring web applications built with modern technologies and a focus on exceptional user experience.",
    featured: "FEATURED", viewDetails: "VIEW DETAILS →", close: "CLOSE", gallery: "PROJECT GALLERY", workDone: "WHAT I BUILT", technologies: "TECHNOLOGIES",
    experience: "WORK EXPERIENCE", contact: "CONTACT ME", send: "SEND MESSAGE", language: "LANGUAGE",
    aboutIntro: "I am a frontend developer who enjoys creating interactive digital experiences. My web development journey started with simple interfaces and grew into a deep understanding of modern technologies.",
    aboutSpecialty: "I build fast, accessible and visually strong applications with React and TypeScript. I also enjoy experimenting with 3D graphics and animation.",
    techStack: "TECH STACK", stats: ["YEARS EXPERIENCE", "PROJECTS COMPLETED", "TECHNOLOGIES", "CLIENT SATISFACTION"],
    journey: "JOURNEY", available: "AVAILABLE FOR WORK", contactIntro: "Have a project in mind? Send it over — it lands straight in my Telegram.",
    buildTitle: "LET'S BUILD SOMETHING AMAZING", buildDescription: "I'm available for freelance work and full-time opportunities.",
    skillsFrontend: "FRONTEND", skillsTools: "TOOLS & OTHERS", learning: "Always learning and exploring new technologies", learningDetail: "// Currently diving into: AI/ML, WebGPU, Rust",
    status: "AVAILABLE FOR WORK", contactLabels: ["NAME", "EMAIL", "SUBJECT", "MESSAGE", "LOCATION", "TELEGRAM", "TIMEZONE"], connect: "CONNECT WITH ME",
    contactSuccess: "✓ Message delivered to my Telegram!", contactError: "Error. Try again.", terminalOnline: "✓ Online and ready to collaborate", responseTime: "< 24 hours",
    experiencePositions: ["Frontend Developer", "Web Developer", "Student Developer"],
    experienceDescriptions: ["Built a CIMS with real-time dashboards, player management and staff coordination. Implemented JWT authentication and role-based access control.", "Delivered e-commerce platforms, landing pages and business dashboards with a focus on responsive design and performance.", "Led academic projects covering statistical analysis, data visualization and econometric modelling."],
    footerBuilt: "Designed & Built with 💚 by Mirzohid", online: "SYSTEM ONLINE", deployed: "DEPLOYED ON VERCEL",
    projectDetails: {
      "365-crm": { title: "365 Magazine Sales CRM", description: "A sales management system with role-based access for operators and admins, a real-time WebSocket queue, client and order management, Telegram broadcasts, PDF channel tracking, subscriptions and KPI analytics.", highlights: ["Operator and admin workflows", "Real-time WebSocket queue", "Analytics, PDF tracking and Telegram broadcasts"] },
      "kas-crm": { title: "KAS CRM", description: "A responsive admin panel for leads, chats, products, stores, users and AI settings. It includes React Query, Zustand, token refresh authentication and full CRUD with bulk import.", highlights: ["Lead, chat, product and store management", "Token refresh authentication", "Bulk import and complete CRUD"] },
      "cognilabs-cims": { title: "CogniLabs CIMS", description: "An internal management system with a CEO dashboard, CRM, permissions, team monitoring, salary estimates, drag-and-drop Kanban and an AI chat interface with protected routes and three languages.", highlights: ["CEO dashboard and CRM panel", "Drag-and-drop Kanban management", "Uzbek, English and Russian interface"] },
      evoting: { title: "EVote", description: "An electronic voting platform with registration, active polls and real-time results. The admin panel includes KPI charts, role-based access and PDF export.", highlights: ["Polls and real-time results", "Chart-based KPI dashboard", "Superadmin/User roles"] },
      "1": { title: "Bunyodkor Academy CIMS", description: "A club information system for Bunyodkor Football Academy covering students, payments, attendance, coach panels, groups and contracts, with 1,500+ active students and financial analytics.", highlights: ["1,500+ active student management", "Payment, attendance and contract tracking", "Financial dashboards and coach panels"] },
      "2": { title: "3D Portfolio Experience", description: "A neo-futuristic portfolio experience powered by WebGL, 3D animation and interactive particle systems.", highlights: ["WebGL 3D scene", "Interactive particle system", "Framer Motion transitions"] },
      "3": { title: "Weather Dashboard", description: "A weather dashboard with animated conditions, forecasts and location-based data.", highlights: ["Weather forecast interface", "Animated visualizations", "Responsive dashboard layout"] },
      "4": { title: "University Club Management System", description: "A university club management system with real-time inventory, payment integration and an admin dashboard.", highlights: ["Inventory management", "Payment integration", "Admin dashboard"] },
    } as Record<string, ProjectDetail>,
  },
  ru: {
    nav: ["ГЛАВНАЯ", "ОБО МНЕ", "НАВЫКИ", "ПРОЕКТЫ", "ОПЫТ", "КОНТАКТЫ"],
    hello: "<ПРИВЕТ МИР /> Я",
    roles: ["FRONTEND РАЗРАБОТЧИК", "UI/UX ИНЖЕНЕР", "REACT СПЕЦИАЛИСТ", "WEB АРХИТЕКТОР", "КРЕАТИВНЫЙ КОДЕР"],
    heroDescription: "Создаю захватывающие цифровые решения, объединяя современные технологии и креативный дизайн. Строю будущее строка за строкой.",
    viewProjects: "[ СМОТРЕТЬ ПРОЕКТЫ ]", getInTouch: "СВЯЗАТЬСЯ →",
    about: "ОБО МНЕ", aboutTitle: "КТО Я?", skills: "НАВЫКИ И ТЕХНОЛОГИИ", projects: "ИЗБРАННЫЕ ПРОЕКТЫ",
    projectIntro: "Мои последние работы — веб-приложения на современных технологиях с фокусом на отличный пользовательский опыт.",
    featured: "ИЗБРАННОЕ", viewDetails: "ПОДРОБНЕЕ →", close: "ЗАКРЫТЬ", gallery: "ГАЛЕРЕЯ ПРОЕКТА", workDone: "ЧТО СДЕЛАНО", technologies: "ТЕХНОЛОГИИ",
    experience: "ОПЫТ РАБОТЫ", contact: "СВЯЗАТЬСЯ СО МНОЙ", send: "ОТПРАВИТЬ", language: "ЯЗЫК",
    aboutIntro: "Я frontend-разработчик, который любит создавать интерактивные цифровые решения. Путь в веб-разработке начался с простых интерфейсов и вырос в глубокое знание современных технологий.",
    aboutSpecialty: "Создаю быстрые, доступные и визуально сильные приложения на React и TypeScript, а также экспериментирую с 3D-графикой и анимацией.",
    techStack: "ТЕХНОЛОГИИ", stats: ["ЛЕТ ОПЫТА", "ЗАВЕРШЁННЫХ ПРОЕКТОВ", "ТЕХНОЛОГИЙ", "ДОВОЛЬНЫХ КЛИЕНТОВ"],
    journey: "ПУТЬ", available: "ОТКРЫТ ДЛЯ РАБОТЫ", contactIntro: "Есть проект? Отправьте сообщение — оно сразу попадёт в мой Telegram.",
    buildTitle: "СОЗДАДИМ ЧТО-ТО ПОТРЯСАЮЩЕЕ", buildDescription: "Открыт для freelance и full-time возможностей.",
    skillsFrontend: "FRONTEND", skillsTools: "ИНСТРУМЕНТЫ И ДРУГОЕ", learning: "Всегда изучаю новые технологии", learningDetail: "// Сейчас: AI/ML, WebGPU, Rust",
    status: "ОТКРЫТ ДЛЯ РАБОТЫ", contactLabels: ["ИМЯ", "EMAIL", "ТЕМА", "СООБЩЕНИЕ", "МЕСТОПОЛОЖЕНИЕ", "TELEGRAM", "ЧАСОВОЙ ПОЯС"], connect: "СВЯЗАТЬСЯ СО МНОЙ",
    contactSuccess: "✓ Сообщение отправлено в мой Telegram!", contactError: "Ошибка. Попробуйте ещё раз.", terminalOnline: "✓ Готов к сотрудничеству", responseTime: "< 24 часов",
    experiencePositions: ["Frontend-разработчик", "Web-разработчик", "Студент-разработчик"],
    experienceDescriptions: ["Создал CIMS с real-time dashboard, управлением игроками и координацией команды. Добавил JWT и ролевой доступ.", "Разрабатывал e-commerce, landing pages и бизнес-dashboard с фокусом на адаптивность и производительность.", "Руководил учебными проектами по статистике, визуализации данных и эконометрическому моделированию."],
    footerBuilt: "Создано с 💚 Мирзохидом", online: "СИСТЕМА ОНЛАЙН", deployed: "РАЗВЁРНУТО НА VERCEL",
    projectDetails: {
      "365-crm": { title: "365 Magazine Sales CRM", description: "Система продаж с ролями операторов и администраторов, очередью WebSocket в реальном времени, управлением клиентами и заказами, Telegram-рассылками, PDF-трекингом, подписками и KPI-аналитикой.", highlights: ["Рабочие процессы операторов и админов", "Очередь WebSocket в реальном времени", "Аналитика, PDF-трекинг и Telegram"] },
      "kas-crm": { title: "KAS CRM", description: "Адаптивная админ-панель для лидов, чатов, товаров, магазинов, пользователей и AI-настроек. Реализованы React Query, Zustand, обновление токена и CRUD с массовым импортом.", highlights: ["Управление лидами, чатами и товарами", "Аутентификация с обновлением токена", "Массовый импорт и полный CRUD"] },
      "cognilabs-cims": { title: "CogniLabs CIMS", description: "Внутренняя система управления с CEO dashboard, CRM, правами доступа, мониторингом команды, расчётом зарплат, Kanban-доской и AI-чатом, защищёнными маршрутами и тремя языками.", highlights: ["CEO dashboard и CRM-панель", "Kanban с drag-and-drop", "Интерфейс на трёх языках"] },
      evoting: { title: "EVote", description: "Платформа электронного голосования с регистрацией, активными опросами и результатами в реальном времени. В админке есть KPI, графики, роли и экспорт PDF.", highlights: ["Опросы и результаты в реальном времени", "KPI dashboard с графиками", "Роли Superadmin/User"] },
      "1": { title: "Bunyodkor Academy CIMS", description: "Система управления футбольной академией Bunyodkor: ученики, платежи, посещаемость, панели тренеров, группы и договоры, 1 500+ активных учеников и финансовая аналитика.", highlights: ["Управление 1 500+ учениками", "Платежи, посещаемость и договоры", "Финансовые панели и тренеры"] },
      "2": { title: "3D Portfolio Experience", description: "Неофутуристичный опыт портфолио на WebGL с 3D-анимацией и интерактивной системой частиц.", highlights: ["WebGL 3D-сцена", "Интерактивные частицы", "Переходы Framer Motion"] },
      "3": { title: "Weather Dashboard", description: "Погодный dashboard с анимированными условиями, прогнозами и данными по местоположению.", highlights: ["Интерфейс прогноза", "Анимированная визуализация", "Адаптивный dashboard"] },
      "4": { title: "University Club Management System", description: "Система управления университетскими клубами с инвентарём в реальном времени, оплатой и админ-панелью.", highlights: ["Управление инвентарём", "Интеграция платежей", "Админ-панель"] },
    } as Record<string, ProjectDetail>,
  },
} as const;

type TranslationSet = (typeof translations)[Language];
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: TranslationSet };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
