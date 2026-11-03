import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { SiteMenuSheet } from "@/components/SiteMenuSheet";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "America.gov — Chat" },
      { name: "description", content: "Official government information and services answers." },
      { property: "og:title", content: "America.gov Chat" },
      { property: "og:description", content: "Official government answers." },
    ],
  }),
  component: ChatPage,
});

interface SourceLink {
  title: string;
  url: string;
  note?: string;
}

interface DomainGroupedSource {
  domain: string;
  count: number;
  badgeType?:
    | "eac"
    | "gpo"
    | "state"
    | "usa"
    | "omb"
    | "state_flag"
    | "doi"
    | "va"
    | "ssa"
    | "commerce"
    | "default";
  links: SourceLink[];
}

interface Source {
  title: string;
  domain: string;
  note: string;
  url: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: Source[];
  groupedSources?: DomainGroupedSource[];
  followUps?: string[];
  liked?: boolean;
  disliked?: boolean;
}

function AgencyBadge({ badgeType, domain }: { badgeType?: string; domain: string }) {
  if (badgeType === "gpo" || domain.includes("govinfo") || domain.includes("gpo")) {
    return (
      <div className="size-10 rounded-full bg-[#36526e] border border-white/10 flex items-center justify-center font-bold text-white text-[12px] tracking-wide shrink-0 shadow-xs select-none">
        GPO
      </div>
    );
  }
  if (badgeType === "state_flag" || domain === "in.gov") {
    return (
      <div className="size-10 rounded-full bg-[#001f4d] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
        <svg className="size-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L13.5 5.5L17.5 6L14.5 9L15.5 13L12 11L8.5 13L9.5 9L6.5 6L10.5 5.5L12 2Z" />
          <circle cx="12" cy="18" r="3" fill="#fbbf24" />
        </svg>
      </div>
    );
  }
  if (
    badgeType === "doi" ||
    domain.includes("nps.gov") ||
    domain.includes("recreation.gov") ||
    domain.includes("doi.gov")
  ) {
    return (
      <img
        src="/site-assets/6b0e58ea2470c358-c45111fe79f447f74baa0a959314adb0.png"
        alt=""
        className="size-10 rounded-full object-contain p-0.5 bg-white/5 border border-white/10 shrink-0"
      />
    );
  }
  if (badgeType === "commerce" || domain.includes("commerce.gov")) {
    return (
      <img
        src="/site-assets/f8771bab4355a2c8-bbad8e97f6ed9607bb4b97ed05f21110.png"
        alt=""
        className="size-10 rounded-full object-contain p-0.5 bg-white/5 border border-white/10 shrink-0"
      />
    );
  }
  // Default official U.S. seal (Department of State / EAC / Great Seal)
  return (
    <img
      src="/site-assets/ac9ec418e5b87762-f595254bb5ee2630436109fee6101659.png"
      alt=""
      className="size-10 rounded-full object-contain p-0.5 bg-white/5 border border-white/10 shrink-0"
    />
  );
}

function getGroupedSources(message: ChatMessage): DomainGroupedSource[] {
  if (message.groupedSources && message.groupedSources.length > 0) {
    return message.groupedSources;
  }
  if (!message.sources || message.sources.length === 0) {
    return [];
  }

  const map = new Map<string, SourceLink[]>();
  for (const s of message.sources) {
    const list = map.get(s.domain) || [];
    list.push({ title: s.title, url: s.url, note: s.note });
    map.set(s.domain, list);
  }

  const result: DomainGroupedSource[] = [];
  for (const [domain, links] of map.entries()) {
    let badgeType: DomainGroupedSource["badgeType"] = "default";
    if (domain.includes("eac.gov") || domain.includes("vote.gov")) badgeType = "eac";
    else if (domain.includes("govinfo") || domain.includes("gpo")) badgeType = "gpo";
    else if (domain.includes("state.gov") || domain.includes("usembassy")) badgeType = "state";
    else if (domain.includes("usa.gov")) badgeType = "usa";
    else if (domain.includes("reginfo.gov") || domain.includes("whitehouse.gov")) badgeType = "omb";
    else if (domain.includes("in.gov") || domain.endsWith(".state.gov")) badgeType = "state_flag";
    else if (
      domain.includes("nps.gov") ||
      domain.includes("recreation.gov") ||
      domain.includes("doi.gov")
    )
      badgeType = "doi";
    else if (domain.includes("va.gov")) badgeType = "va";
    else if (domain.includes("ssa.gov")) badgeType = "ssa";
    else if (domain.includes("commerce.gov")) badgeType = "commerce";

    result.push({
      domain,
      count: links.length,
      badgeType,
      links,
    });
  }
  return result;
}

