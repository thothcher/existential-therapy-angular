/* ==========================================================================
   curriculum.data.ts — the course.

   Everything else on this platform is a catalogue: thinkers, practices,
   scenarios, the lexicon. Catalogues are good to return to and bad to start
   with, because they have no order and no end. A reader who lands on one
   reads two cards and leaves.

   This file is the thread through them. Seven modules in a deliberate order,
   each one short enough to finish in a sitting. The `visit` steps point at
   pages that already exist rather than restating them — the course is the
   sequence and the connective prose, not a second copy of the content.

   Ordering: what the approach is, then the four givens, then one module per
   given in the order they are usually met in a room (anxiety and freedom
   before death and meaning, isolation last), then how it sounds in session,
   then where its edges are.
   ========================================================================== */

import type { CourseModule } from '../models';

export const CURRICULUM: CourseModule[] = [

  /* ---------------------------------------------------------------- 1 ---- */
  {
    id: 'orientation',
    slug: 'orientation',
    order: 1,
    icon: 'compass',
    minutes: 12,
    title: { ka: 'საიდან იწყება', en: 'Where this begins' },
    summary: {
      ka: 'რა არის ეგზისტენციალური თერაპია, რა არ არის და რით განსხვავდება იმისგან, რასაც ჩვეულებრივ თერაპიაში ელოდებით.',
      en: 'What existential therapy is, what it is not, and how it differs from what you normally expect therapy to be.'
    },
    outcomes: [
      { ka: 'ახსნათ, რატომ არ არის ეს „ტექნიკების ნაკრები"', en: 'Explain why this is not a set of techniques' },
      { ka: 'გამიჯნოთ ეგზისტენციალური მიდგომა კბთ-სგან', en: 'Tell the existential approach apart from CBT' },
      { ka: 'დაასახელოთ ის ოთხი კითხვა, რომელზეც ყველაფერი დგას', en: 'Name the four questions everything else rests on' }
    ],
    steps: [
      {
        id: 'orientation-what',
        kind: 'read',
        title: { ka: 'ეს არ არის ტექნიკების ნაკრები', en: 'This is not a set of techniques' },
        body: {
          ka: 'ეგზისტენციალური თერაპია არ არის მეთოდი, რომელსაც სწავლობ და შემდეგ იყენებ. ის უფრო პოზიციაა — ხედვა იმისა, თუ რა სახის არსება ზის თქვენ წინ.\n\nსხვა მიდგომების უმეტესობა იწყება კითხვით „რა არ არის რიგზე და როგორ გამოვასწოროთ?". ეგზისტენციალური მიდგომა იწყებს სხვა კითხვით: „რას ნიშნავს ადამიანად ყოფნა და რა ხდება, როცა ამას პირისპირ ვხვდებით?". ეს განსხვავება მცირე ჩანს, მაგრამ ის ცვლის ყველაფერს — რას უსმენ, რას ეკითხები და რას თვლი წარმატებად.\n\nამიტომ აქ არ ნახავთ სესიების პროტოკოლს. ნახავთ ოთხ მოცემულობას, რამდენიმე მოაზროვნეს და მუშაობის წესს. დანარჩენი კონკრეტულ ადამიანთან ხდება.',
          en: 'Existential therapy is not a method you learn and then apply. It is closer to a stance — a view of what kind of being is sitting in front of you.\n\nMost approaches begin with "what is wrong here, and how do we correct it?" The existential approach begins somewhere else: "what does it mean to be human, and what happens when we meet that head on?" The difference looks small and changes everything — what you listen for, what you ask, and what you count as progress.\n\nSo there is no session protocol here. There are four givens, a handful of thinkers, and a way of working. The rest happens with a particular person.'
        }
      },
      {
        id: 'orientation-vscbt',
        kind: 'visit',
        title: { ka: 'დაუდგით გვერდიგვერდ კბთ-ს', en: 'Put it beside CBT' },
        body: {
          ka: 'ყველაზე სწრაფად ის იკვეთება, რასაც სხვას ადარებ. კბთ ყველაზე ახლო მეზობელია და ყველაზე ხშირად აირევა ხოლმე მასთან. გადახედეთ შედარებას — განსაკუთრებით იმ სტრიქონებს, სადაც ორივე ერთსა და იმავეს აკეთებს სხვადასხვა მიზნით.',
          en: 'A thing shows its shape fastest beside something else. CBT is the nearest neighbour and the one it is most often confused with. Read the comparison — particularly the rows where both do the same thing for different reasons.'
        },
        link: { path: '/vs-cbt', label: { ka: 'შედარება კბთ-სთან', en: 'The comparison with CBT' } }
      },
      {
        id: 'orientation-check',
        kind: 'quiz',
        title: { ka: 'პირველი ნაბიჯი', en: 'The first move' },
        body: {
          ka: 'კლიენტი ამბობს: „ღამით მეშინია სიკვდილის და ვერ ვიძინებ." რას გააკეთებდა ეგზისტენციალური თერაპევტი პირველ რიგში?',
          en: 'A client says: "At night I am afraid of dying and I cannot sleep." What would an existential therapist do first?'
        },
        options: [
          {
            text: { ka: 'ეკითხება, რას ნიშნავს მისთვის ეს შიში და როდის გაჩნდა', en: 'Ask what the fear means to them, and when it arrived' },
            correct: true,
            why: {
              ka: 'დიახ. შიში აქ არ არის სამიზნე სიმპტომი — ის კარია. კითხვა მიდის მნიშვნელობისკენ და არა სიმძაფრის შემცირებისკენ.',
              en: 'Yes. The fear is not a target symptom here, it is a door. The question moves towards meaning rather than towards turning the intensity down.'
            }
          },
          {
            text: { ka: 'ასწავლის სუნთქვის ტექნიკას დაძინებამდე', en: 'Teach a breathing technique for before sleep' },
            why: {
              ka: 'ეს დამამშვიდებელია და ზოგჯერ საჭიროც, მაგრამ ის შიშს ხურავს და არ ხსნის. ეგზისტენციალურ მუშაობაში ეს ნაადრევია.',
              en: 'Soothing, and sometimes needed, but it closes the fear rather than opening it. In existential work this comes too early.'
            }
          },
          {
            text: { ka: 'ამოწმებს, რამდენად რეალისტურია ეს შიში', en: 'Test how realistic the fear is' },
            why: {
              ka: 'ეს კბთ-ს ნაბიჯია და თავის ადგილას სწორია. მაგრამ სიკვდილის შიში რეალისტურია — შემოწმებას აქ არაფერი აქვს გასაკეთებელი.',
              en: 'That is a CBT move and right in its place. But the fear of death is realistic — there is nothing for a reality test to do here.'
            }
          }
        ]
      },
      {
        id: 'orientation-four',
        kind: 'read',
        title: { ka: 'ოთხი კითხვა', en: 'The four questions' },
        body: {
          ka: 'ირვინ იალომმა ეგზისტენციალური მოცემულობები ოთხად ჩამოაყალიბა: სიკვდილი, თავისუფლება, იზოლაცია და უაზრობა. ეს არ არის დიაგნოზები და არც პრობლემები, რომლებიც უნდა მოგვარდეს. ეს არის პირობები, რომლებშიც ყველა ცხოვრობს.\n\nთერაპიაში ისინი იშვიათად ჩნდება საკუთარი სახელით. ადამიანი ამბობს „აღარაფერი მაინტერესებს" და ეს უაზრობაა. ამბობს „ვერავინ მიგებს" და ეს იზოლაციაა. ამბობს „ვერ ვწყვეტ" და ეს თავისუფლებაა, რომელიც ტვირთად იქცა.\n\nშემდეგ მოდულში თითოეულს გავეცნობით. ჯერჯერობით საკმარისია, რომ იცოდეთ: როცა საუბარი უცებ დამძიმდება და ვერ გაიგებთ, რატომ — დიდი შანსია, რომ ერთ-ერთ მათგანს შეეხეთ.',
          en: 'Irvin Yalom set out four existential givens: death, freedom, isolation and meaninglessness. They are not diagnoses, and not problems to be solved. They are the conditions everyone lives inside.\n\nIn therapy they rarely arrive under their own names. A person says "nothing interests me any more" and that is meaninglessness. They say "nobody gets it" and that is isolation. They say "I cannot decide" and that is freedom turned into a weight.\n\nThe next module takes each one in turn. For now it is enough to know this: when a conversation suddenly gets heavy and you cannot see why, the odds are good that you have touched one of them.'
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 2 ---- */
  {
    id: 'givens',
    slug: 'givens',
    order: 2,
    icon: 'layers',
    minutes: 18,
    title: { ka: 'ოთხი მოცემულობა', en: 'The four givens' },
    summary: {
      ka: 'სიკვდილი, თავისუფლება, იზოლაცია, უაზრობა — და როგორ ჟღერს თითოეული, როცა ადამიანი მათ სახელს არ იყენებს.',
      en: 'Death, freedom, isolation, meaninglessness — and how each one sounds when a person does not use its name.'
    },
    outcomes: [
      { ka: 'დაასახელოთ ოთხივე და მათი განსხვავება', en: 'Name all four and tell them apart' },
      { ka: 'იცნოთ თითოეული ჩვეულებრივ ნათქვამში', en: 'Recognise each one inside ordinary speech' },
      { ka: 'გაარჩიოთ მოცემულობა და მასზე თავდაცვა', en: 'Separate a given from the defence against it' }
    ],
    steps: [
      {
        id: 'givens-read',
        kind: 'read',
        title: { ka: 'რატომ „მოცემულობა"', en: 'Why "given"' },
        body: {
          ka: 'სიტყვა შემთხვევითი არ არის. მოცემულობა ის არის, რაც მოცემულია — არა არჩეული, არა გამომუშავებული, არა გამოსასწორებელი. ვერ გადაწყვეტ, რომ არ მოკვდე. ვერ გადაწყვეტ, რომ სხვის ცნობიერებაში შეაბიჯო.\n\nსწორედ ამიტომ არ არსებობს მათი „მკურნალობა". არსებობს მხოლოდ ორი გზა: მათთან შეხვედრა ან მათგან თავის დაცვა. თერაპიაში ჩვენ თითქმის ყოველთვის თავდაცვას ვხვდებით პირველად — და არა თავად მოცემულობას.\n\nთავდაცვა ჭკვიანურია და ხშირად კარგად მუშაობს წლების განმავლობაში. ადამიანი, რომელიც უსასრულოდ მუშაობს, შეიძლება ძალიან წარმატებული იყოს. პრობლემა მაშინ ჩნდება, როცა თავდაცვა ისე გამაგრდა, რომ თავად ცხოვრებაც გარეთ დარჩა.',
          en: 'The word is not casual. A given is what is given — not chosen, not earned, not fixable. You cannot decide not to die. You cannot decide to step inside another consciousness.\n\nWhich is why there is no treating them. There are only two things to do with a given: meet it, or defend against it. In therapy we almost always meet the defence first, and not the given itself.\n\nThe defence is clever, and it often works for years. Someone who works without stopping may be very successful. The trouble starts when the defence has hardened so far that life itself is now outside it.'
        }
      },
      {
        id: 'givens-visit',
        kind: 'visit',
        title: { ka: 'ოთხივე, დეტალურად', en: 'All four, in detail' },
        body: {
          ka: 'თითოეულ მოცემულობას აქვს თავისი გვერდი: როგორ ვლინდება, რა თავდაცვებით ვხვდებით მას და რა პოზიციას იკავებს თერაპევტი. წაიკითხეთ ოთხივე — არა ერთბაშად დასამახსოვრებლად, არამედ იმისთვის, რომ მოგვიანებით იცნოთ.',
          en: 'Each given has its own page: how it shows itself, the defences you meet it behind, and the stance the therapist takes. Read all four — not to memorise them at once, but so that you recognise them later.'
        },
        link: { path: '/givens', label: { ka: 'ოთხი მოცემულობა', en: 'The four givens' } }
      },
      {
        id: 'givens-check',
        kind: 'quiz',
        title: { ka: 'რომელი მოცემულობაა', en: 'Which given is it' },
        body: {
          ka: '„მე და ჩემი ცოლი ოცი წელია ერთად ვართ. ის კარგი ადამიანია. მაგრამ ხანდახან ვუყურებ და ვხვდები, რომ წარმოდგენა არ აქვს, ვინ ვარ." — რომელ მოცემულობას შეეხო ეს?',
          en: '"My wife and I have been together twenty years. She is a good person. But sometimes I look at her and realise she has no idea who I am." — which given has this touched?'
        },
        options: [
          {
            text: { ka: 'იზოლაცია', en: 'Isolation' },
            correct: true,
            why: {
              ka: 'დიახ — და კონკრეტულად ეგზისტენციალური იზოლაცია, რომელიც მარტოობა არ არის. ის ცოლთან ერთადაა და მაინც გადაულახავია მანძილი. სწორედ ეს გამორჩევს მას ურთიერთობის პრობლემისგან.',
              en: 'Yes — and specifically existential isolation, which is not loneliness. He is with his wife and the gap is still unbridgeable. That is exactly what separates it from a relationship problem.'
            }
          },
          {
            text: { ka: 'უაზრობა', en: 'Meaninglessness' },
            why: {
              ka: 'ახლოა, რადგან ორივე ცარიელ განცდას იძლევა. მაგრამ აქ საქმე იმაზეა, რომ ვერ ხედავენ — და არა იმაზე, რომ არაფერს აქვს ღირებულება.',
              en: 'Close, since both leave an empty feeling. But the trouble here is not being seen, rather than nothing having any worth.'
            }
          },
          {
            text: { ka: 'თავისუფლება', en: 'Freedom' },
            why: {
              ka: 'თავისუფლება მოგვიანებით შეიძლება გაჩნდეს — რჩება თუ არა. მაგრამ ის, რაც ახლა ითქვა, კავშირის შეუძლებლობაზეა.',
              en: 'Freedom may arrive later — whether to stay. But what was actually said is about the impossibility of contact.'
            }
          }
        ]
      },
      {
        id: 'givens-game',
        kind: 'visit',
        title: { ka: 'გაწაფეთ თვალი', en: 'Train the eye' },
        body: {
          ka: 'ცნობა ვარჯიშია და არა ცოდნა. სავარჯიშოში თექვსმეტი ნათქვამია — თითოეული ერთ მოცემულობას ეკუთვნის. დაახარისხეთ ისინი. თუ პირველად შეცდომებს დაუშვებთ, სწორედ ესაა საჭირო ნაწილი.',
          en: 'Recognition is a drill, not a fact. The exercise has sixteen statements, each belonging to one given. Sort them. If you get several wrong the first time, that is the part that does the work.'
        },
        link: { path: '/games/givens', label: { ka: 'ოთხი მოცემულობის დახარისხება', en: 'Sorting the four givens' } }
      }
    ]
  },

  /* ---------------------------------------------------------------- 3 ---- */
  {
    id: 'anxiety',
    slug: 'anxiety',
    order: 3,
    icon: 'waves',
    minutes: 16,
    title: { ka: 'შფოთვა როგორც ნიშანი', en: 'Anxiety as a signal' },
    summary: {
      ka: 'რატომ არ არის ყოველი შფოთვა სამკურნალო და როგორ განვასხვავოთ ეგზისტენციალური შფოთვა ნევროზულისგან.',
      en: 'Why not all anxiety is for treating, and how to tell existential anxiety from neurotic anxiety.'
    },
    outcomes: [
      { ka: 'გამიჯნოთ ეგზისტენციალური და ნევროზული შფოთვა', en: 'Separate existential from neurotic anxiety' },
      { ka: 'ახსნათ, რას ნიშნავს „თავისუფლების თავბრუსხვევა"', en: 'Explain what "the dizziness of freedom" means' },
      { ka: 'იცოდეთ, როდის არ არის შფოთვის შემცირება მიზანი', en: 'Know when reducing anxiety is not the goal' }
    ],
    steps: [
      {
        id: 'anxiety-read',
        kind: 'read',
        title: { ka: 'ორი სახის შფოთვა', en: 'Two kinds of anxiety' },
        body: {
          ka: 'როლო მეიმ გაავლო ხაზი, რომელიც დღემდე ცენტრალურია: არსებობს შფოთვა, რომელიც ცხოვრების პირობებიდან მოდის, და შფოთვა, რომელიც მათგან თავის დაცვიდან.\n\nპირველი — ეგზისტენციალური — ნორმალურია. ის ჩნდება მაშინ, როცა ადამიანი რაღაც ნამდვილს ხედავს: რომ მოკვდება, რომ არჩევანი მასზეა, რომ ვერავინ იცხოვრებს მის მაგივრად. ამის მოხსნა შეიძლება მხოლოდ ხედვის დახუჭვით.\n\nმეორე — ნევროზული — არაპროპორციულია და ცხოვრებას ავიწროებს. ის არ არის რეაქცია რეალობაზე, არამედ რეაქცია რეალობის შიშზე. ეს კი მართლაც ექვემდებარება მუშაობას.\n\nპრაქტიკული შედეგი მკვეთრია: თუ ვერ გაარჩიეთ, რომელთან გაქვთ საქმე, შეიძლება მთელი წელი დახარჯოთ იმის შემცირებაზე, რაც სინამდვილეში ადამიანის ყველაზე ჯანსაღი რეაქციაა.',
          en: 'Rollo May drew a line that is still central: there is anxiety that comes from the conditions of living, and anxiety that comes from defending against them.\n\nThe first — existential — is normal. It appears when a person sees something true: that they will die, that the choice is theirs, that nobody can live it for them. The only way to remove it is to stop looking.\n\nThe second — neurotic — is out of proportion and narrows a life. It is not a reaction to reality but a reaction to the fear of reality. That one really can be worked with.\n\nThe practical consequence is sharp. If you cannot tell which you are dealing with, you can spend a year reducing what is in fact the healthiest response the person has.'
        }
      },
      {
        id: 'anxiety-kierkegaard',
        kind: 'visit',
        title: { ka: 'სად დაიწყო ეს', en: 'Where this started' },
        body: {
          ka: 'კირკეგორმა შფოთვა 1844 წელს აღწერა როგორც „თავისუფლების თავბრუსხვევა" — ის, რასაც უფსკრულის პირას ვგრძნობთ, როცა მივხვდებით, რომ ხტომა ჩვენზეა. მთელი შემდგომი ხაზი აქედან მოდის.',
          en: 'Kierkegaard described anxiety in 1844 as "the dizziness of freedom" — what we feel at the edge of a drop, realising the leap is up to us. The whole later line comes from here.'
        },
        link: { path: '/thinkers/kierkegaard', label: { ka: 'სორენ კირკეგორი', en: 'Søren Kierkegaard' } }
      },
      {
        id: 'anxiety-may',
        kind: 'visit',
        title: { ka: 'როგორ შემოვიდა თერაპიაში', en: 'How it entered therapy' },
        body: {
          ka: 'როლო მეიმ კირკეგორის იდეა კლინიკურ ენაზე გადმოიტანა და მისცა ის, რაც აკლდა — გამოყენებადი განსხვავება.',
          en: 'Rollo May carried Kierkegaard’s idea into clinical language and gave it what it lacked — a usable distinction.'
        },
        link: { path: '/thinkers/may', label: { ka: 'როლო მეი', en: 'Rollo May' } }
      },
      {
        id: 'anxiety-check',
        kind: 'quiz',
        title: { ka: 'რომელი შფოთვაა', en: 'Which anxiety is it' },
        body: {
          ka: 'სტუდენტი ამბობს: „ორი კვირაა დისერტაციას ვერ ვწერ. ვზივარ და ვფიქრობ, რომ ეს თემა ხუთ წელს წამართმევს და აღარ ვიცი, მინდა თუ არა ასეთი ცხოვრება." რომელი შფოთვაა უფრო სავარაუდო?',
          en: 'A student says: "For two weeks I cannot write my dissertation. I sit there thinking this topic will take five years of my life, and I no longer know whether I want that life." Which anxiety is more likely?'
        },
        options: [
          {
            text: { ka: 'ეგზისტენციალური — ის რეალურ არჩევანს შეეხო', en: 'Existential — they have touched a real choice' },
            correct: true,
            why: {
              ka: 'დიახ. აქ ბლოკი არ არის დეფიციტი. ის სიმპტომია იმისა, რომ ადამიანმა დაინახა ხუთი წელი და საკუთარი პასუხისმგებლობა მასზე. ამის „მოხსნა" ნიშნავს კითხვის დახურვას.',
              en: 'Yes. The block here is not a deficit. It is the symptom of having seen five years and one’s own responsibility for them. "Removing" it means closing the question.'
            }
          },
          {
            text: { ka: 'ნევროზული — მას წერის შიში აქვს', en: 'Neurotic — they have a fear of writing' },
            why: {
              ka: 'ეს შესაძლებელია და გამოსარიცხი არ არის. მაგრამ ნათქვამი წერაზე კი არა, ცხოვრების ხუთ წელზეა. თუ ამას გამოვტოვებთ, ვმკურნალობთ არასწორ რამეს.',
              en: 'Possible, and not to be ruled out. But what was said is about five years of a life, not about writing. Skip that and you are treating the wrong thing.'
            }
          },
          {
            text: { ka: 'არც ერთი — ეს უბრალოდ პროკრასტინაციაა', en: 'Neither — this is simply procrastination' },
            why: {
              ka: '„უბრალოდ პროკრასტინაცია" თითქმის ყოველთვის ნიშნავს, რომ ჯერ არ გვიკითხავს, რას გადადებს ადამიანი და რატომ.',
              en: '"Simply procrastination" almost always means we have not yet asked what is being put off, and why.'
            }
          }
        ]
      }
    ]
  },

  /* ---------------------------------------------------------------- 4 ---- */
  {
    id: 'freedom',
    slug: 'freedom',
    order: 4,
    icon: 'door-open',
    minutes: 16,
    title: { ka: 'თავისუფლება და მისი წონა', en: 'Freedom and its weight' },
    summary: {
      ka: 'რატომ არის თავისუფლება იმაზე მძიმე, ვიდრე ჟღერს, და რას ნიშნავს პასუხისმგებლობა მაშინ, როცა არჩევანი არ გაგვირჩევია.',
      en: 'Why freedom is heavier than it sounds, and what responsibility means when the choice was not one we asked for.'
    },
    outcomes: [
      { ka: 'ახსნათ, რატომ არის თავისუფლება ტვირთიც', en: 'Explain why freedom is also a burden' },
      { ka: 'იცნოთ „ცუდი რწმენა" ჩვეულებრივ ნათქვამში', en: 'Recognise bad faith in ordinary speech' },
      { ka: 'გამიჯნოთ პასუხისმგებლობა და დადანაშაულება', en: 'Separate responsibility from blame' }
    ],
    steps: [
      {
        id: 'freedom-read',
        kind: 'read',
        title: { ka: 'განწირული ვართ თავისუფლებისთვის', en: 'Condemned to be free' },
        body: {
          ka: 'სარტრის ფრაზა განზრახ უხერხულია: „ადამიანი განწირულია თავისუფლებისთვის". განწირული — რადგან ეს არჩევანი არ არის. თავისუფლებაზე უარს ვერ იტყვი, რადგან უარის თქმაც არჩევანია.\n\nაქედან მოდის ცნება, რომელიც კლინიკურად ყველაზე გამოსადეგია — ცუდი რწმენა (mauvaise foi). ეს არის თვითმოტყუება, რომლითაც ადამიანი საკუთარ თავს არწმუნებს, რომ არჩევანი არ ჰქონდა. „ასე გამოვიდა." „სხვა გზა არ მქონდა." „ასეთი ვარ."\n\nთერაპევტის სამუშაო აქ ფაქიზია. მიზანი არ არის ადამიანს უთხრა „შენ თვითონ აირჩიე" — ეს დადანაშაულებაა და ის კარს ხურავს. მიზანია დაანახო, სად ჯერ კიდევ არის მოძრაობის ადგილი, მაშინაც, როცა ვითარება მართლაც ვიწროა.\n\nსიმონ დე ბოვუარმა სწორედ ეს ჩაასწორა: თავისუფლება არ არის ვაკუუმში. ის ყოველთვის კონკრეტულ სხეულში, კონკრეტულ ეპოქასა და კონკრეტულ უთანასწორობაშია. ეს არ აუქმებს პასუხისმგებლობას, მაგრამ ცვლის იმას, თუ სად ვეძებთ მას.',
          en: 'Sartre’s phrase is deliberately awkward: man is condemned to be free. Condemned, because it is not a choice. You cannot decline freedom, since declining is itself a choice.\n\nFrom this comes the term that is most clinically useful — bad faith, mauvaise foi. It is the self-deception by which a person convinces themselves they had no choice. "It just turned out this way." "There was nothing else I could do." "That is how I am."\n\nThe therapist’s work here is delicate. The aim is not to tell someone "you chose this" — that is blame, and it closes the door. The aim is to show where there is still room to move, even when the situation really is narrow.\n\nSimone de Beauvoir corrected exactly this: freedom is never in a vacuum. It is always in a particular body, a particular era, a particular inequality. That does not cancel responsibility, but it changes where we look for it.'
        }
      },
      {
        id: 'freedom-sartre',
        kind: 'visit',
        title: { ka: 'სარტრი', en: 'Sartre' },
        body: {
          ka: 'ის, ვისგანაც „არსებობა წინ უსწრებს არსს" მოდის — და ვისთანაც პასუხისმგებლობა ყველაზე შორს მიდის.',
          en: 'The source of "existence precedes essence" — and the one who pushes responsibility furthest.'
        },
        link: { path: '/thinkers/sartre', label: { ka: 'ჟან-პოლ სარტრი', en: 'Jean-Paul Sartre' } }
      },
      {
        id: 'freedom-beauvoir',
        kind: 'visit',
        title: { ka: 'ბოვუარის შესწორება', en: 'Beauvoir’s correction' },
        body: {
          ka: 'თავისუფლება კონკრეტულ ვითარებაშია — და ზოგისთვის ეს ვითარება გაცილებით ვიწროა. ეს ხაზი განსაკუთრებით მნიშვნელოვანია, როცა კლიენტის გარემოებები მართლაც მძიმეა.',
          en: 'Freedom sits inside a situation — and for some the situation is far narrower. This line matters most when a client’s circumstances really are hard.'
        },
        link: { path: '/thinkers/beauvoir', label: { ka: 'სიმონ დე ბოვუარი', en: 'Simone de Beauvoir' } }
      },
      {
        id: 'freedom-reflect',
        kind: 'reflect',
        title: { ka: 'თქვენი მაგალითი', en: 'Your own example' },
        body: {
          ka: 'გაიხსენეთ შემთხვევა, როცა თქვენ თვითონ თქვით „სხვა გზა არ მქონდა". ჩაწერეთ, რა იყო ეს ვითარება — და შემდეგ ცალკე: რა იყო ის მცირე ადგილი, სადაც მოძრაობა მაინც შესაძლებელი იყო. ეს ჩანაწერი მხოლოდ თქვენს ბრაუზერში რჩება.',
          en: 'Recall a time you yourself said "there was nothing else I could do". Write down what the situation was — and then, separately, what small room to move existed anyway. This note stays in your browser only.'
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 5 ---- */
  {
    id: 'death-meaning',
    slug: 'death-and-meaning',
    order: 5,
    icon: 'hourglass',
    minutes: 20,
    title: { ka: 'სიკვდილი და აზრი', en: 'Death and meaning' },
    summary: {
      ka: 'როგორ აძლევს სასრულობა ცხოვრებას ფორმას და რატომ არ იქმნება აზრი მისი ძებნით.',
      en: 'How finitude gives a life its shape, and why meaning is not produced by searching for it.'
    },
    outcomes: [
      { ka: 'ახსნათ, რატომ არ არის სიკვდილი მხოლოდ დასასრული', en: 'Explain why death is not only an ending' },
      { ka: 'გამოიყენოთ ფრანკლის შებრუნება: ცხოვრება გვეკითხება', en: 'Use Frankl’s reversal: life is the one asking' },
      { ka: 'იცოდეთ, რატომ ჩავარდება ხოლმე „იპოვე შენი აზრი"', en: 'Know why "find your meaning" usually fails' }
    ],
    steps: [
      {
        id: 'death-read',
        kind: 'read',
        title: { ka: 'სასრულობა როგორც ფორმა', en: 'Finitude as form' },
        body: {
          ka: 'ჰაიდეგერისთვის სიკვდილი არ არის მოვლენა, რომელიც ბოლოს ხდება. ის არის „ყველაზე საკუთარი შესაძლებლობა" — ის, რაც ცხოვრებას საზღვარს და, ამიტომ, ფორმას აძლევს.\n\nლოგიკა მარტივია, თუმცა უჩვეულო: უსასრულო ცხოვრებაში არაფერს ექნებოდა წონა, რადგან ყველაფერი გადადებადი იქნებოდა. სწორედ ის, რომ დრო თავდება, ხდის არჩევანს არჩევნად.\n\nიალომი აქედან იღებს კლინიკურ დაკვირვებას: სიკვდილთან შეხვედრა ხშირად ცხოვრებას ცვლის და არა პირიქით. ადამიანები, რომლებმაც მძიმე დიაგნოზი მიიღეს, ხშირად ამბობენ, რომ მხოლოდ ამის შემდეგ დაიწყეს ცხოვრება — და ეს არ არის ნუგეში, ეს დაკვირვებაა.',
          en: 'For Heidegger death is not an event that happens at the end. It is one’s ownmost possibility — the thing that gives a life its boundary and therefore its shape.\n\nThe logic is simple, if unfamiliar: in an endless life nothing would carry weight, because everything could be postponed. It is precisely that time runs out which makes a choice a choice.\n\nYalom takes a clinical observation from this: an encounter with death often changes a life rather than the other way round. People who have received a serious diagnosis often say they only began living afterwards. That is not consolation, it is observation.'
        }
      },
      {
        id: 'death-frankl',
        kind: 'visit',
        title: { ka: 'ფრანკლის შებრუნება', en: 'Frankl’s reversal' },
        body: {
          ka: 'ფრანკლმა კითხვა თავდაყირა დააყენა: არა ჩვენ ვეკითხებით ცხოვრებას, თუ რა აზრი აქვს, არამედ ცხოვრება გვეკითხება ჩვენ. პასუხს კი არა სიტყვით, არამედ იმით ვცემთ, რასაც ვაკეთებთ.',
          en: 'Frankl turned the question over: we do not ask life what its meaning is, life asks us. And we answer not in words but in what we do.'
        },
        link: { path: '/thinkers/frankl', label: { ka: 'ვიქტორ ფრანკლი', en: 'Viktor Frankl' } }
      },
      {
        id: 'death-yalom',
        kind: 'visit',
        title: { ka: 'იალომი', en: 'Yalom' },
        body: {
          ka: 'ის, ვინც ეს ოთხი მოცემულობა ერთ სისტემად აწყო და ვისი ენითაც დღეს ლაპარაკობს ეგზისტენციალური თერაპიის უმეტესი ნაწილი.',
          en: 'The one who assembled the four givens into a single system, and whose language most of existential therapy speaks today.'
        },
        link: { path: '/thinkers/yalom', label: { ka: 'ირვინ იალომი', en: 'Irvin Yalom' } }
      },
      {
        id: 'death-practice',
        kind: 'visit',
        title: { ka: 'როგორ მუშაობს ეს პრაქტიკაში', en: 'How this works in practice' },
        body: {
          ka: 'აზრზე ორიენტირებული მუშაობა არ ნიშნავს კლიენტისთვის აზრის შეთავაზებას. წაიკითხეთ, რას აკეთებს თერაპევტი სინამდვილეში — და რა არის მისი ყველაზე ხშირი შეცდომა.',
          en: 'Meaning-centred work does not mean handing a client a meaning. Read what the therapist actually does — and what the most common mistake is.'
        },
        link: { path: '/practices/meaning-centred', label: { ka: 'აზრზე ორიენტირებული მუშაობა', en: 'Meaning-centred work' } }
      },
      {
        id: 'death-check',
        kind: 'quiz',
        title: { ka: 'რომელი პასუხი', en: 'Which response' },
        body: {
          ka: 'კლიენტი ამბობს: „ყველაფერი მაქვს, რაც მინდოდა. და დილით ადგომა აღარ მინდა." რომელი პასუხი შეესაბამება ფრანკლის ხაზს?',
          en: 'A client says: "I have everything I wanted. And I no longer want to get up in the morning." Which response follows Frankl’s line?'
        },
        options: [
          {
            text: { ka: '„რას ითხოვს თქვენგან ახლა ეს პერიოდი?"', en: '"What is this period asking of you now?"' },
            correct: true,
            why: {
              ka: 'დიახ. კითხვა შებრუნებულია — ის აზრს არ სთავაზობს და არც კლიენტს აწვება, რომ იპოვოს. ის ცხოვრებას აძლევს კითხვის უფლებას.',
              en: 'Yes. The question is reversed — it neither offers a meaning nor presses the client to find one. It lets life do the asking.'
            }
          },
          {
            text: { ka: '„სცადეთ იფიქროთ იმაზე, რაც კარგი გაქვთ."', en: '"Try to think about what is good in your life."' },
            why: {
              ka: 'ეს სწორედ ის ჩამონათვალია, რომელიც კლიენტმა უკვე გააკეთა — „ყველაფერი მაქვს". გამეორება მას მარტოობაში ტოვებს.',
              en: 'That is the very list the client has already made — "I have everything". Repeating it leaves them alone with it.'
            }
          },
          {
            text: { ka: '„როგორ ფიქრობთ, დეპრესიაა ეს?"', en: '"Do you think this is depression?"' },
            why: {
              ka: 'დიაგნოზი შეიძლება საჭირო იყოს და მისი გამორიცხვა არ შეიძლება. მაგრამ როგორც პირველი ნაბიჯი ის განცდას კატეგორიად აქცევს და საუბარს ხურავს.',
              en: 'A diagnosis may be needed and must not be ruled out. But as a first move it turns an experience into a category and closes the conversation.'
            }
          }
        ]
      }
    ]
  },

  /* ---------------------------------------------------------------- 6 ---- */
  {
    id: 'in-session',
    slug: 'in-session',
    order: 6,
    icon: 'message-circle',
    minutes: 22,
    title: { ka: 'როგორ ჟღერს ოთახში', en: 'How it sounds in the room' },
    summary: {
      ka: 'ერთი პრაქტიკა დეტალურად, ერთი სცენარი სრულად და სავარჯიშო, სადაც თქვენ ირჩევთ პასუხს.',
      en: 'One practice in detail, one scenario in full, and an exercise where you pick the response.'
    },
    outcomes: [
      { ka: 'გამიჯნოთ სოკრატული დიალოგი დარწმუნებისგან', en: 'Tell Socratic dialogue apart from persuasion' },
      { ka: 'იცნოთ ეგზისტენციალური ჩარევა სამ პასუხს შორის', en: 'Spot the existential intervention among three responses' },
      { ka: 'ახსნათ, რატომ არ იცის თერაპევტმა პასუხი წინასწარ', en: 'Explain why the therapist does not know the answer in advance' }
    ],
    steps: [
      {
        id: 'session-read',
        kind: 'read',
        title: { ka: 'კითხვა, რომლის პასუხიც არ იცი', en: 'The question you do not know the answer to' },
        body: {
          ka: 'ეგზისტენციალურ თერაპიაში ერთი წესია, რომელიც ყველაფერს განსაზღვრავს: თერაპევტმა არ იცის, სად უნდა მივიდეს საუბარი.\n\nეს ჟღერს როგორც სისუსტე, მაგრამ ის ტექნიკური პოზიციაა. თუ თერაპევტმა უკვე იცის დასკვნა და კითხვებით იქითკენ მიჰყავს კლიენტი, ეს აღარ არის დიალოგი — ეს დარწმუნებაა, რომელიც კითხვის ფორმაშია ჩაცმული. კლიენტები ამას თითქმის ყოველთვის გრძნობენ.\n\nნამდვილი სოკრატული კითხვა რისკიანია: პასუხმა შეიძლება თერაპევტიც შეცვალოს. სწორედ ეს რისკი ხდის მას სამუშაოდ ვარგისს.',
          en: 'There is one rule in existential therapy that shapes everything else: the therapist does not know where the conversation should arrive.\n\nThis sounds like a weakness and is in fact a technical position. If the therapist already has the conclusion and is steering there by question, it is no longer dialogue — it is persuasion dressed as enquiry. Clients almost always feel it.\n\nA real Socratic question carries risk: the answer might change the therapist too. That risk is what makes it work.'
        }
      },
      {
        id: 'session-practice',
        kind: 'visit',
        title: { ka: 'სოკრატული დიალოგი', en: 'Socratic dialogue' },
        body: {
          ka: 'პრაქტიკის გვერდზე ნახავთ, რით განსხვავდება ეს კბთ-ს სოკრატული კითხვისგან და რა არის ის ხაფანგები, რომლებშიც ყველაზე ხშირად ვვარდებით.',
          en: 'The practice page shows how this differs from the Socratic question in CBT, and the traps it is easiest to fall into.'
        },
        link: { path: '/practices/socratic-dialogue', label: { ka: 'სოკრატული დიალოგი', en: 'Socratic dialogue' } }
      },
      {
        id: 'session-scenario',
        kind: 'visit',
        title: { ka: 'სცენარი სრულად', en: 'A scenario in full' },
        body: {
          ka: '„ცარიელი წარმატება" — ადამიანი, რომელმაც ყველაფერს მიაღწია და ვერაფერს გრძნობს. წაიკითხეთ სრულად, ჩათვლით იმ ადგილებისა, სადაც თერაპევტი განზრახ არ ჩაერევა.',
          en: '"Empty success" — a person who has reached everything and feels nothing. Read it in full, including the places where the therapist deliberately does not intervene.'
        },
        link: { path: '/scenarios/empty-success', label: { ka: 'ცარიელი წარმატება', en: 'Empty success' } }
      },
      {
        id: 'session-game',
        kind: 'visit',
        title: { ka: 'ახლა თქვენ აირჩიეთ', en: 'Now you choose' },
        body: {
          ka: 'რვა მომენტი სესიიდან. თითოეულში სამი შესაძლო პასუხია და მხოლოდ ერთი მათგანია ეგზისტენციალური ჩარევა. არჩევის შემდეგ სამივე აიხსნება — მათ შორის ის, რაც თქვენ აირჩიეთ.',
          en: 'Eight moments from a session. Three possible responses each, and only one is an existential intervention. After you choose, all three are explained — including the one you picked.'
        },
        link: { path: '/games/branching', label: { ka: 'სცენარის განშტოება', en: 'Scenario branching' } }
      },
      {
        id: 'session-reflect',
        kind: 'reflect',
        title: { ka: 'რა გაგიჭირდათ', en: 'What was hard' },
        body: {
          ka: 'სავარჯიშოში რომელ მომენტში აირჩიეთ არასწორი პასუხი და რატომ მოგეჩვენათ ის სწორად? ეს კითხვა ყველაზე მეტს ასწავლის — გაცილებით მეტს, ვიდრე სწორი პასუხების რაოდენობა.',
          en: 'At which moment in the exercise did you pick the wrong response, and why did it look right? That question teaches more than the number you got right.'
        }
      }
    ]
  },

  /* ---------------------------------------------------------------- 7 ---- */
  {
    id: 'edges',
    slug: 'edges',
    order: 7,
    icon: 'scale',
    minutes: 14,
    title: { ka: 'საზღვრები', en: 'The edges' },
    summary: {
      ka: 'როდის არ არის ეს მიდგომა სწორი არჩევანი, სად გადადის ის სხვა მიდგომაში და როგორ არ გადავიდეთ ფილოსოფიაში თერაპიის ნაცვლად.',
      en: 'When this approach is not the right choice, where it hands over, and how not to drift into philosophy instead of therapy.'
    },
    outcomes: [
      { ka: 'იცოდეთ, როდის სჯობს კბთ ან სხვა მიდგომა', en: 'Know when CBT or another approach is better' },
      { ka: 'იცნოთ ის მომენტი, როცა საუბარი აბსტრაქციაში გადადის', en: 'Notice the moment a conversation drifts into abstraction' },
      { ka: 'დაასრულოთ კურსი მთლიანი სურათით', en: 'Finish the course with the whole picture' }
    ],
    steps: [
      {
        id: 'edges-read',
        kind: 'read',
        title: { ka: 'როცა ეს არ არის სწორი მიდგომა', en: 'When this is not the right approach' },
        body: {
          ka: 'პატიოსნება მოითხოვს ამის თქმას: არის ვითარებები, სადაც ეგზისტენციალური მუშაობა არასწორი არჩევანია, ან სულ მცირე არა პირველი.\n\nმწვავე კრიზისი, სუიციდური რისკი, აქტიური ფსიქოზი, მძიმე ობსესიურ-კომპულსიური სიმპტომები, კვების დარღვევის საშიში ფაზა — აქ საჭიროა სტრუქტურა, სიცხადე და ხშირად მედიკამენტი. მნიშვნელობის კითხვა მოგვიანებით მოვა.\n\nარსებობს მეორე, უფრო ჩუმი საფრთხეც: საუბარი, რომელიც ლამაზია, ღრმა ჩანს და არსად მიდის. როცა ორივე მხარე კმაყოფილია და კლიენტის ცხოვრებაში არაფერი იცვლება, ეს აღარ არის თერაპია — ეს საინტერესო საუბარია. განსხვავება იმაშია, უბრუნდება თუ არა საუბარი კონკრეტულ ცხოვრებას.',
          en: 'Honesty requires saying this: there are situations where existential work is the wrong choice, or at least not the first one.\n\nAcute crisis, suicidal risk, active psychosis, severe obsessive-compulsive symptoms, a dangerous phase of an eating disorder — these need structure, clarity and often medication. The question of meaning comes later.\n\nThere is a second, quieter danger: a conversation that is beautiful, appears deep, and goes nowhere. When both parties are satisfied and nothing in the client’s life changes, this is no longer therapy — it is an interesting conversation. The difference is whether the talk returns to a particular life.'
        }
      },
      {
        id: 'edges-visit',
        kind: 'visit',
        title: { ka: 'როდის სჯობს კბთ', en: 'When CBT is better' },
        body: {
          ka: 'დაუბრუნდით შედარებას — ახლა უკვე სხვა თვალით. განსაკუთრებით იმ ნაწილს, სადაც ნათქვამია, როდის არის კბთ უკეთესი არჩევანი. ეს არ არის დათმობა; ეს იმის ცოდნაა, რას აკეთებ.',
          en: 'Go back to the comparison — with different eyes now. Particularly the part on when CBT is the better choice. That is not a concession; it is knowing what you are doing.'
        },
        link: { path: '/vs-cbt', label: { ka: 'შედარება კბთ-სთან', en: 'The comparison with CBT' } }
      },
      {
        id: 'edges-terms',
        kind: 'visit',
        title: { ka: 'ენა, რომელიც აგროვდა', en: 'The vocabulary you have gathered' },
        body: {
          ka: 'კურსის განმავლობაში ათეულობით ტერმინი შეგხვდათ. სავარჯიშო შეამოწმებს, რომელი დაილექა და რომელი მხოლოდ გაიარა.',
          en: 'Dozens of terms have passed through this course. The exercise checks which have settled and which only went by.'
        },
        link: { path: '/games/terms', label: { ka: 'ტერმინების დაწყვილება', en: 'Term matcher' } }
      },
      {
        id: 'edges-check',
        kind: 'quiz',
        title: { ka: 'ბოლო შემოწმება', en: 'Final check' },
        body: {
          ka: 'კლიენტი მესამე სესიაზე ამბობს: „ბოლო ორ კვირაში ორჯერ ვიფიქრე, რომ აზრი აღარ აქვს ცხოვრებას. ერთხელ წამლები დავთვალე." რა ხდება ახლა?',
          en: 'In the third session a client says: "Twice in the last two weeks I thought life has no point any more. Once I counted my pills." What happens now?'
        },
        options: [
          {
            text: { ka: 'რისკის შეფასება და უსაფრთხოების გეგმა — ახლავე', en: 'Risk assessment and a safety plan, now' },
            correct: true,
            why: {
              ka: 'დიახ. აქ ეგზისტენციალური კითხვა ჩერდება. „აზრი აღარ აქვს" შეიძლება ღრმა ფილოსოფიური განცდა იყოს, მაგრამ წამლების დათვლა კონკრეტული ქმედებაა. ჯერ უსაფრთხოება, შემდეგ ყველაფერი დანარჩენი.',
              en: 'Yes. The existential question stops here. "No point any more" may be a deep philosophical experience, but counting pills is a concrete act. Safety first, everything else after.'
            }
          },
          {
            text: { ka: 'კითხვა იმაზე, რას ნიშნავს მისთვის „აზრი"', en: 'Ask what "point" means to them' },
            why: {
              ka: 'ეს კარგი ეგზისტენციალური კითხვაა და არასწორ მომენტში დასმული. ის მეორე წინადადებას გვერდს უვლის — ხოლო სწორედ ის იყო ყველაზე მნიშვნელოვანი.',
              en: 'A good existential question asked at the wrong moment. It steps around the second sentence — which was the important one.'
            }
          },
          {
            text: { ka: 'შენიშვნა და თემას მოგვიანებით დაბრუნება', en: 'Note it and return to the topic later' },
            why: {
              ka: 'გადადება აქ საშიშია. სუიციდურ განზრახვას პირდაპირ ეკითხებიან, ღიად და მაშინვე — ეს კითხვა რისკს არ ზრდის.',
              en: 'Postponing is dangerous here. Suicidal intent is asked about directly, openly and at once — the question does not increase the risk.'
            }
          }
        ]
      },
      {
        id: 'edges-close',
        kind: 'read',
        title: { ka: 'სად ხართ ახლა', en: 'Where you are now' },
        body: {
          ka: 'თუ აქამდე მოხვედით, უკვე გაქვთ ის, რაც ამ მიდგომაში ყველაზე ძნელად მოსაპოვებელია — არა ტერმინები, არამედ ყური. იცით, რას უსმენთ.\n\nეს კურსი არ ხდის თერაპევტად და არც ცდილობს. ის რასაც აკეთებს, არის ჩარჩო: საიდან იწყება, რაზე დგას, როგორ ჟღერს და სად თავდება. ამის შემდეგ კატალოგები — მოაზროვნეები, პრაქტიკები, სცენარები, ლექსიკონი — უკვე სხვანაირად იკითხება, რადგან იცით, სად ჯდება თითოეული.\n\nდაბრუნდით მათთან როცა გინდათ. ისინი აღარ არის სია — ისინი ახლა რუკაა.',
          en: 'If you have come this far you already have the thing that is hardest to acquire in this approach — not the vocabulary, but the ear. You know what you are listening for.\n\nThis course does not make anyone a therapist and does not try to. What it does is give a frame: where this begins, what it stands on, how it sounds, and where it ends. After that the catalogues — thinkers, practices, scenarios, the lexicon — read differently, because you know where each one sits.\n\nGo back to them whenever you like. They are no longer a list. They are a map.'
        }
      }
    ]
  }
];

/** Every step across every module — the denominator for overall progress. */
export const TOTAL_STEPS = CURRICULUM.reduce((sum, module) => sum + module.steps.length, 0);
