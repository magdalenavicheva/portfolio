import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import { SettingsProvider } from "../context/Settings"

export function renderWithSettings(ui: ReactElement) {
    return render(<SettingsProvider>{ui}</SettingsProvider>)
}
