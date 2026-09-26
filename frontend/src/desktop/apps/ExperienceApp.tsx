import { courses, education, roles } from "../../content/profile"
import { useSettings } from "../../context/Settings"
import { strings } from "../../i18n/strings"

export default function ExperienceApp() {
    const { t } = useSettings()
    return (
        <div className="timeline">
            <h3 className="label">{t(strings.experience.work)}</h3>
            <ol className="timeline__list">
                {roles.map((role) => (
                    <li key={role.org} className="timeline__item">
                        <p className="timeline__when">{t(role.period)}</p>
                        <p className="timeline__what">{t(role.title)}</p>
                        <p className="timeline__where">
                            {role.org} · {t(role.orgNote)}
                        </p>
                        <ul className="bullets">
                            {role.points.map((p) => (
                                <li key={p.en}>{t(p)}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>

            <h3 className="label">{t(strings.experience.education)}</h3>
            <ol className="timeline__list">
                {education.map((e) => (
                    <li key={e.school.en} className="timeline__item">
                        <p className="timeline__when">{e.period}</p>
                        <p className="timeline__what">{t(e.school)}</p>
                        <p className="timeline__where">{t(e.detail)}</p>
                    </li>
                ))}
            </ol>

            <h3 className="label">{t(strings.experience.courses)}</h3>
            <ol className="timeline__list">
                {courses.map((c) => (
                    <li key={c.name.en} className="timeline__item">
                        <p className="timeline__when">{t(c.date)}</p>
                        <p className="timeline__what">{t(c.name)}</p>
                        <p className="timeline__where">{c.by}</p>
                    </li>
                ))}
            </ol>
        </div>
    )
}
