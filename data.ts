export interface DialogueLine {
  id: string;
  speaker: 'Lucía' | 'Carlos';
  textEs: string;
  textAm: string;
}

export interface VocabularyItem {
  es: string;
  am: string;
}

export interface ReadingSentence {
  id: string;
  textEs: string;
  textAm: string;
}

export const dialogueLines: DialogueLine[] = [
  {
    id: 'd1',
    speaker: 'Lucía',
    textEs: 'Carlos, ¿qué harás este fin de semana?',
    textAm: 'Կառլոս, ի՞նչ կանես այս շաբաթավերջին։',
  },
  {
    id: 'd2',
    speaker: 'Carlos',
    textEs: 'Este fin de semana viajaré con mi familia. Iremos a Valencia.',
    textAm: 'Այս շաբաթավերջին ես ընտանիքիս հետ կճանապարհորդեմ։ Մենք կգնանք Վալենսիա։',
  },
  {
    id: 'd3',
    speaker: 'Lucía',
    textEs: '¡Qué bien! ¿Viajaréis en coche o en tren?',
    textAm: 'Ի՜նչ լավ է։ Դուք մեքենայո՞վ կճանապարհորդեք, թե՞ գնացքով։',
  },
  {
    id: 'd4',
    speaker: 'Carlos',
    textEs: 'Viajaremos en tren. Saldremos el sábado por la mañana.',
    textAm: 'Մենք գնացքով կճանապարհորդենք։ Շաբաթ առավոտյան դուրս կգանք։',
  },
  {
    id: 'd5',
    speaker: 'Lucía',
    textEs: '¿Y qué visitaréis allí?',
    textAm: 'Իսկ ի՞նչ կայցելեք այնտեղ։',
  },
  {
    id: 'd6',
    speaker: 'Carlos',
    textEs: 'Visitaremos el centro de la ciudad, caminaremos por la playa y comeremos paella.',
    textAm: 'Մենք կայցելենք քաղաքի կենտրոնը, կքայլենք լողափով և պաեյա կուտենք։',
  },
  {
    id: 'd7',
    speaker: 'Lucía',
    textEs: '¡Qué divertido! Yo también viajaré pronto. Iré a Madrid con mis primos.',
    textAm: 'Ի՜նչ հետաքրքիր է։ Ես նույնպես շուտով կճանապարհորդեմ։ Ես իմ զարմիկների հետ կգնամ Մադրիդ։',
  },
  {
    id: 'd8',
    speaker: 'Carlos',
    textEs: '¿Dónde os alojaréis?',
    textAm: 'Որտե՞ղ կմնաք / կբնակվեք։',
  },
  {
    id: 'd9',
    speaker: 'Lucía',
    textEs: 'Nos alojaremos en un hotel pequeño cerca del centro.',
    textAm: 'Մենք կմնանք քաղաքի կենտրոնի մոտ գտնվող փոքր հյուրանոցում։',
  },
  {
    id: 'd10',
    speaker: 'Carlos',
    textEs: '¿Comprarás recuerdos?',
    textAm: 'Հուշանվերներ կգնե՞ս։',
  },
  {
    id: 'd11',
    speaker: 'Lucía',
    textEs: 'Sí, compraré recuerdos para mi familia y sacaré muchas fotos.',
    textAm: 'Այո, ես հուշանվերներ կգնեմ իմ ընտանիքի համար և շատ նկարներ կանեմ։',
  },
  {
    id: 'd12',
    speaker: 'Carlos',
    textEs: 'Entonces tendrás un viaje muy bonito.',
    textAm: 'Ուրեմն դու շատ գեղեցիկ ճանապարհորդություն կունենաս։',
  },
  {
    id: 'd13',
    speaker: 'Lucía',
    textEs: 'Sí, y cuando vuelva, te contaré todo.',
    textAm: 'Այո, և երբ վերադառնամ, քեզ ամեն ինչ կպատմեմ։',
  },
];

export const vocabularyItems: VocabularyItem[] = [
  { es: '¿Qué harás?', am: 'Ի՞նչ կանես։' },
  { es: 'viajaré', am: 'ես կճանապարհորդեմ' },
  { es: 'iremos', am: 'մենք կգնանք' },
  { es: 'saldremos', am: 'մենք դուրս կգանք' },
  { es: 'visitaremos', am: 'մենք կայցելեք' },
  { es: 'comeremos', am: 'մենք կուտենք' },
  { es: 'compraré', am: 'ես կգնեմ' },
  { es: 'sacaré fotos', am: 'ես նկարներ կանեմ' },
  { es: 'te contaré todo', am: 'ես քեզ ամեն ինչ կպատմեմ' },
];

