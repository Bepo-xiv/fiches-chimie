// Résumés d'une ligne des réactions de l'index — partie H (interconversions, hétérocycles, multicomposants, asymétrie, sucres, peptides, tests, procédés).
// Format : nom tel que cité | ce que fait la réaction (départ → produit) | réactifs et conditions typiques
// Rédigés de mémoire : repères de révision à vérifier, pas des protocoles.
export default `
ester de pinacol | Protection de l'acide boronique en ester de pinacol (Bpin) : stable à la chromatographie, encore actif en Suzuki | Pose : pinacol, MgSO₄ (ou borylation de Miyaura). Retrait : NaIO₄/NH₄OAc, ou KHF₂ puis hydrolyse, ou transestérification
MIDA | Boronate de MIDA (acide N-méthyliminodiacétique) : bore sp³ inerte en Suzuki anhydre, permet les couplages itératifs (Burke) | Pose : MIDA, DMSO/toluène, Dean–Stark. Retrait : NaOH 1 M ou NaHCO₃ aqueux, THF, t.a.
trifluoroborate | Sel R–BF₃K (Molander) : solide stable à l'air, libère lentement l'acide boronique en milieu de Suzuki | Pose : KHF₂, MeOH/H₂O. Retrait : hydrolyse (silice/H₂O, TMSCl/H₂O, LiOH) ou usage direct
1,8-diaminonaphtalène (dan) | Boronamide B(dan) : bore désactivé (don des azotes), inerte en Suzuki, orthogonal à Bpin | Pose : 1,8-diaminonaphtalène, toluène à reflux. Retrait : acide aqueux (HCl, H₂SO₄)
2-cyanoéthyle | Protection du phosphate en synthèse d'oligonucléotides | Pose : phosphoramidite de 2-cyanoéthyle puis oxydation (I₂/H₂O). Retrait : base (NH₃ aqueux, DBU), β-élimination libérant l'acrylonitrile
phosphate de benzyle | Ester benzylique de phosphate | Pose : dibenzyl-phosphoramidite puis oxydation (mCPBA, tBuOOH). Retrait : H₂, Pd/C ; ou TMSBr
phosphate de méthyle | Ester méthylique de phosphate | Pose : phosphoramidite ou chlorophosphate de diméthyle. Retrait : thiolate (PhSH/Et₃N), TMSBr, ou tBuNH₂
Pbf | 2,2,4,6,7-Pentaméthyldihydrobenzofurane-5-sulfonyle : protège la guanidine de l'arginine (stratégie Fmoc), plus labile que Pmc | Dérivé commercial Fmoc-Arg(Pbf)-OH. Retrait : TFA 95 % + piégeurs (TIS, H₂O), 1–3 h
Pmc (Arg) | 2,2,5,7,8-Pentaméthylchromane-6-sulfonyle : protège la guanidine de l'arginine | Fmoc-Arg(Pmc)-OH. Retrait : TFA + piégeurs (plus lent que Pbf, alkyle davantage le Trp)
Trt (His, Asn, Gln, Cys) | Trityle sur l'imidazole de His, l'amide d'Asn/Gln, le thiol de Cys | Dérivés Fmoc commerciaux. Retrait : TFA + triisopropylsilane (piège le cation trityle) ; Cys(Trt) aussi par I₂ → disulfure
tBu (Ser, Thr, Tyr, Asp, Glu) | Éther (Ser, Thr, Tyr) ou ester (Asp, Glu) de tert-butyle en stratégie Fmoc/tBu | Dérivés Fmoc commerciaux. Retrait : TFA 95 % + piégeurs (H₂O, TIS), en même temps que le décrochage de la résine
Mtt | 4-Méthyltrityle sur l'amine de Lys (ou Orn) : très acido-labile, orthogonal à tBu et Boc | Fmoc-Lys(Mtt)-OH. Retrait : TFA 1 % dans CH₂Cl₂ (+ TIS), ou HFIP/CH₂Cl₂
Mmt | 4-Méthoxytrityle (Lys, Cys) : encore plus acido-labile que Mtt | Retrait : TFA 1 % ou AcOH/TFE/CH₂Cl₂, ou HOBt dans TFE
ivDde | Version encombrée du Dde (Lys) : ne migre pas, stable à la pipéridine | Fmoc-Lys(ivDde)-OH. Retrait : hydrazine 2–4 % dans le DMF
→ halogénure (SOCl₂, PBr₃, Appel) | Alcool → chlorure, bromure ou iodure d'alkyle | SOCl₂ (± pyridine) ; PBr₃ ; PPh₃/CBr₄ ou CCl₄ (Appel) ; PPh₃/I₂/imidazole (iodure, Garegg–Samuelsson)
→ sulfonate | Alcool → tosylate, mésylate ou triflate (activation en groupe partant, rétention au carbone) | TsCl/pyridine ou Et₃N/DMAP ; MsCl/Et₃N, 0 °C ; Tf₂O/pyridine, −78 °C
→ azoture (Mitsunobu, DPPA) | Alcool → azoture avec inversion | PPh₃, DIAD, HN₃ ou DPPA ; ou DPPA + DBU (Thompson) ; ou MsCl puis NaN₃
→ amine (Mitsunobu–Gabriel) | Alcool → amine primaire avec inversion | PPh₃, DIAD, phtalimide ; puis N₂H₄, EtOH à reflux
→ fluorure (DAST, Deoxo-Fluor, PyFluor) | Alcool → fluorure d'alkyle avec inversion (désoxyfluoration) | DAST ou Deoxo-Fluor, CH₂Cl₂, −78 °C → t.a. ; PyFluor + DBU ; PhenoFluor
→ éther | Alcool → éther | Williamson (NaH puis RX) ; trichloroacétimidate de benzyle/TfOH ; Ag₂O/MeI ; Mitsunobu avec phénols
→ ester | Alcool → ester | Anhydride ou chlorure d'acyle/pyridine/DMAP ; acide + DCC/DMAP (Steglich) ; Mitsunobu (inversion)
→ thiol | Alcool → thiol | Mitsunobu avec AcSH puis hydrolyse ; ou tosylate + KSAc ou thiourée ; réactif de Lawesson (benzyliques)
→ alcène | Alcool → alcène (déshydratation) | H₂SO₄ ou H₃PO₄ à chaud (E1) ; POCl₃/pyridine (E2) ; réactif de Burgess ou de Martin ; Chugaev ; Grieco
→ carbonyle | Alcool primaire → aldéhyde (ou acide), secondaire → cétone | Swern, Dess–Martin, PCC, TPAP/NMO, TEMPO ; Jones ou Pinnick pour l'acide
→ gem-difluorure (DAST) | Aldéhyde ou cétone → CF₂ | DAST ou Deoxo-Fluor, CH₂Cl₂ (± chauffage) ; XtalFluor ; via dithiolane + NIS/HF·pyridine
→ triflate d'énol (réactifs de Comins et de McMurry) | Cétone → triflate d'énol (partenaire de couplage) | LDA ou KHMDS, −78 °C, puis PhNTf₂ (McMurry) ou N-(5-chloro-2-pyridyl)triflimide (Comins) ; Tf₂O + base encombrée (thermodynamique)
→ iodure vinylique (Barton) | Cétone → hydrazone → iodure vinylique | N₂H₄ ; puis I₂, base (TMG, DBU ou Et₃N)
→ thiocétone ou thioamide (Lawesson, P₄S₁₀) | C=O → C=S (amides > cétones > esters) | Réactif de Lawesson, toluène, 80–110 °C ; P₄S₁₀/pyridine ou HMDO
→ alcyne | Aldéhyde → alcyne terminal (homologation) | Corey–Fuchs (CBr₄/PPh₃ puis n-BuLi) ; Ohira–Bestmann ; Seyferth–Gilbert
→ nitrile | Aldéhyde → nitrile ; cétone → nitrile homologue | NH₂OH puis déshydratation (Ac₂O, T3P) ; I₂/NH₃ aqueux ; TosMIC (van Leusen)
→ méthylène | C=O → C=CH₂ (méthylénation) ou CH₂ (désoxygénation) | Wittig (Ph₃P=CH₂), Tebbe, Petasis, Lombardo ; Wolff–Kishner, Clemmensen, Mozingo
→ époxyde | Aldéhyde ou cétone → époxyde (un carbone ajouté) | Corey–Chaykovsky (Me₃S⁺I⁻/NaH) ; Darzens (α-haloester/base) ; CH₂N₂
→ chlorure d'acyle | Acide → chlorure d'acyle | SOCl₂ ; (COCl)₂/DMF cat. ; réactif de Ghosez (conditions neutres)
acide → ester | Acide carboxylique → ester | Fischer (ROH/H⁺) ; CH₂N₂ ou TMSCHN₂ ; RX/Cs₂CO₃ ; DCC/DMAP ; Yamaguchi ; Mitsunobu
acide → amide | Acide carboxylique → amide | Chlorure d'acyle + amine ; agents de couplage (EDC/HOBt, HATU, T3P, PyBOP) ; anhydride mixte ; catalyse à l'acide borique à chaud
acide → anhydride | Acide carboxylique → anhydride symétrique ou mixte | Ac₂O à chaud ; DCC (0,5 éq.) ; chloroformiate d'isobutyle/NMM ; chlorure de pivaloyle
→ amine avec perte d'un carbone (Curtius, Hofmann, Schmidt, Lossen) | Acide ou amide → isocyanate → amine avec un carbone de moins (rétention au carbone migrant) | Curtius : DPPA/Et₃N, Δ ; Hofmann : Br₂/NaOH ou PIDA ; Schmidt : HN₃/H₂SO₄ ; Lossen : acide hydroxamique activé
amide → nitrile (déshydratation) | Amide primaire → nitrile | POCl₃, SOCl₂, TFAA/pyridine, réactif de Burgess, chlorure de cyanuryle/DMF, T3P
nitrile → amide (Radziszewski) | Nitrile → amide primaire sans aller à l'acide | H₂O₂, NaOH ou K₂CO₃, DMSO ou EtOH (Radziszewski) ; catalyseur de Ghaffar–Parkins (Pt) ; H₂SO₄ concentré à froid
nitrile → acide | Nitrile → acide carboxylique | HCl ou H₂SO₄ aqueux à reflux ; NaOH ou KOH aqueux à reflux puis acidification ; nitrilases
nitrile → aldéhyde | Nitrile → aldéhyde | DIBAL-H (1 éq.), toluène, −78 °C, puis H₃O⁺ ; Stephen (SnCl₂/HCl) ; Ni de Raney/HCO₂H
nitrile → amidine | Nitrile → amidine | Pinner (HCl/ROH puis NH₃) ; LiHMDS puis HCl ; AlMe₃/NH₄Cl (Garigipati)
nitrile → tétrazole | Nitrile + azoture → tétrazole 5-substitué (bioisostère d'acide carboxylique) | NaN₃, NH₄Cl, DMF, 100–120 °C ; NaN₃/ZnBr₂ dans l'eau (Sharpless) ; Bu₃SnN₃ ; TMSN₃/Bu₂SnO
→ halogénure ou phénol (diazotation, Sandmeyer) | ArNH₂ → ArN₂⁺ → ArCl, ArBr, ArCN (CuX), ArI (KI), ArF (HBF₄, Δ), ArOH (H₂O, Δ), ArH (H₃PO₂) | NaNO₂, HX, 0–5 °C ; ou tBuONO, CuX₂, MeCN (anhydre)
→ isocyanate | Amine primaire → isocyanate | Phosgène ou triphosgène, base ; Boc₂O/DMAP ; CO₂ puis déshydratation
isonitrile | Amine primaire → isonitrile | Formylation (HCO₂Et) puis déshydratation (POCl₃/Et₃N) ; ou CHCl₃/KOH/transfert de phase (carbylamine)
urée | Amine → urée | Isocyanate ; CDI ou triphosgène + deuxième amine ; KOCN/HCl (urée monosubstituée)
carbamate | Amine → carbamate | Chloroformiate/base ; Boc₂O ; CbzCl ; Fmoc-OSu ; CO₂ + RX/Cs₂CO₃
sulfonamide | Amine → sulfonamide | RSO₂Cl, pyridine ou Et₃N ; DABSO + organométallique puis amine (voie moderne)
guanidine | Amine → guanidine | 1H-Pyrazole-1-carboxamidine, N,N′-di-Boc-thiourée/HgCl₂ ou réactif de Mukaiyama, réactif de Goodman (triflylguanidine di-Boc), cyanamide
N-déméthylation (von Braun, chloroformiates) | Amine tertiaire N-méthylée → amine secondaire | BrCN puis hydrolyse (von Braun) ; chloroformiate d'α-chloroéthyle (ACE-Cl) puis MeOH à reflux (Olofson) ; ClCO₂CH=CH₂ ; Polonovski
activation en sels de pyridinium (Katritzky) | Amine primaire → sel de 2,4,6-triphénylpyridinium : le C–N devient groupe partant ou précurseur de radical alkyle (couplages désaminants) | Tétrafluoroborate de 2,4,6-triphénylpyrylium, EtOH à reflux ; puis Ni ou photoredox
réduction en amine | Composé nitré → amine | H₂, Pd/C ou Ni de Raney ; Fe/HCl ou Fe/NH₄Cl ; SnCl₂ ; Zn/AcOH ; Na₂S₂O₄ ; LiAlH₄ (aliphatiques)
ter Meer | 1-Halogéno-1-nitroalcane + nitrite → 1,1-dinitroalcane | NaNO₂ ou KNO₂, base (KOH)
Kamlet | Aldéhyde + nitroalcane (via l'adduit bisulfitique) → β-nitroalcool (variante de Henry) | NaHSO₃, puis sel de sodium du nitroalcane
ArX → ArOH | Halogénure d'aryle → phénol | Pd₂(dba)₃/tBuXPhos, KOH, dioxane/H₂O, 100 °C ; CuI/ligand/hydroxyde ; SNAr si activé ; ou borylation puis oxydation
ArB(OH)₂ → ArOH | Acide ou ester arylboronique → phénol (ipso-hydroxylation) | H₂O₂/NaOH ; Oxone ; N-oxydes d'amine ; NaBO₃
ArX → ArCN | Halogénure d'aryle → nitrile | Pd⁰/Zn(CN)₂ ou K₄[Fe(CN)₆] ; CuCN, DMF à 150 °C (Rosenmund–von Braun) ; Ni/Zn(CN)₂
ArH → ArBpin | Arène → ester arylboronique par borylation C–H | [Ir(cod)OMe]₂, dtbpy, B₂pin₂, hexane ou THF, 25–80 °C (sélectivité stérique)
O-déméthylation | ArOMe → ArOH | BBr₃, CH₂Cl₂, −78 °C → t.a. ; HBr/AcOH à reflux ; EtSNa ou dodécanethiolate, DMF à 150 °C ; AlCl₃/thiol ; chlorhydrate de pyridine fondu à 200 °C
sulfonation | ArH → ArSO₃H | H₂SO₄ concentré ou oléum ; ClSO₃H → ArSO₂Cl ; réversible à chaud en milieu aqueux acide
Hudlicky | Désoxyfluoration des alcools : ROH → RF | DAST (réaction décrite et passée en revue par M. Hudlický), CH₂Cl₂, −78 °C
désoxyfluoration | ROH → RF (inversion) ; C=O → CF₂ ; RCO₂H → RCOF ou RCF₃ ; ArOH → ArF | DAST, Deoxo-Fluor, XtalFluor-E, PyFluor, PhenoFluor (phénols), SF₄ (acides → CF₃)
trifluorométhylation (Ruppert–Prakash, Togni, Umemoto, Langlois) | Introduction de CF₃ : nucléophile sur carbonyles et imines (TMSCF₃), électrophile (Togni, Umemoto), radicalaire (Langlois) ; ArX → ArCF₃ avec « CuCF₃ » | TMSCF₃ + TBAF ou CsF cat. ; réactif de Togni + Cu ; CF₃SO₂Na/tBuOOH
SuFEx | Échange fluorure–soufre(VI) : R–SO₂F ou ArOSO₂F + silyl-éther ou amine → sulfonate, sulfate, sulfamide (chimie click de Sharpless) | SO₂F₂ + phénol/Et₃N (fluorosulfate) ; puis ArOSiR₃, DBU ou BEMP ou bifluorure cat.
Leuckart (thiophénols) | Sel de diazonium → xanthate d'aryle → thiophénol | EtOCS₂K, 40–70 °C ; puis KOH/EtOH
thionation | C=O → C=S (amide → thioamide, cétone → thiocétone, lactone → thionolactone) | Réactif de Lawesson, toluène ou THF ; P₄S₁₀ ; réactif de Belleau
oxydations successives du soufre | Thiol → disulfure → (acide sulfénique, sulfinique) → acide sulfonique ; sulfure → sulfoxyde → sulfone | I₂ ou air (disulfure) ; NaIO₄ ou H₂O₂ 1 éq. (sulfoxyde) ; mCPBA 2 éq. ou Oxone (sulfone) ; H₂O₂/HCO₂H (acide sulfonique)
Atherton–Todd | Dialkylphosphite + amine (ou alcool) → phosphoramidate (ou phosphate), via le chlorophosphate formé in situ | (RO)₂P(O)H, CCl₄, Et₃N, amine
Arbuzov | Trialkylphosphite + halogénure d'alkyle → phosphonate (réactifs de HWE) | P(OEt)₃ + RX (primaire, α-haloester), 120–160 °C, distillation de EtX
Paal–Knorr | 1,4-Dicétone → pyrrole (+ amine ou NH₃), furane (acide) ou thiophène (agent sulfurant) | RNH₂ ou NH₄OAc, AcOH ; TsOH ou H₂SO₄ ; réactif de Lawesson ou P₄S₁₀
Knorr | α-Aminocétone (formée in situ par réduction d'une oxime) + β-cétoester → pyrrole | NaNO₂/AcOH puis Zn/AcOH en présence du β-cétoester
Hantzsch | Pyrroles de Hantzsch : β-cétoester + α-halocétone + amine. Dihydropyridines de Hantzsch : aldéhyde + 2 β-cétoesters + NH₃, puis oxydation en pyridine | NH₃ ou amine primaire ; EtOH à reflux ; oxydation par HNO₃, DDQ ou MnO₂
Barton–Zard | Nitroalcène + α-isocyanoacétate → pyrrole-2-carboxylate | Base (DBU, TMG ou K₂CO₃), THF ou iPrOH
Piloty–Robinson | Azine d'une cétone énolisable → pyrrole 3,4-disubstitué ([3,3] comme dans Fischer) | HCl ou ZnCl₂ à chaud ; version micro-ondes avec chlorure d'acyle
Clauson-Kaas | Amine primaire + 2,5-diméthoxytétrahydrofurane → pyrrole N-substitué | AcOH à reflux, ou tampon acétate dans l'eau
Trofimov | Cétoxime + acétylène → pyrrole (et N-vinylpyrrole) | KOH/DMSO (superbase), 70–120 °C
Feist–Benary | α-Halocétone + β-dicarbonyle → furane 3-acylé | Base (pyridine, Et₃N, NH₃)
Gewald | Cétone (ou aldéhyde) + nitrile activé (cyanoacétate, malononitrile) + soufre → 2-aminothiophène | S₈, morpholine ou Et₂NH, EtOH, 50 °C
Fiesselmann | Thioglycolate + ester acétylénique (ou β-chlorovinyl carbonyle) → 3-hydroxythiophène-2-carboxylate | NaOMe ou KOtBu
Hinsberg | Thiophènes de Hinsberg : 1,2-dicétone + thiodiglycolate de diéthyle → thiophène-2,5-dicarboxylate | NaOEt ou tBuOK (double condensation type Stobbe)
Volhard–Erdmann | Succinate (ou 1,4-dicarbonyle) → thiophène | P₄S₇ ou P₄S₁₀ à chaud
Fischer | Arylhydrazone d'un aldéhyde ou d'une cétone → indole ([3,3] sigmatropique de l'ène-hydrazine, perte de NH₃) | ZnCl₂, PPA, AcOH, TsOH, H₂SO₄ ou BF₃ ; 80–200 °C
Leimgruber–Batcho | ortho-Nitrotoluène → énamine → indole (non substitué en 2 et 3) par cyclisation réductrice | DMF-DMA, pyrrolidine, 110 °C ; puis H₂/Pd-C, Ni de Raney/N₂H₄ ou Fe/AcOH
Madelung | N-Acyl-ortho-toluidine → indole 2-substitué (cyclisation intramoléculaire du carbanion benzylique) | NaNH₂ ou tBuOK à 250–350 °C ; n-BuLi ou LDA à t.a. (variante de Houlihan)
Nenitzescu | Benzoquinone + β-aminocrotonate (énaminoester) → 5-hydroxyindole | Acétone, AcOH ou nitrométhane, t.a. → reflux
Bischler–Möhlau | α-Bromoacétophénone + aniline en excès → 2-arylindole | Chauffage (180 °C) ou micro-ondes, HBr d'aniline comme catalyseur
Gassman | Aniline → 3-thiométhyl-indole (ou oxindole) via un ylure de sulfonium et un [2,3] sigmatropique de type Sommelet–Hauser | tBuOCl ; α-thiométhyl-cétone ; Et₃N ; puis Ni de Raney pour ôter SMe
Hemetsberger–Knittel | α-Azidocinnamate → indole-2-carboxylate (nitrène, azirine) | Thermolyse dans le xylène à reflux
Cadogan–Sundberg | ortho-Nitrostyrène (ou ortho-nitrobiaryle → carbazole) → indole par désoxygénation en nitrène | P(OEt)₃ à reflux ; ou PPh₃, ou CO/Pd
Mori–Ban | N-Allyl-ortho-halogénoaniline → indole par Heck intramoléculaire | Pd(OAc)₂, PPh₃, base (Et₃N, NaHCO₃), DMF ou MeCN
Sugasawa | Aniline + chloroacétonitrile → ortho-aminochloroacétophénone → indole | BCl₃ + AlCl₃ (ou GaCl₃) ; puis NaBH₄ (cyclisation réductrice)
Baeyer–Emmerling | Acide ortho-nitrocinnamique → indole | Fe en poudre, KOH
carbazoles de Borsche–Drechsel | Phénylhydrazone de la cyclohexanone → tétrahydrocarbazole (Fischer) → carbazole par déshydrogénation | H₂SO₄ ou AcOH ; puis Pd/C, chloranile ou Pb₃O₄
Bucherer et Graebe–Ullmann | Carbazoles : Bucherer : naphtol + arylhydrazine + NaHSO₃ ; Graebe–Ullmann : 1-arylbenzotriazole → carbazole par perte de N₂ | NaHSO₃ aqueux à chaud ; thermolyse (> 300 °C) ou hν
oxindoles de Stollé et de Hinsberg | Stollé : aniline + chlorure d'α-chloroacyle → oxindole (Friedel–Crafts intramoléculaire). Hinsberg : aniline secondaire + adduit bisulfitique du glyoxal | AlCl₃ à chaud ; NaHSO₃/glyoxal
isatines de Sandmeyer et de Martinet | Sandmeyer : aniline + hydrate de chloral + NH₂OH → isonitrosoacétanilide → isatine. Martinet : aniline + oxomalonate → dioxindole → isatine | H₂SO₄ concentré, 60–80 °C ; oxydation à l'air
indigo de Baeyer–Drewson et de Heumann | Baeyer–Drewson : ortho-nitrobenzaldéhyde + acétone → indigo. Heumann : N-phénylglycine → indoxyle → indigo (procédé industriel) | NaOH aqueux ; fusion alcaline avec NaNH₂ à 200 °C puis air
Bohlmann–Rahtz | Énamine (β-aminocrotonate) + ynone → aminodiénone → pyridine 2,3,6-trisubstituée | Addition de Michael à 50 °C ; cyclodéshydratation à 120–170 °C, ou acide (AcOH, ZnBr₂, Amberlyst) en un pot
Bönnemann | 2 alcynes + nitrile → pyridine (cyclotrimérisation [2+2+2] au cobalt) | CpCo(cod) ou CpCo(CO)₂, chauffage ou hν
Petrenko-Kritschenko | 2 aldéhydes + acétonedicarboxylate + amine → 4-pipéridone (double Mannich) | Eau ou alcool, t.a.
Robinson–Schöpf (tropinone) | Succinaldéhyde + méthylamine + acide acétonedicarboxylique → tropinone (double Mannich biomimétique, puis décarboxylation) | Eau tamponnée pH 5–7, t.a.
Skraup | Aniline + glycérol → quinoléine (acroléine in situ, addition de Michael, cyclisation, oxydation) | H₂SO₄ concentré, oxydant (nitrobenzène, As₂O₅ ou I₂), FeSO₄ modérateur, 130–150 °C
Doebner–Miller | Aniline + aldéhyde ou cétone α,β-insaturé → quinoléine substituée | HCl ou H₂SO₄, à chaud (± ZnCl₂)
Doebner | Aniline + aldéhyde + acide pyruvique → acide quinoléine-4-carboxylique | EtOH à reflux
Friedländer | ortho-Aminobenzaldéhyde (ou cétone) + cétone à CH₂ en α → quinoléine | Base (KOH, pipéridine) ou acide (TsOH, TFA), EtOH à reflux
Combes | Aniline + β-dicétone → quinoléine 2,4-disubstituée | Formation de l'énaminone, puis H₂SO₄ concentré ou PPA à chaud
Conrad–Limpach | Aniline + β-cétoester → 4-quinolone (via l'énamine, contrôle cinétique) ; variante de Knorr → 2-quinolone (via l'anilide, à chaud) | t.a. puis 250 °C (Dowtherm ou éther diphénylique) ; Knorr : 140 °C puis H₂SO₄
Gould–Jacobs | Aniline + éthoxyméthylène-malonate → 4-quinolone-3-carboxylate (précurseur des quinolones antibiotiques) | 100 °C ; puis cyclisation thermique à 250 °C (éther diphénylique) ; saponification
Pfitzinger | Isatine + cétone énolisable → acide quinoléine-4-carboxylique | KOH aqueux à chaud, puis acidification
Camps | ortho-Acylamino-acétophénone → 2- et 4-quinolones (aldol intramoléculaire) | NaOH ou NaOEt, EtOH à reflux
Niementowski | Quinoléines : acide anthranilique + cétone → 4-hydroxyquinoléine. Quinazolines : acide anthranilique + amide → quinazolin-4-one | Chauffage à 120–200 °C
Meth-Cohn | Acétanilide → 2-chloroquinoléine-3-carbaldéhyde | Réactif de Vilsmeier (POCl₃/DMF), 75 °C
Pictet–Gams | N-Acyl-β-hydroxy-β-phényléthylamine → isoquinoléine directement aromatique (cyclisation et déshydratation) | P₂O₅ ou POCl₃, toluène ou décaline à reflux
pyrazoles de Knorr et de Pechmann | Knorr : 1,3-dicarbonyle + hydrazine → pyrazole (ou pyrazolone avec un β-cétoester). Pechmann : diazométhane + alcyne → pyrazole (cycloaddition 1,3-dipolaire) | N₂H₄ ou ArNHNH₂, EtOH/AcOH ; CH₂N₂, éther
imidazoles de Debus–Radziszewski | 1,2-Dicarbonyle + aldéhyde + 2 NH₃ (ou NH₃ + amine primaire) → imidazole | NH₄OAc, AcOH à reflux
Bredereck et Marckwald | Imidazoles : Bredereck : α-hydroxycétone ou α-halocétone + formamide. Marckwald : α-aminocétone + thiocyanate → imidazole-2-thiol puis désulfuration | Formamide à 150–180 °C ; KSCN puis HNO₃ ou Ni de Raney
oxazoles de Robinson–Gabriel | α-Acylaminocétone → oxazole par cyclodéshydratation | H₂SO₄, POCl₃, PPA ; ou PPh₃/I₂/Et₃N (Wipf) ; réactif de Burgess
Fischer et van Leusen | Oxazoles : Fischer : cyanhydrine + aldéhyde aromatique, HCl sec → 2,5-diaryloxazole. van Leusen : aldéhyde + TosMIC → oxazole 5-substitué | HCl gazeux, éther ; K₂CO₃, MeOH à reflux
thiazoles de Hantzsch | α-Halocétone + thioamide (ou thiourée → 2-aminothiazole) → thiazole | EtOH à reflux
Cook–Heilbron et Gabriel | Thiazoles : Cook–Heilbron : α-aminonitrile + CS₂ (ou dithioacide, isothiocyanate) → 5-aminothiazole. Gabriel : α-acylaminocétone + P₄S₁₀ → thiazole | t.a., conditions douces ; P₄S₁₀ ou Lawesson à chaud
triazoles de Huisgen | Azoture + alcyne → 1,2,3-triazole (thermique : mélange 1,4 et 1,5) | 80–120 °C ; Cu(I) → 1,4 (CuAAC) ; Cp*RuCl(PPh₃)₂ → 1,5 (RuAAC)
Einhorn–Brunner et Pellizzari | 1,2,4-Triazoles : Einhorn–Brunner : imide + hydrazine substituée. Pellizzari : amide + acylhydrazide | Acide faible, chauffage ; fusion à 200–250 °C
thiadiazoles de Hurd–Mori | Hydrazone N-acylée ou N-tosylée d'une cétone à CH₂ en α → 1,2,3-thiadiazole | SOCl₂, 0 °C → t.a.
tétrazoles (azoture + nitrile) | Nitrile + azoture → tétrazole 5-substitué (cycloaddition [3+2]) | NaN₃/NH₄Cl, DMF à 120 °C ; NaN₃/ZnBr₂, H₂O à reflux ; TMSN₃/Bu₂SnO
isoxazoles (oxydes de nitrile, Claisen) | Oxyde de nitrile + alcyne → isoxazole ([3+2]) ; Claisen : 1,3-dicétone + hydroxylamine → isoxazole | Chlorure d'hydroximoyle/Et₃N ; NH₂OH·HCl, EtOH à reflux
indazoles de Davis–Beirut | ortho-Nitrobenzylamine → 2H-indazole (formation de N–N via un nitroso-imine) | KOH, alcool (MeOH, EtOH), 60 °C
benzimidazoles de Phillips | ortho-Phénylènediamine + acide carboxylique → benzimidazole 2-substitué | HCl 4 M à reflux ; ou PPA ; avec un aldéhyde + oxydant (Na₂S₂O₅, air)
azlactones d'Erlenmeyer | N-Acylglycine + aldéhyde → 4-arylidène-oxazol-5-one (azlactone) | Ac₂O, NaOAc, 100 °C
Biginelli | Aldéhyde + β-cétoester + urée (ou thiourée) → 3,4-dihydropyrimidin-2-one | HCl cat., EtOH à reflux ; ou acide de Lewis (Yb(OTf)₃, FeCl₃, TMSCl)
pyrimidines de Pinner | Amidine + 1,3-dicarbonyle (ou β-cétoester → pyrimidinone) → pyrimidine | NaOEt/EtOH ou K₂CO₃
purines de Traube | 4,5-Diaminopyrimidine + acide formique (ou orthoformiate) → purine (fermeture du cycle imidazole) | HCO₂H à reflux ; ou HC(OEt)₃/Ac₂O
pyrazines de Gutknecht et de Staedel–Rugheimer | Auto-condensation de deux α-aminocétones → dihydropyrazine → pyrazine. Gutknecht : aminocétone par réduction d'une α-oximinocétone ; Staedel–Rugheimer : par NH₃ sur une α-halocétone | Zn/AcOH ou H₂/Pd ; NH₃ ; oxydation par l'air, HgO ou CuSO₄
quinazolines de Niementowski | Acide anthranilique + amide (formamide) → quinazolin-4(3H)-one | 120–180 °C (ou micro-ondes)
quinoxalines de Hinsberg | ortho-Phénylènediamine + 1,2-dicarbonyle → quinoxaline | EtOH ou AcOH, t.a. → reflux
cinnolines de Widman–Stoermer | ortho-Aminostyrène (α-substitué) → diazotation → cinnoline 4-substituée par cyclisation du diazonium sur l'alcène | NaNO₂, HCl, 0 °C → t.a.
de Borsche et de Richter | Cinnolines : Borsche : ortho-aminoacétophénone diazotée → 4-hydroxycinnoline. Richter : acide ortho-aminophénylpropiolique (ou ortho-aminoarylalcyne) diazoté → 4-hydroxycinnoline | NaNO₂, HCl ou H₂SO₄ ; chauffage à 70 °C
triazines de Bamberger et de Pinner | Bamberger : sel de diazonium + hydrazone de l'acide pyruvique → benzo-1,2,4-triazine. Pinner : amidine + phosgène → 2-hydroxy-4,6-diaryl-1,3,5-triazine | H₂SO₄/AcOH ; COCl₂
acridines de Bernthsen | Diarylamine + acide carboxylique → acridine 9-substituée | ZnCl₂, 200–270 °C (ou PPA, plus doux)
phénazines de Wohl–Aue | Nitroarène + aniline → phénazine | KOH ou NaOH en poudre, 140–200 °C
phénanthridines de Pictet–Hubert | N-Acyl-2-aminobiphényle → phénanthridine (variante de Morgan–Walls : POCl₃) | ZnCl₂ à 250–300 °C ; ou POCl₃ dans le nitrobenzène à reflux
coumarines de Pechmann et de Perkin | Pechmann : phénol + β-cétoester + acide → coumarine. Perkin : salicylaldéhyde + Ac₂O/NaOAc → coumarine | H₂SO₄, acide méthanesulfonique ; Ac₂O, NaOAc, 180 °C
chromones de Kostanecki et de Simonis | Kostanecki : ortho-hydroxyarylcétone + anhydride + sel de l'acide → chromone. Simonis : phénol + β-cétoester + P₂O₅ → chromone (au lieu de la coumarine de Pechmann) | Ac₂O/NaOAc à chaud ; P₂O₅
flavones d'Allan–Robinson et de Baker–Venkataraman | Allan–Robinson : ortho-hydroxyarylcétone + anhydride aromatique → flavone. Baker–Venkataraman : ortho-acyloxyacétophénone → 1,3-dicétone (base) → flavone (acide) | (ArCO)₂O + ArCO₂Na, 180 °C ; KOH/pyridine puis H₂SO₄/AcOH
flavonols d'Auwers et d'Algar–Flynn–Oyamada | Auwers : dibromure d'aurone + KOH → flavonol. Algar–Flynn–Oyamada : 2′-hydroxychalcone + H₂O₂/NaOH → flavonol (cyclisation oxydante) | KOH alcoolique ; H₂O₂, NaOH, EtOH
benzofuranes de Rap–Stoermer | Salicylaldéhyde + α-halocétone → 2-acylbenzofurane (O-alkylation puis aldol et déshydratation) | K₂CO₃ ou KOH, EtOH ou MeCN à reflux
cyclisation de Prins | Alcool homoallylique + aldéhyde → tétrahydropyrane 2,6-cis 4-substitué (oxocarbénium, cyclisation chaise, piégeage par un nucléophile) | TFA, BF₃·OEt₂, TMSOTf, SnBr₄ ou InCl₃, CH₂Cl₂, −78 °C → t.a.
oxétanes par Paternò–Büchi | Carbonyle excité + alcène → oxétane ([2+2] photochimique) | hν (300–350 nm), benzène ou MeCN
spirocétalisation | Dihydroxycétone → spirocétal ; contrôle thermodynamique : isomère stabilisé par deux effets anomères | Acide (CSA, PPTS, TsOH, HCl), MeOH ou CH₂Cl₂ ; souvent déclenchée par une déprotection
aziridines de Wenker | β-Aminoalcool → ester sulfurique → aziridine | H₂SO₄ à chaud (ou ClSO₃H à froid) ; puis NaOH
Hoch–Campbell | Cétoxime + réactif de Grignard → aziridine (via une azirine) | RMgX en excès, toluène à reflux ; puis hydrolyse
De Kimpe et Blum–Ittah | De Kimpe : α-chloro-imine + nucléophile (hydrure, cyanure, Grignard) → aziridine. Blum–Ittah : époxyde → azido-alcool → aziridine | LiAlH₄ ou RMgX ; NaN₃ puis PPh₃ (Staudinger, cyclisation avec inversion)
β-lactames de Staudinger | Cétène + imine → β-lactame ([2+2] par étapes via un zwitterion ; cis avec cétènes donneurs) | Chlorure d'acyle + Et₃N ou iPr₂NEt, CH₂Cl₂, −78 °C → t.a.
Kinugasa et Gilman–Speeter | β-Lactames : Kinugasa : acétylure de cuivre + nitrone → β-lactame cis. Gilman–Speeter : énolate de zinc (Reformatsky) ou de lithium d'un ester + imine → β-lactame | CuI, Et₃N ou pyridine ; Zn, α-bromoester ou LDA, THF
macrolactonisations de Yamaguchi | Séco-acide → macrolactone via l'anhydride mixte 2,4,6-trichlorobenzoïque | Cl₃C₆H₂COCl, Et₃N, THF ; puis DMAP, toluène à reflux, haute dilution (≈ 1 mM)
Mukaiyama et Mitsunobu | Macrolactonisations : Mukaiyama : activation de l'acide par un sel de 2-chloropyridinium ; Mitsunobu : activation de l'alcool (inversion du carbinol) | Iodure de 2-chloro-1-méthylpyridinium, Et₃N, MeCN à reflux ; PPh₃, DIAD, toluène ou THF, haute dilution
RCM | Diène → macrocycle insaturé + éthylène par métathèse cyclisante | Grubbs II ou Hoveyda–Grubbs II (2–10 mol %), CH₂Cl₂ ou toluène, 40–80 °C, 1–5 mM
Ruzicka | Sel (Th, Ce, Ca) d'un diacide → cétone macrocyclique par cétonisation décarboxylante (muscone, civettone) ; rendements faibles | Pyrolyse à 300–400 °C sous vide
Thorpe–Ziegler | α,ω-Dinitrile → énaminonitrile cyclique → cétone macrocyclique | LiNEt₂ ou NaN(Me)Ph, éther, haute dilution ; puis hydrolyse acide et décarboxylation
acyloïne | α,ω-Diester → acyloïne macrocyclique (la réaction a lieu en surface du sodium, sans haute dilution) | Na, xylène à reflux, TMSCl (Rühlmann)
couplages de Glaser et d'Eglinton | α,ω-Diyne terminal → macrocycle 1,3-diyne (annulènes de Sondheimer) | Cu(OAc)₂, pyridine, haute dilution (Eglinton) ; CuCl/TMEDA/O₂ (Hay)
Rothemund | Pyrrole + aldéhyde → porphyrine méso-substituée (première méthode, rendements faibles) | Pyridine, tube scellé, 150–220 °C
Adler–Longo | Pyrrole + benzaldéhyde → méso-tétraphénylporphyrine (≈ 20 %) | Acide propionique à reflux, à l'air, 30 min
Lindsey | Pyrrole + aldéhyde → porphyrinogène (équilibre, haute dilution) → porphyrine par oxydation ; 30–40 %, aldéhydes sensibles tolérés | BF₃·OEt₂ ou TFA, CH₂Cl₂, 10 mM, t.a. ; puis DDQ ou p-chloranile
Prato | C₆₀ + ylure d'azométhine (N-méthylglycine + aldéhyde) → fulléropyrrolidine | Sarcosine, aldéhyde, toluène à reflux
Passerini | Isonitrile + aldéhyde (ou cétone) + acide carboxylique → α-acyloxy-amide (trois composants) | CH₂Cl₂ ou sans solvant, concentré, t.a. (solvant aprotique)
Ugi (variantes Ugi–Smiles et Ugi-azoture) | Isonitrile + aldéhyde + amine + acide carboxylique → α-acylamino-amide (quatre composants, réarrangement de Mumm final). Ugi–Smiles : phénol pauvre à la place de l'acide ; Ugi-azoture : HN₃ → tétrazole | MeOH ou TFE, 0,5–2 M, t.a. ; TMSN₃ pour la version azoture
Groebke–Blackburn–Bienaymé | 2-Aminoazine (2-aminopyridine) + aldéhyde + isonitrile → imidazo[1,2-a]pyridine 3-aminée | Sc(OTf)₃, HClO₄ ou AcOH cat., MeOH, t.a. → 60 °C
van Leusen à trois composants | Aldéhyde + amine primaire (imine in situ) + TosMIC → imidazole 1,5-disubstitué (ou 1,4,5-trisubstitué) | K₂CO₃, MeOH ou DMF, t.a. → reflux
Asinger | α-Halocétone (ou cétone + soufre) + NH₃ + second carbonyle → 3-thiazoline | NH₃, S₈ ou NaSH, t.a.
Betti | 2-Naphtol + aldéhyde aromatique + amine (NH₃) → aminobenzylnaphtol (base de Betti ; Mannich phénolique) | EtOH, t.a. ; ou sans solvant à 60 °C
Debus–Radziszewski | 1,2-Dicétone + aldéhyde + NH₃ (± amine primaire) → imidazole tri- ou tétrasubstitué | NH₄OAc, AcOH à reflux
dihydroxylation et aminohydroxylation de Sharpless | Alcène → diol syn (AD) ou β-aminoalcool (AA) énantioenrichis ; face prédite par le moyen mnémotechnique de Sharpless | AD-mix-α ou -β (K₂OsO₂(OH)₄, (DHQ)₂PHAL ou (DHQD)₂PHAL, K₃Fe(CN)₆, K₂CO₃), tBuOH/H₂O, 0 °C ; AA : + chloramine-T ou carbamate N-chloré
sulfoxydation de Kagan | Sulfure prochiral → sulfoxyde énantioenrichi | Ti(OiPr)₄/(R,R)-DET/H₂O (1:2:1), hydroperoxyde de cumène, CH₂Cl₂, −20 °C
résolution cinétique hydrolytique de Jacobsen | Époxyde terminal racémique → époxyde énantiopur (> 99 % ee) + diol 1,2 (un seul énantiomère est hydrolysé) | (salen)Co(III)OAc (0,2–2 mol %), H₂O (0,55 éq.), sans solvant, t.a.
CBS | Cétone prochirale → alcool énantioenrichi | Oxazaborolidine (Me-CBS, 5–10 mol %), BH₃·SMe₂ ou catécholborane, THF ou toluène
CuH de Buchwald | Réduction conjuguée énantiosélective ; hydroamination et hydroalkylation d'alcènes par CuH chiral | Cu(OAc)₂, (R)-DTBM-SEGPHOS, silane (DEMS, PMHS), THF, t.a.
résolution cinétique dynamique (Noyori, Bäckvall) | Racémique → un seul stéréoisomère avec rendement théorique de 100 % grâce à la racémisation rapide in situ du substrat | Noyori : hydrogénation Ru–BINAP de β-cétoesters α-substitués. Bäckvall : lipase (CALB) + catalyseur de racémisation au Ru (Shvo) + donneur d'acyle
Oppolzer | Sultame du camphre : auxiliaire pour alkylations, aldols, Diels–Alder, additions conjuguées | Acylation (NaH, RCOCl) ; réaction ; clivage LiOH/H₂O₂ ou LiAlH₄
Enders | Hydrazones SAMP/RAMP : alkylation α asymétrique des aldéhydes et cétones | SAMP ; LDA ; RX ; O₃ ou MeI/HCl ou acide oxalique
Ellman | tert-Butanesulfinamide : synthèse asymétrique d'amines par addition sur N-sulfinylimines | tBuS(O)NH₂, Ti(OEt)₄ ; RMgX ou NaBH₄/L-Selectride ; HCl/MeOH
Schöllkopf | Éther bis-lactime : synthèse d'acides α-aminés non naturels | n-BuLi, −78 °C ; RX ; HCl 0,25 M
Seebach | Auto-régénération de stéréocentres (acétals de pivalaldéhyde d'acides aminés, hydroxyacides) ; auxiliaires dioxinones et TADDOL | LDA, −78 °C ; RX ; hydrolyse
Meyers | Oxazolines et lactames bicycliques chiraux : acides α-substitués, centres quaternaires, biaryles axialement chiraux | LDA, RX ; hydrolyse acide
8-phénylmenthol de Corey | Auxiliaire dont le phényle masque une face de l'acrylate (empilement π) : Diels–Alder, ène, additions conjuguées (synthèse des prostaglandines) | Ester d'acrylate de 8-phénylmenthyle + AlCl₃ ou SnCl₄, −78 °C
alkylation allylique de Trost | Substitution allylique énantiosélective au Pd avec les ligands diphosphines de Trost (désymétrisation, résolution dynamique) | Pd₂(dba)₃·CHCl₃, ligand (R,R)-DACH-phényle, nucléophile, base, CH₂Cl₂
allylation décarboxylante de Stoltz | Carbonate d'énol allylique ou β-cétoester d'allyle → cétone α-quaternaire énantioenrichie | Pd₂(dba)₃ ou Pd₂(pmdba)₃, (S)-tBu-PHOX, THF ou toluène, 25–40 °C
additions de Feringa (phosphoramidites) | Addition conjuguée énantiosélective de dialkylzincs (et Grignard) sur énones, catalysée au cuivre avec ligands phosphoramidites du BINOL | Cu(OTf)₂ (1–2 mol %), phosphoramidite (2–4 mol %), R₂Zn, toluène, −30 °C
Diels–Alder aux oxazaborolidines de Corey | Diels–Alder énantiosélective catalysée par une oxazaborolidine protonée ou activée (acide de Lewis cationique chiral) | Oxazaborolidine dérivée du diphénylprolinol + TfOH, Tf₂NH ou AlBr₃ (5–20 mol %), CH₂Cl₂, −78 °C
complexes Cu–bisoxazoline d'Evans | Acides de Lewis chiraux Cu(II)–BOX : Diels–Alder, aldol de Mukaiyama, Michael, ène, cyclopropanation, aziridination (substrats chélatants) | Cu(OTf)₂ ou Cu(SbF₆)₂ + tBu-BOX ou Ph-BOX (1–10 mol %), CH₂Cl₂
aldols de Carreira et de Shibasaki | Carreira : Mukaiyama aldol énantiosélectif (Ti–BINOL–base de Schiff) et aldol vinylogue (CuF₂/Tol-BINAP). Shibasaki : aldol direct par catalyseurs hétérobimétalliques (LaLi₃(BINOL)₃, LLB) | Catalyseur 2–5 mol %, éther ou THF, −20 → 0 °C
autocatalyse de Soai | Pyrimidine-5-carbaldéhyde + iPr₂Zn → alcool chiral qui catalyse sa propre formation avec amplification de l'excès énantiomérique (de < 0,1 % à > 99 % ee) | iPr₂Zn, toluène ou cumène, 0 °C
carbénoïdes de Davies et de Doyle | Carboxylates et carboxamidates chiraux de dirhodium : cyclopropanation, insertion C–H et Si–H, formation d'ylures, énantiosélectives | Rh₂(S-DOSP)₄, Rh₂(S-PTAD)₄ (Davies, carbènes donneur–accepteur) ; Rh₂(5S-MEPY)₄ (Doyle, diazoacétates et diazoamides)
proline (Hajos–Parrish, List) | Catalyse énamine par la L-proline : aldol intramoléculaire (Hajos–Parrish) et intermoléculaire (List), Mannich, α-amination, α-oxydation | L-Proline (3–30 mol %), DMSO ou DMF, t.a.
imidazolidinones de MacMillan | Catalyse iminium (Diels–Alder, Friedel–Crafts, additions conjuguées d'énals) et SOMO ; α-fonctionnalisation par énamine | Imidazolidinone de 1re ou 2e génération·HX (10–20 mol %), MeOH/H₂O ou CH₂Cl₂, −30 °C → t.a.
éthers de diarylprolinol de Jørgensen–Hayashi | Catalyse énamine et iminium très générale d'aldéhydes : Michael sur nitroalcènes, α-fonctionnalisations, époxydation d'énals, cascades | Éther TMS du diphénylprolinol ou du bis(3,5-CF₃-phényl)prolinol (5–20 mol %), ± acide
acides phosphoriques chiraux (Akiyama, Terada) | Acides de Brønsted dérivés du BINOL : activation d'imines (Mannich, Pictet–Spengler, réduction par ester de Hantzsch, Friedel–Crafts) ; contre-anion chiral (ACDC) | TRIP ou analogues 3,3′-diarylés (1–10 mol %), toluène ou CH₂Cl₂
thiourées (Jacobsen, Takemoto) | Catalyse par liaison hydrogène : activation d'imines, de nitroalcènes, liaison d'anions (Strecker, Mannich, Michael, Pictet–Spengler acylante) | Thiourée de Jacobsen (amide–thiourée) ; thiourée bifonctionnelle de Takemoto (amine tertiaire), 1–10 mol %
carbènes N-hétérocycliques (Rovis, Bode) | Umpolung par NHC chiraux : benzoïne et Stetter asymétriques (Rovis) ; homoénolates, acyl-azoliums, annélations (Bode) | Sel de triazolium aminoindanol (5–20 mol %) + base (KHMDS, DBU, iPr₂NEt)
bases de Lewis de Denmark | Activation d'acides de Lewis faibles (SiCl₄, RSiCl₃) par une base de Lewis chirale : allylation, aldol, ouverture d'époxydes ; aussi activation de sélénium et de soufre électrophiles | Phosphoramides chiraux (1–10 mol %), CH₂Cl₂, −78 °C
DMAP chiraux de Fu | DMAP à chiralité planaire (ferrocène) : résolution cinétique d'alcools et d'amines, réarrangement de Steglich, [2+2] de cétènes | Catalyseur de Fu (1–5 mol %), Ac₂O, Et₃N, alcool tert-amylique, 0 °C
pool chiral | Partir d'un produit naturel énantiopur bon marché (acides aminés, sucres, terpènes, acide tartrique, acide lactique) dont on conserve les stéréocentres | Exemples : L-proline, D-glucose, (R)-carvone, (−)-menthol, acide (S)-malique
résolution cinétique (Sharpless, lipases) | Un énantiomère du racémique réagit plus vite que l'autre : rendement maximal de 50 % par énantiomère ; sélectivité s = k_rapide/k_lent | Époxydation de Sharpless d'alcools allyliques secondaires (0,6 éq. tBuOOH) ; lipases (CALB, PSL) + acétate de vinyle
désymétrisation | Différencier deux groupes énantiotopes d'un composé méso ou prochiral → jusqu'à 100 % d'un seul énantiomère | Hydrolyse de diesters méso (estérase de foie de porc), ouverture d'anhydrides méso (alcaloïdes de cinchona), ouverture d'époxydes méso (salen–Cr, Jacobsen)
biocatalyse (cétoréductases, transaminases) | Enzymes isolées ou modifiées : cétone → alcool chiral (KRED + NAD(P)H recyclé) ; cétone → amine chirale (transaminase + PLP, donneur isopropylamine) | Tampon aqueux pH 7–9, 25–45 °C, cosolvant (DMSO) ; ex. sitagliptine
analyse de Mosher | Détermination de la configuration absolue et de l'excès énantiomérique d'un alcool ou d'une amine secondaire par RMN ¹H/¹⁹F des deux esters (ou amides) diastéréomères de l'acide MTPA ; signe des Δδ(S−R) | (R)- et (S)-MTPA-Cl, pyridine ou DMAP, CDCl₃
Helferich | Glycosylation à partir d'un acétate de glycosyle (ou d'un halogénure avec sels de mercure) | Acétate anomérique + phénol ou alcool, ZnCl₂, TsOH ou BF₃·OEt₂ ; ou Hg(CN)₂/HgBr₂ sur le bromure
trichloroacétimidates de Schmidt | Hémiacétal → trichloroacétimidate de glycosyle (donneur) → glycoside | Cl₃CCN, DBU ou K₂CO₃ ; puis TMSOTf ou BF₃·OEt₂ cat., CH₂Cl₂, −78 → 0 °C, tamis moléculaire
thioglycosides | Donneurs stables (S-éthyle, S-phényle, S-tolyle), activés par un thiophile ; base des stratégies armé/désarmé et orthogonales | NIS/TfOH ou NIS/AgOTf ; DMTST ; MeOTf ; Ph₂SO/Tf₂O
sulfoxydes de Kahne | Sulfoxyde de glycosyle activé à basse température : glycosylation d'accepteurs peu réactifs | Tf₂O, 2,6-di-tert-butyl-4-méthylpyridine (DTBMP), CH₂Cl₂, −78 °C
fluorures de glycosyle de Mukaiyama | Fluorure de glycosyle (stable) activé par un acide de Lewis fluorophile | SnCl₂/AgClO₄ (Mukaiyama) ; Cp₂ZrCl₂ ou Cp₂HfCl₂/AgClO₄ (Suzuki) ; BF₃·OEt₂
n-penténylglycosides de Fraser-Reid | Glycoside de pent-4-ényle activé par un halonium (cyclisation en tétrahydrofurane, départ de l'aglycone) ; origine du concept armé/désarmé | NIS/TESOTf, ou IDCP (perchlorate d'iodonium dicollidine)
β-mannosylation de Crich | Sulfoxyde (ou thioglycoside) de mannosyle 4,6-O-benzylidène → α-triflate covalent → déplacement de type SN2 → β-mannoside (liaison 1,2-cis difficile) | Tf₂O, DTBMP, CH₂Cl₂, −78 °C, puis accepteur
assemblage par glycals de Danishefsky | Glycal → 1,2-anhydrosucre (époxydation) → ouverture par un accepteur (lui-même glycal) → oligosaccharide par itération ; aussi iodoglycosylation et sulfonamidoglycosylation | DMDO, CH₂Cl₂, 0 °C ; puis ZnCl₂, THF, accepteur
Vorbrüggen et Hilbert–Johnson (nucléosides) | Nucléobase silylée + sucre peracylé → nucléoside β (participation de l'ester en C2′). Hilbert–Johnson : 2,4-dialcoxypyrimidine + halogénure de glycosyle | BSA ou HMDS (silylation) ; TMSOTf ou SnCl₄, MeCN ou dichloroéthane
Ruff | Aldose → aldose avec un carbone de moins | Br₂/H₂O (acide aldonique, sel de calcium) ; H₂O₂, Fe₂(SO₄)₃ ou Fe(OAc)₃
Maillard | Sucre réducteur + amine (acide aminé) → glycosylamine → Amadori → composés d'arôme et mélanoïdines (brunissement non enzymatique) | Chauffage (> 120 °C), milieu faiblement basique, faible teneur en eau
formation d'osazones | Aldose ou cétose + 3 phénylhydrazine → osazone cristalline (C1 et C2 engagés : glucose, mannose et fructose donnent la même osazone) | PhNHNH₂ en excès, AcOH, 100 °C
mutarotation | Évolution du pouvoir rotatoire d'un sucre en solution : équilibre entre anomères α et β via la forme ouverte (glucose : +112° et +19° → +52,7°) | Eau ; catalyse acide ou basique (2-hydroxypyridine, catalyse bifonctionnelle)
méthode aux phosphoramidites de Caruthers | Synthèse automatisée d'ADN sur support (3′ → 5′), cycle : détritylation, couplage, capping, oxydation | Acide trichloroacétique 3 % ; phosphoramidite + tétrazole ; Ac₂O/N-méthylimidazole ; I₂/H₂O/pyridine ; fin : NH₃ aqueux à 55 °C
Gabriel–malonate | Phtalimidomalonate de diéthyle + RX → acide α-aminé racémique après hydrolyse et décarboxylation ; variante acétamidomalonate | NaOEt, RX ; puis HCl aqueux à reflux
Akabori | Acide α-aminé (ou ester) → α-aminoaldéhyde par réduction ; ou acide aminé + aldéhyde → aminoalcool avec décarboxylation | Na/Hg, EtOH, HCl dilué ; ou chauffage avec l'aldéhyde
hydrogénation asymétrique de déshydroaminoacides | (Z)-α-Acétamidoacrylate ou cinnamate → acide aminé N-acétylé énantioenrichi (procédé L-DOPA de Knowles) | [Rh(cod)(diphosphine)]⁺ (DIPAMP, DuPhos, BINAP, ChiraPhos), H₂ (1–5 bar), MeOH
synthèse sur support de Merrifield (stratégies Boc/Bn et Fmoc/tBu) | Peptide assemblé de C vers N sur résine insoluble : déprotection de Nα, lavage, couplage, lavage ; clivage final | Boc/Bn : TFA à chaque cycle, HF anhydre final. Fmoc/tBu : pipéridine 20 %/DMF à chaque cycle, TFA 95 % final ; couplage HBTU, HATU ou DIC/Oxyma
Bergmann–Zervas | Introduction du groupe benzyloxycarbonyle (Cbz, Z) pour la synthèse peptidique sans racémisation | CbzCl, NaOH ou NaHCO₃ aqueux, 0 °C ; retrait H₂, Pd/C ou HBr/AcOH
méthode à l'azoture de Curtius | Couplage peptidique par un azoture d'acyle : ester → hydrazide → azoture d'acyle → amide ; très peu de racémisation (couplage de fragments) | N₂H₄ ; NaNO₂/HCl ou tBuONO à −20 °C ; puis amine, base, 0–4 °C
N-carboxyanhydrides de Leuchs | Acide aminé → N-carboxyanhydride (NCA) → polypeptide par polymérisation avec ouverture de cycle et perte de CO₂ | Phosgène ou triphosgène (méthode de Fuchs–Farthing) ; amorceur amine primaire
ligation chimique native de Kent | Peptide thioester C-terminal + peptide à cystéine N-terminale → thioester intermédiaire → transfert d'acyle S → N → liaison amide native ; peptides non protégés | Tampon aqueux pH 7, guanidine 6 M, thiol catalyseur (MPAA, thiophénol), TCEP, t.a.
ligation de Staudinger (Bertozzi) | Azoture + triarylphosphine portant un ester en ortho → aza-ylure → piégeage intramoléculaire → amide ; réaction bioorthogonale | Milieu aqueux, t.a., sans catalyseur ; version « sans trace » : phosphinothioester (Raines)
ligation KAHA de Bode | α-Cétoacide + hydroxylamine → amide (+ CO₂ + H₂O), sans réactif de couplage, peptides non protégés | DMSO/H₂O ou DMF acide, 40–60 °C ; hydroxylamine cyclique 5-oxaproline
Edman | Séquençage par l'extrémité N-terminale : dérivé phénylthiocarbamoyle → clivage du premier résidu en anilinothiazolinone → phénylthiohydantoïne identifiée ; cycle répété | PhNCS, pH 9 ; TFA anhydre ; acide aqueux ; HPLC
Sanger | Marquage du résidu N-terminal : dinitrophényl-acide aminé jaune identifié après hydrolyse totale (SNAr sur le réactif de Sanger) | 1-Fluoro-2,4-dinitrobenzène, NaHCO₃ ; puis HCl 6 M à 110 °C
Bergmann | Dégradation de Bergmann : raccourcissement d'un peptide par l'extrémité C-terminale (azoture d'acyle → Curtius → carbamate → aldéhyde + peptide amide) | Benzoylation, N₂H₄, HNO₂, BnOH à chaud, H₂/Pd, hydrolyse
dégradation de Strecker | Acide α-aminé + α-dicarbonyle (ou ninhydrine) → aldéhyde avec un carbone de moins + CO₂ + aminocétone (arômes de Maillard) | Chauffage ; ninhydrine, alloxane ou dicarbonyles de Maillard
ninhydrine | Acide α-aminé → pourpre de Ruhemann (violet, 570 nm) ; proline → jaune ; révélation et dosage des amines primaires (test de Kaiser en synthèse sur support) | Ninhydrine 0,2 % dans EtOH ou BuOH, chauffage à 100 °C
cycloaddition promue par la tension de cycle (SPAAC) | Azoture + cyclooctyne → triazole sans cuivre (bioorthogonale, cellules vivantes) | DBCO (DIBAC), BCN, DIFO ; eau ou tampon, t.a., sans catalyseur
ligation tétrazine– alcène tendu | Tétrazine + trans-cyclooctène (ou norbornène, cyclopropène) → dihydropyridazine + N₂ ; constante de vitesse jusqu'à 10⁶ M⁻¹ s⁻¹ | Milieu aqueux, t.a., sans catalyseur
thiol-ène | Thiol + alcène → thioéther anti-Markovnikov par chaîne radicalaire ; réaction click pour polymères et bioconjugaison | Photoamorceur (DMPA, LAP), hν 365 nm, ou AIBN ; sans métal, tolère l'eau
thiol–maléimide | Thiol (cystéine) + maléimide → thiosuccinimide (addition de Michael) ; conjugués anticorps–médicament ; réversible par rétro-Michael | Tampon pH 6,5–7,5, t.a.
ligation oxime et hydrazone | Aldéhyde ou cétone + alcoxyamine → oxime (stable) ; + hydrazide → acylhydrazone (réversible en milieu acide) | Tampon pH 4–7, catalyse nucléophile par l'aniline ou la p-phénylènediamine
Fehling | Aldéhydes aliphatiques et sucres réducteurs → précipité rouge brique de Cu₂O (les cétones simples et aldéhydes aromatiques ne réagissent pas) | Cu²⁺ complexé par le tartrate (sel de Seignette), NaOH, chauffage
Benedict | Sucres réducteurs → précipité vert à rouge brique de Cu₂O (semi-quantitatif) | Cu²⁺ complexé par le citrate, Na₂CO₃, chauffage
Baeyer | Insaturation C=C ou C≡C : décoloration du permanganate violet et précipité brun de MnO₂ | KMnO₄ aqueux dilué, froid, neutre ou basique
Lucas | Classe d'un alcool : trouble immédiat (tertiaire), en 5–10 min (secondaire), nul à froid (primaire) | ZnCl₂ dans HCl concentré
iodoforme | Méthylcétones, éthanal, éthanol et alcools CH₃CH(OH)R → précipité jaune de CHI₃ | I₂ + NaOH (ou KI + NaOCl), tiède
2,4-DNPH (Brady) | Aldéhydes et cétones → précipité jaune (non conjugué) à rouge (conjugué) de 2,4-dinitrophénylhydrazone, point de fusion caractéristique | 2,4-Dinitrophénylhydrazine dans H₂SO₄/EtOH ou H₃PO₄
Schiff | Aldéhydes → coloration magenta-violette (les cétones ne réagissent pas) | Fuchsine décolorée par SO₂ ou NaHSO₃
biuret | Liaisons peptidiques (au moins deux) → complexe violet du Cu(II) ; dosage des protéines | CuSO₄ dilué, NaOH
Molisch | Tous les glucides → anneau violet à l'interface (furfural + α-naphtol) | α-Naphtol dans EtOH, puis H₂SO₄ concentré coulé le long du tube
Seliwanoff | Cétoses → rouge cerise rapide ; aldoses → rose pâle lent | Résorcinol, HCl concentré, chauffage
Barfoed | Monosaccharides réducteurs → Cu₂O rouge en 1–2 min ; disaccharides beaucoup plus lents | Acétate de cuivre(II) en milieu acide acétique, chauffage
FeCl₃ (phénols) | Phénols et énols → complexe coloré violet, bleu ou vert | FeCl₃ aqueux ou alcoolique à 1 %, neutre
eau de brome | Alcènes et alcynes : décoloration sans dégagement ; phénols et anilines : décoloration + précipité blanc (tribromo) ; aldoses → acides aldoniques | Br₂ dans H₂O (ou dans CH₂Cl₂)
Beilstein | Halogène organique (Cl, Br, I) → flamme verte (halogénure de cuivre volatil) | Fil de cuivre oxydé trempé dans l'échantillon, porté dans la flamme
Lassaigne | Recherche de N, S, halogènes : fusion au sodium → NaCN, Na₂S, NaX, révélés par bleu de Prusse, nitroprussiate (violet), AgNO₃ | Na métallique à chaud ; puis FeSO₄/H⁺, Na₂[Fe(CN)₅NO], AgNO₃/HNO₃
carbylamine | Amines primaires → isonitrile à odeur repoussante | CHCl₃ + KOH alcoolique, chauffage
Monsanto | Procédé de l'acide acétique : carbonylation du méthanol au rhodium | [Rh(CO)₂I₂]⁻, HI, 150–200 °C, 30–60 bar
Cativa | Procédé de l'acide acétique : carbonylation du méthanol à l'iridium (plus rapide, moins d'eau) | [Ir(CO)₂I₂]⁻, promoteur Ru, MeI, 190 °C, 28 bar
oxo | Hydroformylation industrielle : alcène + CO + H₂ → aldéhydes (puis alcools, ex. butanal → 2-éthylhexanol) | HCo(CO)₄ (150 °C, 200–300 bar) ; HRh(CO)(PPh₃)₃ (100 °C, 20 bar) ; biphasique Rh/TPPTS (Ruhrchemie–Rhône-Poulenc)
cumène (Hock) | Benzène + propène → cumène → hydroperoxyde → phénol + acétone | H₃PO₄ ou zéolithe ; O₂, 100 °C ; H₂SO₄ dilué, 60 °C
Raschig | Procédé de Raschig : benzène → chlorobenzène (HCl + O₂, oxychloration) → phénol par hydrolyse ; aussi hydrazine (NH₃ + NaOCl) et hydroxylamine | Cu/Fe sur alumine, 250 °C ; vapeur d'eau, Ca₃(PO₄)₂ ou SiO₂, 450 °C
Dow | Procédé Dow du phénol : chlorobenzène + NaOH (via le benzyne) ; aussi oxydation de l'acide benzoïque (Cu) | NaOH aqueux, 350 °C, 300 bar
Reppe | Chimie de l'acétylène sous pression : vinylation, éthynylation (butynediol), carbonylation (acide acrylique), cyclooligomérisation (cyclooctatétraène) | Acétylures de cuivre, Ni(CO)₄, Ni(CN)₂, bases
Ziegler | Aufbau : AlEt₃ + éthylène → trialkylaluminium à longue chaîne → alcools gras linéaires (oxydation, hydrolyse) ou α-oléfines ; polyéthylène basse pression | AlEt₃, éthylène, 100–120 °C, 100 bar ; TiCl₄/AlEt₃ pour la polymérisation
Andrussow | CH₄ + NH₃ + O₂ → HCN + H₂O | Toile Pt/Rh, 1 000–1 200 °C
Bosch–Meiser (urée) | 2 NH₃ + CO₂ → carbamate d'ammonium → urée + H₂O | 180–200 °C, 150–250 bar
Wöhler | Cyanate d'ammonium → urée (1828 ; première synthèse d'un composé organique à partir de sels minéraux) | Chauffage d'une solution aqueuse de NH₄OCN (KOCN + (NH₄)₂SO₄)
Formox | Méthanol + O₂ → formaldéhyde | Oxyde mixte Fe–Mo, 250–400 °C, excès d'air
Lebedev | Éthanol → buta-1,3-diène (déshydrogénation, aldol, déshydratation) | ZnO/Al₂O₃ ou MgO/SiO₂, 400–450 °C
Guerbet | 2 alcools primaires → alcool β-ramifié de masse double + H₂O (déshydrogénation, aldol–crotonisation, hydrogénation) | Base (KOH, alcoolate) + catalyseur de (dés)hydrogénation (Ni, Cu, Ir), 200–260 °C
Henkel | Réarrangement ou dismutation des benzoates et phtalates alcalins → téréphtalate (Raecke) | Sels de potassium, catalyseur Cd ou Zn, CO₂ sous pression, 350–430 °C
Reed | Sulfochloration des alcanes : RH + SO₂ + Cl₂ → RSO₂Cl (tensioactifs) | hν, 20–40 °C
Twitchell | Hydrolyse des corps gras en acides gras et glycérol | Acides sulfoniques aromatiques lipophiles (réactif de Twitchell) + H₂SO₄, vapeur, 100 °C
Simons | Fluoration électrochimique : composé organique → dérivé perfluoré | Électrolyse dans HF anhydre, anodes de nickel, 5–6 V
Fowler | Perfluoration des hydrocarbures en phase vapeur | CoF₃ (régénéré par F₂), 150–400 °C
craquage et reformage catalytiques | Craquage : coupes lourdes → essences et alcènes légers (carbocations, coupure β). Reformage : naphta → aromatiques et isoparaffines + H₂ | Zéolithes Y acides, 500 °C (FCC) ; Pt–Re/Al₂O₃ chlorée, 500 °C, 10–30 bar
`;
