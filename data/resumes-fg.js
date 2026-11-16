// Résumés d'une ligne des réactions de l'index — parties F (radicalaire, photochimie, électrochimie) et G (protections).
// Format : nom tel que cité | ce que fait la réaction ou le groupe | réactifs et conditions typiques (pose ; retrait pour les groupes protecteurs)
// Rédigés de mémoire : repères de révision à vérifier, pas des protocoles.
export default `
réaction de Reed (sulfochloration) | Alcane → chlorure d'alcanesulfonyle (RSO₂Cl), chaîne radicalaire | SO₂ + Cl₂, hν
déshalogénation à l'hydrure de tributylétain | R–X → R–H par chaîne radicalaire (Bu₃Sn• arrache X, R• arrache H à Bu₃SnH) | Bu₃SnH, AIBN, benzène ou toluène à 80 °C
décarboxylation de Barton | Acide carboxylique → ester de thiohydroxamate → RH (ou R–X, R–SPy, R–OH) par voie radicalaire | N-Hydroxypyridine-2-thione, DCC ; puis tBuSH ou Bu₃SnH, hν ou AIBN
addition de Giese | Radical alkyle nucléophile + alcène pauvre en électrons → addition conjuguée, puis transfert de H | RX/Bu₃SnH/AIBN ; RHgX/NaBH₄ ; photoredox (RCO₂H, RBF₃K)
Ueno–Stork | Bromoacétal d'un alcool allylique → cyclisation radicalaire 5-exo → acétal cyclique (γ-lactol, γ-lactone après oxydation) | NBS + éther de vinyle ; puis Bu₃SnH, AIBN
allylation de Keck | R–X (ou xanthate, séléniure) + allyltributylétain → R–allyle (addition radicalaire puis β-fragmentation de Bu₃Sn•) | AllylSnBu₃, AIBN, benzène à 80 °C, ou hν
transfert d'atome de Kharasch (ATRA, ATRC) | R–X + alcène → addition de R et X de part et d'autre de la double liaison ; ATRC : version cyclisante | CCl₄, BrCCl₃, α-halocarbonyles ; peroxyde, Et₃B/O₂, CuCl/ligand, Ru, photoredox
transfert de xanthates de Zard | Xanthate (R–SC(S)OEt) + alcène non activé → adduit portant le xanthate, réutilisable ; chaîne radicalaire dégénérée tolérante | Peroxyde de lauroyle (DLP) en portions, 1,2-dichloroéthane ou EtOAc à reflux
cyclisations oxydantes au Mn(OAc)₃ (Snider) | β-Dicarbonyle → radical électrophile → cyclisation sur alcène(s), puis oxydation du radical final en alcène ou lactone | Mn(OAc)₃·2H₂O (2 éq.), Cu(OAc)₂ (1 éq.), AcOH, 25–80 °C
ouverture d'époxydes au Ti(III) (Nugent–RajanBabu) | Époxyde → radical β-titanoxy (le plus substitué) → réduction, cyclisation sur alcène ou addition conjuguée (ouverture anti-Markovnikov) | Cp₂TiCl (Cp₂TiCl₂ + Zn ou Mn), THF, t.a. ; catalytique avec collidine·HCl (Gansäuer)
couplages cétyle–oléfine au SmI₂ | Cétone ou aldéhyde → radical cétyle → addition (souvent intramoléculaire 5-exo) sur alcène activé ou non → cycloalcanol | SmI₂ (2,2 éq.), THF, HMPA ou H₂O/amine, tBuOH, −78 °C → t.a.
hydrofonctionnalisations de Shenvi | Alcène → hydrogénation chimiosélective, isomérisation ou couplage (hydroarylation) par transfert d'atome d'hydrogène, sélectivité Markovnikov et thermodynamique | Mn(dpm)₃ ou Co(dpm)₂, PhSiH₃ ou Ph(iPrO)SiH₂, tBuOOH, iPrOH
Baran | Couplage réducteur d'oléfines : alcène donneur + accepteur de Michael → liaison C–C (centre quaternaire) par MHAT | Fe(acac)₃ (cat.), PhSiH₃, EtOH/éthylène glycol, 60 °C
Carreira | Hydroazidation, hydrohydrazination, hydrocyanation, hydrochloration Markovnikov d'alcènes non activés | Catalyseur Co–salen ou Mn(dpm)₃, PhSiH₃ ou TMDSO, TsN₃, azodicarboxylate, TsCN ou TsCl
autoxydation | R–H + O₂ → R–OOH par chaîne radicalaire (C–H allyliques, benzyliques, éthers, aldéhydes) ; formation de peroxydes explosifs dans les éthers | O₂ de l'air, lumière ; inhibée par BHT, hydroquinone
piégeage par TEMPO | Radical carboné + TEMPO → alcoxyamine stable ; preuve mécanistique d'un radical, ou fonctionnalisation C–O | TEMPO (1–2 éq.)
réactifs de Langlois | Trifluorométhylation radicalaire d'arènes, hétéroarènes et alcènes par CF₃• | CF₃SO₂Na + tBuOOH (± Cu), ou photoredox, électrochimie
de Togni et d'Umemoto | Sources de CF₃ électrophile ou radicalaire : trifluorométhylation d'énolates, thiols, alcènes, arènes | Togni : benziodoxol(on)e–CF₃ (iode hypervalent) ; Umemoto : sel de S-(trifluorométhyl)dibenzothiophénium ; + Cu ou photoredox
radicalaire classique | Polymérisation en chaîne des monomères vinyliques (styrène, acrylates, chlorure de vinyle) : amorçage, propagation, terminaison (combinaison, dismutation) ; masses dispersées | AIBN ou peroxyde de benzoyle, 60–80 °C, masse, solution ou émulsion
ATRP | Polymérisation radicalaire contrôlée par transfert d'atome : équilibre R–X + Cu(I) ⇌ R• + X–Cu(II), chaînes dormantes, faible dispersité | Halogénure d'alkyle amorceur, CuBr/ligand azoté (PMDETA, bipyridine, Me₆TREN)
RAFT | Polymérisation radicalaire contrôlée par transfert réversible par addition–fragmentation sur un composé thiocarbonylthio | Dithioester, trithiocarbonate ou xanthate + amorceur (AIBN)
par nitroxydes | Polymérisation contrôlée (NMP) : piégeage réversible du radical propageant par un nitroxyde (alcoxyamine dormante) | TEMPO (styrène, 120 °C), SG1, TIPNO
anionique | Polymérisation vivante des monomères à groupe attracteur ou conjugués (styrène, diènes, méthacrylates, époxydes) ; pas de terminaison, copolymères à blocs | n-BuLi ou s-BuLi, naphtalène-sodium, THF ou cyclohexane, −78 °C → t.a.
cationique | Polymérisation des alcènes riches (isobutène, éthers vinyliques, styrène) et hétérocycles (THF) ; transferts fréquents | Acide de Lewis + co-amorceur (BF₃/H₂O, AlCl₃/RCl, TiCl₄), basse température (−100 °C pour le butyle)
Ziegler–Natta et ROMP pour mémoire | Polymérisation par coordination–insertion (polyoléfines stéréorégulières) et par métathèse avec ouverture de cycle (polynorbornène) | TiCl₄/AlEt₃ ; métallocènes/MAO ; catalyseurs de Grubbs ou de Schrock
Norrish I et II | Type I : coupure α de la cétone excitée → radicaux acyle + alkyle (décarbonylation). Type II : arrachement d'un H en γ → 1,4-diradical → alcène + énol (cétone plus courte) | hν (n → π*, 280–320 nm)
cyclisation de Yang | Le 1,4-diradical de Norrish II se referme → cyclobutanol | hν, cétone à H en γ
cycloaddition [2+2] énone–alcène | Énone excitée + alcène → cyclobutane (intra- ou intermoléculaire) ; « règle des cinq » en intramoléculaire | hν (> 300 nm) ; ou catalyse photoredox / transfert d'énergie (Yoon)
di-π-méthane (Zimmerman) et oxa-di-π-méthane | 1,4-Diène (ou 3-aryl-alcène) → vinylcyclopropane ; β,γ-énone → cyclopropyl-cétone (oxa, par le triplet) | hν directe (singulet) ; sensibilisée par acétone ou acétophénone (triplet)
photo-Fries | Ester de phényle (ou anilide) → ortho- et para-hydroxyarylcétones, par paire de radicaux en cage, sans acide de Lewis | hν (254 nm)
photo-Wolff | α-Diazocétone → cétène (perte de N₂ et migration 1,2), piégé par H₂O, ROH, amine ; base des photorésines DNQ | hν (300–360 nm)
photolyse des nitrites de Barton | Nitrite d'alkyle → radical alcoxyle → transfert 1,5 de H → radical carboné + NO → δ-nitroso-alcool → oxime (fonctionnalisation de C–H éloigné, synthèse de l'aldostérone) | NOCl/pyridine (formation du nitrite) ; hν
isomérisation E/Z | Alcène E ⇌ Z par excitation (état perpendiculaire) ; état photostationnaire souvent enrichi en Z (stilbène, rétinal, azobenzène) | hν directe ou sensibilisée (transfert d'énergie triplet) ; I₂/hν ou PhS• pour la voie thermodynamique
photoénolisation | ortho-Alkyl-arylcétone → photoénol (ortho-quinodiméthane hydroxylé) par transfert 1,5 de H, piégé par un diénophile | hν (350 nm)
cycloaddition méta arène–alcène | Benzène excité + alcène → tricyclo[3.3.0.0]octène (liaison en méta, trois nouveaux cycles) ; synthèses de Wender | hν (254 nm)
réarrangement lumicétone | Cyclohex-2-énone 4,4-disubstituée → bicyclo[3.1.0]hexan-2-one (type A) ; cyclohexadiénones croisées (santonine → lumisantonine) | hν, tBuOH ou dioxane
réactions de l'oxygène singulet (ène de Schenck, endoperoxydes par [4+2]) | ¹O₂ + alcène à H allylique → hydroperoxyde allylique ; + 1,3-diène → endoperoxyde ; + alcène riche → dioxétane | O₂, hν visible, sensibilisateur (rose bengale, bleu de méthylène, TPP)
groupes protecteurs photolabiles | Groupes retirés par la lumière seule, sans réactif (libération contrôlée dans l'espace et le temps, composés « cagés ») | o-Nitrobenzyle, nitrovératryle (NVOC), phénacyle, coumarinylméthyle ; hν 350–420 nm
extinction oxydante ou réductrice (MacMillan, Yoon, Stephenson) | Le photocatalyseur excité cède un électron (extinction oxydante) ou en reçoit un (extinction réductrice) du substrat, formant un radical ; l'autre demi-réaction ferme le cycle | Ru(bpy)₃Cl₂, Ir(ppy)₃ ; amines sacrificielles (iPr₂NEt), LED bleues ; alkylation α d'aldéhydes, [2+2], déshalogénation
métallaphotorédox au nickel | Le photocatalyseur fournit le radical et module le degré d'oxydation du nickel, qui réalise le couplage (C–C, C–O, C–N) | NiCl₂·glyme/dtbbpy + Ir[dF(CF₃)ppy]₂(dtbbpy)PF₆, base, LED bleues, t.a.
complexes donneur– accepteur d'électrons | Deux partenaires incolores forment un complexe à transfert de charge coloré (EDA) ; son excitation visible donne une paire de radicaux sans photocatalyseur | Énamine ou amine + bromure d'alkyle pauvre, sels de pyridinium de Katritzky, esters NHPI ; lumière visible
décarboxylations photochimiques | RCO₂H (ou ester rédox-actif) → R• + CO₂ → addition de Giese, arylation (Ni), fluoration, hydrodécarboxylation | Photocatalyseur Ir ou acridinium, base ; esters de NHPI + ester de Hantzsch ou Ru(bpy)₃²⁺
Hofer–Moest (non-Kolbe) | Carboxylate → radical → carbocation (oxydation à deux électrons) → alcool, éther, ester ou alcène | Électrolyse sur anode de carbone, milieu basique, faible densité de courant
oxydation de Shono | Amide ou carbamate → N,O-acétal par méthoxylation anodique en α de l'azote (précurseur de N-acyliminium) | Anode de carbone, MeOH, Et₄NOTs, courant constant
fluoration électrochimique de Simons | Composé organique → dérivé perfluoré (tous les C–H → C–F) | Électrolyse dans HF anhydre, anode de nickel, 5–6 V
réarrangement de Tafel | Acétoacétate α-substitué → hydrocarbure à squelette réarrangé par réduction cathodique | Cathode de plomb, H₂SO₄/EtOH
hydrodimérisation cathodique (Baizer) | 2 acrylonitrile + 2 e⁻ + 2 H⁺ → adiponitrile (précurseur du nylon-6,6) | Cathode de Pb ou Cd, sel d'ammonium quaternaire, émulsion aqueuse (procédé Monsanto)
couplages anodiques d'oléfines (Moeller) | Oxydation anodique d'un alcène riche (éther d'énol, cétène acétal) en radical-cation électrophile, piégé intramoléculairement par un nucléophile (umpolung) | Anode de carbone vitreux réticulé, LiClO₄, MeOH/THF, 2,6-lutidine
« cation pool » de Yoshida | Génération et accumulation électrochimique d'un carbocation (N-acyliminium, alcoxycarbénium) à basse température sans nucléophile, puis addition du nucléophile | Électrolyse à −78 °C dans CH₂Cl₂/Bu₄NBF₄ ; groupes électro-auxiliaires (silyle, thio)
oxydations C–H et couplages électroréducteurs récents (Baran) | Oxydation allylique électrochimique, oxydation de C–H non activés (médiateur quinuclidine), amination ; couplages réducteurs au Ni, réduction de Birch électrochimique | Cellule non divisée, électrodes de carbone, médiateurs (Cl₄NHPI, quinuclidine), anode sacrificielle (Mg, Zn)
méthyle | Éther méthylique : protection très robuste des alcools et surtout des phénols | Pose : MeI ou Me₂SO₄ + NaH ou K₂CO₃. Retrait : BBr₃ (CH₂Cl₂, −78 °C → t.a.), TMSI, ou thiolate à chaud (phénols)
DMB | 3,4-Diméthoxybenzyle : éther plus facile à oxyder que le PMB | Pose : DMBCl ou DMBBr, NaH. Retrait : DDQ (plus rapide que PMB) ou acide doux
2-naphtylméthyle (Nap) | Éther de 2-naphtylméthyle, retirable en présence de benzyles | Pose : NapBr, NaH. Retrait : DDQ (CH₂Cl₂/H₂O) ou hydrogénolyse sélective
trityle (Tr) | Éther de triphénylméthyle : sélectif des alcools primaires (encombrement) | Pose : TrCl, pyridine, DMAP. Retrait : acide doux (AcOH 80 %, TFA dilué, HCO₂H) ou H₂/Pd
DMTr | 4,4′-Diméthoxytrityle : protection du 5′-OH en synthèse d'oligonucléotides, très acido-labile (cation orange) | Pose : DMTrCl, pyridine. Retrait : acide trichloroacétique ou dichloroacétique 3 % dans CH₂Cl₂
tert-butyle | Éther de tert-butyle : stable aux bases et nucléophiles (chaînes latérales Ser, Thr, Tyr en stratégie Fmoc) | Pose : isobutène, H₂SO₄ ou BF₃. Retrait : TFA ou HCl anhydre
allyle | Éther d'allyle : stable aux acides et bases | Pose : bromure d'allyle, NaH. Retrait : isomérisation en éther de propényle (tBuOK/DMSO, ou catalyseur Rh/Ir) puis H₃O⁺ ou HgCl₂ ; ou Pd(PPh₃)₄ + capteur d'allyle
MEM | Éther de 2-méthoxyéthoxyméthyle (acétal) : stable aux bases | Pose : MEMCl, iPr₂NEt. Retrait : ZnBr₂ ou TiCl₄ (chélation), CH₂Cl₂ ; acides de Lewis sélectifs devant MOM
BOM | Éther de benzyloxyméthyle (acétal) | Pose : BOMCl, iPr₂NEt. Retrait : H₂/Pd (hydrogénolyse) ou acide ; Na/NH₃
SEM | Éther de 2-(triméthylsilyl)éthoxyméthyle (acétal) | Pose : SEMCl, iPr₂NEt. Retrait : fluorure (TBAF à chaud, CsF, HF) ou acide de Lewis (MgBr₂)
EE | Éther de 1-éthoxyéthyle (acétal, crée un stéréocentre) : plus labile que THP | Pose : éther d'éthyle et de vinyle, PPTS. Retrait : acide aqueux doux (AcOH, PPTS/MeOH)
MTM | Éther de méthylthiométhyle | Pose : DMSO/Ac₂O (Pummerer) ou MTMCl/NaH. Retrait : HgCl₂ ou AgNO₃ aqueux, ou MeI/NaHCO₃
acétate (Ac) | Ester acétique : stable aux acides, retiré en milieu basique ; participant en C2 des sucres | Pose : Ac₂O, pyridine, DMAP. Retrait : K₂CO₃/MeOH, NaOMe/MeOH (Zemplén), NH₃/MeOH, LiOH
benzoate (Bz) | Ester benzoïque : plus stable que l'acétate, migre moins | Pose : BzCl, pyridine. Retrait : NaOMe/MeOH, NaOH
pivaloate (Piv) | Ester pivalique : encombré, sélectif des alcools primaires, très résistant à l'hydrolyse | Pose : PivCl, pyridine. Retrait : DIBAL-H, LiAlH₄, MeLi, ou NaOH/Bu₄NOH à chaud
chloroacétate | Ester très labile, retirable en présence d'acétates et de benzoates | Pose : (ClCH₂CO)₂O ou ClCH₂COCl, pyridine. Retrait : thiourée, NaHCO₃, EtOH ; ou hydrazine-dithiocarbonate
lévulinate (Lev) | Ester 4-oxopentanoïque : orthogonal aux autres esters (sucres, nucléotides) | Pose : acide lévulinique, DCC, DMAP. Retrait : hydrazine acétate, pyridine/AcOH (cyclisation en pyridazinone)
Troc | 2,2,2-Trichloroéthoxycarbonyle (carbonate ou carbamate) | Pose : TrocCl, pyridine. Retrait : Zn/AcOH (β-élimination réductrice) ou Cd/Pb
Alloc | Allyloxycarbonyle (carbonate ou carbamate), orthogonal à Boc et Fmoc | Pose : AllocCl, pyridine ou NaHCO₃. Retrait : Pd(PPh₃)₄ + capteur d'allyle (morpholine, PhSiH₃, dimédone, Bu₃SnH)
benzylidène | Acétal benzylidène : protège les diols 1,3 (4,6-O des hexopyranosides, cycle à six) | Pose : PhCH(OMe)₂ ou PhCHO, CSA ou ZnCl₂. Retrait : H₃O⁺, H₂/Pd ; ouverture régiosélective en éther de benzyle (NaBH₃CN/HCl, DIBAL-H, Et₃SiH/TFA) ; NBS → bromo-benzoate (Hanessian–Hullar)
p-méthoxybenzylidène | Acétal de l'anisaldéhyde : comme benzylidène, mais clivable par oxydation et ouvrable en éther PMB | Pose : p-MeOC₆H₄CH(OMe)₂, CSA ; ou DDQ sur un éther PMB voisin d'un OH (anhydre). Retrait : acide doux, DDQ/H₂O ; DIBAL-H → PMB
cyclohexylidène | Cétal de la cyclohexanone : analogue plus lipophile et un peu plus stable de l'acétonide (diols 1,2 cis) | Pose : cyclohexanone ou son diméthylcétal, TsOH. Retrait : acide aqueux (TFA/H₂O, AcOH 80 %)
carbonate cyclique | Protège les diols 1,2 et 1,3 ; stable aux acides, labile aux bases | Pose : triphosgène ou CDI, pyridine. Retrait : NaOH, K₂CO₃/MeOH ou Ba(OH)₂
silylène (DTBS) | Di-tert-butylsilylène : protège les diols 1,3 (et 1,2) | Pose : tBu₂Si(OTf)₂, 2,6-lutidine. Retrait : HF·pyridine ou TBAF
TIPDS | 1,1,3,3-Tétraisopropyldisiloxanylidène : protège simultanément 3′-OH et 5′-OH des nucléosides (cycle à huit) | Pose : TIPDSCl₂, pyridine ou imidazole. Retrait : TBAF ou HF·Et₃N
orthoester | Orthoester cyclique d'un diol 1,2 ; son ouverture acide donne régiosélectivement le monoester axial | Pose : MeC(OMe)₃ ou HC(OEt)₃, TsOH. Retrait : acide aqueux doux puis base
boronate | Ester boronique cyclique : protection temporaire des diols cis (sucres, catéchols) | Pose : PhB(OH)₂, toluène, élimination d'eau. Retrait : échange avec un diol (propane-1,3-diol), H₂O₂ ou simple hydrolyse
diacétal de butane (Ley) | Butane-2,3-diacétal (BDA) : protège sélectivement les diols 1,2 trans-diéquatoriaux (stabilisé par deux effets anomères) | Pose : butane-2,3-dione, HC(OMe)₃, CSA, MeOH à reflux. Retrait : TFA/H₂O
1,3-dioxane | Acétal cyclique à six chaînons d'un aldéhyde ou d'une cétone (propane-1,3-diol ou néopentylglycol) | Pose : diol, TsOH, Dean–Stark. Retrait : acide aqueux (HCl, TsOH/acétone, PPTS)
1,3-dithiane | Dithioacétal à six chaînons : stable aux acides et bases ; aussi acyl-anion masqué (Corey–Seebach) | Pose : propane-1,3-dithiol, BF₃·OEt₂. Retrait : HgCl₂/CaCO₃, MeI/CaCO₃, NCS/AgNO₃, PIFA, IBX
1,3-dithiolane | Dithioacétal à cinq chaînons : très stable ; désulfuration possible en CH₂ | Pose : éthane-1,2-dithiol, BF₃·OEt₂. Retrait : Hg(II), NBS, I₂/NaHCO₃ ; Ni de Raney → CH₂
N,N-diméthylhydrazone | Protège la cétone et permet l'alkylation en α via l'aza-énolate (Corey–Enders) | Pose : Me₂NNH₂, AcOH. Retrait : NaIO₄ (pH 7), Cu(OAc)₂ aqueux, O₃, ou MeI puis HCl
oxime | Dérivé cristallin stable du carbonyle | Pose : NH₂OH·HCl, pyridine ou NaOAc. Retrait : TiCl₃, NaHSO₃, échange avec l'acide lévulinique, ou oxydants (PCC, O₃)
cyanhydrine silylée | Protège le carbonyle des nucléophiles ; déprotonable (acyl-anion masqué) | Pose : TMSCN, ZnI₂ ou KCN/18-couronne-6. Retrait : TBAF, AgF, ou acide puis base
éther d’énol | Masque une cétone ou un aldéhyde sous forme d'éther d'énol (méthylique, silylé) ; protège aussi un système énone | Pose : HC(OMe)₃/TsOH ; TMSCl/Et₃N ou LDA/TMSCl. Retrait : acide aqueux dilué ; fluorure pour les silylés
esters méthylique | Ester méthylique : protection la plus simple des acides | Pose : CH₂N₂ ou TMSCHN₂ ; MeOH/H⁺ ; MeI/K₂CO₃. Retrait : LiOH (THF/H₂O), NaOH ; LiI/pyridine ou Me₃SnOH pour les cas sensibles
éthylique | Ester éthylique : un peu plus stable que le méthylique | Pose : EtOH/H₂SO₄ ; EtI/K₂CO₃. Retrait : LiOH ou NaOH aqueux
tert-butylique | Ester tert-butylique : résiste aux bases et nucléophiles (encombrement), orthogonal aux esters méthyliques et benzyliques | Pose : isobutène/H₂SO₄, Boc₂O/DMAP, trichloroacétimidate de tBu. Retrait : TFA/CH₂Cl₂, HCl/dioxane, HCO₂H
benzylique | Ester benzylique : retiré en conditions neutres | Pose : BnBr/Cs₂CO₃ ou BnOH/DCC/DMAP. Retrait : H₂, Pd/C ; ou saponification
allylique | Ester allylique : orthogonal à Boc, Fmoc, tBu | Pose : bromure d'allyle/Cs₂CO₃ ou alcool allylique/DCC. Retrait : Pd(PPh₃)₄ + morpholine, pyrrolidine ou PhSiH₃
2-(triméthylsilyl)éthylique (TMSE) | Ester TMSE : retiré par fluorure (β-élimination : éthylène + TMSF) | Pose : Me₃SiCH₂CH₂OH, DCC, DMAP. Retrait : TBAF, THF
trichloroéthylique | Ester 2,2,2-trichloroéthylique | Pose : Cl₃CCH₂OH, DCC. Retrait : Zn/AcOH ou Zn/tampon phosphate
fluorénylméthylique | Ester de 9-fluorénylméthyle (Fm) : base-labile, analogue du Fmoc | Pose : FmOH, DCC, DMAP. Retrait : pipéridine ou Et₂NH (β-élimination, dibenzofulvène)
phénacylique | Ester de phénacyle (Pac) | Pose : PhCOCH₂Br, Et₃N. Retrait : Zn/AcOH, thiophénolate, ou hν
orthoester OBO | Orthoester bicyclique 2,6,7-trioxabicyclo[2.2.2]octane (Corey) : masque totalement l'acide, résiste aux organométalliques et aux bases | Pose : ester de l'oxétanylméthanol (3-méthyl-3-hydroxyméthyloxétane) puis BF₃·OEt₂. Retrait : acide aqueux doux puis base
oxazoline | Oxazoline (Meyers) : protège l'acide des organométalliques et hydrures ; dirige l'ortho-lithiation | Pose : 2-amino-2-méthylpropanol, puis SOCl₂. Retrait : HCl aqueux à chaud, ou MeI puis NaOH
thioester | Thioester (S-éthyle, S-tert-butyle) : acide activé stable ; substrat de Fukuyama et de la ligation native | Pose : thiol, DCC, DMAP. Retrait : Hg(II) ou Ag(I)/H₂O, hydrolyse basique ; transthioestérification
Teoc | 2-(Triméthylsilyl)éthoxycarbonyle (carbamate) | Pose : Teoc-OSu ou Teoc-Cl, base. Retrait : TBAF ou TASF (β-élimination, CO₂) ; TFA
Moc | Méthoxycarbonyle (carbamate de méthyle) : robuste | Pose : ClCO₂Me, base. Retrait : TMSI, KOH à chaud, ou MeLi ; HBr/AcOH
acétyle | Acétamide : très stable, protection quasi permanente d'une amine | Pose : Ac₂O ou AcCl, base. Retrait : HCl 6 M à reflux, KOH à chaud, hydrazine, ou acylase
trifluoroacétyle | Trifluoroacétamide : beaucoup plus labile en milieu basique que l'acétamide | Pose : (CF₃CO)₂O ou CF₃CO₂Et, Et₃N. Retrait : K₂CO₃/MeOH/H₂O, NH₃/MeOH ou NaBH₄
formyle | Formamide (ex. N-formyl-Trp) | Pose : HCO₂H/Ac₂O (anhydride mixte) ou formiate d'éthyle. Retrait : HCl/MeOH, hydrazine, ou pipéridine pour l'indole
benzoyle | Benzamide : protection des amines exocycliques des nucléobases (A, C) | Pose : BzCl, pyridine. Retrait : NH₃ aqueux concentré à 55 °C, ou HCl 6 M à reflux
phtalimide (Phth) | Protège les deux N–H d'une amine primaire (Gabriel ; 2-amino des glucosamines, participant 1,2-trans) | Pose : anhydride phtalique à chaud, ou N-carbéthoxyphtalimide. Retrait : hydrazine (Ing–Manske), éthylènediamine, MeNH₂, ou NaBH₄ puis AcOH
tosyle (Ts) | Tosylamide : très stable (acides, bases, oxydants) ; N–H acide, alkylable | Pose : TsCl, pyridine ou Et₃N. Retrait : Na/NH₃, Na/naphtalène, SmI₂, Mg/MeOH, HBr/AcOH/phénol
nosyle (Ns) | 2- ou 4-Nitrobenzènesulfonamide : alkylable (Fukuyama), retiré en conditions douces | Pose : NsCl, Et₃N ou collidine. Retrait : PhSH + K₂CO₃ (ou HSCH₂CH₂OH/DBU), DMF, via un complexe de Meisenheimer
SES | 2-(Triméthylsilyl)éthanesulfonamide : stable comme un tosyle mais retiré par fluorure | Pose : SESCl, Et₃N. Retrait : CsF (DMF, 95 °C) ou TBAF à chaud
Dde | 1-(4,4-Diméthyl-2,6-dioxocyclohexylidène)éthyle : protection de la chaîne latérale de la lysine, orthogonale à Fmoc et Boc | Pose : 2-acétyldimédone. Retrait : hydrazine 2 % dans le DMF
imine de benzophénone | Protège une amine primaire (esters de glycine : alkylation de O'Donnell) ; substitut d'ammoniac en Buchwald–Hartwig | Pose : Ph₂C=NH (transimination) ou Ph₂C=O/TiCl₄. Retrait : HCl aqueux dilué, acide citrique, ou NH₂OH
azoture comme amine masquée | L'azoture résiste à la plupart des conditions (acides, bases, oxydants, glycosylations) et se réduit en fin de synthèse en amine primaire | Pose : NaN₃ (SN2) ou transfert de diazo (TfN₃, imidazole-1-sulfonyl azoture) sur une amine. Révélation : PPh₃/H₂O, H₂/Pd, thiols
Ts | Tosyle sur l'azote d'indole, pyrrole ou imidazole : attracteur, facilite la lithiation en C2 et stabilise le cycle | Pose : NaH, TsCl. Retrait : NaOH ou KOH/MeOH à chaud, Mg/MeOH, Cs₂CO₃/MeOH, TBAF à reflux
acétamidométhyle (Acm) | Protège le thiol de la cystéine ; stable à TFA et HF | Pose : N-(hydroxyméthyl)acétamide, acide. Retrait : Hg(OAc)₂ ou AgOTf ; I₂ → disulfure directement
disulfure de tert-butyle | Disulfure mixte S–StBu : protège la cystéine, stable aux acides | Pose : via sulfénylation (tBuSH + activation). Retrait : thiols (β-mercaptoéthanol, DTT) ou phosphines (PBu₃, TCEP)
thioacétate | Thiol masqué sous forme de thioester acétique (introduit par SN2 de KSAc ou Mitsunobu avec AcSH) | Retrait : NaOMe/MeOH, NH₃/MeOH, K₂CO₃/MeOH ou LiAlH₄, sous atmosphère inerte
dibromure | Masque un alcène sous forme de dibromure vicinal | Pose : Br₂, CH₂Cl₂, 0 °C. Retrait : Zn/AcOH ou NaI/acétone (élimination anti, alcène régénéré avec rétention globale)
époxyde | Masque un alcène sous forme d'époxyde | Pose : mCPBA. Retrait (désoxygénation) : WCl₆/n-BuLi, Zn/NaI/AcOH, PPh₃ à chaud ou KSeCN
adduit de SO₂ (sulfolène) | Masque un 1,3-diène sous forme de 3-sulfolène (solide stable, alkylable en α) | Pose : SO₂. Retrait : chauffage à 110–130 °C (extrusion chélétropique)
complexe Fe(CO)₃ (diène) | Complexe η⁴-diène–fer tricarbonyle : protège un 1,3-diène de l'hydrogénation, de Diels–Alder, des électrophiles ; contrôle stéréochimique | Pose : Fe₂(CO)₉ ou Fe(CO)₅, chauffage ou hν. Retrait : CAN, Me₃NO, FeCl₃ ou H₂O₂/NaOH
complexe Co₂(CO)₆ (alcyne) | Complexe alcyne–dicobalt hexacarbonyle : protège l'alcyne, coude la géométrie (≈ 140°), stabilise les cations propargyliques (Nicholas) | Pose : Co₂(CO)₈, CH₂Cl₂ ou éther, t.a. Retrait : CAN, Fe(NO₃)₃, Me₃NO, I₂
orthogonalité | Deux groupes sont orthogonaux si chacun peut être retiré sans toucher l'autre, dans n'importe quel ordre | Exemples : Fmoc (base) / tBu (acide) / Alloc (Pd) / Bn (H₂) / silyles (F⁻)
protection temporaire ou permanente | Temporaire : retirée à chaque cycle (Fmoc sur Nα, DMTr en 5′) ; permanente : gardée jusqu'à la déprotection finale (tBu, Bn, chaînes latérales) | La stratégie se choisit pour que les retraits temporaires laissent intacts les groupes permanents
protection sélective d'un alcool primaire | L'alcool primaire, moins encombré, réagit sélectivement avec les réactifs volumineux | TrCl ou DMTrCl/pyridine ; TBDPSCl ou TBSCl/imidazole à froid ; PivCl/pyridine à −20 °C
monoprotection des diols | Protéger un seul hydroxyle d'un diol symétrique | NaH (1 éq.) puis TBSCl ou BnBr (alcoolate monosodé) ; Ag₂O/BnBr ; acétal stannylène (Bu₂SnO) puis électrophile ; ouverture réductrice d'un benzylidène ; enzymes (lipases)
migration de groupes silyle et acyle | En milieu basique, un acyle ou un silyle migre vers un hydroxyle voisin (1,2 ou 1,3), via un intermédiaire cyclique, vers la position la plus stable (souvent primaire) | Acyles : base douce ou pH > 7 ; silyles : NaH, alcoolates, TBAF (apparenté à Brook) ; à surveiller lors des déprotections
groupes photolabiles (o-nitrobenzyle) | Éther, ester ou carbamate d'o-nitrobenzyle clivé par irradiation (transfert de H benzylique vers NO₂, puis fragmentation en o-nitrosobenzaldéhyde) | hν 350–365 nm, sans réactif ; variantes NVOC, nitropipéronyle
groupes « sans trace » | Groupe ou lien dont le retrait ne laisse aucune fonction résiduelle (C–H à la place) : silyles sur arènes, sulfones, lien de Staudinger sans trace | Protodésilylation (TFA, TBAF), désulfonylation réductrice
synthèse sans groupe protecteur | Stratégie visant à éviter toute protection en exploitant la chimiosélectivité intrinsèque des réactifs et l'ordre des étapes (Baran, Trost : économie d'étapes et d'atomes) | Réactions chimiosélectives, biomimétiques, enzymatiques ou en cascade
méthode carbobenzoxy de Bergmann–Zervas | Première synthèse peptidique contrôlée : protection de l'amine en Cbz (Z), couplage, puis retrait par hydrogénolyse sans racémisation | CbzCl, NaOH aqueux ; couplage (chlorure d'acyle, azoture) ; H₂, Pd/C
désacétylation de Zemplén | Sucre per-acétylé → sucre libre par transestérification catalytique | NaOMe (0,05–0,1 éq.), MeOH, t.a. ; neutralisation par résine acide
synthèse d'amines de Fukuyama (nosyle) | Amine primaire → nosylamide → alkylation (RX/K₂CO₃ ou Mitsunobu) → retrait du Ns → amine secondaire pure | NsCl, Et₃N ; ROH, PPh₃, DEAD (ou RX, K₂CO₃, DMF) ; PhSH, K₂CO₃, DMF
acétalisation des sucres | Protection régiosélective des diols : acétone → acétonides sur diols cis 1,2 (cycles à cinq, contrôle thermodynamique : diacétone-glucose) ; benzaldéhyde → benzylidène 4,6 (cycle à six) | Acétone/H₂SO₄ ou 2,2-diméthoxypropane/TsOH ; PhCH(OMe)₂/CSA
méthylation de Haworth et de Purdie | Perméthylation des hydroxyles d'un sucre (détermination de la taille du cycle et des positions de liaison après hydrolyse) | Haworth : Me₂SO₄, NaOH aqueux ; Purdie : MeI, Ag₂O ; moderne : NaH/MeI/DMSO (Hakomori)
`;
