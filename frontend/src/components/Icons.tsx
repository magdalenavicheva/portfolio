import type { ReactNode } from "react"
import type { ProjectGlyph } from "../content/projects"

export type IconName =
    | "user"
    | "folder"
    | "briefcase"
    | "layers"
    | "mail"
    | "file"
    | "code"
    | "idcard"
    | "sun"
    | "moon"
    | "close"
    | "minus"
    | "arrowUpRight"
    | "arrowLeft"
    | "arrowRight"
    | "copy"
    | "check"
    | "download"
    | ProjectGlyph

const PATHS: Record<IconName, ReactNode> = {
    user: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </>
    ),
    folder: <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h5l2 2.5h8A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z" />,
    briefcase: (
        <>
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" />
        </>
    ),
    layers: (
        <>
            <path d="M12 3 3 8l9 5 9-5z" />
            <path d="m3 12.5 9 5 9-5M3 17l9 5 9-5" />
        </>
    ),
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
        </>
    ),
    file: (
        <>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5M9 13h6M9 17h4" />
        </>
    ),
    code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" />,
    idcard: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="11" r="2.2" />
            <path d="M5.8 16.5c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14.5 10h3.5M14.5 13.5h3.5" />
        </>
    ),
    sun: (
        <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
    ),
    moon: <path d="M20.5 13.2A8.5 8.5 0 1 1 10.8 3.5a6.6 6.6 0 0 0 9.7 9.7z" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    minus: <path d="M6 12h12" />,
    arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
    arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    copy: (
        <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h8" />
        </>
    ),
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    download: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
    plane: <path d="M21 4 3 11l7 2.5L12.5 21 21 4zM10 13.5 21 4" />,
    desk: (
        <>
            <rect x="4" y="4" width="16" height="10" rx="1.5" />
            <path d="M9.5 18h5M12 14v4M3 21h18" />
        </>
    ),
    chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6M20 16V6" />,
    bell: (
        <>
            <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
            <path d="M10 20.5a2 2 0 0 0 4 0M12 3v2" />
        </>
    ),
    ticket: (
        <>
            <path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 1 0-4V6H3z" />
            <path d="M14 6v12" strokeDasharray="2 2" />
        </>
    ),
    film: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
        </>
    ),
}

type IconProps = {
    name: IconName
    size?: number
    strokeWidth?: number
    className?: string
}

export default function Icon({ name, size = 20, strokeWidth = 1.6, className }: IconProps) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {PATHS[name]}
        </svg>
    )
}
