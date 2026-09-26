import { SettingsProvider } from "./context/Settings"
import Desktop from "./desktop/Desktop"

export default function App() {
    return (
        <SettingsProvider>
            <Desktop />
        </SettingsProvider>
    )
}
