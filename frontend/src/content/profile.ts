import type { L } from "../i18n/types"

export const profile = {
    name: "Magdalena Vicheva",
    email: "mvicheva2024@gmail.com",
    github: "https://github.com/magdalenavicheva",
    linkedin: "https://www.linkedin.com/in/magdalenavicheva/",
    cv: "/Magdalena_Vicheva_CV.pdf",
    city: { en: "Eindhoven, the Netherlands", bg: "Айндховен, Нидерландия" } as L,
}

export type CreditRow = { role: L; names: string[] | L[] }

export const credits: { role: L; names: (string | L)[] }[] = [
    { role: { en: "Languages", bg: "Езици" }, names: ["Java", "C#", "TypeScript", "JavaScript", "SQL", "HTML / CSS"] },
    {
        role: { en: "Frameworks", bg: "Фреймуърци" },
        names: ["Spring Boot", "Spring Security", "ASP.NET Core MVC", "Entity Framework", "React"],
    },
    { role: { en: "Real-time", bg: "В реално време" }, names: ["WebSockets (STOMP)", "SignalR"] },
    { role: { en: "Databases", bg: "Бази данни" }, names: ["PostgreSQL", "SQL Server", "Flyway"] },
    {
        role: { en: "Testing", bg: "Тестване" },
        names: ["JUnit", "Vitest", "Cypress", "MSTest", "Moq"],
    },
    {
        role: { en: "Tools", bg: "Инструменти" },
        names: ["Git", "GitLab CI/CD", "Docker", "SonarQube"],
    },
    {
        role: { en: "Soft skills", bg: "Меки умения" },
        names: [
            { en: "Communication", bg: "Комуникация" },
            { en: "Teamwork", bg: "Работа в екип" },
            { en: "Problem-solving", bg: "Решаване на проблеми" },
            { en: "Adaptability", bg: "Адаптивност" },
            { en: "Time management", bg: "Управление на времето" },
            { en: "Organisation", bg: "Организираност" },
        ],
    },
]

export const spokenLanguages: { lang: L; level: L }[] = [
    { lang: { en: "Bulgarian", bg: "Български" }, level: { en: "Native", bg: "Майчин" } },
    { lang: { en: "English", bg: "Английски" }, level: { en: "C1 · IELTS Academic 7", bg: "C1 · IELTS Academic 7" } },
    { lang: { en: "German", bg: "Немски" }, level: { en: "A1 · learning", bg: "A1 · уча в момента" } },
]

export type Role = {
    title: L
    org: string
    orgNote: L
    period: L
    points: L[]
}

export const roles: Role[] = [
    {
        title: { en: "Event Committee Leader", bg: "Ръководител на комисията по събития" },
        org: "Proxy",
        orgNote: { en: "my study association at Fontys", bg: "моята студентска асоциация във Fontys" },
        period: { en: "Sep 2026 – now", bg: "септ. 2026 – сега" },
        points: [
            {
                en: "Lead the event committee and oversee every event, from the first plan to the night itself.",
                bg: "Ръководя комисията и отговарям за всяко събитие – от първия план до самата вечер.",
            },
            {
                en: "Act as the link between our members and the board.",
                bg: "Свързващо звено между членовете и борда.",
            },
            {
                en: "Run the stand-up meetings for all the teams.",
                bg: "Водя стендъп срещите на всички екипи.",
            },
            {
                en: "Before this: two years as an active member (2024 – 2026).",
                bg: "Преди това: две години активен член (2024 – 2026).",
            },
        ],
    },
    {
        title: { en: "Waitress (part-time)", bg: "Сервитьорка (почасово)" },
        org: "Smaeck Vermaeck Ketelhuis",
        orgNote: { en: "a busy restaurant in Eindhoven", bg: "оживен ресторант в Айндховен" },
        period: { en: "Oct 2025 – now", bg: "окт. 2025 – сега" },
        points: [
            {
                en: "Handle several tables during the rush, which taught me to stay calm and set priorities fast.",
                bg: "Обслужвам няколко маси в пиковите часове – научих се да запазвам спокойствие и бързо да подреждам приоритети.",
            },
            {
                en: "Communicate clearly with guests and colleagues in a fast-paced team.",
                bg: "Комуникирам ясно с гости и колеги в динамичен екип.",
            },
        ],
    },
]

export const education: { school: L; detail: L; period: string }[] = [
    {
        school: { en: "Fontys University of Applied Sciences", bg: "Fontys University of Applied Sciences" },
        detail: {
            en: "Bachelor of ICT – Software, Eindhoven. Also studying AI, Machine Learning & Data.",
            bg: "Бакалавър ICT – Software, Айндховен. Уча и AI, Machine Learning и Data.",
        },
        period: "2024 –",
    },
    {
        school: {
            en: "“Prof. Ivan Apostolov” Private Language School",
            bg: "ЧЕГ „Проф. Иван Апостолов“",
        },
        detail: {
            en: "Secondary school, Hardware & Software Studies, Sofia.",
            bg: "Средно образование, профил „Хардуер и софтуер“, София.",
        },
        period: "2019 – 2024",
    },
]

export const courses: { name: L; by: string; date: L }[] = [
    { name: { en: "Digital Sciences", bg: "Дигитални науки" }, by: "Telerik School Academy", date: { en: "Jun 2023", bg: "юни 2023" } },
    {
        name: { en: "Intellectual Property Masterclass", bg: "Мастърклас по интелектуална собственост" },
        by: "EUIPO",
        date: { en: "Dec 2022", bg: "дек. 2022" },
    },
]
