// Relie les réactions citées dans la fiche de référence (data/reference.js) aux fiches détaillées de l'app.
// Clé : nom tel que cité, sans parenthèses ni accents. « nom@X » limite le lien à la section (ou partie) X.
import { REF_SECTIONS } from './reference.js';

const LINKS = `
sn2 inversion de walden=sn2 | sn1 solvolyse=sn1 | williamson=williamson | mitsunobu=mitsunobu | appel=appel
tosylation/mesylation/triflation puis deplacement=tosylation | ouverture d'epoxydes=epoxyde-ouverture | gabriel=gabriel
participation de groupe voisin=anchimerique | e2=e2 | e1=e1 | e1cb=e1cb | deshydratation des alcools=e1 | deshydrohalogenation=e2
elimination de hofmann=hofmann-elimination | hofmann@A9=hofmann-elimination | hydrohalogenation=hydrohalogenation | regle de markovnikov=hydrohalogenation
hydratation acide=hydratation | hydroboration-oxydation=hydroboration | hydroboration=hydroboration | dihalogenation=bromation-alcene
formation d'halohydrines=halohydrine | epoxydation=epoxydation | prilezhaev=epoxydation | dihydroxylation syn=dihydroxylation | upjohn=dihydroxylation
ozonolyse=ozonolyse | lemieux-johnson=ozonolyse | lindlar=hydrogenation-alcynes | hydrogenation partielle=hydrogenation-alcynes | alcyne → alcene e=hydrogenation-alcynes
alcene et alcyne → alcane=hydrogenation-alcenes | wilkinson@B5=hydrogenation-alcenes | alkylation des acetylures=alkylation-alcynures | alkylation des alcynes terminaux=alkylation-alcynures
nitration=nitration | alkylation et acylation de friedel-crafts=fc-acylation | friedel-crafts=fc-alkylation | snar=snar | reactif de sanger=snar
sandmeyer=sandmeyer | diazotation=sandmeyer | balz-schiemann=sandmeyer | grignard=grignard | organolithiens=grignard | amide de weinreb=weinreb | weinreb=weinreb | cetones de weinreb=weinreb
aldolisation=aldol | addition et condensation aldoliques=aldol | aldol croise=aldol | claisen-schmidt=aldol | claisen@C=claisen-condensation | dieckmann=claisen-condensation | claisen croisee=claisen-condensation
alkylation des enolates=enolate-alkylation | synthese malonique=malonique | krapcho=malonique | michael=michael | annelation de robinson=robinson | robinson@C=robinson
knoevenagel=knoevenagel | wittig=wittig | horner-wadsworth-emmons=hwe | fischer-speier=esterification | saponification=saponification
swern=swern | parikh-doering=swern | dess-martin=dess-martin | jones=jones | pinnick=pinnick | baeyer-villiger=baeyer-villiger | epoxydation de sharpless=sharpless
wacker-tsuji=wacker | wacker=wacker | nabh₄=nabh4 | lialh₄=lialh4 | dibal-h=dibal | dibal-h sur ester ou nitrile a −78 °c=dibal | luche=luche
wolff-kishner=wolff-kishner | clemmensen=wolff-kishner | birch=birch | pinacolique=pinacolique | semi-pinacolique=pinacolique | wagner-meerwein=wagner-meerwein | beckmann=beckmann
claisen@E=claisen-rearr | johnson-claisen=claisen-rearr | ireland-claisen=claisen-rearr | eschenmoser-claisen=claisen-rearr | cope@E=cope | oxy-cope et oxy-cope anionique=cope
curtius=curtius | hofmann@E=hofmann-rearr | isomerisation « zipper » des alcynes=kapa-zipper | diels-alder=diels-alder | regles d'alder=diels-alder
suzuki-miyaura=suzuki | suzuki=suzuki | heck=heck | sonogashira=sonogashira | stille=stille | negishi=negishi | buchwald-hartwig=buchwald-hartwig | tsuji-trost=tsuji-trost
metathese cyclisante=rcm | metathese=rcm | mecanisme de chauvin=rcm | croisee@D4=metathese-croisee
tms@G=silyle | tes@G=silyle | tbs@G=silyle | tips@G=silyle | tbdps@G=silyle | mom@G=thp-mom | thp@G=thp-mom | benzyle@G=benzyle | pmb@G=benzyle
boc@G=boc | cbz@G=cbz | fmoc@G=fmoc | acetonide@G=acetal | 1,3-dioxolane@G=acetal | acetal dimethylique@G=acetal | hemiacetals et acetals=acetal
halogenation radicalaire des alcanes=halogenation-radicalaire | wohl-ziegler=wohl-ziegler | barton-mccombie=barton-mccombie | cyclisations radicalaires=cyclisation-radicalaire
addition de hbr anti-markovnikov=hbr-radicalaire | addition radicalaire de hbr=hbr-radicalaire | couplage peptidique=amide-coupling | amination reductrice=amination-reductrice
cuaac=cuaac | cycloaddition azoture-alcyne=cuaac | huisgen=cuaac | nitro → amine=nitro-reduction | bechamp=nitro-reduction | zinin=nitro-reduction
assistance anchimerique=anchimerique | michaelis-arbuzov=hwe | hydratation=hydratation | transposition allylique=wohl-ziegler | cyanhydrines=aldol
mannich=mannich | henry=henry | strecker=strecker | cannizzaro=cannizzaro | reformatsky=reformatsky | benzoine=benzoine
corey-chaykovsky=corey-chaykovsky | johnson-corey-chaykovsky=corey-chaykovsky | stork=stork-enamine | enamines de stork=stork-enamine
peterson=peterson | julia=julia-kocienski | julia-kocienski=julia-kocienski | julia-lythgoe=julia-kocienski | corey-fuchs=corey-fuchs
morita-baylis-hillman=baylis-hillman | baylis-hillman=baylis-hillman | finkelstein=finkelstein | reaction haloforme=haloforme | haloforme=haloforme
lieben=haloforme | iodoforme=haloforme | hell-volhard-zelinsky=hvz | vilsmeier-haack=vilsmeier | oxymercuration- demercuration=oxymercuration
alcoxymercuration=oxymercuration | hofmann-sand=oxymercuration | simmons-smith=simmons-smith | cyclopropanation=simmons-smith
pcc=pcc | corey-suggs=pcc | meerwein-ponndorf-verley=mpv | oppenauer=mpv | corey-bakshi-shibata=cbs | cbs=cbs | corey-itsuno=cbs | reduction cbs=cbs
favorskii=favorskii | nazarov=nazarov | fischer@H2=fischer-indole | paal-knorr=paal-knorr | pictet-spengler=pictet-spengler
azoture → amine=staudinger | staudinger=staudinger | steglich=steglich | ritter=ritter | kumada-corriu=kumada
hantzsch=hantzsch | skraup=skraup | doebner-miller=skraup | bischler-napieralski=bischler-napieralski | biginelli=biginelli | passerini=passerini | ugi=ugi
pauson-khand=pauson-khand | [2+2+1]=pauson-khand | mcmurry=mcmurry | ullmann=ullmann | ullmann-goldberg=ullmann | chan-lam=chan-lam | chan-evans-lam=chan-lam
glaser=glaser | hay=glaser | eglinton=glaser | hiyama=hiyama | hiyama-denmark=hiyama | stetter=stetter | prins=prins | cyclisation de prins=prins | minisci=minisci
shapiro=shapiro | bamford-stevens=shapiro | arndt-eistert=arndt-eistert | wolff=arndt-eistert | schmidt=schmidt | lossen=lossen | pummerer=pummerer
chugaev=chugaev | cope@A9=cope-elimination | hunsdiecker=hunsdiecker | borodin=hunsdiecker | cristol-firth=hunsdiecker | giese=giese | addition de giese=giese
addition radicalaire de giese=giese | reimer-tiemann=reimer-tiemann | kolbe-schmitt=kolbe-schmitt | dakin=dakin | rosenmund=rosenmund
bouveault-blanc=bouveault-blanc | eschweiler-clarke=eschweiler-clarke
mukaiyama@C=mukaiyama-aldol | evans=evans-aldol | oxazolidinones d'evans=evans-aldol | tishchenko=tishchenko | darzens@C=darzens
thorpe et thorpe-ziegler=thorpe-ziegler | thorpe-ziegler=thorpe-ziegler | thorpe=thorpe-ziegler | condensation acyloine=acyloine | acyloine=acyloine
perkin=perkin | stobbe=stobbe | acide benzilique=benzilique | benzilique=benzilique | tebbe=tebbe | kulinkovich=kulinkovich
hosomi-sakurai=sakurai | sakurai=sakurai | nozaki-hiyama-kishi=nhk | friedlander=friedlander | knorr@H2=knorr-pyrrole
thiazoles de hantzsch=hantzsch-thiazole | oxazoles de robinson-gabriel=robinson-gabriel | robinson-gabriel=robinson-gabriel
gattermann-koch=gattermann-koch | elimination-addition=benzyne | chichibabin=chichibabin | tiffeneau-demjanov=tiffeneau-demjanov
wittig [2,3]=wittig-23 | mislow-evans=mislow-evans | overman=overman | meyer-schuster=meyer-schuster | meyer-schuster catalysee=meyer-schuster
decarboxylation de barton=barton-decarboxylation | barton@A9=barton-decarboxylation | hofmann-loffler-freytag=hlf | norrish i et ii=norrish | norrish=norrish
paterno-buchi=paterno-buchi | oxetanes par paterno-buchi=paterno-buchi | jacobsen-katsuki=jacobsen-epoxydation | epoxydation de jacobsen=jacobsen-epoxydation
`;

