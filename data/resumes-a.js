// Résumés d'une ligne des réactions de l'index — partie A (substitutions, additions, éliminations).
// Format : nom tel que cité | ce que fait la réaction (départ → produit) | réactifs et conditions typiques
// Rédigés de mémoire : repères de révision à vérifier, pas des protocoles.
export default `
SN1 | Halogénure ou alcool tertiaire, benzylique, allylique → produit de substitution via un carbocation ; racémisation, transpositions possibles | Solvant polaire protique (H₂O, ROH, AcOH), nucléophile faible, vitesse = k[RX]
SN2 | Halogénure ou sulfonate primaire/secondaire + nucléophile → substitution concertée avec inversion de configuration | Bon nucléophile, solvant polaire aprotique (DMF, DMSO, acétone), vitesse = k[RX][Nu]
SN1′ et SN2′ (allyliques) | Substrat allylique → substitution avec migration de la double liaison (attaque en γ) | Nucléophile sur halogénure allylique ; cuprates (SN2′ anti) ; cation allylique délocalisé pour SN1′
SNi (rétention) | Alcool → chlorure d'alkyle avec rétention de configuration, via un chlorosulfite et une paire d'ions intime | SOCl₂ seul (sans pyridine), dans l'éther ou le dioxane
SRN1 | Halogénure d'aryle non activé + nucléophile (énolate, amidure, thiolate) → produit de substitution par chaîne radicalaire via un radical-anion | NH₃ liquide ou DMSO, amorçage par hν, électrode ou métal alcalin
solvolyse | Le solvant joue le rôle de nucléophile sur un substrat ionisable : RX → ROH, ROR′ ou ROAc | H₂O, alcool ou acide carboxylique, souvent à chaud ; mécanisme SN1 le plus souvent
inversion de Walden | Inversion de la configuration du carbone lors d'une SN2 (attaque dorsale, état de transition bipyramidal) | Observée pour toute SN2 sur carbone stéréogène
catalyse par transfert de phase | Transport d'un anion (CN⁻, OH⁻, N₃⁻, F⁻) de la phase aqueuse ou solide vers la phase organique où il réagit | Sel d'ammonium ou de phosphonium quaternaire (Bu₄NBr, Aliquat 336, TEBA) ou éther couronne, système biphasique
Finkelstein (échange d'halogène) | Chlorure ou bromure d'alkyle → iodure d'alkyle (SN2), déplacé par précipitation de NaCl/NaBr | NaI dans l'acétone à reflux ; variante fluorure avec KF/éther couronne
Swarts (fluoration) | Chlorure ou bromure d'alkyle → fluorure d'alkyle | SbF₃ (avec SbCl₅ catalytique), AgF ou Hg₂F₂, à chaud
Darzens (SOCl₂/pyridine) | Alcool → chlorure d'alkyle avec inversion (SN2 par le chlorure libéré) | SOCl₂ en présence de pyridine
ROH + HX | Alcool → halogénure d'alkyle ; SN1 pour tertiaire, SN2 pour primaire (oxonium comme groupe partant) | HCl, HBr ou HI concentré ; ZnCl₂ pour HCl sur alcools primaires et secondaires
ROH + PBr₃ / PCl₅ / SOCl₂ | Alcool → bromure ou chlorure d'alkyle sans transposition, avec inversion (PBr₃, SOCl₂/pyridine) | PBr₃ à 0 °C dans l'éther ; SOCl₂ (± pyridine) ; PCl₅ à froid
test de Lucas | Distingue les alcools : tertiaire trouble immédiat, secondaire en quelques minutes, primaire pas de trouble à froid (formation de RCl insoluble) | HCl concentré + ZnCl₂ anhydre, température ambiante
Hunsdiecker (voir F) | Carboxylate d'argent → bromure d'alkyle avec un carbone de moins (décarboxylation radicalaire) | RCO₂Ag + Br₂ dans CCl₄ à reflux
tosylation / mésylation / triflation puis déplacement | Alcool → sulfonate (bon groupe partant, rétention) puis SN2 par un nucléophile (inversion nette) | TsCl ou MsCl/pyridine ou Et₃N, Tf₂O/pyridine à −78 °C ; puis NaN₃, NaCN, LiBr, RS⁻…
fermeture halohydrine → époxyde | Halohydrine → époxyde par SN2 intramoléculaire (alcoolate et halogène antipériplanaires) | Base : NaOH, K₂CO₃ ou NaH
clivage des éthers (HI, HBr, BBr₃, TMSI) | Éther → alcool (ou phénol) + halogénure d'alkyle | HI ou HBr concentré à chaud ; BBr₃ dans CH₂Cl₂ à −78 °C → t.a. (aryl méthyl éthers) ; TMSI
Zeisel | Dosage des groupes méthoxy/éthoxy : clivage de l'éther en iodure d'alkyle volatil, dosé sous forme d'AgI | HI concentré à chaud, puis AgNO₃ alcoolique
O-alkylation des carboxylates | Carboxylate + halogénure d'alkyle → ester (SN2) | Cs₂CO₃ ou K₂CO₃ dans le DMF, RX primaire (MeI, BnBr, bromure d'allyle)
Koenigs–Knorr | Halogénure de glycosyle + alcool → glycoside ; 1,2-trans grâce à la participation de l'ester en C2 | Ag₂CO₃, Ag₂O ou AgOTf (variante Helferich : Hg(CN)₂, HgBr₂), tamis moléculaire
alkylation des amines | Amine + halogénure d'alkyle → amine plus substituée ; polyalkylation difficile à éviter | RX, base (K₂CO₃, Et₃N) ; préférer Gabriel, azoture ou amination réductrice pour une monoalkylation
Menshutkin (quaternisation) | Amine tertiaire + halogénure d'alkyle → sel d'ammonium quaternaire | MeI, BnBr… dans un solvant polaire (acétonitrile, acétone)
Delépine | Halogénure d'alkyle actif (benzylique, allylique, α-halocétone) → amine primaire | Hexaméthylènetétramine (urotropine) dans CHCl₃, puis HCl/EtOH à reflux
substitution par azoture | Halogénure ou sulfonate d'alkyle → azoture d'alkyle (SN2, inversion), précurseur d'amine primaire | NaN₃ dans DMF ou DMSO, 50–80 °C ; puis réduction (Staudinger, H₂/Pd, LiAlH₄)
Fukuyama–Mitsunobu | Alcool + nosylamide (NsNHR) → sulfonamide N-alkylé avec inversion, puis amine secondaire après retrait du Ns | PPh₃, DEAD ou DIAD, THF ; déprotection PhSH/K₂CO₃
ouverture d'aziridines | Aziridine (activée N-Ts, N-acyle) + nucléophile → amine β-fonctionnalisée, ouverture anti | Nucléophiles (N₃⁻, RS⁻, cuprates, halogénures), acide de Lewis ou de Brønsted pour les non activées
Wenker | β-Aminoalcool → aziridine | H₂SO₄ (formation du sulfate d'aminoalkyle) puis NaOH à chaud
Ritter | Nitrile + carbocation (alcool tertiaire, alcène) → amide N-alkylé après hydrolyse du nitrilium | H₂SO₄ concentré (ou autre acide fort), puis H₂O
Victor Meyer et Kornblum (nitroalcanes à partir de RX + nitrite) | Halogénure d'alkyle → nitroalcane (avec nitrite d'alkyle en sous-produit, nucléophile ambident) | AgNO₂ dans l'éther (Victor Meyer) ; NaNO₂ dans DMF ou DMSO (Kornblum)
synthèse de thioéthers et de thiols (thiourée, thioacétate, sels de Bunte) | RX → thioéther (RS⁻) ou thiol via un intermédiaire masqué évitant la dialkylation | RSNa ; thiourée puis NaOH ; KSAc puis hydrolyse ; Na₂S₂O₃ (sel de Bunte) puis acide
alkylation de sulfites de Strecker | Halogénure d'alkyle → sulfonate d'alkyle (RSO₃Na) | Na₂SO₃ aqueux à chaud
Michaelis–Becker | Dialkylphosphite déprotoné + halogénure d'alkyle → phosphonate | (RO)₂P(O)H, NaH ou Na, puis RX
Perkow | α-Halocétone + trialkylphosphite → phosphate d'énol (vinylphosphate), en concurrence avec Arbuzov | P(OEt)₃, à chaud
Kolbe (nitriles, RX + CN⁻) | Halogénure d'alkyle primaire/secondaire → nitrile (un carbone de plus) | NaCN ou KCN dans DMSO ou EtOH/H₂O
Nicholas | Alcool ou éther propargylique complexé à Co₂(CO)₆ → cation propargylique stabilisé, piégé par un nucléophile ; puis décomplexation | Co₂(CO)₈, puis HBF₄ ou BF₃·OEt₂ et nucléophile ; décomplexation par CAN ou Fe(NO₃)₃
transestérification | Ester + alcool → nouvel ester (équilibre déplacé par excès d'alcool ou distillation) | Catalyse acide (H₂SO₄, TsOH), basique (RONa) ou Ti(OiPr)₄
hydrolyse acide | Ester + H₂O → acide carboxylique + alcool (réversible, mécanisme AAC2) | H₂SO₄ ou HCl aqueux à reflux, excès d'eau
Steglich | Acide carboxylique + alcool → ester dans des conditions douces (alcools encombrés, substrats acido-sensibles) | DCC (ou EDC) + DMAP catalytique, CH₂Cl₂, 0 °C → t.a.
Yamaguchi | Hydroxy-acide → macrolactone (ou ester encombré) via un anhydride mixte | Chlorure de 2,4,6-trichlorobenzoyle, Et₃N, puis DMAP dans le toluène à reflux, haute dilution
Shiina | Hydroxy-acide → macrolactone via un anhydride mixte aromatique | MNBA (anhydride 2-méthyl-6-nitrobenzoïque), DMAP ou DMAPO, t.a.
Mukaiyama | Acide + alcool → ester ou lactone par activation de l'acide en ester de pyridinium | Iodure de 2-chloro-1-méthylpyridinium, Et₃N, CH₂Cl₂ ou MeCN à reflux
Keck | Hydroxy-acide → macrolactone (Steglich à haute dilution, sans N-acylurée) | DCC, DMAP, DMAP·HCl, CHCl₃ à reflux
Corey–Nicolaou | Hydroxy-acide → macrolactone par double activation via un thioester de 2-pyridyle | (PyS)₂ + PPh₃, puis reflux dans le xylène ou le toluène à haute dilution (± AgClO₄)
estérification par le diazométhane | Acide carboxylique → ester méthylique, quantitatif à froid, dégagement de N₂ | CH₂N₂ dans l'éther à 0 °C (toxique, explosif) ; alternative TMSCHN₂/MeOH
Zemplén (désacétylation) | Sucre per-acétylé → polyol libre par transestérification | NaOMe catalytique dans MeOH, t.a.
Schotten–Baumann | Amine (ou alcool) + chlorure d'acyle → amide (ou ester) en milieu biphasique | NaOH aqueux / CH₂Cl₂ ou éther, 0 °C
Einhorn | Acylation d'un alcool ou d'une amine par un chlorure d'acyle en milieu homogène | Pyridine comme base et solvant (catalyse nucléophile)
aminolyse des esters | Ester + amine → amide + alcool | Amine en excès, à chaud ; AlMe₃ (Weinreb) ou TBD pour les cas difficiles
Bodroux | Ester + amidure de magnésium → amide | Amine + EtMgBr (formation de R₂NMgBr), puis ester
transamidation | Amide + amine → nouvel amide | À chaud ; catalyse par acide de Lewis ou métal ; activation préalable N-Boc ou N-Ts de l'amide
formation de carbamates | Amine + chloroformiate ou dicarbonate (ou alcool + isocyanate) → carbamate | ClCO₂R/base, Boc₂O, CbzCl ; ROH + RNCO ; CDI
d'urées et de sulfonamides (Hinsberg) | Amine + isocyanate (ou phosgène/CDI) → urée ; amine + chlorure de sulfonyle → sulfonamide. Test de Hinsberg : le sulfonamide d'une amine primaire est soluble dans NaOH, celui d'une secondaire non, la tertiaire ne réagit pas | RNCO ; triphosgène ; PhSO₂Cl ou TsCl + NaOH aqueux
activation par CDI | Acide carboxylique → acylimidazole réactif, puis amide ou ester (sous-produits : CO₂ et imidazole) | Carbonyldiimidazole dans THF ou CH₂Cl₂, puis amine ou alcool
formation des chlorures d'acyle (SOCl₂, (COCl)₂, PCl₅) | Acide carboxylique → chlorure d'acyle | SOCl₂ à reflux ; (COCl)₂ + DMF catalytique dans CH₂Cl₂ à t.a. ; PCl₅ ou PCl₃
des anhydrides | Formation des anhydrides : deux acides (déshydratation) ou carboxylate + chlorure d'acyle → anhydride ; anhydrides mixtes pour l'activation | Ac₂O à chaud, P₂O₅, DCC ; RCO₂Na + R′COCl ; ClCO₂iBu/NMM (anhydride mixte)
des esters activés | Formation des esters activés : acide → ester de N-hydroxysuccinimide, de pentafluorophényle, de p-nitrophényle ou de HOBt, acylant doux pour amines | DCC ou EDC + NHS, PfpOH, HOBt
des fluorures d'acyle | Formation des fluorures d'acyle : acide → RCOF, stable à l'eau mais réactif vis-à-vis des amines encombrées | Fluorure de cyanuryle, DAST, Deoxo-Fluor ou TFFH
hydrolyse des amides et des nitriles | Amide → acide carboxylique + amine ; nitrile → amide → acide carboxylique | HCl ou H₂SO₄ aqueux à reflux, ou NaOH aqueux à reflux ; arrêt à l'amide : H₂O₂/NaOH ou catalyseur au Pt
Pinner | Nitrile + alcool → sel d'imidate (sel de Pinner), puis ester (H₂O), amidine (NH₃) ou orthoester (ROH) | HCl gazeux sec, alcool anhydre, 0 °C
réaction haloforme | Méthylcétone (ou alcool CH₃CH(OH)R) → carboxylate + haloforme CHX₃ | X₂ + NaOH (NaOCl, NaOBr ou I₂/NaOH)
Dakin–West | Acide α-aminé → α-acétamidocétone, via une azlactone, avec décarboxylation | Ac₂O, pyridine (DMAP), à chaud
Haller–Bauer | Cétone non énolisable → amide + hydrocarbure, par coupure C–C | NaNH₂ dans le toluène ou le benzène à reflux
halogénation | Arène → halogénure d'aryle (SEAr) | Cl₂ ou Br₂ + acide de Lewis (FeCl₃, FeBr₃, AlCl₃) ; sans catalyseur pour phénols et anilines ; I₂ + oxydant (HNO₃, HIO₃) ; NBS, NCS, NIS
nitrosation | Arène activé (phénol, amine tertiaire) → dérivé para-nitroso ; amine secondaire → N-nitrosamine | NaNO₂ + HCl à 0–5 °C (électrophile NO⁺)
sulfonation et désulfonation | Arène → acide arènesulfonique ; réversible (désulfonation), d'où son usage comme groupe bloquant | H₂SO₄ concentré ou oléum (SO₃) ; désulfonation : H₂SO₄ dilué ou vapeur d'eau à chaud
chlorosulfonation | Arène → chlorure d'arènesulfonyle (précurseur de sulfonamides) | ClSO₃H en excès, 0 °C → t.a.
couplage azoïque | Sel d'arènediazonium + arène activé (phénol, aniline) → composé azoïque (colorant), en para | 0–5 °C ; pH 9–10 pour les phénols, pH 4–6 pour les amines
mercuration | Arène → acétate d'arylmercure (SEAr), convertible en ArX | Hg(OAc)₂ ou Hg(OCOCF₃)₂, AcOH ou TFA
thallation | Arène → bis(trifluoroacétate) d'arylthallium, puis ArI (KI), ArCN, ArOH ; orientation ortho ou para selon les conditions | Tl(OCOCF₃)₃ dans le TFA (très toxique)
substitution ipso (protodésilylation, halodésilylation, halodéboronation) | L'électrophile remplace un substituant (SiMe₃, B(OH)₂, tBu, SO₃H) plutôt qu'un H : ArSiMe₃ → ArH, ArX ; ArB(OH)₂ → ArX | TFA ou HCl ; ICl, Br₂ ; NIS, NBS, CuX₂ pour les acides boroniques
Gattermann | Phénol ou éther aromatique → aldéhyde aromatique (formylation) | HCN + HCl (ou Zn(CN)₂ + HCl, variante d'Adams), AlCl₃ ou ZnCl₂, puis hydrolyse
Gattermann–Koch | Benzène ou alkylbenzène → benzaldéhyde (formylation par CO) | CO + HCl, AlCl₃ + CuCl, sous pression
Vilsmeier–Haack | Arène riche en électrons ou hétérocycle (indole, pyrrole) → aldéhyde aromatique, via un chloro-iminium | POCl₃ + DMF, 0 → 80 °C, puis hydrolyse aqueuse (NaOAc)
Reimer–Tiemann | Phénol → aldéhyde salicylique (ortho-formylation par le dichlorocarbène) | CHCl₃ + NaOH aqueux, 60–70 °C
Duff | Phénol → ortho-hydroxybenzaldéhyde | Hexaméthylènetétramine, acide (AcOH, TFA ou glycérol/acide borique), puis hydrolyse
Rieche | Arène riche en électrons → aldéhyde aromatique | Cl₂CHOMe (éther dichlorométhylique et méthylique) + TiCl₄ ou SnCl₄, CH₂Cl₂, 0 °C
Kolbe–Schmitt | Phénolate de sodium + CO₂ → acide salicylique (ortho) ; para avec le potassium | CO₂ sous pression (100 atm), 125 °C, puis H₂SO₄
Houben–Hoesch | Phénol ou polyphénol + nitrile → arylcétone, via un sel de cétimine | RCN + HCl gazeux, ZnCl₂, éther ; puis hydrolyse
Fries (transposition) | Ester de phényle → ortho- ou para-hydroxyarylcétone (para à basse température, ortho à haute) | AlCl₃ (ou BF₃, TiCl₄, HF) ; variante photochimique (photo-Fries)
Blanc (chlorométhylation) | Arène → chlorure de benzyle (ArCH₂Cl) | HCHO + HCl, ZnCl₂ (formation possible d'éther bis-chlorométhylique, cancérogène)
Tscherniac–Einhorn (amidoalkylation) | Arène + N-hydroxyméthylamide (ou imide) → N-benzylamide (amidométhylation) | H₂SO₄ concentré
Lederer–Manasse (hydroxyalkylation) | Phénol + formaldéhyde → alcool hydroxybenzylique ortho/para (première étape des résines phénoliques) | HCHO, catalyse acide ou basique
Haworth | Arène + anhydride succinique → tétralone puis naphtalène ou phénanthrène substitué (acylation, réduction, cyclisation, aromatisation) | AlCl₃ ; Clemmensen ; H₂SO₄ ou PPA ; puis Se ou Pd/C
Scholl | Couplage déshydrogénant aryle–aryle (souvent intramoléculaire) → polyaromatiques condensés | AlCl₃/NaCl fondu, FeCl₃, ou DDQ + acide fort
Bradsher | ortho-Acyl-diarylméthane → anthracène par cyclodéshydratation aromatique | HBr/AcOH ou H₂SO₄, à chaud
Bally–Scholl | Anthraquinone (ou aminoanthraquinone) + glycérol → benzanthrone | Glycérol, H₂SO₄, réducteur (Cu, Fe ou aniline), à chaud
Nencki | Phénol + acide carboxylique → hydroxyarylcétone (acylation sur le cycle) | ZnCl₂, à chaud
Bischler–Napieralski | N-Acyl-β-aryléthylamine → 3,4-dihydroisoquinoléine (cyclodéshydratation via un nitrilium) | POCl₃ ou P₂O₅ à reflux (toluène, MeCN) ; Tf₂O/2-chloropyridine en version douce
Pictet–Spengler | β-Aryléthylamine + aldéhyde → tétrahydroisoquinoléine ; avec la tryptamine → tétrahydro-β-carboline | Acide (HCl, TFA), via un iminium ; versions asymétriques organocatalysées
Pomeranz–Fritsch | Benzaldéhyde + aminoacétal → isoquinoléine | Formation de l'imine, puis H₂SO₄ concentré
Pechmann | Phénol + β-cétoester → coumarine | H₂SO₄, acide méthanesulfonique ou acide de Lewis
Friedel–Crafts intramoléculaire | Acide ou chlorure d'arylalcanoyle → cétone cyclique (indanone, tétralone) | PPA, réactif d'Eaton, H₂SO₄ ou AlCl₃ sur le chlorure d'acyle
Bogert–Cook | Cyclodéshydratation d'un alcool β-aryléthyl-cyclohexanique → octahydrophénanthrène | H₂SO₄ concentré
Elbs (persulfate) | Phénol → para-diphénol (hydroquinone), via un sulfate d'aryle | K₂S₂O₈, NaOH aqueux, puis hydrolyse acide
Boyland–Sims | Aniline → ortho-aminophénol, via un sulfate d'ortho-aminoaryle | K₂S₂O₈ en milieu basique, puis hydrolyse acide
Wolffenstein–Böters | Benzène → acide picrique (oxynitration : hydroxylation et nitration simultanées) | HNO₃ + Hg(NO₃)₂
Jacobsen | Polyalkylbenzène ou polyhalogénobenzène sulfoné → migration des groupes alkyle ou halogène (isomérisation) | H₂SO₄ concentré
Hofmann–Martius | Chlorhydrate de N-alkylaniline → ortho- et para-alkylaniline (migration de l'alkyle sur le cycle) | Chauffage à 200–300 °C (variante Reilly–Hickinbottom avec acide de Lewis)
Orton | N-Chloroacétanilide → ortho- et para-chloroacétanilide | HCl (mécanisme intermoléculaire via Cl₂)
Fischer–Hepp | N-Nitroso-N-alkylaniline → para-nitroso-N-alkylaniline | HCl dans l'éthanol ou l'éther
élimination–addition (benzyne) | Halogénure d'aryle non activé + base très forte → aryne, puis addition du nucléophile (mélange de régioisomères, substitution ciné) | NaNH₂ ou KNH₂ dans NH₃ liquide ; ou triflate d'ortho-silylaryle + CsF (Kobayashi)
substitution nucléophile vicariante (VNS) | Nitroarène + carbanion portant un groupe partant → substitution d'un H en ortho/para du nitro | ClCH₂SO₂Ph (ou analogue) + base forte (tBuOK, NaOH/DMSO) ; Makosza
ANRORC | Substitution sur hétérocycle azoté par Addition du Nucléophile, Ouverture puis Fermeture de Cycle (l'azote du cycle peut être échangé) | KNH₂ dans NH₃ liquide sur halopyrimidines
substitutions ciné et télé | Le nucléophile entre en position adjacente (ciné) ou plus éloignée (télé) de celle du groupe partant | Typiquement via arynes (ciné) ou additions–éliminations sur nitroarènes
hydrolyse en phénol | Sel d'arènediazonium → phénol (« Verkochung ») | H₂SO₄ aqueux à chaud ; ou Cu₂O/Cu(NO₃)₂ à t.a.
réduction par H₃PO₂ | Sel d'arènediazonium → arène (remplacement de N₂⁺ par H, désamination) | H₃PO₂ aqueux, 0 °C → t.a. (mécanisme radicalaire)
Meerwein (arylation) | Sel de diazonium + alcène pauvre en électrons → produit d'arylation (addition de Ar et Cl, puis élimination éventuelle) | CuCl ou CuCl₂ catalytique, acétone/H₂O
Gomberg–Bachmann | Sel de diazonium + arène → biaryle (radicalaire, rendements faibles) | NaOH aqueux, arène en excès
Pschorr | Sel de diazonium portant un aryle voisin → phénanthrène ou cycle tricyclique (couplage intramoléculaire) | Cu en poudre, milieu acide
Japp–Klingemann | Sel de diazonium + β-cétoester ou β-cétoacide → arylhydrazone, avec perte d'un groupe acyle ou carboxyle (précurseur d'indoles de Fischer) | Base (NaOAc, KOH), 0 °C
Chichibabin (amination) | Pyridine → 2-aminopyridine (substitution nucléophile d'un hydrure) | NaNH₂ dans le toluène ou la N,N-diméthylaniline à 110–150 °C, puis H₂O
Bucherer | Naphtol ⇌ naphtylamine (réversible) | (NH₄)₂SO₃ ou NaHSO₃ + NH₃ aqueux, 150 °C sous pression
von Richter | Nitroarène → acide benzoïque, le CO₂H entrant en ortho de l'ancien nitro (substitution ciné) | KCN dans EtOH aqueux, à chaud
Zincke | Pyridine → sel de N-(2,4-dinitrophényl)pyridinium (sel de Zincke), puis amine primaire → nouveau sel de pyridinium ; ou ouverture en aldéhyde de Zincke | 1-Chloro-2,4-dinitrobenzène, puis RNH₂ (ou amine secondaire pour l'ouverture)
Bunnett | Effet d'élément en SNAr : F ≫ Cl ≈ Br > I, l'addition du nucléophile (complexe de Meisenheimer) étant l'étape lente | Argument mécanistique, pas de réactif
Janovsky | Test coloré : m-dinitroarène + cétone énolisable → complexe de Meisenheimer violet | Acétone + NaOH ou KOH
Bartoli | ortho-Nitroarène substitué + bromure de vinylmagnésium → indole substitué en 7 | 3 équivalents de CH₂=CHMgBr, THF, −40 °C
Halex | Chlorure d'aryle activé → fluorure d'aryle (échange d'halogène par SNAr) | KF (ou CsF) dans DMSO, sulfolane ou DMF, 150–250 °C, transfert de phase
procédé Dow | Chlorobenzène → phénol (via le benzyne) | NaOH aqueux, 350 °C, 300 bar, puis acidification
Ullmann (éthers) et Goldberg (voir D) | Halogénure d'aryle + phénol → éther de diaryle (Ullmann) ; + amide ou amine → N-aryle (Goldberg) | Cu ou CuI, base (K₂CO₃, Cs₂CO₃), ligand (phénanthroline, diamine, acide aminé), 80–200 °C
Rosenmund–von Braun | Halogénure d'aryle → nitrile aromatique | CuCN, DMF, NMP ou pyridine, 150–200 °C
Minisci (radicalaire) | Hétéroarène protoné (pyridine, quinoléine) + radical alkyle nucléophile → alkylation en α/γ de l'azote | RCO₂H + AgNO₃ + (NH₄)₂S₂O₈, H₂SO₄ ; variantes photoredox
Smiles | Transposition par SNAr intramoléculaire (ipso) : Ar–X–chaîne–YH → Ar–Y–chaîne–XH | Base ; aryle activé par un groupe attracteur (nitro, sulfone)
Truce–Smiles | Variante de Smiles où le nucléophile est un carbanion (ortho-métallation de diarylsulfones) ; sans activation nécessaire | n-BuLi ou base forte
Newman–Kwart | O-Aryl thiocarbamate → S-aryl thiocarbamate (phénol → thiophénol après hydrolyse) | Chauffage à 200–300 °C ; version catalysée au Pd ou photoredox à plus basse température
Chapman | Imidate d'aryle (ArO–C(Ar)=NAr) → N,N-diarylamide (migration 1,3 O → N d'un aryle) | Chauffage à 250–300 °C
Bamberger | N-Phénylhydroxylamine → para-aminophénol | H₂SO₄ aqueux dilué
α-Halogénation des cétones | Cétone → α-halocétone ; monohalogénation en milieu acide (via l'énol), polyhalogénation en milieu basique | Br₂/AcOH ou HBr ; NBS ; CuBr₂ ; SO₂Cl₂
Hell–Volhard–Zelinsky | Acide carboxylique → acide α-bromé (via le bromure d'acyle énolisable) | Br₂ + PBr₃ ou P rouge catalytique, puis H₂O
nitrosation en α | Cétone ou composé à méthylène actif → α-oximino-cétone (tautomère du nitroso) | Nitrite d'alkyle + HCl ou base ; NaNO₂/AcOH
transfert de diazo (Regitz) | Composé à méthylène actif (β-dicétone, β-cétoester) → composé α-diazo | Azoture de sulfonyle (TsN₃, MsN₃, p-ABSA) + Et₃N ou DBU
amination électrophile des énolates | Énolate → composé carbonylé α-aminé | Azodicarboxylate (DEAD, DBAD), azoture de trisyle (puis réduction), chloramine, oxaziridines, nitroso
échange H/D | Remplacement des H acides en α d'un carbonyle par D, via l'énol ou l'énolate | D₂O + base (NaOD) ou acide (DCl)
SE2 et SEi | Substitution électrophile aliphatique bimoléculaire (rétention avec attaque frontale, ou inversion) ou interne (SEi, rétention) sur une liaison C–métal | Clivage de C–Hg, C–B, C–Sn par H⁺, X₂, HgX₂
α-Hydroxylation (Davis, Rubottom, MoOPH de Vedejs) | Énolate ou éther d'énol silylé → α-hydroxycétone ou α-hydroxyester | Oxaziridine de Davis sur l'énolate ; mCPBA sur l'éther d'énol silylé (Rubottom) ; MoOPH (Vedejs)
α-sélénation et α-sulfénylation | Énolate → α-phénylsélényl ou α-phénylthio carbonyle (puis oxydation et élimination syn → énone) | LDA puis PhSeBr ou PhSeCl ; PhSSPh ou PhSCl
fluoration électrophile (Selectfluor, NFSI) | Énolate, éther d'énol ou arène riche → composé α-fluoré | Selectfluor (F-TEDA-BF₄) dans MeCN ; NFSI avec base ou catalyseur
couplage de Japp–Klingemann | Voir Japp–Klingemann : sel de diazonium + β-cétoester → arylhydrazone avec désacylation | ArN₂⁺, NaOAc ou KOH, 0 °C
oxymercuration– démercuration | Alcène → alcool Markovnikov sans transposition (addition anti de Hg et OH via un mercurinium) | Hg(OAc)₂, THF/H₂O, puis NaBH₄/NaOH
alcoxymercuration (Hofmann–Sand) | Alcène + alcool → éther Markovnikov | Hg(OAc)₂ ou Hg(OCOCF₃)₂ dans ROH, puis NaBH₄
hydrosilylation | Alcène ou alcyne + R₃SiH → alkylsilane (anti-Markovnikov) ou vinylsilane | Catalyseur de Speier (H₂PtCl₆) ou de Karstedt (Pt⁰) ; Rh, Ru ; mécanisme de Chalk–Harrod
hydrostannation | Alcyne + Bu₃SnH → vinylstannane (partenaire de Stille) | AIBN à 80 °C (radicalaire, mélange E/Z) ou Pd(PPh₃)₄ (addition syn)
hydrozirconation (Schwartz) | Alcène ou alcyne → alkyl- ou vinylzirconocène (Zr en bout de chaîne, addition syn), puis électrophile (I₂, NBS, CO, transmétallation) | Cp₂Zr(H)Cl (réactif de Schwartz), THF ou CH₂Cl₂, t.a.
hydroalumination | Alcyne → vinylalane (addition syn avec DIBAL-H ; anti sur alcool propargylique avec LiAlH₄ ou Red-Al), puis électrophile | DIBAL-H dans l'hexane ; Red-Al ou LiAlH₄ dans le THF
hydroamination | Alcène ou alcyne + amine → amine (ou énamine/imine) par addition de N–H | Catalyseurs : lanthanides, Ti, Zr, Au, Pd, Rh, ou base forte ; CuH + amine électrophile (Buchwald)
hydrocyanation | Alcène + HCN → nitrile (procédé DuPont : butadiène → adiponitrile) | Ni⁰/phosphites, acide de Lewis ; substituts de HCN (cyanhydrine d'acétone, TMSCN)
hydroformylation | Alcène + CO + H₂ → aldéhyde avec un carbone de plus (linéaire et ramifié) ; procédé oxo | HCo(CO)₄ ou HRh(CO)(PPh₃)₃, 10–100 bar, 80–150 °C
hydrocarboxylation (Koch–Haaf, Reppe) | Alcène (ou alcool) + CO + H₂O → acide carboxylique ; Koch : acide tertiaire via carbocation ; Reppe : catalyse métallique | Koch–Haaf : HCO₂H/H₂SO₄ (CO in situ) ; Reppe : Ni(CO)₄ ou Pd, CO, H₂O
hydrophosphination | Alcène ou alcyne + R₂PH → phosphine tertiaire | Amorceur radicalaire, base ou catalyseur métallique
thiol-ène et thiol-yne | Thiol + alcène → thioéther anti-Markovnikov (radicalaire) ; deux thiols sur un alcyne | hν ou AIBN, photoamorceur (DMPA) ; version Michael avec base ou phosphine
hydrofonctionnalisations par transfert d'atome d'hydrogène (Mukaiyama, Shenvi, Baran) | Alcène → produit Markovnikov (hydratation, hydrogénation, hydroazidation, couplage C–C) via un radical formé par transfert de H• depuis un hydrure métallique | Co(acac)₂, Mn(dpm)₃ ou Fe(acac)₃ + PhSiH₃ (± O₂, accepteur de Michael)
halolactonisation (iodolactonisation) | Acide carboxylique insaturé → halolactone (attaque anti du carboxylate sur l'halonium) | I₂, NaHCO₃ (ou KI₃), H₂O/éther ou MeCN ; NBS pour la bromolactonisation
haloéthérification | Alcool insaturé → éther cyclique halogéné (tétrahydrofurane, tétrahydropyrane) | I₂/NaHCO₃, NIS ou NBS
sélénolactonisation | Acide insaturé → lactone séléniée, puis élimination oxydante (alcène) ou réduction | PhSeCl ou N-PSP ; puis H₂O₂ ou Bu₃SnH
dihydroxylation syn (OsO₄, KMnO₄, Upjohn, Milas, Sharpless) et anti (Prévost, ouverture d'époxyde) | Alcène → diol vicinal syn (via ester osmique ou manganique) ou anti (via époxyde ou dioxolanylium) | syn : OsO₄ cat./NMO, KMnO₄ dilué à froid, AD-mix ; anti : mCPBA puis H₃O⁺, ou I₂/PhCO₂Ag anhydre
Woodward (cis) | Alcène → diol cis (via un acétoxonium hydrolysé par l'eau) | I₂ + AgOAc dans AcOH humide, puis hydrolyse
aminohydroxylation | Alcène → β-aminoalcool syn (version asymétrique de Sharpless) | K₂OsO₂(OH)₄ cat., chloramine-T ou carbamate N-chloré, ligand (DHQ)₂PHAL ou (DHQD)₂PHAL
diamination | Alcène → diamine vicinale | Complexes imido de l'osmium ; Pd ou Cu avec diaziridinone (Shi) ; I(III)
aziridination | Alcène → aziridine par transfert de nitrène | PhI=NTs + Cu(OTf)₂ ou Rh₂(OAc)₄ ; chloramine-T ; azotures + Ru, Co
cyclopropanation (carbènes, Simmons–Smith) | Alcène → cyclopropane, stéréospécifique (addition syn) | CH₂I₂ + Zn(Cu) ou Et₂Zn (Furukawa) ; CHCl₃/NaOH/transfert de phase (dichlorocarbène) ; diazoester + Rh₂(OAc)₄ ou Cu
addition de nitrènes | Alcène + nitrène → aziridine (singulet : stéréospécifique) ; insertion C–H possible | Azotures (Δ ou hν), iminoiodinanes + métal
carbométallation (carboalumination de Negishi, carbocupration de Normant) | Alcyne → vinylmétal trisubstitué par addition syn de C–métal, puis électrophile | Me₃Al + Cp₂ZrCl₂ cat. (Negishi) ; RCu·MgX₂ ou R₂CuLi (Normant)
Prins | Alcène + aldéhyde (formaldéhyde) → 1,3-diol, 1,3-dioxane ou alcool allylique selon les conditions ; cyclisation de Prins → tétrahydropyranes | H₂SO₄ ou acide de Lewis (SnCl₄, BF₃·OEt₂, TMSOTf)
cyclisations cationiques de polyènes (Stork–Eschenmoser, Johnson) | Polyène (type squalène) → polycycle trans-anti-trans, addition anti sur chaque double liaison (hypothèse de Stork–Eschenmoser) | Amorce : acétal, époxyde ou alcool allylique + acide de Lewis (SnCl₄, TiCl₄) ou de Brønsted
addition 1,2 contre 1,4 sur les diènes conjugués | Diène + HX ou X₂ → produit 1,2 (cinétique, basse température) ou 1,4 (thermodynamique, plus haute température), via un cation allylique | HBr à −80 °C (1,2 majoritaire) ou à 40 °C (1,4 majoritaire)
hydrates | Aldéhyde ou cétone + H₂O ⇌ gem-diol ; favorable pour le formaldéhyde, le chloral, la ninhydrine | H₂O, catalyse acide ou basique
thioacétals | Aldéhyde ou cétone + thiol ou dithiol → dithioacétal (dithiane, dithiolane) ; protection, umpolung, désoxygénation | HS(CH₂)₃SH ou HS(CH₂)₂SH + BF₃·OEt₂ ou ZnCl₂
combinaison bisulfitique | Aldéhyde ou méthylcétone + NaHSO₃ → α-hydroxysulfonate cristallin (purification, régénération par acide ou base) | NaHSO₃ aqueux saturé
imines (bases de Schiff) | Aldéhyde ou cétone + amine primaire → imine + H₂O (réversible, via un hémiaminal) | pH 4–5, élimination de l'eau (Dean–Stark, tamis moléculaire, MgSO₄, Ti(OEt)₄)
énamines | Aldéhyde ou cétone énolisable + amine secondaire → énamine (nucléophile en β) | Pyrrolidine, morpholine ou pipéridine, TsOH cat., Dean–Stark
oximes | Aldéhyde ou cétone + hydroxylamine → oxime (isomères E/Z) | NH₂OH·HCl + NaOAc ou pyridine, EtOH
hydrazones | Aldéhyde ou cétone + hydrazine → hydrazone ; 2,4-DNPH : précipité jaune-orange (test) | N₂H₄, PhNHNH₂, TsNHNH₂ ou 2,4-dinitrophénylhydrazine, catalyse acide
semicarbazones | Aldéhyde ou cétone + semicarbazide → semicarbazone cristalline (caractérisation) | H₂NNHCONH₂·HCl + NaOAc
réduction par hydrures (voir B) | Aldéhyde → alcool primaire, cétone → alcool secondaire, par addition nucléophile d'un hydrure | NaBH₄ (MeOH), LiAlH₄ (éther, THF), DIBAL-H, Selectrides
Barbier | Halogénure + carbonyle + métal en un seul pot → alcool (organométallique formé in situ) | Mg, Zn, In, Sn ou SmI₂ ; possible dans l'eau avec Zn ou In (allylation)
Reformatsky | α-Haloester + aldéhyde ou cétone → β-hydroxyester, via un énolate de zinc | Zn activé, THF ou benzène à reflux ; variantes SmI₂, CrCl₂
Nozaki–Hiyama–Kishi | Halogénure (ou triflate) de vinyle, d'aryle ou d'allyle + aldéhyde → alcool allylique ; très chimiosélectif pour les aldéhydes | CrCl₂ (excès) + NiCl₂ catalytique, DMF ou DMSO
addition d'acétylures (Favorskii) | Alcyne terminal + aldéhyde ou cétone → alcool propargylique | KOH ou NaNH₂ ; n-BuLi ; version asymétrique de Carreira : Zn(OTf)₂, Et₃N, N-méthyléphédrine
allylations (Brown, Roush, Keck, Hosomi–Sakurai, Krische) | Aldéhyde + réactif allylé → alcool homoallylique, souvent énantiosélectif | Allyl-B(Ipc)₂ (Brown) ; allylboronate de tartrate (Roush) ; allyl-SnBu₃ + Ti/BINOL (Keck) ; allyl-SiMe₃ + TiCl₄ (Hosomi–Sakurai) ; Ir cat. par transfert d'hydrogène (Krische)
addition sur nitriles (Grignard → cétone, Blaise, Houben–Hoesch, Stephen) | Nitrile + RMgX → cétone après hydrolyse de l'imine ; Blaise : + α-bromoester/Zn → β-cétoester ; Stephen : réduction en aldéhyde | RMgX puis H₃O⁺ ; Zn/BrCH₂CO₂Et ; SnCl₂/HCl puis H₂O
Henry | Nitroalcane + aldéhyde ou cétone → β-nitroalcool (nitroaldol) ; déshydratation → nitroalcène | Base catalytique (Et₃N, DBU, KF, TBAF) ; versions asymétriques au Cu ou La (Shibasaki)
Mannich | Composé énolisable + aldéhyde (formaldéhyde) + amine → β-aminocétone (base de Mannich), via un iminium | Amine secondaire·HCl, HCHO, EtOH à reflux ; sel d'Eschenmoser préformé ; versions asymétriques à la proline
Strecker | Aldéhyde + NH₃ + cyanure → α-aminonitrile → acide α-aminé après hydrolyse | NH₄Cl + KCN (ou TMSCN), puis HCl aqueux à reflux
Bucherer–Bergs | Aldéhyde ou cétone → hydantoïne (puis acide α-aminé α,α-disubstitué par hydrolyse) | KCN + (NH₄)₂CO₃, EtOH/H₂O, 60 °C
benzoïne | Deux aldéhydes aromatiques → α-hydroxycétone (umpolung de l'aldéhyde) | KCN ou NaCN cat. dans EtOH/H₂O ; ou sel de thiazolium/base (carbène NHC, intermédiaire de Breslow)
Corey–Chaykovsky | Ylure de soufre + cétone ou aldéhyde → époxyde ; + énone → cyclopropane (sulfoxonium) ; + imine → aziridine | Me₃S⁺ I⁻ ou Me₃S(O)⁺ I⁻ + NaH ou tBuOK, DMSO/THF
Wittig et apparentées (voir C) | Aldéhyde ou cétone + ylure de phosphore → alcène + Ph₃P=O | Sel de phosphonium + base (n-BuLi, NaHMDS, tBuOK) ; HWE, Julia, Peterson en alternatives
Kabachnik–Fields | Amine + aldéhyde ou cétone + dialkylphosphite → α-aminophosphonate (trois composants) | Sans catalyseur ou acide de Lewis, souvent sans solvant
Pudovik | Dialkylphosphite + imine (ou aldéhyde, alcène activé) → α-aminophosphonate (ou α-hydroxyphosphonate) | Base catalytique (Et₃N, NaOEt)
Abramov | Trialkylphosphite (ou dialkylphosphite) + aldéhyde ou cétone → α-hydroxyphosphonate | P(OR)₃ + TMSCl, ou (RO)₂P(O)H + base
Petasis | Amine + aldéhyde (acide glyoxylique, salicylaldéhyde) + acide boronique → amine allylique ou acide α-aminé (Mannich au bore) | CH₂Cl₂, EtOH ou HFIP, t.a.
Cannizzaro | Deux aldéhydes non énolisables → un alcool + un carboxylate (dismutation par transfert d'hydrure) ; version croisée avec HCHO | NaOH ou KOH concentré
Tishchenko | Deux aldéhydes → ester (RCO₂CH₂R) | Al(OEt)₃ ou Al(OiPr)₃ catalytique
Meerwein–Ponndorf–Verley | Cétone ou aldéhyde → alcool, par transfert d'hydrure depuis l'isopropanol (état de transition cyclique à six centres), chimiosélectif | Al(OiPr)₃ dans iPrOH, distillation de l'acétone
Oppenauer | Alcool secondaire → cétone (inverse de MPV) ; conserve les doubles liaisons (stéroïdes) | Al(OiPr)₃ ou Al(OtBu)₃, acétone ou cyclohexanone en excès
Cram | Modèle d'induction 1,2 : sur un carbonyle α-chiral, le nucléophile attaque du côté du petit substituant, le gros étant anti au C=O | Modèle historique, remplacé par Felkin–Anh
Cram chélaté | Avec un hétéroatome en α (OR, NR₂) et un métal chélatant, le nucléophile attaque la face la moins encombrée du chélate à cinq chaînons → diol syn | Métaux chélatants : Mg²⁺, Zn²⁺, Ti⁴⁺, Ce³⁺ ; protecteur non encombrant (Bn, MOM)
Felkin–Anh | Le gros substituant (ou le plus électroattracteur, σ* C–X) se place perpendiculaire au C=O ; attaque anti à lui selon l'angle de Bürgi–Dunitz, côté du petit substituant | Conditions non chélatantes (BF₃, Li, groupes silylés encombrants)
Cornforth | Pour les α-halo ou α-alcoxy carbonyles : dipôles C=O et C–X antiparallèles, attaque du côté le moins encombré | Alternative à Felkin polaire (Evans–Cornforth)
Zimmerman–Traxler | État de transition chaise à six centres de l'aldolisation : énolate Z → aldol syn, énolate E → aldol anti | Énolates de bore, lithium, titane
trajectoire de Bürgi–Dunitz | Le nucléophile approche le carbonyle selon un angle d'environ 107° par rapport au C=O (recouvrement avec π*) | Fondement géométrique des modèles de Felkin–Anh
additions sur sulfinimines d'Ellman | Aldéhyde ou cétone + tert-butanesulfinamide → N-sulfinylimine ; addition diastéréosélective d'organométallique ou d'hydrure → amine chirale après retrait du sulfinyle | tBuS(O)NH₂, Ti(OEt)₄ ou CuSO₄ ; RMgX ou RLi ; puis HCl/MeOH
aza- | Aza-Michael : amine (ou amide, azoture) + accepteur de Michael → composé β-aminé | Souvent sans catalyseur, ou acide de Lewis, base ; réversible (rétro-Michael)
oxa- | Oxa-Michael : alcool ou alcoolate + accepteur de Michael → β-alcoxy carbonyle (souvent intramoléculaire → tétrahydropyranes) | Base (tBuOK, DBU) ou acide ; réversible
thia- et phospha-Michael | Thiol (ou phosphine, phosphite) + accepteur de Michael → β-thio (ou β-phosphoré) carbonyle | Thiol + base catalytique (Et₃N) ; très rapide, base de la bioconjugaison cystéine–maléimide
cuprates de Gilman (addition 1,4) | Énone + R₂CuLi → cétone β-alkylée (addition conjuguée), énolate piégeable | R₂CuLi dans l'éther ou le THF à −78 °C ; TMSCl accélère ; RMgX + CuI cat.
Mukaiyama–Michael | Éther d'énol silylé + énone → 1,5-dicarbonyle | TiCl₄ ou autre acide de Lewis, CH₂Cl₂, −78 °C
Stork (énamines) | Énamine + halogénure réactif ou accepteur de Michael → cétone α-alkylée (monoalkylation, côté le moins substitué) après hydrolyse | Pyrrolidine/TsOH ; puis RX (allyle, benzyle, α-halocarbonyle) ou énone ; H₃O⁺
Sakurai conjuguée | Allylsilane + énone → cétone δ,ε-insaturée (allylation 1,4) | TiCl₄, CH₂Cl₂, −78 °C ; ou TBAF
Stetter | Aldéhyde + accepteur de Michael → 1,4-dicarbonyle (addition conjuguée d'un acyl-anion, umpolung) | Sel de thiazolium ou triazolium + base (NHC), ou NaCN
Rauhut–Currier | Dimérisation ou couplage de deux alcènes activés (Morita–Baylis–Hillman vinylogue) | Phosphine (PBu₃) ou thiolate nucléophile
Morita–Baylis–Hillman | Alcène activé (acrylate, énone) + aldéhyde → alcool allylique α-méthylénique | DABCO, quinuclidine ou phosphine catalytique ; lente (jours) ; aza-MBH avec imines
Hayashi–Miyaura (rhodium) | Acide arylboronique + énone → addition conjuguée énantiosélective | [Rh(acac)(C₂H₄)₂] + BINAP ou diène chiral, dioxane/H₂O, 100 °C
hydrocyanation de Nagata | Énone → β-cyanocétone (addition 1,4 de cyanure) | Et₂AlCN, ou HCN + Et₃Al, THF ou toluène
addition radicalaire de Giese | Radical alkyle nucléophile + alcène pauvre en électrons → produit d'addition conjuguée | RX + Bu₃SnH/AIBN ; RHgX/NaBH₄ ; photoredox à partir de RCO₂H ou d'esters redox-actifs
époxydation de Weitz–Scheffer | Énone → α,β-époxycétone (addition conjuguée de l'hydroperoxyde puis fermeture) | H₂O₂ + NaOH dans MeOH, 0 °C ; ou tBuOOH/base
additions 1,6 et vinylogues | Addition conjuguée étendue sur diénone ou diénoate (position δ) ; réactivité transmise par le système conjugué | Cuprates (souvent 1,6), catalyse au Cu, Rh ou organocatalyse
Ei (syn, intramoléculaire) | Élimination thermique concertée par état de transition cyclique, géométrie syn-périplanaire, sans base ni solvant | Pyrolyse d'esters, de xanthates, d'oxydes d'amine, de sulfoxydes, de sélénoxydes
α-élimination (formation de carbènes) | Départ de H et X du même carbone → carbène | CHCl₃ + base (dichlorocarbène) ; CH₂Br₂ ou CH₂Cl₂ + RLi (carbénoïde)
règles de Zaitsev et de Hofmann | Zaitsev : alcène le plus substitué majoritaire (petite base, bon groupe partant). Hofmann : alcène le moins substitué (base encombrée, groupe partant chargé NR₃⁺, SR₂⁺ ou F) | tBuOK, LDA ou ammoniums → Hofmann ; EtONa → Zaitsev
règle de Bredt | Pas de double liaison en tête de pont d'un petit système bicyclique (orbitales p non coplanaires) | Explique l'absence d'énolisation ou d'élimination vers une tête de pont
géométrie antipériplanaire | En E2, H et groupe partant à 180° (trans-diaxiaux sur un cyclohexane) ; détermine la stéréochimie de l'alcène | Exemple : chlorure de menthyle contre chlorure de néomenthyle
Cope | Élimination de Cope : oxyde d'amine tertiaire → alcène + hydroxylamine (Ei syn, état de transition à cinq centres) | Oxydation de l'amine par H₂O₂ ou mCPBA, puis chauffage à 100–150 °C
Chugaev | Alcool → xanthate → alcène par pyrolyse (Ei syn, sans transposition) | NaH, CS₂, MeI ; puis 120–200 °C
pyrolyse d'esters | Acétate d'alkyle → alcène + AcOH (Ei syn, état de transition à six centres) | 400–500 °C en phase gazeuse
élimination de sélénoxydes (Grieco, Sharpless–Reich) et de sulfoxydes | Séléniure → sélénoxyde → alcène par élimination syn à t.a. (sulfoxydes vers 80–120 °C). Grieco : alcool primaire → alcène terminal | o-NO₂C₆H₄SeCN + PBu₃ (Grieco) ; PhSeBr sur énolate ; puis H₂O₂ ou mCPBA
déshalogénation de dihalogénures vicinaux (Zn, NaI) | Dihalogénure vicinal → alcène (élimination anti) | Zn dans AcOH ou EtOH ; NaI dans l'acétone ; Mg
Boord | β-Halogéno-éther → alcène par élimination réductrice | Zn (ou Mg, Na) dans l'alcool ou l'éther
Corey–Winter | Diol 1,2 → alcène, stéréospécifique (syn) via un thiocarbonate cyclique | Thiocarbonyldiimidazole ou thiophosgène, puis P(OMe)₃ à chaud
Bamford–Stevens | Tosylhydrazone → alcène (via diazo puis carbène en milieu aprotique, ou carbocation en milieu protique) ; alcène le plus substitué | NaOMe ou NaH, à chaud
Shapiro | Tosylhydrazone → vinyllithium → alcène le moins substitué (ou piégeage par un électrophile) | 2 équivalents de n-BuLi ou MeLi, −78 °C → t.a.
Peterson | α-Silyl carbanion + carbonyle → β-hydroxysilane → alcène ; élimination anti en milieu acide, syn en milieu basique (contrôle E/Z) | Me₃SiCH₂Li ou Me₃SiCH₂MgCl ; puis H₂SO₄ ou BF₃, ou KH
Julia | Sulfone + aldéhyde → alcène E. Julia–Lythgoe : β-acyloxysulfone réduite ; Julia–Kocienski : un seul pot avec sulfone de tétrazolyle ou de benzothiazolyle | n-BuLi, RCHO, Ac₂O puis Na/Hg ou SmI₂ ; ou sulfone PT/BT + KHMDS
Ramberg–Bäcklund | α-Halosulfone → alcène, par formation d'un épisulfone puis extrusion de SO₂ | Base (KOH, tBuOK) ; variante de Meyers : sulfone + CCl₄/KOH in situ
Whiting | But-2-yne-1,4-diol (ou éther) → diène conjugué par élimination réductrice | LiAlH₄
Kuhn–Winterstein | Diol 1,2 → alcène (synthèse de polyènes) | P₂I₄
Saegusa–Ito | Éther d'énol silylé → énone (déshydrogénation de cétone) | Pd(OAc)₂ (stœchiométrique, ou catalytique avec benzoquinone ou O₂), MeCN
désaturation de Mukaiyama | Énolate de cétone → énone en un pot | N-tert-butylbenzènesulfinimidoyl chlorure, −78 °C
double déshydrohalogénation | Dihalogénure vicinal ou géminal → alcyne | NaNH₂ dans NH₃ liquide (3 équivalents pour un alcyne terminal), ou KOH à 200 °C, tBuOK
Fritsch–Buttenberg–Wiechell | 1,1-Diaryl-2-halogéno-alcène → diarylalcyne, par migration 1,2 dans un carbène ou carbénoïde vinylidène | Base forte (n-BuLi, tBuOK, NaNH₂)
Corey–Fuchs | Aldéhyde → 1,1-dibromoalcène → alcyne terminal (un carbone de plus), ou alcyne substitué par piégeage | CBr₄ + PPh₃ (± Zn) ; puis 2 équivalents de n-BuLi, −78 °C, puis H₂O ou électrophile
Doering–LaFlamme | Alcène → gem-dihalocyclopropane → allène (un carbone inséré) | CHBr₃/tBuOK ; puis MeLi ou Mg ou Na
Crabbé | Alcyne terminal + formaldéhyde → allène terminal (homologation) | (CH₂O)n, iPr₂NH, CuBr, dioxane à reflux
Myers (allènes) | Alcool propargylique → allène, via une diazène propargylique (rétro-ène, perte de N₂), stéréospécifique | o-Nitrobenzènesulfonylhydrazine (NBSH), PPh₃, DEAD (Mitsunobu), −15 °C → t.a.
déshydratation des amides et des oximes en nitriles | Amide primaire ou aldoxime → nitrile | POCl₃, SOCl₂, P₂O₅, TFAA/pyridine, réactif de Burgess, chlorure de cyanuryle
des formamides en isonitriles | Déshydratation d'un formamide N-substitué → isonitrile (isocyanure) | POCl₃ + Et₃N ou iPr₂NH ; triphosgène ; réactif de Burgess
réaction de Hofmann aux isonitriles (carbylamine) | Amine primaire + chloroforme → isonitrile (odeur repoussante, test des amines primaires), via le dichlorocarbène | CHCl₃ + KOH alcoolique ; transfert de phase
Grob | Fragmentation d'un système 1,3 : X–C–C–C–Y → X=C + C=C + Y⁻ (liaisons antipériplanaires) ; γ-amino-halogénures, 1,3-diol monosulfonates | Base (tBuOK) ou simple solvolyse
Eschenmoser–Tanabe | α,β-Époxycétone → alcyne + carbonyle (fragmentation, ouverture de cycle → alcynone) | TsNHNH₂, AcOH ou pyridine
Wharton | α,β-Époxycétone → alcool allylique transposé | N₂H₄·H₂O, AcOH catalytique, MeOH
rétro-aldol | β-Hydroxycarbonyle → deux composés carbonylés (inverse de l'aldolisation) | Base ou acide, à chaud ; aldolases en biochimie
rétro-Claisen | β-Dicarbonyle (non énolisable entre les deux C=O) → ester + cétone, par attaque d'un alcoolate ou d'un hydroxyde | NaOH ou RONa à chaud
rétro-Diels–Alder | Cyclohexène → diène + diénophile (thermique) ; exemple : craquage du dicyclopentadiène | 170–600 °C ; pyrolyse éclair sous vide
rétro-ène | Fragmentation concertée inverse de la réaction ène ; exemple : décarboxylation des acides β,γ-insaturés, éthers d'allyle | Thermique, 300–500 °C
extrusions chélotropiques (SO₂, N₂, CO) | Perte d'une petite molécule liée par deux liaisons σ au même atome : sulfolène → diène + SO₂ ; norbornadiénone → arène + CO ; diazènes cycliques → N₂ | Thermique (110–150 °C pour le sulfolène) ou photochimique
décarboxylation des β-cétoacides et des acides maloniques | β-Cétoacide → cétone + CO₂ ; acide malonique → acide acétique substitué + CO₂ (état de transition cyclique à six centres → énol) | Chauffage à 50–150 °C, souvent en milieu acide
Barton | Décarboxylation de Barton : acide → ester de thiohydroxamate (ester de Barton) → RH (ou RX, RSPy) par voie radicalaire | N-Hydroxypyridine-2-thione + DCC (ou chlorure d'acyle) ; puis Bu₃SnH ou tBuSH, AIBN ou hν ; CCl₄ ou BrCCl₃ pour RX
Kochi | Acide carboxylique → chlorure d'alkyle (halodécarboxylation) | Pb(OAc)₄ + LiCl, benzène à reflux
décarbonylation de Tsuji–Wilkinson | Aldéhyde → alcane + CO (chlorure d'acyle → RCl) | RhCl(PPh₃)₃ stœchiométrique, à chaud ; versions catalytiques avec diphosphines
dégradations d'Emde | Sel d'ammonium quaternaire (benzylique, allylique) → amine tertiaire + hydrocarbure, par coupure réductrice C–N | Na/Hg dans l'eau ou l'alcool ; Na/NH₃
de von Braun | Dégradation de von Braun : amine tertiaire + BrCN → cyanamide + bromure d'alkyle (désalkylation) ; ou amide + PCl₅ → nitrile + RCl | BrCN ; ou PCl₅/PBr₅ sur un amide N-substitué
de Hofmann | Dégradation de Hofmann : méthylation exhaustive d'une amine puis élimination de l'hydroxyde d'ammonium quaternaire → alcène le moins substitué + amine tertiaire | MeI en excès ; Ag₂O/H₂O ; chauffage à 100–200 °C
de Barbier–Wieland | Dégradation de Barbier–Wieland : acide carboxylique → acide avec un carbone de moins | Ester + 2 PhMgBr → alcool tertiaire ; déshydratation ; oxydation de l'alcène par CrO₃
`;
