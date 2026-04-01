/**
 * @package EGI-INFO — PrivacyPolicyPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI — EGI-INFO)
 * @date 2026-04-01
 * @purpose Pagina informativa Privacy Policy — info.florenceegi.com
 */

export const PrivacyPolicyPage = () => (
    <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
            <button
                onClick={() => window.history.back()}
                className="text-sm text-white/40 hover:text-gold transition-colors mb-10 block"
            >
                ← Torna indietro
            </button>

            <h1 className="text-4xl font-bold mb-2 text-white">Privacy Policy</h1>
            <p className="text-white/40 text-sm mb-12 border-b border-white/10 pb-8">
                Ultimo aggiornamento: 1 aprile 2026
            </p>

            <div className="space-y-10 text-white/70 leading-relaxed">
                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Titolare del trattamento</h2>
                    <p>
                        FlorenceEGI S.r.l.<br />
                        Email:{' '}
                        <a href="mailto:info@florenceegi.com" className="text-gold hover:text-gold-light transition-colors">
                            info@florenceegi.com
                        </a>
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Dati raccolti</h2>
                    <p>
                        Questo sito è puramente informativo e non raccoglie dati personali.
                        Non sono presenti form di registrazione, login o acquisto.
                    </p>
                    <p className="mt-4">
                        L'unico dato salvato localmente è la preferenza di tema (chiaro/scuro),
                        memorizzata nel browser dell'utente tramite{' '}
                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-white/90">localStorage</code>
                        {' '}e non trasmessa ad alcun server.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Terze parti</h2>
                    <p>
                        Questo sito carica font tipografici da Google Fonts. Google potrebbe ricevere
                        l'indirizzo IP del visitatore come parte normale del protocollo HTTP.
                        Per maggiori informazioni:{' '}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-gold-light transition-colors"
                        >
                            Google Privacy Policy
                        </a>.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Contatti</h2>
                    <p>
                        Per qualsiasi domanda:{' '}
                        <a href="mailto:info@florenceegi.com" className="text-gold hover:text-gold-light transition-colors">
                            info@florenceegi.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    </div>
);
