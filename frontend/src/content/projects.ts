import type { L } from "../i18n/types"

export type ProjectTag = "java" | "dotnet" | "client" | "solo"

export type Repo = { label: L; url: string }

export type ProjectGlyph = "plane" | "desk" | "chart" | "bell" | "ticket" | "film"

export type Project = {
    id: string
    /** cover colour of the project's icon and window header */
    color: string
    glyph: ProjectGlyph
    title: string
    subtitle: L
    /** Solo = individual project, Ensemble = team project */
    billing: "solo" | "ensemble"
    client?: string
    period: L
    logline: L
    highlights: L[]
    stack: string[]
    repos: Repo[]
    tags: ProjectTag[]
}

const GH = "https://github.com/magdalenavicheva/"
const FRONTEND: L = { en: "Frontend", bg: "Frontend" }
const BACKEND: L = { en: "Backend", bg: "Backend" }
const CODE: L = { en: "Source code", bg: "Кодът" }

/** Newest first. The first one is shown as the premiere. */
export const projects: Project[] = [
    {
        id: "triply",
        color: "#5f7a3a",
        glyph: "plane",
        title: "Triply",
        subtitle: { en: "Group Trip Planner", bg: "Планиране на групови пътувания" },
        billing: "solo",
        period: { en: "Mar – Jun 2026", bg: "март – юни 2026" },
        logline: {
            en: "Friend groups share when they are free, vote on the dates, and finally book the trip everyone keeps talking about.",
            bg: "Приятелски групи споделят кога са свободни, гласуват за дати и най-накрая правят пътуването, за което все си говорят.",
        },
        highlights: [
            {
                en: "A date-suggestion algorithm that finds the ranges that work for the most people",
                bg: "Алгоритъм, който предлага дати, удобни за най-много хора",
            },
            {
                en: "Real-time group chat and voting over WebSockets (STOMP)",
                bg: "Групов чат и гласуване в реално време чрез WebSockets (STOMP)",
            },
            {
                en: "JWT authentication, e-mail invites and a Flyway-managed PostgreSQL schema",
                bg: "JWT автентикация, покани по имейл и PostgreSQL схема с Flyway",
            },
            {
                en: "GitLab CI/CD with JUnit, Vitest and Cypress tests, a SonarQube quality gate and Docker images",
                bg: "GitLab CI/CD с тестове на JUnit, Vitest и Cypress, SonarQube и Docker образи",
            },
        ],
        stack: ["Java 21", "Spring Boot", "React", "TypeScript", "PostgreSQL", "WebSockets", "Docker", "GitLab CI"],
        repos: [
            { label: FRONTEND, url: GH + "triply-frontend" },
            { label: BACKEND, url: GH + "Triply-Backend" },
        ],
        tags: ["java", "solo"],
    },
    {
        id: "driessen",
        color: "#8a6d3b",
        glyph: "desk",
        title: "Driessen Desk Booking",
        subtitle: { en: "Desk & Room Booking System", bg: "Резервиране на бюра и зали" },
        billing: "ensemble",
        client: "Driessen",
        period: { en: "Mar – Jun 2026", bg: "март – юни 2026" },
        logline: {
            en: "A booking platform for desks and meeting rooms, with team schedules and leave requests.",
            bg: "Платформа за резервиране на бюра и зали, с графици на екипите и заявки за отпуск.",
        },
        highlights: [
            { en: "Built the login and team management", bg: "Изградих входа в системата и управлението на екипи" },
            { en: "Automatic booking confirmation e-mails", bg: "Автоматични имейли за потвърждение на резервации" },
            {
                en: "Fixed and stabilised the Flyway database migrations",
                bg: "Поправих и стабилизирах миграциите на базата данни с Flyway",
            },
        ],
        stack: ["Java", "Spring Boot", "Spring Security", "React", "PostgreSQL", "Flyway", "Docker"],
        repos: [
            { label: FRONTEND, url: GH + "driessen-frontend" },
            { label: BACKEND, url: GH + "driessen-backend" },
        ],
        tags: ["java", "client"],
    },
    {
        id: "bas",
        color: "#3f6170",
        glyph: "chart",
        title: "BAS World",
        subtitle: { en: "Sales Dashboard", bg: "Табло за продажби" },
        billing: "ensemble",
        client: "BAS World",
        period: { en: "Sep 2025 – Jan 2026", bg: "септ. 2025 – ян. 2026" },
        logline: {
            en: "Sales analytics for an international commercial-vehicle trader: which trucks sell, where, and for how much.",
            bg: "Анализ на продажбите за международен търговец на товарни автомобили: кои камиони се продават, къде и на каква цена.",
        },
        highlights: [
            { en: "Owned the Products module from database to screen", bg: "Отговарях за модула Products – от базата до екрана" },
            {
                en: "Backend endpoints for KPIs and revenue trends",
                bg: "Backend ендпойнти за KPI и тенденции в приходите",
            },
            {
                en: "A products page with filters and Recharts charts",
                bg: "Страница с продукти, филтри и графики с Recharts",
            },
        ],
        stack: ["Java 17", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Recharts"],
        repos: [
            { label: FRONTEND, url: GH + "bas-frontend" },
            { label: BACKEND, url: GH + "bas-backend" },
        ],
        tags: ["java", "client"],
    },
    {
        id: "redbell",
        color: "#8e4a42",
        glyph: "bell",
        title: "RedBell",
        subtitle: { en: "Restaurant Ordering System", bg: "Система за поръчки в ресторант" },
        billing: "solo",
        period: { en: "Oct – Dec 2025", bg: "окт. – дек. 2025" },
        logline: {
            en: "Three connected apps that carry an order from the table to the kitchen and back. Built by someone who knows the dinner rush first-hand.",
            bg: "Три свързани приложения, които водят поръчката от масата до кухнята и обратно. Създадено от човек, който познава вечерния пик от първо лице.",
        },
        highlights: [
            {
                en: "A customer menu, a kitchen display and a waiter app",
                bg: "Меню за клиенти, дисплей за кухнята и приложение за сервитьори",
            },
            {
                en: "Orders reach the kitchen in real time over WebSockets",
                bg: "Поръчките стигат до кухнята в реално време чрез WebSockets",
            },
            { en: "Table management and PDF bills", bg: "Управление на масите и сметки в PDF" },
        ],
        stack: ["Java 17", "Spring Boot", "React", "TypeScript", "PostgreSQL", "WebSockets", "Docker"],
        repos: [{ label: CODE, url: GH + "RedBell" }],
        tags: ["java", "solo"],
    },
    {
        id: "nera",
        color: "#5f5277",
        glyph: "ticket",
        title: "NERA",
        subtitle: { en: "Event Management Platform", bg: "Платформа за събития" },
        billing: "ensemble",
        client: "CGI",
        period: { en: "Mar – Jun 2025", bg: "март – юни 2025" },
        logline: {
            en: "Events with registration, Stripe payments, QR-code tickets and live comments.",
            bg: "Събития с регистрация, плащания през Stripe, билети с QR код и коментари на живо.",
        },
        highlights: [
            {
                en: "Built event creation with photo uploads and participant limits",
                bg: "Изградих създаването на събития с качване на снимки и лимит на участниците",
            },
            { en: "Wrote unit tests for 12 services", bg: "Написах unit тестове за 12 услуги" },
            { en: "Live comments with SignalR", bg: "Коментари на живо със SignalR" },
        ],
        stack: ["C#", "ASP.NET Core MVC", ".NET 8", "Entity Framework", "SQL Server", "SignalR"],
        repos: [{ label: CODE, url: GH + "NERA" }],
        tags: ["dotnet", "client"],
    },
    {
        id: "popcorn",
        color: "#9a7f36",
        glyph: "film",
        title: "The Popcorn Vault",
        subtitle: { en: "Movie & Series Platform", bg: "Платформа за филми и сериали" },
        billing: "solo",
        period: { en: "Apr – Jun 2025", bg: "апр. – юни 2025" },
        logline: {
            en: "Browse, rate and review movies and series, keep a list of favourites, and run the catalogue from an admin panel.",
            bg: "Разглеждай, оценявай и пиши ревюта за филми и сериали, пази любимите си и управлявай каталога от админ панел.",
        },
        highlights: [
            {
                en: "Layered architecture: Core, Data Access, Services and ViewModels",
                bg: "Слоеста архитектура: Core, Data Access, Services и ViewModels",
            },
            { en: "Unit tests with MSTest and Moq", bg: "Unit тестове с MSTest и Moq" },
            { en: "Admin panel for managing the catalogue", bg: "Админ панел за управление на каталога" },
        ],
        stack: ["C#", "ASP.NET Core MVC", ".NET 8", "SQL Server", "MSTest", "Moq"],
        repos: [{ label: CODE, url: GH + "the-popcorn-vault-project" }],
        tags: ["dotnet", "solo"],
    },
]
