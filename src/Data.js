/**
 * ENGAPE POST — site content.
 *
 * All page copy lives here so it can be edited without touching components.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠  Blocks marked PLACEHOLDER contain example copy, not verified facts.
 *     Review every one of them with the organisation before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Photographs are referenced by key, not imported.
 *
 * `cardImageKey` and `wideImageKey` name an entry in src/cloudinaryAssets.js;
 * components hand the key to <CdnImage>, which picks the right size for where
 * it is being rendered. Keeping keys here rather than URLs means this file
 * stays free of transformation detail, and the build needs no image on disk.
 */
import { assets } from "./cloudinaryAssets";

/* ────────────────────────────────────────────────────────── brand pillars ──
 * The four figures in the ENGAPE POST logo — the acacia, the water carrier,
 * the open book and the graduate — double as the organisation's pillars.
 */
export const brandPillars = [
  {
    icon: "book",
    title: "Learning",
    text: "An open book sits at the centre of our logo. Reading, schooling and skills are the surest route out of poverty, and we protect them fiercely.",
  },
  {
    icon: "shield",
    title: "Dignity",
    text: "No girl should be cut, and no woman should live in fear. We work with whole communities so that safety and respect become the ordinary expectation.",
  },
  {
    icon: "leaf",
    title: "Stewardship",
    text: "The acacia stands for land held in trust. We plant, protect and restore, because a community's future is only as secure as the ground it stands on.",
  },
  {
    icon: "users",
    title: "Community",
    text: "The figure carrying water is a neighbour, not an outsider. We are friends of community — the work is designed, led and sustained from within.",
  },
];

