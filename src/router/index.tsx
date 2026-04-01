import { createBrowserRouter, type RouteObject } from 'react-router-dom';

// Layouts
import LandingLayout from '../layouts/LandingLayout';
import InfoPageLayout from '../layouts/InfoPageLayout';

// Pages - Home
import HomePage from '../pages/HomePage';

// Pages - Legal
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { TermsPage } from '../pages/TermsPage';

// Pages - Approfondimenti (Deep Dive)
import ApprofondimentiHome from '../pages/info/ApprofondimentiHome';
import EGIInfoPage from '../pages/info/EGIInfoPage';
import EPPInfoPage from '../pages/info/EPPInfoPage';
import FlorenceEGIPage from '../pages/info/FlorenceEGIPage';
import CoCreatePage from '../pages/info/CoCreatePage';
import DisclaimerPage from '../pages/info/DisclaimerPage';
import WhyCannotBuyPage from '../pages/info/WhyCannotBuyPage';
import SourceTruthPage from '../pages/info/SourceTruthPage';

// Pages - Mattoncini Florence (Test)
import MottoPage from '../pages/info/florence/MottoPage';
import WhatWeDoPage from '../pages/info/florence/WhatWeDoPage';
import ImpactPage from '../pages/info/florence/ImpactPage';
import IntroPage from '../pages/info/florence/IntroPage';
import Problem1Page from '../pages/info/florence/Problem1Page';
import Problem2Page from '../pages/info/florence/Problem2Page';
import Problem3Page from '../pages/info/florence/Problem3Page';
import Problem4Page from '../pages/info/florence/Problem4Page';
import Problem5Page from '../pages/info/florence/Problem5Page';
import Problem6Page from '../pages/info/florence/Problem6Page';
import Problem7Page from '../pages/info/florence/Problem7Page';
import Problem8Page from '../pages/info/florence/Problem8Page';
import Problem9Page from '../pages/info/florence/Problem9Page';
import Problem10Page from '../pages/info/florence/Problem10Page';
import Problem11Page from '../pages/info/florence/Problem11Page';
import Problem12Page from '../pages/info/florence/Problem12Page';
import HowItWorks1Page from '../pages/info/florence/HowItWorks1Page';
import HowItWorks2Page from '../pages/info/florence/HowItWorks2Page';
import HowItWorks3Page from '../pages/info/florence/HowItWorks3Page';
import AMMkPage from '../pages/info/florence/AMMkPage';
import TechnologyPage from '../pages/info/florence/TechnologyPage';
import PaymentsPage from '../pages/info/florence/PaymentsPage';
import CompliancePage from '../pages/info/florence/CompliancePage';
import EcosystemPage from '../pages/info/florence/EcosystemPage';
import NATANPage from '../pages/info/florence/NATANPage';
import GovernancePage from '../pages/info/florence/GovernancePage';
import MattonciniIndexPage from '../pages/info/florence/MattonciniIndexPage';
import PricingPrimaryPage from '../pages/info/florence/PricingPrimaryPage';
import PricingSecondaryPage from '../pages/info/florence/PricingSecondaryPage';
import ExamplesArtPage from '../pages/info/florence/ExamplesArtPage';
import ExamplesMusicPage from '../pages/info/florence/ExamplesMusicPage';
import ExamplesBooksPage from '../pages/info/florence/ExamplesBooksPage';
import ExamplesEcoPage from '../pages/info/florence/ExamplesEcoPage';
import ExamplesSportPage from '../pages/info/florence/ExamplesSportPage';
import ExamplesFashionPage from '../pages/info/florence/ExamplesFashionPage';
import ExamplesHeritagePage from '../pages/info/florence/ExamplesHeritagePage';
import CasesPage from '../pages/info/florence/CasesPage';
import RoadmapPage from '../pages/info/florence/RoadmapPage';
import FAQPage from '../pages/info/florence/FAQPage';
import CTAFinalPage from '../pages/info/florence/CTAFinalPage';
import AMMkUsersPage from '../pages/info/florence/AMMkUsersPage';
import AMMkEnginesPage from '../pages/info/florence/AMMkEnginesPage';
import AMMkCustomPage from '../pages/info/florence/AMMkCustomPage';
import TechUserPage from '../pages/info/florence/TechUserPage';
import TechSystemPage from '../pages/info/florence/TechSystemPage';
import TechPerformancePage from '../pages/info/florence/TechPerformancePage';
import PaymentPhilosophyPage from '../pages/info/florence/PaymentPhilosophyPage';
import PaymentPlatformRolePage from '../pages/info/florence/PaymentPlatformRolePage';
import PaymentLevel1Page from '../pages/info/florence/PaymentLevel1Page';
import PaymentLevel2Page from '../pages/info/florence/PaymentLevel2Page';
import PaymentLevel3Page from '../pages/info/florence/PaymentLevel3Page';
import PaymentLevel4Page from '../pages/info/florence/PaymentLevel4Page';
import WalletRedemptionPage from '../pages/info/florence/WalletRedemptionPage';

