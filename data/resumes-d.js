// Résumés d'une ligne des réactions de l'index — partie D (couplages, métathèse, activation C–H, cycles catalytiques).
// Format : nom tel que cité | ce que fait la réaction (départ → produit) | réactifs et conditions typiques
// Rédigés de mémoire : repères de révision à vérifier, pas des protocoles.
export default `
Kumada–Corriu | Halogénure d'aryle ou de vinyle + réactif de Grignard → C–C (peu de tolérance fonctionnelle) | NiCl₂(dppp) ou Pd(PPh₃)₄, THF ou éther, 0 °C → reflux
Hiyama | Halogénure d'aryle ou de vinyle + organosilane activé par un fluorure → C–C | Pd⁰, TBAF ou TASF, THF, 60 °C ; silanes ArSi(OR)₃, ArSiF₃
Hiyama–Denmark | Couplage de silanols ou silanolates sans fluorure (compatible avec les éthers silylés) | Pd(dba)₂ ou [allylPdCl]₂, base de Brønsted (KOSiMe₃, Cs₂CO₃, NaOtBu)
Murahashi (organolithiens) | Halogénure d'aryle ou de vinyle + organolithien → C–C (remis au goût du jour par Feringa) | Pd(PtBu₃)₂ ou Pd-PEPPSI, toluène, t.a., addition lente de RLi
Liebeskind–Srogl | Thioester + acide boronique → cétone, en milieu neutre | Pd₂(dba)₃, tri(2-furyl)phosphine, CuTC (stœchiométrique), THF, 50 °C
Catellani | Iodure d'aryle → fonctionnalisation en ortho (C–H) et en ipso en un pot, grâce au norbornène comme médiateur transitoire | Pd(OAc)₂, norbornène, phosphine, Cs₂CO₃, halogénure d'alkyle + partenaire terminal (alcène, acide boronique)
Barluenga | Tosylhydrazone + halogénure d'aryle → alcène substitué (carbène de palladium, insertion migratoire) | Pd₂(dba)₃, XPhos, LiOtBu, dioxane, 110 °C
cyanation | Halogénure d'aryle → nitrile aromatique | Pd⁰ ou Ni⁰, Zn(CN)₂ ou K₄[Fe(CN)₆] ; CuCN à chaud (Rosenmund–von Braun)
couplages décarboxylants (Gooßen) | Acide benzoïque (carboxylate) + halogénure d'aryle → biaryle avec perte de CO₂ | Pd/Cu bimétallique (PdBr₂, CuI/phénanthroline), NMP/quinoléine, 160 °C
couplages réducteurs entre électrophiles (Weix) | Halogénure d'aryle + halogénure d'alkyle → C(sp²)–C(sp³), sans organométallique préformé | NiI₂ ou NiBr₂·glyme, bipyridine, Zn ou Mn (réducteur), DMPU ou DMA
alcoxycarbonylation | ArX (ou vinyl-X, alcène) + CO + alcool → ester | Pd(OAc)₂, dppp ou Xantphos, CO (1–10 bar), Et₃N, ROH, 80–100 °C
aminocarbonylation | ArX + CO + amine → amide | Pd(OAc)₂/Xantphos, CO (1 atm) ou Mo(CO)₆, base, 80–100 °C
Suzuki et Stille carbonylants | ArX + CO + organoborane ou organostannane → cétone (Ar–CO–R) | Pd⁰, CO (1–10 bar), conditions de Suzuki ou de Stille
formylation réductrice | ArX + CO + source d'hydrure → aldéhyde aromatique | Pd(OAc)₂, ligand (cataCXium A), CO/H₂ ou CO + Bu₃SnH ou silane, base
Castro–Stephens | Acétylure de cuivre(I) + iodure d'aryle → arylalcyne (ortho-nucléophile → hétérocycle : benzofurane, indole) | ArC≡CCu préformé, pyridine à reflux
Cadiot–Chodkiewicz | Alcyne terminal + bromoalcyne → 1,3-diyne dissymétrique | CuCl ou CuBr cat., amine (EtNH₂, n-BuNH₂), NH₂OH·HCl, MeOH/H₂O
Glaser | 2 alcynes terminaux → 1,3-diyne symétrique (couplage oxydant) | CuCl, NH₃ ou NH₄OH, EtOH, O₂
Eglinton | 2 alcynes terminaux → 1,3-diyne, avec du cuivre(II) stœchiométrique (macrocycles) | Cu(OAc)₂, pyridine (ou pyridine/MeOH), à chaud
Hay | 2 alcynes terminaux → 1,3-diyne, cuivre catalytique en milieu homogène | CuCl·TMEDA cat., O₂ (air), acétone ou CH₂Cl₂
couplages au fer (Kochi, Fürstner) | Réactif de Grignard alkyle + halogénure (ou tosylate, chlorure) d'aryle ou de vinyle → C–C, très rapide | Fe(acac)₃ ou FeCl₃ (1–5 mol %), THF/NMP, 0 °C → t.a.
Kharasch | Couplage de Grignard catalysé par des sels de métaux (Co, Fe, Cu) : homocouplage et couplage avec halogénures vinyliques | CoCl₂ ou FeCl₃ catalytique
Hurtley | Acide ortho-bromobenzoïque + composé à méthylène actif (malonate, β-dicétone) → C-arylation | Cu ou CuBr, NaOEt ou NaH
nickel/photorédox (MacMillan, Doyle, Molander) | Radical alkyle (de carboxylate, trifluoroborate, silicate, C–H) + halogénure d'aryle → C(sp³)–C(sp²) par double catalyse | NiCl₂·glyme/dtbbpy + photocatalyseur Ir ou organique (4CzIPN), LED bleues, base, t.a.
couplages décarboxylants d'esters rédox-actifs (Baran) | Acide alkyle → ester de N-hydroxyphtalimide → couplage avec organozincique, boronique ou Grignard (C–C sp³) | NHPI/DIC ; NiCl₂·glyme ou Fe(acac)₃ + ligand, ArZnCl ou ArB(OH)₂
Ullmann–Goldberg | ArX + amine, amide ou azole → N-arylation au cuivre | CuI (5–10 mol %), diamine (DMEDA), L-proline ou phénanthroline, K₂CO₃ ou K₃PO₄, DMSO ou dioxane, 80–110 °C
Chan–Evans–Lam | Acide arylboronique + amine, amide, azole ou phénol → N- ou O-arylation oxydante à t.a. | Cu(OAc)₂, pyridine ou Et₃N, CH₂Cl₂, air, tamis moléculaire
Jourdan–Ullmann | Acide ortho-halogénobenzoïque + aniline → acide N-arylanthranilique (précurseur d'acridones) | Cu ou CuO, K₂CO₃, à chaud
éthérification de Buchwald–Hartwig | ArX + alcool ou phénol → éther d'aryle | Pd(OAc)₂ ou Pd₂(dba)₃, biarylphosphine encombrée (tBuXPhos, RockPhos), Cs₂CO₃ ou K₃PO₄, toluène, 80–100 °C
condensation d'Ullmann | ArX + phénol → éther de diaryle | Cu ou CuI, ligand (N,N-diméthylglycine, TMHD), Cs₂CO₃, dioxane ou DMF, 90–200 °C
Chan–Lam | Acide arylboronique + nucléophile N–H, O–H ou S–H → C–hétéroatome, à l'air et à t.a. | Cu(OAc)₂, pyridine, CH₂Cl₂, air
thioéthérification de Migita | ArX + thiol → thioéther d'aryle | Pd(PPh₃)₄ ou Pd/Xantphos, JosiPhos, base (NaOtBu, iPr₂NEt), toluène ou dioxane à reflux
borylation de Miyaura | ArX ou vinyl-X + B₂pin₂ → ester boronique de pinacol | PdCl₂(dppf), KOAc, dioxane ou DMSO, 80 °C
borylation C–H de Hartwig–Miyaura (iridium) | Arène ou hétéroarène → ester arylboronique, régiosélectivité stérique (position la moins encombrée) | [Ir(cod)OMe]₂, dtbpy, B₂pin₂ ou HBpin, hexane ou THF, 25–80 °C
silylation C–H de Hartwig | Arène → arylsilane (sélectivité stérique) ; version dirigée par un hydroxyle → 1,3-diols après Tamao | [Ir(cod)OMe]₂ ou [Rh(coe)₂OH]₂, ligand, HSiMe(OTMS)₂ ou Et₂SiH₂, accepteur d'hydrogène
Hirao (C–P) | ArX ou vinyl-X + dialkylphosphite → arylphosphonate | Pd(PPh₃)₄ ou Pd(OAc)₂/dppf, Et₃N, toluène ou MeCN à reflux
Fujiwara–Moritani | Arène + alcène → alcène arylé (Heck oxydante par activation C–H) | Pd(OAc)₂, oxydant (Cu(OAc)₂, AgOAc, benzoquinone, O₂), AcOH, à chaud
Murai | Cétone aromatique + alcène → ortho-alkylation (hydroarylation dirigée par le carbonyle) | RuH₂(CO)(PPh₃)₃, toluène, 135 °C
fonctionnalisations dirigées (Daugulis, Yu, Sanford) | C–H sp² ou sp³ → C–C, C–O, C–X, C–N grâce à un groupe directeur (pyridine, 8-aminoquinoléine, amide, acide) formant un palladacycle | Pd(OAc)₂ ; oxydant PhI(OAc)₂, NXS, Ag⁺ ou ArI ; ligands acides aminés mono-protégés (Yu)
arylation directe par métallation–déprotonation concertée (Fagnou) | (Hétéro)arène C–H + ArX → biaryle sans organométallique ; le carboxylate arrache le proton pendant la palladation | Pd(OAc)₂, PCy₃ ou DavePhos, K₂CO₃, acide pivalique (30 mol %), DMA, 100–120 °C
insertion C–H de carbénoïdes de rhodium (Davies, Doyle) | Diazoester + C–H → C–C (intramoléculaire 1,5 → cycles à cinq ; intermoléculaire avec carbènes donneur–accepteur) | Rh₂(OAc)₄ ; Rh₂(S-DOSP)₄ (Davies) ; carboxamidates Rh₂(MEPY)₄ (Doyle)
amination par nitrénoïdes (Du Bois) | Carbamate ou sulfamate → amination C–H intramoléculaire (oxazolidinone, oxathiazinane), stéréospécifique | Rh₂(esp)₂ ou Rh₂(OAc)₄, PhI(OAc)₂, MgO, CH₂Cl₂ ou benzène, 40 °C
oxydation allylique de White | Alcène terminal → acétate allylique, ou macrolactone par oxydation C–H intramoléculaire | Pd(OAc)₂/1,2-bis(phénylsulfinyl)éthane, benzoquinone, AcOH ou acide carboxylique
par ouverture de cycle (ROM) et polymérisante (ROMP) | Cycloalcène tendu (norbornène, cyclooctène) → diène (ROM, avec alcène partenaire) ou polymère insaturé (ROMP) ; moteur : tension de cycle | Catalyseurs de Grubbs I, II, III ou de Schrock, CH₂Cl₂ ou toluène, t.a.
métathèse ène-yne | Alcène + alcyne → 1,3-diène (pas de perte d'éthylène ; économie d'atomes) ; intra : cycle portant un vinyle | Grubbs I ou II, CH₂Cl₂, sous éthylène (conditions de Mori) ; ou PtCl₂, Au(I) (cycloisomérisation)
métathèse d'alcynes (Schrock, Fürstner) | 2 alcynes internes → redistribution des carbynes ; cyclisante (RCAM) → cycloalcyne puis alcène Z (Lindlar) ou E | Alkylidyne de Schrock (tBuO)₃W≡CtBu ; Mo(CO)₆/phénol (Mortreux) ; alkylidynes de Mo à silanolates (Fürstner)
ADMET | Diène α,ω acyclique → polymère insaturé + éthylène (polycondensation par métathèse) | Grubbs ou Schrock, sous vide pour chasser l'éthylène
métathèse Z-sélective (Hoveyda, Grubbs) | Métathèse croisée ou cyclisante donnant l'alcène Z (cinétique) | Mo ou W mono-aryloxyde pyrrolure (MAP, Hoveyda–Schrock) ; Ru cyclométallé (Grubbs) ou Ru-dithiolate
métathèse carbonyle–oléfine (Schindler) | Cétone + alcène → nouvel alcène cyclique + cétone (via un oxétane, [2+2] puis rétro-[2+2]) | FeCl₃ (5–10 mol %), dichloroéthane, t.a.
cyclotrimérisation [2+2+2] (Reppe, Vollhardt) | 3 alcynes → benzène substitué ; 2 alcynes + nitrile → pyridine | CpCo(CO)₂ (Vollhardt, hν ou Δ), Ni⁰ (Reppe), RhCl(PPh₃)₃, Cp*RuCl(cod)
benzannulation de Dötz | Carbène de Fischer du chrome (aryl ou vinyl alcoxycarbène) + alcyne + CO → hydroquinone (naphtol) substituée | (CO)₅Cr=C(OMe)Ar + alcyne, THF ou éther, 45–60 °C ; puis oxydation (CAN) éventuelle
[5+2] de Wender | Vinylcyclopropane + alcyne (ou alcène, allène) → cycloheptadiène | [Rh(CO)₂Cl]₂ ou RhCl(PPh₃)₃/AgOTf, toluène ou DCE, 80–110 °C
[3+2] au triméthylèneméthane de Trost | Précurseur de TMM + alcène pauvre en électrons → méthylènecyclopentane | Acétate de 2-[(triméthylsilyl)méthyl]allyle, Pd(OAc)₂/P(OiPr)₃ ou Pd(PPh₃)₄, THF à reflux
cycloisomérisations ène-yne (Trost ; or et platine) | 1,6-Ényne → 1,3- ou 1,4-diène cyclique (type Alder-ène) ou réarrangement de squelette via carbène cyclopropylique | Pd(OAc)₂/PPh₃ ou Pd₂(dba)₃/AcOH (Trost) ; PtCl₂ ; Au(I) cationique (Ph₃PAuCl/AgSbF₆)
Rautenstrauch | Acétate de 1-éthynyl-2-propényle (1-ène-4-yne-3-ol estérifié) → cyclopenténone, par migration 1,2 de l'acyloxy | PdCl₂(MeCN)₂ ou Au(I), MeCN, t.a. → 60 °C
Larock | ortho-Iodoaniline + alcyne interne → indole 2,3-disubstitué (hétéroannélation) ; le plus gros substituant en position 2 | Pd(OAc)₂, K₂CO₃ ou Na₂CO₃, LiCl (1 éq.), DMF, 100 °C
Hegedus | ortho-Allylaniline → 2-méthylindole par aminopalladation intramoléculaire (type Wacker) | PdCl₂(MeCN)₂ stœchiométrique + Et₃N ; ou catalytique avec benzoquinone
zirconacycles de Negishi | Diyne, ényne ou diène + « Cp₂Zr » → zirconacyclopentadiène ou -pentène → carbocycles et hétérocycles après piégeage (H⁺, I₂, CO, S₂Cl₂) | Cp₂ZrCl₂ + 2 n-BuLi, THF, −78 °C → t.a.
alkylation allylique asymétrique de Trost | Acétate ou carbonate allylique + nucléophile mou (malonate, phénol, amine) → produit énantioenrichi via un π-allyl-palladium | [Pd(allyl)Cl]₂ ou Pd₂(dba)₃, ligand de Trost (DACH-phényle ou naphtyle), base, CH₂Cl₂ ou THF
iridium (Hartwig, Helmchen, Carreira) | Substitution allylique à l'iridium : produit ramifié énantioenrichi à partir de substrats allyliques linéaires (C–C, C–N, C–O) | [Ir(cod)Cl]₂, phosphoramidite (Feringa, Alexakis), base ; Carreira : alcools allyliques ramifiés + ligand P,oléfine, acide
molybdène | Substitution allylique au molybdène : régiosélectivité pour le produit ramifié avec les substrats 3-aryl-allyliques (complémentaire du Pd) | Mo(CO)₆ ou Mo(CO)₃(EtCN)₃, ligand bis-picolinamide (Trost), malonate
cuivre (SN2′) | Substitution allylique au cuivre par nucléophiles durs (Grignard, zinciques, aluminiques) : attaque en γ, anti, création de centres tertiaires et quaternaires | CuBr·SMe₂ ou CuTC (1–5 mol %), phosphoramidite ou NHC chiral, CH₂Cl₂, −78 °C
hydroboration catalysée | Alcène + catécholborane ou pinacolborane → alkylboronate ; chimio-, régio- (ramifié pour les styrènes) et énantiosélectivité différentes de la voie non catalysée | RhCl(PPh₃)₃ ou [Rh(cod)₂]BF₄/BINAP, HBcat ; Ir, Cu (CuCl/B₂pin₂), Co, Fe
addition de Kharasch (transfert d'atome) | Polyhalogénoalcane (CCl₄, BrCCl₃) + alcène → adduit 1:1 (ATRA) ; version intramoléculaire (ATRC) et polymérisante (ATRP) | Peroxyde, ou RuCl₂(PPh₃)₃, CuCl/bipyridine ; photoredox
couplage A³ | Aldéhyde + alcyne terminal + amine → propargylamine (trois composants) | CuBr, CuI ou AuBr₃ cat., toluène ou H₂O, 25–100 °C ; version asymétrique Cu/QUINAP ou PyBox
Meyer–Schuster catalysée | Alcool propargylique → énone ou énal (transposition 1,3 formelle de l'hydroxyle) en conditions douces | Au(I) ou Au(III), Ru, Re (ReOCl₃), V ou Mo-oxo, toluène, t.a. → 80 °C
couplages hydrogénants de Krische | Alcène, alcyne, diène ou allène + carbonyle ou imine + H₂ (ou alcool donneur) → produit d'addition C–C sans organométallique stœchiométrique | Rh, Ir ou Ru cationique + phosphine chirale, H₂ (1 atm) ou iPrOH
Tsuji–Wilkinson | Aldéhyde → alcane (décarbonylation, rétention de configuration) | RhCl(PPh₃)₃ (1 éq.), toluène ou xylène à reflux ; catalytique avec dppp à 150 °C
Stryker | Réduction conjuguée d'énones par l'hydrure de cuivre | [(Ph₃P)CuH]₆, benzène ; ou catalytique + H₂ ou silane
réactions de carbènes de Fischer | Carbènes électrophiles (CO)₅M=C(OR)R′ (Cr, W) : benzannulation de Dötz, cyclopropanation, aminolyse, aldol en α, photolyse → cétènes (β-lactames de Hegedus) | Cr(CO)₆ + RLi puis Me₃O⁺BF₄⁻
réaction de Kinugasa | Alcyne terminal (acétylure de cuivre) + nitrone → β-lactame cis | CuI ou CuCl, base (Et₃N, pyridine), MeCN, t.a. ; version asymétrique avec bisoxazolines
Association et dissociation de ligand | Le métal gagne ou perd un ligand L (2 électrons) sans changer d'état d'oxydation ; crée le site vacant nécessaire aux autres étapes | Exemple : Pd(PPh₃)₄ ⇌ Pd(PPh₃)₂ + 2 PPh₃ ; mécanisme associatif (16 e⁻) ou dissociatif (18 e⁻)
addition oxydante | M(n) + A–B → A–M(n+2)–B : le métal s'insère dans une liaison ; degré d'oxydation et coordinence +2 | Favorisée par un métal riche en électrons et des ligands donneurs ; I > OTf ≈ Br ≫ Cl ; concertée (cis), SN2 ou radicalaire
élimination réductrice | A–M(n+2)–B → M(n) + A–B : formation de la liaison et libération du produit ; inverse de l'addition oxydante | Exige A et B en cis ; favorisée par ligands encombrés et métal pauvre en électrons
transmétallation | Transfert d'un groupe organique d'un métal (B, Sn, Zn, Mg, Si, Cu) vers le métal de transition : R–M′ + LnPd(Ar)X → LnPd(Ar)R + M′X | Suzuki : base requise (boronate ou Pd–OH) ; Stille : accélérée par CuI, LiCl ; Hiyama : fluorure
insertion migratoire 1,1 (CO) et 1,2 (alcène) | Un ligand anionique (R, H) migre sur un ligand insaturé voisin en cis : CO → acyle (1,1) ; alcène → alkyle (1,2, addition syn) | Libère un site de coordination ; étape clé de Heck, hydroformylation, polymérisation, carbonylation
β-élimination d'hydrure | M–C–C–H → M–H + alcène ; exige un site vacant en cis et un H en β syn-coplanaire | Termine la réaction de Heck ; réaction parasite des alkyl-métaux (évitée sans H en β ou avec ligands chélatants)
β-élimination de carbone | M–C–C–C → M–C + alcène (inverse de la carbométallation) ; favorisée par la relâche de tension (cyclopropyl, cyclobutyl) | Ouverture de cyclobutanols au Pd, étape de terminaison en polymérisation
carbopalladation | Addition syn d'une liaison Pd–C sur un alcène ou alcyne (insertion migratoire) → nouvel alkyl- ou vinylpalladium | Étape clé de Heck et des cascades au palladium
nucléopalladation | Attaque d'un nucléophile (H₂O, ROH, amine, AcO⁻) sur un alcène coordiné au Pd(II) : anti (attaque externe) ou syn (insertion dans Pd–Nu) | Étape clé de Wacker, des aminopalladations et alcoxypalladations
formation de complexes π-allyle | Pd⁰ + substrat allylique (acétate, carbonate) → complexe η³-allyl-Pd(II) par ionisation avec inversion ; attaque du nucléophile mou avec inversion (rétention globale) | Tsuji–Trost ; aussi par activation C–H allylique au Pd(II)
métathèse de liaison σ | Échange concerté à quatre centres M–R + H–R′ → M–R′ + H–R, sans changement de degré d'oxydation | Métaux d⁰ (Sc, Zr, lanthanides) ; activation C–H, hydrogénolyse de M–C
métallation–déprotonation concertée | Rupture d'une liaison C–H par le métal assistée par une base coordinée (acétate, pivalate, carbonate) dans un état de transition à six centres | Mécanisme CMD (ou AMLA) des arylations directes au Pd, Ru, Rh
cyclométallation | Activation C–H intramoléculaire dirigée par un atome coordinant → métallacycle (à cinq chaînons de préférence) | Pd(OAc)₂ + 2-phénylpyridine → palladacycle ; base des fonctionnalisations C–H dirigées
cycloaddition [2+2] et cycloréversion (métallacyclobutane) | Carbène métallique + alcène ⇌ métallacyclobutane ⇌ nouveau carbène + nouvel alcène (mécanisme de Chauvin) | Catalyseurs de Grubbs (Ru) et de Schrock (Mo, W)
couplage oxydant | Deux ligands insaturés (alcènes, alcynes, CO₂) se lient sur un métal bas-valent → métallacycle, le métal s'oxydant de 2 | Zirconacycles, nickelacycles, Pauson–Khand, cyclotrimérisation [2+2+2]
transfert monoélectronique | Transfert d'un seul électron (SET) entre métal ou photocatalyseur et substrat → radical ; addition oxydante radicalaire des halogénures d'alkyle sur Ni, Cu, Fe | Ni(I)/Ni(III), Cu(I)/Cu(II), photoredox, SmI₂
transfert d'atome d'hydrogène | Transfert concerté de H• (HAT) : d'un hydrure métallique vers un alcène (MHAT) ou d'un C–H vers un radical (quinuclidinium, décatungstate, alcoxyle) | Co–H, Mn–H, Fe–H + silane ; photocatalyse HAT
Suzuki, Stille, Negishi, Kumada, Hiyama | Cycle commun Pd⁰/Pd(II) : addition oxydante de R–X, transmétallation (B, Sn, Zn, Mg, Si), élimination réductrice → R–R′ | Pd(PPh₃)₄ ou Pd(OAc)₂/ligand ; Suzuki : base ; Hiyama : fluorure ; Kumada : souvent Ni
hydrogénation de Wilkinson | Cycle Rh(I)/Rh(III) : dissociation de PPh₃, addition oxydante de H₂, coordination de l'alcène, insertion migratoire, élimination réductrice (addition syn) | RhCl(PPh₃)₃, H₂ (1 atm), benzène/EtOH, t.a. ; alcènes peu encombrés
hydrogénation de Noyori | Mécanisme bifonctionnel métal–ligand : transfert concerté de Ru–H et N–H vers C=O en sphère externe (état de transition à six centres) | RuCl₂(BINAP)(DPEN), tBuOK, iPrOH, H₂ ; transfert : RuCl(TsDPEN)(p-cymène), HCO₂H/Et₃N
Monsanto et Cativa | MeOH + HI → MeI ; addition oxydante de MeI sur [M(CO)₂I₂]⁻, insertion de CO (acyle), élimination réductrice de MeCOI, hydrolyse → AcOH | Rh (Monsanto, addition oxydante limitante) ; Ir + promoteur Ru (Cativa, insertion limitante)
dihydroxylation Upjohn et Sharpless | OsO₄ + alcène → ester osmate(VI) ([3+2]) ; hydrolyse → diol ; réoxydation en Os(VIII) par NMO (Upjohn) ou K₃Fe(CN)₆ (Sharpless, deux phases) | OsO₄ ou K₂OsO₂(OH)₄ cat. ; AD-mix-α ((DHQ)₂PHAL) ou AD-mix-β ((DHQD)₂PHAL), tBuOH/H₂O, 0 °C, MeSO₂NH₂
époxydation de Jacobsen | Mn(III)–salen oxydé en Mn(V)=O par NaOCl, transfert de l'oxygène à l'alcène cis (approche latérale), retour à Mn(III) | (salen)MnCl chiral (1–5 mol %), NaOCl tamponné pH 11, 4-phénylpyridine N-oxyde, CH₂Cl₂, 0 °C
Ley–Griffith, TEMPO | TPAP : Ru(VII) oxyde l'alcool, NMO réoxyde le Ru(V). TEMPO : l'oxoammonium oxyde l'alcool en donnant l'hydroxylamine, réoxydée par NaOCl, PhI(OAc)₂ ou Cu/O₂ | TPAP/NMO/tamis 4 Å ; TEMPO/NaOCl/KBr ou TEMPO/BAIB
réduction CBS | L'azote de l'oxazaborolidine fixe BH₃ (activé), le bore endocyclique coordine la cétone du côté du petit substituant ; transfert d'hydrure à six centres | (S)- ou (R)-Me-CBS (5–10 mol %), BH₃·THF ou BH₃·SMe₂, THF, −20 °C → t.a.
organocatalyse par énamine et iminium | Amine secondaire chirale + carbonyle → énamine (HOMO relevée, nucléophile en α : aldol, Mannich, α-fonctionnalisation) ou iminium d'énal (LUMO abaissée : Diels–Alder, Michael, Friedel–Crafts) | Proline, éthers silylés de diarylprolinol (Jørgensen–Hayashi), imidazolidinones de MacMillan + co-acide
acylation nucléophile (DMAP) | La DMAP attaque l'anhydride → N-acylpyridinium très électrophile, transféré à l'alcool ; la base auxiliaire régénère la DMAP | DMAP (1–10 mol %), Ac₂O ou anhydride, Et₃N ou pyridine, CH₂Cl₂
photorédox | Le photocatalyseur excité par la lumière visible échange un électron avec le substrat (piégeage oxydant ou réducteur), créant des radicaux, puis revient à son état initial par un second transfert | Ru(bpy)₃²⁺, Ir(ppy)₃, Ir[dF(CF₃)ppy]₂(dtbbpy)⁺, éosine Y, 4CzIPN ; LED bleues ou vertes
transfert de phase | Q⁺X⁻ échange son anion à l'interface, emmène le nucléophile (ou la base) en phase organique où il réagit sans solvatation, puis revient | Bu₄N⁺HSO₄⁻, BnEt₃N⁺Cl⁻, Aliquat 336, éthers couronnes ; sels de cinchona pour l'asymétrique
Ziegler–Natta | Polymérisation des alcènes par insertions migratoires répétées dans une liaison métal–alkyle (mécanisme de Cossee–Arlman) ; polypropylène isotactique | TiCl₄ ou TiCl₃ + AlEt₃ (hétérogène, sur MgCl₂) ; métallocènes Cp₂ZrCl₂ + MAO (homogène)
`;
