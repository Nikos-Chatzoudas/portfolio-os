import "../../App.css";
import React from "react";

export default function DosBox({ bundleUrl }: { bundleUrl: string }) {
    const containerId = "jsdos-container";
    React.useEffect(() => {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            // Guard against double-invocation in React 18 StrictMode (dev)
            if ((container as HTMLElement).dataset.jsdosInit === "1") {
                return;
            }
            (container as HTMLElement).dataset.jsdosInit = "1";

            // Clear any previous contents to avoid duplicate overlays
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            // Ensure assets resolve from public/js-dos
            // Leading slash uses Vite public base
            const w = window as unknown as { [key: string]: any };
            if (w && w.emulators) {
                w.emulators.pathPrefix = "/js-dos/";
            }

            if (!w || typeof w.Dos === "undefined") {
                // js-dos script not loaded
                return;
            }

            const runPromise = w.Dos(container, { ci: false, headless: true, save: false }).run(bundleUrl);

            return () => {
                // Gracefully exit emulator on unmount
                // runPromise resolves to a DosCommandInterface
                runPromise.then((ci: any) => {
                    if (ci && typeof ci.exit === "function") {
                        ci.exit();
                    }
                }).catch(() => { });

                // Drop overlays/children and allow re-init
                (container as HTMLElement).removeAttribute("data-jsdos-init");
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            };
        } catch {
            // no-op
        }
    }, []);

    return (
        <div id={containerId} className="jsdos-headless" style={{ width: "max-content", height: "max-content" }} />
    );
}