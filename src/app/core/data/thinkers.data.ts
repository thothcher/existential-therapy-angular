/* ==========================================================================
   thinkers.js — the figures the approach stands on.

   Shape mirrors the CBT `Psychologist` model (slug routing, biography split on
   \n\n, keyIdeas / works / contributions / tags), with two changes: every
   translatable field is a { ka, en } pair, and portraits are a single
   credited `portrait` object rather than an `images` array.

   The CBT platform illustrated its psychologists with unrelated Unsplash
   photographs of strangers, which quietly implies a portrait it never was.
   Here each thinker carries a real one: `portrait` points at a public-domain
   or freely licensed photograph from Wikimedia Commons, stored under
   public/thinkers and credited in the data so the licence travels with the
   image. The `plate` seed stays as the fallback — PlateComponent renders a
   deterministic abstract composition from it wherever no free portrait
   exists, and the plate gradient is what shows behind an image while it
   loads.
   ========================================================================== */

import type { Thinker } from '../models';

export const THINKERS: Thinker[] = [
  {
    id: 'kierkegaard',
    slug: 'kierkegaard',
    plate: 11,
    portrait: {
      src: '/thinkers/kierkegaard.jpg',
      credit: 'Luplau Janssen',
      license: 'Public domain',
      source: 'https://commons.wikimedia.org/wiki/File:Kierkegaard_portrait.jpg'
    },
    name: { ka: 'სორენ კირკეგორი', en: 'Søren Kierkegaard' },
    latin: 'Søren Kierkegaard',
    birthYear: 1813,
    deathYear: 1855,
    origin: { ka: 'დანია', en: 'Denmark' },
    tradition: { ka: 'ფილოსოფიური საფუძველი', en: 'Philosophical foundation' },
    summary: {
      ka: 'პირველი, ვინც შფოთვა არა სისუსტედ, არამედ თავისუფლების ნიშნად აღიარა.',
      en: 'The first to treat anxiety not as weakness but as the mark of freedom.'
    },
    biography: {
      ka: 'სორენ კირკეგორი კოპენჰაგენში ცხოვრობდა და მთელი მისი ნაწერი ერთი კითხვის გარშემო ტრიალებს: როგორ გახდეს ადამიანი საკუთარი თავი? მან უარყო ჰეგელის სისტემა, რომელშიც ცალკეული ადამიანი დიდი ისტორიული მოძრაობის ნაწილად იქცეოდა, და დაბრუნდა იმ ერთეულთან, რომელსაც ის „ინდივიდს" (den Enkelte) უწოდებდა.\n\nნაშრომში „შფოთვის ცნება" (1844) მან შფოთვა აღწერა როგორც „თავისუფლების თავბრუსხვევა" — ის, რასაც ვგრძნობთ, როცა უფსკრულის პირას ვდგავართ და ვხვდებით, რომ ხტომა ჩვენზეა დამოკიდებული. ეს არ არის შიში კონკრეტული საფრთხისა. ეს არის შიში საკუთარი შესაძლებლობისა.\n\nმისი გავლენა ეგზისტენციალურ თერაპიაზე პირდაპირია: ჰაიდეგერმა, სარტრმა, მეიმ და იალომმა თითოეულმა თავისებურად განაგრძეს ეს ხაზი. მეისთვის კირკეგორის შფოთვის ცნება პირდაპირ იქცა ეგზისტენციალური და ნევროზული შფოთვის გამიჯვნის საფუძვლად.',
      en: 'Søren Kierkegaard lived in Copenhagen and everything he wrote circles one question: how does a person become themselves? He rejected the Hegelian system, in which the individual dissolved into a great historical movement, and returned to what he called the single individual.\n\nIn The Concept of Anxiety (1844) he described anxiety as "the dizziness of freedom" — what we feel standing at the edge of a drop, realising that the leap is up to us. This is not fear of a particular danger. It is fear of one’s own possibility.\n\nHis influence on existential therapy is direct. Heidegger, Sartre, May and Yalom each continued the line in their own way. For May, Kierkegaard’s account of anxiety became the ground for distinguishing existential anxiety from neurotic anxiety.'
    },
    keyIdeas: [
      { ka: 'შფოთვა როგორც „თავისუფლების თავბრუსხვევა" — ის ჩნდება იქ, სადაც არჩევანია', en: 'Anxiety as "the dizziness of freedom" — it appears wherever there is choice' },
      { ka: 'სასოწარკვეთა (fortvivlelse) როგორც საკუთარ თავად არყოფნა', en: 'Despair as the condition of not being oneself' },
      { ka: 'ცხოვრების სამი სტადია: ესთეტიკური, ეთიკური, რელიგიური', en: 'Three stages of life: aesthetic, ethical, religious' },
      { ka: 'ჭეშმარიტება როგორც სუბიექტურობა — მნიშვნელოვანია, როგორ ვცხოვრობთ ჭეშმარიტებას, და არა მხოლოდ ის, რას ვამტკიცებთ', en: 'Truth as subjectivity — how a truth is lived matters, not only what is asserted' }
    ],
    works: [
      { title: { ka: 'ან — ან', en: 'Either/Or' }, year: 1843 },
      { title: { ka: 'შიში და კანკალი', en: 'Fear and Trembling' }, year: 1843 },
      { title: { ka: 'შფოთვის ცნება', en: 'The Concept of Anxiety' }, year: 1844 },
      { title: { ka: 'სასიკვდილო სნეულება', en: 'The Sickness Unto Death' }, year: 1849 }
    ],
    contributions: [
      { ka: 'შფოთვის გამიჯვნა შიშისგან — საფუძველი, რომელზეც დგას ეგზისტენციალური და ნევროზული შფოთვის განსხვავება.', en: 'Separating anxiety from fear — the ground on which the distinction between existential and neurotic anxiety rests.' },
      { ka: 'პაციენტის, როგორც ცალკეული ინდივიდის, უპირატესობა ნებისმიერ დიაგნოსტიკურ კატეგორიაზე.', en: 'The primacy of the single individual over any diagnostic category.' },
      { ka: 'იდეა, რომ სასოწარკვეთა შეიძლება უსიმპტომოც იყოს — ადამიანმა შეიძლება „წარმატებით" იცხოვროს არასაკუთარი ცხოვრება.', en: 'The idea that despair can be symptomless — a person may live a life that is not theirs, successfully.' }
    ],
    tags: [
      { ka: 'შფოთვა', en: 'Anxiety' },
      { ka: 'თავისუფლება', en: 'Freedom' },
      { ka: 'ავთენტურობა', en: 'Authenticity' }
    ],
    related: ['heidegger', 'may']
  },

  {
    id: 'heidegger',
    slug: 'heidegger',
    plate: 23,
    portrait: {
      src: '/thinkers/heidegger.jpg',
      credit: 'Willy Pragher',
      license: 'CC BY-SA 3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Heidegger_2_(1960).jpg'
    },
    name: { ka: 'მარტინ ჰაიდეგერი', en: 'Martin Heidegger' },
    latin: 'Martin Heidegger',
    birthYear: 1889,
    deathYear: 1976,
    origin: { ka: 'გერმანია', en: 'Germany' },
    tradition: { ka: 'ფენომენოლოგია', en: 'Phenomenology' },
    summary: {
      ka: 'მან აჩვენა, რომ ადამიანი არ არის სუბიექტი სამყაროს წინაშე — ის თავად არის სამყაროში-ყოფნა.',
      en: 'He showed that a person is not a subject facing a world, but is themselves being-in-the-world.'
    },
    biography: {
      ka: 'მარტინ ჰაიდეგერის „ყოფიერება და დრო" (Sein und Zeit, 1927) ეგზისტენციალური თერაპიის ერთ-ერთი ყველაზე გავლენიანი და ყველაზე რთული წყაროა. მისი ცენტრალური ცნება — Dasein, სიტყვასიტყვით „იქ-ყოფნა" — აღწერს ადამიანს არა როგორც ნივთს სხვა ნივთებს შორის, არამედ როგორც არსებას, რომლისთვისაც საკუთარი ყოფიერება საკითხია.\n\nჰაიდეგერისთვის ჩვენ ყოველთვის უკვე ჩაგდებული ვართ (Geworfenheit) კონკრეტულ დროში, ენაში, სხეულში, ოჯახში, რომელიც არ აგვირჩევია. და ამავე დროს ჩვენ ყოველთვის წინ ვიწევთ შესაძლებლობებისკენ. სიკვდილი აქ არ არის მომავალი მოვლენა — ის არის „ყველაზე საკუთარი შესაძლებლობა", რომელიც ცხოვრებას სტრუქტურას აძლევს.\n\nმისი პოლიტიკური არჩევანი 1933 წელს — ნაცისტურ პარტიაში გაწევრიანება და ფრაიბურგის უნივერსიტეტის რექტორობა — მისი მემკვიდრეობის განუყოფელი და შემაშფოთებელი ნაწილია. ეს არ აუქმებს მისი ადრეული ნაშრომის ღირებულებას თერაპიისთვის, მაგრამ პატიოსნება მოითხოვს ამის თქმას და არა დაფარვას.',
      en: 'Heidegger’s Being and Time (1927) is among the most influential and most difficult sources for existential therapy. Its central term — Dasein, literally "being-there" — describes the human being not as a thing among things but as the being for whom its own being is a question.\n\nFor Heidegger we are always already thrown (Geworfenheit) into a particular time, language, body and family that we did not choose. At the same time we are always pressing ahead into possibilities. Death here is not a future event but "one’s ownmost possibility", the thing that gives a life its shape.\n\nHis political choice in 1933 — joining the Nazi party and taking the rectorship at Freiburg — is an inseparable and troubling part of his legacy. This does not cancel the value of the early work for therapy, but honesty requires stating it rather than passing over it.'
    },
    keyIdeas: [
      { ka: 'სამყაროში-ყოფნა (In-der-Welt-sein) — ადამიანი და სამყარო არ არიან ორი ცალკეული რამ', en: 'Being-in-the-world — person and world are not two separate things' },
      { ka: 'ჩაგდებულობა (Geworfenheit) — ჩვენ ვიწყებთ იქ, სადაც არ აგვირჩევია', en: 'Thrownness — we begin where we did not choose to begin' },
      { ka: 'ავთენტურობა (Eigentlichkeit) და არაავთენტურობა — ცხოვრება საკუთარი თავიდან, თუ „ისეთისგან" (das Man)', en: 'Authenticity and inauthenticity — living from oneself, or from "the they"' },
      { ka: 'სიკვდილისკენ-ყოფნა (Sein-zum-Tode) — სასრულობა, როგორც ცხოვრების მაორგანიზებელი', en: 'Being-toward-death — finitude as what organises a life' }
    ],
    works: [
      { title: { ka: 'ყოფიერება და დრო', en: 'Being and Time' }, year: 1927 },
      { title: { ka: 'რა არის მეტაფიზიკა?', en: 'What Is Metaphysics?' }, year: 1929 },
      { title: { ka: 'ცოლიკონის სემინარები', en: 'Zollikon Seminars' }, year: 1987 }
    ],
    contributions: [
      { ka: 'ცოლიკონის სემინარები — ათწლეულზე მეტი ხნის განმავლობაში ჰაიდეგერი მედარდ ბოსის მოწვევით ფსიქიატრებს ასწავლიდა. ეს არის მისი ყველაზე პირდაპირი შეხება კლინიკასთან.', en: 'The Zollikon Seminars — for over a decade Heidegger taught psychiatrists at Medard Boss’s invitation. This is his most direct contact with clinical work.' },
      { ka: 'ცნება, რომ სიმპტომი უნდა გავიგოთ პაციენტის სამყაროდან და არა გარე კლასიფიკაციიდან.', en: 'The idea that a symptom must be understood from within the patient’s world, not from an external classification.' },
      { ka: 'ბინსვანგერისა და ბოსის Daseinsanalyse პირდაპირ მისგან იზრდება.', en: 'The Daseinsanalyse of Binswanger and Boss grows directly out of his work.' }
    ],
    tags: [
      { ka: 'ფენომენოლოგია', en: 'Phenomenology' },
      { ka: 'სასრულობა', en: 'Finitude' },
      { ka: 'ავთენტურობა', en: 'Authenticity' }
    ],
    related: ['binswanger', 'sartre']
  },

  {
    id: 'sartre',
    slug: 'sartre',
    plate: 37,
    portrait: {
      src: '/thinkers/sartre.jpg',
      credit: 'Anefo / unknown photographer',
      license: 'CC BY-SA 3.0 NL',
      source: 'https://commons.wikimedia.org/wiki/File:Jean_Paul_Sartre_1965.jpg'
    },
    name: { ka: 'ჟან-პოლ სარტრი', en: 'Jean-Paul Sartre' },
    latin: 'Jean-Paul Sartre',
    birthYear: 1905,
    deathYear: 1980,
    origin: { ka: 'საფრანგეთი', en: 'France' },
    tradition: { ka: 'ეგზისტენციალიზმი', en: 'Existentialism' },
    summary: {
      ka: 'ადამიანი ჯერ არსებობს და მხოლოდ შემდეგ განისაზღვრება. სხვა საფუძველი არ არსებობს.',
      en: 'A person exists first and is defined only afterwards. There is no other ground.'
    },
    biography: {
      ka: 'სარტრმა ეგზისტენციალიზმს ის ფორმულა მისცა, რომელიც ყველაზე ხშირად ციტირდება: „არსებობა წინ უსწრებს არსს" (l’existence précède l’essence). ეს ნიშნავს, რომ არ არსებობს წინასწარ მოცემული ადამიანური ბუნება, რომელსაც ჩვენ უნდა შევესაბამებოდეთ. ჯერ ვართ, შემდეგ ვხდებით ის, რასაც ვირჩევთ.\n\nამ თავისუფლებას ის უპირობოდ და თითქმის სასტიკად აღწერს: ჩვენ „განწირული ვართ თავისუფლებისთვის", რადგან უარის თქმაც არჩევანია. აქედან იზრდება მისი ყველაზე კლინიკურად სასარგებლო ცნება — ცუდი რწმენა (mauvaise foi): თვითმოტყუება, რომლითაც ადამიანი საკუთარ თავს არწმუნებს, რომ არჩევანი არ ჰქონდა.\n\nსარტრი თერაპევტი არ ყოფილა, მაგრამ მისი „ეგზისტენციალური ფსიქოანალიზი" ნაშრომში „ყოფიერება და არარა" (1943) აყალიბებს პროექტს: გავიგოთ ადამიანი არა წარსული მიზეზებიდან, არამედ იმ ფუნდამენტური არჩევანიდან, რომელსაც ის თავისი ცხოვრებით აკეთებს.',
      en: 'Sartre gave existentialism its most-quoted formula: existence precedes essence. There is no given human nature we must conform to. We are first, and then we become what we choose.\n\nHe describes this freedom unconditionally and almost harshly: we are "condemned to be free", because refusing is also a choice. From this grows his most clinically useful concept — bad faith (mauvaise foi): the self-deception by which a person persuades themselves they had no choice.\n\nSartre was not a therapist, but the "existential psychoanalysis" sketched in Being and Nothingness (1943) sets out a project: to understand a person not from past causes but from the fundamental choice they are making with their life.'
    },
    keyIdeas: [
      { ka: 'არსებობა წინ უსწრებს არსს', en: 'Existence precedes essence' },
      { ka: 'ცუდი რწმენა (mauvaise foi) — თვითმოტყუება საკუთარი თავისუფლების შესახებ', en: 'Bad faith — self-deception about one’s own freedom' },
      { ka: '„სხვისი მზერა" — როგორ ვიქცევით ობიექტად სხვისი თვალში', en: 'The look of the other — how we become an object in another’s gaze' },
      { ka: 'ფუნდამენტური პროექტი — ის არჩევანი, რომელსაც ყველა კონკრეტული არჩევანი ემსახურება', en: 'The fundamental project — the choice all particular choices serve' }
    ],
    works: [
      { title: { ka: 'გულისრევა', en: 'Nausea' }, year: 1938 },
      { title: { ka: 'ყოფიერება და არარა', en: 'Being and Nothingness' }, year: 1943 },
      { title: { ka: 'ეგზისტენციალიზმი არის ჰუმანიზმი', en: 'Existentialism Is a Humanism' }, year: 1946 }
    ],
    contributions: [
      { ka: 'ცუდი რწმენის ცნება, რომელიც კლინიკაში ყოველდღიურად ხვდება თერაპევტს: „სხვა გზა არ მქონდა".', en: 'The concept of bad faith, which a therapist meets daily in the room: "I had no other choice".' },
      { ka: 'პასუხისმგებლობის დაბრუნება როგორც თერაპიული მიმართულება, რჩევის ნაცვლად.', en: 'Returning responsibility as a therapeutic direction, in place of advice.' },
      { ka: 'ადამიანის გაგება მისი პროექტიდან და არა მისი დიაგნოზიდან.', en: 'Understanding a person from their project rather than their diagnosis.' }
    ],
    tags: [
      { ka: 'თავისუფლება', en: 'Freedom' },
      { ka: 'პასუხისმგებლობა', en: 'Responsibility' },
      { ka: 'ცუდი რწმენა', en: 'Bad faith' }
    ],
    related: ['beauvoir', 'heidegger']
  },

  {
    id: 'beauvoir',
    slug: 'beauvoir',
    plate: 41,
    portrait: {
      src: '/thinkers/beauvoir.png',
      credit: 'Moshe Milner',
      license: 'CC BY-SA 3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Simone_de_Beauvoir2.png'
    },
    name: { ka: 'სიმონ დე ბოვუარი', en: 'Simone de Beauvoir' },
    latin: 'Simone de Beauvoir',
    birthYear: 1908,
    deathYear: 1986,
    origin: { ka: 'საფრანგეთი', en: 'France' },
    tradition: { ka: 'ეგზისტენციალიზმი', en: 'Existentialism' },
    summary: {
      ka: 'თავისუფლება არ არსებობს ვაკუუმში — ის ყოველთვის კონკრეტულ სხეულსა და კონკრეტულ ვითარებაშია.',
      en: 'Freedom does not exist in a vacuum — it is always in a particular body and a particular situation.'
    },
    biography: {
      ka: 'დე ბოვუარმა ეგზისტენციალიზმს ის შემატა, რაც სარტრს აკლდა: ვითარების სერიოზულად აღება. თუ ჩვენ თავისუფალი ვართ, მაშინ რატომ არ არის ყველა თანაბრად თავისუფალი? მისი პასუხი — რადგან თავისუფლება ყოველთვის კონკრეტულ სხეულში, კონკრეტულ სოციალურ პოზიციაში და კონკრეტულ ეპოქაშია განფენილი.\n\n„მეორე სქესში" (1949) მან აჩვენა, თუ როგორ იქცევა ადამიანი „სხვად" — არა თავისი ბუნებით, არამედ იმ პოზიციით, რომელშიც სხვები აყენებენ. მისი ცნობილი წინადადება — „ქალად არ იბადებიან, ქალად ხდებიან" — ზუსტად ეგზისტენციალური ლოგიკაა: არსი შემდეგ მოდის.\n\n„სიბერეში" (1970) მან იგივე ყურადღება მიმართა დაბერებას და სასრულობას — თემა, რომელიც თერაპიაში დღემდე ნაკლებად არის დამუშავებული. მისი „ორაზროვნების ეთიკა" (1947) კი ალბათ ყველაზე გამოსადეგი ტექსტია თერაპევტისთვის, რომელიც ეძებს პასუხისმგებლობის ისეთ გაგებას, რომელიც ბრალდებად არ იქცევა.',
      en: 'De Beauvoir added to existentialism what Sartre lacked: taking the situation seriously. If we are free, why is not everyone equally free? Her answer is that freedom is always laid out in a particular body, a particular social position and a particular epoch.\n\nIn The Second Sex (1949) she showed how a person becomes "the Other" — not by nature but by the position others place them in. Her famous sentence, that one is not born but becomes a woman, is exactly the existential logic: essence comes afterwards.\n\nIn The Coming of Age (1970) she turned the same attention to ageing and finitude, a theme still under-worked in therapy. And The Ethics of Ambiguity (1947) may be the most useful text of all for a therapist looking for an account of responsibility that does not become blame.'
    },
    keyIdeas: [
      { ka: 'ვითარება (situation) — თავისუფლება ყოველთვის განსახიერებული და განლაგებულია', en: 'Situation — freedom is always embodied and placed' },
      { ka: 'ორაზროვნება — ჩვენ ერთდროულად სუბიექტიც ვართ და ობიექტიც', en: 'Ambiguity — we are subject and object at once' },
      { ka: '„სხვად" ქცევა როგორც სოციალური, და არა ბუნებრივი, პროცესი', en: 'Becoming "the Other" as a social, not natural, process' },
      { ka: 'დაბერება როგორც ეგზისტენციალური და არა მხოლოდ ბიოლოგიური საკითხი', en: 'Ageing as an existential question, not only a biological one' }
    ],
    works: [
      { title: { ka: 'ორაზროვნების ეთიკა', en: 'The Ethics of Ambiguity' }, year: 1947 },
      { title: { ka: 'მეორე სქესი', en: 'The Second Sex' }, year: 1949 },
      { title: { ka: 'სიბერე', en: 'The Coming of Age' }, year: 1970 }
    ],
    contributions: [
      { ka: 'თავისუფლების ცნების დაბალანსება ვითარებით — რაც თერაპიაში იცავს კლიენტს ბრალდებისგან „შენ ხომ თავისუფალი ხარ".', en: 'Balancing freedom with situation — which in the room protects a client from the accusation "but you are free".' },
      { ka: 'დაბერების, სხეულისა და სოციალური პოზიციის შეტანა ეგზისტენციალურ საუბარში.', en: 'Bringing ageing, the body and social position into the existential conversation.' },
      { ka: 'ეთიკა, რომელიც სხვისი თავისუფლების დაცვას ჩემი თავისუფლების პირობად აქცევს.', en: 'An ethics that makes protecting another’s freedom the condition of my own.' }
    ],
    tags: [
      { ka: 'ვითარება', en: 'Situation' },
      { ka: 'თავისუფლება', en: 'Freedom' },
      { ka: 'სასრულობა', en: 'Finitude' }
    ],
    related: ['sartre', 'vandeurzen']
  },

  {
    id: 'binswanger',
    slug: 'binswanger',
    plate: 53,
    portrait: {
      src: '/thinkers/binswanger.jpg',
      credit: 'Franz Vältl',
      license: 'Public domain',
      source: 'https://commons.wikimedia.org/wiki/File:Ludwig_Binswanger_(1911).jpg'
    },
    name: { ka: 'ლუდვიგ ბინსვანგერი', en: 'Ludwig Binswanger' },
    latin: 'Ludwig Binswanger',
    birthYear: 1881,
    deathYear: 1966,
    origin: { ka: 'შვეიცარია', en: 'Switzerland' },
    tradition: { ka: 'დაზაინანალიზი', en: 'Daseinsanalysis' },
    summary: {
      ka: 'პირველმა შემოიტანა ჰაიდეგერი ფსიქიატრიაში — და შეცვალა ის, რას ნიშნავს პაციენტის გაგება.',
      en: 'The first to bring Heidegger into psychiatry — changing what it means to understand a patient.'
    },
    biography: {
      ka: 'ბინსვანგერი ფროიდის მეგობარი და კორესპონდენტი იყო მთელი ცხოვრება, ამავე დროს კი მისი ერთ-ერთი ყველაზე ღრმა კრიტიკოსი. მისი შენიშვნა მარტივი და გადამწყვეტია: ფსიქოანალიზი ხსნის ადამიანს მექანიზმებით, მაგრამ არასდროს ხვდება მას როგორც სამყაროს მქონე არსებას.\n\nმან ჰაიდეგერის Dasein-ის ანალიტიკა კლინიკურ მეთოდად აქცია — Daseinsanalyse. მისი მიდგომით, თითოეულ პაციენტს აქვს საკუთარი „სამყაროს პროექტი" (Weltentwurf): სივრცის, დროის, სხეულისა და სხვებთან ურთიერთობის თავისებური წყობა. სიმპტომი არ არის უცხო შემოჭრა ამ სამყაროში — ის ამ სამყაროს ლოგიკური ნაწილია.\n\nმისი შემთხვევის აღწერები, განსაკუთრებით „ელენ ვესტის" (1944) შემთხვევა, დღემდე იკითხება. ისინი ასევე გვახსენებს ამ მიდგომის საზღვრებს: ბინსვანგერმა ვერ იხსნა ელენ ვესტი და თავად წერდა ამის შესახებ პატიოსნად, გამარჯვების პრეტენზიის გარეშე.',
      en: 'Binswanger was Freud’s friend and correspondent for a lifetime, and at the same time one of his deepest critics. His objection is simple and decisive: psychoanalysis explains a person through mechanisms but never meets them as a being who has a world.\n\nHe turned Heidegger’s analytic of Dasein into a clinical method, Daseinsanalyse. On his account each patient has their own world-design (Weltentwurf): a particular ordering of space, time, body and relation to others. The symptom is not a foreign intrusion into that world but a logical part of it.\n\nHis case studies, above all The Case of Ellen West (1944), are still read. They also mark the limits of the approach: Binswanger did not save Ellen West, and he wrote about that honestly, without claiming a victory.'
    },
    keyIdeas: [
      { ka: 'სამყაროს პროექტი (Weltentwurf) — თითოეულ ადამიანს საკუთარი სამყაროს წყობა აქვს', en: 'World-design — each person has their own ordering of a world' },
      { ka: 'სამი სამყარო: Umwelt (გარემო), Mitwelt (თანასამყარო), Eigenwelt (საკუთარი სამყარო)', en: 'Three worlds: Umwelt, Mitwelt, Eigenwelt' },
      { ka: 'სიმპტომის გაგება მისი შინაგანი ლოგიკიდან და არა კლასიფიკაციიდან', en: 'Understanding a symptom from its internal logic, not from a classification' },
      { ka: 'სიყვარული (Liebe) როგორც ყოფნის ფორმა, რომელსაც ჰაიდეგერი უგულებელყოფდა', en: 'Love as a mode of being that Heidegger neglected' }
    ],
    works: [
      { title: { ka: 'ადამიანური ყოფიერების ძირითადი ფორმები', en: 'Basic Forms of Human Existence' }, year: 1942 },
      { title: { ka: 'შემთხვევა ელენ ვესტი', en: 'The Case of Ellen West' }, year: 1944 },
      { title: { ka: 'ეგზისტენციალური ანალიზის სკოლა', en: 'Existential Analysis' }, year: 1958 }
    ],
    contributions: [
      { ka: 'სამი სამყაროს სქემა, რომელიც დღემდე გამოიყენება ეგზისტენციალურ შეფასებაში.', en: 'The three-worlds schema, still used in existential assessment.' },
      { ka: 'ფენომენოლოგიური აღწერის შემოტანა ფსიქიატრიულ პრაქტიკაში — აღწერე, სანამ ახსნი.', en: 'Bringing phenomenological description into psychiatric practice — describe before you explain.' },
      { ka: 'პაციენტის სამყაროს პატივისცემა, მისი „ირაციონალურობის" გასწორების მცდელობის გარეშე.', en: 'Respect for the patient’s world without an attempt to correct its "irrationality".' }
    ],
    tags: [
      { ka: 'დაზაინანალიზი', en: 'Daseinsanalysis' },
      { ka: 'ფენომენოლოგია', en: 'Phenomenology' },
      { ka: 'ფსიქიატრია', en: 'Psychiatry' }
    ],
    related: ['heidegger', 'may']
  },

  {
    id: 'frankl',
    slug: 'frankl',
    plate: 67,
    portrait: {
      src: '/thinkers/frankl.jpg',
      credit: 'Prof. Dr. Franz Vesely',
      license: 'CC BY-SA 3.0 DE',
      source: 'https://commons.wikimedia.org/wiki/File:Viktor_Frankl2_(cropped).jpg'
    },
    name: { ka: 'ვიქტორ ფრანკლი', en: 'Viktor Frankl' },
    latin: 'Viktor E. Frankl',
    birthYear: 1905,
    deathYear: 1997,
    origin: { ka: 'ავსტრია', en: 'Austria' },
    tradition: { ka: 'ლოგოთერაპია', en: 'Logotherapy' },
    summary: {
      ka: 'აზრი არ არის გამოგონილი — ის აღმოსაჩენია, ყველაზე ბნელ ვითარებაშიც კი.',
      en: 'Meaning is not invented but discovered — even in the darkest situation.'
    },
    biography: {
      ka: 'ვიქტორ ფრანკლი ვენელი ნევროლოგი და ფსიქიატრი იყო, რომელმაც თავისი მიდგომის ძირითადი ნაწილი ჯერ კიდევ ომამდე შეიმუშავა. 1942 წელს ის ოჯახთან ერთად დეპორტირებულ იქნა; მან სამი წელი გაატარა თერეზიენშტადტში, აუშვიცსა და კიდევ ორ ბანაკში. მისი მეუღლე, ძმა და მშობლები დაიღუპნენ.\n\n„ადამიანის აზრის ძიება" (1946) დაწერილია ცხრა დღეში. ეს არ არის წიგნი ტანჯვის განდიდების შესახებ — პირიქით, ფრანკლი ხაზგასმით ამბობს, რომ ტანჯვა თავისთავად აზრს არ ქმნის და თუ მისი აცილება შესაძლებელია, უნდა აიცილო. მისი მტკიცება სხვაა: მაშინაც კი, როცა ვერაფერს შეცვლი, რჩება არჩევანი, თუ როგორ დადგები ამის წინაშე.\n\nლოგოთერაპია, რომელიც მან ჩამოაყალიბა, „მესამე ვენური სკოლა" გახდა ფროიდისა და ადლერის შემდეგ. მისი ორი ტექნიკა — პარადოქსული ინტენცია და დერეფლექსია — დღემდე გამოიყენება და ორივე ემპირიულად შესწავლილია.',
      en: 'Viktor Frankl was a Viennese neurologist and psychiatrist who had worked out the core of his approach before the war. In 1942 he was deported with his family; he spent three years in Theresienstadt, Auschwitz and two further camps. His wife, his brother and his parents were killed.\n\nMan’s Search for Meaning (1946) was written in nine days. It is not a book that glorifies suffering — Frankl says explicitly that suffering creates no meaning in itself, and that if it can be avoided it should be. His claim is different: even when nothing can be changed, the choice of how to stand before it remains.\n\nLogotherapy, the approach he founded, became the "third Viennese school" after Freud and Adler. Its two techniques — paradoxical intention and dereflection — are still in use and both have been studied empirically.'
    },
    keyIdeas: [
      { ka: 'აზრის ნება (Wille zum Sinn) — ადამიანის ძირითადი მოტივაცია არც სიამოვნებაა, არც ძალაუფლება', en: 'The will to meaning — the primary human motivation is neither pleasure nor power' },
      { ka: 'აზრის სამი გზა: შემოქმედებითი, გამოცდილებითი და დამოკიდებულების ღირებულებები', en: 'Three roads to meaning: creative, experiential and attitudinal values' },
      { ka: 'ეგზისტენციალური ვაკუუმი — უაზრობის განცდა, როგორც თანამედროვეობის ნევროზი', en: 'The existential vacuum — the sense of meaninglessness as a modern neurosis' },
      { ka: 'ნოოგენური ნევროზი — ტანჯვა, რომელიც სულიერი და არა ფსიქიკური კონფლიქტიდან მოდის', en: 'Noogenic neurosis — suffering that arises from a spiritual rather than a psychic conflict' }
    ],
    works: [
      { title: { ka: 'ადამიანის აზრის ძიება', en: "Man's Search for Meaning" }, year: 1946 },
      { title: { ka: 'ექიმი და სული', en: 'The Doctor and the Soul' }, year: 1946 },
      { title: { ka: 'აზრის ნება', en: 'The Will to Meaning' }, year: 1969 }
    ],
    contributions: [
      { ka: 'პარადოქსული ინტენცია — ტექნიკა, რომელიც შფოთვის მოლოდინის წრეს არღვევს.', en: 'Paradoxical intention — a technique that breaks the cycle of anticipatory anxiety.' },
      { ka: 'დერეფლექსია — ჰიპერრეფლექსიის დაძლევა ყურადღების გადატანით.', en: 'Dereflection — overcoming hyper-reflection by shifting attention.' },
      { ka: 'სოკრატული დიალოგის აზრზე ორიენტირებული ფორმა.', en: 'A meaning-centred form of Socratic dialogue.' },
      { ka: 'ბაზისი თანამედროვე აზრზე ორიენტირებული თერაპიებისთვის, მათ შორის ონკოლოგიაში.', en: 'The basis for contemporary meaning-centred therapies, including in oncology.' }
    ],
    tags: [
      { ka: 'ლოგოთერაპია', en: 'Logotherapy' },
      { ka: 'აზრი', en: 'Meaning' },
      { ka: 'ტექნიკები', en: 'Techniques' }
    ],
    related: ['yalom', 'may']
  },

  {
    id: 'may',
    slug: 'may',
    plate: 71,
    portrait: {
      src: '/thinkers/may.jpg',
      credit: 'Unknown photographer',
      license: 'Public domain',
      source: 'https://commons.wikimedia.org/wiki/File:Rollo_May_USD_Alcal%C3%A1_1977.jpg'
    },
    name: { ka: 'როლო მეი', en: 'Rollo May' },
    latin: 'Rollo May',
    birthYear: 1909,
    deathYear: 1994,
    origin: { ka: 'აშშ', en: 'United States' },
    tradition: { ka: 'ამერიკული ეგზისტენციალური ფსიქოლოგია', en: 'American existential psychology' },
    summary: {
      ka: 'მან ევროპული ეგზისტენციალიზმი ამერიკულ თერაპიაში შემოიტანა და შფოთვას ღირსება დაუბრუნა.',
      en: 'He brought European existentialism into American therapy and gave anxiety back its dignity.'
    },
    biography: {
      ka: 'როლო მეი ტუბერკულოზით სამ წელს ატარებდა სანატორიუმში, სადაც კითხულობდა კირკეგორსა და ფროიდს და საკუთარ სასრულობას პირისპირ ხვდებოდა. ეს გამოცდილება მისი მთელი შემდგომი მუშაობის ფონია.\n\nმისი მთავარი წვლილი შფოთვის გადააზრებაა. „შფოთვის მნიშვნელობაში" (1950) ის განასხვავებს ნორმალურ (ეგზისტენციალურ) და ნევროზულ შფოთვას. პირველი პროპორციულია რეალურ საფრთხესთან, არ ითრგუნება და შეიძლება შემოქმედებითად გამოვიყენოთ. მეორე არაპროპორციულია, ითრგუნება და აწყობს დამცავ მექანიზმებს, რომლებიც ცხოვრებას ავიწროებს. თერაპიის მიზანი არ არის შფოთვის მოცილება — არამედ ნევროზულის ეგზისტენციალურად გარდაქმნა.\n\nკრებულმა „ყოფიერება" (1958), რომელიც მან რედაქტირებული გამოსცა, ინგლისურენოვან სამყაროს ბინსვანგერი და ევროპული დაზაინანალიზი გააცნო. ამის გარეშე იალომის მუშაობა ძნელად წარმოსადგენია.',
      en: 'Rollo May spent three years in a sanatorium with tuberculosis, reading Kierkegaard and Freud and meeting his own finitude directly. That experience is the ground of everything he wrote afterwards.\n\nHis central contribution is a rethinking of anxiety. In The Meaning of Anxiety (1950) he distinguishes normal (existential) from neurotic anxiety. The first is proportionate to a real threat, is not repressed, and can be used creatively. The second is disproportionate, is repressed, and builds defences that narrow a life. The aim of therapy is not to remove anxiety but to convert the neurotic kind into the existential kind.\n\nThe volume Existence (1958), which he co-edited, introduced Binswanger and European Daseinsanalysis to the English-speaking world. Yalom’s work is hard to imagine without it.'
    },
    keyIdeas: [
      { ka: 'ეგზისტენციალური და ნევროზული შფოთვის გამიჯვნა', en: 'The distinction between existential and neurotic anxiety' },
      { ka: 'დაიმონური (the daimonic) — ის ძალა ჩვენში, რომელიც შეიძლება შემოქმედიც იყოს და დამანგრეველიც', en: 'The daimonic — the force in us that can create as easily as destroy' },
      { ka: 'ნება და გადაწყვეტილება როგორც თერაპიის ცენტრი', en: 'Will and decision as the centre of therapy' },
      { ka: 'მითის საჭიროება — ადამიანს სჭირდება ისტორია, რომლითაც იცხოვრებს', en: 'The need for myth — a person needs a story to live by' }
    ],
    works: [
      { title: { ka: 'შფოთვის მნიშვნელობა', en: 'The Meaning of Anxiety' }, year: 1950 },
      { title: { ka: 'ყოფიერება', en: 'Existence' }, year: 1958 },
      { title: { ka: 'სიყვარული და ნება', en: 'Love and Will' }, year: 1969 },
      { title: { ka: 'თავისუფლება და ბედი', en: 'Freedom and Destiny' }, year: 1981 }
    ],
    contributions: [
      { ka: 'შფოთვის რეაბილიტაცია — ის აღარ არის მხოლოდ სამკურნალო სიმპტომი.', en: 'The rehabilitation of anxiety — no longer merely a symptom to be treated.' },
      { ka: 'ევროპული ფენომენოლოგიის ხიდი ამერიკულ ჰუმანისტურ ფსიქოლოგიასთან.', en: 'A bridge from European phenomenology to American humanistic psychology.' },
      { ka: 'თერაპევტის, როგორც თანამონაწილის და არა ექსპერტის, პოზიციის დამკვიდრება.', en: 'Establishing the therapist as fellow participant rather than expert.' }
    ],
    tags: [
      { ka: 'შფოთვა', en: 'Anxiety' },
      { ka: 'ნება', en: 'Will' },
      { ka: 'ჰუმანისტური', en: 'Humanistic' }
    ],
    related: ['yalom', 'kierkegaard']
  },

  {
    id: 'yalom',
    slug: 'yalom',
    plate: 83,
    portrait: {
      src: '/thinkers/yalom.jpg',
      credit: 'Haemmerli',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Irvin_Yalom.jpg'
    },
    name: { ka: 'ირვინ იალომი', en: 'Irvin Yalom' },
    latin: 'Irvin D. Yalom',
    birthYear: 1931,
    deathYear: null,
    origin: { ka: 'აშშ', en: 'United States' },
    tradition: { ka: 'ეგზისტენციალური ფსიქოთერაპია', en: 'Existential psychotherapy' },
    summary: {
      ka: 'მან ეგზისტენციალურ თერაპიას სტრუქტურა მისცა: ოთხი მოცემულობა და ღია, ადამიანური თერაპიული ურთიერთობა.',
      en: 'He gave existential therapy a structure: four givens, and an open, human therapeutic relationship.'
    },
    biography: {
      ka: 'ირვინ იალომი სტენფორდის ფსიქიატრიის პროფესორი და მოქმედი თერაპევტია, რომელმაც ეგზისტენციალურ მიდგომას ის მისცა, რაც მას ყველაზე მეტად აკლდა: სისტემატური, სასწავლებელი ფორმა. მისი „ეგზისტენციალური ფსიქოთერაპია" (1980) დღემდე ამ სფეროს ძირითადი სახელმძღვანელოა.\n\nმისი ორგანიზაციული იდეა მარტივია და ამიტომაც ძლიერი: ოთხი საბოლოო საზრუნავი — სიკვდილი, თავისუფლება, იზოლაცია და უაზრობა. ეს არ არის დიაგნოზები. ეს ის პირობებია, რომელთა თავიდან აცილების მცდელობაც სიმპტომს ქმნის.\n\nმისი მეორე მთავარი წვლილი თერაპიულ ურთიერთობას ეხება. იალომი ემხრობა თერაპევტის გამჭვირვალობას: მისი აზრით, ის, რაც კლიენტსა და თერაპევტს შორის ხდება ახლა, ოთახში, ყველაზე ცოცხალი მასალაა. მისი „ყოველდღიური ჯგუფი" (here-and-now) და თერაპიული რომანები — „როცა ნიცშე ტიროდა", „სიკვდილში ჩახედვა" — ამ მიდგომას ფართო აუდიტორიისთვის გახსნა.',
      en: 'Irvin Yalom is a Stanford professor of psychiatry and a practising therapist who gave the existential approach what it most lacked: a systematic, teachable form. His Existential Psychotherapy (1980) is still the field’s core text.\n\nHis organising idea is simple, and strong for that reason: four ultimate concerns — death, freedom, isolation and meaninglessness. These are not diagnoses. They are the conditions whose avoidance produces symptoms.\n\nHis second contribution concerns the therapeutic relationship. Yalom argues for therapist transparency: what happens between client and therapist now, in the room, is the most alive material available. His here-and-now group work and his therapeutic novels — When Nietzsche Wept, Staring at the Sun — opened the approach to a much wider readership.'
    },
    keyIdeas: [
      { ka: 'ოთხი საბოლოო საზრუნავი: სიკვდილი, თავისუფლება, იზოლაცია, უაზრობა', en: 'Four ultimate concerns: death, freedom, isolation, meaninglessness' },
      { ka: '„აქ და ახლა" — ურთიერთობა თერაპიის შიგნით, როგორც მთავარი მასალა', en: 'The here-and-now — the relationship inside the therapy as the primary material' },
      { ka: 'თერაპევტის გამჭვირვალობა შერჩევითი და კლიენტის სასარგებლოდ გამოყენებული', en: 'Therapist transparency, selective and used in the client’s interest' },
      { ka: '„ტალღების ეფექტი" (rippling) — ის, რასაც ვტოვებთ სხვებში, სიკვდილის შფოთვის ერთი პასუხია', en: 'Rippling — what we leave in others as one answer to death anxiety' }
    ],
    works: [
      { title: { ka: 'ჯგუფური ფსიქოთერაპიის თეორია და პრაქტიკა', en: 'The Theory and Practice of Group Psychotherapy' }, year: 1970 },
      { title: { ka: 'ეგზისტენციალური ფსიქოთერაპია', en: 'Existential Psychotherapy' }, year: 1980 },
      { title: { ka: 'სიყვარულის ჯალათი', en: "Love's Executioner" }, year: 1989 },
      { title: { ka: 'როცა ნიცშე ტიროდა', en: 'When Nietzsche Wept' }, year: 1992 },
      { title: { ka: 'სიკვდილში ჩახედვა', en: 'Staring at the Sun' }, year: 2008 }
    ],
    contributions: [
      { ka: 'ოთხი მოცემულობის ჩარჩო, რომელიც ამ პლატფორმის ხერხემალია.', en: 'The four-givens framework, which is the spine of this platform.' },
      { ka: 'ეგზისტენციალური მუშაობის სწავლებადი ფორმა — მანამდე ის ძირითადად ფილოსოფიური იყო.', en: 'A teachable form for existential work, which had been largely philosophical before.' },
      { ka: 'თერაპიული ურთიერთობის, როგორც ინსტრუმენტის და არა ფონის, დამკვიდრება.', en: 'Establishing the therapeutic relationship as the instrument rather than the backdrop.' }
    ],
    tags: [
      { ka: 'ოთხი მოცემულობა', en: 'Four givens' },
      { ka: 'აქ და ახლა', en: 'Here and now' },
      { ka: 'ჯგუფური თერაპია', en: 'Group therapy' }
    ],
    related: ['may', 'frankl']
  },

  {
    id: 'vandeurzen',
    slug: 'van-deurzen',
    plate: 97,
    portrait: {
      src: '/thinkers/van-deurzen.jpg',
      credit: 'Astarkind',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:EmmyvanDeurzen.jpg'
    },
    name: { ka: 'ემი ვან დორზენი', en: 'Emmy van Deurzen' },
    latin: 'Emmy van Deurzen',
    birthYear: 1951,
    deathYear: null,
    origin: { ka: 'ნიდერლანდები · გაერთიანებული სამეფო', en: 'Netherlands · United Kingdom' },
    tradition: { ka: 'ბრიტანული ეგზისტენციალური სკოლა', en: 'British existential school' },
    summary: {
      ka: 'თანამედროვე ხმა, რომელმაც ეგზისტენციალურ თერაპიას პრაქტიკული სტრუქტურა და ინსტიტუციური ადგილი მისცა.',
      en: 'A contemporary voice who gave existential therapy a practical structure and an institutional home.'
    },
    biography: {
      ka: 'ემი ვან დორზენი ბრიტანული ეგზისტენციალური სკოლის ერთ-ერთი დამფუძნებელია. მან შექმნა სასწავლო პროგრამები და ინსტიტუტები, რომლებმაც ეს მიდგომა აკადემიურ და პროფესიულ სივრცეში დაამკვიდრა — რაც მანამდე მისი სისუსტე იყო.\n\nმისი ყველაზე პრაქტიკული წვლილი ბინსვანგერის სამი სამყაროს გაფართოებაა ოთხ განზომილებამდე: ფიზიკური (Umwelt), სოციალური (Mitwelt), ფსიქოლოგიური (Eigenwelt) და სულიერი (Überwelt). ეს გვაძლევს სამუშაო რუკას — თერაპევტს შეუძლია იკითხოს, რომელ განზომილებაშია დღეს კლიენტის სირთულე და რომელი დარჩა უყურადღებოდ.\n\nმისი წიგნები, განსაკუთრებით „ეგზისტენციალური კონსულტირება პრაქტიკაში", განზრახ ხელმისაწვდომია. ის ამტკიცებს, რომ ეგზისტენციალურ თერაპიას არ სჭირდება ბუნდოვანება იმისთვის, რომ ღრმა იყოს.',
      en: 'Emmy van Deurzen is a founder of the British existential school. She built the training programmes and institutions that gave the approach a place in academic and professional life — previously one of its weaknesses.\n\nHer most practical contribution is the extension of Binswanger’s three worlds into four dimensions: physical (Umwelt), social (Mitwelt), psychological (Eigenwelt) and spiritual (Überwelt). This gives a working map — a therapist can ask which dimension a client’s difficulty lives in today, and which has gone unattended.\n\nHer books, above all Existential Counselling and Psychotherapy in Practice, are deliberately accessible. She argues that existential therapy does not need obscurity in order to be deep.'
    },
    keyIdeas: [
      { ka: 'ოთხი განზომილება: ფიზიკური, სოციალური, ფსიქოლოგიური, სულიერი', en: 'Four dimensions: physical, social, psychological, spiritual' },
      { ka: 'ცხოვრების პარადოქსებთან მუშაობა მათი გადაწყვეტის ნაცვლად', en: 'Working with life’s paradoxes rather than resolving them' },
      { ka: 'ღირებულებების და მრწამსის მკაფიო რუკის შედგენა კლიენტთან ერთად', en: 'Mapping values and beliefs explicitly with the client' },
      { ka: 'ეგზისტენციალური თერაპია როგორც სწავლება ცხოვრებაში და არა მკურნალობა', en: 'Existential therapy as an education in living rather than a treatment' }
    ],
    works: [
      { title: { ka: 'ეგზისტენციალური კონსულტირება პრაქტიკაში', en: 'Existential Counselling & Psychotherapy in Practice' }, year: 1988 },
      { title: { ka: 'ყოველდღიური საიდუმლოებები', en: 'Everyday Mysteries' }, year: 1997 },
      { title: { ka: 'ფსიქოთერაპია და ბედნიერების ძიება', en: 'Psychotherapy and the Quest for Happiness' }, year: 2009 }
    ],
    contributions: [
      { ka: 'ოთხგანზომილებიანი შეფასების ჩარჩო, რომელიც პირველივე სესიაზე გამოიყენება.', en: 'A four-dimensional assessment framework usable from the first session.' },
      { ka: 'ეგზისტენციალური ტრენინგის ინსტიტუციონალიზაცია ევროპაში.', en: 'The institutionalisation of existential training in Europe.' },
      { ka: 'მიდგომის ენის გამარტივება მისი სიღრმის შენარჩუნებით.', en: 'Simplifying the language of the approach without losing its depth.' }
    ],
    tags: [
      { ka: 'ოთხი განზომილება', en: 'Four dimensions' },
      { ka: 'პრაქტიკა', en: 'Practice' },
      { ka: 'თანამედროვე', en: 'Contemporary' }
    ],
    related: ['binswanger', 'beauvoir']
  }
];
