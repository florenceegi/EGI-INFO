import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations - Common
import commonIT from './locales/it/common.json';
import commonEN from './locales/en/common.json';

// Import translations - Glossary (EGI terms)
import glossaryIT from './locales/it/glossary.json';
import glossaryEN from './locales/en/glossary.json';

// Import translations - Glossary Art (CoA vocabulary)
import glossaryArtIT from './locales/it/glossary-art.json';
import glossaryArtEN from './locales/en/glossary-art.json';

// Import translations - Landing
import landingIT from './locales/it/landing.json';
import landingEN from './locales/en/landing.json';

// Import translations - Audiences
import audiencesIT from './locales/it/audiences.json';
import audiencesEN from './locales/en/audiences.json';

// Import translations - Info (general)
import infoIT from './locales/it/info.json';
import infoEN from './locales/en/info.json';

// Import translations - Topic Namespaces
import egiIT from './locales/it/egi.json';
import egiEN from './locales/en/egi.json';
import eppIT from './locales/it/epp.json';
import eppEN from './locales/en/epp.json';
import florenceIT from './locales/it/florence.json';
import florenceEN from './locales/en/florence.json';
import cocreateIT from './locales/it/cocreate.json';
import cocreateEN from './locales/en/cocreate.json';

// Import translations - A11y (M-101)
import a11yIT from './locales/it/a11y.json';
import a11yEN from './locales/en/a11y.json';

const resources = {
  it: {
    common: commonIT,
    glossary: glossaryIT,
    'glossary-art': glossaryArtIT,
    landing: landingIT,
    audiences: audiencesIT,
    info: infoIT,
    egi: egiIT,
    epp: eppIT,
    florence: florenceIT,
    cocreate: cocreateIT,
    a11y: a11yIT,
  },
  en: {
    common: commonEN,
    glossary: glossaryEN,
    'glossary-art': glossaryArtEN,
    landing: landingEN,
    audiences: audiencesEN,
    info: infoEN,
    egi: egiEN,
    epp: eppEN,
    florence: florenceEN,
    cocreate: cocreateEN,
    a11y: a11yEN,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'it', // Default language
    fallbackLng: 'it',
    
    ns: ['common', 'glossary', 'glossary-art', 'landing', 'audiences', 'info', 'egi', 'epp', 'florence', 'cocreate', 'a11y'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // React already escapes
    },
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;
