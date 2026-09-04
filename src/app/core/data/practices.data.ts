/* ==========================================================================
   practices.js — the interventions.

   Shape mirrors the CBT `Technique` model: slug, summary, whatItIs, whyItWorks,
   howToUse[], pitfalls[], tryIt{label,path}. The `tryIt` cross-link is used
   properly here — every practice points into a game or the inventory tool. In
   the CBT platform that field existed but led almost nowhere.
   ========================================================================== */

import type { Practice } from '../models';

export const PRACTICES: Practice[] = [
  {
    id: 'socratic',
    slug: 'socratic-dialogue',
    icon: 'message-circle',
    order: 1,
    title: { ka: 'სოკრატული დიალოგი', en: 'Socratic dialogue' },
    original: 'Socratic dialogue',
    summary: {
      ka: 'კითხვა, რომელიც პასუხს არ ითხოვს თერაპევტისგან — ის კლიენტს საკუთარ ცოდნასთან აბრუნებს.',
      en: 'A question that asks nothing of the therapist — it returns the client to what they already know.'
    },
    whatItIs: {
      ka: 'სოკრატული დიალოგი ეგზისტენციალურ თერაპიაში სხვა რამეა, ვიდრე კპთ-ში. კპთ-ში სოკრატული კითხვა ამოწმებს აზრის სისწორეს: „რა მტკიცებულება გაქვთ?" ეგზისტენციალურ თერაპიაში ის ღრმავდება მნიშვნელობისკენ: „და თუ ეს ასეა, რას ნიშნავს ეს თქვენი ცხოვრებისთვის?"\n\nთერაპევტი აქ არ იცის პასუხი წინასწარ. ეს არ არის რიტორიკული ხერხი, რომლითაც კლიენტი წინასწარ არჩეულ დასკვნამდე მიჰყავთ. თუ თერაპევტმა უკვე იცის, სად უნდა მივიდეს საუბარი, ეს აღარ არის სოკრატული დიალოგი — ეს დარწმუნებაა.',
      en: 'Socratic dialogue in existential therapy is a different thing from its CBT namesake. In CBT the Socratic question tests the accuracy of a thought: "what is your evidence?" In existential therapy it deepens toward significance: "and if that is so, what does it mean for your life?"\n\nThe therapist here does not know the answer in advance. This is not a rhetorical device for walking a client to a predetermined conclusion. If the therapist already knows where the conversation should arrive, it is no longer Socratic dialogue — it is persuasion.'
    },
    whyItWorks: {
      ka: 'იმიტომ, რომ პასუხი, რომელსაც ადამიანი თავად პოულობს, სხვაგვარად იჭრება, ვიდრე ის, რომელიც მიეწოდება. და იმიტომაც, რომ ეს ფორმა თავად ახორციელებს იმას, რასაც ეგზისტენციალური თერაპია ამტკიცებს: რომ ავტორობა კლიენტისაა. თუ თერაპევტი პასუხს იძლევა, ის იმავე მოძრაობით ართმევს კლიენტს პასუხისმგებლობას.',
      en: 'Because an answer a person finds themselves lands differently from one handed to them. And because the form itself enacts what existential therapy claims: that authorship belongs to the client. A therapist who supplies the answer removes, in the same movement, the responsibility.'
    },
    howToUse: {
      ka: [
        'დაიწყეთ იმით, რაც კლიენტმა ახლახან თქვა, და არა თქვენი დღის წესრიგით.',
        'იკითხეთ ერთი კითხვა და დაელოდეთ. სიჩუმე ამ მეთოდის ნაწილია, არა მისი წარუმატებლობა.',
        'გადადით ფაქტიდან მნიშვნელობაზე: „როგორ იყო ეს?" შემდეგ „რას ნიშნავს ეს თქვენთვის?"',
        'დააკვირდით ზმნებს. „მოხდა" და „გავაკეთე" ორი სხვადასხვა სამყაროა.',
        'როცა კლიენტი პასუხს პოულობს, ნუ დაასრულებთ მას მის მაგივრად.'
      ],
      en: [
        'Begin from what the client has just said, not from your agenda.',
        'Ask one question and wait. Silence is part of the method, not its failure.',
        'Move from fact to significance: "what was that like?" then "what does that mean for you?"',
        'Attend to the verbs. "It happened" and "I did it" are two different worlds.',
        'When the client finds the answer, do not finish it for them.'
      ]
    },
    pitfalls: {
      ka: [
        'კითხვების წყება, რომელიც დაკითხვად იქცევა. სამზე მეტი ზედიზედ კითხვა უკვე ზეწოლაა.',
        'კითხვა, რომელშიც პასუხი უკვე ჩადებულია: „არ ფიქრობთ, რომ...?"',
        'მნიშვნელობისკენ ნაადრევი გადასვლა, სანამ კლიენტმა ფაქტი ბოლომდე არ თქვა.',
        'სიჩუმის შევსება იმიტომ, რომ თერაპევტს უხერხულობა აწუხებს.'
      ],
      en: [
        'A run of questions that becomes an interrogation. More than three in a row is already pressure.',
        'A question with the answer already inside it: "don’t you think that…?"',
        'Moving to significance before the client has finished telling the fact.',
        'Filling the silence because the therapist is uncomfortable in it.'
      ]
    },
    tryIt: { key: 'games.branching.title', path: 'game-branching.html' },
    relatedGiven: ['freedom', 'meaninglessness']
  },

  {
    id: 'dereflection',
    slug: 'dereflection',
    icon: 'compass',
    order: 2,
    title: { ka: 'დერეფლექსია', en: 'Dereflection' },
    original: 'Dereflexion',
    summary: {
      ka: 'ყურადღების მოხსნა საკუთარი თავიდან და მიმართვა იმისკენ, რაც კაცს გარეთ ელოდება.',
      en: 'Taking attention off oneself and turning it toward what waits outside.'
    },
    whatItIs: {
      ka: 'ფრანკლმა შენიშნა, რომ ბევრი სიმპტომი თავად დაკვირვებით მძაფრდება. ადამიანი, რომელიც ძილს აკვირდება, ვერ იძინებს. ადამიანი, რომელიც სექსუალურ რეაქციას აკვირდება, კარგავს მას. ამას მან ჰიპერრეფლექსია უწოდა.\n\nდერეფლექსია ამის საპირისპიროა. ის არ ეუბნება კლიენტს „ნუ იფიქრებ ამაზე" — ეს არასდროს მუშაობს. ის მას სთავაზობს რაღაც სხვას, რაც მისი ყურადღების ღირსია: კონკრეტულ საქმეს, კონკრეტულ ადამიანს, კონკრეტულ ამოცანას სამყაროში.',
      en: 'Frankl noticed that many symptoms are intensified by observation itself. Someone watching their sleep cannot sleep. Someone watching their sexual response loses it. He called this hyper-reflection.\n\nDereflection is the counter-move. It does not tell the client "stop thinking about it" — that never works. It offers something else worthy of their attention: a particular task, a particular person, a particular claim the world is making on them.'
    },
    whyItWorks: {
      ka: 'იმიტომ, რომ ყურადღება არ იძირება ბრძანებით — ის გადადის. და იმიტომ, რომ ფრანკლის თანახმად, ადამიანი თავისი ბუნებით „თვითტრანსცენდენტურია": ის ყველაზე სრულად მაშინ არსებობს, როცა საკუთარ თავზე არ არის მიმართული. ბედნიერება, მისი სიტყვებით, ვერ დაისახება მიზნად — ის მოჰყვება.',
      en: 'Because attention is not suppressed by command — it is displaced. And because on Frankl’s account a person is by nature self-transcendent: they exist most fully when not aimed at themselves. Happiness, in his phrase, cannot be pursued — it ensues.'
    },
    howToUse: {
      ka: [
        'ჯერ დაადასტურეთ სიმპტომი. დერეფლექსია არ არის მისი უარყოფა.',
        'იპოვეთ, რას აკვირდება კლიენტი ზედმეტად — ძილს, სუნთქვას, საკუთარ შესრულებას, სხვების რეაქციას.',
        'იკითხეთ, რას აკეთებდა ის მანამ, სანამ ეს დაკვირვება დაიწყო.',
        'იპოვეთ კონკრეტული, არა აბსტრაქტული მიმართულება: არა „იფიქრეთ სხვა რამეზე", არამედ „ვინ დაგელოდებათ ხვალ?"',
        'დაუბრუნდით ამას რამდენიმე სესიაზე. ეს არ არის ერთჯერადი ხრიკი.'
      ],
      en: [
        'Acknowledge the symptom first. Dereflection is not a denial of it.',
        'Find what the client is over-observing — sleep, breath, their own performance, others’ reactions.',
        'Ask what they were doing before that observing began.',
        'Find a concrete direction, not an abstract one: not "think about something else" but "who is expecting you tomorrow?"',
        'Return to it across several sessions. This is not a one-off trick.'
      ]
    },
    pitfalls: {
      ka: [
        'გამოყენება როგორც ყურადღების გაფანტვა. თუ კლიენტი გრძნობს, რომ თემას აცილებთ, ის მართალია.',
        'გამოყენება იქ, სადაც სიმპტომს რეალური და გადაუდებელი მიზეზი აქვს — მაგალითად ტრავმის შემდეგ.',
        'აბსტრაქტული „აზრის" შეთავაზება იმის ნაცვლად, რომ კლიენტმა თავად იპოვოს კონკრეტული მიმართულება.'
      ],
      en: [
        'Using it as distraction. If the client feels you are avoiding the theme, they are right.',
        'Using it where the symptom has a real and urgent cause — after a trauma, for instance.',
        'Offering an abstract "meaning" instead of letting the client find a concrete direction.'
      ]
    },
    tryIt: { key: 'nav.inventory', path: 'inventory.html' },
    relatedGiven: ['meaninglessness']
  },

  {
    id: 'paradoxical',
    slug: 'paradoxical-intention',
    icon: 'shuffle',
    order: 3,
    title: { ka: 'პარადოქსული ინტენცია', en: 'Paradoxical intention' },
    original: 'Paradoxe Intention',
    summary: {
      ka: 'კლიენტს ვთხოვთ, განზრახ მოიწვიოს ის, რისიც ეშინია — ხშირად იუმორის თანხლებით.',
      en: 'Asking the client to deliberately invite the very thing they fear — often with humour.'
    },
    whatItIs: {
      ka: 'ფრანკლმა შენიშნა მოლოდინის შფოთვის (anticipatory anxiety) წრე: ადამიანს ეშინია, რომ გაწითლდება; ამ შიშმა გამოიწვია გაწითლება; გაწითლებამ გააძლიერა შიში. წრე დახურულია.\n\nპარადოქსული ინტენცია ამ წრეს არღვევს. კლიენტს, რომელსაც ოფლიანობის ეშინია, ფრანკლი სთავაზობდა: „აჩვენეთ მათ, რამდენად შეგიძლიათ ოფლიანობა — ერთი ლიტრი გუშინ იყო, დღეს ათი ვცადოთ." იუმორი აქ ტექნიკის ნაწილია, არა შემთხვევითი. ის კლიენტს სიმპტომისგან დისტანციას აძლევს.',
      en: 'Frankl observed the circle of anticipatory anxiety: a person fears they will blush; the fear produces the blush; the blush strengthens the fear. The circle is closed.\n\nParadoxical intention breaks it. To a client afraid of sweating, Frankl would suggest: show them how much you can really sweat — yesterday it was a litre, today let us try ten. The humour is part of the technique, not incidental. It gives the client distance from the symptom.'
    },
    whyItWorks: {
      ka: 'ორი მექანიზმით. პირველი — ის აუქმებს მოლოდინის შფოთვას: თუ სიმპტომს ვიწვევ, მისი მოსვლა აღარ არის მარცხი. მეორე — ის ააქტიურებს იმას, რასაც ფრანკლი „თვითდისტანცირებას" (Selbstdistanzierung) უწოდებდა: უნარს, გავიხედოთ საკუთარ თავზე გვერდიდან. ეს უნარი, მისი აზრით, სპეციფიკურად ადამიანურია.',
      en: 'By two mechanisms. First, it dissolves anticipatory anxiety: if I am inviting the symptom, its arrival is no longer a failure. Second, it activates what Frankl called self-distancing — the capacity to look at oneself from the side. That capacity, in his view, is specifically human.'
    },
    howToUse: {
      ka: [
        'გამოიყენეთ იქ, სადაც სიმპტომს მოლოდინის შფოთვა კვებავს: უძილობა, გაწითლება, კანკალი, პანიკა, ბლოკირებული მეტყველება.',
        'ჩამოაყალიბეთ წინადადება კლიენტთან ერთად და მისივე სიტყვებით.',
        'იუმორი უნდა იყოს კლიენტთან ერთად და არა მასზე. თუ ეს ხაზი გადაიკვეთა, ტექნიკა დამაზიანებელი ხდება.',
        'იწინასწარმეტყველეთ, რომ პირველად შეიძლება არ იმუშაოს — და რომ ესეც კარგია.'
      ],
      en: [
        'Use it where anticipatory anxiety feeds the symptom: insomnia, blushing, trembling, panic, blocked speech.',
        'Compose the sentence together with the client, in their own words.',
        'The humour must be with the client, never at them. Cross that line and the technique harms.',
        'Predict that it may not work the first time — and that this is also fine.'
      ]
    },
    pitfalls: {
      ka: [
        'გამოყენება დეპრესიის, სუიციდური აზრების ან მწვავე ტრავმის დროს. აქ ის აბსოლუტურად უადგილოა.',
        'გამოყენება მყარი თერაპიული ალიანსის გარეშე — კლიენტმა შეიძლება დაცინვად აღიქვას.',
        'ტექნიკის მექანიკური გამეორება მაშინ, როცა ის აშკარად არ მუშაობს.',
        'დაბნეულობა ექსპოზიციასთან. ეს არ არის ექსპოზიცია: მიზანი ჩვევა კი არა, დამოკიდებულების შეცვლაა.'
      ],
      en: [
        'Using it in depression, suicidal ideation or acute trauma. There it is entirely out of place.',
        'Using it without a solid alliance — the client may hear mockery.',
        'Repeating it mechanically when it plainly is not working.',
        'Confusing it with exposure. This is not exposure: the aim is a changed attitude, not habituation.'
      ]
    },
    tryIt: { key: 'games.terms.title', path: 'game-terms.html' },
    relatedGiven: ['freedom']
  },

  {
    id: 'meaning-centred',
    slug: 'meaning-centred',
    icon: 'target',
    order: 4,
    title: { ka: 'აზრზე ორიენტირებული ჩარევები', en: 'Meaning-centred interventions' },
    original: 'meaning-centred interventions',
    summary: {
      ka: 'აზრის ძებნა არა აბსტრაქციაში, არამედ იმაში, რასაც ეს კონკრეტული ცხოვრება უკვე შეიცავს.',
      en: 'Looking for meaning not in the abstract but in what this particular life already holds.'
    },
    whatItIs: {
      ka: 'ეს არის ჩარევათა ჯგუფი და არა ერთი ტექნიკა. მისი საერთო ლოგიკა ფრანკლისეულია: აზრი კონკრეტულია. კითხვა არ არის „რა აზრი აქვს ცხოვრებას" — ეს კითხვა ისეთივეა, როგორც „რომელი სვლაა საუკეთესო ჭადრაკში". პასუხი დამოკიდებულია პოზიციაზე.\n\nპრაქტიკულად ეს ნიშნავს სამი გზის კვლევას: რას ქმნის ეს ადამიანი (შემოქმედებითი ღირებულებები), რას იღებს (გამოცდილებითი), და როგორ დგას იმის წინაშე, რაც ვერ იცვლება (დამოკიდებულების ღირებულებები). ბოლო ფრანკლისთვის უმაღლესია.',
      en: 'This is a family of interventions rather than a single technique. Their shared logic is Frankl’s: meaning is concrete. The question is not "what is the meaning of life" — that is like asking which is the best move in chess. The answer depends on the position.\n\nIn practice it means exploring three roads: what this person creates (creative values), what they receive (experiential values), and how they stand before what cannot change (attitudinal values). The last, for Frankl, is the highest.'
    },
    whyItWorks: {
      ka: 'იმიტომ, რომ უაზრობის განცდა იშვიათად არის ტოტალური. თითქმის ყოველთვის რჩება რაღაც — ერთი ადამიანი, ერთი საქმე, ერთი ვალდებულება — რომელიც ჯერ კიდევ ითხოვს პასუხს. აზრზე ორიენტირებული მუშაობა ამას პოულობს და აძლიერებს, ნაცვლად იმისა, რომ დიდი პასუხი შესთავაზოს.\n\nეს მიდგომა ემპირიულადაც შესწავლილია: აზრზე ორიენტირებული ჯგუფური თერაპია მოწინავე კიბოს მქონე პაციენტებთან სულიერი კეთილდღეობის გაუმჯობესებას აჩვენებს რანდომიზებულ კვლევებში.',
      en: 'Because the sense of meaninglessness is rarely total. Almost always something remains — one person, one task, one obligation — that is still asking for a response. Meaning-centred work finds and strengthens that, instead of offering a grand answer.\n\nThe approach has also been studied: meaning-centred group therapy with patients who have advanced cancer shows improvement in spiritual well-being in randomised trials.'
    },
    howToUse: {
      ka: [
        'იკითხეთ ბიოგრაფიულად: „როდის იყო ბოლოს, როცა დღე ღირებული გეჩვენებოდათ?"',
        'გამოიკვლიეთ სამივე გზა ცალკე. ხშირად ერთი დახურულია და ორი ღიაა.',
        'ეძებეთ კონკრეტული: არა „ოჯახი", არამედ „ვინ ოჯახში და რა ხდება მასთან".',
        'დამოკიდებულების ღირებულებებთან მიდით ბოლოს და ფრთხილად — მხოლოდ მაშინ, როცა ცვლილება მართლა შეუძლებელია.',
        'ნუ დაასრულებთ სესიას აზრის „მიგნებით". ეს ხანგრძლივი მუშაობაა.'
      ],
      en: [
        'Ask biographically: "when was the last time a day felt worth something?"',
        'Explore all three roads separately. Often one is closed and two are open.',
        'Look for the concrete: not "family" but "who in the family, and what is happening with them".',
        'Come to attitudinal values last and carefully — only where change is genuinely impossible.',
        'Do not end the session with meaning "found". This is long work.'
      ]
    },
    pitfalls: {
      ka: [
        'ტანჯვის რომანტიზება. ფრანკლი ცალსახად ამბობდა: თუ ტანჯვის აცილება შეიძლება, უნდა აიცილო.',
        'აზრის შეთავაზება ნაცვლად მისი პოვნისა. თერაპევტის აზრი კლიენტისთვის აზრი არ არის.',
        'დამოკიდებულების ღირებულებებზე ნაადრევად გადასვლა, როცა კლიენტს ჯერ კიდევ შეუძლია ვითარების შეცვლა.',
        'უაზრობის განცდის დაბნეულობა დეპრესიასთან. ისინი ერთმანეთს ხშირად ჰგვანან და სხვადასხვა პასუხს ითხოვს.'
      ],
      en: [
        'Romanticising suffering. Frankl was explicit: if suffering can be avoided, it should be.',
        'Supplying meaning instead of finding it. The therapist’s meaning is not the client’s.',
        'Moving to attitudinal values too early, while the client can still change the situation.',
        'Confusing the sense of meaninglessness with depression. They often resemble each other and call for different responses.'
      ]
    },
    tryIt: { key: 'nav.inventory', path: 'inventory.html' },
    relatedGiven: ['meaninglessness', 'death']
  },

  {
    id: 'confronting',
    slug: 'confronting-the-given',
    icon: 'anchor',
    order: 5,
    title: { ka: 'მოცემულობასთან შეხვედრა', en: 'Confronting the given' },
    original: 'confronting the given',
    summary: {
      ka: 'იმის სახელით დასახელება, რასაც ყველა ხედავს და არავინ ამბობს.',
      en: 'Naming, by its name, the thing everyone sees and no one says.'
    },
    whatItIs: {
      ka: 'ეს არის ყველაზე მარტივი და ყველაზე ძნელი ჩარევა. კლიენტი ლაპარაკობს ძილის პრობლემაზე, სამსახურის სტრესზე, პარტნიორის ქცევაზე — და ოთახში დგას რაღაც უფრო დიდი, რასაც არავინ ეხება: ის კვდება, ან მარტოა, ან იცის, რომ არასწორ ცხოვრებას ცხოვრობს.\n\nმოცემულობასთან შეხვედრა ნიშნავს ამის მშვიდად და პირდაპირ თქმას. არა დრამატულად, არა ბრალდებით, არა როგორც გამოცხადება — უბრალოდ სახელით.',
      en: 'This is the simplest and the hardest intervention. The client talks about sleep, about stress at work, about a partner’s behaviour — and something larger is standing in the room that no one touches: they are dying, or they are alone, or they know they are living the wrong life.\n\nConfronting the given means saying that calmly and directly. Not dramatically, not accusingly, not as a revelation — simply by its name.'
    },
    whyItWorks: {
      ka: 'იმიტომ, რომ თავიდან აცილება ენერგიას ხარჯავს და მარტოობას აწარმოებს. როცა თერაპევტი ასახელებს იმას, რასაც კლიენტი ვერ ბედავს, ორი რამ ხდება ერთდროულად: თემა უცებ ნაკლებად საშიში ხდება, და კლიენტი აღმოაჩენს, რომ ამ თემასთან მარტო აღარ არის.\n\nიალომი ამბობდა, რომ თერაპევტის ყველაზე ხშირი შეცდომა ის არის, რომ ის კლიენტს დაცვას სთავაზობს, რომელიც კლიენტს არ სთხოვია.',
      en: 'Because avoidance costs energy and produces isolation. When the therapist names what the client dare not, two things happen at once: the subject becomes less dangerous, and the client discovers they are no longer alone with it.\n\nYalom observed that the therapist’s most common error is offering the client a protection the client never asked for.'
    },
    howToUse: {
      ka: [
        'დაელოდეთ, სანამ ალიანსი გაძლებს. ეს არ არის პირველი სესიის ჩარევა.',
        'ისაუბრეთ მარტივი, ყოველდღიური სიტყვებით. „სიკვდილი", და არა „სასრულობის საკითხი".',
        'თქვით და გაჩერდით. ნუ შეამსუბუქებთ დაუყოვნებლივ.',
        'დააკვირდით საკუთარ თავს: თუ თემას აცილებთ, ეს ხშირად თერაპევტის შფოთვაა და არა კლიენტის მზაობის ნაკლებობა.',
        'დაუშვით, რომ კლიენტმა შეიძლება უარყოს. ეს არ არის მარცხი — თესლი დარგულია.'
      ],
      en: [
        'Wait until the alliance can hold it. This is not a first-session intervention.',
        'Use plain, everyday words. "Death", not "the question of finitude".',
        'Say it and stop. Do not soften it immediately.',
        'Watch yourself: if you are avoiding the theme, that is usually the therapist’s anxiety, not the client’s unreadiness.',
        'Allow that the client may refuse it. That is not a failure — the seed is planted.'
      ]
    },
    pitfalls: {
      ka: [
        'ნაადრევი კონფრონტაცია, რომელიც კლიენტს ტოვებს გახსნილს და დაუცველს.',
        'თერაპევტის ინტელექტუალური სიამოვნება — ეგზისტენციალური თემები საინტერესოა და სწორედ ეს არის საფრთხე.',
        'კონფრონტაცია, რომელიც სინამდვილეში თერაპევტის საკუთარი შფოთვის გამოხატულებაა.',
        'თემის დატოვება უპასუხოდ სესიის ბოლოს. თუ გახსენით, დაუთმეთ დრო.'
      ],
      en: [
        'Premature confrontation that leaves the client opened and unprotected.',
        'The therapist’s intellectual pleasure — existential themes are interesting, and that is exactly the danger.',
        'A confrontation that is really an expression of the therapist’s own anxiety.',
        'Leaving the theme unattended at the end of a session. If you opened it, give it time.'
      ]
    },
    tryIt: { key: 'games.givens.title', path: 'game-givens.html' },
    relatedGiven: ['death', 'isolation']
  }
];
