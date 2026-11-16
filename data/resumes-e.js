// Résumés d'une ligne des réactions de l'index — partie E (transpositions et réactions péricycliques).
// Format : nom tel que cité | ce que fait la réaction (départ → produit) | réactifs et conditions typiques
// Rédigés de mémoire : repères de révision à vérifier, pas des protocoles.
export default `
Nametkin | Migration 1,2 d'un méthyle dans un carbocation terpénique (cas particulier de Wagner–Meerwein, série du camphène) | Acide (H₂SO₄, HCl), solvolyse
rétropinacolique | Alcool portant un carbone voisin quaternaire → alcène réarrangé (déshydratation avec migration 1,2 d'alkyle ; inverse formel de la pinacolique) | H₂SO₄ ou H₃PO₄ à chaud
diénone–phénol | Cyclohexa-2,5-diénone 4,4-disubstituée → phénol 3,4-disubstitué (migration 1,2, aromatisation) | H₂SO₄ ou Ac₂O/H₂SO₄ ; version photochimique
diénol–benzène | Cyclohexadiénol 4,4-disubstitué → benzène substitué (perte d'eau et migration 1,2) | Acide (TsOH, H₂SO₄)
α-cétol (acyloïne) | α-Hydroxycétone ou α-hydroxyaldéhyde → α-hydroxycétone isomère par migration 1,2 d'alkyle (réversible, vers l'isomère le plus stable) | Acide, base ou chauffage ; fréquent en série stéroïde (D-homoannélation)
Meinwald (époxyde → carbonyle) | Époxyde → aldéhyde ou cétone, par ouverture en carbocation puis migration 1,2 d'hydrure ou d'alkyle | BF₃·OEt₂, MgBr₂, LiClO₄, InCl₃ ou acide de Brønsted
Meyer–Schuster | Alcool propargylique secondaire ou tertiaire → aldéhyde ou cétone α,β-insaturé (via un allénol) | Acide (H₂SO₄, AcOH, TsOH) à chaud ; catalyse Au, Ru, V, Re en conditions douces
Rupe | Alcool propargylique tertiaire à alcyne terminal → méthylcétone α,β-insaturée (via une ényne, puis hydratation), en concurrence avec Meyer–Schuster | HCO₂H à reflux ou H₂SO₄
Westphalen–Lettré | 5α-Hydroxy-stéroïde 6β-acétoxylé → migration du méthyle C10 vers C5 et formation d'une double liaison 9,10 | Ac₂O, H₂SO₄ (ou KHSO₄)
déplacement NIH | Lors de l'hydroxylation enzymatique d'un arène (via un oxyde d'arène), le substituant (H, D, halogène, alkyle) migre sur le carbone voisin | Cytochromes P450, hydroxylases ; modèle : ouverture acide d'un oxyde d'arène
homo-réarrangement des stéroïdes D | D-Homoannélation : le cycle D à cinq chaînons d'un 17-hydroxy-20-céto-stéroïde s'agrandit à six (réarrangement α-cétol) | Acide de Lewis (BF₃, Al(OiPr)₃) ou base (KOH)
réarrangements de carbènes (Fritsch–Buttenberg–Wiechell, Skattebøl, Colvin) | Migration 1,2 dans un carbène : vinylidène → alcyne (FBW, Colvin) ; vinyl-gem-dibromocyclopropane → cyclopentadiène (Skattebøl) | n-BuLi ou MeLi ; TMSC(Li)N₂
Lossen | Acide hydroxamique O-activé → isocyanate → amine (un carbone de moins), urée ou carbamate | Activation (Ac₂O, TsCl, CDI) puis base et chauffage
Schmidt | Acide carboxylique + HN₃ → amine (un carbone de moins) ; cétone + HN₃ → amide (insertion de NH) ; aldéhyde → nitrile | NaN₃, H₂SO₄ ou TFA, CHCl₃ ; version intramoléculaire d'Aubé (azoture d'alkyle + cétone, TiCl₄ ou TfOH)
Neber | Tosylate d'oxime de cétone → α-aminocétone, via une 2H-azirine | TsCl/pyridine ; KOEt ou tBuOK ; hydrolyse acide
Stieglitz | N-Halogéno- ou N-hydroxy-tritylamine → imine (migration 1,2 d'un aryle du carbone vers l'azote) | PCl₅ ou base sur le dérivé N-chloré ; Pb(OAc)₄ sur l'amine
Tiemann | Amidoxime O-activée → carbodiimide ou urée / cyanamide (migration vers l'azote) | Chlorure de benzènesulfonyle, puis H₂O
Boyer | Schmidt intermoléculaire avec un azoture d'alkyle : cétone ou aldéhyde + RN₃ → amide N-alkylé ; aminoalcool azidé → oxazoline ou lactame (Aubé) | TfOH, TiCl₄ ou BF₃·OEt₂
dégradations de Weerman et de Darapsky | Weerman : amide α-hydroxylé ou α,β-insaturé → aldéhyde avec un carbone de moins (Hofmann). Darapsky : α-cyanoester → acide α-aminé via hydrazide et Curtius | NaOCl ; N₂H₄, HNO₂, chauffage dans EtOH, hydrolyse
Hock (procédé au cumène) | Cumène → hydroperoxyde de cumyle → phénol + acétone (migration du phényle vers l'oxygène) | O₂ (air), 100 °C ; puis H₂SO₄ dilué
Kornblum–DeLaMare | Peroxyde ou endoperoxyde avec H en α → cétone + alcool (γ-hydroxy-énone à partir d'endoperoxyde) | Base (Et₃N, DBU, KOH)
quasi-Favorskii | α-Halocétone sans H énolisable en α′ → acide ou ester par mécanisme semi-benzilique (addition sur C=O puis migration 1,2 avec départ de X⁻) | NaOH, RONa ou AgNO₃
acide benzilique | 1,2-Dicétone (benzile) → α-hydroxyacide (acide benzilique), par addition de HO⁻ puis migration 1,2 d'aryle | KOH aqueux ou alcoolique à chaud, puis H₃O⁺ ; alcoolate → ester benzilique
Wittig [1,2] | Éther α-métallé → alcoolate (migration 1,2 d'alkyle de O vers C, mécanisme radicalaire en cage) | n-BuLi, MeLi ou PhLi, THF, −78 °C → t.a.
Stevens | Ylure d'ammonium ou de sulfonium → amine ou sulfure réarrangé (migration [1,2] de N ou S vers le carbanion) | Base forte (NaNH₂, NaOH, tBuOK) sur le sel quaternaire ; ou diazo + Rh/Cu
Sommelet–Hauser | Sel de benzyl-triméthylammonium → ortho-méthylbenzyl-diméthylamine ([2,3] sigmatropique via l'ylure, puis réaromatisation) | NaNH₂ ou KNH₂ dans NH₃ liquide
Brook et rétro-Brook | Migration d'un silyle du carbone vers l'oxygène d'un alcoolate ([1,n], n = 2 à 5), donnant un carbanion ; rétro-Brook : O → C | Base catalytique (NaH, n-BuLi), solvant polaire (HMPA) ; force motrice : liaison Si–O
phospha-Brook | α-Hydroxyphosphonate → phosphate (migration du phosphore de C vers O), générant un carbanion | Base (DBU, tBuOK, n-BuLi)
Fries anionique (Snieckus) | O-Aryl carbamate ortho-lithié → salicylamide (migration 1,3 du carbamoyle de O vers C) | s-BuLi/TMEDA, THF, −78 °C, puis réchauffement à t.a.
Grovenstein–Zimmerman | Migration 1,2 d'un aryle dans un carbanion (2,2,2-triphényléthyl-métal → 1,1,2-triphényléthyl-métal) | Na, K ou Li sur le chlorure correspondant
Chan | α-Acyloxyacétate → α-hydroxy-β-cétoester (migration 1,2 d'acyle de O vers C de l'énolate) | LDA ou LiHMDS, THF, −78 °C
danse des halogènes | Migration d'un halogène (Br, I) sur un cycle (hétéro)aromatique via des échanges halogène–métal successifs, vers l'aryllithium le plus stable | LDA ou LiTMP, THF, −78 °C ; puis électrophile
migrations 1,2 de boronates (Matteson, Zweifel, Aggarwal) | Ate-complexe de bore portant un groupe partant en α (ou un alcène activé) → migration 1,2 stéréospécifique d'un substituant du bore vers le carbone | LiCHCl₂ (Matteson) ; I₂/NaOMe (Zweifel) ; carbamates lithiés (Aggarwal)
Dimroth | Échange d'un azote endocyclique et d'un azote exocyclique d'un hétérocycle (1,2,3-triazoles, pyrimidines) par ouverture–rotation–fermeture | Chauffage, base ou acide
Amadori | N-Glycoside d'aldose (glycosylamine) → 1-amino-1-désoxy-cétose (première étape de la réaction de Maillard) | Catalyse acide douce, chauffage
Lobry de Bruyn–van Ekenstein | Interconversion aldose ⇌ cétose et épimérisation en C2 via un ènediol (glucose ⇌ fructose ⇌ mannose) | Base diluée (Ca(OH)₂, NaOH, pyridine)
Gabriel–Colman | Ester phtalimido-acétique → 4-hydroxyisoquinoléine-carboxylate (extension de cycle) | NaOEt ou NaOMe, alcool à reflux
réarrangement de Perkin | 3-Halocoumarine → acide benzofurane-2-carboxylique (contraction de cycle) | NaOH aqueux ou alcoolique à chaud
Tafel | Réduction électrolytique d'un acétoacétate α-substitué → hydrocarbure à squelette réarrangé | Cathode de plomb, H₂SO₄ alcoolique
Aston–Greenburg | α-Halocétone tertiaire non énolisable + alcoolate → ester réarrangé (variante quasi-Favorskii) | NaOR, alcool
aza-Cope (dont aza-Cope/Mannich) | [3,3] sigmatropique d'un 1,5-diène contenant un azote ; version cationique 2-aza-Cope très rapide (iminium), couplée à Mannich chez Overman | Thermique ; ou acide + aldéhyde pour former l'iminium, 25–80 °C
Bellus–Claisen | Éther, sulfure ou amine allylique + cétène → ester, thioester ou amide γ,δ-insaturé ([3,3] zwitterionique) ; extension de cycle de 4 atomes | Cétène (dichlorocétène de Cl₃CCOCl/Zn), ou chlorure d'acyle + base, acide de Lewis
Kazmaier–Claisen | Ester allylique d'acide α-aminé N-protégé → acide aminé γ,δ-insaturé (énolate chélaté de zinc, état de transition chaise) | LDA ou LiHMDS (2,2 éq.), ZnCl₂, THF, −78 °C → t.a.
Saucy–Marbet | Alcool propargylique + éther d'énol → cétone β-allénique (Claisen propargylique) → diénone conjuguée | Éther isopropénylique, TsOH cat., 60–100 °C
Overman | Alcool allylique → trichloroacétimidate allylique → trichloroacétamide allylique transposé ([3,3]) → amine allylique | Cl₃CCN, DBU ou NaH ; puis xylène à 140 °C, ou PdCl₂(MeCN)₂ / Hg(II) à t.a. ; catalyseur COP pour l'asymétrique
thio- et aza-Claisen | [3,3] d'un sulfure d'allyle et de vinyle (→ thiocarbonyle γ,δ-insaturé) ou d'une N-allyl-énamine / N-allyl-aniline (→ imine ou amide) | Thermique (plus haut pour l'aza) ; accéléré par acides de Lewis ou sous forme zwitterionique
divinylcyclopropane–cycloheptadiène | cis-1,2-Divinylcyclopropane → cyclohepta-1,4-diène (Cope favorisé par la tension, état de transition bateau) | Spontané dès t.a. pour le cis ; le trans exige une isomérisation (≈ 200 °C)
étape clé de la synthèse d'indoles de Fischer | L'ène-hydrazine (tautomère de l'arylhydrazone) subit un [3,3] sigmatropique (type diaza-Cope) créant la liaison C–C, puis cyclisation et perte de NH₃ | Acide de Brønsted ou de Lewis (ZnCl₂, PPA, AcOH, TsOH), à chaud
benzidine | Hydrazobenzène → benzidine (4,4′-diaminobiphényle), [5,5] sigmatropique du dication | HCl ou H₂SO₄ aqueux
Wittig [2,3] | Éther allylique α-métallé → alcoolate homoallylique ([2,3] sigmatropique concerté, état de transition enveloppe ; favorisé à basse température) | n-BuLi ou LDA, THF, −78 °C ; variante de Still : stannane + n-BuLi
Mislow–Evans | Sulfoxyde allylique ⇌ sulfénate allylique ([2,3]) ; piégeage par un thiophile → alcool allylique transposé E | P(OMe)₃ ou Et₂NH, PhSNa, MeOH, 25–60 °C
Meisenheimer | N-Oxyde d'amine tertiaire allylique ou benzylique → O-allyl-hydroxylamine ([2,3] pour allyle, [1,2] pour benzyle) | Chauffage modéré
Doyle–Kirmse | Sulfure d'allyle + composé diazo → ylure de sulfonium → sulfure homoallylique ([2,3]) | Rh₂(OAc)₄ ou Cu(acac)₂ ; versions au Fe, Ag, photochimique
réarrangement d'ylures de sulfonium et d'ammonium allyliques | Ylure allylique de S ou N → sulfure ou amine homoallylique par [2,3] sigmatropique (en concurrence avec Stevens [1,2]) | Base sur le sel d'onium, ou carbène métallique + sulfure ou amine allylique
étape de l'oxydation de Riley | Après la réaction ène avec SeO₂, l'acide allylséléninique subit un [2,3] sigmatropique donnant l'ester de sélénium(II) de l'alcool allylique (double liaison revenue à sa place) | SeO₂, dioxane ou tBuOOH/CH₂Cl₂
[1,3] | Migration sigmatropique [1,3] : H suprafaciale interdite thermiquement ; alkyle possible avec inversion du carbone migrant ; permise photochimiquement | Thermique à haute température (souvent diradicalaire) ou hν
[1,5] et [1,7] | Migration [1,5] d'hydrogène : suprafaciale, permise thermiquement (cyclopentadiènes, 1,3-diènes Z). [1,7] : antarafaciale (prévitamine D → vitamine D) | Chauffage modéré (25–200 °C)
vinylcyclopropane– cyclopentène | Vinylcyclopropane → cyclopentène (extension de cycle, [1,3] formel) | Thermique 300–500 °C ; hν ; Rh(I), Ni(0) ou Pd(0) ; version anionique accélérée
Cloke–Wilson | Cyclopropyl-cétone, -imine ou -aldéhyde → 2,3-dihydrofurane ou pyrroline | Chauffage, acide de Lewis ou de Brønsted, ou nucléophile (iodure, DABCO)
réarrangements dyotropiques | Deux liaisons σ migrent simultanément et échangent leurs positions (type I : échange 1,2 ; type II : migration vers de nouveaux sites) | Thermique ou catalysé par acide de Lewis ; ex. β-lactone → γ-lactone, 1,2-dibromures
Claisen aromatique | Éther d'allyle et d'aryle → ortho-allylphénol ([3,3] puis tautomérie) ; si les ortho sont bloqués → para (Cope supplémentaire) | 180–220 °C (N,N-diéthylaniline, décaline) ; accéléré par BCl₃, Et₂AlCl
benzidine et sémidine | Hydrazobenzène → benzidine (4,4′) ; si un para est occupé → sémidines (liaison N–C ortho ou para) et diphénylines | HCl ou H₂SO₄
Wallach | Azoxybenzène → para-hydroxyazobenzène | H₂SO₄ concentré
Reilly–Hickinbottom | N-Alkylaniline → para- (et ortho-) alkylaniline, catalysée par un halogénure métallique | CoCl₂, ZnCl₂ ou CdCl₂, 200–300 °C
Hayashi | Acide ortho-benzoylbenzoïque substitué → isomère de position (migration via un spiro-cation acylium) | H₂SO₄ concentré ou P₂O₅
Wessely–Moser | 5,7,8-Trihydroxyflavone ⇌ 5,6,7-trihydroxyflavone (ouverture du cycle pyrone, rotation, refermeture) | HI ou acide à chaud
Boulton–Katritzky | Interconversion d'hétérocycles à cinq chaînons portant une chaîne latérale à trois atomes (1,2,4-oxadiazole → autre azole) | Chauffage ou base
Achmatowicz | Alcool furfurylique → 6-hydroxy-2H-pyran-3(6H)-one (extension oxydante de cycle, accès aux pyranoses) | Br₂/MeOH puis H₃O⁺ ; ou NBS/H₂O, mCPBA, VO(acac)₂/tBuOOH
Piancatelli | 2-Furylcarbinol → 4-hydroxycyclopent-2-énone trans (ouverture puis électrocyclisation 4π type Nazarov) ; aza-Piancatelli avec anilines | Acide aqueux (ZnCl₂, PPA), H₂O/acétone à chaud ; Dy(OTf)₃
Ferrier | Réarrangement de Ferrier (type I) : glycal + nucléophile → glycoside 2,3-insaturé (transposition allylique) | BF₃·OEt₂, InCl₃, I₂ ou autre acide de Lewis ; alcool, thiol, C-nucléophile
Petasis–Ferrier | Éther d'énol cyclique (4-méthylène-1,3-dioxane ou dioxanone méthylénée) → tétrahydropyran-4-one 2,6-cis | Me₂AlCl ou iBu₃Al, CH₂Cl₂, −78 °C
Mumm | Isoimide (O-acyl imidate) → imide par transfert d'acyle 1,3 O → N ; étape finale de la réaction d'Ugi | Spontané, irréversible
diènes de Danishefsky et de Rawal | Diènes très riches en électrons (1-méthoxy-3-silyloxybutadiène ; 1-amino-3-silyloxybutadiène) → cyclohexénones 4-substituées ou dihydropyranones (hétéro-Diels–Alder) après hydrolyse | Diénophile, 25–80 °C ou acide de Lewis (ZnCl₂, Eu(fod)₃) ; puis H₃O⁺ ou TFA
déshydro- et hexadéshydro-Diels–Alder | Alcynes à la place des alcènes : ényne + alcyne → arène ; 1,3-diyne + alcyne (HDDA) → benzyne piégé in situ | Thermique (80–200 °C), intramoléculaire le plus souvent
Boger (pyridines) | 1,2,4-Triazine + énamine → pyridine (Diels–Alder à demande inverse, perte de N₂ puis d'amine) | Énamine de pyrrolidine formée in situ, CHCl₃ ou dioxane, 45–100 °C
Kondrat'eva | Oxazole + alcène diénophile → pyridine (Diels–Alder puis aromatisation avec perte d'eau ; synthèse de la vitamine B6) | Chauffage, acide
Wagner-Jauregg | Styrène (1,1-diaryléthylène) + 2 anhydride maléique → bis-adduit (double Diels–Alder impliquant le cycle aromatique) | Chauffage
Diels–Reese | Hydrazobenzène + acétylènedicarboxylate de diméthyle → adduit, converti en pyrazolone, indole ou quinoléine selon le solvant | AcOH, pyridine ou xylène
Povarov | Aniline + aldéhyde (N-arylimine) + alcène riche en électrons → tétrahydroquinoléine (aza-Diels–Alder à demande inverse formel) | BF₃·OEt₂, Sc(OTf)₃, Yb(OTf)₃ ou acide phosphorique chiral
ligation tétrazine–alcène | 1,2,4,5-Tétrazine + alcène tendu (trans-cyclooctène, norbornène, cyclopropène) → dihydropyridazine + N₂ ; réaction bioorthogonale la plus rapide | Milieu aqueux, t.a., sans catalyseur
photocycloaddition énone–alcène | Énone excitée (triplet) + alcène → cyclobutane ; régiosélectivité tête-à-queue avec les alcènes riches | hν (> 300 nm, Pyrex), −78 °C → t.a.
de Mayo | Énol d'une 1,3-dicétone + alcène → cyclobutanol ([2+2] photochimique) → rétro-aldol → 1,5-dicétone (extension de deux carbones) | hν
Paternò–Büchi | Carbonyle excité (n,π*) + alcène → oxétane | hν (benzophénone, benzaldéhyde), benzène
cétène–alcène | Cétène + alcène → cyclobutanone ([π2s + π2a] thermique) ; dichlorocétène très réactif | Cl₃CCOCl + Zn(Cu) ou Cl₂CHCOCl + Et₃N ; chlorure d'iminium (Ghosez)
cétène–imine (Staudinger) | Cétène (formé in situ) + imine → β-lactame, en deux étapes via un zwitterion | Chlorure d'acyle + Et₃N, CH₂Cl₂, −78 °C → t.a. ; versions catalytiques asymétriques
nitrones | Nitrone + alcène → isoxazolidine (puis coupure N–O → 1,3-aminoalcool) | Toluène à 80–110 °C ; acides de Lewis chiraux
oxydes de nitrile | Oxyde de nitrile + alcène → isoxazoline (β-hydroxycétone masquée) ; + alcyne → isoxazole | Formé in situ : chlorure d'hydroximoyle + Et₃N, ou nitroalcane + PhNCO (Mukaiyama)
ylures d'azométhine (Prato) | Ylure d'azométhine + alcène → pyrrolidine ; Prato : sarcosine + aldéhyde + C₆₀ → fulléropyrrolidine | Acide aminé + aldéhyde (décarboxylation), toluène à reflux ; ou imino-ester + AgOAc ou Cu(I)/base
diazoalcanes | Diazoalcane + alcène pauvre en électrons → 1-pyrazoline (puis 2-pyrazoline ou cyclopropane par perte de N₂) ; + alcyne → pyrazole | CH₂N₂ ou TMSCHN₂, éther, 0 °C
ylures de carbonyle | Ylure de carbonyle (carbène + C=O, ou ouverture d'époxyde) + dipolarophile → tétrahydrofurane ou oxabicycle | Diazocétone + Rh₂(OAc)₄ (cascade de Padwa)
ozone (Criegee) | O₃ + alcène → molozonide ([3+2]) → oxyde de carbonyle + carbonyle (rétro-[3+2]) → ozonide ([3+2]) | O₃, CH₂Cl₂ ou MeOH, −78 °C
[4+3] (cations oxyallyles, Noyori) | Cation oxyallyle (2π, 3 atomes) + diène (furane, cyclopentadiène) → cycloheptanone pontée | α,α′-Dibromocétone + Fe₂(CO)₉ (Noyori) ou Zn/Cu ; α-halocétone + base ; NaI/Cu
[5+2] | Vinylcyclopropane + système 2π → cycle à sept (Wender, Rh) ; ou oxydopyrylium + alcène → oxabicyclo[3.2.1]octène | [Rh(CO)₂Cl]₂ ; ou base (Et₃N, DBU) sur un acétoxypyranone, chauffage
[6+4] | Triène (tropone, fulvène) + diène → cycle à dix, exo (thermiquement permise, 10 électrons) | Chauffage ; ou Cr(CO)₃ photochimique (Rigby)
[8+2] | Heptafulvène, indolizine ou tropone + alcène pauvre → bicycle | Chauffage
[2+2+2] | Trois systèmes 2π → cycle à six (benzène, pyridine, cyclohexadiène) | CpCo(CO)₂, RhCl(PPh₃)₃, Cp*RuCl(cod), Ni(0)
[2+2+1] (Pauson–Khand) | Alcyne + alcène + CO → cyclopenténone | Co₂(CO)₈, NMO ou chauffage ; Rh, Ir catalytiques sous CO
[3+2] au TMM | Triméthylèneméthane–palladium + alcène pauvre → méthylènecyclopentane | Acétate de 2-(triméthylsilylméthyl)allyle, Pd(OAc)₂, P(OiPr)₃
[4+1] | Diène (ou hétérodiène) + unité à un carbone (carbène, CO, isonitrile) → cycle à cinq | Isonitrile + hétérodiène ; CO + Fe ou Rh ; carbènes nucléophiles
addition de carbènes et de nitrènes sur les alcènes | Réaction chélétropique : carbène ou nitrène singulet + alcène → cyclopropane ou aziridine, stéréospécifique (approche non linéaire) | Diazo + hν ou métal ; CHX₃/base ; iminoiodinane + Cu ou Rh
SO₂ + diène (sulfolène) | 1,3-Diène + SO₂ ⇌ 3-sulfolène (2,5-dihydrothiophène-1,1-dioxyde), suprafaciale disrotatoire ; masquage et purification des diènes | SO₂ liquide, t.a. ; rétro-réaction à 110–130 °C
extrusion de CO | Norbornadién-7-one (adduit cyclopentadiénone + alcyne) → arène + CO ; cyclopropanone → alcène + CO | Thermique, souvent spontanée ; ou hν
N₂ et SO₂ | Extrusion de N₂ (1-pyrazolines, diazènes cycliques → cyclopropanes, alcènes, diradicaux) et de SO₂ (sulfolènes → diènes ; épisulfones → alcènes, Ramberg–Bäcklund) | Thermique ou photochimique
ouverture des cyclobutènes (4π, torquosélectivité) | Cyclobutène → butadiène, conrotatoire (thermique) ; les substituants donneurs en C3 tournent vers l'extérieur, les accepteurs (CHO) vers l'intérieur | 80–180 °C ; benzocyclobutène → ortho-quinodiméthane (piégé en Diels–Alder)
fermeture des hexatriènes (6π) | Hexa-1,3,5-triène (Z central) → cyclohexa-1,3-diène, disrotatoire (thermique) ou conrotatoire (hν) | 100–200 °C ; hν (ex. ergostérol → prévitamine D en sens ouverture)
aza- et oxa-électrocyclisations | 1-Azatriène → 1,2-dihydropyridine ; 1-oxatriène (diénone Z) ⇌ 2H-pyrane (6π disrotatoire, souvent réversible) | Thermique, souvent spontanée à t.a.
cascades 8π–6π | Tétraène → cyclooctatriène (8π conrotatoire) → bicyclo[4.2.0]octadiène (6π disrotatoire) ; biosynthèse des acides endiandriques | Thermique, t.a. → 100 °C
photocyclisation de Mallory | cis-Stilbène → dihydrophénanthrène (6π conrotatoire, hν) → phénanthrène par oxydation | hν, I₂ catalytique + O₂ (ou oxyde de propylène, conditions de Katz)
règles de Woodward–Hoffmann (conrotatoire, disrotatoire) | Électrocyclisations : 4n électrons → conrotatoire (Δ), disrotatoire (hν) ; 4n+2 → disrotatoire (Δ), conrotatoire (hν). Cycloadditions suprafaciales permises thermiquement à 4n+2 électrons | Conservation de la symétrie des orbitales ; raisonnement par orbitales frontières ou état de transition aromatique
Alder-ène | Alcène avec H allylique (ène) + énophile (alcène pauvre, alcyne, C=O, N=N, ¹O₂) → nouvelle liaison σ, migration de la double liaison et transfert de H (6 électrons) | Thermique (150–300 °C) ou acide de Lewis (Me₂AlCl, EtAlCl₂) à basse température
métallo-ène | Variante où un métal (Mg, Zn, Pd, Li) est transféré à la place de l'hydrogène : allyl-métal + alcène → nouvel alkyl-métal (cyclisations d'Oppolzer) | Allyl-Grignard, chauffage ; Pd(0) cat. sur acétates allyliques
ène de Schenck | Alcène + ¹O₂ → hydroperoxyde allylique, la double liaison se déplace | O₂, hν, rose bengale ou TPP, puis PPh₃ ou NaBH₄ → alcool allylique
éliminations syn thermiques (Chugaev, Cope, pyrolyse d'esters, sélénoxydes) | Éliminations Ei par état de transition cyclique à 5 ou 6 centres, H et groupe partant syn-périplanaires | Sélénoxydes (0–25 °C) < oxydes d'amine, sulfoxydes (80–150 °C) < xanthates (120–200 °C) < acétates (400–500 °C)
Bergman | Ènediyne (Z-hex-3-ène-1,5-diyne) → para-benzyne (1,4-diradical) → arène après arrachement de 2 H ; mode d'action de la calichéamicine | 200 °C pour les acycliques ; 37 °C pour les ènediynes cycliques à 10 chaînons
Myers–Saito | Ényne-allène → diradical α,3-déshydrotoluène (cyclisation C2–C7) ; mode d'action de la néocarzinostatine | Spontané à 37–80 °C
Schmittel | Ényne-allène → diradical fulvénique (cyclisation C2–C6), favorisée par un aryle ou groupe encombrant sur l'alcyne | Thermique
`;
