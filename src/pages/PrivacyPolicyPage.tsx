/**
 * @package EGI-INFO — PrivacyPolicyPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.0.0 (FlorenceEGI — EGI-INFO)
 * @date 2026-04-01
 * @purpose Pagina informativa Privacy Policy — info.florenceegi.com
 */

export const PrivacyPolicyPage = () => (
    <div className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
            <button onClick={() => window.history.back()} className="text-sm text-gray-500 hover:text-white transition-colors mb-10 block">← Torna indietro</button>
            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-gray-500 text-sm mb-10">Ultimo aggiornamento: 1 aprile 2026</p>

            <div className="space-y-8 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Titolare del trattamento</h2>
                    <p>FlorenceEGI S.r.l.<br />Email: <a href="mailto:info@florenceegi.com" className="text-purple-400 hover:text-purple-300">info@florenceegi.com</a></p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Dati raccolti</h2>
                    <p>Questo sito è puramente informativo e non raccoglie dati personali. Non sono presenti form di registrazione, login o acquisto.</p>
                    <p className="mt-3">L'unico dato salvato localmente è la preferenza di tema (chiaro/scuro), memorizzata nel browser dell'utente tramite <code className="bg-white/10 px-1 rounded text-sm">localStorage</code> e non trasmessa ad alcun server.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Terze parti</h2>
                    <p>Questo sito carica font tipografici da Google Fonts. Google potrebbe ricevere l'indirizzo IP del visitatore come parte normale del protocollo HTTP. Per maggiori informazioni: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Google Privacy Policy</a>.</p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-lg mb-3">Contatti</h2>
                    <p>Per qualsiasi domanda: <a href="mailto:info@florenceegi.com" className="text-purple-400 hover:text-purple-300">info@florenceegi.com</a></p>
                </section>
            </div>
        </div>
    </div>
);
