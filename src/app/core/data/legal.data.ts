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
      ka: 'ამ პლატფორმას სერვერი არ ჰყავს. ის სტატიკური გვერდების ერთობლიობაა და თქვენს შესახებ არაფერს არ აგროვებს, არ გზავნის და არ ინახავს საკუთარ ბაზაში — რადგან ბაზა არ არსებობს.',
      en: 'This platform has no server. It is a set of static pages, and it collects nothing about you, sends nothing anywhere, and stores nothing in a database of its own — because there is no database.'
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
        'დემონსტრაციული პროფილი, თუ ის შექმენით: სახელი და ელფოსტა. პაროლი არასდროს იკითხება.'
      ],
      en: [
        'Your chosen theme (light or dark) and language.',
        'Exercise progress: best score and number of attempts.',
        'Any reflection notes you write alongside the scenarios.',
        'Meaning-inventory entries — the twenty most recent.',
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