export const readingSentences: ReadingSentence[] = [
  {
    id: 's1',
    textEs: 'El próximo verano, Ana viajará con su familia a España.',
    textAm: 'Հաջորդ ամառ Անան իր ընտանիքի հետ կճանապարհորդի Իսպանիա։',
  },
  {
    id: 's2',
    textEs: 'Primero, irán a Madrid y visitarán muchos lugares interesantes.',
    textAm: 'Սկզբում նրանք կգնան Մադրիդ և կայցելեն շատ հետաքրքիր վայրեր։',
  },
  {
    id: 's3',
    textEs: 'Verán la Plaza Mayor, caminarán por calles bonitas y probarán comida española.',
    textAm: 'Նրանք կտեսնեն Պլասա Մայորը, կքայլեն գեղեցիկ փողոցներով և կփորձեն իսպանական ուտելիք։',
  },
  {
    id: 's4',
    textEs: 'Después, viajarán a Valencia.',
    textAm: 'Հետո նրանք կճանապարհորդեն Վալենսիա։',
  },
  {
    id: 's5',
    textEs: 'Allí irán a la playa, nadarán en el mar y comerán paella.',
    textAm: 'Այնտեղ նրանք կգնան լողափ, կլողան ծովում և կուտեն պաեյա։',
  },
  {
    id: 's6',
    textEs: 'Ana sacará muchas fotos y comprará pequeños recuerdos para sus amigos.',
    textAm: 'Անան շատ նկարներ կանի և փոքրիկ հուշանվերներ կգնի իր ընկերների համար։',
  },
  {
    id: 's7',
    textEs: 'Por la noche, la familia descansará en el hotel.',
    textAm: 'Երեկոյան ընտանիքը կհանգստանա հյուրանոցում։',
  },
  {
    id: 's8',
    textEs: 'Ana escribirá en su cuaderno todo lo que verá durante el viaje.',
    textAm: 'Անան իր տետրում կգրի այն ամենը, ինչ կտեսնի ճանապարհորդության ընթացքում։',
  },
  {
    id: 's9',
    textEs: 'Ella estará muy feliz, porque conocerá lugares nuevos y aprenderá muchas palabras en español.',
    textAm: 'Նա շատ ուրախ կլինի, որովհետև նոր վայրեր կճանաչի և շատ իսպաներեն բառեր կսովորի։',
  },
  {
    id: 's10',
    textEs: 'Cuando vuelva a casa, contará su viaje a sus compañeros de clase.',
    textAm: 'Երբ նա տուն վերադառնա, իր ճանապարհորդության մասին կպատմի դասընկերներին։',
  },
];

export const textVerbs: VocabularyItem[] = [
  { es: 'viajará', am: 'կճանապարհորդի' },
  { es: 'irán', am: 'կգնան' },
  { es: 'visitarán', am: 'կայցելեն' },
  { es: 'verán', am: 'կտեսնեն' },
  { es: 'caminarán', am: 'կքայլեն' },
  { es: 'probarán', am: 'կփորձեն' },
  { es: 'nadarán', am: 'կլողան' },
  { es: 'comerán', am: 'կուտեն' },
  { es: 'sacará', am: 'նկարներ կանի' },
  { es: 'comprará', am: 'կգնի' },
  { es: 'descansará', am: 'կհանգստանա' },
  { es: 'escribirá', am: 'կգրի' },
  { es: 'estará', am: 'կլինի' },
  { es: 'conocerá', am: 'կճանաչի' },
  { es: 'aprenderá', am: 'կսովորի' },
  { es: 'contará', am: 'կպատմի' },
];

export interface EndingsGameMatch {
  pronoun: string;
  ending: string;
  exampleEs: string;
  exampleAm: string;
}

