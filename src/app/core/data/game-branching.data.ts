/* ==========================================================================
   game-branching.js — client statements with three therapist responses.

   Ports the CBT quiz engine's semantics (one-shot answer, lock, explain) but
   fixes what made its feedback fragile: the CBT rubric derived its judgement
   from English keyword matching, so a Georgian or Russian session scored near
   zero. Here every verdict and every explanation is authored data, identical
   in both languages.

   `tag` keys map onto games.branching.tag* in strings.js.
   Exactly one option per item has correct: true.
   ========================================================================== */

import type { BranchItem } from '../models';

export const GAME_BRANCHING: BranchItem[] = [
  {
    id: 'b1',
    givenId: 'death',
    client: {
      ka: '„ექიმმა თქვა, რომ პროგნოზი კარგია. ყველა მეუბნება, რომ დადებითად ვიფიქრო. მე კი ღამით ვწევარ და ვფიქრობ, რომ ერთ დღეს მე აქ აღარ ვიქნები. ალბათ სისულელეა."',
      en: '"The doctor says the prognosis is good. Everyone tells me to think positively. And I lie awake at night thinking that one day I will not be here. It is probably nonsense."'
    },
    options: [
      {
        tag: 'reassurance',
        text: {
          ka: '„პროგნოზი მართლაც კარგია. სტატისტიკა თქვენს მხარესაა და მნიშვნელოვანია, რომ ამას დაეყრდნოთ."',
          en: '"The prognosis really is good. The statistics are on your side and it matters that you lean on that."'
        },
        feedback: {
          ka: 'ეს ზუსტად ის არის, რასაც ყველა უკვე ეუბნება. თერაპევტი აქ ხდება რიგით მეხუთე ადამიანი, ვინც თემა დახურა — და კლიენტი კიდევ უფრო მარტო რჩება ღამის სამ საათზე.',
          en: 'This is exactly what everyone already tells her. The therapist becomes the fifth person to close the subject — and she is left even more alone at three in the morning.'
        }
      },
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„შევნიშნე, რომ თქვით — ალბათ სისულელეა. მე არ მგონია. მგონია, რომ ყველაზე მნიშვნელოვანი თქვით და მაშინვე უკან წაიღეთ."',
          en: '"I notice you said it is probably nonsense. I don’t think so. I think you said the most important thing and took it straight back."'
        },
        feedback: {
          ka: 'ეს მოცემულობასთან შეხვედრაა. თერაპევტი არც ამშვიდებს და არც ადასტურებს საშიშროებას — ის უბრალოდ არ გაექცა კითხვას. ამით ის ხდება ერთადერთი ადამიანი, ვისთანაც ამ თემაზე საუბარი შესაძლებელია.',
          en: 'This is confronting the given. The therapist neither reassures nor confirms a danger — they simply did not flee the question. That makes them the one person with whom this can be spoken about.'
        }
      },
      {
        tag: 'interpretation',
        text: {
          ka: '„ეს ალბათ ბავშვობის დაუცველობის განცდას უკავშირდება, რომელიც ავადმყოფობამ გაააქტიურა."',
          en: '"This is probably connected to a childhood sense of insecurity that the illness has reactivated."'
        },
        feedback: {
          ka: 'ნაადრევი ინტერპრეტაცია აქცევს კონკრეტულ, ცოცხალ შიშს თეორიულ საკითხად. ეს არის თემის არიდების ინტელექტუალური ფორმა — ის ბევრად უფრო კომფორტულია თერაპევტისთვის, ვიდრე კლიენტისთვის.',
          en: 'A premature interpretation turns a concrete, living fear into a theoretical matter. It is the intellectual form of avoidance — considerably more comfortable for the therapist than for the client.'
        }
      }
    ]
  },

  {
    id: 'b2',
    givenId: 'freedom',
    client: {
      ka: '„ორი წელია ვერ ვწყვეტ ამ სამსახურის საკითხს. უბრალოდ არ არის შესაფერისი მომენტი. როცა სიტუაცია სტაბილური გახდება, მაშინ დავფიქრდები."',
      en: '"Two years and I cannot settle this job question. It simply is not the right moment. When things stabilise, then I will think about it."'
    },
    options: [
      {
        tag: 'problemSolving',
        text: {
          ka: '„მოდი, ერთად შევადგინოთ სია: რა კრიტერიუმებით მიიღებდით გადაწყვეტილებას და რა ვადაში?"',
          en: '"Let’s draw up a list together: what criteria would you decide by, and by when?"'
        },
        feedback: {
          ka: 'ეს გონივრული ჩარევაა და ზოგ მიდგომაში სწორიც. მაგრამ აქ ის კლიენტს ეხმარება ერთი მოძრაობის გამეორებაში, რომელსაც ორი წელი აკეთებს: ანალიზი მოქმედების ნაცვლად. ცხრილი უკვე მოაქვს.',
          en: 'This is sensible, and in some approaches correct. But here it helps the client repeat the very move he has been making for two years: analysis in place of action. He already brings a spreadsheet.'
        }
      },
      {
        tag: 'reassurance',
        text: {
          ka: '„სავსებით გასაგებია. ასეთი გადაწყვეტილება დროს მოითხოვს და თქვენ ჩქარობა არ გჭირდებათ."',
          en: '"That is entirely understandable. A decision like this takes time and you are under no obligation to hurry."'
        },
        feedback: {
          ka: 'დამამშვიდებელი პასუხი აქ პირდაპირ ეხმარება ცუდ რწმენას. თერაპევტი თავისი ავტორიტეტით ადასტურებს ისტორიას, რომლითაც კლიენტი პასუხისმგებლობას აცილებს.',
          en: 'Reassurance here directly assists the bad faith. The therapist lends their authority to the very story with which the client is avoiding responsibility.'
        }
      },
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„ორი წელი. მინდა ერთი რამ შევნიშნოთ: ეს დრო თქვენ არ გაგიტარებიათ გადაწყვეტილების გარეშე. თქვენ ამ ორ წელს აკეთებდით არჩევანს ყოველ დღე."',
          en: '"Two years. I want us to notice something: you have not spent that time without a decision. You have been making one every day for two years."'
        },
        feedback: {
          ka: 'ეს აბრუნებს ავტორობას, ბრალდების გარეშე. ეგზისტენციალურ თერაპიაში არჩევანის არარსებობა არ არსებობს — არჩევანის უარყოფაც არჩევანია. კითხვა აღარ არის „რომელი სამსახური", არამედ „ვინ ირჩევს".',
          en: 'This returns authorship without accusation. In existential therapy there is no absence of choice — refusing to choose is also choosing. The question stops being which job and becomes who is choosing.'
        }
      }
    ]
  },

  {
    id: 'b3',
    givenId: 'isolation',
    client: {
      ka: '„ოცდაექვსი წელია ერთად ვართ. არ ვჩხუბობთ. უბრალოდ წელს ვცადე გამეხსენებინა, როდის ვუთხარი მას რამე ისეთი, რაც მართლა მაწუხებდა. ვერ გავიხსენე."',
      en: '"Twenty-six years together. We don’t quarrel. It is just that this year I tried to remember when I last told her something that genuinely troubled me. I couldn’t."'
    },
    options: [
      {
        tag: 'problemSolving',
        text: {
          ka: '„გიფიქრიათ წყვილთა თერაპიაზე? ეს ის სივრცეა, სადაც ასეთი საუბრები შეიძლება დაიწყოს."',
          en: '"Have you considered couples therapy? That is the space where conversations like this can begin."'
        },
        feedback: {
          ka: 'შესაძლოა სასარგებლო რეკომენდაცია, მაგრამ არა ახლა. კლიენტმა ახლახან პირველად თქვა ხმამაღლა ის, რაზეც ოცდაექვსი წელი დუმდა. მისი გადამისამართება ამ წუთში ნიშნავს, რომ ის, რაც სწორედ მოხდა, არ შენიშნეს.',
          en: 'Possibly a useful referral, but not now. He has just said aloud, for the first time, what he has been silent about for twenty-six years. Redirecting him at this minute means what just happened went unnoticed.'
        }
      },
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„თქვენ თქვით — ალბათ ორივემ ვიცით, რომ გვიანია. საიდან იცით, რომ მან ეს იცის?"',
          en: '"You said — probably we both know it is late. How do you know that she knows that?"'
        },
        feedback: {
          ka: 'ერთი კითხვა, რომელიც ვარაუდს ფაქტისგან განასხვავებს. კლიენტმა ოცდაექვსი წელი იცხოვრა დაშვებით, რომელიც არასდროს შეუმოწმებია. ეს არის სოკრატული დიალოგი ეგზისტენციალური მიმართულებით: არა აზრის სისწორე, არამედ ის, რას ნიშნავს ეს ცხოვრებისთვის.',
          en: 'One question that separates an assumption from a fact. He has lived twenty-six years on a premise he has never checked. This is Socratic dialogue in the existential direction: not whether the thought is accurate, but what it has meant for a life.'
        }
      },
      {
        tag: 'interpretation',
        text: {
          ka: '„ჟღერს ისე, თითქოს ორივემ ემოციური დისტანცია აირჩიეთ, რომ კონფლიქტისგან დაცულიყავით."',
          en: '"It sounds as though you both chose emotional distance in order to be protected from conflict."'
        },
        feedback: {
          ka: 'ეს შეიძლება მართალიც იყოს, მაგრამ ის კლიენტს ართმევს აღმოჩენას. ინტერპრეტაცია, რომელიც ზუსტია და ნაადრევი, ხურავს იმ სივრცეს, სადაც კლიენტს თავად უნდა მოეხედა.',
          en: 'It may even be true, but it takes the discovery away from him. An interpretation that is accurate and premature closes the space in which he needed to look for himself.'
        }
      }
    ]
  },

  {
    id: 'b4',
    givenId: 'meaninglessness',
    client: {
      ka: '„ყველაფერი მაქვს, რაც ოცი წლის წინ მინდოდა. და ყოველ დილით ვდგები და ვფიქრობ — და ეს ყველაფერია? მრცხვენია ამის თქმა. ხალხს რეალური პრობლემები აქვს."',
      en: '"I have everything I wanted twenty years ago. And every morning I get up and think — is this all? I am ashamed to say it. People have real problems."'
    },
    options: [
      {
        tag: 'reassurance',
        text: {
          ka: '„არ უნდა გრცხვენოდეთ. ბევრი წარმატებული ადამიანი განიცდის ამას — ეს სრულიად ნორმალურია."',
          en: '"You shouldn’t be ashamed. Many successful people feel this — it is completely normal."'
        },
        feedback: {
          ka: 'ნორმალიზება კეთილგანწყობილია, მაგრამ ის კლიენტს სტატისტიკურ კატეგორიაში ათავსებს. „ბევრი ასე გრძნობს" ნიშნავს „თქვენი კონკრეტული კითხვა არ არის განსაკუთრებული" — და სწორედ მისი კონკრეტულობაა მთელი საქმე.',
          en: 'Normalising is kindly, but it places her in a statistical category. "Many people feel this" says "your particular question is not special" — and its particularity is the entire point.'
        }
      },
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„თუ ეს არ არის რეალური პრობლემა, მაშინ ის, რის გამოც მოხვედით, არ არსებობს. და მაინც აქ ხართ."',
          en: '"If this is not a real problem, then the thing you came about does not exist. And yet here you are."'
        },
        feedback: {
          ka: 'თერაპევტი ჯერ სირცხვილს ეხება, რადგან სანამ ის იქ არის, კლიენტი საკუთარ კითხვას სერიოზულად ვერ მოეკიდება. მხოლოდ ამის შემდეგ ხდება შესაძლებელი ეგზისტენციალური ვაკუუმის სახელით დასახელება.',
          en: 'The therapist addresses the shame first, because while it stands there she cannot take her own question seriously. Only afterwards does naming the existential vacuum become possible.'
        }
      },
      {
        tag: 'problemSolving',
        text: {
          ka: '„იქნებ ახალი მიზანი დაისახოთ? რაიმე, რაც შემდეგი ხუთი წლისთვის მოგცემთ მიმართულებას."',
          en: '"Perhaps set a new goal? Something to give you direction for the next five years."'
        },
        feedback: {
          ka: 'ეს ზუსტად ის მექანიზმია, რომელმაც კლიენტი აქამდე მოიყვანა: მიზანი, როგორც აზრის შემცვლელი. ახალი მიზნის დასახვა ცარიელს დროებით შეავსებს და კითხვას კიდევ ხუთი წლით გადაავადებს.',
          en: 'This is precisely the mechanism that brought her here: a goal standing in for meaning. A new goal will fill the emptiness for a while and defer the question another five years.'
        }
      }
    ]
  },

  {
    id: 'b5',
    givenId: 'freedom',
    client: {
      ka: '„დედა ავად არის და მე ვუვლი შვიდი წელია. ხანდახან ვფიქრობ — როცა ეს დამთავრდება. და მერე ისეთი სირცხვილი მაქვს, რომ ვერ ვსუნთქავ."',
      en: '"My mother is ill and I have cared for her for seven years. Sometimes I think — when this is over. And then I am so ashamed I cannot breathe."'
    },
    options: [
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„მინდა ერთი რამ გავარჩიოთ. სურვილი, რომ თქვენი ცხოვრება დაგიბრუნდეთ, და სურვილი, რომ დედა მოკვდეს — ეს ორი სხვადასხვა რამეა. თქვენს თავში ისინი ერთმანეთს ემთხვევა."',
          en: '"I want us to separate something. Wanting your own life back and wanting your mother to die are two different things. In your head they have fused."'
        },
        feedback: {
          ka: 'ეს ჩარევა თერაპიის ერთ-ერთი ყველაზე გამათავისუფლებელი მოძრაობაა. სირცხვილი სწორედ ამ დამთხვევიდან იბადება. მათი გამიჯვნა არ ამცირებს ტვირთს, მაგრამ კლიენტს უბრუნებს უფლებას, საკუთარი ცხოვრება მოინდომოს.',
          en: 'This is among the most freeing moves in the whole therapy. The shame is born from that fusion. Separating them does not lighten the load, but it returns her right to want her own life.'
        }
      },
      {
        tag: 'reassurance',
        text: {
          ka: '„ასეთი აზრები სრულიად ბუნებრივია მზრუნველებისთვის. თქვენ არაფერი დაგიშავებიათ."',
          en: '"Thoughts like this are completely natural for carers. You have done nothing wrong."'
        },
        feedback: {
          ka: 'ეს მართალია და მაინც ცოტაა. სირცხვილი არ ქრება იმის თქმით, რომ ის უსაფუძვლოა. კლიენტმა ეს აღიარება შვიდი წელი ატარა — მას სჭირდება, რომ ის გაიხსნას და არა სწრაფად დაიხუროს.',
          en: 'True, and not enough. Shame does not lift on being told it is unfounded. She has carried this confession for seven years — it needs opening, not closing quickly.'
        }
      },
      {
        tag: 'avoidance',
        text: {
          ka: '„მოდი, ვისაუბროთ იმაზე, რა მხარდაჭერა შეიძლება მოვიპოვოთ, რომ ტვირთი შემსუბუქდეს."',
          en: '"Let’s talk about what support we could arrange to lighten the load."'
        },
        feedback: {
          ka: 'პრაქტიკული მხარდაჭერა ნამდვილად საჭიროა და მასზე უნდა ვისაუბროთ — ოღონდ არა ამ წუთში. აქ ის თემას ცვლის ზუსტად მაშინ, როცა კლიენტმა ყველაზე ძნელი რამ თქვა.',
          en: 'Practical support is genuinely needed and should be discussed — but not at this minute. Here it changes the subject exactly when she has said the hardest thing.'
        }
      }
    ]
  },

  {
    id: 'b6',
    givenId: 'meaninglessness',
    client: {
      ka: '„ორმოცდაერთი წელი ვასწავლიდი. ახლა აღარაფერს არ ვაკეთებ. მაპატიეთ — მოხუცი ვარ და წარსულში ვცხოვრობ."',
      en: '"I taught for forty-one years. Now I am not doing anything. Forgive me — I am an old man living in the past."'
    },
    options: [
      {
        tag: 'problemSolving',
        text: {
          ka: '„მოხალისეობაზე გიფიქრიათ? ბევრ სკოლას სჭირდება გამოცდილი ადამიანი."',
          en: '"Have you thought about volunteering? Plenty of schools need someone experienced."'
        },
        feedback: {
          ka: 'რჩევა, რომელიც ცარიელს ავსებს მანამ, სანამ კლიენტმა დაინახა, რას კარგავს. შესაძლოა ეს მოგვიანებით სწორი მიმართულებაც აღმოჩნდეს, მაგრამ თუ თერაპევტი მას სთავაზობს, ეს მისი გადაწყვეტილება ხდება და არა კლიენტის.',
          en: 'Advice that fills the emptiness before he has seen what he is losing. It may even turn out to be the right direction later — but if the therapist proposes it, it becomes the therapist’s decision, not his.'
        }
      },
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„მე არ მომისმენია მოხუცი, რომელიც წარსულში ცხოვრობს. მე მოვისმინე ადამიანი, რომელსაც ორმოცდაერთი წელი სჭირდებოდნენ და აღარ სჭირდება."',
          en: '"I did not hear an old man living in the past. I heard a man who was needed for forty-one years and is not needed now."'
        },
        feedback: {
          ka: 'თერაპევტი უარყოფს იმ თვითაღწერას, რომლითაც კლიენტმა საკუთარი ტკივილი შეამცირა, და მას სახელს არქმევს. ეს ხსნის კარს იმისთვის, რასაც იალომი ტალღების ეფექტს უწოდებდა: ის, რაც მან სხვებში ჩადო, არსად წასულა.',
          en: 'The therapist refuses the self-description with which he diminished his own pain, and names it instead. That opens the door to what Yalom called rippling: what he put into others has not gone anywhere.'
        }
      },
      {
        tag: 'interpretation',
        text: {
          ka: '„ჩანს, რომ თქვენი იდენტობა მთლიანად პროფესიაზე იყო აგებული და ახლა ეს კონსტრუქცია ჩამოინგრა."',
          en: '"It seems your identity was built entirely on your profession, and that construction has now collapsed."'
        },
        feedback: {
          ka: 'ეს ალბათ სწორია, მაგრამ ის ჟღერს როგორც დიაგნოზი და არა როგორც შეხვედრა. კლიენტი უკვე ბოდიშს იხდის იმისთვის, რომ არსებობს — ასეთი ფორმულირება ამ პოზიციას აძლიერებს.',
          en: 'Probably accurate, but it sounds like a diagnosis rather than a meeting. He is already apologising for existing, and a formulation like this reinforces that position.'
        }
      }
    ]
  },

  {
    id: 'b7',
    givenId: 'freedom',
    client: {
      ka: '„აქ არავინ იცის, ვინ ვარ. თუ დღეს არ ავდგები, არაფერი მოხდება. თავიდან მეგონა, რომ ეს თავისუფლებაა. ახლა კი მაშინებს."',
      en: '"Nobody here knows who I am. If I don’t get up today, nothing happens. At first I thought that was freedom. Now it frightens me."'
    },
    options: [
      {
        tag: 'reassurance',
        text: {
          ka: '„ეს პირველი თვეების ჩვეულებრივი ადაპტაციაა. დროთა განმავლობაში ნაცნობები გაგიჩნდებათ და ეს განცდა გაივლის."',
          en: '"This is the ordinary adjustment of the first months. In time you will make friends and the feeling will pass."'
        },
        feedback: {
          ka: 'ეს ალბათ პროგნოზულად სწორია, მაგრამ ის კლიენტს ეუბნება, რომ მისი აღმოჩენა დროებითი დისკომფორტია. სინამდვილეში მან რაღაც ჭეშმარიტს მიაგნო თავისუფლების შესახებ — და სწორედ ეს იმსახურებს ყურადღებას.',
          en: 'Probably right as a prediction, but it tells her that her discovery is a temporary discomfort. In fact she has hit on something true about freedom — and that is what deserves attention.'
        }
      },
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„მე მესმის ორი რამ ერთდროულად. არავინ არაფერს არ ელოდება — და ეს გამათავისუფლებელია. არავინ არაფერს არ ელოდება — და ეს საშინელია. ორივე ერთდროულადაა?"',
          en: '"I hear two things at once. Nobody expects anything — and that is freeing. Nobody expects anything — and that is terrible. Are both true at the same time?"'
        },
        feedback: {
          ka: 'ეს არის ორაზროვნების ლეგიტიმაცია. კლიენტს აქამდე ეგონა, რომ ერთი მათგანი ტყუილი უნდა ყოფილიყო. თავისუფლების პარადოქსი სწორედ ესაა და მისი გადაწყვეტა არ სჭირდება — მას სჭირდება, რომ დაინახონ.',
          en: 'This legitimises an ambiguity. Until now she assumed one of the two had to be a lie. This is the paradox of freedom, and it does not need resolving — it needs seeing.'
        }
      },
      {
        tag: 'problemSolving',
        text: {
          ka: '„სცადეთ დღის მკაცრი განრიგის შედგენა. სტრუქტურა დაგეხმარებათ, რომ დილას ადგომა უფრო ადვილი გახდეს."',
          en: '"Try setting a strict daily schedule. Structure will make the mornings easier."'
        },
        feedback: {
          ka: 'ეს ქცევითი რჩევაა და შესაძლოა მოკლევადიანად დაეხმაროს. მაგრამ ის კლიენტს სთავაზობს იმავე გარეგან სტრუქტურას, რომლის დაკარგვამაც ეს კითხვა გააჩინა — და ამით კითხვას ხურავს.',
          en: 'A behavioural suggestion that may help in the short term. But it offers her the same external structure whose loss produced the question — and so closes the question.'
        }
      }
    ]
  },

  {
    id: 'b8',
    givenId: 'death',
    client: {
      ka: '„დედა ცხრა თვის წინ გარდაიცვალა. ხალხს ეს უკვე დაავიწყდა. მე კი იმ ორმოცდაცხრა კვირას ვინახავ თავში, რომელიც ვერავის ვერ ავუხსენი. და მართლა, ვის რა უნდა?"',
      en: '"My mother died nine months ago. People have forgotten already. And I am carrying forty-nine weeks in my head that I have never been able to explain to anybody. And really, who wants to hear it?"'
    },
    options: [
      {
        tag: 'reassurance',
        text: {
          ka: '„მე მინდა მოვისმინო. აქ თქვენ შეგიძლიათ ყველაფერი თქვათ."',
          en: '"I want to hear it. Here you can say anything."'
        },
        feedback: {
          ka: 'გულწრფელი და კეთილი, მაგრამ ის კლიენტის ეჭვს ზედაპირულად პასუხობს. „ვის რა უნდა" არ არის თხოვნა დარწმუნებაზე — ეს არის ეგზისტენციალური იზოლაციის აღწერა. თერაპევტის დაპირება მას ვერ აუქმებს.',
          en: 'Sincere and kind, but it answers his doubt too cheaply. "Who wants to hear it" is not a request for reassurance — it is a description of existential isolation, and a promise cannot dissolve it.'
        }
      },
      {
        tag: 'existential',
        correct: true,
        text: {
          ka: '„ორმოცდაცხრა კვირა. თქვენ დათვალეთ."',
          en: '"Forty-nine weeks. You counted."'
        },
        feedback: {
          ka: 'მოკლე წინადადება, რომელიც ორ რამეს აკეთებს: ადასტურებს, რომ თერაპევტმა მოისმინა ის დეტალი, რომელიც კლიენტმა თითქმის შემთხვევით თქვა, და ემოციას არ ითხოვს. ის უბრალოდ ადასტურებს, რომ იქ რაღაც იყო.',
          en: 'A short sentence doing two things: it shows the therapist heard the detail he let slip almost by accident, and it asks for no feeling. It simply confirms that something was there.'
        }
      },
      {
        tag: 'interpretation',
        text: {
          ka: '„თქვენი დების მიმართ ბრაზი ჩანს. იქნებ ის მოგვიანებით უფრო მკაფიოდ ვნახოთ?"',
          en: '"There seems to be anger toward your sisters. Perhaps we should look at that more closely later?"'
        },
        feedback: {
          ka: 'ბრაზი ალბათ ნამდვილად არის და მასთან მიბრუნება მოგვიანებით საჭირო იქნება. მაგრამ ახლა ის კლიენტს აშორებს იმ ერთი წინადადებისგან, რომელიც მან ძლივს თქვა.',
          en: 'The anger is probably real and will need returning to. But right now it moves him away from the one sentence he barely managed to say.'
        }
      }
    ]
  }
];
