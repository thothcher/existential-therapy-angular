/* ==========================================================================
   vscbt.js — the explicit comparison with cognitive behavioural therapy.

   Written to inform rather than to win. The platform this one parallels is a
   CBT platform, and a comparison that caricatured CBT would be both unfair
   and useless to a learner who will meet both approaches in practice.
   ========================================================================== */

import type { CompareRow, Bilingual } from '../models';

export const VSCBT_ROWS: CompareRow[] = [
  {
    aspect: { ka: 'რა არის პრობლემა', en: 'What the problem is' },
    ex: {
      ka: 'ტანჯვა ხშირად ცხოვრების მოცემულობებთან შეხვედრის ფორმაა და არა დარღვევა, რომელიც უნდა აღმოიფხვრას.',
      en: 'Suffering is often a form of meeting the givens of life, not a disorder to be removed.'
    },
    cbt: {
      ka: 'ტანჯვას ინარჩუნებს აზროვნების, ემოციისა და ქცევის კონკრეტული, შესწავლადი წრეები.',
      en: 'Suffering is maintained by specific, identifiable cycles of thought, emotion and behaviour.'
    }
  },
  {
    aspect: { ka: 'სიმპტომის სტატუსი', en: 'The status of the symptom' },
    ex: {
      ka: 'სიმპტომს აქვს მნიშვნელობა. ის რაღაცას ამბობს ადამიანის სამყაროზე და მისი წაშლა ამ ხმის დაკარგვას ნიშნავს.',
      en: 'The symptom has meaning. It says something about the person’s world, and erasing it loses that voice.'
    },
    cbt: {
      ka: 'სიმპტომი მიზანია. მისი შემცირება გაზომვადი და სასურველი შედეგია.',
      en: 'The symptom is the target. Reducing it is a measurable and desirable outcome.'
    }
  },
  {
    aspect: { ka: 'შფოთვასთან მიმართება', en: 'The stance toward anxiety' },
    ex: {
      ka: 'შფოთვის ნაწილი ეგზისტენციალურია და არ ექვემდებარება მკურნალობას. მიზანია მასთან ცხოვრება, და არა მისი მოცილება.',
      en: 'Part of anxiety is existential and not treatable. The aim is to live with it, not to remove it.'
    },
    cbt: {
      ka: 'შფოთვა ექვემდებარება შემცირებას ექსპოზიციით, კოგნიტური რესტრუქტურირებითა და ქცევითი ექსპერიმენტებით.',
      en: 'Anxiety is reducible through exposure, cognitive restructuring and behavioural experiments.'
    }
  },
  {
    aspect: { ka: 'თერაპევტის პოზიცია', en: 'The therapist’s position' },
    ex: {
      ka: 'თანამგზავრი. შერჩევითი გამჭვირვალობა; თერაპიული ურთიერთობა თავად არის ინსტრუმენტი.',
      en: 'A fellow traveller. Selective transparency; the relationship is itself the instrument.'
    },
    cbt: {
      ka: 'თანამშრომელი და მასწავლებელი. ერთობლივი ემპირიზმი, მკაფიო როლები, სტრუქტურირებული სესია.',
      en: 'A collaborator and teacher. Collaborative empiricism, clear roles, a structured session.'
    }
  },
  {
    aspect: { ka: 'დროის ჰორიზონტი', en: 'Time horizon' },
    ex: {
      ka: 'ღიაა. ხანგრძლივობა წინასწარ არ განისაზღვრება; მუშაობა თემის სიღრმეს მიჰყვება.',
      en: 'Open. The length is not set in advance; the work follows the depth of the theme.'
    },
    cbt: {
      ka: 'ვადიანი. ტიპურად 8–20 სესია, მკაფიო დასაწყისითა და დასასრულით.',
      en: 'Time-limited. Typically 8–20 sessions, with a defined beginning and end.'
    }
  },
  {
    aspect: { ka: 'სესიის სტრუქტურა', en: 'Session structure' },
    ex: {
      ka: 'დღის წესრიგი წინასწარ არ დგება. სესია იწყება იქიდან, სადაც კლიენტია.',
      en: 'No agenda is set in advance. The session starts where the client is.'
    },
    cbt: {
      ka: 'დღის წესრიგი, საშინაო დავალების მიმოხილვა, ახალი მასალა, უკუკავშირი.',
      en: 'Agenda setting, homework review, new material, feedback.'
    }
  },
  {
    aspect: { ka: 'საშინაო დავალება', en: 'Homework' },
    ex: {
      ka: 'იშვიათი. თუ არის, ეს უფრო რეფლექსიაა, ვიდრე დავალება.',
      en: 'Rare. Where it exists it is reflection rather than an assignment.'
    },
    cbt: {
      ka: 'ცენტრალური. აზრის ჩანაწერები, ქცევითი ექსპერიმენტები, აქტივობის დაგეგმვა.',
      en: 'Central. Thought records, behavioural experiments, activity scheduling.'
    }
  },
  {
    aspect: { ka: 'მტკიცებულებითი ბაზა', en: 'Evidence base' },
    ex: {
      ka: 'უფრო მცირე და უფრო ახალგაზრდა. აზრზე ორიენტირებულ ჩარევებს აქვს რანდომიზებული კვლევები, განსაკუთრებით ონკოლოგიაში; მიდგომის მთლიანობაში კი კვლევა ნაკლებია.',
      en: 'Smaller and younger. Meaning-centred interventions have randomised trials, notably in oncology; the approach as a whole is less studied.'
    },
    cbt: {
      ka: 'ვრცელი. ასობით რანდომიზებული კვლევა; პირველი რიგის რეკომენდაცია მრავალ კლინიკურ სახელმძღვანელოში.',
      en: 'Extensive. Hundreds of randomised trials; a first-line recommendation in many clinical guidelines.'
    }
  },
  {
    aspect: { ka: 'რას ჰკითხავს კლიენტს', en: 'What it asks the client' },
    ex: {
      ka: '„რას ნიშნავს ეს თქვენი ცხოვრებისთვის?"',
      en: '"What does this mean for your life?"'
    },
    cbt: {
      ka: '„რა მტკიცებულება გაქვთ ამ აზრის სასარგებლოდ?"',
      en: '"What is the evidence for that thought?"'
    }
  }
];

