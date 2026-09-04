/* ==========================================================================
   givens.js — Irvin Yalom's four ultimate concerns.

   The structural equivalent of the CBT roadmap's six stages, but the content
   is not a curriculum: these are conditions, not levels. Every translatable
   field is a { ka, en } pair, resolved by ET.i18n.pick().
   ========================================================================== */

import type { Given } from '../models';

export const GIVENS: Given[] = [
  {
    id: 'death',
    order: 1,
    icon: 'hourglass',
    image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0',
    imageAlt: {
      ka: 'ბნელი, თითქმის უფორმო სივრცე, სადაც სინათლე ძლივს აღწევს',
      en: 'A dark, almost formless space that light barely reaches'
    },
    title: { ka: 'სიკვდილი', en: 'Death' },
    original: 'death · Tod',
    tagline: {
      ka: 'ჩვენ ვართ და ერთ დღეს აღარ ვიქნებით. ეს იცის ყველამ და თითქმის არავინ იცის მართლა.',
      en: 'We are, and one day we will not be. Everyone knows this, and almost no one truly knows it.'
    },
    definition: {
      ka: 'სიკვდილის შესახებ ცოდნა ერთადერთი ცოდნაა, რომელიც ყველა ადამიანს თანაბრად აქვს და თითქმის ყველა თანაბრად გაურბის. ეგზისტენციალური თერაპია არ ეპატიჟება პაციენტს სიკვდილზე ფიქრისკენ სევდის გამო — არამედ იმიტომ, რომ სიკვდილის გაცნობიერება სიცოცხლეს აბრუნებს. იალომი წერდა: „სიკვდილის ფიზიკურობა გვანადგურებს, სიკვდილის იდეა კი გვიხსნის".',
      en: 'The knowledge of death is the one piece of knowledge every person holds equally, and nearly everyone flees equally. Existential therapy does not invite someone toward death out of morbidity, but because awareness of death gives life back. As Yalom put it: the physicality of death destroys us, the idea of death saves us.'
    },
    manifest: {
      ka: [
        'პანიკური შეტევები, რომლებიც ღამით იწყება და სხეულს ეხება — გული, სუნთქვა, გულისცემა.',
        'ჰიპოქონდრია და მუდმივი სამედიცინო შემოწმებები, რომლებიც არასდროს აწყნარებს.',
        'უეცარი კრიზისი მნიშვნელოვან ასაკობრივ ზღვართან — ორმოცდაათი, სამოცი, პენსია.',
        'ახლობლის გარდაცვალების შემდეგ არა მხოლოდ მწუხარება, არამედ საკუთარი სასრულობის უცებ დანახვა.',
        'დიაგნოზი, რომელმაც აბსტრაქტული ცოდნა უეცრად კონკრეტულად აქცია.'
      ],
      en: [
        'Panic attacks that begin at night and settle in the body — the heart, the breath, the pulse.',
        'Health anxiety and repeated medical checks that never quite settle anything.',
        'A sudden crisis at a threshold age: fifty, sixty, retirement.',
        'After a bereavement, not only grief but the abrupt sight of one’s own finitude.',
        'A diagnosis that turns abstract knowledge concrete overnight.'
      ]
    },
    defenses: {
      ka: [
        'განსაკუთრებულობის რწმენა (specialness) — „სხვებს ემართებათ, მე არა".',
        'საბოლოო მხსნელის რწმენა (ultimate rescuer) — ვიღაც ან რაღაც გადამარჩენს: ექიმი, პარტნიორი, ღმერთი, სისტემა.',
        'შეპყრობილი საქმიანობა, რომელიც სიჩუმეს არ ტოვებს.',
        'ყოველგვარი დაბერების ნიშნის ბრძოლით უარყოფა.'
      ],
      en: [
        'A belief in one’s own specialness — "it happens to others, not to me".',
        'A belief in an ultimate rescuer — a doctor, a partner, God, a system that will intervene.',
        'Compulsive activity that leaves no silence.',
        'The effortful denial of every sign of ageing.'
      ]
    },
    stance: {
      ka: 'თერაპევტი არ ამშვიდებს და არ ეთანხმება თავდაცვას. ის რჩება ოთახში მაშინაც, როცა თემა აუტანელი ხდება — და სწორედ ეს დარჩენა არის ჩარევა. კითხვა „რა შეიცვლებოდა თქვენს ცხოვრებაში, ეს ცოდნა რომ არ დაგევიწყებინათ?" უფრო ღრმაა, ვიდრე ნებისმიერი დამამშვიდებელი სიტყვა.',
      en: 'The therapist neither reassures nor colludes with the defence. They stay in the room when the subject becomes unbearable — and that staying is itself the intervention. The question "what would change in your life if you did not forget this?" goes deeper than any comfort.'
    },
    voices: {
      ka: [
        '„ღამით ვიღვიძებ და მესმის, რომ ერთ დღეს ეს ყველაფერი დამთავრდება. მერე ვდგები და ტელევიზორს ვრთავ."',
        '„დიაგნოზის შემდეგ მივხვდი, რომ ორმოცი წელი ისე ვცხოვრობდი, თითქოს დრო უსასრულო იყო."'
      ],
      en: [
        '"I wake in the night and understand that one day all of this ends. Then I get up and put the television on."',
        '"After the diagnosis I realised I had lived forty years as though time were endless."'
      ]
    }
  },

  {
    id: 'freedom',
    order: 2,
    icon: 'door-open',
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840',
    imageAlt: {
      ka: 'თეთრი თაღოვანი დერეფანი, რომელიც სიღრმეში მიდის, საფეხურებით',
      en: 'A white arched corridor receding into depth, with steps'
    },
    title: { ka: 'თავისუფლება და პასუხისმგებლობა', en: 'Freedom and responsibility' },
    original: 'freedom · Freiheit',
    tagline: {
      ka: 'ჩვენ ვართ საკუთარი ცხოვრების ავტორები. ეს არ არის შვება — ეს არის ტვირთი.',
      en: 'We are the authors of our own lives. This is not a relief. It is a weight.'
    },
    definition: {
      ka: 'ეგზისტენციალურ აზრში თავისუფლება არ ნიშნავს, რომ ყველაფერი შეგვიძლია. ის ნიშნავს, რომ არ არსებობს მზა საფუძველი, რომელზეც ჩვენი ცხოვრება დგას — ჩვენვე ვქმნით მას ყოველი არჩევანით. სარტრი ამბობდა, რომ ადამიანი „განწირულია თავისუფლებისთვის" (condamné à être libre). სწორედ ამიტომ თავისუფლება შფოთვას ბადებს და არა სიხარულს: თუ მე ვირჩევ, მაშინ მე ვარ პასუხისმგებელი.',
      en: 'In existential thought freedom does not mean we can do anything. It means there is no ready-made ground beneath a life — we make it with every choice. Sartre wrote that a person is "condemned to be free". This is why freedom produces anxiety rather than joy: if I choose, then I am answerable.'
    },
    manifest: {
      ka: [
        'გადაწყვეტილების პარალიზება — თვეები ან წლები ერთსა და იმავე გზაჯვარედინზე.',
        'მუდმივი გრძნობა, რომ „ცხოვრება ჩემს გარეშე ხდება".',
        'ბრალის გადატანა სხვებზე, გარემოებებზე, წარსულზე — თითქმის დამაჯერებლად.',
        'იმპულსური, დაუსაბუთებელი გადაწყვეტილებები, რომლებიც აირჩევენ, ოღონდ არ აიღონ პასუხისმგებლობა არჩევანზე.',
        'ეგზისტენციალური დანაშაული — გრძნობა, რომ არ იცხოვრეთ ის ცხოვრება, რომელიც შეგეძლოთ.'
      ],
      en: [
        'Decisional paralysis — months or years at the same fork.',
        'A persistent sense that "life is happening without me".',
        'Displacing responsibility onto others, circumstances, the past — almost convincingly.',
        'Impulsive, ungrounded decisions that choose precisely so as not to own the choice.',
        'Existential guilt: the sense of not having lived the life one could have lived.'
      ]
    },
    defenses: {
      ka: [
        'ცუდი რწმენა (mauvaise foi) — თავის დარწმუნება, რომ არჩევანი არ არსებობდა.',
        'პასუხისმგებლობის დელეგირება ავტორიტეტზე: ექიმზე, ორგანიზაციაზე, პარტნიორზე, თერაპევტზეც კი.',
        'გადავადება, როგორც არჩევანის მუდმივი გადადება მომავალში.',
        'იმსხვერპლების პოზიცია, რომელიც რეალურ ტანჯვას იყენებს პასუხისმგებლობის ასაცილებლად.'
      ],
      en: [
        'Bad faith (mauvaise foi) — persuading oneself that there was no choice.',
        'Delegating responsibility to an authority: a doctor, an institution, a partner, even the therapist.',
        'Procrastination as the permanent deferral of choosing.',
        'A victim position that uses real suffering to avoid answerability.'
      ]
    },
    stance: {
      ka: 'თერაპევტი არ იძლევა რჩევას — რჩევა ხომ სწორედ იმ პასუხისმგებლობას ართმევს კლიენტს, რომელიც მისი აღდგენის გზაა. სამაგიეროდ ის დაბეჯითებით და ნაზად აბრუნებს ავტორობას: „შევნიშნე, რომ თქვით — მოხდა. ვინ იყო იმ დროს იქ?"',
      en: 'The therapist does not advise — advice takes away precisely the responsibility whose recovery is the work. Instead they return authorship, persistently and gently: "I notice you said it happened. Who was there at the time?"'
    },
    voices: {
      ka: [
        '„ორი წელია ვერ ვწყვეტ. ვამბობ, რომ პირობები არაა შესაფერისი, მაგრამ ვიცი, რომ ეს არ არის მთელი სიმართლე."',
        '„ცხოვრება ისე ჩამიარა, თითქოს ვიღაცის გეგმა შემესრულებინა. მაგრამ ხელს ხომ მე ვაწერდი."'
      ],
      en: [
        '"Two years and I cannot decide. I say the conditions are not right, but I know that is not the whole truth."',
        '"My life went by as though I were carrying out someone else’s plan. But it was my hand signing."'
      ]
    }
  },

  {
    id: 'isolation',
    order: 3,
    icon: 'waves',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
    imageAlt: {
      ka: 'წყლის ზედაპირი მინავლებულ შუქზე, ჰორიზონტის ვიწრო ზოლით',
      en: 'A water surface in low light, with a narrow band of horizon'
    },
    title: { ka: 'იზოლაცია', en: 'Isolation' },
    original: 'existential isolation',
    tagline: {
      ka: 'რაც არ უნდა ახლოს ვიყოთ, უფსკრული ორ ცნობიერებას შორის ვერ ივსება.',
      en: 'However close we come, the gap between two consciousnesses cannot be filled.'
    },
    definition: {
      ka: 'იალომი განასხვავებს სამ იზოლაციას: ინტერპერსონალურს (მარტოობა სხვა ადამიანებისგან), ინტრაპერსონალურს (გაწყვეტა საკუთარი ნაწილებისგან) და ეგზისტენციალურს — ის უფსკრული, რომელიც ყოველ ადამიანს სხვა ადამიანისგან საბოლოოდ აშორებს. ეს მესამე არ იკურნება ურთიერთობით. მაგრამ სწორედ მისი აღიარება ხდის ნამდვილ შეხვედრას შესაძლებელს.',
      en: 'Yalom distinguishes three isolations: interpersonal (loneliness from others), intrapersonal (cut off from parts of oneself), and existential — the gulf that finally separates any person from any other. The third is not cured by relationship. But acknowledging it is what makes genuine encounter possible.'
    },
    manifest: {
      ka: [
        'მარტოობა ურთიერთობის შიგნით — ქორწინებაში, ოჯახში, კოლექტივში.',
        'ურთიერთობათა სწრაფი მონაცვლეობა, სადაც არცერთი არ ღრმავდება.',
        'შერწყმის მოთხოვნილება, რომელიც პარტნიორს სუნთქვას უკარგავს.',
        'გრძნობა, რომ „მე რომ ვინმემ ნამდვილად გამიგოს, ვერ გაუძლებს".',
        'თავის დაცვა სიახლოვისგან სიმართლის მოჩვენებითი გაზიარებით.'
      ],
      en: [
        'Loneliness inside a relationship — in a marriage, a family, a team.',
        'A rapid succession of relationships, none of which deepens.',
        'A hunger for fusion that leaves the partner no air.',
        'The sense that "if anyone really understood me, they could not bear it".',
        'Defending against closeness by performing a kind of honesty.'
      ]
    },
    defenses: {
      ka: [
        'შერწყმა (fusion) — საკუთარი საზღვრების გაქრობა სხვაში, რომ მარტოობა აღარ იგრძნოს.',
        'კომპულსიური სექსუალობა ან მუდმივი დადასტურების ძებნა.',
        'სრული თვითკმარობის პოზა, რომელიც სიახლოვეს წინასწარ გამორიცხავს.',
        'ურთიერთობის შენარჩუნება ფუნქციის დონეზე — ვინც სასარგებლოა, ის უსაფრთხოა.'
      ],
      en: [
        'Fusion — dissolving one’s own boundaries into another so as not to feel alone.',
        'Compulsive sexuality, or an endless search for confirmation.',
        'A pose of complete self-sufficiency that rules out closeness in advance.',
        'Keeping relationships at the level of function — whoever is useful is safe.'
      ]
    },
    stance: {
      ka: 'თერაპია აქ თვითონ ხდება ინსტრუმენტი. თერაპიული ურთიერთობა არის ადგილი, სადაც ორი ადამიანი ერთმანეთს ხვდება იმის ცოდნით, რომ სრულად ვერასდროს შეერწყმებიან — და მაინც ხვდებიან. იალომი ამას „შეხვედრას" (encounter) უწოდებდა. თერაპევტი აქ არ იმალება ტექნიკის უკან.',
      en: 'Here the therapy itself becomes the instrument. The therapeutic relationship is a place where two people meet in the knowledge that they can never fully merge — and meet anyway. Yalom called this encounter. The therapist does not hide behind technique.'
    },
    voices: {
      ka: [
        '„ოცდაორი წელია ერთად ვართ. საღამოობით ერთ ოთახში ვსხედვართ და თითოეული თავის ცხოვრებაშია."',
        '„ბევრი ხალხია ჩემს გარშემო. მაგრამ თუ ერთ დღეს არ ჩავიდე, ვერავინ შეამჩნევს."'
      ],
      en: [
        '"Twenty-two years together. In the evenings we sit in the same room and each of us is in a separate life."',
        '"There are plenty of people around me. But if I did not turn up one day, no one would notice."'
      ]
    }
  },

  {
    id: 'meaninglessness',
    order: 4,
    icon: 'cloud',
    image: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5',
    imageAlt: {
      ka: 'ღრუბლების ფენა ზემოდან დანახული, უსასრულო და უფორმო',
      en: 'A layer of cloud seen from above, endless and without form'
    },
    title: { ka: 'უაზრობა', en: 'Meaninglessness' },
    original: 'meaninglessness · Sinnlosigkeit',
    tagline: {
      ka: 'თუ ჩვენ ვკვდებით, თუ ჩვენვე ვქმნით საკუთარ ცხოვრებას და თუ საბოლოოდ მარტო ვართ — მაშინ რა აზრი აქვს ამ ყველაფერს?',
      en: 'If we die, if we make our own lives, and if we are finally alone — then what is any of it for?'
    },
    definition: {
      ka: 'ეს მეოთხე მოცემულობა პირველი სამიდან იზრდება. თუ სამყარო თავისთავად არ გვთავაზობს აზრს, მაშინ ან უნდა შევქმნათ იგი, ან უაზრობასთან ვიცხოვროთ. ფრანკლი აქ განსხვავებულ პასუხს გვთავაზობს: აზრი არ არის გამოგონილი, ის აღმოჩენილია — ყოველ კონკრეტულ სიტუაციაში არსებობს რაღაც, რაც ჩვენგან პასუხს ითხოვს. ის ამას „აზრის ნებას" (Wille zum Sinn) უწოდებდა.',
      en: 'The fourth given grows out of the first three. If the world does not offer meaning of its own accord, we must either make it or live alongside its absence. Frankl offers a different answer: meaning is not invented but discovered — in every concrete situation something is asking for a response from us. He called this the will to meaning.'
    },
    manifest: {
      ka: [
        'წარმატება, რომელიც ცარიელია — მიზანი მიღწეულია და არაფერი შეიცვალა.',
        'ქრონიკული მოწყენილობა და აპათია, რომელიც დეპრესიას ჰგავს, მაგრამ სხვა ფესვი აქვს.',
        'კითხვა „რისთვის?", რომელიც პასუხს ვერ პოულობს ვერცერთ ჩვეულ ადგილას.',
        'პენსიის ან როლის დაკარგვის შემდეგ უეცარი ცარიელი.',
        'ფრანკლი ამას „ეგზისტენციალურ ვაკუუმს" (existential vacuum) უწოდებდა.'
      ],
      en: [
        'Success that is empty — the goal is reached and nothing has changed.',
        'A chronic boredom and apathy that resembles depression but has a different root.',
        'The question "what for?", finding no answer in any of the usual places.',
        'A sudden emptiness after retirement or the loss of a role.',
        'Frankl named this the existential vacuum.'
      ]
    },
    defenses: {
      ka: [
        'ნიჰილისტური პოზა, რომელიც უაზრობას აზრად აქცევს.',
        'კომპულსიური აქტივობა: სამუშაო, მოხმარება, გართობა — ოღონდ არ გაჩერდე.',
        'იდეოლოგიაში ან ჯგუფში სრული გახსნა, სადაც კითხვა აღარ ისმის.',
        'ჰიპერრეფლექსია — საკუთარი მდგომარეობის დაუსრულებელი ანალიზი მოქმედების ნაცვლად.'
      ],
      en: [
        'A nihilistic stance that turns meaninglessness itself into a meaning.',
        'Compulsive activity: work, consumption, entertainment — anything but stopping.',
        'Total dissolution into an ideology or a group where the question is no longer asked.',
        'Hyper-reflection — endless analysis of one’s own state in place of action.'
      ]
    },
    stance: {
      ka: 'თერაპევტი არ პასუხობს კითხვას „რა აზრი აქვს ცხოვრებას" — ეს კითხვა არასწორად არის დასმული. ფრანკლის მიხედვით, ცხოვრება სვამს კითხვას ჩვენ და ჩვენ ვპასუხობთ. თერაპევტი ეხმარება კლიენტს, დაინახოს, სად ითხოვს ცხოვრება მისგან პასუხს ახლა. აქ მუშაობს დერეფლექსია: ყურადღების გადატანა საკუთარი თავიდან იმაზე, რაც კაცს გარეთ ელოდება.',
      en: 'The therapist does not answer the question "what is the meaning of life" — the question is put the wrong way round. For Frankl, life asks the question and we answer. The therapist helps the client see where life is asking something of them now. This is where dereflection works: moving attention from oneself to what waits outside.'
    },
    voices: {
      ka: [
        '„ყველაფერი მაქვს, რაც ოცი წლის წინ მინდოდა. და დილით წამოდგომა მიჭირს."',
        '„ბავშვები წავიდნენ, სამსახური დამთავრდა. ვინ ვარ ახლა? არავინ არაფერს არ მთხოვს."'
      ],
      en: [
        '"I have everything I wanted twenty years ago. And getting up in the morning is hard."',
        '"The children have gone, the job is over. Who am I now? No one asks anything of me."'
      ]
    }
  }
];
