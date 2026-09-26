import { credits, spokenLanguages } from "../../content/profile"
import { useSettings } from "../../context/Settings"
import { strings } from "../../i18n/strings"

export default function SkillsApp() {
    const { t } = useSettings()
    return (
        <div className="skills">
            {credits.map((group) => (
                <section key={group.role.en} className="skills__group">
                    <h3 className="label">{t(group.role)}</h3>
                    <ul className="chips">
                        {group.names.map((name) => {
                            const label = typeof name === "string" ? name : t(name)
                            return <li key={label}>{label}</li>
                        })}
                    </ul>
                </section>
            ))}
            <section className="skills__group">
                <h3 className="label">{t(strings.skills.spoken)}</h3>
                <ul className="chips">
                    {spokenLanguages.map((l) => (
                        <li key={l.lang.en}>
                            {t(l.lang)} <span className="chips__muted">{t(l.level)}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}