export const VSCBT_CONVERGE: Bilingual[] = [
  {
    ka: 'ორივე სერიოზულად იღებს იმას, რასაც კლიენტი ამბობს, და არცერთი არ ეყრდნობა ფარულ მნიშვნელობებს, რომლებიც მხოლოდ თერაპევტს ესმის.',
    en: 'Both take seriously what the client actually says, and neither relies on hidden meanings only the therapist can read.'
  },
  {
    ka: 'ორივეში სოკრატული კითხვა ცენტრალურია — თუმცა ისინი სხვადასხვა მიმართულებით ბურღავენ: კპთ სისწორისკენ, ეგზისტენციალური მნიშვნელობისკენ.',
    en: 'Socratic questioning is central to both — though they drill in different directions: CBT toward accuracy, existential work toward significance.'
  },
  {
    ka: 'ორივე უარყოფს თერაპევტს, როგორც ორაკულს, რომელიც პასუხს ფლობს.',
    en: 'Both reject the therapist as an oracle who possesses the answer.'
  },
  {
    ka: 'თანამედროვე კპთ-ს მესამე ტალღა — განსაკუთრებით ACT — ეგზისტენციალურ თემებს პირდაპირ ეხება: ღირებულებები, მიღება, აზრი, კონტექსტში მყოფი მე.',
    en: 'The third wave of CBT — ACT above all — touches existential themes directly: values, acceptance, meaning, the self in context.'
  },
  {
    ka: 'ორივე მიდგომაში თერაპიული ალიანსი შედეგის ერთ-ერთი ყველაზე ძლიერი პრედიქტორია — ტექნიკაზე ძლიერიც.',
    en: 'In both approaches the therapeutic alliance is among the strongest predictors of outcome — stronger than technique.'
  }
];

export const VSCBT_WHEN_CBT: Bilingual[] = [
  {
    ka: 'მკაფიო, ლოკალიზებული სიმპტომი მკვეთრი დისტრესით: პანიკური აშლილობა, სპეციფიკური ფობია, ობსესიურ-კომპულსიური აშლილობა.',
    en: 'A clear, localised symptom with sharp distress: panic disorder, specific phobia, obsessive-compulsive disorder.'
  },
  {
    ka: 'როცა კლიენტს სჭირდება სწრაფი, გაზომვადი ცვლილება — მაგალითად, სამუშაოს შენარჩუნებისთვის ან მკურნალობის დასაწყებად.',
    en: 'When a client needs fast, measurable change — to keep a job, say, or to be able to start a treatment.'
  },
  {
    ka: 'როცა კლიენტი ცალსახად სთხოვს სტრუქტურას და ხელსაწყოებს და არა ღია კვლევას. ეს პრეფერენცია პატივისცემას იმსახურებს.',
    en: 'When the client explicitly asks for structure and tools rather than open exploration. That preference deserves respect.'
  },
  {
    ka: 'როცა ეგზისტენციალური კითხვები აშკარად არ არის წინა პლანზე და მათი შემოტანა თერაპევტის ინტერესს მოემსახურებოდა, და არა კლიენტისას.',
    en: 'When existential questions are plainly not to the fore, and introducing them would serve the therapist’s interest rather than the client’s.'
  },
  {
    ka: 'მწვავე კრიზისში, სადაც პირველ რიგში სტაბილიზაცია და უსაფრთხოებაა საჭირო.',
    en: 'In acute crisis, where stabilisation and safety come first.'
  }
];

export const VSCBT_WHEN_EX: Bilingual[] = [
  {
    ka: 'როცა „ყველაფერი კარგადაა" და მაინც არაფერს აქვს გემო — და კპთ-ს პროტოკოლს სამიზნე სიმპტომი ვერ უპოვია.',
    en: 'When everything is "fine" and nothing has any taste — and a CBT protocol cannot find a target symptom.'
  },
  {
    ka: 'დიაგნოზის, დანაკარგის, გარდაუვალი ცვლილების წინაშე, სადაც პრობლემა არ არის დამახინჯებული აზრი — ის რეალურია.',
    en: 'Before a diagnosis, a loss, an unavoidable change, where the problem is not a distorted thought — it is real.'
  },
  {
    ka: 'როცა კლიენტმა უკვე გაიარა კპთ, ისწავლა ტექნიკები და ამბობს: „ეს ყველაფერი მესმის და მაინც არ ვიცი, რისთვის ვცხოვრობ."',
    en: 'When a client has already done CBT, learned the techniques, and says: "I understand all of it and I still don’t know what I am living for."'
  },
  {
    ka: 'გადაწყვეტილების პარალიზების, ავთენტურობის კითხვების და ღირებულებათა კონფლიქტის დროს.',
    en: 'With decisional paralysis, questions of authenticity, and conflicts of value.'
  },
  {
    ka: 'როცა კლიენტს სურს გაიგოს, და არა მხოლოდ შვება მიიღოს.',
    en: 'When the client wants to understand, and not only to feel better.'
  }
];
