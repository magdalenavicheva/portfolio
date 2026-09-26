import { projects } from "../../content/projects"
import { useSettings } from "../../context/Settings"
import { strings } from "../../i18n/strings"
import Icon from "../../components/Icons"

export default function ProjectApp({ projectId, show }: { projectId: string; show: (id: string) => void }) {
    const { t } = useSettings()
    const index = Math.max(0, projects.findIndex((p) => p.id === projectId))
    const project = projects[index]
    const prev = projects[(index - 1 + projects.length) % projects.length]
    const next = projects[(index + 1) % projects.length]
    const s = strings.projects

    return (
        <article className="project" aria-label={project.title}>
            <header className="project__head" style={{ background: project.color }}>
                <span className="project__glyph">
                    <Icon name={project.glyph} size={34} strokeWidth={1.4} />
                </span>
                <div>
                    <h3 className="project__title">{project.title}</h3>
                    <p className="project__subtitle">{t(project.subtitle)}</p>
                </div>
            </header>

            <div className="project__content">
                <ul className="tags">
                    {index === 0 && <li className="tag tag--accent">{t(s.latest)}</li>}
                    <li className="tag">
                        {project.billing === "solo" ? t(s.solo) : `${t(s.team)}${project.client ? ` ${t(s.forClient)} ${project.client}` : ""}`}
                    </li>
                    <li className="tag">{t(project.period)}</li>
                </ul>

                <p className="project__logline">{t(project.logline)}</p>

                <h4 className="label">{t(s.whatIBuilt)}</h4>
                <ul className="bullets">
                    {project.highlights.map((h) => (
                        <li key={h.en}>{t(h)}</li>
                    ))}
                </ul>

                <h4 className="label">{t(s.stack)}</h4>
                <ul className="chips">
                    {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <div className="actions">
                    {project.repos.map((repo, i) => (
                        <a
                            key={repo.url}
                            className={`btn${i === 0 ? " btn--primary" : ""}`}
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${t(s.viewOnGithub)}: ${project.title} ${t(repo.label)}`}
                        >
                            <Icon name="code" size={16} /> {t(s.viewOnGithub)}
                            {project.repos.length > 1 && <span className="btn__sub">{t(repo.label)}</span>}
                            <Icon name="arrowUpRight" size={14} />
                        </a>
                    ))}
                </div>
            </div>

            <footer className="project__nav">
                <button type="button" className="link-btn" onClick={() => show(prev.id)}>
                    <Icon name="arrowLeft" size={16} /> {t(s.previous)}: {prev.title}
                </button>
                <button type="button" className="link-btn" onClick={() => show(next.id)}>
                    {t(s.next)}: {next.title} <Icon name="arrowRight" size={16} />
                </button>
            </footer>
        </article>
    )
}
