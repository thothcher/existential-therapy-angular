/* ==========================================================================
   game-sorter.js — statements to sort into the four givens.

   Sixteen statements, four per given. Each carries a `why` shown once the
   statement is placed, so a wrong drop teaches rather than merely buzzing.

   Several are deliberately ambiguous at first reading — a person facing
   retirement meets meaninglessness and death at once. The `why` names the
   dominant theme and says so, because pretending these four are cleanly
   separable would teach the wrong thing about clinical work.
   ========================================================================== */

import type { SortStatement } from '../models';

export const GAME_SORTER: SortStatement[] = [
  /* ---- death ---------------------------------------------------------- */
  {
    id: 's1', givenId: 'death',
    text: {
      ka: '„ღამით ვიღვიძებ და მესმის, რომ ერთ დღეს ეს ყველაფერი დამთავრდება. მერე ვდგები და ტელევიზორს ვრთავ."',
      en: '"I wake in the night and understand that one day all of this ends. Then I get up and put the television on."'
    },
    why: {
      ka: 'პირდაპირი სიკვდილის შფოთვა და მისი დაუყოვნებელი აცილება. ტელევიზორი აქ თავდაცვაა და არა გართობა.',
      en: 'Direct death anxiety and its immediate avoidance. The television here is a defence, not entertainment.'
    }
  },
  {
    id: 's2', givenId: 'death',
    text: {
      ka: '„სამი ექიმი შევიცვალე ერთ წელიწადში. ყველა ამბობს, რომ ჯანმრთელი ვარ, მაგრამ რაღაცას ისინი ვერ ხედავენ."',
      en: '"I have changed three doctors in a year. They all say I am healthy, but there is something they are not seeing."'
    },
    why: {
      ka: 'ჰიპოქონდრია, როგორც სიკვდილის შფოთვის სიმპტომური ფორმა. ძებნა არასდროს მთავრდება, რადგან ის, რასაც ეძებს, სამედიცინო არ არის.',
      en: 'Health anxiety as a symptomatic form of death anxiety. The search never ends because what is being sought is not medical.'
    }
  },
  {
    id: 's3', givenId: 'death',
    text: {
      ka: '„სხვებს ემართებათ. მე ყოველთვის გამომივიდა და ახლაც გამომივა."',
      en: '"It happens to other people. It has always worked out for me and it will again."'
    },
    why: {
      ka: 'განსაკუთრებულობის რწმენა — იალომის მიხედვით, სიკვდილის შფოთვისგან ორი ძირითადი თავდაცვიდან ერთ-ერთი.',
      en: 'Specialness — one of Yalom’s two principal defences against death anxiety.'
    }
  },
  {
    id: 's4', givenId: 'death',
    text: {
      ka: '„დიაგნოზის შემდეგ მივხვდი, რომ ორმოცი წელი ისე ვცხოვრობდი, თითქოს დრო უსასრულო იყო."',
      en: '"After the diagnosis I realised I had lived forty years as though time were endless."'
    },
    why: {
      ka: 'სიკვდილის გაცნობიერება, რომელიც ცხოვრებას აბრუნებს. იალომი ამას „გამოღვიძების გამოცდილებას" უწოდებდა.',
      en: 'The awareness of death giving life back. Yalom called this an awakening experience.'
    }
  },

  /* ---- freedom -------------------------------------------------------- */
  {
    id: 's5', givenId: 'freedom',
    text: {
      ka: '„სხვა გზა არ მქონდა. გარემოებები ისე ჩამოყალიბდა, რომ არჩევანი არ მრჩებოდა."',
      en: '"I had no other choice. Circumstances turned out in a way that left me no option."'
    },
    why: {
      ka: 'ცუდი რწმენა სარტრისეული გაგებით: თვითდარწმუნება, რომ არჩევანი არ არსებობდა.',
      en: 'Bad faith in Sartre’s sense: persuading oneself that no choice existed.'
    }
  },
  {
    id: 's6', givenId: 'freedom',
    text: {
      ka: '„ორი წელია ვერ ვწყვეტ. უბრალოდ ჯერ არ არის შესაფერისი მომენტი."',
      en: '"Two years and I cannot decide. It is just that the moment is not right yet."'
    },
    why: {
      ka: 'გადავადება, როგორც არჩევანის მუდმივი გადადება. ორი წელი უკვე თავად არის გადაწყვეტილება.',
      en: 'Procrastination as the permanent deferral of choosing. Two years is itself already a decision.'
    }
  },
  {
    id: 's7', givenId: 'freedom',
    text: {
      ka: '„ცხოვრება ისე ჩამიარა, თითქოს ვიღაცის გეგმა შემესრულებინა. მაგრამ ხელს ხომ მე ვაწერდი."',
      en: '"My life went by as though I were carrying out someone else’s plan. But it was my hand signing."'
    },
    why: {
      ka: 'ეგზისტენციალური დანაშაული: დანაშაული არჩადენილის წინაშე — იმ ცხოვრების, რომელიც შეიძლებოდა და არ იყო.',
      en: 'Existential guilt: guilt before what was not done — the life that could have been and was not.'
    }
  },
  {
    id: 's8', givenId: 'freedom',
    text: {
      ka: '„თუ დღეს არ ავდგები, არაფერი მოხდება. თავიდან მეგონა, რომ ეს თავისუფლებაა."',
      en: '"If I don’t get up today, nothing happens. At first I thought that was freedom."'
    },
    why: {
      ka: 'თავისუფლების თავბრუსხვევა, რომელზეც კირკეგორი წერდა: სტრუქტურის გაქრობა ერთდროულად ათავისუფლებს და აშინებს.',
      en: 'The dizziness of freedom Kierkegaard described: the disappearance of structure liberates and frightens at once.'
    }
  },

  /* ---- isolation ------------------------------------------------------ */
  {
    id: 's9', givenId: 'isolation',
    text: {
      ka: '„ოცდაორი წელია ერთად ვართ. საღამოობით ერთ ოთახში ვსხედვართ და თითოეული თავის ცხოვრებაშია."',
      en: '"Twenty-two years together. In the evenings we sit in the same room and each of us is in a separate life."'
    },
    why: {
      ka: 'მარტოობა ურთიერთობის შიგნით — იზოლაციის ყველაზე ჩვეულებრივი და ყველაზე ძნელად შესამჩნევი ფორმა.',
      en: 'Loneliness inside a relationship — the most ordinary and least visible form of isolation.'
    }
  },
  {
    id: 's10', givenId: 'isolation',
    text: {
      ka: '„თუ ვინმემ ნამდვილად გამიგო, ვინც ვარ, ვერ გაუძლებს და წავა."',
      en: '"If anyone really understood who I am, they could not bear it and would leave."'
    },
    why: {
      ka: 'იზოლაცია, რომელიც წინასწარ იცავს თავს სიახლოვისგან. ეს რწმენა თავად ქმნის იმ მარტოობას, რომლისაც ეშინია.',
      en: 'Isolation defending itself against closeness in advance. The belief itself produces the loneliness it fears.'
    }
  },
  {
    id: 's11', givenId: 'isolation',
    text: {
      ka: '„მე მას სულ უნდა ვგრძნობდე გვერდით. როცა ის მარტო გადის, მთელი დღე ვერ ვისვენებ."',
      en: '"I need to feel him beside me all the time. When he goes out alone I cannot settle all day."'
    },
    why: {
      ka: 'შერწყმა (fusion) — იზოლაციისგან თავდაცვა, რომელიც მოკლევადიანად ამსუბუქებს და გრძელვადიანად ორივეს ართმევს ცალკეულობას.',
      en: 'Fusion — a defence against isolation that relieves in the short term and costs both people their separateness in the long.'
    }
  },
  {
    id: 's12', givenId: 'isolation',
    text: {
      ka: '„ბევრი ხალხია ჩემს გარშემო. მაგრამ თუ ერთ დღეს არ ჩავიდე, ვერავინ შეამჩნევს."',
      en: '"There are plenty of people around me. But if I did not turn up one day, no one would notice."'
    },
    why: {
      ka: 'ურთიერთობები ფუნქციის დონეზე. ისინი რეალურია, მაგრამ ვერცერთი ვერ აღწევს იმ სიღრმეს, სადაც ადამიანი შეიმჩნევა.',
      en: 'Relationships at the level of function. They are real, but none reaches the depth at which a person is noticed.'
    }
  },

  /* ---- meaninglessness ------------------------------------------------ */
  {
    id: 's13', givenId: 'meaninglessness',
    text: {
      ka: '„ყველაფერი მაქვს, რაც ოცი წლის წინ მინდოდა. და დილით წამოდგომა მიჭირს."',
      en: '"I have everything I wanted twenty years ago. And getting up in the morning is hard."'
    },
    why: {
      ka: 'ეგზისტენციალური ვაკუუმი — ის ჩნდება მაშინ, როცა გარეგანი მიზნები ამოიწურა და გამოჩნდა, რომ ისინი აზრს ცვლიდნენ.',
      en: 'The existential vacuum — it appears when external goals run out and it emerges that they had been standing in for meaning.'
    }
  },
  {
    id: 's14', givenId: 'meaninglessness',
    text: {
      ka: '„ბავშვები წავიდნენ, სამსახური დამთავრდა. ვინ ვარ ახლა? არავინ არაფერს არ მთხოვს."',
      en: '"The children have gone, the job is over. Who am I now? No one asks anything of me."'
    },
    why: {
      ka: 'როლის დაკარგვა, რომელიც აზრს ატარებდა. ფრანკლი აქ იკითხავდა: სად ითხოვს ცხოვრება თქვენგან პასუხს ახლა?',
      en: 'The loss of a role that was carrying meaning. Frankl would ask: where is life asking something of you now?'
    }
  },
  {
    id: 's15', givenId: 'meaninglessness',
    text: {
      ka: '„არაფერს არ აქვს გემო. არც ცუდი არ არის — უბრალოდ არაფერი."',
      en: '"Nothing has any taste. It is not even bad — it is just nothing."'
    },
    why: {
      ka: 'აპათია და მოწყენილობა, რომელიც დეპრესიას ჰგავს, მაგრამ სხვა ფესვი აქვს. ამ განსხვავებას კლინიკური მნიშვნელობა აქვს.',
      en: 'An apathy and boredom that resembles depression but has a different root. The distinction has clinical consequences.'
    }
  },
  {
    id: 's16', givenId: 'meaninglessness',
    text: {
      ka: '„ისე ვმუშაობ, რომ არ გავჩერდე. თუ გავჩერდი, კითხვა მოვა და პასუხი არ მაქვს."',
      en: '"I work so as not to stop. If I stop, the question comes and I have no answer."'
    },
    why: {
      ka: 'კომპულსიური აქტივობა, როგორც უაზრობისგან თავდაცვა. კლიენტმა თავად იცის მექანიზმი — და სწორედ ეს არის შესასვლელი.',
      en: 'Compulsive activity as a defence against meaninglessness. The client knows the mechanism themselves — and that is the way in.'
    }
  }
];
