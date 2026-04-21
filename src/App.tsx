/**
 * @package EGI-INFO — App
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI — EGI-INFO M-101)
 * @date 2026-04-21
 * @purpose Root component. Providers chain: I18nextProvider → AnnouncerProvider
 *          → A11yProvider → RouterProvider. Global A11yPanel (portal).
 */

import { RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import router from './router';
import { AnnouncerProvider } from './utils/seo/Aria';
import { A11yProvider } from './shared/a11y/A11yContext';
import { A11yPanel } from './shared/a11y/A11yPanel';
import './styles/globals.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AnnouncerProvider>
        <A11yProvider>
          <RouterProvider router={router} />
          <A11yPanel />
        </A11yProvider>
      </AnnouncerProvider>
    </I18nextProvider>
  );
}

export default App;
