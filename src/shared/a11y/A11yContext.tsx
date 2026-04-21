/**
 * @package EGI-INFO — shared/a11y/A11yContext
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-INFO M-101)
 * @date 2026-04-21
 * @purpose React context + hook for a11y prefs. Applies DOM data-attrs early,
 *          persists on change via cookie+localStorage.
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import {
    applyA11yPrefs,
    readA11yPrefs,
    writeA11yPrefs,
    DEFAULT_PREFS,
    type A11yPrefs,
    type A11yContrast,
    type A11yReducedMotion,
    type A11yFontScale,
} from './prefs';

interface A11yContextValue {
    prefs: A11yPrefs;
    setContrast: (v: A11yContrast) => void;
    setReducedMotion: (v: A11yReducedMotion) => void;
    setFontScale: (v: A11yFontScale) => void;
    reset: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

// Apply prefs synchronously at module load to prevent flash of un-styled content
if (typeof document !== 'undefined') {
    applyA11yPrefs(readA11yPrefs());
}

export function A11yProvider({ children }: { children: ReactNode }) {
    const [prefs, setPrefs] = useState<A11yPrefs>(() => readA11yPrefs());

    useEffect(() => {
        applyA11yPrefs(prefs);
        writeA11yPrefs(prefs);
    }, [prefs]);

    const setContrast = useCallback((contrast: A11yContrast) => {
        setPrefs((p) => ({ ...p, contrast }));
    }, []);

    const setReducedMotion = useCallback((reducedMotion: A11yReducedMotion) => {
        setPrefs((p) => ({ ...p, reducedMotion }));
    }, []);

    const setFontScale = useCallback((fontScale: A11yFontScale) => {
        setPrefs((p) => ({ ...p, fontScale }));
    }, []);

    const reset = useCallback(() => {
        setPrefs({ ...DEFAULT_PREFS });
    }, []);

    const value = useMemo<A11yContextValue>(
        () => ({ prefs, setContrast, setReducedMotion, setFontScale, reset }),
        [prefs, setContrast, setReducedMotion, setFontScale, reset]
    );

    return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y(): A11yContextValue {
    const ctx = useContext(A11yContext);
    if (!ctx) {
        throw new Error('useA11y must be used within <A11yProvider>');
    }
    return ctx;
}
