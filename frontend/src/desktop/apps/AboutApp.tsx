import photo from "../../assets/offset.webp"
import { profile } from "../../content/profile"
import { useSettings } from "../../context/Settings"
import { strings } from "../../i18n/strings"
import Icon from "../../components/Icons"
import type { AppId } from "../windowManager"

export default function AboutApp({ open }: { open: (id: AppId) => void }) {
    const { t } = useSettings()
    const s = strings.about
    const facts = [
        [s.factBased, profile.city],
        [s.factStudy, s.factStudyValue],
        [s.factNow, s.factNowValue],
        [s.factLooking, s.factLookingValue],
    ] as const

    return (
        <div className="about">
            <div className="about__top">
                <img className="about__photo" src={photo} alt="Magdalena Vicheva" width="866" height="900" />
                <div className="about__intro">
                    <p className="about__hello">{t(s.hello)}</p>
                    <p>{t(s.intro)}</p>
                </div>
            </div>
            <p>{t(s.body)}</p>
            <p className="about__offline">{t(s.offline)}</p>
            <dl className="facts">
                {facts.map(([label, value]) => (
                    <div key={label.en}>
                        <dt>{t(label)}</dt>
                        <dd>{t(value)}</dd>
                    </div>
                ))}
            </dl>
            <div className="actions">
                <button type="button" className="btn btn--primary" onClick={() => open("projects")}>
                    <Icon name="folder" size={16} /> {t(s.seeProjects)}
                </button>
                <button type="button" className="btn" onClick={() => open("contact")}>
                    <Icon name="mail" size={16} /> {t(s.contactMe)}
                </button>
                <a className="btn btn--quiet" href={profile.cv} download>
                    <Icon name="download" size={16} /> {t(s.downloadCv)}
                </a>
            </div>
        </div>
    )
}
