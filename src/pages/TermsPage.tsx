/**
 * @package EGI-INFO — TermsPage
 * @author Padmin D. Curtis (AI Partner OS3.0) for Fabio Cherici
 * @version 1.1.0 (FlorenceEGI — EGI-INFO)
 * @date 2026-04-01
 * @purpose Pagina informativa Termini di Utilizzo — info.florenceegi.com
 */

export const TermsPage = () => (
    <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
            <button
                onClick={() => window.history.back()}
                className="text-sm text-white/40 hover:text-gold transition-colors mb-10 block"
            >
                ← Torna indietro
            </button>

            <h1 className="text-4xl font-bold mb-2 text-white">Termini di Utilizzo</h1>
            <p className="text-white/40 text-sm mb-12 border-b border-white/10 pb-8">
                Ultimo aggiornamento: 1 aprile 2026
            </p>

            <div className="space-y-10 text-white/70 leading-relaxed">
                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Natura del sito</h2>
                    <p>
                        info.florenceegi.com è un sito informativo pubblico di FlorenceEGI S.r.l.
                        Non richiede registrazione e non offre servizi a pagamento direttamente su questo dominio.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Proprietà intellettuale</h2>
                    <p>
                        Tutti i contenuti presenti su questo sito — testi, grafica, codice, marchi e concetti —
                        sono di proprietà esclusiva di FlorenceEGI S.r.l. e sono protetti su blockchain Algorand.
                    </p>
                    <p className="mt-4">
                        È vietata la riproduzione, copia, distribuzione o modifica di qualsiasi contenuto
                        senza autorizzazione scritta.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Limitazione di responsabilità</h2>
                    <p>
                        Le informazioni presenti su questo sito hanno scopo puramente illustrativo.
                        FlorenceEGI S.r.l. non garantisce la completezza o l'aggiornamento dei contenuti
                        e non è responsabile per decisioni prese sulla base di tali informazioni.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Legge applicabile</h2>
                    <p>
                        I presenti termini sono regolati dalla legge italiana.
                        Per qualsiasi controversia è competente il Foro di Firenze.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-semibold text-xl mb-4">Contatti</h2>
                    <p>
                        <a href="mailto:info@florenceegi.com" className="text-gold hover:text-gold-light transition-colors">
                            info@florenceegi.com
                        </a>
                    </p>
                </section>
            </div>
        </div>
    </div>
);
