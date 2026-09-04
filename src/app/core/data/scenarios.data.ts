/* ==========================================================================
   scenarios.js — eight clinical vignettes.

   The structural equivalent of the CBT `CaseStudy`, but the interaction is
   different. CBT simulated a chat with an LLM persona and then scored the
   therapist with an English keyword-matching rubric — which scored near zero
   for any session conducted in Georgian. Here the vignette is a reading
   exercise with a genuine pause built into it: the reflection prompt comes
   first, the therapeutic response is revealed only afterwards, and nothing is
   scored at all.

   Every person and situation here is invented. Each situation runs 150–250
   words in both languages.
   ========================================================================== */

import type { Scenario } from '../models';

export const SCENARIOS: Scenario[] = [
  {
    id: 'diagnosis',
    order: 1,
    icon: 'hourglass',
    title: { ka: 'დიაგნოზის შემდეგ', en: 'After the diagnosis' },
    person: { ka: 'ნინო, 52 წლის', en: 'Nino, 52' },
    concernIds: ['death', 'meaninglessness'],
    practiceSlug: 'confronting-the-given',
    situation: {
      ka: 'ნინო ორი თვის წინ გაიგო დიაგნოზი. მკურნალობა დაწყებულია და პროგნოზი, ექიმების თქმით, „საკმაოდ კარგია". ის თერაპიაზე მოვიდა იმიტომ, რომ, მისივე სიტყვებით, „ვერ ვიძინებ და გამაღიზიანებელი გავხდი".\n\nსესიაზე ის საუბრობს პრაქტიკულ საკითხებზე: ანალიზების გრაფიკზე, სამსახურში საავადმყოფო ფურცელზე, იმაზე, რომ ქმარი ზედმეტად ფრთხილობს და ეს ანერვიულებს. ყოველ ჯერზე, როცა საუბარი უფრო ღრმა ხდება, ის სწრაფად უბრუნდება ორგანიზაციულ დეტალებს.\n\nმეორე სესიის ბოლოს ის უეცრად ამბობს: „ყველა მეუბნება, რომ დადებითად უნდა ვიფიქრო. ჩემი და დამირეკავს და მეუბნება, რომ ერთი ნაცნობი ოცი წელია ცოცხალია. მე კი ვფიქრობ — და თუ არა?" შემდეგ ის მაშინვე იცინის და ამბობს: „უკაცრავად. სისულელეს ვამბობ."\n\nოთახში სიჩუმეა. ის ხელჩანთას იღებს, თითქოს წასასვლელად ემზადებოდეს, თუმცა სესიას კიდევ ათი წუთი დარჩა.',
      en: 'Nino received her diagnosis two months ago. Treatment has begun and the prognosis, her doctors say, is "quite good". She came to therapy because, in her own words, "I cannot sleep and I have become irritable".\n\nIn the session she talks about practical matters: the schedule of tests, the sick note at work, the fact that her husband is being too careful with her and it grates. Each time the conversation moves toward something deeper she returns quickly to the logistics.\n\nAt the end of the second session she says suddenly: "Everyone tells me I must think positively. My sister rings and tells me about someone she knows who has been alive twenty years. And I think — and what if not?" Then she laughs at once and says: "Sorry. I am talking nonsense."\n\nThe room is quiet. She picks up her handbag as though preparing to leave, although there are ten minutes of the session left.'
    },
    reflectionPrompt: {
      ka: 'რას აკეთებს ნინო იმ სიტყვებით „უკაცრავად, სისულელეს ვამბობ"? და რას გააკეთებდით თქვენ იმ ათ წუთში, რომელიც დარჩა?',
      en: 'What is Nino doing with the words "sorry, I am talking nonsense"? And what would you do with the ten minutes that remain?'
    },
    therapistResponse: {
      ka: 'თერაპევტი არ იჩქარებს ხელჩანთის შენიშვნას და არ ამშვიდებს. ის ჩუმად ამბობს: „მე არ მგონია, რომ სისულელე თქვით. მგონია, რომ ყველაზე მნიშვნელოვანი თქვით და მაშინვე უკან წაიღეთ."\n\nეს არის მოცემულობასთან შეხვედრა. ნინოს გარშემო ყველა — და და, ქმარი, კოლეგები — ერთსა და იმავეს აკეთებს: სიკვდილის თემას ხურავს დადებითი აზროვნების სახელით. ის ამას მათ ბრალად არ უთვლის, მაგრამ შედეგად მარტოა ყველაზე მნიშვნელოვან კითხვასთან.\n\nთერაპევტის ამოცანა აქ არ არის ნინოს დარწმუნება, რომ ის მოკვდება, და არც იმის დარწმუნება, რომ არა. მისი ამოცანაა, იყოს ერთადერთი ადამიანი, ვინც ამ კითხვას არ გაექცა. „და თუ არა" — ეს კითხვა ოთახში დარჩა.\n\nშემდეგი ნაბიჯი ნაზია და კონკრეტული: „როცა ღამით ვერ იძინებთ — რა არის ის, რაზეც ფიქრობთ?" ეს კითხვა უძილობას სიმპტომიდან შესასვლელად აქცევს. ხშირად სწორედ იქ, ღამის სამ საათზე, ცხოვრობს ის, რასაც დღისით არავინ ეკითხება.',
      en: 'The therapist does not remark on the handbag and does not reassure. Quietly they say: "I don’t think you were talking nonsense. I think you said the most important thing and took it straight back."\n\nThis is confronting the given. Everyone around Nino — her sister, her husband, her colleagues — is doing the same thing: closing the subject of death in the name of positive thinking. She does not hold it against them, but the result is that she is alone with the most important question she has.\n\nThe therapist’s task here is not to convince Nino that she will die, nor that she will not. It is to be the one person who did not flee the question. "And what if not" — that question stays in the room.\n\nThe next move is gentle and concrete: "When you cannot sleep at night — what is it that you are thinking about?" That question turns the insomnia from a symptom into a doorway. Very often what lives at three in the morning is exactly what no one asks about during the day.'
    }
  },

  {
    id: 'fork',
    order: 2,
    icon: 'door-open',
    title: { ka: 'ორი წელი გზაჯვარედინზე', en: 'Two years at the fork' },
    person: { ka: 'გიორგი, 34 წლის', en: 'Giorgi, 34' },
    concernIds: ['freedom'],
    practiceSlug: 'socratic-dialogue',
    situation: {
      ka: 'გიორგი ინჟინერია დიდ კომპანიაში. ორი წელია, რაც მას შესთავაზეს ადგილი უფრო პატარა, ახალ ორგანიზაციაში — ნაკლები ხელფასით, მაგრამ იმ საქმეზე, რომელიც მას აინტერესებს. შეთავაზება ჯერ ძალაშია; მისი ყოფილი კოლეგა ყოველ რამდენიმე თვეში ურეკავს.\n\nის მოვიდა თერაპიაზე „გადაწყვეტილების მისაღებად". პირველ სამ სესიაზე მან დეტალურად ჩამოთვალა ორივე ვარიანტის დადებითი და უარყოფითი მხარეები. მან ცხრილიც კი მოიტანა.\n\nსაუბრისას ის ხშირად იყენებს ფრაზებს: „ჯერ არ არის დრო", „როცა სიტუაცია სტაბილური გახდება", „მეუღლე შეშფოთდება, თუმცა პირდაპირ არ მითქვამს". როცა თერაპევტმა ჰკითხა, უსაუბრია თუ არა მეუღლესთან, მან პასუხობს: „არა. რატომ უნდა ავანერვიულო, სანამ არ გადავწყვეტ?"\n\nმეოთხე სესიაზე ის იღიმება და ამბობს: „მე ვიცი, რას იტყვით. რომ ორი წელი უკვე გადაწყვეტილებაა." შემდეგ ხმა ჩაუწყდება: „მაგრამ თუ ასეა, მაშინ მე უკვე ავირჩიე და არც კი შემიმჩნევია."',
      en: 'Giorgi is an engineer at a large company. Two years ago he was offered a place at a smaller, newer organisation — less money, but the work he is actually interested in. The offer is still open; his former colleague rings every few months.\n\nHe came to therapy "to make the decision". Across the first three sessions he laid out the advantages and disadvantages of both options in detail. He brought a spreadsheet.\n\nAs he talks he keeps using certain phrases: "it isn’t the time yet", "once the situation stabilises", "my wife would worry, though I haven’t actually told her". When the therapist asks whether he has spoken to his wife, he answers: "No. Why upset her before I’ve decided?"\n\nIn the fourth session he smiles and says: "I know what you’re going to say. That two years is already a decision." Then his voice drops: "But if that’s true, then I have already chosen and never even noticed."'
    },
    reflectionPrompt: {
      ka: 'გიორგიმ თავად თქვა ის, რასაც თერაპევტი იტყოდა. რას აკეთებს ის ამით — და რა შეიცვლებოდა, თერაპევტს რომ დაედასტურებინა?',
      en: 'Giorgi has said the thing the therapist would have said. What is he doing with that — and what would change if the therapist simply agreed?'
    },
    therapistResponse: {
      ka: 'აქ ცდუნებაა, თერაპევტმა თქვას: „დიახ, ზუსტად ასეა." ეს იქნებოდა სწორი და უსარგებლო. გიორგიმ ინტერპრეტაცია უკვე თავად წარმოთქვა და სწორედ ამით მოახერხა, რომ ის უსაფრთხოდ ექცია — ინტელექტუალურ დაკვირვებად, რომელსაც შედეგი არ მოჰყვება.\n\nთერაპევტი სხვაგან მიდის: „შევნიშნე, რომ ეს თქვენ თქვით და არა მე. და შევნიშნე ისიც, რომ ხმა შეგეცვალათ. რა მოხდა იმ წამს?"\n\nეს არის სოკრატული დიალოგი ეგზისტენციალური გაგებით: არა აზრის სისწორის შემოწმება, არამედ იმის კვლევა, რას ნიშნავს ეს ცოდნა ცხოვრებისთვის. გიორგიმ იცის ფაქტი. მას ჯერ არ უცხოვრია ამ ფაქტთან.\n\nცალკე ყურადღებას იმსახურებს მეუღლე. „რატომ ავანერვიულო, სანამ არ გადავწყვეტ" — ეს წინადადება პასუხისმგებლობას მარტოობად აქცევს. თერაპევტი ამას არ განსჯის, მაგრამ ასახელებს: „მე მესმის, რომ იცავთ მას. და ამავე დროს ეს ნიშნავს, რომ ამ ორ წელს მარტო ატარებთ."\n\nცხრილი აღარ ივსება. კითხვა აღარ არის „რომელი სამსახური" — კითხვაა „ვინ ირჩევს და ვის თანდასწრებით".',
      en: 'There is a temptation here for the therapist to say: "Yes, exactly." That would be correct and useless. Giorgi has already voiced the interpretation himself, and in doing so has made it safe — an intellectual observation with no consequence attached.\n\nThe therapist goes elsewhere: "I notice that you said that, not me. And I notice your voice changed. What happened just then?"\n\nThis is Socratic dialogue in the existential sense: not testing whether a thought is accurate, but examining what the knowledge means for a life. Giorgi knows the fact. He has not yet lived with it.\n\nThe wife deserves separate attention. "Why upset her before I’ve decided" is a sentence that turns responsibility into solitude. The therapist does not judge it but does name it: "I hear that you are protecting her. And at the same time it means you have carried these two years alone."\n\nThe spreadsheet is not filled in any further. The question is no longer which job. The question is who is choosing, and in whose presence.'
    }
  },

  {
    id: 'grief',
    order: 3,
    icon: 'waves',
    title: { ka: 'დედის შემდეგ', en: 'After his mother' },
    person: { ka: 'ლევანი, 41 წლის', en: 'Levan, 41' },
    concernIds: ['death', 'isolation'],
    practiceSlug: 'confronting-the-given',
    situation: {
      ka: 'ლევანის დედა ცხრა თვის წინ გარდაიცვალა ხანგრძლივი ავადმყოფობის შემდეგ. ის იყო ის, ვინც ბოლო წელიწადნახევარი მას უვლიდა — ორი დის ნაცვლად, რომლებიც სხვა ქალაქებში ცხოვრობენ.\n\nდაკრძალვის შემდეგ ლევანი სამსახურში დაბრუნდა მესამე დღეს. ის ამბობს, რომ „ნორმალურად" გრძნობს თავს. თერაპიაზე მოვიდა მეუღლის დაჟინებით, რომელმაც შენიშნა, რომ ის ღამეებს კომპიუტერთან ატარებს და თითქმის აღარ ლაპარაკობს.\n\nსესიაზე ის დეტალურად ჰყვება ავადმყოფობის ისტორიას: რომელი ექიმი რას ამბობდა, რომელი პრეპარატი როდის შეიცვალა, სად დაუშვეს შეცდომა. მისი მეხსიერება უზადოა. ის ერთხელაც არ ახსენებს, რას გრძნობს.\n\nროცა თერაპევტმა ჰკითხა დედაზე — არა ავადმყოფობაზე, არამედ თავად დედაზე — ლevanმა პაუზა გააკეთა და თქვა: „მე ამაზე ვერ ვილაპარაკებ. თუ დავიწყებ, აღარ გავჩერდები, და ხვალ სამსახურში უნდა წავიდე."\n\nშემდეგ დაამატა: „და მერე, ვის რა უნდა? დებმა უკვე დაივიწყეს. მე კი ის ორმოცდაცხრა კვირა ვინახავ თავში, რომელიც ვერავის ვერ ავუხსენი."',
      en: 'Levan’s mother died nine months ago after a long illness. He was the one who cared for her through the final eighteen months — rather than his two sisters, who live in other cities.\n\nHe went back to work on the third day after the funeral. He says he feels "normal". He came to therapy at his wife’s insistence; she had noticed that he spends his nights at the computer and has almost stopped speaking.\n\nIn the session he recounts the history of the illness in detail: which doctor said what, when which medication was changed, where the mistake was made. His memory is faultless. He does not once mention what he feels.\n\nWhen the therapist asks about his mother — not the illness, his mother — Levan pauses and says: "I can’t talk about that. If I start, I won’t stop, and I have to be at work tomorrow."\n\nThen he adds: "And anyway, who wants to hear it? My sisters have moved on already. And I am carrying forty-nine weeks in my head that I have never been able to explain to anybody."'
    },
    reflectionPrompt: {
      ka: 'ლევანმა ორი განსხვავებული რამ თქვა: „ვერ ვილაპარაკებ" და „ვის რა უნდა". რომელი მათგანია უფრო მნიშვნელოვანი და რატომ?',
      en: 'Levan said two different things: "I can’t talk about it" and "who wants to hear it". Which of the two matters more, and why?'
    },
    therapistResponse: {
      ka: 'ორივე მნიშვნელოვანია, მაგრამ მეორე უფრო ღრმაა. „ვერ ვილაპარაკებ" აღწერს შიშს ემოციის წინაშე. „ვის რა უნდა" აღწერს ეგზისტენციალურ იზოლაციას — გრძნობას, რომ ის, რაც მან გამოიარა, სხვისთვის გადაუცემელია.\n\nთერაპევტი არ ეუბნება „მე მინდა მოვისმინო". ეს დამამშვიდებელი იქნებოდა და, უარესი, ის ლევანის ეჭვს ზედაპირულად უპასუხებდა. სამაგიეროდ ის ამბობს: „ორმოცდაცხრა კვირა. თქვენ დათვალეთ."\n\nეს პატარა წინადადება ორ რამეს აკეთებს. ის აჩვენებს, რომ თერაპევტმა მოისმინა ის დეტალი, რომელიც ლევანმა თითქმის შემთხვევით თქვა. და ის არ ითხოვს ემოციას — ის უბრალოდ ადასტურებს, რომ იქ რაღაც იყო.\n\nავადმყოფობის დეტალური ისტორია აქ არ არის თავის არიდება, რომელიც უნდა შევწყვიტოთ. ის არის ერთადერთი ენა, რომელიც ლევანს ჯერჯერობით აქვს. თერაპევტი ამ ენით მიჰყვება მას და ნელა ამატებს მეორეს: „და იმ ღამეს, როცა პრეპარატი შეცვალეს — თქვენ სად იყავით?"\n\nდებზე საუბარიც მოვა, მაგრამ არა ახლა. ჯერ ლევანს სჭირდება ერთი ადამიანი, ვინც ორმოცდაცხრა კვირას დაუჯერებს.',
      en: 'Both matter, but the second goes deeper. "I can’t talk about it" describes a fear of the feeling. "Who wants to hear it" describes existential isolation — the sense that what he went through cannot be handed to anyone else.\n\nThe therapist does not say "I want to hear it". That would be reassurance and, worse, it would answer Levan’s doubt too cheaply. Instead they say: "Forty-nine weeks. You counted."\n\nThat small sentence does two things. It shows that the therapist heard the detail Levan let slip almost by accident. And it asks for no feeling — it simply confirms that something was there.\n\nThe detailed history of the illness is not an avoidance to be interrupted. It is the only language Levan currently has. The therapist follows him in that language and slowly adds a second: "And the night they changed the medication — where were you?"\n\nThe sisters will be spoken about, but not now. First Levan needs one person who believes the forty-nine weeks.'
    }
  },

  {
    id: 'empty-success',
    order: 4,
    icon: 'cloud',
    title: { ka: 'ყველაფერი მაქვს', en: 'I have everything' },
    person: { ka: 'თამარი, 45 წლის', en: 'Tamar, 45' },
    concernIds: ['meaninglessness'],
    practiceSlug: 'meaning-centred',
    situation: {
      ka: 'თამარი წარმატებული ადვოკატია. მან ორი წლის წინ დააფუძნა საკუთარი ბიურო; ის ახლა კარგად მუშაობს და მას ცხრა თანამშრომელი ჰყავს. მისი ორი შვილი უნივერსიტეტშია. ის და მისი მეუღლე ბოლო ოცი წლის განმავლობაში პირველად არიან ფინანსურად სრულიად თავისუფლები.\n\nის თერაპიაზე მოვიდა შემდეგი წინადადებით: „მე არ ვიცი, რატომ ვარ აქ. ჩემი ცხოვრება იმაზე უკეთესია, ვიდრე შემეძლო მეოცნებებინა. და ყოველ დილით ვდგები და ვფიქრობ — და ეს ყველაფერია?"\n\nის უარყოფს დეპრესიას და მართალიცაა: ის მუშაობს, ჭამს, სძინავს, სიცილიც შეუძლია. მაგრამ დაახლოებით ერთი წელია, რაც არაფერს არ აქვს გემო. ის ამბობს: „ადრე მიზანი მქონდა. ბიურო რომ გავხსნა. შვილები რომ დავაყენო. ახლა ჩამოვედი და აღმოჩნდა, რომ ჩამოსვლის შემდეგ არაფერია."\n\nსესიის შუაში ის მოულოდნელად ამბობს: „მე მრცხვენია ამის თქმა. ხალხს რეალური პრობლემები აქვს."',
      en: 'Tamar is a successful lawyer. She founded her own practice two years ago; it is doing well and she employs nine people. Her two children are at university. For the first time in twenty years she and her husband are completely free financially.\n\nShe came to therapy with this sentence: "I don’t know why I am here. My life is better than I could have dreamed. And every morning I get up and think — and is this all?"\n\nShe denies being depressed, and she is right: she works, eats, sleeps, and can still laugh. But for about a year nothing has had any taste. She says: "Before, I had a goal. Open the practice. Get the children on their feet. Now I have arrived, and it turns out there is nothing after arriving."\n\nHalfway through the session she says, unexpectedly: "I am ashamed to say this. People have real problems."'
    },
    reflectionPrompt: {
      ka: 'თამარი ორჯერ ამცირებს საკუთარ მდგომარეობას — „არ ვიცი რატომ ვარ აქ" და „მრცხვენია". რას იცავს ეს შერცხვენა?',
      en: 'Tamar diminishes her own state twice — "I don’t know why I am here" and "I am ashamed". What is that shame protecting?'
    },
    therapistResponse: {
      ka: 'თერაპევტი ჯერ სირცხვილს ეხება, რადგან სანამ ის იქ არის, თამარი საკუთარ კითხვას სერიოზულად ვერ მოეკიდება: „თუ ეს არ არის რეალური პრობლემა, მაშინ ის, რაზეც მოხვედით, არ არსებობს. და მაინც აქ ხართ."\n\nშემდეგ მოდის სახელის დარქმევა. ფრანკლი ამას ეგზისტენციალურ ვაკუუმს უწოდებდა. ეს არ არის დეპრესია და ეს არ არის უმადურობა. ეს არის მდგომარეობა, რომელიც სწორედ მაშინ ჩნდება, როცა გარეგანი მიზნები ამოიწურა და აღმოჩნდა, რომ ისინი აზრს ცვლიდნენ.\n\nაზრზე ორიენტირებული მუშაობა აქ არ იწყება კითხვით „რა არის თქვენი ცხოვრების აზრი". ეს კითხვა თამარს კიდევ უფრო დაცარიელებს. ის იწყება კონკრეტულით: „როდის იყო ბოლოს, როცა დღის ბოლოს იფიქრეთ — ეს დღე ღირდა?"\n\nხშირად პასუხი მოულოდნელია და მცირე: ერთი საუბარი კლიენტთან, რომელსაც სხვამ უარი უთხრა. ერთი საღამო ქალიშვილთან. ეს არის ის ძაფი, რომელსაც თერაპია მოჰკიდებს ხელს — არა დიდი პასუხი, არამედ ის, რაც უკვე ცოცხალია და შეუმჩნეველი დარჩა.\n\nდა ერთი კითხვა შემდეგი სესიისთვის: „ვინ დაგელოდებათ ისე, რომ სხვა ვერავინ შეცვლის?"',
      en: 'The therapist addresses the shame first, because while it is there Tamar cannot take her own question seriously: "If this is not a real problem, then the thing you came about does not exist. And yet here you are."\n\nThen comes the naming. Frankl called this the existential vacuum. It is not depression and it is not ingratitude. It is the state that appears precisely when external goals run out and it turns out they had been standing in for meaning.\n\nMeaning-centred work does not begin here with "what is the meaning of your life". That question would empty Tamar further. It begins with the concrete: "When was the last time you thought, at the end of a day, that the day was worth something?"\n\nThe answer is often unexpected and small: one conversation with a client everyone else had turned down. One evening with her daughter. That is the thread the therapy takes hold of — not a grand answer, but something already alive that went unnoticed.\n\nAnd one question for the next session: "Who is waiting for you in a way no one else could replace?"'
    }
  },

  {
    id: 'marriage',
    order: 5,
    icon: 'waves',
    title: { ka: 'ერთ ოთახში, ორ ცხოვრებაში', en: 'One room, two lives' },
    person: { ka: 'დავითი, 58 წლის', en: 'Davit, 58' },
    concernIds: ['isolation'],
    practiceSlug: 'socratic-dialogue',
    situation: {
      ka: 'დავითი და მისი მეუღლე ოცდაექვსი წელია დაქორწინებულნი არიან. კონფლიქტი არ აქვთ. ისინი ერთად სადილობენ, ერთად უყურებენ ტელევიზორს, ერთად მიდიან შვილიშვილებთან შაბათობით.\n\nდავითი თერაპიაზე მოვიდა „ზოგადი დაძაბულობის" გამო. მესამე სესიაზე, როცა თერაპევტმა ჰკითხა ურთიერთობებზე, მან თქვა: „ჩვენ არ ვჩხუბობთ. ეს ალბათ კარგია." შემდეგ დიდხანს გაჩუმდა და დაამატა: „წელს ერთხელ დავჯექი და ვცადე გამეხსენებინა, როდის ვილაპარაკე მასთან ისეთ რამეზე, რაც მართლა მაწუხებდა. ვერ გავიხსენე."\n\nის ხაზს უსვამს, რომ მეუღლე კარგი ადამიანია და რომ ბრალს არავის სდებს. „ის რომ მკითხოს, ვეტყოდი. მაგრამ არ მეკითხება. და მეც არ ვეკითხები. ალბათ ორივემ ვიცით, რომ ეს გვიანია."\n\nსესიის ბოლოს ის ამბობს: „უცნაურია. თქვენთან ორმოცდაათი წუთი ვილაპარაკე იმაზე, რაზეც ოცდაექვსი წელი ვდუმდი. და თქვენ სულ სამი კითხვა დამისვით."',
      en: 'Davit and his wife have been married twenty-six years. They do not fight. They eat together, watch television together, go to their grandchildren together on Saturdays.\n\nHe came to therapy about "general tension". In the third session, when the therapist asked about relationships, he said: "We don’t quarrel. I suppose that is a good thing." Then he was quiet a long time and added: "Earlier this year I sat down and tried to remember the last time I told her something that was genuinely troubling me. I couldn’t."\n\nHe stresses that his wife is a good person and that he blames no one. "If she asked, I would tell her. But she doesn’t ask. And I don’t ask her. Probably we both know it is late for that."\n\nAt the end of the session he says: "It is strange. I have talked to you for fifty minutes about something I have been silent about for twenty-six years. And you asked me three questions."'
    },
    reflectionPrompt: {
      ka: 'დავითის ბოლო წინადადება რაღაცას ამბობს არა მხოლოდ ქორწინებაზე, არამედ სწორედ ამ ოთახზეც. რას გააკეთებდით ამ შენიშვნასთან?',
      en: 'Davit’s last sentence says something not only about the marriage but about this room. What would you do with that observation?'
    },
    therapistResponse: {
      ka: 'ეს არის ის მომენტი, რომელსაც იალომი „აქ და ახლა" უწოდებდა და რომელსაც ბევრი თერაპევტი ატარებს, რადგან სესია მთავრდება.\n\nთერაპევტი აჩერებს: „მინდა ერთი წუთით ეს შევნიშნოთ. ახლა თქვენ თქვით რაღაც ჩვენზე. რა იყო აქ განსხვავებული?"\n\nდავითის პასუხი — თუ ის მოვა — თითქმის ყოველთვის ერთსა და იმავეს ეხება: აქ ვიღაცამ იკითხა. სახლში კითხვა აღარ ისმის, არა მტრობის გამო, არამედ იმიტომ, რომ ორივემ ჩათვალა, ეს გვიანია.\n\nეს არის ეგზისტენციალური იზოლაცია მისი ყველაზე ჩვეულებრივი ფორმით — არა მარტოხელა ადამიანის, არამედ ორი ადამიანის, რომლებიც ერთმანეთს აღარ ეკითხებიან. და თერაპიული ურთიერთობა აქ არა მხოლოდ სამუშაო სივრცეა: ის თავად არის მტკიცებულება, რომ საუბარი ჯერ კიდევ შესაძლებელია.\n\nთერაპევტი არ სთავაზობს წყვილთა თერაპიას ამ სესიაზე. ის სვამს ერთ კითხვას, რომელიც ბევრად უფრო შორს მიდის: „თქვით — ალბათ ორივემ ვიცით, რომ გვიანია. საიდან იცით, რომ მან ეს იცის?"\n\nდავითს ეს არასდროს უკითხავს.',
      en: 'This is the moment Yalom called the here-and-now, and the one many therapists let pass because the session is ending.\n\nThe therapist stops: "I want us to notice this for a moment. You just said something about us. What was different here?"\n\nDavit’s answer, if it comes, is almost always about the same thing: here somebody asked. At home the question is no longer put — not out of hostility, but because both of them decided it was late.\n\nThis is existential isolation in its most ordinary form: not a solitary person, but two people who have stopped asking each other. And the therapeutic relationship here is not only a workspace. It is itself the evidence that conversation is still possible.\n\nThe therapist does not propose couples therapy in this session. They ask one question that goes considerably further: "You said — probably we both know it is late. How do you know that she knows that?"\n\nDavit has never asked her.'
    }
  },

  {
    id: 'leaving-home',
    order: 6,
    icon: 'door-open',
    title: { ka: 'პირველი ბინა', en: 'The first flat' },
    person: { ka: 'ანა, 19 წლის', en: 'Ana, 19' },
    concernIds: ['freedom', 'isolation'],
    practiceSlug: 'socratic-dialogue',
    situation: {
      ka: 'ანა ოთხი თვის წინ გადავიდა სხვა ქალაქში სასწავლებლად. ის პირველად ცხოვრობს მარტო. თერაპიაზე მოვიდა პანიკური შეტევების გამო, რომლებიც ძირითადად საღამოობით იწყება, როცა ის ბინაში ბრუნდება.\n\nსამედიცინო შემოწმებამ არაფერი აჩვენა. ის კარგი სტუდენტია, აქვს რამდენიმე ნაცნობი, დედას ურეკავს ყოველ დღე — ხანდახან ორჯერაც.\n\nსესიაზე ის ბევრს ლაპარაკობს იმაზე, თუ როგორ ენატრება სახლი. მაგრამ როცა თერაპევტმა ჰკითხა, დაბრუნებას თუ განიხილავს, ანა სწრაფად პასუხობს: „არა. არავითარ შემთხვევაში." შემდეგ თავად გაუკვირდა საკუთარ ტონს.\n\nსაუბარში ის ამბობს: „აქ არავინ იცის, ვინ ვარ. სახლში ყველამ იცოდა — მე ვიყავი ის, ვინც კარგად სწავლობს და ვინც არავის აწუხებს. აქ დილით ვდგები და არავინ არაფერს არ ელოდება. თავიდან მეგონა, რომ ეს თავისუფლებაა."\n\nპაუზის შემდეგ: „ახლა კი ხანდახან ისე ვარ, თითქოს არც ვარსებობდე. თუ დღეს არ ავდგები, არაფერი მოხდება. და სწორედ ეს მაშინებს."',
      en: 'Ana moved to another city four months ago to study. She is living alone for the first time. She came to therapy about panic attacks that begin mostly in the evenings, when she gets back to the flat.\n\nMedical investigation found nothing. She is a good student, she has a few acquaintances, she calls her mother every day — sometimes twice.\n\nIn the session she talks a great deal about missing home. But when the therapist asks whether she is considering going back, Ana answers quickly: "No. Absolutely not." Then she is surprised by her own tone.\n\nLater she says: "Nobody here knows who I am. At home everyone did — I was the one who does well and doesn’t give anyone trouble. Here I get up in the morning and nobody expects anything. At first I thought that was freedom."\n\nAfter a pause: "Now sometimes it is as if I don’t exist. If I don’t get up today, nothing happens. And that is exactly what frightens me."'
    },
    reflectionPrompt: {
      ka: 'ანას პანიკა საღამოობით იწყება, ბინაში დაბრუნებისას. რას ხვდება ის იმ კარს მიღმა?',
      en: 'Ana’s panic begins in the evening, on returning to the flat. What is she meeting behind that door?'
    },
    therapistResponse: {
      ka: 'თერაპევტი არ ეპყრობა პანიკას როგორც ტექნიკურ პრობლემას, რომელიც სუნთქვის ვარჯიშით უნდა მოგვარდეს. ის იკვლევს, რა ხდება ზუსტად იმ წუთს, როცა ანა კარს კეტავს.\n\nანას წინადადება — „თუ დღეს არ ავდგები, არაფერი მოხდება" — ორ მოცემულობას ეხება ერთდროულად. ეს არის თავისუფლების თავბრუსხვევა, რომელზეც კირკეგორი წერდა: სახლში მისი ცხოვრება წინასწარ იყო დაწერილი და ის, რაც ტვირთად ეჩვენებოდა, ამავე დროს ნიადაგი იყო. და ეს არის იზოლაციაც: არავინ არ ხედავს, თუ ის დღეს არ ადგება.\n\nთერაპევტი ორივეს ასახელებს, ოღონდ ანას სიტყვებით: „მე მესმის ორი რამ. ერთი — რომ არავინ არაფერს არ ელოდება, და ეს გამათავისუფლებელია. მეორე — რომ არავინ არაფერს არ ელოდება, და ეს საშინელია. ორივე ერთდროულადაა?"\n\nეს არ არის ინტერპრეტაცია — ეს არის ორაზროვნების ლეგიტიმაცია. ანას აქამდე ეგონა, რომ ერთი მათგანი ტყუილი უნდა იყოს.\n\nდედასთან ყოველდღიური ზარები ცალკე თემაა და მასთან ფრთხილად უნდა მივიდეთ: ისინი ჯერჯერობით ერთადერთი ხიდია. მათი „აკრძალვა" შეცდომა იქნებოდა. კითხვა უფრო რბილია: „რას ეუბნებით მას ამ ზარებში — და რას არა?"',
      en: 'The therapist does not treat the panic as a technical problem to be solved with breathing exercises. They investigate what happens at the exact moment Ana closes the door.\n\nAna’s sentence — "if I don’t get up today, nothing happens" — touches two givens at once. It is the dizziness of freedom Kierkegaard described: at home her life was written in advance, and what felt like a burden was also a ground. And it is isolation: no one would see if she did not get up.\n\nThe therapist names both, in Ana’s own words: "I hear two things. One, that nobody expects anything, and that is freeing. Two, that nobody expects anything, and that is terrible. Are both true at once?"\n\nThis is not an interpretation. It is the legitimising of an ambiguity. Until now Ana has assumed one of the two must be a lie.\n\nThe daily calls to her mother are a separate theme and must be approached carefully: for the moment they are the only bridge she has. Forbidding them would be a mistake. The question is softer: "What do you tell her in those calls — and what do you not?"'
    }
  },

  {
    id: 'retirement',
    order: 7,
    icon: 'cloud',
    title: { ka: 'ორმოცდაერთი წლის შემდეგ', en: 'After forty-one years' },
    person: { ka: 'ზურაბი, 66 წლის', en: 'Zurab, 66' },
    concernIds: ['meaninglessness', 'death'],
    practiceSlug: 'meaning-centred',
    situation: {
      ka: 'ზურაბი ორმოცდაერთი წელი მასწავლებლობდა. ის ერთი წლის წინ გავიდა პენსიაზე — არა იმიტომ, რომ სურდა, არამედ იმიტომ, რომ „ასე იყო მიღებული".\n\nპირველი თვეები კარგად ჩაიარა: მან ბაღი მოაწესრიგა, წიგნები დაალაგა, ის სამუშაოები შეასრულა, რომლებსაც წლების განმავლობაში აგდებდა. შემდეგ სია ამოიწურა.\n\nის თერაპიაზე მოვიდა უძილობითა და, მისივე თქმით, „გაღიზიანებით ყველაფრის მიმართ". მისი მეუღლე ამბობს, რომ ის „მთელი დღე დადის ოთახებში".\n\nსესიაზე ზურაბი ბევრს ჰყვება მოსწავლეებზე. ის ასახელებს სახელებს, ახსოვს ვინ სად ჩააბარა ოცი წლის წინ. შემდეგ თითქოს თავს იჭერს და ამბობს: „მაპატიეთ. მოხუცი ვარ და წარსულში ვცხოვრობ."\n\nსესიის ბოლოსკენ ის ჩუმად ამბობს: „წელს ორი კლასელი დავმარხე. და მე აღარაფერს არ ვაკეთებ. ეს ორი რამ როგორღაც ერთმანეთთანაა დაკავშირებული, მაგრამ ვერ ვხვდები როგორ."',
      en: 'Zurab taught for forty-one years. He retired a year ago — not because he wanted to, but because "that is how it is done".\n\nThe first months went well: he put the garden in order, sorted the books, did the jobs he had been putting off for years. Then the list ran out.\n\nHe came to therapy with insomnia and, in his phrase, "being irritated by everything". His wife says he "walks around the rooms all day".\n\nIn the session Zurab talks a great deal about his pupils. He names them, remembers who went where twenty years ago. Then he seems to catch himself and says: "Forgive me. I am an old man living in the past."\n\nToward the end he says quietly: "This year I buried two schoolfriends. And I am no longer doing anything. Those two things are connected somehow, but I cannot see how."'
    },
    reflectionPrompt: {
      ka: 'ზურაბმა თავად დაინახა კავშირი, მაგრამ ვერ დაასახელა. რა კავშირია სიკვდილსა და „აღარაფერს არ ვაკეთებს" შორის?',
      en: 'Zurab has seen a connection but cannot name it. What links the deaths to "I am no longer doing anything"?'
    },
    therapistResponse: {
      ka: 'კავშირი ის არის, რომ ორივე ერთსა და იმავეს ეხება: ზურაბს აღარ სჭირდებიან. სანამ ის ასწავლიდა, ყოველ დღეს ვიღაც ელოდებოდა მას. ახლა არავინ. და როცა კაცს არავინ ელოდება, სიკვდილი უცებ უფრო ახლოს ჩანს — რადგან უკვე აღარაფერი დგას მასა და საკუთარ სასრულობას შორის.\n\nთერაპევტი ჯერ იმ „მაპატიეთ"-ს ეხება: „მე არ მომისმენია მოხუცი, რომელიც წარსულში ცხოვრობს. მე მოვისმინე ადამიანი, რომელსაც ორმოცდაერთი წელი სჭირდებოდნენ და აღარ სჭირდება."\n\nშემდეგ მოდის აზრზე ორიენტირებული სამუშაო და ის კონკრეტულია. შემოქმედებითი ღირებულებები ზურაბისთვის დაიხურა არა იმიტომ, რომ მან უნარი დაკარგა, არამედ იმიტომ, რომ სისტემამ კარი დახურა. ეს განსხვავებაა და ის უნდა ითქვას ხმამაღლა.\n\nთერაპევტი არ სთავაზობს მოხალისეობას. ეს იქნებოდა რჩევა და, უარესი, ის სწრაფად შეავსებდა ცარიელს ისე, რომ ზურაბს არ დაენახა, რას კარგავს. სამაგიეროდ ის იკითხავს: „იმ სახელებიდან, რომლებიც დღეს დაასახელეთ — ვინმე თუ იცის, რას ნიშნავდით მისთვის?"\n\nეს კითხვა იალომის „ტალღების ეფექტს" ეხება. ის, რაც ზურაბმა ორმოცდაერთ წელიწადში ჩადო სხვებში, არსად წასულა. ის უბრალოდ ვეღარ ხედავს.',
      en: 'The connection is that both concern the same thing: Zurab is no longer needed. While he taught, someone was expecting him every day. Now no one is. And when no one is expecting a man, death suddenly looks closer — because nothing stands between him and his own finitude any more.\n\nThe therapist addresses the "forgive me" first: "I did not hear an old man living in the past. I heard a man who was needed for forty-one years and is not needed now."\n\nThen comes the meaning-centred work, and it is concrete. Creative values have closed for Zurab not because he lost the capacity but because a system shut a door. That is a distinction, and it should be said out loud.\n\nThe therapist does not suggest volunteering. That would be advice and, worse, it would fill the emptiness so fast that Zurab never got to see what he was losing. Instead they ask: "Of the names you listed today — does any of them know what you meant to them?"\n\nThat question touches what Yalom called rippling. What Zurab put into others across forty-one years has not gone anywhere. He simply can no longer see it.'
    }
  },

  {
    id: 'caregiver',
    order: 8,
    icon: 'anchor',
    title: { ka: 'ვინ ვიქნები, როცა ის აღარ იქნება', en: 'Who I will be when she is gone' },
    person: { ka: 'მარიამი, 47 წლის', en: 'Mariam, 47' },
    concernIds: ['freedom', 'isolation', 'death'],
    practiceSlug: 'confronting-the-given',
    situation: {
      ka: 'მარიამი შვიდი წელია უვლის დედას, რომელსაც დემენცია აქვს. მან სამსახური მეხუთე წელს დატოვა. მისი ძმა ფინანსურად ეხმარება, მაგრამ ქვეყანაში არ ცხოვრობს.\n\nის თერაპიაზე მოვიდა სოციალური მუშაკის რეკომენდაციით. პირველი ორი სესია მთლიანად ლოგისტიკას დაეთმო: მედიკამენტების გრაფიკი, ღამის მორიგეობა, სოციალური სამსახურის საბუთები.\n\nმესამე სესიაზე თერაპევტმა ჰკითხა, რას აკეთებს ის, როცა დედას სძინავს. მარიამმა უპასუხა: „ვასუფთავებ. ან ვამზადებ. ან ვწერ სიას."\n\n— და როცა ყველაფერი გაკეთებულია?\n\nხანგრძლივი პაუზა. შემდეგ: „მაშინ ვზივარ და ველოდები, როდის გაიღვიძებს."\n\nსესიის ბოლოს, უკვე ფეხზე მდგარი, ის ამბობს: „ერთი რამ არასდროს არავისთვის მითქვამს. ხანდახან ვფიქრობ — როცა ეს დამთავრდება. და მერე ისეთი სირცხვილი მაქვს, რომ ვერ ვსუნთქავ." პაუზა. „და ისიც ვიცი, რომ როცა დამთავრდება, მე არავინ არ ვიქნები."',
      en: 'Mariam has been caring for her mother, who has dementia, for seven years. She left her job in the fifth year. Her brother helps financially but does not live in the country.\n\nShe came to therapy on a social worker’s recommendation. The first two sessions were given over entirely to logistics: the medication schedule, the night shifts, the social services paperwork.\n\nIn the third session the therapist asked what she does while her mother sleeps. Mariam answered: "I clean. Or I cook. Or I write a list."\n\n— And when everything is done?\n\nA long pause. Then: "Then I sit and wait for her to wake up."\n\nAt the end of the session, already standing, she says: "There is one thing I have never told anyone. Sometimes I think — when this is over. And then I am so ashamed I cannot breathe." A pause. "And I also know that when it is over, I will be nobody."'
    },
    reflectionPrompt: {
      ka: 'მარიამმა ორი აღიარება გააკეთა კარებთან, ერთმანეთის მიყოლებით. რატომ სწორედ იქ — და რომელი მათგანი ითხოვს პასუხს ჯერ?',
      en: 'Mariam made two confessions at the door, one after the other. Why there — and which of them needs answering first?'
    },
    therapistResponse: {
      ka: 'კარებთან ნათქვამი — ის, რასაც ინგლისურად „doorknob confession" ჰქვია — თითქმის ყოველთვის ყველაზე მნიშვნელოვანია. მარიამმა დაელოდა წუთს, როცა უკან დახევა შესაძლებელი იქნებოდა.\n\nთერაპევტი არ იწყებს ახალ საუბარს — სესია დამთავრდა და ამის უპატივცემულობა მარიამს ასწავლიდა, რომ საზღვრები არ არსებობს. ის ამბობს მხოლოდ: „ორივე რამ, რაც ახლა თქვით, მნიშვნელოვანია. მინდა, რომ შემდეგ ჯერზე იქიდან დავიწყოთ."\n\nშემდეგ სესიაზე ჯერ სირცხვილი მოდის. „როცა ეს დამთავრდება" — ეს არ არის დედის სიკვდილის სურვილი. ეს არის სურვილი, რომ საკუთარი ცხოვრება დაუბრუნდეს. ეს ორი რამ მარიამის თავში ერთმანეთს ემთხვევა და სწორედ ეს დამთხვევა ხდის ფიქრს აუტანელს. მათი გამიჯვნა თერაპიის ერთ-ერთი ყველაზე გამათავისუფლებელი მოძრაობაა.\n\nმეორე აღიარება უფრო ღრმაა და მას პასუხი არ აქვს — მხოლოდ თანდასწრება. „მე არავინ არ ვიქნები" ნიშნავს, რომ მარიამის ვინაობა მთლიანად ერთ როლში გაიხსნა. ეს ცუდი რწმენაა სარტრისეული გაგებით, ოღონდ ისეთი, რომელიც შვიდი წლის რეალურმა ტვირთმა შექმნა და არა სისუსტემ. ამიტომ მას ბრალდებით ვერ მიუდგები.\n\nკითხვა, რომელიც ნელა იხსნება: „ვინ იყავით შვიდი წლის წინ, რომელიც ჯერ კიდევ სადღაც არის?"',
      en: 'What is said at the door — the doorknob confession — is almost always the most important thing. Mariam waited for the minute when retreat would still be possible.\n\nThe therapist does not open a new conversation. The session is over, and disregarding that would teach Mariam that boundaries do not exist. They say only: "Both of the things you have just said matter. I want us to begin there next time."\n\nAt the next session the shame comes first. "When this is over" is not a wish for her mother’s death. It is a wish for her own life to come back. In Mariam’s head the two have fused, and it is that fusion which makes the thought unbearable. Separating them is one of the most freeing movements in the whole therapy.\n\nThe second confession goes deeper and has no answer — only presence. "I will be nobody" means that Mariam’s identity has dissolved entirely into one role. That is bad faith in Sartre’s sense, but a kind produced by seven years of real weight rather than by weakness. It cannot be approached with an accusation.\n\nThe question that opens slowly: "Who were you seven years ago who is still somewhere?"'
    }
  }
];
