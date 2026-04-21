/**
 * @package EGI-INFO — shared/a11y/prefs
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-INFO M-101)
 * @date 2026-04-21
 * @purpose A11y preferences: cookie `florenceegi_a11y_prefs` cross-subdomain
 *          (Domain=.florenceegi.com) + localStorage fallback + DOM data-attr apply.
 */

export type A11yContrast = 'default' | 'high';
export type A11yReducedMotion = 'system' | 'on';
export type A11yFontScale = 'default' | 'large' | 'xlarge';

export interface A11yPrefs {
    contrast: A11yContrast;
    reducedMotion: A11yReducedMotion;
    fontScale: A11yFontScale;
}

export const DEFAULT_PREFS: A11yPrefs = {
    contrast: 'default',
    reducedMotion: 'system',
    fontScale: 'default',
};

const COOKIE_NAME = 'florenceegi_a11y_prefs';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const STORAGE_KEY = 'florenceegi_a11y_prefs';

function isValidPrefs(raw: unknown): raw is A11yPrefs {
    if (!raw || typeof raw !== 'object') return false;
    const p = raw as Record<string, unknown>;
    return (
        (p.contrast === 'default' || p.contrast === 'high') &&
        (p.reducedMotion === 'system' || p.reducedMotion === 'on') &&
        (p.fontScale === 'default' || p.fontScale === 'large' || p.fontScale === 'xlarge')
    );
}

function readCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function cookieDomainAttr(): string {
    if (typeof window === 'undefined') return '';
    const host = window.location.hostname;
    if (host.endsWith('.florenceegi.com') || host === 'florenceegi.com') {
        return '; Domain=.florenceegi.com';
    }
    return '';
}

function cookieSecureAttr(): string {
    if (typeof window === 'undefined') return '';
    return window.location.protocol === 'https:' ? '; Secure' : '';
}

export function readA11yPrefs(): A11yPrefs {
    try {
        const raw = readCookie(COOKIE_NAME);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (isValidPrefs(parsed)) return parsed;
        }
    } catch {
        // ignore
    }
    try {
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (isValidPrefs(parsed)) return parsed;
            }
        }
    } catch {
        // ignore
    }
    return { ...DEFAULT_PREFS };
}

export function writeA11yPrefs(prefs: A11yPrefs): void {
    const value = encodeURIComponent(JSON.stringify(prefs));
    if (typeof document !== 'undefined') {
        document.cookie =
            `${COOKIE_NAME}=${value}` +
            `; Max-Age=${COOKIE_MAX_AGE}` +
            `; Path=/` +
            cookieDomainAttr() +
            cookieSecureAttr() +
            `; SameSite=Lax`;
    }
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        }
    } catch {
        // ignore quota
    }
}

export function applyA11yPrefs(prefs: A11yPrefs): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.dataset.a11yContrast = prefs.contrast;
    root.dataset.a11yReducedMotion = prefs.reducedMotion;
    root.dataset.a11yFontScale = prefs.fontScale;
}
