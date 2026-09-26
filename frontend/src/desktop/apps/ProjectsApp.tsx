import { useMemo, useState } from "react"
import { projects, type ProjectTag } from "../../content/projects"
import { useSettings } from "../../context/Settings"
import { strings } from "../../i18n/strings"
import Icon from "../../components/Icons"

type Filter = "all" | ProjectTag
const FILTERS: Filter[] = ["all", "java", "dotnet", "client", "solo"]

export default function ProjectsApp({ openProject }: { openProject: (id: string) => void }) {
    const { t } = useSettings()
    const [filter, setFilter] = useState<Filter>("all")
    const visible = useMemo(() => projects.filter((p) => filter === "all" || p.tags.includes(filter)), [filter])

    return (
        <div className="finder">
            <div className="finder__toolbar" role="group" aria-label={t(strings.projects.filterLabel)}>
                {FILTERS.map((f) => (
                    <button key={f} type="button" className="seg" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                        {t(strings.projects.filters[f])}
                    </button>
                ))}
            </div>
            <ul className="finder__grid">
                {visible.map((project) => (
                    <li key={project.id}>
                        <button type="button" className="file" onClick={() => openProject(project.id)}>
                            <span className="file__icon" style={{ background: project.color }}>
                                <Icon name={project.glyph} size={30} strokeWidth={1.5} />
                            </span>
                            <span className="file__name">{project.title}</span>
                            <span className="file__meta">{t(project.subtitle)}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <p className="finder__status">
                {visible.length} {t(strings.projects.items)} · {t(strings.projects.openHint)}
            </p>
        </div>
    )
}
