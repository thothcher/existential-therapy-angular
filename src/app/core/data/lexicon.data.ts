/* ==========================================================================
   lexicon.js — the vocabulary.

   Shape mirrors the CBT `GlossaryTerm` (id, term, category, definition,
   relatedTechniqueSlug) with the category as a stable machine key rather than
   a display string — CBT used the visible English label as the filter value,
   which would break the moment a second language was added.

   Every entry carries `original`: the Latin, German, French or Danish source
   term. The brief asks for the original on first use, and a lexicon is where
   that promise is actually kept.
   ========================================================================== */

import type { LexiconCategory, LexiconTerm } from '../models';

export const LEXICON_CATEGORIES: LexiconCategory[] = [
  { id: 'given',    label: { ka: 'მოცემულობა', en: 'Given' } },
  { id: 'concept',  label: { ka: 'ცნება',      en: 'Concept' } },
  { id: 'practice', label: { ka: 'პრაქტიკა',   en: 'Practice' } },
  { id: 'defense',  label: { ka: 'თავდაცვა',   en: 'Defence' } }
];

export const LEXICON: LexiconTerm[] = [
  {
    id: 'l-1', category: 'concept',
    term: { ka: 'ავთენტურობა', en: 'Authenticity' },
    original: 'Eigentlichkeit · authenticity',
    definition: {
      ka: 'ცხოვრება საკუთარი თავიდან და არა იმ ანონიმური „ისეთისგან", რომელიც გვეუბნება, რას აკეთებენ ჩვეულებრივ. ჰაიდეგერისთვის ეს არ არის მორალური მიღწევა და არც მუდმივი მდგომარეობა — ეს არის მომენტები, როცა ადამიანი საკუთარ სასრულობას აღიარებს და აქედან ირჩევს.',
      en: 'Living from oneself rather than from the anonymous "they" that tells us what one normally does. For Heidegger this is neither a moral achievement nor a permanent state, but moments in which a person acknowledges their finitude and chooses from there.'
    },
    relatedThinker: 'heidegger'
  },
  {
    id: 'l-2', category: 'defense',
    term: { ka: 'ცუდი რწმენა', en: 'Bad faith' },
    original: 'mauvaise foi',
    definition: {
      ka: 'სარტრის ტერმინი თვითმოტყუებისთვის, რომლითაც ადამიანი საკუთარ თავს არწმუნებს, რომ არჩევანი არ ჰქონდა. ორი ტიპური ფორმაა: თავი წარმოვიდგინოთ მხოლოდ როგორც ნივთი, რომელსაც გარემოებები განაგებს; ან მხოლოდ როგორც სუფთა თავისუფლება, რომელსაც წარსული და სხეული არ ეხება.',
      en: 'Sartre’s term for the self-deception by which a person persuades themselves they had no choice. Two typical forms: taking oneself to be only a thing governed by circumstance, or only a pure freedom untouched by past and body.'
    },
    relatedThinker: 'sartre'
  },
  {
    id: 'l-3', category: 'concept',
    term: { ka: 'ეგზისტენციალური შფოთვა', en: 'Existential anxiety' },
    original: 'existential anxiety',
    definition: {
      ka: 'შფოთვა, რომელიც პროპორციულია რეალურ ეგზისტენციალურ მოცემულობასთან — სასრულობასთან, თავისუფლებასთან, მარტოობასთან. ის არ ითრგუნება და არ ავიწროებს ცხოვრებას; პირიქით, მასთან ცხოვრება შეიძლება გამამდიდრებელიც იყოს. მეის მიხედვით, ის სამკურნალო არ არის.',
      en: 'Anxiety proportionate to an actual existential given — finitude, freedom, aloneness. It is not repressed and does not narrow a life; living with it can enlarge one. On May’s account it is not to be treated away.'
    },
    relatedThinker: 'may'
  },
  {
    id: 'l-4', category: 'concept',
    term: { ka: 'ნევროზული შფოთვა', en: 'Neurotic anxiety' },
    original: 'neurotic anxiety',
    definition: {
      ka: 'შფოთვა, რომელიც არაპროპორციულია საფრთხესთან, ითრგუნება ცნობიერებიდან და აწყობს დამცავ მექანიზმებს, რომლებიც ცხოვრებას ავიწროებს. მეისთვის თერაპიის მიზანი მისი მოცილება არ არის — არამედ მისი გარდაქმნა ეგზისტენციალურ შფოთვად, რომელთანაც ცხოვრება შესაძლებელია.',
      en: 'Anxiety disproportionate to the threat, repressed out of awareness, and building defences that narrow a life. For May the aim of therapy is not to remove it but to convert it into existential anxiety, which can be lived with.'
    },
    relatedThinker: 'may'
  },
  {
    id: 'l-5', category: 'concept',
    term: { ka: 'ჩაგდებულობა', en: 'Thrownness' },
    original: 'Geworfenheit',
    definition: {
      ka: 'ის ფაქტი, რომ ჩვენ ვიწყებთ იქ, სადაც არ აგვირჩევია: კონკრეტულ სხეულში, ოჯახში, ენაში, ეპოქაში, ისტორიაში. ჰაიდეგერისთვის ეს არ არის შეზღუდვა, რომელიც უნდა დაიძლიოს — ეს არის ის ნიადაგი, საიდანაც ყოველი თავისუფლება იწყება.',
      en: 'The fact that we begin where we did not choose to begin: in a particular body, family, language, epoch, history. For Heidegger this is not a limitation to be overcome but the ground from which any freedom begins.'
    },
    relatedThinker: 'heidegger'
  },
  {
    id: 'l-6', category: 'concept',
    term: { ka: 'სამყაროში-ყოფნა', en: 'Being-in-the-world' },
    original: 'In-der-Welt-sein',
    definition: {
      ka: 'ჰაიდეგერის ცნება, რომელიც უარყოფს დეკარტისეულ გაყოფას შინაგან სუბიექტსა და გარე სამყაროს შორის. ჩვენ არ ვართ ცნობიერება, რომელიც სამყაროს უყურებს — ჩვენ ყოველთვის უკვე ჩართული ვართ სამყაროში, საქმეებში, სხვებთან. თერაპიისთვის ეს ნიშნავს, რომ სიმპტომი კლიენტის სამყაროდან უნდა გავიგოთ.',
      en: 'Heidegger’s term rejecting the Cartesian split between an inner subject and an outer world. We are not a consciousness looking at a world — we are always already engaged in a world, in tasks, with others. For therapy this means a symptom must be understood from within the client’s world.'
    },
    relatedThinker: 'heidegger'
  },
  {
    id: 'l-7', category: 'concept',
    term: { ka: 'აზრის ნება', en: 'The will to meaning' },
    original: 'Wille zum Sinn',
    definition: {
      ka: 'ფრანკლის ცენტრალური დებულება: ადამიანის ძირითადი მოტივაცია არც სიამოვნების ძებნაა (ფროიდი) და არც ძალაუფლების (ადლერი), არამედ აზრის პოვნა. როცა ეს ნება ვერ იკმაყოფილდება, ჩნდება ეგზისტენციალური ვაკუუმი.',
      en: 'Frankl’s central claim: the primary human motivation is neither the pursuit of pleasure (Freud) nor of power (Adler) but the finding of meaning. When that will goes unmet, the existential vacuum appears.'
    },
    relatedThinker: 'frankl'
  },
  {
    id: 'l-8', category: 'concept',
    term: { ka: 'ეგზისტენციალური ვაკუუმი', en: 'Existential vacuum' },
    original: 'existentielles Vakuum',
    definition: {
      ka: 'უაზრობის, სიცარიელისა და მოწყენილობის მდგრადი განცდა, რომელიც ფრანკლმა თანამედროვეობის დამახასიათებელ მდგომარეობად აღწერა. ის ხშირად ჰგავს დეპრესიას, მაგრამ სხვა ფესვი აქვს და სხვა პასუხს ითხოვს.',
      en: 'A persistent sense of meaninglessness, emptiness and boredom that Frankl described as characteristic of modern life. It often resembles depression but has a different root and calls for a different response.'
    },
    relatedThinker: 'frankl'
  },
  {
    id: 'l-9', category: 'concept',
    term: { ka: 'ეგზისტენციალური დანაშაული', en: 'Existential guilt' },
    original: 'existential guilt',
    definition: {
      ka: 'დანაშაულის გრძნობა არა ჩადენილი ქმედების, არამედ არჩადენილის გამო — იმ ცხოვრების წინაშე, რომელიც შეიძლებოდა გვეცხოვრა და არ ვიცხოვრეთ. ის სამი მიმართულებით ჩნდება: საკუთარი შესაძლებლობების, სხვა ადამიანების და თავად ბუნების წინაშე.',
      en: 'Guilt not for what was done but for what was not — before the life one could have lived and did not. It appears in three directions: toward one’s own possibilities, toward other people, and toward nature itself.'
    },
    relatedThinker: 'may'
  },
  {
    id: 'l-10', category: 'concept',
    term: { ka: 'თავისუფლების პარადოქსი', en: 'The paradox of freedom' },
    original: 'the paradox of freedom',
    definition: {
      ka: 'რაც უფრო მეტი თავისუფლება გვაქვს, მით მეტია შფოთვა, რადგან თითოეული არჩევანი პასუხისმგებლობას ბადებს და ყოველი არჩეული გზა ყველა დანარჩენს კეტავს. ამიტომ ადამიანები ხშირად ეძებენ სტრუქტურას, ავტორიტეტს ან წესს — არა სისუსტისგან, არამედ ამ ტვირთისგან შვების საპოვნელად.',
      en: 'The more freedom we have, the greater the anxiety, because each choice creates responsibility and every road taken closes all the others. This is why people so often seek structure, authority or rule — not from weakness, but for relief from the weight.'
    },
    relatedThinker: 'kierkegaard'
  },
  {
    id: 'l-11', category: 'given',
    term: { ka: 'სიკვდილის შფოთვა', en: 'Death anxiety' },
    original: 'death anxiety',
    definition: {
      ka: 'შფოთვა საკუთარი არარსებობის წინაშე. იალომის მიხედვით, ის იშვიათად ჩნდება პირდაპირი სახით — უფრო ხშირად ის სხვა სიმპტომებში იმალება: პანიკაში, ჰიპოქონდრიაში, შეპყრობილ საქმიანობაში, განსაკუთრებულობის რწმენაში.',
      en: 'Anxiety before one’s own non-being. On Yalom’s account it rarely appears directly — more often it hides inside other symptoms: panic, health anxiety, compulsive activity, a belief in one’s own specialness.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-12', category: 'given',
    term: { ka: 'ეგზისტენციალური იზოლაცია', en: 'Existential isolation' },
    original: 'existential isolation',
    definition: {
      ka: 'ის საბოლოო უფსკრული, რომელიც ერთ ცნობიერებას მეორისგან აშორებს. ის არ ემთხვევა მარტოობას: ადამიანს შეიძლება ბევრი ახლობელი ჰყავდეს და მაინც იცოდეს, რომ საკუთარ სიკვდილში და საკუთარ გამოცდილებაში მარტოა. ურთიერთობა მას ვერ აუქმებს, მაგრამ შეუძლია, ის გახადოს ასატანი.',
      en: 'The final gulf that separates one consciousness from another. It is not the same as loneliness: a person may have many people close to them and still know that in their own death and their own experience they are alone. Relationship cannot abolish it, but it can make it bearable.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-13', category: 'defense',
    term: { ka: 'შერწყმა', en: 'Fusion' },
    original: 'fusion',
    definition: {
      ka: 'იზოლაციისგან თავდაცვა, რომლის დროსაც ადამიანი საკუთარ საზღვრებს ხსნის სხვაში, რომ მარტოობა აღარ იგრძნოს. მოკლევადიან პერსპექტივაში ის ამსუბუქებს; გრძელვადიანში კი ორივე მხარეს ართმევს იმ ცალკეულობას, რომლის გარეშეც ნამდვილი შეხვედრა შეუძლებელია.',
      en: 'A defence against isolation in which a person dissolves their own boundaries into another so as not to feel alone. In the short term it relieves; in the long term it takes from both parties the separateness without which real encounter is impossible.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-14', category: 'defense',
    term: { ka: 'განსაკუთრებულობის რწმენა', en: 'Specialness' },
    original: 'specialness',
    definition: {
      ka: 'სიკვდილის შფოთვისგან თავდაცვა: არაცნობიერი რწმენა, რომ ბიოლოგიის კანონები სხვებზე ვრცელდება, მე კი გამონაკლისი ვარ. ის ხშირად ჯანსაღად გამოიყურება — ამბიცია, მუშაობის უნარი, სიმამაცე — და სწორედ ამიტომაა ძნელი შესამჩნევი.',
      en: 'A defence against death anxiety: the unconscious conviction that the laws of biology apply to others and that I am the exception. It often looks healthy — ambition, capacity for work, courage — which is exactly why it is hard to notice.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-15', category: 'defense',
    term: { ka: 'საბოლოო მხსნელი', en: 'The ultimate rescuer' },
    original: 'ultimate rescuer',
    definition: {
      ka: 'სიკვდილის შფოთვისგან მეორე ძირითადი თავდაცვა: რწმენა, რომ არსებობს ვიღაც ან რაღაც — ექიმი, პარტნიორი, ლიდერი, სისტემა — ვინც საბოლოო ჟამს გადამარჩენს. მისი მოშლა ხშირად სწორედ თერაპიაში მოსვლის მიზეზია.',
      en: 'The second principal defence against death anxiety: the belief that someone or something — a doctor, a partner, a leader, a system — will intervene at the last. Its collapse is often the very reason someone comes to therapy.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-16', category: 'concept',
    term: { ka: 'თვითტრანსცენდენცია', en: 'Self-transcendence' },
    original: 'Selbsttranszendenz',
    definition: {
      ka: 'ფრანკლის დებულება, რომ ადამიანი თავისი ბუნებით საკუთარ თავს სცილდება: ის ყოველთვის მიმართულია რაღაცისკენ ან ვიღაცისკენ თავის გარეთ. სწორედ ამიტომ თვითრეალიზაცია პირდაპირ მიზნად ვერ დაისახება — ის მოჰყვება სხვა რამეზე მიმართულებას.',
      en: 'Frankl’s claim that a person by nature reaches beyond themselves: they are always directed at something or someone outside. This is why self-realisation cannot be aimed at directly — it follows from being directed at something else.'
    },
    relatedThinker: 'frankl'
  },
  {
    id: 'l-17', category: 'concept',
    term: { ka: 'თვითდისტანცირება', en: 'Self-distancing' },
    original: 'Selbstdistanzierung',
    definition: {
      ka: 'უნარი, გავიხედოთ საკუთარ თავზე გვერდიდან — და, ფრანკლის მიხედვით, საკუთარ თავზე გაცინებაც. ეს არის ის ადამიანური შესაძლებლობა, რომელსაც პარადოქსული ინტენცია იყენებს.',
      en: 'The capacity to look at oneself from the side — and, on Frankl’s account, to laugh at oneself. This is the human capacity that paradoxical intention puts to work.'
    },
    relatedPractice: 'paradoxical-intention'
  },
  {
    id: 'l-18', category: 'concept',
    term: { ka: 'ჰიპერრეფლექსია', en: 'Hyper-reflection' },
    original: 'Hyperreflexion',
    definition: {
      ka: 'ზედმეტი თვითდაკვირვება, რომელიც თავად ხდება სიმპტომის მიზეზი. ვინც ძილს აკვირდება, ვერ იძინებს; ვინც საკუთარ შესრულებას აკვირდება, კარგავს მას. მისი პასუხი დერეფლექსიაა.',
      en: 'Excessive self-observation that itself becomes the cause of the symptom. Whoever watches their sleep cannot sleep; whoever watches their own performance loses it. Its answer is dereflection.'
    },
    relatedPractice: 'dereflection'
  },
  {
    id: 'l-19', category: 'practice',
    term: { ka: 'დერეფლექსია', en: 'Dereflection' },
    original: 'Dereflexion',
    definition: {
      ka: 'ფრანკლის ტექნიკა: ყურადღების მოხსნა საკუთარი სიმპტომიდან და მიმართვა კონკრეტული ამოცანისკენ ან ადამიანისკენ სამყაროში. ეს არ არის ყურადღების გაფანტვა — ეს არის მიმართულების შეცვლა.',
      en: 'Frankl’s technique: taking attention off one’s own symptom and turning it toward a concrete task or person in the world. This is not distraction but a change of direction.'
    },
    relatedPractice: 'dereflection'
  },
  {
    id: 'l-20', category: 'practice',
    term: { ka: 'პარადოქსული ინტენცია', en: 'Paradoxical intention' },
    original: 'paradoxe Intention',
    definition: {
      ka: 'ფრანკლის ტექნიკა, რომლის დროსაც კლიენტს ვთხოვთ განზრახ მოიწვიოს ის, რისიც ეშინია, ხშირად იუმორის თანხლებით. ის არღვევს მოლოდინის შფოთვის წრეს. უკუნაჩვენებია დეპრესიის, სუიციდური აზრებისა და მწვავე ტრავმის დროს.',
      en: 'Frankl’s technique of asking the client to deliberately invite what they fear, often with humour. It breaks the cycle of anticipatory anxiety. Contraindicated in depression, suicidal ideation and acute trauma.'
    },
    relatedPractice: 'paradoxical-intention'
  },
  {
    id: 'l-21', category: 'concept',
    term: { ka: 'მოლოდინის შფოთვა', en: 'Anticipatory anxiety' },
    original: 'Erwartungsangst',
    definition: {
      ka: 'შიში იმისა, რომ სიმპტომი განმეორდება — შიში, რომელიც თავად იწვევს სიმპტომს. ფრანკლმა აღწერა ეს დახურული წრე და პარადოქსული ინტენცია სწორედ მის გასაწყვეტად შექმნა.',
      en: 'The fear that the symptom will return — a fear that produces the symptom. Frankl described this closed circle and devised paradoxical intention precisely to cut it.'
    },
    relatedPractice: 'paradoxical-intention'
  },
  {
    id: 'l-22', category: 'concept',
    term: { ka: 'შეხვედრა', en: 'Encounter' },
    original: 'Begegnung · encounter',
    definition: {
      ka: 'ორი ადამიანის ნამდვილი შეხვედრა, რომელშიც არცერთი არ არის ობიექტი მეორისთვის. ბუბერისეული „მე-შენ" ურთიერთობის თერაპიული ვარიანტი. იალომისთვის სწორედ ეს არის ის, რაც თერაპიაში ყველაზე მეტად კურნავს — და არა ტექნიკა.',
      en: 'A genuine meeting of two people in which neither is an object for the other. The therapeutic form of Buber’s I–Thou relation. For Yalom this, and not technique, is what heals most in therapy.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-23', category: 'practice',
    term: { ka: 'აქ და ახლა', en: 'The here-and-now' },
    original: 'here-and-now',
    definition: {
      ka: 'იალომის მეთოდი: მუშაობა იმაზე, რაც სწორედ ამ წუთში ხდება თერაპევტსა და კლიენტს შორის. თუ კლიენტი გარეთ ურთიერთობებში ერიდება სიახლოვეს, ის იმავეს ოთახშიც გააკეთებს — და აქ ეს დაკვირვებადია.',
      en: 'Yalom’s method: working with what is happening between therapist and client at this very minute. If a client avoids closeness in relationships outside, they will do the same in the room — and here it can be observed.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-24', category: 'concept',
    term: { ka: 'სამი სამყარო', en: 'The three worlds' },
    original: 'Umwelt · Mitwelt · Eigenwelt',
    definition: {
      ka: 'ბინსვანგერის სქემა: Umwelt — ფიზიკური გარემო და სხეული; Mitwelt — სხვებთან ერთად ყოფნის სამყარო; Eigenwelt — საკუთარ თავთან მიმართება. ვან დორზენმა მას მეოთხე დაუმატა: Überwelt, ღირებულებებისა და მრწამსის განზომილება.',
      en: 'Binswanger’s schema: Umwelt, the physical surroundings and the body; Mitwelt, the world of being with others; Eigenwelt, the relation to oneself. Van Deurzen added a fourth: Überwelt, the dimension of values and belief.'
    },
    relatedThinker: 'binswanger'
  },
  {
    id: 'l-25', category: 'concept',
    term: { ka: 'სამყაროს პროექტი', en: 'World-design' },
    original: 'Weltentwurf',
    definition: {
      ka: 'ბინსვანგერის ცნება იმ თავისებური წყობისთვის, რომლითაც თითოეული ადამიანი სივრცეს, დროს, სხეულსა და სხვებს განიცდის. სიმპტომი არ არის შემოჭრა ამ სამყაროში — ის ამ სამყაროს ლოგიკური ნაწილია.',
      en: 'Binswanger’s term for the particular ordering by which each person experiences space, time, body and others. A symptom is not an intrusion into that world but a logical part of it.'
    },
    relatedThinker: 'binswanger'
  },
  {
    id: 'l-26', category: 'given',
    term: { ka: 'უაზრობა', en: 'Meaninglessness' },
    original: 'meaninglessness',
    definition: {
      ka: 'იალომის მეოთხე მოცემულობა: თუ სამყარო თავისთავად აზრს არ გვთავაზობს, მაშინ ან უნდა შევქმნათ იგი, ან მის გარეშე ვიცხოვროთ. ის იზრდება პირველი სამიდან და ხშირად სწორედ მაშინ ჩნდება, როცა გარეგნულად ყველაფერი წესრიგშია.',
      en: 'Yalom’s fourth given: if the world offers no meaning of its own, we must either make one or live without it. It grows out of the first three and often appears precisely when everything is outwardly in order.'
    },
    relatedThinker: 'yalom'
  },
  {
    id: 'l-27', category: 'concept',
    term: { ka: 'დაიმონური', en: 'The daimonic' },
    original: 'the daimonic',
    definition: {
      ka: 'მეის ცნება იმ ძალისთვის ჩვენში, რომელსაც შეუძლია ადამიანი მთლიანად დაიპყროს: რისხვა, სექსუალობა, შემოქმედებითი ვნება. ის თავისთავად არც კარგია და არც ცუდი. საშიში ის მაშინ ხდება, როცა უარვყოფთ — მაშინ ის ჩვენს ნებართვას აღარ ითხოვს.',
      en: 'May’s term for the force in us capable of taking a person over entirely: rage, sexuality, creative passion. It is neither good nor bad in itself. It becomes dangerous when denied — at which point it stops asking our permission.'
    },
    relatedThinker: 'may'
  },
  {
    id: 'l-28', category: 'concept',
    term: { ka: 'ტალღების ეფექტი', en: 'Rippling' },
    original: 'rippling',
    definition: {
      ka: 'იალომის ცნება: ის, რასაც ადამიანი სხვებში ტოვებს — ჟესტი, სიტყვა, სწავლება — აგრძელებს არსებობას მისი სიკვდილის შემდეგ, თუნდაც ისე, რომ არავინ ახსოვდეს წყარო. ეს არ არის უკვდავების დაპირება, მაგრამ სიკვდილის შფოთვის ერთ-ერთი ყველაზე დამამშვიდებელი პასუხია.',
      en: 'Yalom’s term for what a person leaves in others — a gesture, a word, a teaching — which goes on existing after their death, even when no one remembers the source. It is not a promise of immortality, but it is among the steadier answers to death anxiety.'
    },
    relatedThinker: 'yalom'
  }
];