// Pages - Audience (Per tipo di utente)
import ArtistPage from '../pages/archetypes/ArtistPage';
import EntrepreneurPage from '../pages/archetypes/EntrepreneurPage';
import PublicAdminPage from '../pages/archetypes/PublicAdminPage';
import CollectorPage from '../pages/archetypes/CollectorPage';

/**
 * Definizione delle routes dell'applicazione
 * 
 * Struttura:
 * - / : Home con WheelMenu
 * - /info : Sezione approfondimenti con menu laterale
 * - /archetypes/* : Pagine per tipo di utente
 */

const routes: RouteObject[] = [
  // === HOME - WheelMenu Layout ===
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  // === LEGAL ===
  { path: '/privacy', element: <PrivacyPolicyPage /> },
  { path: '/terms',   element: <TermsPage /> },

  // === INFO - Approfondimenti ===
  {
    path: '/info',
    element: <InfoPageLayout />,
    children: [
      {
        index: true,
        element: <ApprofondimentiHome />,
      },
      {
        path: 'egi',
        element: <EGIInfoPage />,
      },
      {
        path: 'epp',
        element: <EPPInfoPage />,
      },
      {
        path: 'platform',
        element: <FlorenceEGIPage />,
      },
      {
        path: 'co-create',
        element: <CoCreatePage />,
      },
      {
        path: 'disclaimer',
        element: <DisclaimerPage />,
      },
      {
        path: 'why-cannot-buy',
        element: <WhyCannotBuyPage />,
      },
      {
        path: 'source-truth',
        element: <SourceTruthPage />,
      },
      // === MATTONCINI FLORENCE (Test singoli) ===
      {
        path: 'florence',
        element: <MattonciniIndexPage />,
      },
      {
        path: 'florence/index',
        element: <MattonciniIndexPage />,
      },
      {
        path: 'florence/motto',
        element: <MottoPage />,
      },
      {
        path: 'florence/what-we-do',
        element: <WhatWeDoPage />,
      },
      {
        path: 'florence/impact',
        element: <ImpactPage />,
      },
      {
        path: 'florence/intro',
        element: <IntroPage />,
      },
      {
        path: 'florence/problem-1',
        element: <Problem1Page />,
      },
      {
        path: 'florence/problem-2',
        element: <Problem2Page />,
      },
      {
        path: 'florence/problem-3',
        element: <Problem3Page />,
      },
      {
        path: 'florence/problem-4',
        element: <Problem4Page />,
      },
      {
        path: 'florence/problem-5',
        element: <Problem5Page />,
      },
      {
        path: 'florence/problem-6',
        element: <Problem6Page />,
      },
      {
        path: 'florence/problem-7',
        element: <Problem7Page />,
      },
      {
        path: 'florence/problem-8',
        element: <Problem8Page />,
      },
      {
        path: 'florence/problem-9',
        element: <Problem9Page />,
      },
      {
        path: 'florence/problem-10',
        element: <Problem10Page />,
      },
      {
        path: 'florence/problem-11',
        element: <Problem11Page />,
      },
      {
        path: 'florence/problem-12',
        element: <Problem12Page />,
      },
      {
        path: 'florence/how-1',
        element: <HowItWorks1Page />,
      },
      {
        path: 'florence/how-2',
        element: <HowItWorks2Page />,
      },
      {
        path: 'florence/how-3',
        element: <HowItWorks3Page />,
      },
      {
        path: 'florence/ammk',
        element: <AMMkPage />,
      },
      {
        path: 'florence/tech',
        element: <TechnologyPage />,
      },
      {
        path: 'florence/payments',
        element: <PaymentsPage />,
      },
      {
        path: 'florence/compliance',
        element: <CompliancePage />,
      },
      {
        path: 'florence/ecosystem',
        element: <EcosystemPage />,
      },
      {
        path: 'florence/natan',
        element: <NATANPage />,
      },
      {
        path: 'florence/governance',
        element: <GovernancePage />,
      },
      {
        path: 'florence/pricing-primary',
        element: <PricingPrimaryPage />,
      },
      {
        path: 'florence/pricing-secondary',
        element: <PricingSecondaryPage />,
      },
      {
        path: 'florence/examples-art',
        element: <ExamplesArtPage />,
      },
      {
        path: 'florence/examples-music',
        element: <ExamplesMusicPage />,
      },
      {
        path: 'florence/examples-books',
        element: <ExamplesBooksPage />,
      },
      {
        path: 'florence/examples-eco',
        element: <ExamplesEcoPage />,
      },
      {
        path: 'florence/examples-sport',
        element: <ExamplesSportPage />,
      },
      {
        path: 'florence/examples-fashion',
        element: <ExamplesFashionPage />,
      },
      {
        path: 'florence/examples-heritage',
        element: <ExamplesHeritagePage />,
      },
      {
        path: 'florence/cases',
        element: <CasesPage />,
      },
      {
        path: 'florence/roadmap',
        element: <RoadmapPage />,
      },
      {
        path: 'florence/faq',
        element: <FAQPage />,
      },
      {
        path: 'florence/cta-final',
        element: <CTAFinalPage />,
      },
      {
        path: 'florence/ammk-users',
        element: <AMMkUsersPage />,
      },
      {
        path: 'florence/ammk-engines',
        element: <AMMkEnginesPage />,
      },
      {
        path: 'florence/ammk-custom',
        element: <AMMkCustomPage />,
      },
      {
        path: 'florence/tech-user',
        element: <TechUserPage />,
      },
      {
        path: 'florence/tech-system',
        element: <TechSystemPage />,
      },
      {
        path: 'florence/tech-performance',
        element: <TechPerformancePage />,
      },
      {
        path: 'florence/payment-philosophy',
        element: <PaymentPhilosophyPage />,
      },
      {
        path: 'florence/payment-platform-role',
        element: <PaymentPlatformRolePage />,
      },
      {
        path: 'florence/payment-level-1',
        element: <PaymentLevel1Page />,
      },
      {
        path: 'florence/payment-level-2',
        element: <PaymentLevel2Page />,
      },
      {
        path: 'florence/payment-level-3',
        element: <PaymentLevel3Page />,
      },
      {
        path: 'florence/payment-level-4',
        element: <PaymentLevel4Page />,
      },
      {
        path: 'florence/wallet-redemption',
        element: <WalletRedemptionPage />,
      },
    ],
  },

  // === ARCHETYPES - Pagine per tipo di utente (con sidebar InfoPageLayout) ===
  {
    path: '/archetypes',
    element: <InfoPageLayout />,
    children: [
      {
        path: 'artist',
        element: <ArtistPage />,
      },
      {
        path: 'entrepreneur',
        element: <EntrepreneurPage />,
      },
      {
        path: 'public-admin',
        element: <PublicAdminPage />,
      },
      {
        path: 'collector',
        element: <CollectorPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default router;