export const trainGameData: EndingsGameMatch[] = [
  { pronoun: 'Yo', ending: '-é', exampleEs: 'viajaré', exampleAm: 'ես կճանապարհորդեմ' },
  { pronoun: 'Tú', ending: '-ás', exampleEs: 'viajarás', exampleAm: 'դու կճանապարհորդես' },
  { pronoun: 'Él / Ella', ending: '-á', exampleEs: 'viajará', exampleAm: 'նա կճանապարհորդի' },
  { pronoun: 'Nosotros', ending: '-emos', exampleEs: 'viajaremos', exampleAm: 'մենք կճանապարհորդենք' },
  { pronoun: 'Vosotros', ending: '-éis', exampleEs: 'viajaréis', exampleAm: 'դուք կճանապարհորդեք' },
  { pronoun: 'Ellos / Ellas', ending: '-án', exampleEs: 'viajarán', exampleAm: 'նրանք կճանապարհորդեն' },
];

export interface BalloonLevel {
  id: number;
  pronoun: string;
  verb: string;
  verbMeaning: string;
  correctAnswer: string;
  options: string[];
}

export const balloonLevels: BalloonLevel[] = [
  {
    id: 1,
    pronoun: 'Yo',
    verb: 'viajar',
    verbMeaning: 'ճանապարհորդել',
    correctAnswer: 'viajaré',
    options: ['viajaré', 'viajarás', 'viajaremos', 'viajará'],
  },
  {
    id: 2,
    pronoun: 'Tú',
    verb: 'comer',
    verbMeaning: 'ուտել',
    correctAnswer: 'comerás',
    options: ['comeré', 'comerás', 'comerán', 'comeremos'],
  },
  {
    id: 3,
    pronoun: 'Él / Ella',
    verb: 'escribir',
    verbMeaning: 'գրել',
    correctAnswer: 'escribirá',
    options: ['escribiré', 'escribirá', 'escribiremos', 'escribirás'],
  },
  {
    id: 4,
    pronoun: 'Nosotros',
    verb: 'visitar',
    verbMeaning: 'այցելել',
    correctAnswer: 'visitaremos',
    options: ['visitaré', 'visitarás', 'visitaremos', 'visitarán'],
  },
  {
    id: 5,
    pronoun: 'Ellos',
    verb: 'nadar',
    verbMeaning: 'լողալ',
    correctAnswer: 'nadarán',
    options: ['nadará', 'nadaremos', 'nadarán', 'nadaré'],
  },
];

export interface ClassificationVerb {
  id: string;
  word: string;
  isRegular: boolean;
  explanationEs: string;
  explanationAm: string;
  stem: string;
}

export const classificationVerbs: ClassificationVerb[] = [
  {
    id: 'c1',
    word: 'viajará',
    isRegular: true,
    explanationEs: 'Viene de "viajar". El verbo mantiene su infinitivo completo antes del final.',
    explanationAm: 'Կազմված է «viajar» բայից։ Բայի անորոշ ձևը պահպանվում է ամբողջությամբ, և ավելանում է -á վերջավորությունը։',
    stem: 'viajar + á',
  },
  {
    id: 'c2',
    word: 'harás',
    isRegular: false,
    explanationEs: 'Viene de "hacer". Su raíz cambia a "har-" en el futuro.',
    explanationAm: 'Կազմված է «hacer» բայից։ Ապառնի ժամանակում արմատը փոխվում է «har-»-ի և ավելանում է -ás վերջավորությունը։',
    stem: 'har + ás',
  },
  {
    id: 'c3',
    word: 'comeremos',
    isRegular: true,
    explanationEs: 'Viene de "comer". Se añade "-emos" directamente al infinitivo.',
    explanationAm: 'Կազմված է «comer» բայից։ -emos վերջավորությունը ավելանում է ուղղակիորեն բայի անորոշ ուղիղ ձևին։',
    stem: 'comer + emos',
  },
  {
    id: 'c4',
    word: 'tendrás',
    isRegular: false,
    explanationEs: 'Viene de "tener". Su raíz cambia a "tendr-" en el futuro.',
    explanationAm: 'Կազմված է «tener» բայից։ Ապառնի ժամանակում արմատը փոխվում է «tendr-»-ի և ավելանում է -ás:',
    stem: 'tendr + ás',
  },
  {
    id: 'c5',
    word: 'saldremos',
    isRegular: false,
    explanationEs: 'Viene de "salir". Su raíz cambia a "sadr-" con "d" antes de la "r".',
    explanationAm: 'Կազմված է «salir» բայից։ Ապառնի ժամանակում արմատը փոխվում է «saldr-»-ի և ավելանում է -emos:',
    stem: 'saldr + emos',
  },
  {
    id: 'c6',
    word: 'escribirá',
    isRegular: true,
    explanationEs: 'Viene de "escribir". El infinitivo entero se mantiene con la desinencia "-á".',
    explanationAm: 'Կազմված է «escribir» բայից։ Անորոշ ձևը լիովին պահպանվում է, և ավելանում է -á վերջավորությունը։',
    stem: 'escribir + á',
  },
  {
    id: 'c7',
    word: 'dirá',
    isRegular: false,
    explanationEs: 'Viene de "decir". Se transforma en "dir-" en el futuro.',
    explanationAm: 'Կազմված է «decir» բայի հիման վրա։ Ապառնի ժամանակում հիմքը դառնում է «dir-» և ավելանում է -á:',
    stem: 'dir + á',
  },
  {
    id: 'c8',
    word: 'podremos',
    isRegular: false,
    explanationEs: 'Viene de "poder". Pierde la "e" de la terminación transformándose en "podr-".',
    explanationAm: 'Կազմված է «poder» բայից։ Ունենում է կրճատում, հիմքը դառնում է «podr-» և ավելանում է -emos:',
    stem: 'podr + emos',
  },
];

