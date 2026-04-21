/**
 * @package EGI-INFO — shared/a11y/A11yPanel
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-INFO M-101)
 * @date 2026-04-21
 * @purpose A11y dialog panel: contrast + reduced-motion + font-scale toggles.
 *          Reuses useFocusTrap from utils/seo/Aria.tsx (P0-4 no duplication).
 */

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useA11y } from './A11yContext';
import { useFocusTrap } from '../../utils/seo/Aria';
import type { A11yContrast, A11yReducedMotion, A11yFontScale } from './prefs';

export function A11yPanel() {
    const { t } = useTranslation('a11y');
    const { prefs, setContrast, setReducedMotion, setFontScale, reset } = useA11y();
    const [open, setOpen] = useState(false);
    const titleId = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const containerRef = useFocusTrap(open);

    useEffect(() => {
        if (!open) return;
        const handleKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', handleKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    useEffect(() => {
        if (!open) {
            triggerRef.current?.focus();
        }
    }, [open]);

    const handleBackdropKey = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') setOpen(false);
    }, []);

    const trigger = (
        <button
            ref={triggerRef}
            type="button"
            className="a11y-panel-trigger"
            aria-label={t('panel_open')}
            aria-expanded={open}
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
        >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="8" r="1.5" fill="currentColor" />
                <path d="M12 11v7" />
                <path d="M9 14h6" />
            </svg>
        </button>
    );

    if (!open) {
        return typeof document !== 'undefined'
            ? createPortal(trigger, document.body)
            : null;
    }

    const dialog = (
        <>
            {trigger}
            <div
                className="a11y-panel-backdrop"
                onClick={() => setOpen(false)}
                onKeyDown={handleBackdropKey}
                aria-hidden="true"
            />
            <div
                ref={containerRef}
                className="a11y-panel"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                <header className="a11y-panel__header">
                    <h2 id={titleId} className="a11y-panel__title">
                        {t('panel_title')}
                    </h2>
                    <button
                        type="button"
                        className="a11y-panel__close"
                        aria-label={t('panel_close')}
                        onClick={() => setOpen(false)}
                    >
                        ×
                    </button>
                </header>

                <fieldset className="a11y-panel__group">
                    <legend className="a11y-panel__legend">{t('contrast_label')}</legend>
                    <div className="a11y-panel__options">
                        {(['default', 'high'] as const).map((v) => (
                            <label key={v} className="a11y-panel__option">
                                <input
                                    type="radio"
                                    name="a11y-contrast"
                                    value={v}
                                    checked={prefs.contrast === v}
                                    onChange={() => setContrast(v as A11yContrast)}
                                />
                                <span className="a11y-panel__option-label">
                                    {t(`contrast_${v}`)}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="a11y-panel__group">
                    <legend className="a11y-panel__legend">{t('reduced_motion_label')}</legend>
                    <div className="a11y-panel__options">
                        {(['system', 'on'] as const).map((v) => (
                            <label key={v} className="a11y-panel__option">
                                <input
                                    type="radio"
                                    name="a11y-reduced-motion"
                                    value={v}
                                    checked={prefs.reducedMotion === v}
                                    onChange={() => setReducedMotion(v as A11yReducedMotion)}
                                />
                                <span className="a11y-panel__option-label">
                                    {t(`reduced_motion_${v}`)}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="a11y-panel__group">
                    <legend className="a11y-panel__legend">{t('font_scale_label')}</legend>
                    <div className="a11y-panel__options">
                        {(['default', 'large', 'xlarge'] as const).map((v) => (
                            <label key={v} className="a11y-panel__option">
                                <input
                                    type="radio"
                                    name="a11y-font-scale"
                                    value={v}
                                    checked={prefs.fontScale === v}
                                    onChange={() => setFontScale(v as A11yFontScale)}
                                />
                                <span className="a11y-panel__option-label">
                                    {t(`font_scale_${v}`)}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <footer className="a11y-panel__footer">
                    <button
                        type="button"
                        className="a11y-panel__reset"
                        onClick={reset}
                    >
                        {t('panel_reset')}
                    </button>
                </footer>
            </div>
        </>
    );

    return typeof document !== 'undefined'
        ? createPortal(dialog, document.body)
        : null;
}