function getAnswerForQuery(q: string): {
  text: string;
  sources?: Source[];
  groupedSources?: DomainGroupedSource[];
  followUps?: string[];
} {
  const lower = q.toLowerCase().trim();

  // Greeting
  if (
    lower === "hi" ||
    lower === "hello" ||
    lower === "hey" ||
    lower === "hi there" ||
    lower === "good morning" ||
    lower === "good afternoon"
  ) {
    return {
      text: "Hello. I'm America, here to help with official U.S. government information and services.\n\nWhat can I help you with today?",
      followUps: [
        "How do I replace my social security card?",
        "I'm a veteran. How do I get care?",
        "When do I qualify for Medicare?",
        "What are some Library of Congress resources for the Civil War?",
      ],
    };
  }

  // Voting / Elections (matching user's screenshot image_6535607e.png & image_0b4bf07a.png)
  if (
    lower.includes("vote") ||
    lower.includes("voting") ||
    lower.includes("ballot") ||
    lower.includes("election") ||
    lower.includes("register") ||
    lower.includes("eac")
  ) {
    return {
      text: `• If your name is not on the list or ID is an issue: You should be offered a provisional ballot.

If your eligibility is in question at the polls, federal law requires that you be offered a provisional ballot.

Voting from outside the United States

U.S. citizens abroad can register and request a ballot with the Federal Post Card Application (FPCA) through the Federal Voting Assistance Program (FVAP) at FVAP.gov ↗.

More official help
• USA.gov: how to register ↗
• U.S. Election Assistance Commission (EAC) ↗

If you tell me your state, I can point you to that state's registration and voting pages.`,
      sources: [
        {
          title: "Register to vote in your state or territory",
          domain: "vote.gov",
          note: "Official voter registration",
          url: "https://vote.gov",
        },
        {
          title: "National Mail Voter Registration Form",
          domain: "eac.gov",
          note: "EAC official forms",
          url: "https://www.eac.gov/voters/national-mail-voter-registration-form",
        },
        {
          title: "Help America Vote Act (HAVA) - 52 U.S.C.",
          domain: "govinfo.gov",
          note: "Federal statutory code",
          url: "https://www.govinfo.gov/app/details/PLAW-107publ252",
        },
        {
          title: "Voting assistance for Americans abroad (FVAP)",
          domain: "usembassy.gov",
          note: "Department of State consular guidance",
          url: "https://www.fvap.gov",
        },
        {
          title: "How to register to vote & election requirements",
          domain: "usa.gov",
          note: "USA.gov elections guide",
          url: "https://www.usa.gov/register-to-vote",
        },
        {
          title: "EAC Information Collection Review",
          domain: "reginfo.gov",
          note: "Office of Information and Regulatory Affairs",
          url: "https://www.reginfo.gov",
        },
        {
          title: "Indiana Voter Portal - Status & Polling Place",
          domain: "in.gov",
          note: "State election division portal",
          url: "https://indianavoters.in.gov",
        },
      ],
      groupedSources: [
        {
          domain: "vote.gov",
          badgeType: "eac",
          count: 5,
          links: [
            {
              title: "Register to vote in your state or territory",
              url: "https://vote.gov",
              note: "Official voter registration",
            },
            {
              title: "Voter registration deadlines by state",
              url: "https://vote.gov/register-to-vote/deadlines",
              note: "Calendar & cutoff dates",
            },
            {
              title: "Voting rights and disability access",
              url: "https://vote.gov/accessibility",
              note: "Accessibility rights",
            },
            {
              title: "Update your voter registration address",
              url: "https://vote.gov/update-voter-registration",
              note: "Address change instructions",
            },
            {
              title: "College student voter registration guide",
              url: "https://vote.gov/guide-to-voting/college-student",
              note: "Residency & student rules",
            },
          ],
        },
        {
          domain: "eac.gov",
          badgeType: "eac",
          count: 7,
          links: [
            {
              title: "National Mail Voter Registration Form",
              url: "https://www.eac.gov/voters/national-mail-voter-registration-form",
              note: "Download PDF in 21 languages",
            },
            {
              title: "Voting Accessibility and Accommodations",
              url: "https://www.eac.gov/voters/voting-accessibility",
              note: "Federal access guidelines",
            },
            {
              title: "State-by-State Voting Guidelines",
              url: "https://www.eac.gov/voters/register-and-vote-in-your-state",
              note: "Election dates & laws",
            },
            {
              title: "Help America Vote Act (HAVA) Requirements",
              url: "https://www.eac.gov/about/help-america-vote-act",
              note: "Statutory standards",
            },
            {
              title: "Provisional Ballots Guidelines",
              url: "https://www.eac.gov/voters/provisional-voting",
              note: "Rights at polling stations",
            },
            {
              title: "Election Administration and Voting Survey (EAVS)",
              url: "https://www.eac.gov/research-and-data/studies-and-reports",
              note: "Official nationwide data",
            },
            {
              title: "Military and Overseas Citizens Voting",
              url: "https://www.eac.gov/voters/military-and-overseas-voters",
              note: "UOCAVA guidelines",
            },
          ],
        },
        {
          domain: "govinfo.gov",
          badgeType: "gpo",
          count: 2,
          links: [
            {
              title: "Help America Vote Act of 2002 (Pub.L. 107-252)",
              url: "https://www.govinfo.gov/app/details/PLAW-107publ252",
              note: "Full legislative text",
            },
            {
              title: "Title 52 - Voting and Elections - United States Code",
              url: "https://www.govinfo.gov/app/details/USCODE-2022-title52",
              note: "Codified federal law",
            },
          ],
        },
        {
          domain: "usembassy.gov",
          badgeType: "state",
          count: 2,
          links: [
            {
              title: "Voting Assistance for Americans Residing Abroad",
              url: "https://travel.state.gov/content/travel/en/international-travel/while-abroad/voting.html",
              note: "Embassy consular guidance",
            },
            {
              title: "Federal Post Card Application (FPCA) Submission",
              url: "https://www.fvap.gov/citizen-voter",
              note: "Ballot request procedure",
            },
          ],
        },
        {
          domain: "usa.gov",
          badgeType: "usa",
          count: 3,
          links: [
            {
              title: "How to Register to Vote - Official Government Guide",
              url: "https://www.usa.gov/register-to-vote",
              note: "Step-by-step registration",
            },
            {
              title: "Find Your Polling Place and Election Day Info",
              url: "https://www.usa.gov/how-to-vote",
              note: "Official polling locator",
            },
            {
              title: "Voter ID Requirements Across 50 States",
              url: "https://www.usa.gov/voter-id",
              note: "Acceptable identification list",
            },
          ],
        },
        {
          domain: "reginfo.gov",
          badgeType: "omb",
          count: 1,
          links: [
            {
              title: "EAC Information Collection - National Mail Voter Registration Form",
              url: "https://www.reginfo.gov/public/do/PRAMain",
              note: "OIRA regulatory review",
            },
          ],
        },
        {
          domain: "in.gov",
          badgeType: "state_flag",
          count: 1,
          links: [
            {
              title: "Indiana Voter Portal - Check Status & Polling Place",
              url: "https://indianavoters.in.gov",
              note: "State election division portal",
            },
          ],
        },
      ],
      followUps: [
        "What are the voter ID requirements in my state?",
        "How do I vote absentee or by mail?",
      ],
    };
  }

  // Veteran care
  if (
    lower.includes("veteran") ||
    lower.includes("va") ||
    (lower.includes("care") && lower.includes("get"))
  ) {
    return {
      text: `As a veteran, you can apply for VA health care online, by phone, or by mail.

Here's the short version:
• Check eligibility — Served on active duty and received any discharge status other than dishonorable.
• Apply online at va.gov/health-care/apply — The application takes about 15 minutes.
• Determination letter — The VA assigns a priority group and mails your decision within a few weeks.

Many veterans receive full enrollment with zero copays depending on service history and income.`,
      sources: [
        {
          title: "Apply for VA health care",
          domain: "va.gov",
          note: "Official application",
          url: "https://www.va.gov/health-care/apply/",
        },
        {
          title: "VA health benefits overview",
          domain: "va.gov",
          note: "Eligibility & priority groups",
          url: "https://www.va.gov/health-care/about-va-health-benefits/",
        },
        {
          title: "Veterans' health care records",
          domain: "usa.gov",
          note: "Government-wide guide",
          url: "https://www.usa.gov/veterans-health-care",
        },
      ],
      groupedSources: [
        {
          domain: "va.gov",
          badgeType: "va",
          count: 3,
          links: [
            {
              title: "Apply for VA health care online",
              url: "https://www.va.gov/health-care/apply/",
              note: "Standard 10-10EZ electronic application",
            },
            {
              title: "VA health benefits & priority groups overview",
              url: "https://www.va.gov/health-care/about-va-health-benefits/",
              note: "Eligibility requirements & cost tiers",
            },
            {
              title: "Locate VA health centers, hospitals, and clinics",
              url: "https://www.va.gov/find-locations/",
              note: "Nationwide VA medical facilities directory",
            },
          ],
        },
        {
          domain: "usa.gov",
          badgeType: "usa",
          count: 2,
          links: [
            {
              title: "Veterans' health care records and assistance",
              url: "https://www.usa.gov/veterans-health-care",
              note: "Federal government cross-agency portal",
            },
            {
              title: "Military service records and DD Form 214 requests",
              url: "https://www.archives.gov/veterans/military-service-records",
              note: "National Archives record verification",
            },
          ],
        },
      ],
      followUps: [
        "What documents do I need to apply?",
        "Will I pay copays?",
        "How do I replace my social security card?",
      ],
    };
  }

  // Social Security card
  if (lower.includes("social security") || (lower.includes("replace") && lower.includes("card"))) {
    return {
      text: `You can replace a lost or stolen Social Security card for free — never pay a third party for this service.

How to request a replacement:
• Personal my Social Security account — Log in or register at ssa.gov.
• Online request — In most states, the replacement card arrives by mail in 10–14 business days.
• In-person office visit — If your state does not support online filing, bring proof of identity to your local SSA office.

You are limited to three replacement cards per calendar year and ten in a lifetime.`,
      sources: [
        {
          title: "Replace your Social Security card",
          domain: "ssa.gov",
          note: "Step-by-step application",
          url: "https://www.ssa.gov/number-card/replace-card",
        },
        {
          title: "Get or replace a card",
          domain: "ssa.gov",
          note: "Required documents",
          url: "https://www.ssa.gov/ssnumber/",
        },
        {
          title: "Social Security cards",
          domain: "usa.gov",
          note: "Official government guide",
          url: "https://www.usa.gov/social-security-card",
        },
      ],
      groupedSources: [
        {
          domain: "ssa.gov",
          badgeType: "ssa",
          count: 3,
          links: [
            {
              title: "Replace your Social Security card",
              url: "https://www.ssa.gov/number-card/replace-card",
              note: "Online application through my Social Security",
            },
            {
              title: "Required identity documents for SSA card",
              url: "https://www.ssa.gov/ssnumber/",
              note: "Acceptable proof of identity and citizenship",
            },
            {
              title: "Find your local Social Security field office",
              url: "https://secure.ssa.gov/ICON/main.jsp",
              note: "Field office locator and appointment booking",
            },
          ],
        },
        {
          domain: "usa.gov",
          badgeType: "usa",
          count: 2,
          links: [
            {
              title: "Social Security cards and official records",
              url: "https://www.usa.gov/social-security-card",
              note: "Official guidance and fraud prevention warnings",
            },
            {
              title: "Report stolen Social Security identity and cards",
              url: "https://www.identitytheft.gov",
              note: "FTC Identity Theft reporting portal",
            },
          ],
        },
      ],
      followUps: [
        "I'm a veteran. How do I get care?",
        "When do I qualify for Medicare?",
        "How do I book a campsite in a national park?",
      ],
    };
  }

  // National park campsite
  if (
    lower.includes("campsite") ||
    lower.includes("park") ||
    lower.includes("camp") ||
    lower.includes("recreation")
  ) {
    return {
      text: `Campsite reservations for federal lands and national parks are managed through Recreation.gov — the official reservation system.

Quick booking steps:
• Search recreation.gov for your desired national park or campground.
• Release windows — Major parks (Yosemite, Yellowstone, Zion, Glacier) open rolling reservations 5 to 6 months in advance.
• Digital pass — Pay the reservation fee and store your confirmation pass on your phone before arrival.

First-come, first-served campsites remain available at select locations — arrive early morning to secure a site.`,
      sources: [
        {
          title: "Find a campsite",
          domain: "recreation.gov",
          note: "Official booking platform",
          url: "https://www.recreation.gov",
        },
        {
          title: "Plan your visit",
          domain: "nps.gov",
          note: "National Park Service",
          url: "https://www.nps.gov/findapark/index.htm",
        },
        {
          title: "National park passes",
          domain: "usa.gov",
          note: "Passes & entry fees",
          url: "https://www.usa.gov/national-park-passes",
        },
      ],
      groupedSources: [
        {
          domain: "recreation.gov",
          badgeType: "doi",
          count: 3,
          links: [
            {
              title: "Explore Federal Campsites & Permits",
              url: "https://www.recreation.gov",
              note: "Official booking & lottery reservations",
            },
            {
              title: "Permit & Wilderness Camping Calendars",
              url: "https://www.recreation.gov/permits",
              note: "High-demand wilderness release dates",
            },
            {
              title: "Recreation.gov Mobile Digital Passes",
              url: "https://www.recreation.gov/mobile-app",
              note: "Offline gate ticket storage",
            },
          ],
        },
        {
          domain: "nps.gov",
          badgeType: "doi",
          count: 3,
          links: [
            {
              title: "National Park Service Park Finder",
              url: "https://www.nps.gov/findapark/index.htm",
              note: "All 420+ national park units and alerts",
            },
            {
              title: "Campground Regulations & Food Storage",
              url: "https://www.nps.gov/subjects/camping/index.htm",
              note: "Bear canister and firewood quarantine rules",
            },
            {
              title: "America the Beautiful Interagency Pass",
              url: "https://www.nps.gov/planyourvisit/passes.htm",
              note: "Annual, senior, military, and access passes",
            },
          ],
        },
      ],
      followUps: [
        "How do I get an America the Beautiful pass?",
        "How do I replace my social security card?",
        "Help me find a new job",
      ],
    };
  }

  // Medicare
  if (
    lower.includes("medicare") ||
    lower.includes("65") ||
    lower.includes("part a") ||
    lower.includes("part b")
  ) {
    return {
      text: `Most individuals become eligible for Medicare at age 65, even if they remain actively employed.

Key guidelines:
• Initial Enrollment Period — A 7-month window starting 3 months before your 65th birthday month.
• Part A and Part B — Sign up during this period to avoid late-enrollment penalties.
• Automatic enrollment — If you already collect Social Security retirement benefits, you are automatically enrolled.

Under 65? You may qualify earlier through SSDI or conditions such as ALS or ESRD.`,
      sources: [
        {
          title: "Medicare eligibility & enrollment",
          domain: "medicare.gov",
          note: "Official Medicare portal",
          url: "https://www.medicare.gov/basics/get-started-with-medicare",
        },
        {
          title: "Apply for Medicare",
          domain: "ssa.gov",
          note: "Social Security Administration",
          url: "https://www.ssa.gov/medicare",
        },
        {
          title: "Medicare benefits overview",
          domain: "usa.gov",
          note: "Government-wide guide",
          url: "https://www.usa.gov/medicare",
        },
      ],
      groupedSources: [
        {
          domain: "medicare.gov",
          badgeType: "usa",
          count: 3,
          links: [
            {
              title: "Get started with Medicare",
              url: "https://www.medicare.gov/basics/get-started-with-medicare",
              note: "Official CMS enrollment portal",
            },
            {
              title: "Part A and Part B coverage & costs",
              url: "https://www.medicare.gov/your-medicare-costs",
              note: "Standard premiums and deductibles",
            },
            {
              title: "Compare Medicare Advantage and drug plans",
              url: "https://www.medicare.gov/plan-compare/",
              note: "Annual election period plan tool",
            },
          ],
        },
        {
          domain: "ssa.gov",
          badgeType: "ssa",
          count: 2,
          links: [
            {
              title: "Apply for Medicare online",
              url: "https://www.ssa.gov/medicare",
              note: "Social Security Administration filing",
            },
            {
              title: "Extra Help with Medicare prescription drug plan costs",
              url: "https://www.ssa.gov/medicare/part-d-extra-help",
              note: "Low-income subsidy qualification",
            },
          ],
        },
      ],
      followUps: [
        "What does Part B cost?",
        "I'm a veteran. How do I get care?",
        "How do I replace my social security card?",
      ],
    };
  }

  // Passport
  if (lower.includes("passport")) {
    return {
      text: `To apply for or renew a U.S. passport, use the official U.S. Department of State portal:

• Adult renewals — Eligible adults can renew online or by mail using Form DS-82.
• First-time applicants & children under 16 — Must apply in person at an authorized passport acceptance facility (post office or clerk of court) with Form DS-11.
• Minors under 16 — Both parents or legal guardians must appear in person or provide notarized consent (Form DS-3053).
• Processing times — Standard processing takes 6 to 8 weeks; expedited service is 2 to 3 weeks for an additional fee.`,
      sources: [
        {
          title: "U.S. Passports",
          domain: "travel.state.gov",
          note: "Department of State",
          url: "https://travel.state.gov/content/travel/en/passports.html",
        },
        {
          title: "Passports for children under 16",
          domain: "travel.state.gov",
          note: "Child requirements",
          url: "https://travel.state.gov/content/travel/en/passports/need-passport/under-16.html",
        },
        {
          title: "Get a U.S. passport",
          domain: "usa.gov",
          note: "Official overview",
          url: "https://www.usa.gov/passport",
        },
      ],
      groupedSources: [
        {
          domain: "travel.state.gov",
          badgeType: "state",
          count: 3,
          links: [
            {
              title: "Official U.S. Passports & International Travel Portal",
              url: "https://travel.state.gov/content/travel/en/passports.html",
              note: "Department of State official system",
            },
            {
              title: "Renew adult passport online (Form DS-82)",
              url: "https://travel.state.gov/content/travel/en/passports/have-passport/renew.html",
              note: "Direct digital renewal process",
            },
            {
              title: "Find a local passport acceptance facility",
              url: "https://iafdb.travel.state.gov/",
              note: "Post offices and county court facilities",
            },
          ],
        },
        {
          domain: "usa.gov",
          badgeType: "usa",
          count: 2,
          links: [
            {
              title: "How to get or renew a U.S. passport",
              url: "https://www.usa.gov/passport",
              note: "Step-by-step citizen overview",
            },
            {
              title: "Urgent travel and expedited passport appointments",
              url: "https://travel.state.gov/content/travel/en/passports/get-fast.html",
              note: "14-day international travel emergencies",
            },
          ],
        },
      ],
      followUps: [
        "What documents do I need for my child's passport?",
        "How long does passport renewal take?",
        "How do I replace my social security card?",
      ],
    };
  }

  // Address update with USPS
  if (lower.includes("usps") || (lower.includes("address") && lower.includes("update"))) {
    return {
      text: `To change your address with the United States Postal Service (USPS), use the official Movers Guide online at usps.com:

• Official site only — Always verify you are on moversguide.usps.com. The official USPS change-of-address fee is only $1.10 for identity verification. Never pay $40–$80 on unauthorized third-party lookalike sites.
• Forwarding duration — Standard mail forwarding lasts for 12 months for First-Class mail and 60 days for periodicals.
• In-person option — You can also pick up a free Mover's Guide packet (Form PS 3575) at any local post office.`,
      sources: [
        {
          title: "Official USPS Change of Address",
          domain: "usps.com",
          note: "Official Movers Guide",
          url: "https://moversguide.usps.com",
        },
        {
          title: "Change your address with government agencies",
          domain: "usa.gov",
          note: "Government-wide address guide",
          url: "https://www.usa.gov/change-of-address",
        },
      ],
      groupedSources: [
        {
          domain: "usps.com",
          badgeType: "default",
          count: 2,
          links: [
            {
              title: "Official USPS Change of Address (Mover's Guide)",
              url: "https://moversguide.usps.com",
              note: "Official USPS identity verification",
            },
            {
              title: "Hold Mail and Premium Forwarding Service",
              url: "https://www.usps.com/manage/forward.htm",
              note: "Temporary and residential options",
            },
          ],
        },
        {
          domain: "usa.gov",
          badgeType: "usa",
          count: 2,
          links: [
            {
              title: "Update your address across federal and state agencies",
              url: "https://www.usa.gov/change-of-address",
              note: "IRS, SSA, VA, and DMV guidance",
            },
            {
              title: "Update voter registration after moving",
              url: "https://vote.gov/update-voter-registration",
              note: "State voting registration update",
            },
          ],
        },
      ],
      followUps: [
        "How do I notify the IRS and SSA about moving?",
        "How do I update my voter registration?",
        "How do I replace my social security card?",
      ],
    };
  }

  // American History
  if (
    lower.includes("history") ||
    lower.includes("timeline") ||
    lower.includes("archives") ||
    lower.includes("congress") ||
    lower.includes("civil war") ||
    lower.includes("revolution") ||
    lower.includes("constitution") ||
    lower.includes("colonial")
  ) {
    return {
      text: `• U.S. History Primary Source Timeline ↗ — Library of Congress (LOC) classroom materials, by era
• America's Historical Documents ↗ — National Archives, including the Declaration of Independence
• National Museum of American History ↗ — Smithsonian Institution collections and exhibits

Broad eras (from the LOC timeline)
• Colonial settlement (1600s–1763) — English colonies such as Jamestown (1606–1610) and later Georgia
• Independence and a new nation — After independence, government under the Articles of Confederation, then the Constitution, with George Washington as the first President
• Later 19th century (for example 1876–1900) — Westward expansion, immigration, cities, railroads, and industrial work

The National Archives holds federal records. The Library of Congress collects books, newspapers, manuscripts, and digital materials on American history. The Smithsonian holds objects and archives on American life, science, and culture.

If you want a specific period (Revolution, Civil War, World War II), a document, or a museum visit, say which one.`,
      sources: [
        {
          title: "Library of Congress Classroom Materials",
          domain: "loc.gov",
          note: "Primary Source Timeline",
          url: "https://www.loc.gov/classroom-materials/united-states-history-primary-source-timeline/",
        },
        {
          title: "National Archives Historical Documents",
          domain: "archives.gov",
          note: "Charters of Freedom",
          url: "https://www.archives.gov/historical-docs",
        },
        {
          title: "Smithsonian National Museum of American History",
          domain: "americanhistory.si.edu",
          note: "Exhibitions & Collections",
          url: "https://americanhistory.si.edu",
        },
      ],
      groupedSources: [
        {
          domain: "loc.gov",
          badgeType: "default",
          count: 3,
          links: [
            {
              title: "United States History Primary Source Timeline",
              url: "https://www.loc.gov/classroom-materials/united-states-history-primary-source-timeline/",
              note: "Library of Congress historical eras",
            },
            {
              title: "Civil War Maps and Photographs Collection",
              url: "https://www.loc.gov/collections/civil-war-maps/",
              note: "Primary archival records",
            },
            {
              title: "Chronicling America - Historical American Newspapers",
              url: "https://chroniclingamerica.loc.gov/",
              note: "National Digital Newspaper Program",
            },
          ],
        },
        {
          domain: "archives.gov",
          badgeType: "default",
          count: 3,
          links: [
            {
              title: "America's Founding Documents - Charters of Freedom",
              url: "https://www.archives.gov/founding-docs",
              note: "Declaration, Constitution, Bill of Rights",
            },
            {
              title: "National Archives Research & Catalog",
              url: "https://catalog.archives.gov/",
              note: "Search federal records",
            },
            {
              title: "Presidential Libraries and Historical Collections",
              url: "https://www.archives.gov/presidential-libraries",
              note: "Historic administration records",
            },
          ],
        },
      ],
      followUps: [
        "What are some Library of Congress resources for the Civil War?",
        "How do I view original documents at the National Archives?",
      ],
    };
  }

  // Default answer
  return {
    text: `Here is the official government guidance regarding "${q}":

• Official Sources — U.S. federal programs and information are administered directly through verified .gov domains.
• Direct Access — You can complete filings, check eligibility, and access benefits directly without third-party processing charges.
• Privacy & Security — Federal agencies will never request passwords or banking information via unencrypted communications.

For personalized program details, specify the department or service you need.`,
    sources: [
      {
        title: "USA.gov Government Services",
        domain: "usa.gov",
        note: "Official portal",
        url: "https://www.usa.gov",
      },
      {
        title: "Federal Agency Directory",
        domain: "usa.gov",
        note: "A-Z Agency List",
        url: "https://www.usa.gov/agency-index",
      },
    ],
    groupedSources: [
      {
        domain: "usa.gov",
        badgeType: "usa",
        count: 2,
        links: [
          {
            title: "USA.gov - Official Guide to Government Information & Services",
            url: "https://www.usa.gov",
            note: "Single portal to all federal programs",
          },
          {
            title: "A-Z Index of U.S. Government Departments and Agencies",
            url: "https://www.usa.gov/agency-index",
            note: "Comprehensive federal contact directory",
          },
        ],
      },
    ],
    followUps: [
      "How do I replace my social security card?",
      "I'm a veteran. How do I get care?",
      "When do I qualify for Medicare?",
    ],
  };
}

