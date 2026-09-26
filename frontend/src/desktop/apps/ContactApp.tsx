import { useState } from "react"
import { profile } from "../../content/profile"
import { useSettings } from "../../context/Settings"
import { strings } from "../../i18n/strings"
import Icon from "../../components/Icons"

export default function ContactApp() {
    const { t } = useSettings()
    const s = strings.contact
    const [copied, setCopied] = useState(false)
    const subject = encodeURIComponent(t(s.emailSubject))
    const mailto = `mailto:${profile.email}?subject=${subject}`
    // Many people have no desktop mail app set up, so also offer the two big web mail apps.
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}`
    const outlook = `https://outlook.office.com/mail/deeplink/compose?to=${profile.email}&subject=${subject}`

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(profile.email)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            // Clipboard not allowed: select the address so it can be copied by hand.
            const el = document.getElementById("contact-email")
            if (el) {
                const range = document.createRange()
                range.selectNodeContents(el)
                const selection = globalThis.getSelection()
                selection?.removeAllRanges()
                selection?.addRange(range)
            }
        }
    }

    return (
        <div className="contact">
            <div className="contact__head">
                <p className="contact__title">{t(s.title)}</p>
                <p className="muted">{t(s.intro)}</p>
            </div>

            <div className="write">
                <a className="btn btn--primary btn--big" href={mailto}>
                    <Icon name="mail" size={18} /> {t(s.writeEmail)}
                </a>
                <div className="write__web">
                    <span className="muted">{t(s.orWriteFrom)}</span>
                    <a className="btn" href={gmail} target="_blank" rel="noreferrer">
                        Gmail <Icon name="arrowUpRight" size={14} />
                    </a>
                    <a className="btn" href={outlook} target="_blank" rel="noreferrer">
                        Outlook <Icon name="arrowUpRight" size={14} />
                    </a>
                </div>
            </div>

            <dl className="facts facts--contact">
                <div className="facts__wide">
                    <dt>{t(s.email)}</dt>
                    <dd className="contact__email">
                        <span id="contact-email">{profile.email}</span>
                        <button type="button" className="mini" onClick={copyEmail}>
                            <Icon name={copied ? "check" : "copy"} size={13} /> {copied ? t(s.copied) : t(s.copy)}
                        </button>
                    </dd>
                </div>
                <div>
                    <dt>LinkedIn</dt>
                    <dd>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer">
                            in/magdalenavicheva ↗
                        </a>
                    </dd>
                </div>
                <div>
                    <dt>GitHub</dt>
                    <dd>
                        <a href={profile.github} target="_blank" rel="noreferrer">
                            magdalenavicheva ↗
                        </a>
                    </dd>
                </div>
                <div>
                    <dt>{t(s.location)}</dt>
                    <dd>{t(profile.city)}</dd>
                </div>
                <div>
                    <dt>{t(s.cv)}</dt>
                    <dd>
                        <a href={profile.cv} download>
                            {t(s.downloadCv)}
                        </a>
                    </dd>
                </div>
            </dl>
        </div>
    )
}
