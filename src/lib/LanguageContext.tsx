import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Language = "uz" | "en" | "ru";
type ProjectDetail = { title: string; description: string; highlights: string[] };
type ExperienceText = { position: string; period: string; location: string; points: string[] };

const translations = {
  uz: {
    nav: ["BOSH SAHIFA", "MEN HAQIMDA", "KO‘NIKMALAR", "LOYIHALAR", "TAJRIBA", "ALOQA"],
    hello: "<SALOM DUNYO /> MEN",
    roles: ["FRONTEND DASTURCHI", "FULLSTACK DASTURCHI", "REACT + TYPESCRIPT", "TELEGRAM BOT DASTURCHI", "CRM VA ADMIN PANELLAR"],
    heroDescription: "B2B CRM tizimlari, admin panellar va Telegram botlar yarataman. React, TypeScript va Feature-Sliced Design — asosiy kuchim; FastAPI bilan backend tomonini ham quraman.",
    viewProjects: "[ LOYIHALARNI KO‘RISH ]",
    getInTouch: "BOG‘LANISH →",
    about: "MEN HAQIMDA", aboutTitle: "MEN KIMMAN?",
    skills: "KO‘NIKMALAR VA TEXNOLOGIYALAR", projects: "TANLANGAN LOYIHALAR",
    projectIntro: "Production’da ishlayotgan CRM, dashboard, marketplace va Telegram botlar — har biri real mijoz va real foydalanuvchilar uchun.",
    featured: "TANLANGAN", viewDetails: "BATAFSIL →", close: "YOPISH",
    gallery: "LOYIHA", workDone: "BAJARILGAN ISHLAR", technologies: "TEXNOLOGIYALAR",
    experience: "ISH TAJRIBASI", contact: "BOG‘LANISH", send: "XABAR YUBORISH",
    language: "TIL",
    aboutIntro: "Men B2B CRM tizimlari, admin panellar, Telegram botlar va mijoz loyihalarini yaratadigan frontend dasturchiman. React, TypeScript va Feature-Sliced Design’da kuchliman, FastAPI va Node.js bilan fullstack tajribam hamda production deploylarim bor.",
    aboutSpecialty: "Hozir UzCombinator ekotizimidagi Mimoram AI startapida fullstack dasturchi sifatida ishlayman. Muhandislik ko‘nikmalarini TDIU’dagi Menejment ta’limi va faol yetakchilik tajribasi bilan birlashtiraman.",
    techStack: "TEXNOLOGIYALAR", stats: ["YIL TAJRIBA", "LOYIHALAR", "TEXNOLOGIYA", "MIJOZLAR QONIQISHI"],
    journey: "YO‘L", available: "ISH UCHUN OCHIQ", contactIntro: "Loyihangiz bormi? Xabar yuboring — u to‘g‘ridan-to‘g‘ri Telegramimga keladi.",
    buildTitle: "BIRGALIKDA AJOYIB NARSA YARATAMIZ", buildDescription: "Freelance ishlar va hamkorlik uchun ochiqman.",
    skillsFrontend: "FRONTEND", skillsBackend: "BACKEND VA BOTLAR", skillsTools: "ARXITEKTURA VA VOSITALAR", learning: "Doim yangi texnologiyalarni o‘rganaman", learningDetail: "// Hozir: AI agentlar, LLM integratsiyalar",
    status: "ISH UCHUN OCHIQ", contactLabels: ["ISM", "EMAIL", "MAVZU", "XABAR", "JOYLASHUV", "TELEGRAM", "VAQT ZONASI"], connect: "MEN BILAN BOG‘LANING",
    contactSuccess: "✓ Xabar Telegramimga yuborildi!", contactError: "Xatolik. Qayta urinib ko‘ring.", terminalOnline: "✓ Hamkorlikka tayyorman", responseTime: "24 soatdan kam",
    downloadResume: "REZYUMENI YUKLASH",
    experienceItems: [
      { position: "Fullstack Dasturchi", period: "Sen 2026 — Hozir", location: "Toshkent · UzCombinator", points: ["UzCombinator startap ekotizimi orqali qo‘shilgan AI startapida fullstack dasturchi.", "Mahsulotning frontend va backend qismlarini ishlab chiqaman."] },
      { position: "Freelance Dasturchi", period: "Iyun 2026 — Hozir", location: "Masofaviy", points: ["Bir nechta mijozlar uchun CRM tizimlari, admin panellar va Telegram botlar yetkazib berdim.", "Mebel, matras va ustalar marketplace’ini qurdim (FastAPI, React, PostGIS) — production’da ishlayapti."] },
      { position: "Frontend Dasturchi", period: "Noy 2025 — May 2026", location: "Toshkent", points: ["KAS CRM — Telegram bilan integratsiyalangan AI savdo CRM’ini qurdim: FSD arxitektura, dark theme, Recharts dashboardlar va chat UI.", "CIMS korporativ dashboardini qayta dizayn qildim: design token tizimi va qayta ishlatiladigan komponentlar kutubxonasi (MetricCard, DataTable, Badge)."] },
    ] as ExperienceText[],
    footerBuilt: "Mirzohid tomonidan 💚 bilan yaratildi", online: "TIZIM ISHLAYAPTI", deployed: "VERCEL’GA JOYLASHTIRILGAN",
    visitors: "TASHRIFLAR",
    projectDetails: {
      "kas-crm": { title: "KAS CRM", description: "Telegram bilan integratsiyalangan AI savdo CRM’i: lead, chat, mahsulot, do‘kon, foydalanuvchi va AI sozlamalari boshqaruvi. FSD arxitektura, dark theme, Recharts dashboardlar va real chat interfeysi.", highlights: ["Telegram integratsiyali chat UI", "Recharts asosidagi savdo dashboardlari", "FSD arxitektura, token refresh auth, bulk import"] },
      "cognilabs-cims": { title: "CogniLabs CIMS", description: "Korporativ boshqaruv dashboardining qayta dizayni: CEO dashboard, CRM paneli, ruxsatlar, jamoa monitoringi, Kanban va AI chat. Design token tizimi va qayta ishlatiladigan komponentlar kutubxonasi yaratildi.", highlights: ["Design token tizimi", "MetricCard, DataTable, Badge komponentlari", "Uzbek, English va Russian interfeys"] },
      "bunyodkor-cims": { title: "Bunyodkor CIMS", description: "Futbol akademiyasi boshqaruv dashboardi: o‘quvchilar, to‘lovlar, davomat, murabbiylar, guruhlar va shartnomalar. 130+ API endpoint, RBAC, FSD va demo uchun MSW + Faker.js mock qatlami.", highlights: ["130+ API endpoint integratsiyasi", "RBAC va Feature-Sliced Design", "MSW + Faker.js mock qatlami (60+ endpoint)"] },
      marketplace: { title: "Mebel Marketplace", description: "Mebel, matras va ustalar uchun marketplace. Xaritada yaqin ustalar va do‘konlarni topish uchun PostGIS geo-qidiruvi. Freelance loyiha — production’da ishlayapti.", highlights: ["FastAPI backend + React frontend", "PostGIS asosidagi geo-qidiruv", "Production’ga deploy qilingan"] },
      devcrm: { title: "DevCrm", description: "O‘quv markazlari uchun CRM: direktor va o‘qituvchi rollari, davomat, dars jadvali va moliya ekranlari. Asosan o‘zbekcha interfeys, RU/EN tarjimalari bilan.", highlights: ["Direktor / o‘qituvchi rollari", "Davomat, jadval va moliya", "UZ / RU / EN interfeys"] },
      "365-crm": { title: "365 Magazine Sales CRM", description: "Operatorlar va adminlar uchun role-based access, WebSocket operator navbati, mijoz va buyurtmalar boshqaruvi, Telegram broadcast, PDF kanal tracking, obuna rejalari va KPI analytics dashboarddan iborat savdo tizimi.", highlights: ["Operator va admin workflowlari", "WebSocket orqali real-time navbat", "Analytics, PDF tracking va Telegram broadcast"] },
      "currency-tracker": { title: "Currency Tracker", description: "Markaziy bank API’si va yirik banklardan valyuta kurslarini yig‘adigan fullstack ilova. React admin panel, Telegram bot, AWS EC2’da PM2 va Nginx bilan deploy.", highlights: ["Markaziy bank va banklar kurslari", "React admin panel + Telegram bot", "AWS EC2, PM2, Nginx"] },
      "tdiu-bot": { title: "TDIU Admissions Bot", description: "Abituriyentlar uchun Telegram bot (Python, aiogram): 12 bo‘limli menyu va RBAC’ga ega admin panel.", highlights: ["12 bo‘limli interaktiv menyu", "RBAC admin panel", "Python + aiogram"] },
      evoting: { title: "Electronic Voting System", description: "Elektron ovoz berish platformasi: role-based routing, aktiv so‘rovlar, real-time natijalar, Recharts analytics va PDF eksport.", highlights: ["Role-based routing", "Recharts analytics", "PDF eksport"] },
    } as Record<string, ProjectDetail>,
  },
  en: {
    nav: ["HOME", "ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE", "CONTACT"],
    hello: "<HELLO WORLD /> I AM",
    roles: ["FRONTEND DEVELOPER", "FULLSTACK DEVELOPER", "REACT + TYPESCRIPT", "TELEGRAM BOT BUILDER", "CRM & ADMIN PANELS"],
    heroDescription: "I build B2B CRM systems, admin panels and Telegram bots. Strong in React, TypeScript and Feature-Sliced Design — and I ship the backend with FastAPI too.",
    viewProjects: "[ VIEW PROJECTS ]", getInTouch: "GET IN TOUCH →",
    about: "ABOUT ME", aboutTitle: "WHO AM I?", skills: "SKILLS & TECHNOLOGIES", projects: "SELECTED PROJECTS",
    projectIntro: "CRMs, dashboards, a marketplace and Telegram bots running in production — each built for real clients and real users.",
    featured: "FEATURED", viewDetails: "VIEW DETAILS →", close: "CLOSE", gallery: "PROJECT", workDone: "WHAT I BUILT", technologies: "TECHNOLOGIES",
    experience: "WORK EXPERIENCE", contact: "CONTACT ME", send: "SEND MESSAGE", language: "LANGUAGE",
    aboutIntro: "I'm a frontend developer who builds B2B CRM systems, admin panels, Telegram bots and client projects. Strong in React, TypeScript and Feature-Sliced Design, with hands-on fullstack experience (FastAPI, Node.js) and production deployments.",
    aboutSpecialty: "Right now I'm a fullstack developer at Mimoram, an AI startup in the UzCombinator ecosystem. I combine engineering with a Management degree at TSEU and active leadership experience.",
    techStack: "TECH STACK", stats: ["YEARS EXPERIENCE", "PROJECTS", "TECHNOLOGIES", "CLIENT SATISFACTION"],
    journey: "JOURNEY", available: "AVAILABLE FOR WORK", contactIntro: "Have a project in mind? Send it over — it lands straight in my Telegram.",
    buildTitle: "LET'S BUILD SOMETHING AMAZING", buildDescription: "I'm open to freelance work and collaborations.",
    skillsFrontend: "FRONTEND", skillsBackend: "BACKEND & BOTS", skillsTools: "ARCHITECTURE & TOOLS", learning: "Always learning and exploring new technologies", learningDetail: "// Currently diving into: AI agents, LLM integrations",
    status: "AVAILABLE FOR WORK", contactLabels: ["NAME", "EMAIL", "SUBJECT", "MESSAGE", "LOCATION", "TELEGRAM", "TIMEZONE"], connect: "CONNECT WITH ME",
    contactSuccess: "✓ Message delivered to my Telegram!", contactError: "Error. Try again.", terminalOnline: "✓ Online and ready to collaborate", responseTime: "< 24 hours",
    downloadResume: "DOWNLOAD RESUME",
    experienceItems: [
      { position: "Fullstack Developer", period: "Sep 2026 — Present", location: "Tashkent · UzCombinator", points: ["Fullstack developer at an AI startup, joined through the UzCombinator startup ecosystem.", "Building both the frontend and the backend of the product."] },
      { position: "Freelance Developer", period: "Jun 2026 — Present", location: "Remote", points: ["Delivered CRM systems, admin panels and Telegram bots for multiple clients.", "Built a furniture, mattress and craftsmen marketplace (FastAPI, React, PostGIS), live in production."] },
      { position: "Frontend Developer", period: "Nov 2025 — May 2026", location: "Tashkent", points: ["Built KAS CRM, a Telegram-integrated AI sales CRM: FSD architecture, dark theme, Recharts dashboards and a chat UI.", "Redesigned the CIMS enterprise dashboard: design token system and reusable component library (MetricCard, DataTable, Badge)."] },
    ] as ExperienceText[],
    footerBuilt: "Designed & Built with 💚 by Mirzohid", online: "SYSTEM ONLINE", deployed: "DEPLOYED ON VERCEL",
    visitors: "VISITORS",
    projectDetails: {
      "kas-crm": { title: "KAS CRM", description: "A Telegram-integrated AI sales CRM for leads, chats, products, stores, users and AI settings. FSD architecture, dark theme, Recharts dashboards and a real-time chat interface.", highlights: ["Telegram-integrated chat UI", "Recharts sales dashboards", "FSD, token refresh auth and bulk import"] },
      "cognilabs-cims": { title: "CogniLabs CIMS", description: "A redesign of the enterprise management dashboard: CEO dashboard, CRM panel, permissions, team monitoring, Kanban and AI chat — rebuilt on a design token system and a reusable component library.", highlights: ["Design token system", "MetricCard, DataTable and Badge components", "Uzbek, English and Russian interface"] },
      "bunyodkor-cims": { title: "Bunyodkor CIMS", description: "A football academy management dashboard: students, payments, attendance, coaches, groups and contracts. 130+ API endpoints, RBAC, FSD and an MSW + Faker.js mock layer for the demo build.", highlights: ["130+ API endpoints integrated", "RBAC and Feature-Sliced Design", "MSW + Faker.js mock layer (60+ endpoints)"] },
      marketplace: { title: "Furniture Marketplace", description: "A marketplace for furniture, mattresses and craftsmen, with PostGIS geo-search to find nearby workshops and stores on a map. Freelance project — live in production.", highlights: ["FastAPI backend + React frontend", "PostGIS-powered geo search", "Deployed to production"] },
      devcrm: { title: "DevCrm", description: "A CRM for education centres with director and teacher roles, attendance, schedule and finance screens. Uzbek-first UI with RU/EN translations.", highlights: ["Director / teacher roles", "Attendance, schedule and finance", "UZ / RU / EN interface"] },
      "365-crm": { title: "365 Magazine Sales CRM", description: "A sales management system with role-based access for operators and admins, a real-time WebSocket queue, client and order management, Telegram broadcasts, PDF channel tracking, subscriptions and KPI analytics.", highlights: ["Operator and admin workflows", "Real-time WebSocket queue", "Analytics, PDF tracking and Telegram broadcasts"] },
      "currency-tracker": { title: "Currency Tracker", description: "A full-stack app that collects exchange rates from the Central Bank of Uzbekistan API and major banks. React admin panel, Telegram bot, deployed with PM2 and Nginx on AWS EC2.", highlights: ["Central Bank and bank rates", "React admin panel + Telegram bot", "AWS EC2, PM2 and Nginx"] },
      "tdiu-bot": { title: "TDIU Admissions Bot", description: "A Telegram bot (Python, aiogram) for prospective students, with a 12-section menu and an RBAC admin panel.", highlights: ["12-section interactive menu", "RBAC admin panel", "Python + aiogram"] },
      evoting: { title: "Electronic Voting System", description: "An electronic voting platform with role-based routing, active polls, real-time results, Recharts analytics and PDF export.", highlights: ["Role-based routing", "Recharts analytics", "PDF export"] },
    } as Record<string, ProjectDetail>,
  },
  ru: {
    nav: ["ГЛАВНАЯ", "ОБО МНЕ", "НАВЫКИ", "ПРОЕКТЫ", "ОПЫТ", "КОНТАКТЫ"],
    hello: "<ПРИВЕТ МИР /> Я",
    roles: ["FRONTEND РАЗРАБОТЧИК", "FULLSTACK РАЗРАБОТЧИК", "REACT + TYPESCRIPT", "TELEGRAM-БОТЫ", "CRM И АДМИН-ПАНЕЛИ"],
    heroDescription: "Создаю B2B CRM-системы, админ-панели и Telegram-ботов. Сильные стороны — React, TypeScript и Feature-Sliced Design; бэкенд пишу на FastAPI.",
    viewProjects: "[ СМОТРЕТЬ ПРОЕКТЫ ]", getInTouch: "СВЯЗАТЬСЯ →",
    about: "ОБО МНЕ", aboutTitle: "КТО Я?", skills: "НАВЫКИ И ТЕХНОЛОГИИ", projects: "ИЗБРАННЫЕ ПРОЕКТЫ",
    projectIntro: "CRM, дашборды, маркетплейс и Telegram-боты в продакшене — для реальных клиентов и реальных пользователей.",
    featured: "ИЗБРАННОЕ", viewDetails: "ПОДРОБНЕЕ →", close: "ЗАКРЫТЬ", gallery: "ПРОЕКТ", workDone: "ЧТО СДЕЛАНО", technologies: "ТЕХНОЛОГИИ",
    experience: "ОПЫТ РАБОТЫ", contact: "СВЯЗАТЬСЯ СО МНОЙ", send: "ОТПРАВИТЬ", language: "ЯЗЫК",
    aboutIntro: "Я frontend-разработчик: создаю B2B CRM-системы, админ-панели, Telegram-ботов и клиентские проекты. Сильные стороны — React, TypeScript и Feature-Sliced Design, есть fullstack-опыт (FastAPI, Node.js) и продакшен-деплои.",
    aboutSpecialty: "Сейчас работаю fullstack-разработчиком в AI-стартапе Mimoram из экосистемы UzCombinator. Совмещаю инженерию с обучением менеджменту в ТГЭУ и активным лидерским опытом.",
    techStack: "ТЕХНОЛОГИИ", stats: ["ЛЕТ ОПЫТА", "ПРОЕКТОВ", "ТЕХНОЛОГИЙ", "ДОВОЛЬНЫХ КЛИЕНТОВ"],
    journey: "ПУТЬ", available: "ОТКРЫТ ДЛЯ РАБОТЫ", contactIntro: "Есть проект? Отправьте сообщение — оно сразу попадёт в мой Telegram.",
    buildTitle: "СОЗДАДИМ ЧТО-ТО ПОТРЯСАЮЩЕЕ", buildDescription: "Открыт для freelance и сотрудничества.",
    skillsFrontend: "FRONTEND", skillsBackend: "BACKEND И БОТЫ", skillsTools: "АРХИТЕКТУРА И ИНСТРУМЕНТЫ", learning: "Всегда изучаю новые технологии", learningDetail: "// Сейчас: AI-агенты, LLM-интеграции",
    status: "ОТКРЫТ ДЛЯ РАБОТЫ", contactLabels: ["ИМЯ", "EMAIL", "ТЕМА", "СООБЩЕНИЕ", "МЕСТОПОЛОЖЕНИЕ", "TELEGRAM", "ЧАСОВОЙ ПОЯС"], connect: "СВЯЗАТЬСЯ СО МНОЙ",
    contactSuccess: "✓ Сообщение отправлено в мой Telegram!", contactError: "Ошибка. Попробуйте ещё раз.", terminalOnline: "✓ Готов к сотрудничеству", responseTime: "< 24 часов",
    downloadResume: "СКАЧАТЬ РЕЗЮМЕ",
    experienceItems: [
      { position: "Fullstack-разработчик", period: "Сен 2026 — Сейчас", location: "Ташкент · UzCombinator", points: ["Fullstack-разработчик в AI-стартапе, пришёл через стартап-экосистему UzCombinator.", "Разрабатываю и фронтенд, и бэкенд продукта."] },
      { position: "Freelance-разработчик", period: "Июн 2026 — Сейчас", location: "Удалённо", points: ["Сделал CRM-системы, админ-панели и Telegram-ботов для нескольких клиентов.", "Построил маркетплейс мебели, матрасов и мастеров (FastAPI, React, PostGIS) — работает в продакшене."] },
      { position: "Frontend-разработчик", period: "Ноя 2025 — Май 2026", location: "Ташкент", points: ["Создал KAS CRM — AI CRM для продаж с интеграцией Telegram: FSD, тёмная тема, дашборды Recharts и чат-интерфейс.", "Редизайн корпоративного дашборда CIMS: система дизайн-токенов и библиотека компонентов (MetricCard, DataTable, Badge)."] },
    ] as ExperienceText[],
    footerBuilt: "Создано с 💚 Мирзохидом", online: "СИСТЕМА ОНЛАЙН", deployed: "РАЗВЁРНУТО НА VERCEL",
    visitors: "ПОСЕТИТЕЛИ",
    projectDetails: {
      "kas-crm": { title: "KAS CRM", description: "AI CRM для продаж с интеграцией Telegram: лиды, чаты, товары, магазины, пользователи и AI-настройки. FSD-архитектура, тёмная тема, дашборды Recharts и чат-интерфейс.", highlights: ["Чат-интерфейс с интеграцией Telegram", "Дашборды продаж на Recharts", "FSD, обновление токена и массовый импорт"] },
      "cognilabs-cims": { title: "CogniLabs CIMS", description: "Редизайн корпоративного дашборда: CEO dashboard, CRM, права доступа, мониторинг команды, Kanban и AI-чат — на системе дизайн-токенов и библиотеке переиспользуемых компонентов.", highlights: ["Система дизайн-токенов", "Компоненты MetricCard, DataTable, Badge", "Интерфейс на трёх языках"] },
      "bunyodkor-cims": { title: "Bunyodkor CIMS", description: "Дашборд управления футбольной академией: ученики, платежи, посещаемость, тренеры, группы и договоры. 130+ API-эндпоинтов, RBAC, FSD и mock-слой MSW + Faker.js для демо.", highlights: ["Интеграция 130+ API-эндпоинтов", "RBAC и Feature-Sliced Design", "Mock-слой MSW + Faker.js (60+ эндпоинтов)"] },
      marketplace: { title: "Маркетплейс мебели", description: "Маркетплейс мебели, матрасов и мастеров с гео-поиском на PostGIS — ближайшие мастерские и магазины на карте. Freelance-проект, работает в продакшене.", highlights: ["FastAPI бэкенд + React фронтенд", "Гео-поиск на PostGIS", "Развёрнут в продакшене"] },
      devcrm: { title: "DevCrm", description: "CRM для учебных центров: роли директора и преподавателя, посещаемость, расписание и финансы. Интерфейс в первую очередь на узбекском, с переводами RU/EN.", highlights: ["Роли директора / преподавателя", "Посещаемость, расписание, финансы", "Интерфейс UZ / RU / EN"] },
      "365-crm": { title: "365 Magazine Sales CRM", description: "Система продаж с ролями операторов и администраторов, очередью WebSocket в реальном времени, управлением клиентами и заказами, Telegram-рассылками, PDF-трекингом, подписками и KPI-аналитикой.", highlights: ["Рабочие процессы операторов и админов", "Очередь WebSocket в реальном времени", "Аналитика, PDF-трекинг и Telegram"] },
      "currency-tracker": { title: "Currency Tracker", description: "Fullstack-приложение, собирающее курсы валют из API Центробанка Узбекистана и крупных банков. React админ-панель, Telegram-бот, деплой на AWS EC2 с PM2 и Nginx.", highlights: ["Курсы ЦБ и банков", "React админ-панель + Telegram-бот", "AWS EC2, PM2 и Nginx"] },
      "tdiu-bot": { title: "TDIU Admissions Bot", description: "Telegram-бот (Python, aiogram) для абитуриентов: меню из 12 разделов и админ-панель с RBAC.", highlights: ["Интерактивное меню из 12 разделов", "Админ-панель с RBAC", "Python + aiogram"] },
      evoting: { title: "Electronic Voting System", description: "Платформа электронного голосования: маршрутизация по ролям, активные опросы, результаты в реальном времени, аналитика Recharts и экспорт в PDF.", highlights: ["Маршрутизация по ролям", "Аналитика на Recharts", "Экспорт в PDF"] },
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

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
