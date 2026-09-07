/* ==========================================================================
   legal.js — privacy and terms copy.

   Written to describe what this platform actually does, which is unusually
   little: it has no server, no analytics and no network calls of its own.
   Saying so plainly is more useful than a boilerplate policy describing data
   flows that do not exist here.
   ========================================================================== */

import type { LegalSection } from '../models';

export const LEGAL_UPDATED: string = '2026-09-03';

export const PRIVACY: LegalSection[] = [
  {
    heading: { ka: 'მოკლედ', en: 'In short' },
    body: {
      ka: 'ეს პლატფორმა სტატიკური გვერდების ერთობლიობაა. მას მონაცემთა ბაზა არ აქვს, ანგარიშებს არ ინახავს და თქვენს შესახებ არაფერს არ აგროვებს. ერთადერთი გამონაკლისი სავარჯიშო საუბრის გვერდია: იქ დაწერილი ტექსტი პასუხის მისაღებად იგზავნება Anthropic-ის სერვისში. ამის გარდა, საიტიდან არსად არაფერი მიდის.',
      en: 'This platform is a set of static pages. It has no database, keeps no accounts, and collects nothing about you. There is one exception: the practice conversation page, where what you write is sent to Anthropic\'s service to produce a reply. Apart from that, nothing leaves the site.'
    }
  },
  {
    heading: { ka: 'რა ინახება თქვენს ბრაუზერში', en: 'What is stored in your browser' },
    body: {
      ka: 'ზოგიერთი ფუნქცია იმახსოვრებს თქვენს არჩევანს localStorage-ის საშუალებით. ეს მონაცემები რჩება მხოლოდ ამ ბრაუზერში, არსად არ იგზავნება და მათზე წვდომა არავის აქვს — ჩვენ ჩათვლით.',
      en: 'Some features remember your choices using localStorage. That data stays in this browser, is never transmitted, and no one has access to it — ourselves included.'
    },
    list: {
      ka: [
        'არჩეული თემა (ნათელი ან ბნელი) და ენა.',
        'სავარჯიშოების პროგრესი: საუკეთესო შედეგი და მცდელობების რაოდენობა.',
        'სცენარებთან დაწერილი თქვენი რეფლექსიის ჩანაწერები.',
        'აზრის ინვენტარის ჩანაწერები — მაქსიმუმ ოცი უახლესი.',
        'კურსის პროგრესი: რომელი ნაბიჯები გაიარეთ.',
        'მიმდინარე სავარჯიშო საუბარი, სანამ თავად არ წაშლით.',
        'დემონსტრაციული პროფილი, თუ ის შექმენით: სახელი და ელფოსტა. პაროლი არასდროს იკითხება.'
      ],
      en: [
        'Your chosen theme (light or dark) and language.',
        'Exercise progress: best score and number of attempts.',
        'Any reflection notes you write alongside the scenarios.',
        'Meaning-inventory entries — the twenty most recent.',
        'Course progress: which steps you have finished.',
        'The current practice conversation, until you delete it yourself.',
        'A demonstration profile, if you create one: a name and an email. No password is ever asked for.'
      ]
    }
  },
  {
    heading: { ka: 'როგორ წაშალოთ ეს მონაცემები', en: 'How to delete that data' },
    body: {
      ka: 'ბრაუზერის საიტის მონაცემების გასუფთავება ყველაფერს წაშლის. ცალკეული ნაწილების წაშლა შესაძლებელია თავად გვერდებზეც: სავარჯიშოების პროგრესი — სავარჯიშოების გვერდიდან, ინვენტარის ჩანაწერები — თითოეული ჩანაწერის გვერდით.',
      en: 'Clearing site data in your browser removes all of it. Individual parts can also be removed from the pages themselves: exercise progress from the exercises page, inventory entries next to each entry.'
    }
  },
  {
    heading: { ka: 'გარე რესურსები', en: 'External resources' },
    body: {
      ka: 'გვერდები იყენებს შრიფტებს Google Fonts-იდან, CSS-ის ბიბლიოთეკას jsDelivr-იდან და ატმოსფერულ სურათებს Unsplash-იდან. ამ რესურსების ჩამოტვირთვისას თქვენი ბრაუზერი ამ სერვისებს უკავშირდება და ისინი, ჩვეულებისამებრ, ხედავენ თქვენს IP მისამართს. ჩვენ ამ ინფორმაციას არ ვიღებთ. ანალიტიკა, სარეკლამო სკრიპტები და თვალთვალის ქუქიები არ გვაქვს.',
      en: 'The pages load fonts from Google Fonts, a CSS library from jsDelivr, and atmospheric images from Unsplash. Fetching those resources means your browser contacts those services, and they will see your IP address as they normally would. We receive none of that. There is no analytics, no advertising script and no tracking cookie.'
    }
  },
  {
    heading: { ka: 'სავარჯიშო საუბარი', en: 'The practice conversation' },
    body: {
      ka: 'ამ გვერდზე დაწერილი ტექსტი პასუხის მისაღებად იგზავნება Anthropic-ის სერვისში (Claude). გადაცემა ხდება ჩვენი ფუნქციის გავლით, რომელიც მხოლოდ შუამავალია — ის საუბარს არ ინახავს და არსად არ წერს. თავად საუბარი ინახება მხოლოდ თქვენს ბრაუზერში და შეგიძლიათ ნებისმიერ დროს წაშალოთ ღილაკით „ახალი საუბარი".\n\nრადგან ტექსტი მესამე მხარეს გადაეცემა, არ დაწეროთ იქ ის, რისი გაზიარებაც არ გსურთ — სახელები, საკონტაქტო ინფორმაცია ან სხვისი ამბები. Anthropic-ის მიერ მონაცემების დამუშავებას მისივე პირობები არეგულირებს.',
      en: 'What you write on that page is sent to Anthropic\'s service (Claude) to produce a reply. It travels through a function of ours that acts only as a relay — it does not store the conversation or write it down anywhere. The conversation itself is kept only in your browser, and you can delete it at any time with the "New conversation" button.\n\nBecause the text does reach a third party, do not write anything there you would not want shared — names, contact details, or somebody else\'s story. Anthropic\'s own terms govern what they do with it.'
    }
  },
  {
    heading: { ka: 'ბავშვები', en: 'Children' },
    body: {
      ka: 'მასალა განკუთვნილია ზრდასრული მკითხველისთვის, რომელიც ფსიქოთერაპიას სწავლობს ან მისით ინტერესდება.',
      en: 'The material is intended for adult readers studying or interested in psychotherapy.'
    }
  }
];

