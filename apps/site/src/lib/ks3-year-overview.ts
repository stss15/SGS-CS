export interface Ks3YearOverviewUnit {
  number: string;
  title: string;
  summary: string;
  tone?: 'navy' | 'gold' | 'ink';
  badge?: string;
}

export interface Ks3YearOverview {
  kicker: string;
  headline: string;
  highlight: string;
  intro: string;
  units: Ks3YearOverviewUnit[];
}

const YEAR_OVERVIEWS: Record<string, Ks3YearOverview> = {
  year7: {
    kicker: 'Year 7 Academic Journey',
    headline: 'Digital Foundations &',
    highlight: 'Systems Thinking',
    intro:
      'Year 7 builds the core habits of computer science, moving from confident device use and digital citizenship into hardware, binary, and healthy technology habits.',
    units: [
      {
        number: '01',
        title: 'Introduction to Computing',
        summary:
          'Build confident routines with macOS, Finder, OneDrive, Teams, and OneNote so every later unit starts from a strong digital workflow.',
        tone: 'navy'
      },
      {
        number: '02',
        title: 'Becoming a Digital Citizen',
        summary:
          'Explore digital identity, privacy, data trails, misinformation, and online conduct so students can participate safely and responsibly.',
        tone: 'gold'
      },
      {
        number: '03',
        title: 'Inside the Machine - Systems & Logic',
        summary:
          'Open the box on hardware, networks, Boolean logic, and truth tables to see how computers follow rules and make decisions.',
        tone: 'navy'
      },
      {
        number: '04',
        title: 'Data & Representation',
        summary:
          'Learn why computers use binary, how decimal and binary connect, and how bits, bytes, and ASCII store information.',
        tone: 'gold'
      },
      {
        number: '05',
        title: 'Computational Thinking & Wellbeing',
        summary:
          'Study how apps shape attention, break habits into patterns and steps, and design practical guidance for healthier technology use.',
        tone: 'navy'
      },
      {
        number: '06',
        title: 'Systems in Action',
        summary:
          'Planned applied unit bringing together data, logic, and digital workflow skills in a practical systems brief. Full sequence is being prepared.',
        tone: 'ink',
        badge: 'Planned Applied Unit'
      }
    ]
  },
  year8: {
    kicker: 'Year 8 Curriculum Preview',
    headline: 'Curriculum Structure &',
    highlight: 'Coming Soon',
    intro:
      'The Year 8 shell is now in place. Detailed unit summaries, challenge routes, and assessment guidance will appear here as the sequence is finalized.',
    units: [
      {
        number: '01',
        title: 'Unit 1',
        summary: 'Course content coming soon. This overview will be updated with key knowledge, practical work, and retrieval focus.',
        tone: 'navy'
      },
      {
        number: '02',
        title: 'Unit 2',
        summary: 'Course content coming soon. Detailed lesson sequencing and supporting activities will appear here.',
        tone: 'gold'
      },
      {
        number: '03',
        title: 'Unit 3',
        summary: 'Course content coming soon. This panel will outline concepts, examples, and applied tasks.',
        tone: 'navy'
      },
      {
        number: '04',
        title: 'Unit 4',
        summary: 'Course content coming soon. Assessment checkpoints and vocabulary will be added once published.',
        tone: 'gold'
      },
      {
        number: '05',
        title: 'Unit 5',
        summary: 'Course content coming soon. Practical workflows and extension pathways will be mapped here.',
        tone: 'navy'
      },
      {
        number: '06',
        title: 'Unit 6',
        summary: 'Course content coming soon. The final unit overview will appear here when the full Year 8 sequence is ready.',
        tone: 'ink',
        badge: 'Publishing Soon'
      }
    ]
  },
  year9: {
    kicker: 'Year 9 Curriculum Preview',
    headline: 'Transition Sequence &',
    highlight: 'Coming Soon',
    intro:
      'Year 9 will bridge KS3 into the next stage of study. The design is ready, and detailed unit overviews will be added as the course sequence is completed.',
    units: [
      {
        number: '01',
        title: 'Unit 1',
        summary: 'Course content coming soon. This panel will introduce the unit focus, core skills, and practical direction.',
        tone: 'navy'
      },
      {
        number: '02',
        title: 'Unit 2',
        summary: 'Course content coming soon. Lesson pathways and applied outcomes will be summarized here.',
        tone: 'gold'
      },
      {
        number: '03',
        title: 'Unit 3',
        summary: 'Course content coming soon. Key concepts, examples, and retrieval priorities will appear here.',
        tone: 'navy'
      },
      {
        number: '04',
        title: 'Unit 4',
        summary: 'Course content coming soon. This area will outline project work, knowledge checks, and sequencing.',
        tone: 'gold'
      },
      {
        number: '05',
        title: 'Unit 5',
        summary: 'Course content coming soon. Supporting resources and extension detail will be added here.',
        tone: 'navy'
      },
      {
        number: '06',
        title: 'Unit 6',
        summary: 'Course content coming soon. The final Year 9 unit summary will appear here when the full pathway is published.',
        tone: 'ink',
        badge: 'Publishing Soon'
      }
    ]
  }
};

export const getKs3YearOverview = (year: string | null): Ks3YearOverview | null => {
  if (!year) return null;
  return YEAR_OVERVIEWS[year.toLowerCase()] ?? null;
};
