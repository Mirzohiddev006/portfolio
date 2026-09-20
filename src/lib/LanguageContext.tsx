import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Language = "uz" | "en" | "ru";

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
  },
} as const;

type TranslationSet = (typeof translations)[Language];
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: TranslationSet };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("uz");
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