export const TERMS: LegalSection[] = [
  {
    heading: { ka: 'რა არის ეს პლატფორმა', en: 'What this platform is' },
    body: {
      ka: 'ეს არის დამოუკიდებელი, არაკომერციული სასწავლო სივრცე ეგზისტენციალური თერაპიის შესახებ. ის განკუთვნილია სტუდენტების, პრაქტიკოსებისა და დაინტერესებული მკითხველისთვის.',
      en: 'This is an independent, non-commercial learning space about existential therapy, intended for students, practitioners and interested readers.'
    }
  },
  {
    heading: { ka: 'ეს არ არის თერაპია', en: 'This is not therapy' },
    body: {
      ka: 'აქ მოცემული არაფერი არ არის სამედიცინო, ფსიქოლოგიური ან დიაგნოსტიკური რჩევა. ეს მასალა არ ცვლის კვალიფიციურ სპეციალისტთან შეხვედრას და არც პროფესიულ განათლებას. თუ თქვენ ან ვინმეს თქვენს გარშემო უჭირს, მიმართეთ სპეციალისტს; მწვავე კრიზისის შემთხვევაში — გადაუდებელ სამსახურს.',
      en: 'Nothing here is medical, psychological or diagnostic advice. This material replaces neither a meeting with a qualified professional nor professional training. If you or someone near you is struggling, speak to a professional; in an acute crisis, contact emergency services.'
    }
  },
  {
    heading: { ka: 'საუბარი ხელოვნურ ინტელექტთან', en: 'The conversation is with an AI' },
    body: {
      ka: 'სავარჯიშო საუბრის გვერდზე თანამოსაუბრე ენობრივი მოდელია (Anthropic-ის Claude) და არა ადამიანი. ის არ არის თერაპევტი, არ არის ექიმი და არ არის ლიცენზირებული სპეციალისტი. ის ვერ სვამს დიაგნოზს, ვერ ნიშნავს მკურნალობას და ვერ იღებს პასუხისმგებლობას თქვენზე.\n\nეს დემონსტრაციაა — გზა იმის საგრძნობად, როგორ მიმდინარეობს ასეთი საუბარი. ის არ არის თერაპია და მას ვერ ჩაანაცვლებს. მოდელი შეიძლება შეცდეს, გაიმეოროს სტერეოტიპი ან თქვას ის, რაც თქვენს ვითარებას არ შეესაბამება.\n\nთუ საუბარში კრიზისის ნიშანი გამოჩნდება, გვერდი შეწყვეტს პერსონაჟში ყოფნას და დახმარების კონტაქტებს გაჩვენებთ. ეს ავტომატური მექანიზმია და მასზე დაყრდნობა არ შეიძლება: ის ყველაფერს ვერ ამოიცნობს. თუ გიჭირთ, მიმართეთ ცოცხალ სპეციალისტს.',
      en: 'On the practice conversation page you are talking to a language model (Anthropic\'s Claude), not to a person. It is not a therapist, not a doctor, and not a licensed professional of any kind. It cannot diagnose, cannot prescribe, and carries no responsibility for you.\n\nIt is a demonstration — a way to feel how such a conversation moves. It is not therapy and does not replace it. The model can be wrong, can repeat a stereotype, and can say something that does not fit your situation at all.\n\nIf a sign of crisis appears, the page stops holding the character and shows contacts for help instead. That is an automatic mechanism and it must not be relied upon: it will not catch everything. If you are struggling, speak to a person.'
    }
  },
  {
    heading: { ka: 'სცენარები გამოგონილია', en: 'The scenarios are invented' },
    body: {
      ka: 'ყველა კლინიკური სცენარი, სახელი და დეტალი შექმნილია სასწავლო მიზნით. ისინი არ ეხება რეალურ ადამიანებს. ნებისმიერი მსგავსება შემთხვევითია.',
      en: 'Every clinical scenario, name and detail is written for teaching. They describe no real person. Any resemblance is coincidental.'
    }
  },
  {
    heading: { ka: 'დემონსტრაციული ანგარიში', en: 'The demonstration account' },
    body: {
      ka: 'შესვლისა და ადმინისტრირების გვერდები დემონსტრაციულია. ისინი სერვერს არ უკავშირდება, პაროლს არ ითხოვს და უსაფრთხოებას არ უზრუნველყოფს. ნუ შეიყვანთ იქ ისეთ ინფორმაციას, რომელსაც კონფიდენციალურად მიიჩნევთ.',
      en: 'The sign-in and administration pages are a demonstration. They contact no server, ask for no password, and provide no security. Do not enter anything there that you consider confidential.'
    }
  },
  {
    heading: { ka: 'გამოყენება და მითითება', en: 'Use and attribution' },
    body: {
      ka: 'ტექსტის გამოყენება სასწავლო მიზნით თავისუფალია, წყაროს მითითებით. ციტირებული მოაზროვნეების ნაშრომები მათი ავტორებისა და გამომცემლების საკუთრებაა; აქ მოცემულია მხოლოდ მიმოხილვა და ინტერპრეტაცია.',
      en: 'The text may be used freely for teaching, with attribution. The works of the thinkers cited belong to their authors and publishers; what appears here is summary and interpretation only.'
    }
  },
  {
    heading: { ka: 'სიზუსტე', en: 'Accuracy' },
    body: {
      ka: 'მასალა მომზადებულია გულმოდგინედ, მაგრამ შეიძლება შეიცავდეს შეცდომებს ან გამარტივებებს. თუ რაიმე უზუსტობას შენიშნავთ, გთხოვთ, მოგვწეროთ — ეს დახმარება იქნება.',
      en: 'The material is prepared carefully but may contain errors or simplifications. If you notice an inaccuracy, please write to us — it would be a help.'
    }
  }
];