/** Clé de comparaison d'un nom de réaction. */
export function rxKey(s) {
  let t = String(s).trim();
  for (let guard = 0; guard < 3 && t.endsWith(')'); guard++) {
    let depth = 0, i = t.length - 1;
    for (; i >= 0; i--) { if (t[i] === ')') depth++; else if (t[i] === '(') { depth--; if (depth === 0) break; } }
    if (i <= 0) break;
    t = t.slice(0, i).trim();
  }
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[–—]/g, '-').replace(/’/g, "'").replace(/\s+/g, ' ');
}

const map = new Map();
for (const pair of LINKS.split(/[|\n]/)) {
  const [k, id] = pair.split('=').map((x) => x.trim());
  if (k && id) map.set(k, id);
}
export const LINK_TARGETS = [...new Set(map.values())];

/** Identifiant de la fiche détaillée correspondant à une réaction citée, ou null. */
export function linkFor(item, code) {
  const k = rxKey(item);
  return map.get(`${k}@${code}`) || map.get(`${k}@${code[0]}`) || map.get(k) || null;
}

/** Index des réactions (Liste 1 de la fiche de référence), prêt à afficher. */
export const RX_INDEX = REF_SECTIONS.filter((s) => s.list === 1).map((s) => ({
  code: s.code, title: s.title,
  groups: s.groups.map((g) => {
    let label = g.label, items = g.items;
    const m = /^([A-Z]) : (.*)$/.exec(items[0] || '');
    if (s.code === 'I' && m) { label = m[1]; items = [m[2], ...items.slice(1)]; }
    return { label, items: items.map((name) => ({ name, card: linkFor(name, s.code) })) };
  }),
}));