export interface SentencePuzzle {
  id: number;
  sentenceAm: string;
  wordsEs: string[];
  correctOrder: string[];
}

export const sentencesPuzzles: SentencePuzzle[] = [
  {
    id: 1,
    sentenceAm: 'Այս շաբաթավերջին ես ընտանիքիս հետ կճանապարհորդեմ։',
    wordsEs: ['fin', 'viajaré', 'con', 'Este', 'mi', 'familia.', 'semana', 'de'],
    correctOrder: ['Este', 'fin', 'de', 'semana', 'viajaré', 'con', 'mi', 'familia.'],
  },
  {
    id: 2,
    sentenceAm: 'Մենք կգնանք Վալենսիա գնացքով։',
    wordsEs: ['Valencia', 'Iremos', 'en', 'tren.', 'a'],
    correctOrder: ['Iremos', 'a', 'Valencia', 'en', 'tren.'],
  },
  {
    id: 3,
    sentenceAm: 'Անան շատ նկարներ կանի Իսպանիայում։',
    wordsEs: ['Ana', 'muchas', 'en', 'España.', 'fotos', 'sacará'],
    correctOrder: ['Ana', 'sacará', 'muchas', 'fotos', 'en', 'España.'],
  },
  {
    id: 4,
    sentenceAm: 'Նրանք կկերտեն գեղեցիկ ապագա։ (Նրանք պաեյա կուտեն լողափում։)',
    wordsEs: ['comerán', 'Ellos', 'en', 'la', 'paella', 'playa.'],
    correctOrder: ['Ellos', 'comerán', 'paella', 'en', 'la', 'playa.'],
  },
];



export interface MillionaireQuestion {
  id: number;
  question: string;         // Spanish question or description
  contextAm: string;        // Armenian hint/explanation
  options: string[];        // 4 options
  correctAnswer: string;    // correct option string
}

