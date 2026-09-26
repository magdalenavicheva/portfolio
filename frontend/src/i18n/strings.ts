import type { L } from "./types"

/** Every piece of interface text, in English and Bulgarian. */
export const strings = {
    skipToContent: { en: "Skip to content", bg: "Към съдържанието" },

    apps: {
        about: { en: "About me", bg: "За мен" },
        projects: { en: "Projects", bg: "Проекти" },
        experience: { en: "Experience", bg: "Опит" },
        skills: { en: "Skills", bg: "Умения" },
        contact: { en: "Contact", bg: "Контакт" },
        cv: { en: "CV.pdf", bg: "CV.pdf" },
        github: { en: "GitHub", bg: "GitHub" },
        linkedin: { en: "LinkedIn", bg: "LinkedIn" },
        project: { en: "Project", bg: "Проект" },
    },

    menu: {
        status: { en: "Open to internships", bg: "Търся стаж" },
        language: { en: "Language", bg: "Език" },
        toDark: { en: "Switch to dark mode", bg: "Тъмен режим" },
        toLight: { en: "Switch to light mode", bg: "Светъл режим" },
    },

    desktop: {
        role: { en: "Software engineering student · Eindhoven", bg: "Студентка по софтуерно инженерство · Айндховен" },
        noteTitle: { en: "Note to self", bg: "Бележка" },
        note: {
            en: "Find a software engineering internship where I can keep learning.",
            bg: "Да намеря стаж по софтуерно инженерство, в който мога да продължа да се уча.",
        },
        noteCta: { en: "Could that be you? Say hi", bg: "Вие ли сте? Пишете ми" },
        home: { en: "Home", bg: "Начало" },
        hint: { en: "Tip: drag windows by their title bar", bg: "Съвет: местете прозорците за заглавната лента" },
    },

    window: {
        close: { en: "Close", bg: "Затвори" },
        minimize: { en: "Minimise", bg: "Намали" },
        back: { en: "Back", bg: "Назад" },
    },

    about: {
        hello: { en: "Hi, I'm Maggie.", bg: "Здравейте, аз съм Маги." },
        intro: {
            en: "I'm an ICT & Software student at Fontys University of Applied Sciences in Eindhoven, and I'm also studying AI, Machine Learning and Data.",
            bg: "Уча ICT & Software във Fontys University of Applied Sciences в Айндховен, а също и AI, Machine Learning и Data.",
        },
        body: {
            en: "I build full-stack web applications with Java Spring Boot or C#/.NET on the backend and React on the frontend. I've worked on projects for real clients like BAS World, Driessen and CGI, and now I'm looking for an internship where I can keep learning in a professional development team.",
            bg: "Създавам full-stack уеб приложения с Java Spring Boot или C#/.NET за бекенда и React за фронтенда. Работила съм по проекти за реални клиенти като BAS World, Driessen и CGI, а сега търся стаж, в който да продължа да се уча в професионален екип.",
        },
        offline: {
            en: "Outside of code I lead the event committee of Proxy, my study association, work a few dinner shifts a week, and I'm usually halfway through a film or series.",
            bg: "Извън кода ръководя комисията по събития на Proxy, моята студентска асоциация, работя няколко вечерни смени седмично и обикновено съм по средата на някой филм или сериал.",
        },
        factBased: { en: "Based in", bg: "Намирам се в" },
        factStudy: { en: "Studying", bg: "Уча" },
        factStudyValue: { en: "Bachelor ICT – Software, Fontys", bg: "Бакалавър ICT – Software, Fontys" },
        factNow: { en: "Currently", bg: "В момента" },
        factNowValue: { en: "Event Committee Leader, Proxy", bg: "Ръководител на комисията по събития, Proxy" },
        factLooking: { en: "Looking for", bg: "Търся" },
        factLookingValue: { en: "A software engineering internship", bg: "Стаж по софтуерно инженерство" },
        seeProjects: { en: "See my projects", bg: "Виж проектите ми" },
        contactMe: { en: "Contact me", bg: "Свържи се с мен" },
        downloadCv: { en: "Download CV", bg: "Изтегли CV" },
    },

    projects: {
        items: { en: "items", bg: "елемента" },
        filters: {
            all: { en: "All", bg: "Всички" },
            java: { en: "Java & Spring", bg: "Java & Spring" },
            dotnet: { en: "C# & .NET", bg: "C# & .NET" },
            client: { en: "Client work", bg: "За клиенти" },
            solo: { en: "Solo", bg: "Самостоятелни" },
        },
        filterLabel: { en: "Filter projects", bg: "Филтрирай проектите" },
        solo: { en: "Solo project", bg: "Самостоятелен проект" },
        team: { en: "Team project", bg: "Екипен проект" },
        forClient: { en: "for", bg: "за" },
        latest: { en: "Latest", bg: "Най-нов" },
        whatIBuilt: { en: "What I built", bg: "Какво направих" },
        stack: { en: "Tech stack", bg: "Технологии" },
        viewOnGithub: { en: "View on GitHub", bg: "Виж в GitHub" },
        previous: { en: "Previous", bg: "Предишен" },
        next: { en: "Next", bg: "Следващ" },
        openHint: { en: "Open a project to see the details and code.", bg: "Отвори проект, за да видиш детайлите и кода." },
    },

    experience: {
        work: { en: "Experience", bg: "Опит" },
        education: { en: "Education", bg: "Образование" },
        courses: { en: "Courses", bg: "Курсове" },
    },

    skills: {
        spoken: { en: "Languages I speak", bg: "Езици, които говоря" },
    },

    contact: {
        title: { en: "Let's talk", bg: "Да поговорим" },
        intro: {
            en: "Hiring an intern, or just want to say hi? The quickest way to reach me is by e-mail or on LinkedIn.",
            bg: "Търсите стажант или просто искате да поздравите? Най-бързо ще се свържете с мен по имейл или в LinkedIn.",
        },
        writeEmail: { en: "Write me an e-mail", bg: "Напишете ми имейл" },
        orWriteFrom: { en: "Or write from", bg: "Или пишете от" },
        emailSubject: { en: "Internship opportunity", bg: "Възможност за стаж" },
        email: { en: "E-mail", bg: "Имейл" },
        location: { en: "Location", bg: "Локация" },
        copy: { en: "Copy", bg: "Копирай" },
        copied: { en: "Copied", bg: "Копирано" },
        cv: { en: "My CV", bg: "Моето CV" },
        downloadCv: { en: "Download (PDF)", bg: "Изтегли (PDF)" },
    },
} satisfies Record<string, unknown>

export type { L }