// Initial conversation matching user's screenshot
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "init-user",
    sender: "user",
    text: "hi",
  },
  {
    id: "init-bot",
    sender: "bot",
    text: "Hello. I'm America, here to help with official U.S. government information and services.\n\nWhat can I help you with today?",
    followUps: [
      "How do I replace my social security card?",
      "I'm a veteran. How do I get care?",
      "When do I qualify for Medicare?",
      "What are some Library of Congress resources for the Civil War?",
    ],
  },
];

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSourcesMessage, setActiveSourcesMessage] = useState<ChatMessage | null>(null);
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as lines are typed, expanding upwards
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(textareaRef.current.scrollHeight, 160);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    adjustTextareaHeight();
  };

  // Check URL query parameter on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const q = searchParams.get("q");
      if (q && q.trim()) {
        const userMsg: ChatMessage = {
          id: `u-${Date.now()}`,
          sender: "user",
          text: q.trim(),
        };
        const answerData = getAnswerForQuery(q);
        const botMsg: ChatMessage = {
          id: `b-${Date.now() + 1}`,
          sender: "bot",
          text: answerData.text,
          sources: answerData.sources,
          groupedSources: answerData.groupedSources,
          followUps: answerData.followUps,
        };
        setMessages([userMsg, botMsg]);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Keyboard shortcut: Escape closes modal/drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveSourcesMessage(null);
        setIsMenuOpen(false);
        setIsPrivacyOpen(false);
        setIsHowItWorksOpen(false);
        setIsFeedbackOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: query,
    };

    const answer = getAnswerForQuery(query);
    const botMessage: ChatMessage = {
      id: `b-${Date.now() + 1}`,
      sender: "bot",
      text: answer.text,
      sources: answer.sources,
      groupedSources: answer.groupedSources,
      followUps: answer.followUps,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInputText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleToggleLike = (messageId: string, isLike: boolean) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        if (isLike) {
          return { ...msg, liked: !msg.liked, disliked: false };
        } else {
          return { ...msg, disliked: !msg.disliked, liked: false };
        }
      }),
    );
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDownload = (id: string, text: string) => {
    if (typeof window === "undefined") return;
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `america-gov-response-${id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleVoiceInput = () => {
    if (typeof window === "undefined") return;
    interface SpeechRecognitionEvent {
      results: Array<Array<{ transcript: string }>>;
    }
    interface SpeechRecognitionInstance {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onstart: () => void;
      onend: () => void;
      onerror: () => void;
      onresult: (event: SpeechRecognitionEvent) => void;
      start: () => void;
    }
    type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

    const win = window as unknown as {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setInputText(transcript);
          adjustTextareaHeight();
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#000c1f] dark:bg-[#080a0f] dark:text-[#f8fafc] transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 backdrop-blur-md bg-white/90 dark:bg-[#080a0f]/90 transition-colors">
        <a
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 site-home-link"
          aria-label="America.gov home"
        >
          <img
            src="/site-assets/us-flag.svg"
            alt="US Flag"
            width={28}
            height={18}
            className="rounded-[2px] shadow-xs shrink-0"
          />
          <span className="font-semibold text-lg tracking-tight text-[#000c1f] dark:text-white">
            America.gov
          </span>
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="inline-flex items-center justify-center rounded-full bg-[#002d62] hover:bg-[#001f4d] dark:bg-[#0066cc] dark:hover:bg-[#0052a3] active:scale-95 text-white text-sm font-semibold px-5 py-2 shadow-xs transition-all cursor-pointer"
        >
          Menu
        </button>
      </header>

      {/* Main Chat Flow Area */}
      <main className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-36">
        <div className="flex flex-col gap-6 w-full">
          {messages.map((message) => {
            if (message.sender === "user") {
              return (
                <div key={message.id} className="flex justify-end w-full animate-fade-in">
                  <div className="max-w-[85%] rounded-[24px] px-4 py-2.5 text-[15px] sm:text-[16px] bg-[#f0f3f7] text-[#000c1f] dark:bg-[#181d28] dark:text-white font-normal leading-relaxed shadow-2xs">
                    {message.text}
                  </div>
                </div>
              );
            }

            const grouped = getGroupedSources(message);
            const hasSources = grouped.length > 0;

            return (
              <div
                key={message.id}
                className="flex flex-col items-start w-full max-w-full sm:max-w-[92%] gap-3.5 animate-fade-in"
              >
                {/* Assistant Message Content */}
                <div className="text-[16px] sm:text-[17px] leading-[1.65] text-[#000c1f] dark:text-[#f8fafc] whitespace-pre-line font-normal space-y-3">
                  {message.text}
                </div>

                {/* Action Bar matching image_6535607e.png */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {/* Sources Pill with overlapping miniature agency seals */}
                  {hasSources && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSourcesMessage(message);
                        setExpandedDomain(null);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-black/10 bg-[#f4f6f9] text-[#000c1f] hover:bg-[#e9ecf1] dark:bg-white/10 dark:text-gray-200 dark:border-white/10 dark:hover:bg-white/15 transition-all cursor-pointer shadow-2xs active:scale-95"
                      title="View verified government sources"
                    >
                      <span className="relative flex items-center h-4 w-7 shrink-0">
                        <img
                          src="/site-assets/6b0e58ea2470c358-c45111fe79f447f74baa0a959314adb0.png"
                          alt=""
                          className="absolute left-0 size-4 rounded-full object-contain"
                        />
                        <img
                          src="/site-assets/ac9ec418e5b87762-f595254bb5ee2630436109fee6101659.png"
                          alt=""
                          className="absolute left-1.5 size-4 rounded-full object-contain z-10"
                        />
                        <img
                          src="/site-assets/f8771bab4355a2c8-bbad8e97f6ed9607bb4b97ed05f21110.png"
                          alt=""
                          className="absolute left-3 size-4 rounded-full object-contain z-20"
                        />
                      </span>
                      <span>Sources</span>
                    </button>
                  )}

                  {/* Combined Like & Dislike single capsule */}
                  <div className="inline-flex items-center rounded-full bg-[#f4f6f9] border border-black/10 dark:bg-white/10 dark:border-white/10 px-2.5 py-1 gap-2 shadow-2xs">
                    {/* Thumbs up */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(message.id, true)}
                      className={`inline-flex items-center justify-center p-0.5 rounded-full transition-colors cursor-pointer ${
                        message.liked
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                      }`}
                      aria-label="Helpful"
                      title="Helpful"
                    >
                      <svg
                        className={`size-4 ${message.liked ? "fill-current" : ""}`}
                        fill="none"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 18H5V8H2V18ZM19 9C19 8.47 18.79 7.96 18.41 7.59C18.04 7.21 17.53 7 17 7H12.69L13.34 3.86L13.36 3.65C13.36 3.37 13.25 3.12 13.07 2.93L12.14 2L7.07 7.07C6.71 7.43 6.5 7.93 6.5 8.45V16.5C6.5 17.03 6.71 17.54 7.09 17.91C7.46 18.29 7.97 18.5 8.5 18.5H15C15.62 18.5 16.16 18.14 16.39 17.59L18.87 11.81C18.96 11.56 19 11.29 19 11V9Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>

                    {/* Divider inside capsule */}
                    <div className="w-[1px] h-3.5 bg-black/10 dark:bg-white/15" />

                    {/* Thumbs down */}
                    <button
                      type="button"
                      onClick={() => handleToggleLike(message.id, false)}
                      className={`inline-flex items-center justify-center p-0.5 rounded-full transition-colors cursor-pointer ${
                        message.disliked
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                      }`}
                      aria-label="Not helpful"
                      title="Not helpful"
                    >
                      <svg
                        className={`size-4 ${message.disliked ? "fill-current" : ""}`}
                        fill="none"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 2H15V12H18V2ZM1 11C1 11.53 1.21 12.04 1.59 12.41C1.96 12.79 2.47 13 3 13H7.31L6.66 16.14L6.64 16.35C6.64 16.63 6.75 16.88 6.93 17.07L7.86 18L12.93 12.93C13.29 12.57 13.5 12.07 13.5 11.55V3.5C13.5 2.97 13.29 2.46 12.91 2.09C12.54 1.71 12.03 1.5 11.5 1.5H5C4.38 1.5 3.84 1.86 3.61 2.41L1.13 8.19C1.04 8.44 1 8.71 1 9V11Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Copy button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(message.id, message.text)}
                    className="inline-flex items-center justify-center size-8 rounded-full bg-[#f4f6f9] text-gray-500 hover:text-[#000c1f] hover:bg-[#e9ecf1] dark:bg-white/10 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/15 border border-black/10 dark:border-white/10 transition-colors cursor-pointer shadow-2xs"
                    aria-label="Copy answer"
                    title={copiedId === message.id ? "Copied!" : "Copy answer"}
                  >
                    {copiedId === message.id ? (
                      <svg className="size-4 text-green-500" fill="none" viewBox="0 0 20 20">
                        <path
                          d="M7.77 13.78L4.22 10.23L3.17 11.28L7.77 15.89L17.5 6.16L16.45 5.11L7.77 13.78Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg className="size-4" fill="none" viewBox="0 0 20 20">
                        <path
                          d="M16 1H4C2.9 1 2 1.9 2 3V14H4V3H16V1ZM15 5H8C6.9 5 6 5.9 6 7V17C6 18.1 6.9 19 8 19H15C16.1 19 17 18.1 17 17V7C17 5.9 16.1 5 15 5ZM15 17H8V7H15V17Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Download button */}
                  <button
                    type="button"
                    onClick={() => handleDownload(message.id, message.text)}
                    className="inline-flex items-center justify-center size-8 rounded-full bg-[#f4f6f9] text-gray-500 hover:text-[#000c1f] hover:bg-[#e9ecf1] dark:bg-white/10 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/15 border border-black/10 dark:border-white/10 transition-colors cursor-pointer shadow-2xs"
                    aria-label="Download answer"
                    title="Download response"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 20 20">
                      <path
                        d="M17 13V17H3V13H1V17C1 18.1 1.9 19 3 19H17C18.1 19 19 18.1 19 17V13H17ZM11 10.17L13.59 7.58L15 9L10 14L5 9L6.41 7.59L9 10.17V1H11V10.17Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                {/* Follow Up Suggestion Pills matching screenshot */}
                {message.followUps && message.followUps.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2.5 w-full">
                    <div className="flex flex-col gap-2 items-start">
                      {message.followUps.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[14px] text-left px-4 py-2.5 rounded-full border border-black/10 bg-white hover:bg-[#f4f6f9] text-[#000c1f] dark:border-white/10 dark:bg-[#121620] dark:hover:bg-[#1a202e] dark:text-white transition-all shadow-2xs active:scale-[0.99] cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Floating Bottom Dock */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 pb-4 pt-2 px-4 pointer-events-none">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-2 pointer-events-auto">
          {/* Chat Composer Pill - Expands Upward as text wraps */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-end w-full min-h-[56px] px-4 py-2.5 rounded-[28px] border border-black/15 bg-white/95 dark:border-white/15 dark:bg-[#0c0f17]/95 backdrop-blur-xl shadow-xl transition-all focus-within:ring-2 focus-within:ring-blue-600/30 focus-within:border-blue-600"
          >
            {/* Auto-growing Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 min-w-0 bg-transparent text-[16px] sm:text-[17px] text-[#000c1f] dark:text-[#f8fafc] placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none px-2 py-1 max-h-[160px] resize-none overflow-y-auto leading-normal"
            />

            {/* Right icons (paperclip, mic, send) */}
            <div className="flex items-center gap-1 shrink-0 pb-0.5">
              {/* Paperclip */}
              <button
                type="button"
                onClick={() => alert("Document scanning is enabled for official forms.")}
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-gray-500 hover:text-[#000c1f] hover:bg-black/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                aria-label="Attach document"
                title="Attach document"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              {/* Microphone */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors ${
                  isListening
                    ? "bg-red-600 text-white animate-pulse"
                    : "text-gray-500 hover:text-[#000c1f] hover:bg-black/5 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10"
                }`}
                aria-label="Voice input"
                title="Voice input"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-all ${
                  inputText.trim()
                    ? "bg-[#002d62] text-white hover:bg-[#001f4d] dark:bg-white dark:text-black dark:hover:bg-gray-200 active:scale-95 shadow-xs"
                    : "bg-black/5 text-gray-400 dark:bg-white/10 dark:text-gray-600 cursor-not-allowed opacity-40"
                }`}
                aria-label="Send message"
              >
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L8.59 4.41L13.17 9H3V11H13.17L8.59 15.59L10 17L17 10L10 3Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </footer>

      {/* Sources Drawer (Mobile) / Centered Modal (Desktop) matching image_0b4bf07a.png */}
      {activeSourcesMessage && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setActiveSourcesMessage(null)}
        >
          <div
            className="w-full sm:w-[460px] sm:max-w-[calc(100vw-32px)] bg-[#0c0e14] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-[28px] shadow-2xl max-h-[85vh] sm:max-h-[82vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drawer Pull Indicator */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

            {/* Header: Title and Top-Right Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] shrink-0">
              <div className="w-8 shrink-0" aria-hidden="true" />
              <h2 className="text-[17px] font-semibold text-white tracking-tight text-center">
                Sources
              </h2>
              <button
                type="button"
                onClick={() => setActiveSourcesMessage(null)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close sources"
              >
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Grouped Source Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/[0.08]">
              {getGroupedSources(activeSourcesMessage).map((group) => {
                const isExpanded = expandedDomain === group.domain;
                return (
                  <div key={group.domain} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setExpandedDomain(isExpanded ? null : group.domain)}
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <AgencyBadge badgeType={group.badgeType} domain={group.domain} />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[15px] sm:text-[16px] text-white tracking-tight">
                            {group.domain}
                          </span>
                          <span className="text-xs text-gray-400 font-normal mt-0.5">
                            {group.count} {group.count === 1 ? "source" : "sources"}
                          </span>
                        </div>
                      </div>
                      <svg
                        className={`size-4 text-gray-400 group-hover:text-white transition-transform duration-200 shrink-0 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Accordion Expandable Citations */}
                    {isExpanded && (
                      <div className="px-6 py-2.5 bg-white/[0.02] flex flex-col gap-2">
                        {group.links.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 transition-all group/item"
                          >
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors leading-snug">
                                {link.title}
                              </span>
                              {link.note && (
                                <span className="text-xs text-gray-400 mt-1 leading-normal">
                                  {link.note}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-400 group-hover/item:text-white font-medium flex items-center gap-0.5 mt-0.5 shrink-0">
                              ↗
                            </span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Menu Modal Sheet */}
      <SiteMenuSheet
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      {/* Privacy Info Dialog */}
      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-white text-[#000c1f] dark:bg-[#0c0f17] dark:text-white shadow-2xl border border-black/10 dark:border-white/10 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Your Privacy on America.gov</h3>
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="size-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
              >
                ✕
              </button>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              America.gov is designed with privacy-first architecture. Your queries are never sold
              to advertisers, never shared with third parties, and no persistent commercial tracking
              cookies are deployed.
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsPrivacyOpen(false)}
                className="px-5 py-2 rounded-full bg-[#002d62] text-white hover:bg-[#001f4d] dark:bg-white dark:text-black dark:hover:bg-gray-200 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How SI Works Dialog */}
      {isHowItWorksOpen && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsHowItWorksOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-white text-[#000c1f] dark:bg-[#0c0f17] dark:text-white shadow-2xl border border-black/10 dark:border-white/10 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">How SI Works</h3>
              <button
                type="button"
                onClick={() => setIsHowItWorksOpen(false)}
                className="size-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
              >
                ✕
              </button>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              SI (Structured Intelligence) searches verified .gov repositories, official state
              registries, and federal guidelines in real time to assemble concise, step-by-step
              guidance backed by primary citations.
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsHowItWorksOpen(false)}
                className="px-5 py-2 rounded-full bg-[#002d62] text-white hover:bg-[#001f4d] dark:bg-white dark:text-black dark:hover:bg-gray-200 text-sm font-medium"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Feedback Dialog */}
      {isFeedbackOpen && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsFeedbackOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-white text-[#000c1f] dark:bg-[#0c0f17] dark:text-white shadow-2xl border border-black/10 dark:border-white/10 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Submit Feedback</h3>
              <button
                type="button"
                onClick={() => setIsFeedbackOpen(false)}
                className="size-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Help us improve America.gov. Your anonymous feedback helps make official services
              accessible to all Americans.
            </p>
            <textarea
              rows={3}
              placeholder="What worked well or could be improved?"
              className="w-full rounded-2xl p-3 border border-border bg-secondary/30 text-sm outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsFeedbackOpen(false)}
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Thank you for your feedback!");
                  setIsFeedbackOpen(false);
                }}
                className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