export const millionaireQuestions: MillionaireQuestion[] = [
  {
    id: 1,
    question: "Yo ________ con mi profesor mañana.",
    contextAm: "hablar (խոսել) բայի ճիշտ ապառնի ձևը Yo դերանվան համար.",
    options: ["hablaré", "hablarás", "hablaréis", "hablará"],
    correctAnswer: "hablaré"
  },
  {
    id: 2,
    question: "Nosotros ________ juntos por Europa el próximo mes.",
    contextAm: "viajar (ճանապարհորդել) բայի ճիշտ ապառնի ձևը Nosotros դերանվան համար.",
    options: ["viajaré", "viajaremos", "viajarás", "viajarán"],
    correctAnswer: "viajaremos"
  },
  {
    id: 3,
    question: "¿Qué terminación le corresponde a 'Tú' en el Futuro Simple?",
    contextAm: "Ի՞նչ վերջավորություն է ստանում 'Tú'-ն ապառնի ժամանակում.",
    options: ["-é", "-á", "-ás", "-án"],
    correctAnswer: "-ás"
  },
  {
    id: 4,
    question: "¿Cuál es la raíz irregular en futuro para el verbo 'hacer' (անել)?",
    contextAm: "Գտեք 'hacer' անկանոն բայի ապառնիի ճիշտ արմատը.",
    options: ["hac-", "hic-", "har-", "has-"],
    correctAnswer: "har-"
  },
  {
    id: 5,
    question: "¿Cuál es la opción correcta para: 'Ellos vivirán'?",
    contextAm: "Գտեք նախադասության ճիշտ հայերեն թարգմանությունը.",
    options: ["Նրանք կապրեն", "Ես կապրեմ", "Մենք կապրեինք", "Դուք կապրեք"],
    correctAnswer: "Նրանք կապրեն"
  },
  {
    id: 6,
    question: "¿Cuál es el futuro del verbo 'tener' (ունենալ) para 'Yo'?",
    contextAm: "Գտեք 'tener' բայի ճիշտ ապառնի ձևը Yo դերանվանի համար.",
    options: ["teneré", "tendré", "tubré", "tiene"],
    correctAnswer: "tendré"
  },
  {
    id: 7,
    question: "Vosotros ________ una paella muy rica en Valencia.",
    contextAm: "comer (ուտել) բայի ճիշտ ապառնի ձևը Vosotros դերանվան համար.",
    options: ["comeréis", "comeremos", "comerán", "comeré"],
    correctAnswer: "comeréis"
  },
  {
    id: 8,
    question: "¿Cuál es la raíz irregular del verbo 'poder' (կարողանալ) en el Futuro Simple?",
    contextAm: "Գտեք 'poder' բայի ճիշտ ապառնիի արմատը.",
    options: ["pod-", "pud-", "podr-", "podre-"],
    correctAnswer: "podr-"
  },
  {
    id: 9,
    question: "'Mañana tú ganarás el premio'. ¿Qué significa 'ganarás'?",
    contextAm: "Ի՞նչ է նշանակում 'ganarás' բառը.",
    options: ["հաղթում ես", "կհաղթես", "հաղթեցիր", "պիտի հաղթեիր"],
    correctAnswer: "կհաղթես"
  },
  {
    id: 10,
    question: "¿Cuál es el futuro de 'querer' (ուզենալ/ցանկանալ) para 'Nosotros'?",
    contextAm: "Գտեք 'querer' բայի ճիշտ ապառնի ձևը Nosotros-ի համար.",
    options: ["quereremos", "querré", "querremos", "quieremos"],
    correctAnswer: "querremos"
  },
  {
    id: 11,
    question: "¿Cuál de estos verbos es REGULAR en el Futuro Simple?",
    contextAm: "Ո՞ր բայն է կանոնավոր ապառնի ժամանակում.",
    options: ["decir", "hacer", "hablar", "salir"],
    correctAnswer: "hablar"
  },
  {
    id: 12,
    question: "'El próximo año nosotros (saber) más español'. Llena el espacio.",
    contextAm: "Լրացրեք բաց թողնված տեղը saber (իմանալ) բայի ճիշտ ապառնի ձևով.",
    options: ["sabremos", "saberemos", "sabrán", "sabré"],
    correctAnswer: "sabremos"
  },
  {
    id: 13,
    question: "¿Cuál es la conjugación de 'decir' (ասել) para 'Yo'?",
    contextAm: "Գտեք 'decir' բայի ճիշտ ապառնի ձևը Yo-ի համար.",
    options: ["deciré", "diré", "decré", "dirá"],
    correctAnswer: "diré"
  },
  {
    id: 14,
    question: "¿Cuál es el significado de: 'Mañana saldré temprano'?",
    contextAm: "Գտեք նախադասության ճիշտ հայերեն թարգմանությունը.",
    options: ["Վաղը ես ուշ կգամ", "Վաղը ես շուտ դուրս կգամ", "Ես երեկ շուտ եմ դուրս եկել", "Դուք վաղը շուտ դուրս կգաք"],
    correctAnswer: "Վաղը ես շուտ դուրս կգամ"
  },
  {
    id: 15,
    question: "¿Qué significa 'habrá' en español?",
    contextAm: "Գտեք 'habrá' բառի ճիշտ հայերեն նշանակությունը.",
    options: ["կլինի / կլինեն (հանդիսանում է haber-ի ապառնին)", "նա էր", "նրանք կգնան", "ես ունեմ"],
    correctAnswer: "կլինի / կլինեն (հանդիսանում է haber-ի ապառնին)"
  }
];