/* ──────────────────────────────────────────────────────────── programmes ── */
export const programmes = [
  {
    slug: "education",
    title: "Education & Literacy",
    navLabel: "Education & Literacy",
    icon: "book",
    accent: "sky",
    short:
      "Libraries, books and digital learning that keep children — girls especially — in school and reading.",
    cardImageKey: "progEducation",
    wideImageKey: "wideEducation",
    heroKicker: "Programme",
    intro: [
      "Distance, cost and the pull of work at home keep too many children out of the classroom, and those who do attend often learn without a single book to take home. Our education work attacks that gap directly: putting reading material within reach, and making school a place children want to stay.",
      "The community library is the anchor. Shelves of graded readers and reference texts, quiet desks, and a small bank of tablets mean a pupil can finish homework properly, look something up, or simply read for pleasure — often for the first time.",
    ],
    focus: [
      {
        title: "A community library",
        text: "A stocked, staffed reading room open to pupils and adults alike, with graded readers, reference shelves and space to study after school.",
      },
      {
        title: "Digital learning",
        text: "Shared tablets loaded with curriculum-aligned material, introduced with enough support that pupils and teachers actually use them.",
      },
      {
        title: "Books into schools",
        text: "Story books, textbooks and learning materials distributed to partner schools, so reading does not stop at the library door.",
      },
      {
        title: "Keeping girls in class",
        text: "Practical barriers — uniforms, sanitary supplies, the long walk — are what pull girls out of school. We tackle them alongside the teaching.",
      },
    ],
    outcomes: [
      "Children who can read confidently in the language of instruction",
      "Fewer pupils dropping out at the transition to secondary school",
      "Teachers supported with materials they can actually teach from",
      "Parents who see the library as belonging to the community",
    ],
  },

  {
    slug: "gender-based-violence",
    title: "Ending Gender Based Violence",
    navLabel: "Ending GBV",
    icon: "shield",
    accent: "crimson",
    short:
      "Community dialogue, survivor support and clear referral pathways that make violence unacceptable and help reachable.",
    cardImageKey: "progGbv",
    wideImageKey: "wideGbv",
    heroKicker: "Programme",
    intro: [
      "Gender based violence thrives on silence. Where it is treated as a private matter to be settled quietly at home, survivors are left without options and perpetrators without consequence. Our work is to break that silence in public, and to make sure that when someone does speak up, there is somewhere for them to go.",
      "That means two things running side by side: patient community dialogue that shifts what people consider acceptable, and a practical, well-understood pathway to health care, counselling, safety and the law.",
    ],
    focus: [
      {
        title: "Community dialogue",
        text: "Open sessions — barazas, women's groups, school forums — where violence is named and discussed rather than left unspoken.",
      },
      {
        title: "Working with men and boys",
        text: "Lasting change needs the people with power in the household on board. We engage men, elders and boys as partners, not just as an audience.",
      },
      {
        title: "Referral pathways",
        text: "Making sure survivors, and the people they turn to first, know exactly where to find medical care, counselling, shelter and legal support.",
      },
      {
        title: "Rights awareness",
        text: "Plain-language education on what the law protects, so that women and girls know their rights and can claim them.",
      },
    ],
    outcomes: [
      "Survivors who know where to turn and feel able to go there",
      "Community leaders who speak against violence publicly",
      "Cases referred and followed up rather than quietly settled",
      "Boys growing up with a different idea of what a man is",
    ],
  },

  {
    slug: "end-fgm",
    title: "Ending FGM",
    navLabel: "Ending FGM",
    icon: "heart",
    accent: "rose",
    short:
      "Working with mothers, elders and girls themselves to end female genital mutilation — and to honour what it was meant to mark.",
    cardImageKey: "progFgm",
    wideImageKey: "wideFgm",
    heroKicker: "Programme",
    intro: [
      "Female genital mutilation is not practised out of cruelty. It persists because it is bound up with belonging, marriageability and a family's standing — which is precisely why bans alone have never been enough to end it.",
      "We work from inside that reality. The passage from girlhood to adulthood matters, and communities are right to mark it. Our aim is to separate the celebration from the cutting: to keep the blessing, the teaching and the recognition, and to leave the blade behind.",
    ],
    focus: [
      {
        title: "Alternative rites of passage",
        text: "Supporting celebrations that keep the ceremony, the elders' blessing and the teaching, without the cut.",
      },
      {
        title: "Mothers and grandmothers",
        text: "The decision usually sits with the women of the family. We create space for them to talk honestly about health, consent and what they want for their daughters.",
      },
      {
        title: "Elders and cultural leaders",
        text: "Change endures when it is declared by the people who hold cultural authority, rather than imposed from outside.",
      },
      {
        title: "Girls' clubs and mentorship",
        text: "Girls need information about their own bodies, someone safe to ask, and the confidence to say no — plus a school place worth staying for.",
      },
    ],
    outcomes: [
      "Families choosing to celebrate their daughters without cutting",
      "Girls who understand their bodies and their right to refuse",
      "Elders publicly backing alternative rites",
      "Girls staying in school through the years they are most at risk",
    ],
  },

  {
    slug: "environment",
    title: "Environmental Conservation",
    navLabel: "Environment",
    icon: "leaf",
    accent: "green",
    short:
      "Tree planting, agroforestry and water stewardship to restore land under pressure from drought and clearing.",
    cardImageKey: "progEnvironment",
    wideImageKey: "wideEnvironment",
    heroKicker: "Programme",
    intro: [
      "Rain that used to be predictable no longer is. Grazing land thins, wells run low, and the trees that once held the soil and shaded the homestead are cut for fuel and charcoal. Environmental decline here is not an abstraction — it shows up as a longer walk for water and a failed harvest.",
      "Our conservation work is deliberately practical. We plant species that give something back to the household — fruit, shade, fodder, fuel — because a tree that earns its keep is a tree that gets watered through the dry season.",
    ],
    focus: [
      {
        title: "Tree planting that lasts",
        text: "Seedlings matched to the site and the household, planted with a plan for watering and protection — survival matters more than the number in the ground.",
      },
      {
        title: "Agroforestry",
        text: "Fruit and fodder trees intercropped with food crops, so conservation and the family's income pull in the same direction.",
      },
      {
        title: "Water stewardship",
        text: "Protecting and improving access to clean water, and looking after the catchments and points that communities depend on.",
      },
      {
        title: "Schools as green anchors",
        text: "Pupils plant and tend trees on school grounds, learning stewardship in a way that follows them home.",
      },
    ],
    outcomes: [
      "Seedlings that survive their first dry season, not just their planting day",
      "Households harvesting fruit and fodder from their own plots",
      "Shorter, safer journeys to clean water",
      "A generation of pupils who treat tree cover as normal",
    ],
  },

  {
    slug: "livelihoods",
    title: "Livelihoods & Food Security",
    navLabel: "Livelihoods & Food",
    icon: "sprout",
    accent: "gold",
    short:
      "Kitchen gardens, farmer groups and school feeding, so families eat well and earn from the land they already hold.",
    cardImageKey: "progLivelihoods",
    wideImageKey: "wideLivelihoods",
    heroKicker: "Programme",
    intro: [
      "Every other part of our work depends on this one. A hungry child cannot learn, and a woman with no income of her own has far fewer options when things go wrong at home. Food and money are not a separate issue from education and safety — they are the ground those things stand on.",
      "We work with groups of neighbouring households on demonstration plots, where techniques can be tried, argued over and copied. What proves itself on the demonstration plot travels home.",
    ],
    focus: [
      {
        title: "Kitchen gardens",
        text: "Small, fenced, intensively worked vegetable plots close to the house — enough to change what is on the plate and sell the surplus.",
      },
      {
        title: "Farmer groups",
        text: "Neighbours learning together on shared demonstration plots, comparing what works and passing it on.",
      },
      {
        title: "School feeding",
        text: "A reliable meal at school, which keeps attendance up and lets children concentrate through the afternoon.",
      },
      {
        title: "Women's economic strength",
        text: "Backing women to earn and control an income of their own — the single change that most reliably improves a household's health and schooling.",
      },
    ],
    outcomes: [
      "Households eating a more varied diet through the dry months",
      "Vegetables sold at market as well as eaten at home",
      "Children fed well enough to learn",
      "Women with money of their own and a say in how it is spent",
    ],
  },
];

