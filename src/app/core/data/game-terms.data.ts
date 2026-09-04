/* ==========================================================================
   game-terms.js — pairs for the Term Matcher.

   Definitions are deliberately shorter than the lexicon entries: a matching
   game needs a phrase the eye can hold, not a paragraph. `note` is shown after
   a pair resolves, correct or not, so a wrong attempt still teaches.
   ========================================================================== */

import type { TermPair } from '../models';

export const GAME_TERMS: TermPair[] = [
  {
    id: 't1',
    term: { ka: 'ცუდი რწმენა', en: 'Bad faith' },
    original: 'mauvaise foi',
    definition: {
      ka: 'თვითმოტყუება, რომლითაც ადამიანი საკუთარ თავს არწმუნებს, რომ არჩევანი არ ჰქონდა',
      en: 'The self-deception by which a person persuades themselves they had no choice'
    },
    note: {
      ka: 'სარტრის ტერმინი. კაბინეტში ის ყველაზე ხშირად ასე ჟღერს: „სხვა გზა არ მქონდა".',
      en: 'Sartre’s term. In the room it usually sounds like: "I had no other choice."'
    }
  },
  {
    id: 't2',
    term: { ka: 'ჩაგდებულობა', en: 'Thrownness' },
    original: 'Geworfenheit',
    definition: {
      ka: 'ის ფაქტი, რომ ვიწყებთ სხეულში, ოჯახსა და ეპოქაში, რომელიც არ აგვირჩევია',
      en: 'The fact that we begin in a body, a family and an epoch we did not choose'
    },
    note: {
      ka: 'ჰაიდეგერი. ეს არ არის შეზღუდვა დასაძლევად — ეს ის ნიადაგია, საიდანაც თავისუფლება იწყება.',
      en: 'Heidegger. Not a limitation to overcome but the ground from which freedom begins.'
    }
  },
  {
    id: 't3',
    term: { ka: 'აზრის ნება', en: 'The will to meaning' },
    original: 'Wille zum Sinn',
    definition: {
      ka: 'ადამიანის ძირითადი მოტივაცია არც სიამოვნებაა და არც ძალაუფლება, არამედ აზრი',
      en: 'The primary human motivation is neither pleasure nor power but meaning'
    },
    note: {
      ka: 'ფრანკლის პასუხი ფროიდსა და ადლერს. აქედან იზრდება მთელი ლოგოთერაპია.',
      en: 'Frankl’s answer to Freud and Adler. The whole of logotherapy grows from it.'
    }
  },
  {
    id: 't4',
    term: { ka: 'ჰიპერრეფლექსია', en: 'Hyper-reflection' },
    original: 'Hyperreflexion',
    definition: {
      ka: 'ზედმეტი თვითდაკვირვება, რომელიც თავად ხდება სიმპტომის მიზეზი',
      en: 'Excessive self-observation that itself becomes the cause of the symptom'
    },
    note: {
      ka: 'ვინც ძილს აკვირდება, ვერ იძინებს. მისი პასუხი დერეფლექსიაა.',
      en: 'Whoever watches their sleep cannot sleep. Its answer is dereflection.'
    }
  },
  {
    id: 't5',
    term: { ka: 'ეგზისტენციალური იზოლაცია', en: 'Existential isolation' },
    original: 'existential isolation',
    definition: {
      ka: 'ის საბოლოო უფსკრული, რომელსაც ვერცერთი ურთიერთობა ვერ ავსებს',
      en: 'The final gulf that no relationship can fill'
    },
    note: {
      ka: 'იალომი მას მარტოობისგან განასხვავებს: ბევრი ახლობელი გყავდეს და მაინც იცოდე.',
      en: 'Yalom distinguishes it from loneliness: one may have many people close and still know it.'
    }
  },
  {
    id: 't6',
    term: { ka: 'განსაკუთრებულობის რწმენა', en: 'Specialness' },
    original: 'specialness',
    definition: {
      ka: 'არაცნობიერი რწმენა, რომ ბიოლოგიის კანონები სხვებზე ვრცელდება, მე კი გამონაკლისი ვარ',
      en: 'The unconscious conviction that biology applies to others and I am the exception'
    },
    note: {
      ka: 'სიკვდილის შფოთვისგან თავდაცვა. ის ხშირად ჯანსაღად გამოიყურება — და სწორედ ამიტომაა ძნელი დასანახი.',
      en: 'A defence against death anxiety. It often looks healthy, which is why it is hard to see.'
    }
  },
  {
    id: 't7',
    term: { ka: 'თვითდისტანცირება', en: 'Self-distancing' },
    original: 'Selbstdistanzierung',
    definition: {
      ka: 'უნარი, გავიხედოთ საკუთარ თავზე გვერდიდან და საკუთარ თავს გავეცინოთ',
      en: 'The capacity to look at oneself from the side, and to laugh at oneself'
    },
    note: {
      ka: 'ეს არის ის ადამიანური შესაძლებლობა, რომელსაც პარადოქსული ინტენცია იყენებს.',
      en: 'This is the human capacity that paradoxical intention puts to work.'
    }
  },
  {
    id: 't8',
    term: { ka: 'ეგზისტენციალური დანაშაული', en: 'Existential guilt' },
    original: 'existential guilt',
    definition: {
      ka: 'დანაშაული არა ჩადენილის, არამედ არჩადენილის — იმ ცხოვრების წინაშე, რომელიც არ ვიცხოვრეთ',
      en: 'Guilt not for what was done but for what was not — before the life we did not live'
    },
    note: {
      ka: 'მეისთვის ის სამი მიმართულებით ჩნდება: საკუთარი შესაძლებლობების, სხვების და ბუნების წინაშე.',
      en: 'For May it appears in three directions: toward our possibilities, toward others, toward nature.'
    }
  },
  {
    id: 't9',
    term: { ka: 'ეგზისტენციალური ვაკუუმი', en: 'Existential vacuum' },
    original: 'existentielles Vakuum',
    definition: {
      ka: 'სიცარიელისა და მოწყენილობის მდგრადი განცდა, როცა გარეგნულად ყველაფერი წესრიგშია',
      en: 'A persistent emptiness and boredom arriving when everything is outwardly in order'
    },
    note: {
      ka: 'ის ხშირად ჰგავს დეპრესიას, მაგრამ სხვა ფესვი აქვს და სხვა პასუხს ითხოვს.',
      en: 'It often resembles depression, but has a different root and calls for a different response.'
    }
  },
  {
    id: 't10',
    term: { ka: 'ტალღების ეფექტი', en: 'Rippling' },
    original: 'rippling',
    definition: {
      ka: 'ის, რასაც სხვებში ვტოვებთ, აგრძელებს არსებობას მაშინაც, როცა წყარო აღარავის ახსოვს',
      en: 'What we leave in others goes on existing even when no one remembers the source'
    },
    note: {
      ka: 'იალომის ერთ-ერთი ყველაზე დამამშვიდებელი პასუხი სიკვდილის შფოთვაზე.',
      en: 'One of Yalom’s steadier answers to death anxiety.'
    }
  }
];
