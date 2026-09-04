/* ==========================================================================
   game-timeline.js — ten works and ideas, to be put in chronological order.

   `year` is the ordering key and is revealed only after checking. Years are
   publication dates, chosen because they are unambiguous — "when Heidegger
   had the idea" is not a sortable fact, but Sein und Zeit appearing in 1927
   is. No two entries share a year, so exactly one correct order exists.
   ========================================================================== */

import type { TimelineItem } from '../models';

export const GAME_TIMELINE: TimelineItem[] = [
  {
    id: 'tl1', year: 1844, thinkerSlug: 'kierkegaard',
    title: { ka: '„შფოთვის ცნება"', en: 'The Concept of Anxiety' },
    who: { ka: 'კირკეგორი', en: 'Kierkegaard' },
    note: {
      ka: 'შფოთვა პირველად აღიწერა როგორც „თავისუფლების თავბრუსხვევა" და არა როგორც სისუსტე.',
      en: 'Anxiety described for the first time as "the dizziness of freedom" rather than as weakness.'
    }
  },
  {
    id: 'tl2', year: 1849, thinkerSlug: 'kierkegaard',
    title: { ka: '„სასიკვდილო სნეულება"', en: 'The Sickness Unto Death' },
    who: { ka: 'კირკეგორი', en: 'Kierkegaard' },
    note: {
      ka: 'სასოწარკვეთა როგორც საკუთარ თავად არყოფნა — მდგომარეობა, რომელიც უსიმპტომოც შეიძლება იყოს.',
      en: 'Despair as the condition of not being oneself — a state that can be entirely symptomless.'
    }
  },
  {
    id: 'tl3', year: 1927, thinkerSlug: 'heidegger',
    title: { ka: '„ყოფიერება და დრო"', en: 'Being and Time' },
    who: { ka: 'ჰაიდეგერი', en: 'Heidegger' },
    note: {
      ka: 'სამყაროში-ყოფნა, ჩაგდებულობა და სიკვდილისკენ-ყოფნა. მთელი დაზაინანალიზი აქედან იზრდება.',
      en: 'Being-in-the-world, thrownness and being-toward-death. The whole of Daseinsanalysis grows from here.'
    }
  },
  {
    id: 'tl4', year: 1942, thinkerSlug: 'binswanger',
    title: { ka: '„ადამიანური ყოფიერების ძირითადი ფორმები"', en: 'Basic Forms of Human Existence' },
    who: { ka: 'ბინსვანგერი', en: 'Binswanger' },
    note: {
      ka: 'ჰაიდეგერის ანალიტიკა კლინიკურ მეთოდად იქცევა. აქ ჩნდება „სამყაროს პროექტის" ცნება.',
      en: 'Heidegger’s analytic becomes a clinical method. The concept of the world-design appears here.'
    }
  },
  {
    id: 'tl5', year: 1943, thinkerSlug: 'sartre',
    title: { ka: '„ყოფიერება და არარა"', en: 'Being and Nothingness' },
    who: { ka: 'სარტრი', en: 'Sartre' },
    note: {
      ka: 'ცუდი რწმენა, „სხვისი მზერა" და ეგზისტენციალური ფსიქოანალიზის პროექტი.',
      en: 'Bad faith, the look of the other, and the project of an existential psychoanalysis.'
    }
  },
  {
    id: 'tl6', year: 1946, thinkerSlug: 'frankl',
    title: { ka: '„ადამიანის აზრის ძიება"', en: "Man's Search for Meaning" },
    who: { ka: 'ფრანკლი', en: 'Frankl' },
    note: {
      ka: 'დაწერილია ცხრა დღეში, ბანაკებიდან დაბრუნების შემდეგ. აქედან იწყება ლოგოთერაპია ფართო აუდიტორიისთვის.',
      en: 'Written in nine days after his return from the camps. Logotherapy reaches a wide readership from here.'
    }
  },
  {
    id: 'tl7', year: 1949, thinkerSlug: 'beauvoir',
    title: { ka: '„მეორე სქესი"', en: 'The Second Sex' },
    who: { ka: 'დე ბოვუარი', en: 'de Beauvoir' },
    note: {
      ka: 'თავისუფლება ვითარებაში: არსი შემდეგ მოდის, მაგრამ სხეული და სოციალური პოზიცია უკვე იქ არის.',
      en: 'Freedom in situation: essence comes afterwards, but the body and social position are already there.'
    }
  },
  {
    id: 'tl8', year: 1950, thinkerSlug: 'may',
    title: { ka: '„შფოთვის მნიშვნელობა"', en: 'The Meaning of Anxiety' },
    who: { ka: 'მეი', en: 'May' },
    note: {
      ka: 'ეგზისტენციალური და ნევროზული შფოთვის გამიჯვნა — ალბათ ყველაზე პრაქტიკული განსხვავება ამ სფეროში.',
      en: 'The separation of existential from neurotic anxiety — perhaps the most practical distinction in the field.'
    }
  },
  {
    id: 'tl9', year: 1980, thinkerSlug: 'yalom',
    title: { ka: '„ეგზისტენციალური ფსიქოთერაპია"', en: 'Existential Psychotherapy' },
    who: { ka: 'იალომი', en: 'Yalom' },
    note: {
      ka: 'ოთხი საბოლოო საზრუნავი. მიდგომამ პირველად მიიღო სისტემატური, სასწავლებელი ფორმა.',
      en: 'The four ultimate concerns. The approach receives a systematic, teachable form for the first time.'
    }
  },
  {
    id: 'tl10', year: 1988, thinkerSlug: 'vandeurzen',
    title: { ka: '„ეგზისტენციალური კონსულტირება პრაქტიკაში"', en: 'Existential Counselling in Practice' },
    who: { ka: 'ვან დორზენი', en: 'van Deurzen' },
    note: {
      ka: 'ოთხი განზომილება და პრაქტიკული ჩარჩო. მიდგომა შედის სასწავლო პროგრამებში.',
      en: 'The four dimensions and a practical framework. The approach enters formal training programmes.'
    }
  }
];