export const programmeBySlug = programmes.reduce((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {});

/* ─────────────────────────────────────────────────────── how we work ── */
export const approachSteps = [
  {
    number: "01",
    title: "Listen first",
    text: "We start with the community's own account of what is wrong and what has already been tried. Programmes designed in a boardroom tend to stay there.",
  },
  {
    number: "02",
    title: "Work through local structures",
    text: "Elders, head teachers, women's groups, chiefs and health workers are the people who make change stick. We build the work around them rather than beside them.",
  },
  {
    number: "03",
    title: "Tackle the practical barrier",
    text: "Convincing a family that girls should stay in school achieves little if the real obstacle is a missing uniform or a hungry afternoon. We deal with both.",
  },
  {
    number: "04",
    title: "Stay long enough to matter",
    text: "Changing what a community accepts takes years, not a project cycle. We stay, follow up, and keep showing up after the launch photographs.",
  },
];

/* ───────────────────────────────────────────────────────── field notes ──
 * Descriptive accounts of the work, written in the organisation's voice.
 * Extend these as the organisation documents more of what it does.
 */
export const fieldNotes = [
  {
    id: "library",
    kicker: "Education",
    title: "The afternoon the library filled up",
    text: "The reading room was built to give pupils somewhere to work after class. What was not anticipated was how quickly it would fill — every desk taken, the tablets shared two and three to a screen, and a queue at the shelves. For children who had never owned a book, having several hundred within reach changes what reading is for.",
    link: "/programmes/education",
    linkText: "Education & Literacy",
  },
  {
    id: "gardens",
    kicker: "Livelihoods",
    title: "What grows on the demonstration plot",
    text: "A fenced plot of maize intercropped with vegetables and young fruit trees does more teaching than any handout. Neighbours walk the rows, argue about spacing and watering, and go home to try it. The plot's real yield is the dozens of gardens that appear around it in the months afterwards.",
    link: "/programmes/livelihoods",
    linkText: "Livelihoods & Food Security",
  },
  {
    id: "dialogue",
    kicker: "Community",
    title: "Meetings held under the tree",
    text: "Some of the most important work happens with plastic chairs arranged in the shade — women's groups, school committees and elders talking through subjects that are not usually raised in public. Progress on violence and on cutting is measured in what people become willing to say out loud, and to whom.",
    link: "/programmes/gender-based-violence",
    linkText: "Ending Gender Based Violence",
  },
];

/* ──────────────────────────────────────────────────────── testimonials ──
 * ⚠ PLACEHOLDER — these quotes are illustrative examples, NOT real statements
 *   from real people. Replace them with quotes gathered and consented to by
 *   the speaker, or delete this array to hide the section entirely.
 */
export const testimonials = [
  {
    quote:
      "My daughter reads to me in the evening now. I never went to school myself, so to sit and be read to by my own child is something I did not expect in my life.",
    role: "Parent, primary school community",
  },
  {
    quote:
      "Before, if something happened in the home, you kept it inside the home. Now we know there is somewhere to go, and people who will listen without blaming you.",
    role: "Member, women's group",
  },
  {
    quote:
      "The children ask for the library on days it is closed. That tells you everything about what it has done for reading in this school.",
    role: "Teacher, partner school",
  },
  {
    quote:
      "We planted the fruit trees between the maize. Now there is something to harvest and something to sell, from the same piece of land.",
    role: "Member, farmer group",
  },
];

/* ──────────────────────────────────────────────────────── activities ── */
export const activityTypes = [
  {
    icon: "users",
    title: "Community dialogues",
    text: "Open barazas and women's group sessions on violence, cutting, health and children's schooling — held wherever people already gather.",
  },
  {
    icon: "book",
    title: "Library open days",
    text: "Reading sessions, book borrowing and tablet time for pupils, with the room opened up to parents and out-of-school youth.",
  },
  {
    icon: "leaf",
    title: "Tree planting days",
    text: "Seasonal planting at schools and homesteads, timed to the rains and followed up through the dry months.",
  },
  {
    icon: "sprout",
    title: "Farmer field days",
    text: "Demonstration plot walk-throughs where households compare methods, seeds and results with their neighbours.",
  },
  {
    icon: "heart",
    title: "Dignity and health outreach",
    text: "Distribution of sanitary and hygiene supplies, paired with health talks for girls and their mothers.",
  },
  {
    icon: "award",
    title: "Handovers and celebrations",
    text: "Marking completed projects with the community — because recognising what has been achieved together is part of the work.",
  },
];

/**
 * Dated events. Left empty on purpose: an empty diary is honest, while invented
 * dates are not. Add entries as { title, date, location, text } and the
 * Events page will render them automatically in place of the empty state.
 */
export const upcomingEvents = [];

/* ─────────────────────────────────────────────────────── get involved ── */
export const involvementOptions = [
  {
    icon: "heart",
    title: "Give",
    text: "Contributions go to the things that keep programmes running: books and shelving, seedlings and fencing, sanitary supplies, transport to reach outlying homesteads.",
    action: "Talk to us about giving",
  },
  {
    icon: "users",
    title: "Volunteer",
    text: "Reading helpers, mentors for girls' clubs, trainers in agriculture or health, and people who can help with records, photography and reporting.",
    action: "Offer your time",
  },
  {
    icon: "handshake",
    title: "Partner",
    text: "We work with schools, health facilities, county offices, faith groups and other organisations. If your work overlaps with ours, let us find the join.",
    action: "Start a conversation",
  },
  {
    icon: "megaphone",
    title: "Spread the word",
    text: "Share the work with people who care about girls' education, an end to cutting, or the state of the land. Attention brings support with it.",
    action: "Share our work",
  },
];

/* ─────────────────────────────────────────────────────────────── faqs ── */
export const faqs = [
  {
    q: "What does “ENGAPE POST” do?",
    a: "We are a community based organisation working alongside rural and pastoralist communities on education and literacy, gender based violence, the eradication of FGM, environmental conservation, and household food security.",
  },
  {
    q: "Are you a registered organisation?",
    a: "Yes. Registration details are available on request — please get in touch and we will share the current documentation.",
  },
  {
    q: "How can I be sure a donation is used well?",
    a: "Ask us. We are happy to explain what a contribution funds, and to account for it afterwards. If you would like to support a specific programme, say so and we will keep it separate.",
  },
  {
    q: "Can I visit the projects?",
    a: "Visits are welcome, but they need arranging in advance and with the community's agreement — particularly anywhere children are involved. Please contact us before making travel plans.",
  },
  {
    q: "Do you take volunteers from outside the community?",
    a: "Sometimes, where there is a genuine skills gap we cannot fill locally. Our first preference is always to build capacity within the community itself.",
  },
];

/* ──────────────────────────────────────────────────────────── gallery ──
 * Files are generated into public/gallery/{thumbs,full}/<category>-<nn>.jpg.
 * Captions describe what is visible in each photograph.
 */
export const galleryCategories = [
  { id: "all", label: "All photographs" },
  { id: "education", label: "Education & Library" },
  { id: "schools", label: "Schools & Outreach" },
  { id: "environment", label: "Environment & Food" },
  { id: "health", label: "Health & Dignity" },
  { id: "community", label: "Community" },
  { id: "milestones", label: "Milestones" },
];

const galleryCaptions = {
  education: [
    "Students share a tablet between the shelves of the community library",
    "Reading and digital learning side by side in the library",
    "A full house at afternoon reading time",
    "Pupils settle in with books at the reading desks",
    "A librarian helps pupils get started on a tablet",
    "Working through a lesson on a shared device",
    "Quiet reading in the afternoon",
    "Older pupils compare notes over a story book",
    "Following the text line by line",
    "A teacher checks in on a reading group",
    "Choosing the next book from the shelves",
    "Browsing the reference shelves",
  ],
  milestones: [
    "Cutting the ribbon on the new community library",
    "Guests gather for the library opening",
    "A sheep presented in welcome, following local custom",
    "Handing over a gift at the opening ceremony",
    "The team at the library handover",
    "Presenting a certificate of appreciation",
    "A community member receives a certificate",
    "A token of appreciation on opening day",
    "First look inside the finished library",
    "Community members tour the new shelves",
  ],
  community: [
    "A community baraza held under the trees",
    "A learning session in the shade",
    "Elders lead a gathering at the school",
    "Young children at an early years session",
    "Gathered for a community day",
    "Collecting clean water in the schoolyard",
  ],
  environment: [
    "Pupils gather to plant a tree seedling",
    "Inspecting a young avocado tree between rows of maize",
    "Farmers walk the demonstration plot",
    "A group tours the intercropped garden",
    "Discussing what grows well in the season",
    "Members meet at the fenced kitchen garden",
    "Checking the growth of a young fruit tree",
    "Standing among the maize at the demonstration farm",
    "Neat rows in the fenced kitchen garden",
    "Tending the vegetable beds",
  ],
  health: [
    "Pupils receive dignity and hygiene packs",
    "Sanitary and hygiene supplies handed out at school",
    "A hot meal served under the trees",
    "Children carry home their supplies",
    "Lunch served at the school feeding programme",
    "Pupils thank the supporters of a water project",
  ],
  schools: [
    "A session in the school assembly hall",
    "A full hall of pupils during a school visit",
    "Hands up during a session in the school hall",
    "Pupils show off newly donated story books",
    "Pupils gather outside the school block",
    "Uniforms and supplies laid out for distribution",
    "Pupils crowd in for a photograph",
    "Waving from the schoolyard",
    "Tablets light up a darkened classroom",
    "Backpacks and supplies arrive at school",
  ],
};

const pad = (n) => String(n).padStart(2, "0");

/**
 * Gallery items carry an ID, not a URL. The <CdnImage> in the grid asks for a
 * square crop of it and the lightbox asks for a large one — both derived from
 * the single photograph uploaded under engape/gallery/<id>.
 *
 * A caption with no matching photograph is dropped rather than rendered as a
 * gap in the grid, so adding a caption before running `npm run images:upload`
 * cannot break the page.
 */
export const galleryItems = Object.entries(galleryCaptions)
  .flatMap(([category, captions]) =>
    captions.map((caption, i) => ({
      id: `${category}-${pad(i + 1)}`,
      category,
      caption,
    }))
  )
  .filter((item) => {
    if (assets[item.id]) return true;
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[gallery] No photograph uploaded for "${item.id}" — item hidden. ` +
          `Run \`npm run images:upload\`.`
      );
    }
    return false;
  });
