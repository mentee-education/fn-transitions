// Lesson Content - All 16 lessons as React JSX
// Each lesson returns a JSX element with the full content

import React from "react";
import OntarioMap from "@/components/OntarioMap";

// ─── Shared Styles ─────────────────────────────────────────────────────────────
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl sm:text-2xl font-bold text-[#2C2420] mt-6 sm:mt-8 mb-3 sm:mb-4 font-['DM_Sans']">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-base sm:text-lg font-bold text-[#3d2e26] mt-4 sm:mt-6 mb-2 sm:mb-3 font-['DM_Sans']">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[#4a3f35] mb-3 sm:mb-4 leading-relaxed text-[15px] sm:text-base">{children}</p>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-1 text-[#4a3f35] text-[15px] sm:text-base">{children}</ul>
);
const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="leading-relaxed">{children}</li>
);
const Bold = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold">{children}</strong>
);
const Em = ({ children }: { children: React.ReactNode }) => (
  <em className="italic">{children}</em>
);
const ActivityLink = ({ href, children }: { href?: string; children: React.ReactNode }) => {
  const isInternal = href?.startsWith("/");
  return (
    <a
      href={href || "#"}
      target={isInternal ? undefined : (href && href !== "#" ? "_blank" : undefined)}
      rel={isInternal ? undefined : "noopener noreferrer"}
      className="inline-flex items-center gap-1 text-[#C2703E] hover:text-[#8B4513] font-semibold underline"
    >
      {children}
    </a>
  );
};
const VideoEmbed = ({ url, title }: { url: string; title: string }) => (
  <div className="my-4 sm:my-6">
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <iframe
        className="absolute inset-0 w-full h-full rounded"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <p className="text-sm text-gray-500 mt-2 italic">{title}</p>
  </div>
);
const ReflectionBox = ({ questions }: { questions: string[] }) => (
  <div className="bg-[#FFF8F0] border-l-4 border-[#D4A853] p-3 sm:p-5 my-4 sm:my-6 rounded-r">
    <h3 className="font-bold text-[#2C2420] mb-3 font-['DM_Sans']">Reflection Questions</h3>
    <p className="text-[#6b5e52] text-sm mb-3">Take a moment to consider:</p>
    <ul className="space-y-2">
      {questions.map((q, i) => (
        <li key={i} className="text-[#4a3f35] flex gap-2">
          <span className="text-[#D4A853] flex-shrink-0">&bull;</span>
          <span>{q}</span>
        </li>
      ))}
    </ul>
    <p className="text-sm text-[#8a7e72] mt-3 italic">These questions are for reflection only — there are no right or wrong answers.</p>
  </div>
);

// ─── BEFORE YOU BEGIN ──────────────────────────────────────────────────────────
const BeforeYouBegin = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Before You Begin: Context for the Path Forward</h1>
    <P>Every learner begins their education journey from a different place — geographically, emotionally, culturally, and personally. Some First Nations learners come from a First Nation. Others come from cities, towns, or several places they move between. Some may feel strongly connected to community, while others may be reconnecting, learning, or holding their identity in their own way. All of these experiences are valid.</P>
    <P>This program begins with a broad look at First Nations across Ontario to honour this diversity. You may or may not see your own situation reflected here, and that is okay. This section is not meant to represent all First Nations experiences. Instead, it provides context for the many different realities people bring into education transitions.</P>

    <H2>Why This Context Matters (Even If Your Experience Is Different)</H2>
    <P>First Nations communities are spread across Ontario, each with their own on-reserve populations, geographies, and realities. For some learners, a community may be the place they call home. For others, it may represent where family comes from, where connections are held, or simply part of the wider landscape of First Nations across the province.</P>
    <P>This context is included because it helps show that:</P>
    <UL>
      <LI>Not all learners live close to post-secondary opportunities</LI>
      <LI>Travel, distance, and location affect transitions in different ways</LI>
      <LI>Access to supports and services varies across the province</LI>
      <LI>First Nations life is diverse — rural, urban, remote, northern, southern, mixed, mobile</LI>
      <LI>There is no single "First Nations learner experience"</LI>
    </UL>
    <P>If you come from a city, a northern community, a southern town, or multiple places, you belong in this program just as much as anyone. Your journey is shaped by your own circumstances, relationships, and experiences, wherever those may be.</P>
    <P>This section simply helps place your story within a larger picture of First Nations presence, history, and identity across Ontario.</P>


    <ReflectionBox questions={[
      "How would you describe the place or places you come from?",
      "What experiences, values, or teachings have shaped your path so far?",
      "How does your location (urban, rural, remote, mobile) affect your transition?",
      "What supports do you have access to where you currently live?",
      "What supports might you need when you move into a new environment?",
      "What comes to mind when you think about the range of First Nations communities across the province?",
    ]} />

    <H2>How This Program Helps You Build Your Learning Profile</H2>
    <P>Throughout the modules, you'll work through 15 activities that help you understand yourself as a learner. Whether you come from a community, a city, many places, or somewhere in between, these activities support you in building your own learning profile, a clearer picture of:</P>
    <UL>
      <LI>Your supports and relationships</LI>
      <LI>Your strengths, values, and experiences</LI>
      <LI>Your identity and sense of belonging</LI>
      <LI>Your wellness needs and sources of balance</LI>
      <LI>Your routines and learning habits</LI>
      <LI>Your goals, choices, and next steps</LI>
    </UL>
    <P>Your learning profile is yours, grounded in your realities, your lived experiences, and your vision for the future.</P>

    <H2>When You're Ready</H2>
    <P>When you feel grounded and ready to begin, start with <Bold>Module 1</Bold>.</P>
  </div>
);

// ─── LESSON 1.1 ────────────────────────────────────────────────────────────────
const Lesson11 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 1.1 — Module Overview</h1>
    <H2>Welcome to Module 1: Before the Journey</H2>
    <P>Preparing for post-secondary education looks different for every First Nations learner. For some, it means leaving home for the first time. For others, it means returning to learning as an adult while balancing work, family, or community responsibilities. No matter the path, transitions involve practical planning, emotional weight, and important decisions about the future.</P>
    <P><Bold>In this module, you will explore:</Bold></P>
    <UL>
      <LI>What it means to prepare for a major change</LI>
      <LI>The emotions that come with leaving home or returning to learning</LI>
      <LI>The supports that help learners stay grounded</LI>
      <LI>The early steps in Talia's story as she begins her journey</LI>
    </UL>

    <H3>🎥 Video for This Module</H3>
    <P><Bold>First Nations Families Weigh Children's Education vs. Safety</Bold></P>
    <P>This video provides an honest look at the difficult choices families may face when education opportunities require leaving home, offering important context for understanding readiness, responsibility, and emotional preparation.</P>
    <VideoEmbed url="https://www.youtube.com/embed/x9iTBSPSE3U?feature=oembed" title="First Nations Families Weigh Children's Education vs. Safety" />

    <H3>📚 Story Chapter Covered</H3>
    <P>This module includes:</P>
    <P><Bold>Chapter 1: The Road Out</Bold><br />You will read this chapter in the next lesson.</P>

    <ReflectionBox questions={[
      "What feelings come up when you think about starting something new or unfamiliar?",
      "What helps you feel grounded, supported, or prepared during major changes?",
      "How do family, community, or cultural responsibilities shape your decisions about education?",
      "When have you needed courage to take a next step in your own path?",
      "What does 'readiness' mean to you at this moment?",
    ]} />

    <P>When you are ready, continue to Lesson 1.2.</P>
  </div>
);

// ─── LESSON 1.2 ────────────────────────────────────────────────────────────────
const Lesson12 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 1.2 — Preface + Chapter 1: The Road Out</h1>

    <H2>Preface: Before the Bus</H2>
    <P>For many First Nations learners in Ontario, going to school is not a simple morning bus ride. In some communities, school ends at Grade 8. In others, a high school exists but cannot offer the courses needed to move into college, university, trades, or specific training programs. Some families live close to regional colleges or universities, while others are hours away by highway, winter roads, or flights that depend on the weather.</P>
    <P>Each year, learners leave home to pursue something that matters: a diploma, certificate, trade, degree, or a new direction later in life. Some are teenagers finishing high school. Others are mature learners upgrading, retraining, or returning to education after raising families or working for years. Some arrive with their children now grown and finally have space to focus on themselves. Some come back after years in the workforce because employers now require credentials that weren't needed before. Others return because they want to bring new skills home to support their Nation. No matter their age, the decision to go is never small.</P>
    <P>Leaving home can mean being away from the people who understand where you come from and what you carry. These are the people who know your responsibilities, your humour, the way you solve problems, and the small things that keep you steady. Families feel that absence. They know the challenges their children and relatives may face in towns and cities. They hold both hope and worry at the same time.</P>
    <P>Across many conversations and lived experiences, a picture has emerged of what stronger transitions could look like. People talked about wanting safer ways to explore options, more time to understand supports, earlier access to funding information, and opportunities to learn in community rather than alone. They also spoke about clear pathways for adults returning to school, recognition of prior learning, and support that respects family responsibilities, work schedules, and caregiving roles. This story brings those ideas together into one example of what that support could become when the pieces are combined.</P>
    <P>The week in this book takes place at <Em>Northern Rivers Regional Campus</Em>, a fictional hub in northern Ontario that includes a college, a small university site, and the <Em>Mentee Centre for Indigenous Learners</Em>. The program shown here, called <Em>Pathways Week</Em>, is also fictional. The ideas behind it are real. They come from what First Nations learners, families, and education staff across the province said would make transitions safer, clearer, and more supported.</P>
    <P>The places and characters in this book are imagined, but the experiences, questions, supports, barriers, and feelings reflect the realities that First Nations learners continue to face and the strengths they continue to carry.</P>
    <P>You may see yourself in Talia, Devon, or Mariah, or in the aunties, grandparents, mentors, and coordinators who show up along the way. That is the purpose of this story: to make it clear that no one walks this path alone.</P>
    <P>This is a week that does not solve everything, but it makes sure no one steps into their future without guidance, support, or understanding.</P>

    <H2>Chapter 1: The Road Out</H2>
    <P>The morning of the trip, Talia woke up before her alarm.</P>
    <P>She lay still for a moment, listening to the house. Her aunt was already moving around in the kitchen, the familiar sound of the kettle and the radio turned low. Outside, the sky was just starting to lighten.</P>
    <P>She had packed her bag the night before, twice. The second time was just to check.</P>
    <P>When she came downstairs, her aunt looked up from the counter.</P>
    <P>"You eat anything?"</P>
    <P>"I will."</P>
    <P>Which meant not yet. Her stomach felt tight, like it knew something her brain was still pretending was casual.</P>
    <P>Her aunt came over, checked the zipper on the duffel, then stuck an envelope into the side.</P>
    <P>"What is that?" Talia asked.</P>
    <P>"Schedule. Program info. Your consent form copies. And a bit of cash," her aunt said. "For food. And no, do not argue with me."</P>
    <P>Talia nodded. The envelope made it feel real.</P>
    <P>Outside, the morning was clear and cool. Gravel under her shoes. The truck was already running, puffing a small trail of exhaust. They drove past the band office, the gym, the houses where she could name who lived in each one without thinking. Past the baseball field where kids were already cutting across the outfield to the store.</P>
    <P>"You remember," her aunt said, watching the road. "You are not locking into anything this week. Just looking."</P>
    <P>"I know," Talia said. "It is fine."</P>
    <P>Her aunt's version of "just looking" still meant she had circled the dates on the calendar, texted the education counsellor three times, and printed every email.</P>
    <P>They pulled into the education office lot. The bus was there. Not huge, but big enough, with a simple white side and the regional logo that had a lake and tree on it.</P>
    <P>A few students were already waiting. Some had bags. One had just a backpack. Two younger ones stood with a grandfather who kept patting their shoulders like he was counting them.</P>
    <P>Talia swallowed.</P>
    <P>Her aunt turned off the truck and reached out.</P>
    <P>"You got your phone charger?" she asked.</P>
    <P>"Yes."</P>
    <P>"Call me when you get there. If you need anything, you call me. If you lose your card, you call me. If you get confused about something, you call me."</P>
    <P>"I know."</P>
    <P>All the little instructions were the way her aunt said <Em>I care, I am thinking three steps ahead for you.</Em></P>
    <P>"Okay," her aunt said. "Go on, then."</P>
    <P>Talia hugged her quick, before her throat could close up, and grabbed her bag. The gravel crunched under her shoes as she walked toward the bus.</P>
    <P>"Morning," a woman in a windbreaker said as Talia climbed on. "Sign in here. Name and community. You are with <Em>Pathways</Em>, right."</P>
    <P>"Yeah," Talia said, writing her name.</P>
    <P>She did not say the community out loud. It was already there in the column.</P>
    <P>She chose a seat by the window near the middle. Outside, she saw another car pull in, then a van. More students. The program was pulling from three communities along the highway and one smaller one closer to the lake.</P>
    <P>A few older learners sat near the back, quieter but just as determined, carrying folders instead of backpacks. One woman in a heavy denim jacket nodded politely at Talia; she looked like someone who had worked long shifts and was now starting something new for herself.</P>
    <P>A girl with braids and a bright red hoodie slid into the seat in front of her and turned around.</P>
    <P>"You Talia?" she asked.</P>
    <P>"Yeah."</P>
    <P>"I am Mariah. My aunt is the one running this from our school. She said there would be another Tal from your community."</P>
    <P>Talia smiled. "Yeah, that is me."</P>
    <P>"You going for college for sure?" Mariah asked. "Or just checking it out?"</P>
    <P>"Just seeing," Talia said. "You?"</P>
    <P>"Thinking Early Childhood Education (ECE) or social work," Mariah said. "I want to work with kids, not photocopiers all day."</P>
    <P>She shrugged like it was nothing, but her eyes were bright.</P>
    <P>The bus stopped twice more along the highway. Each time, another small group got on with bags and snacks, shaking off parents and grandparents. The bus turned into a lot lined with young trees. The building itself was not huge, but it was a lot bigger than any school back home. Glass front. Three floors. Flags at the entrance. One flag had the regional First Nations logo.</P>
    <P>The bus hissed as it stopped.</P>
    <P>"All right <Em>Pathways</Em>," the coordinator said. "When you get off, stick with your group. Today we are doing a campus tour, lunch in the cafeteria, and time in the Indigenous student space where you can talk to mentors and staff. Tonight you are at the hotel, with supervision, in rooms with people from your region. We have your chaperones. We have your schedule. We have snacks. Your job today is just to pay attention to what it feels like to be here, and write down what you notice."</P>
    <P>Devon muttered, quiet enough so only Talia heard, "Feels like a lot."</P>
    <P>"Yeah," she said. "But at least we are together."</P>
    <P>When she stepped off the bus, the air felt different. Not bad. Just busier. Cars moving. Doors opening. Voices. The smell of coffee and something fried from inside.</P>
    <P>A woman in a jacket that said Student Services lifted a hand.</P>
    <P>"Welcome," she called. "We are glad you are here."</P>
    <P>Behind her, a sign on an easel read:</P>
    <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded text-center">
      <p className="font-bold text-gray-800">Pathways Week</p>
      <p className="text-gray-700">First Nations Learners</p>
      <p className="font-semibold text-blue-700">You Belong Here</p>
    </div>
    <P>Talia adjusted her bag on her shoulder and stepped forward with the others.</P>
    <P>Not a move. Not yet.</P>
    <P>Just one week to see if this place could hold a piece of her future, without asking her to leave herself behind.</P>
  </div>
);

// ─── LESSON 1.3 ────────────────────────────────────────────────────────────────
const Lesson13 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 1.3 — Activities & Tools: Readiness and Supports</h1>
    <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
      <p className="font-bold text-green-800 mb-2">Module Activities</p>
      <P>Preparing to leave home or returning to learning as an adult often involves emotional readiness, family conversations, and practical planning. These activities help learners reflect on their supports, their feelings, and the steps that make transition smoother:</P>
    </div>

    <H3>Circle of Support Map</H3>
    <P>This activity helps you identify the people, relationships, programs, and services that support your journey. Mapping these connections builds awareness of who you can lean on and highlights the strengths already around you.</P>
    <p className="mb-4"><ActivityLink href="/activities/1">Open this Activity</ActivityLink></p>

    <H3>Preparing to Leave Reflection</H3>
    <P>This guided reflection explores the emotional, cultural, and personal aspects of preparing for a major transition. It encourages you to consider your feelings, responsibilities, hopes, and concerns before beginning a new chapter.</P>
    <p className="mb-4"><ActivityLink href="/activities/2">Open this Activity</ActivityLink></p>

    <H3>Readiness & Packing Checklist</H3>
    <P>This checklist supports practical planning, from essential documents and school supplies to cultural grounding items and wellness supports. It helps you think through what you need to feel ready, confident, and organized.</P>
    <p className="mb-4"><ActivityLink href="/activities/3">Open this Activity</ActivityLink></p>

    <P>When you are ready, continue to <Bold>Module 2</Bold>.</P>
  </div>
);

// ─── LESSON 2.1 ────────────────────────────────────────────────────────────────
const Lesson21 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 2.1 — Module Overview</h1>
    <H2>Welcome to Module 2: Arriving & Exploring 🌱</H2>
    <P>Entering a new space (whether it's a college campus, a training program, or an upgrading program) can bring a mix of curiosity, excitement, and uncertainty. For many First Nations learners, arriving in a new learning environment is not just about finding classrooms. It's about finding belonging, feeling seen, and carrying identity into a new place.</P>
    <P><Bold>In this module, you will explore:</Bold></P>
    <UL>
      <LI>What it feels like to arrive at a new campus or program</LI>
      <LI>Belonging, identity, and first impressions</LI>
      <LI>Talia's first day in <Em>Chapter 2: The First Day</Em></LI>
      <LI>How identity shapes confidence and comfort</LI>
      <LI>Where you feel belonging in learning spaces</LI>
    </UL>

    <H3>🎥 Video for This Module</H3>
    <P><Bold>Amy Smoke — Identity and Post-Secondary (TEDxKitchenerED)</Bold></P>
    <P>This video offers a powerful look at identity, belonging, and navigating new learning spaces as an Indigenous learner.</P>
    <VideoEmbed url="https://www.youtube.com/embed/eWg9wudIzDk?feature=oembed" title="Amy Smoke — Identity and Post-Secondary (TEDxKitchenerED)" />

    <H3>📚 Story Chapter Covered</H3>
    <P>This module includes:</P>
    <UL><LI><Bold>Chapter 2: The First Day</Bold></LI></UL>
    <P>You will read this chapter in the next lesson.</P>

    <ReflectionBox questions={[
      "What practical skills help you feel confident when you enter a new place or community?",
      "What challenges do you think might come with budgeting, planning, or finding your way around somewhere unfamiliar?",
      "Where do you usually go for support when you need help with everyday tasks?",
      "What does 'independence' look like for you at this stage in your life?",
      "What environments help you feel safe, capable, and able to make decisions?",
    ]} />

    <P>When you're ready, continue to Lesson 2.2.</P>
  </div>
);

// ─── LESSON 2.2 ────────────────────────────────────────────────────────────────
const Lesson22 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 2.2 — Chapter 2: The First Day</h1>
    <P>The next morning started with a hotel breakfast — paper plates with scrambled eggs and toast that kept popping up half-burnt every time.</P>
    <P>A woman with a <Em>Pathways</Em> badge handed out juice boxes.</P>
    <P>It felt strange and comforting all at once, like being on a school trip and also something bigger.</P>
    <P>On the bus to campus, everyone was quieter. Maybe tired. Maybe shy again.</P>
    <P>Outside, the air smelled like wet pavement. The parking lot was still shiny from a night rain.</P>
    <P>When they walked through the doors, the noise hit: footsteps, voices, a vending machine humming.</P>
    <P>The lobby was wide and bright, banners hanging from the ceiling with words like "Discovery," "Skills," and "Community."</P>
    <P>A staff member wearing a turquoise lanyard waved them over.</P>
    <P>"Morning! I'm Shayla, the Indigenous Student Advisor. Welcome to Northern Lakes Campus."</P>
    <P>Her voice had that confident, steady tone of someone who'd done this a hundred times but still cared.</P>
    <P>She handed each student a name tag and a small cloth bag with a notebook, pen, and campus map.</P>
    <P>Talia looked at hers. The logo said <Em>Indigenous Student Services – You Belong Here</Em>.</P>
    <P>Shayla continued, "We're heading first to the Indigenous Student Space. It's your home base here. Come see it."</P>
    <P>They followed her down a hallway painted with murals — northern lights, silhouettes of paddlers, beadwork designs.</P>
    <P>Inside the space, the smell changed. Coffee, cedar, paper, something warm.</P>
    <P>Couches lined the walls, bulletin boards full of posters about workshops, funding deadlines, and cultural nights.</P>
    <P>An Elder sat at a small round table, reading the paper.</P>
    <P>Shayla gestured. "That's Aunty Mae. She's here most mornings. She'll be one of the first people you meet when you come back as students."</P>
    <P>Aunty Mae looked up, smiled. "Good morning, everyone. Come in, get comfortable. You still look a little sleepy."</P>
    <P>The group laughed.</P>
    <P>Shayla said, "Today's about showing you what exists for you. We'll do a campus scavenger hunt after this, lunch in the cafeteria, and this afternoon a session on 'Finding Your Voice.' You'll meet some current First Nations students who'll tell you what it's really like here."</P>
    <P>Talia looked around. Mariah was chatting with a girl from the next community over; Devon was already asking a guy in a welding hoodie about trades programs.</P>
    <P>It felt… possible.</P>
    <P>She noticed one of the mature learners speaking with a staff member about childcare supports and part-time program options. It reminded Talia that this week wasn't only for people her age. Everyone here was figuring out their own version of a next step.</P>
    <P>Later, during the scavenger hunt, they were given clues: "Find the library and ask what time it opens." "Take a picture of the Indigenous art in the atrium." "Ask Student Services where tutoring happens."</P>
    <P>Each task meant talking to someone new.</P>
    <P>Talia hesitated at first but watched Mariah stride right up to the librarian, laughing as she asked her question.</P>
    <P>When it was her turn, Talia took a breath and asked about the tutoring schedule. The woman behind the desk smiled and explained patiently, handing her a brochure.</P>
    <P>It wasn't hard. It just took trying once.</P>
    <P>At lunch, the cafeteria buzzed. She and Mariah sat with Devon and two other students, trays full of fries and bottled water.</P>
    <P>"Feels weird being in a cafeteria that isn't ours," Mariah said.</P>
    <P>Devon nodded. "Yeah. But I guess you get used to it."</P>
    <P>"Maybe," Talia said, then smiled. "Still figuring out where the ketchup is."</P>
    <P>Everyone laughed, and something in her loosened.</P>
    <P>In the afternoon session, Shayla introduced three current First Nations students on campus – one in health sciences, one in business, and one in trades.</P>
    <P>They sat in a small circle, no microphones, just talking.</P>
    <P>"When I first came here," said the student from health sciences, "I didn't talk to anyone for two weeks. Thought people would judge me. But when I finally walked into this space," she nodded toward the Indigenous Student Centre door, "someone handed me a cup of tea and said, 'Sit down.' That changed everything."</P>
    <P>Another mentor, a man in his forties studying environmental technology, spoke next. He explained that he returned to school after twenty years in forestry. 'I thought I'd be the oldest person in every classroom,' he said, 'but there were people my age everywhere. We have just as much right to be here as anyone else.'</P>
    <P>The business student added, "You'll see a lot of posters about belonging. But real belonging happens when someone notices you're missing."</P>
    <P>Talia wrote that in her notebook.</P>
    <P>At the end of the day, Shayla gave them a short reflection prompt card.</P>
    <P>"Write three things you learned today – not just facts, but feelings. Something that surprised you. Something that scared you a bit. Something that gave you hope."</P>
    <P>On the bus ride back to the hotel, the sun dipped behind the trees, gold light flashing through the windows.</P>
    <P>Mariah leaned her head against the seat. "Okay, this place isn't bad," she said.</P>
    <P>Talia nodded, watching the highway roll by.</P>
    <P>"Yeah," she said quietly. "Maybe it's not."</P>
  </div>
);

// ─── LESSON 2.3 ────────────────────────────────────────────────────────────────
const Lesson23 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 2.3 — Activities & Tools: Belonging and Identity</h1>
    <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
      <p className="font-bold text-green-800 mb-2">Module Activities</p>
      <P>Arriving in a new learning environment can bring a mix of excitement, uncertainty, and curiosity. These activities help learners explore who they are, what belonging feels like, and how identity shapes confidence when stepping into new spaces:</P>
    </div>

    <H3>"Who I Am" Identity Web</H3>
    <P>This activity guides you in exploring the many parts of your identity — family, community, culture, interests, strengths, and experiences. It helps you understand what you bring with you into new spaces and how these elements shape your sense of self.</P>
    <p className="mb-4"><ActivityLink href="/activities/4">Open this Activity</ActivityLink></p>

    <H3>Belonging Map</H3>
    <P>Use this activity to identify the people, places, and environments where you feel welcome, valued, and seen. Mapping belonging helps you recognize what makes a space feel safe and supportive, especially when entering a new community or campus.</P>
    <p className="mb-4"><ActivityLink href="/activities/5">Open this Activity</ActivityLink></p>

    <H3>Journal: "Where Do I Feel Seen?"</H3>
    <P>This reflective journal prompt invites you to recall times when your voice, identity, or experience felt acknowledged. It helps you recognize what contributes to comfort, trust, and connection in learning environments.</P>
    <p className="mb-4"><ActivityLink href="/activities/6">Open this Activity</ActivityLink></p>

    <P>When you are ready, continue to <Bold>Module 3</Bold>.</P>
  </div>
);

// ─── LESSON 3.1 ────────────────────────────────────────────────────────────────
const Lesson31 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 3.1 — Module Overview</h1>
    <H2>Welcome to Module 3: Life Skills in Motion 🧭</H2>
    <P>As learners settle into a new environment, practical life skills become essential. Navigating a city, managing money, building routines, and finding safe spaces all contribute to confidence and independence. Many First Nations learners balance these skills while adjusting to being far from home, supporting family, or learning as adults.</P>
    <P><Bold>In this module, you will explore:</Bold></P>
    <UL>
      <LI>The practical skills needed to navigate a new community</LI>
      <LI>Budgeting, planning, and independence</LI>
      <LI>Talia's experiences in <Em>Chapter 3: Finding Steady Ground</Em></LI>
      <LI>How daily habits and environments shape success</LI>
      <LI>Ways to build confidence and self-reliance</LI>
    </UL>

    <H3>🎥 Video for This Module</H3>
    <P><Bold>Tunchai Redvers — Creating Environments for Indigenous Youth to Live and Succeed (We Matter)</Bold></P>
    <P>This video highlights resilience, self-reliance, and the importance of supportive environments for Indigenous youth.</P>
    <VideoEmbed url="https://www.youtube.com/embed/zwLR23fHBQU?feature=oembed" title="Tunchai Redvers — Creating Environments for Indigenous Youth to Live and Succeed" />

    <H3>📚 Story Chapter Covered</H3>
    <P>This module includes:</P>
    <UL><LI><Bold>Chapter 3: Finding Steady Ground</Bold></LI></UL>
    <P>You will read this chapter in the next lesson.</P>

    <ReflectionBox questions={[
      "What practical skills do you feel confident about when it comes to managing daily life?",
      "What areas of independence feel challenging or unfamiliar to you right now?",
      "How do you usually manage money, time, or daily routines?",
      "What environments help you feel focused, safe, and able to learn?",
      "What support would help you build confidence in navigating a new place?",
    ]} />

    <P>When you're ready, continue to Lesson 3.2.</P>
  </div>
);

// ─── LESSON 3.2 ────────────────────────────────────────────────────────────────
const Lesson32 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 3.2 — Chapter 3: Finding Steady Ground</h1>
    <P>By the third morning, everything felt slower.</P>
    <P>The excitement from the first day had faded, replaced by something like tiredness — not bad, just heavy.</P>
    <P>Even the hotel breakfast felt quieter. Mariah pushed around her eggs. Devon scrolled his phone. Someone laughed at a TikTok but no one joined in.</P>
    <P>When they got to the campus, the rain had started again, a quiet drizzle settling over the sidewalks.</P>
    <P>Shayla, their coordinator, met them at the door, handing out ponchos like it was part of the schedule.</P>
    <P>"Morning, Pathways crew," she said. "Today we're splitting up for workshops – some of you are in trades, some in health, some in general orientation. After lunch we're coming back here for a session on self-care and supports. Sound good?"</P>
    <P>A few people nodded, others just followed.</P>
    <P>Talia found herself in the classroom labelled "College Life 101."</P>
    <P>The instructor, a man in his thirties with kind eyes and a laptop full of stickers, wrote three words on the board:</P>
    <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded text-center">
      <p className="text-2xl font-bold text-blue-800">Ask. Early. Always.</p>
    </div>
    <P>He turned to the group. "That's your main rule. You get behind on an assignment? Ask early. Confused about housing? Ask early. Mental health slipping? Ask early. No one here can help if you try to handle everything alone."</P>
    <P>He asked who'd ever been scared to ask for help. Nearly every hand went up.</P>
    <P>"Yeah," he said softly. "That's everyone. We think asking means we're failing. It doesn't. It means we're learning."</P>
    <P>Talia wrote it down, underlining the words. But part of her didn't believe it yet.</P>
    <P>At lunch she sat with Mariah and Devon again.</P>
    <P>Mariah was quieter than usual, poking at her salad.</P>
    <P>Nearby, one of the older learners sighed over her coffee, talking softly about balancing classes with caring for her granddaughter. Hearing that made the cafeteria feel different. Everyone carried something. Everyone had a reason for being here.</P>
    <P>"What's up?" Talia asked.</P>
    <P>Mariah shrugged. "Just… thinking about next year, if I can do this for real. My cousin went last year and couldn't find a place to live. Said she stayed with three other girls in a basement for months. I don't know if I could handle that."</P>
    <P>Devon nodded. "I get it. I was thinking about the same thing. Like, what if something happens back home while I'm here? What if I can't go back right away?"</P>
    <P>No one said anything for a minute. The sound of trays and voices filled the space.</P>
    <P>Then Talia said, "That's why we're doing this week, right? To figure it out before it's real."</P>
    <P>"Yeah," Mariah said. "Just… sometimes it feels like a lot."</P>
    <P>That afternoon they met back in the Indigenous Student Space. The lights were low, a soft hum of a fan in the corner.</P>
    <P>A woman named Rena, from the college's Indigenous Wellness Team, led the session.</P>
    <P>"I used to think taking care of myself meant working harder," she said. "Then I realized it meant noticing when I'm slipping."</P>
    <P>She passed around small notebooks.</P>
    <P>"This is your mid-week check-in," she said. "Write down three things that are going okay, and one thing that's not."</P>
    <P>Talia wrote:</P>
    <div className="my-4 p-4 bg-amber-50 border border-amber-200 rounded">
      <p className="text-gray-700 italic">Going okay: Met people I actually like. Found the library. Didn't get lost today.</p>
      <p className="text-gray-700 italic mt-2">Not going okay: Still not sure if I can actually do this for a whole year.</p>
    </div>
    <P>Rena walked around, not reading anyone's notebooks, just being present.</P>
    <P>"You don't have to have it figured out," she said quietly. "You just have to keep going."</P>
    <P>On the bus back to the hotel, Devon pulled out his campus map and started marking things with a pen.</P>
    <P>"What are you doing?" Mariah asked.</P>
    <P>"Marking the places I'd actually use," he said. "Library. Gym. Indigenous Centre. Tim Hortons."</P>
    <P>Mariah laughed. "Tim Hortons is a life skill."</P>
    <P>Talia smiled, watching the city blur past the window.</P>
    <P>She thought about what Rena had said. <Em>You just have to keep going.</Em></P>
    <P>It wasn't a solution. But it was something to hold onto.</P>
  </div>
);

// ─── LESSON 3.3 ────────────────────────────────────────────────────────────────
const Lesson33 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 3.3 — Activities & Tools: Life Skills and Independence</h1>
    <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
      <p className="font-bold text-green-800 mb-2">Module Activities</p>
      <P>Settling into a new place often means developing the life skills that support independence and confidence. These activities help learners build practical routines, navigate new environments, and manage everyday responsibilities:</P>
    </div>

    <H3>Personal Budget Tracker</H3>
    <P>This budgeting tool helps you understand your financial needs, plan for expenses, and make informed choices about spending while in school or training. It supports confidence, reduces stress, and builds awareness of what's manageable.</P>
    <p className="mb-4"><ActivityLink href="/activities/7">Open this Activity</ActivityLink></p>

    <H3>City Navigation Challenge</H3>
    <P>This activity encourages exploration of key locations in a new community, such as student supports, health centres, safe spaces, and transit routes. It helps you build familiarity with your surroundings and feel more confident moving through them.</P>
    <p className="mb-4"><ActivityLink href="/activities/8">Open this Activity</ActivityLink></p>

    <H3>My Environment for Success Worksheet</H3>
    <P>Use this worksheet to reflect on the habits, spaces, routines, and supports that help you focus, stay well, and be successful. It encourages you to think about what helps you learn best and how to create that environment.</P>
    <p className="mb-4"><ActivityLink href="/activities/9">Open this Activity</ActivityLink></p>

    <P>When you are ready, continue to <Bold>Module 4</Bold>.</P>
  </div>
);

// ─── LESSON 4.1 ────────────────────────────────────────────────────────────────
const Lesson41 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 4.1 — Module Overview</h1>
    <H2>Welcome to Module 4: Wellness, Balance & Real Talk</H2>
    <P>Transitions come with pressure. New routines, new expectations, homesickness, financial stress, and navigating unfamiliar systems can feel heavy at times. For many First Nations learners, wellness is not just about individual care — it is about community, culture, connection, and having the right supports in place.</P>
    <P>This module focuses on emotional wellness, coping skills, and the importance of having people to reach out to when things feel overwhelming.</P>
    <P><Bold>In this module, you will explore:</Bold></P>
    <UL>
      <LI>Emotional and mental wellness during transitions</LI>
      <LI>Common stressors for First Nations learners</LI>
      <LI>The importance of support networks and mentorship</LI>
      <LI>Talia's turning point in <Em>Chapter 4: Real Talk</Em></LI>
      <LI>Tools for grounding, coping, and asking for help</LI>
    </UL>

    <H3>🎥 Video for This Module</H3>
    <P><Bold>Teaching the truth: Why education needs to be informed and led by Indigenous people</Bold></P>
    <P>Despite clear calls to action from the Truth and Reconciliation Commission, Indigenous content is still not consistently taught in schools. This segment explores why authentic, community-informed education matters, how it supports real change, and what is needed to ensure Indigenous voices lead the way.</P>
    <VideoEmbed url="https://www.youtube.com/embed/vxbL_Zjcnpg?feature=oembed" title="Teaching the truth: Why education needs to be informed and led by Indigenous people" />

    <H3>📚 Story Chapter Covered</H3>
    <P>This module includes:</P>
    <UL><LI><Bold>Chapter 4: Real Talk</Bold></LI></UL>
    <P>You will read this chapter in the next lesson.</P>

    <ReflectionBox questions={[
      "What does wellness mean to you — emotionally, physically, culturally, and spiritually?",
      "What are your main sources of stress when navigating new or unfamiliar situations?",
      "Who do you turn to when things feel overwhelming or uncertain?",
      "What cultural practices, relationships, or routines help you stay grounded?",
      "What would it look like to ask for help before things get too difficult?",
    ]} />

    <P>When you're ready, continue to Lesson 4.2.</P>
  </div>
);

// ─── LESSON 4.2 ────────────────────────────────────────────────────────────────
const Lesson42 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 4.2 — Chapter 4: Real Talk</h1>
    <P>By Thursday morning, the rain had stopped, and the air felt cleaner and sharper, like it had rinsed something away.</P>
    <P>The Pathways crew loaded onto the bus again, quieter this time and more focused. Everyone knew today was career and mentorship day, the one with real panels and Q&As.</P>
    <P>Shayla had called it "Real Talk Thursday."</P>
    <P>In the cafeteria, tables were arranged in a big circle. At the front stood a banner that read "<Em>Pathways Week – Building Our Futures</Em>."</P>
    <P>Around the room, posters listed different paths: Trades. Health. Education. Business. Environmental Work. The Arts.</P>
    <P>Talia grabbed a muffin and found a seat beside Mariah and Devon.</P>
    <P>Across the room, they spotted a few of the college mentors they'd met earlier in the week.</P>
    <P>Shayla tapped the microphone.</P>
    <P>"Good morning, everyone. Today is about real conversations. You're going to hear from people who were exactly where you are — unsure, curious, maybe a little scared — and who figured it out. Not perfectly. But enough to keep going."</P>
    <P>The first speaker was a woman in her late twenties named Kezia, who had grown up in a northern community and was now finishing a nursing degree.</P>
    <P>"I failed my first semester," she said simply. "I didn't know how to ask for help. I thought asking meant I didn't belong here. I almost quit."</P>
    <P>She paused.</P>
    <P>"Then I walked into the Indigenous Student Centre and someone sat with me for two hours and helped me figure out what went wrong. That's it. That's all it took."</P>
    <P>The room was quiet.</P>
    <P>Devon leaned over to Talia. "She said that like it was easy."</P>
    <P>"I think it was hard," Talia said. "But she did it anyway."</P>
    <P>The next speaker was an older man named Marcus, who had returned to school at forty-two to study environmental science after years working in resource extraction.</P>
    <P>"I was the oldest person in most of my classes," he said. "But I also had the most experience. I knew things the younger students didn't. That was worth something."</P>
    <P>He talked about how his community had supported him financially and emotionally, and how he planned to bring what he learned back home to support land stewardship.</P>
    <P>"Education isn't just for you," he said. "It's for your community too."</P>
    <P>After the panel, they broke into small groups with mentors to talk about specific paths.</P>
    <P>Talia ended up in a group with a mentor named Dani, who was in her second year of social work.</P>
    <P>"What are you thinking about?" Dani asked.</P>
    <P>"I don't know yet," Talia said honestly. "I like working with people. I like solving problems. But I don't know what that looks like as a job."</P>
    <P>Dani nodded. "That's actually a really good place to start. Most people come in thinking they know exactly what they want and then change their mind twice. Knowing what you value is more useful than knowing the job title."</P>
    <P>Talia wrote that down.</P>
    <P>At the end of the day, Shayla gave each student a small card that said:</P>
    <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded text-center">
      <p className="font-bold text-gray-800">"Who will you ask next time you need help?"</p>
    </div>
    <P>On the bus ride back, Devon flipped the card in his hand.</P>
    <P>"Feels weird thinking about asking people for stuff," he said.</P>
    <P>Mariah laughed. "It's not weird. It's just learning who's in your corner."</P>
    <P>Talia smiled, watching the trees blur by.</P>
    <P>She wrote in her notebook: <Em>Mentorship = Someone in your corner.</Em></P>
  </div>
);

// ─── LESSON 4.3 ────────────────────────────────────────────────────────────────
const Lesson43 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 4.3 — Activities & Tools: Wellness, Coping & Support</h1>
    <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
      <p className="font-bold text-green-800 mb-2">🌿 Module Activities</p>
      <P>Wellness is an essential part of any learning journey. These activities help learners reflect on balance, emotional safety, cultural grounding, and the supports that keep them steady through challenges and transitions:</P>
    </div>

    <H3>Stress & Wellness Check-In</H3>
    <P>This activity invites you to pause and notice how you're feeling emotionally, mentally, physically, and spiritually. It helps you identify early signs of stress and reflect on what is supporting your wellness today, so you can stay grounded and connected.</P>
    <p className="mb-4"><ActivityLink href="/activities/10">Open this Activity</ActivityLink></p>

    <H3>Coping Strategies Planner</H3>
    <P>This activity guides you in creating your own personal coping toolkit. You explore what stress looks like in your body, what helps you feel calm or grounded, and build a clear plan you can use whenever things feel overwhelming.</P>
    <p className="mb-4"><ActivityLink href="/activities/11">Open this Activity</ActivityLink></p>

    <H3>Who I Reach Out To: Support Pathway</H3>
    <P>This activity helps you map the people, programs, and community supports you can turn to for academic, emotional, cultural, and practical help. It strengthens help-seeking skills and reminds you that you don't have to walk this journey alone.</P>
    <p className="mb-4"><ActivityLink href="/activities/12">Open this Activity</ActivityLink></p>

    <P>When you are ready, continue to <Bold>Module 5</Bold>.</P>
  </div>
);

// ─── LESSON 5.1 ────────────────────────────────────────────────────────────────
const Lesson51 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 5.1 — Module Overview</h1>
    <H2>Welcome to Module 5: Moving Forward With Purpose</H2>
    <P>Reaching the end of a transition journey brings reflection, clarity, and planning. For First Nations learners, "moving forward" might mean returning home with new confidence, applying to a program, upgrading, entering a trade, or simply understanding their needs more clearly. No step is too small — the goal is to move forward with intention.</P>
    <P>This final module helps you connect everything you've learned throughout the program and imagine the next steps that feel right for you.</P>
    <P><Bold>In this module, you will explore:</Bold></P>
    <UL>
      <LI>The feelings that come with finishing a transition experience</LI>
      <LI>Talia's final day in <Em>Chapter 5: The Way Back</Em></LI>
      <LI>How to build a realistic next-steps plan</LI>
      <LI>Identifying barriers and solutions</LI>
      <LI>Making a personal commitment to your learning journey</LI>
    </UL>

    <H3>🎥 Video for This Module</H3>
    <P><Bold>Unpacking the Indigenous Student Experience | Matthew Provost</Bold></P>
    <P>Matthew Provost shares his experience navigating post-secondary systems while challenging the colonial structures that shape them. In this talk, Matthew reflects on resilience, advocacy, and the idea of "blooming" through growth, even when circumstances are difficult. His message offers an honest and powerful lens on navigating two worlds within education.</P>
    <VideoEmbed url="https://www.youtube.com/embed/2JmAlnEo27A" title="Unpacking the Indigenous Student Experience | Matthew Provost" />

    <H3>📚 Story Chapter Covered</H3>
    <P>This module includes:</P>
    <UL><LI><Bold>Chapter 5: The Way Back</Bold></LI></UL>
    <P>You will read this chapter in the next lesson.</P>

    <ReflectionBox questions={[
      "How do you feel as you reach this stage of your own learning journey?",
      "What have you learned about yourself throughout the earlier modules?",
      "What goals feel possible for you right now as you look ahead?",
      "What supports will you need moving forward to stay grounded and confident?",
      "How do you balance the different roles, responsibilities, and environments in your life?",
    ]} />

    <P>Continue to Lesson 5.2 when you're ready.</P>
  </div>
);

// ─── LESSON 5.2 ────────────────────────────────────────────────────────────────
const Lesson52 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 5.2 — Chapter 5: The Way Back</h1>
    <P>Friday came quietly. The sky was finally clear, and the morning sun made everything look new, even the bus waiting outside.</P>
    <P>Inside the hotel, the group packed their bags, checking under beds and between pillows for missing chargers and socks. The hallway buzzed with laughter that sounded softer now, less nervous and more familiar.</P>
    <P>Talia zipped her suitcase and sat for a second, looking at the notebook she'd filled all week.</P>
    <P>Her notebook was filled with small truths she'd collected over the week:</P>
    <div className="my-4 p-4 bg-amber-50 border border-amber-200 rounded space-y-1">
      <p className="text-gray-700 italic">• Small steps still count.</p>
      <p className="text-gray-700 italic">• Being nervous doesn't mean you're not ready.</p>
      <p className="text-gray-700 italic">• You don't have to carry everything alone.</p>
      <p className="text-gray-700 italic">• Your story matters, even the parts you're still figuring out.</p>
      <p className="text-gray-700 italic">• Being independent doesn't mean being alone.</p>
      <p className="text-gray-700 italic">• Your future doesn't have to look like anyone else's.</p>
      <p className="text-gray-700 italic">• Strength looks different on different days.</p>
      <p className="text-gray-700 italic">• Pay attention to the moments that feel good — they're clues.</p>
    </div>
    <P>She hadn't realized how much she'd written until now.</P>
    <P>On the bus, Mariah rested her head against the window, earbuds in, humming along to a song. Devon leaned over the seat ahead, talking with someone about applying for trades school.</P>
    <P>The ride to campus felt shorter this time, like the city was smaller now that they knew where things were.</P>
    <P>When they arrived, Shayla was waiting outside the Indigenous Student Space, holding a stack of envelopes.</P>
    <P>"Good morning, Pathways crew," she said. "You made it to the last day. Before we do our closing circle, we're going to talk about something important: what happens next."</P>
    <P>They gathered in the circle room. The scent of sage lingered softly from a smudge someone had lit earlier. The windows were open, and sunlight cut across the floor.</P>
    <P>Shayla passed each of them an envelope.</P>
    <P>"Inside," she said, "is your <Em>Pathways Commitment Card</Em>. It's not homework. It's a reminder of what you've learned and what you want to carry forward. You'll write a note to yourself, seal it, and we'll mail it to you at the start of next school year."</P>
    <P>Everyone looked down at their envelope, quiet for a moment.</P>
    <P>Then an Elder, Aunty Mae, spoke up. "This week was about finding your strength. But don't forget, your strength started before you came here. You're just learning to see it."</P>
    <P>She smiled. "When you go home, don't think of it as going back to where you started. You're bringing something new home… your confidence, your questions, your hope."</P>
    <P>They went around the circle, each sharing one thing they'd learned.</P>
    <P>Devon said, "That I don't have to have it all figured out yet."</P>
    <P>Mariah said, "That asking for help isn't weak."</P>
    <P>Talia thought for a long time, then said, "That maybe… I belong in places I didn't think I did."</P>
    <P>The group nodded.</P>
    <P>Later, they ate lunch together for the last time — sandwiches, fruit, chips.</P>
    <P>People traded phone numbers, followed each other on Instagram, and promised to visit next summer.</P>
    <P>One of the older learners exchanged contact information with a mentor about upgrading math next semester. Another took extra brochures for a friend back home who was thinking about returning to school. Even at the end of the week, possibilities kept opening.</P>
    <P>Before they boarded the bus home, Shayla handed each student a small pouch with a cedar sprig and a card inside. It read:</P>
    <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded text-center">
      <p className="font-bold text-gray-800">"You are the bridge — between where you come from and where you're going."</p>
    </div>
    <P>As the bus pulled onto the highway, Talia watched the campus fade behind them.</P>
    <P>She thought about her aunt's kitchen, the kids running through the hall, the smell of bannock in the oven. She imagined telling them about the trip, about meeting Aunty Mae and Shayla, and about learning that belonging comes from how you feel, but that the right places can help that feeling grow.</P>
    <P>The sun hung low as they crossed the river.</P>
    <P>She glanced at the older learners on the bus and wondered what they were taking home with them too. Starting over, starting late, or starting again all mattered. Everyone on that bus was meant to be here.</P>
    <P>She opened her notebook one last time and wrote:</P>
    <div className="my-4 p-4 bg-amber-50 border border-amber-200 rounded text-center">
      <p className="text-gray-700 italic font-medium">I handled this week. I can handle what comes next.</p>
    </div>
    <P>She closed the notebook and leaned back, already thinking about how she'd make sense of all this once she was home.</P>
  </div>
);

// ─── LESSON 5.3 ────────────────────────────────────────────────────────────────
const Lesson53 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Lesson 5.3 — Activities & Tools: Planning Your Pathway</h1>
    <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
      <p className="font-bold text-green-800 mb-2">Module Activities</p>
      <P>This final set of activities invites you to pause, look ahead, and reflect deeply on the purpose, challenges, and strengths shaping your next steps. It encourages you to consider where you're going, what you need, and who will walk with you as you move forward.</P>
    </div>

    <H3>My Next Step Plan</H3>
    <P>This activity helps you choose one direction you want to move toward (e.g., education, training, work, wellness, or personal growth) and break it into small, realistic actions. It supports clarity by helping you understand why this step matters and how to move forward with confidence.</P>
    <p className="mb-4"><ActivityLink href="/activities/13">Open this Activity</ActivityLink></p>

    <H3>Barriers & Solutions Builder</H3>
    <P>This activity guides you in identifying the barriers that may affect your journey and exploring real, practical solutions. You reflect on your strengths, the supports around you, and the small steps you can take to move past challenges in a grounded and empowering way.</P>
    <p className="mb-4"><ActivityLink href="/activities/14">Open this Activity</ActivityLink></p>

    <H3>Commitment Card / Letter to Myself</H3>
    <P>This activity invites you to write a message to your future self — a reminder of your strength, your goals, and the path you're choosing to walk. It helps you carry forward encouragement, intention, and personal commitments as you move into your next chapter.</P>
    <p className="mb-4"><ActivityLink href="/activities/15">Open this Activity</ActivityLink></p>

    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded text-center">
      <p className="text-gray-700 leading-relaxed">
        Thank you for taking the time to reflect on your journey. Every step you've explored in this program belongs to you, and your efforts to learn, grow, and prepare for what comes next truly matter. We hope the tools and activities you've used continue to support you as you move forward.
      </p>
    </div>
  </div>
);

// ─── FOUNDATION: EDUCATOR ACCOUNTABILITY ──────────────────────────────────────
const Lesson61 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Educator Accountability</h1>
    <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
      <p className="font-bold text-amber-800 mb-2">Beyond the Training</p>
      <P>This section challenges educators to move beyond initial learning and remain accountable for the First Nations students they serve. Accountability is not a one-time commitment — it is an ongoing practice that requires reflection, action, and a willingness to be uncomfortable.</P>
    </div>

    <H2>What Does Accountability Look Like?</H2>
    <P>Accountability in education means more than attending a workshop or completing a training module. It means consistently showing up for First Nations students in ways that are meaningful, culturally grounded, and responsive to their lived realities. It means examining your own practices, biases, and assumptions — and being willing to change.</P>
    <P>True accountability asks educators to consider: Am I creating space for Indigenous knowledge and ways of knowing in my classroom? Am I listening to the students and families I serve? Am I advocating for systemic change, or am I simply checking boxes?</P>

    <H2>Reflection Prompts for Educators</H2>
    <UL>
      <LI>What assumptions do I hold about First Nations learners, and where did those assumptions come from?</LI>
      <LI>How do I currently incorporate Indigenous perspectives into my teaching practice — and is it meaningful or performative?</LI>
      <LI>When was the last time I sought feedback from First Nations students or families about my approach?</LI>
      <LI>What systemic barriers exist in my institution, and what am I doing to challenge them?</LI>
      <LI>How do I respond when I make a mistake or cause harm, even unintentionally?</LI>
      <LI>Am I willing to share power and decision-making with Indigenous colleagues and community members?</LI>
    </UL>

    <H2>Actionable Next Steps</H2>
    <P>After completing this program, consider the following commitments you can make to sustain your accountability:</P>
    <UL>
      <LI>Schedule regular check-ins with First Nations students to understand their evolving needs</LI>
      <LI>Build relationships with local First Nations communities and education authorities</LI>
      <LI>Advocate for policy changes that remove barriers for Indigenous learners</LI>
      <LI>Engage in ongoing professional development focused on Indigenous education</LI>
      <LI>Create a personal accountability plan with specific, measurable goals</LI>
      <LI>Establish a peer accountability group with colleagues committed to the same work</LI>
    </UL>

    <H2>The Long View</H2>
    <P>Accountability is not about perfection. It is about persistence. It is about showing up again tomorrow, even when today was difficult. First Nations students deserve educators who are committed to their success — not just during a program, but throughout their entire educational journey.</P>

    <ReflectionBox questions={[
      "What is one concrete action I will take this week to better support First Nations learners?",
      "Who in my professional network can I partner with to strengthen my accountability?",
      "How will I measure my own progress in becoming a more culturally responsive educator?",
      "What does long-term commitment to this work look like for me personally?",
    ]} />
  </div>
);

// ─── FOUNDATION: COMMUNITY ENGAGEMENT STRATEGIES ──────────────────────────────
const Lesson62 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Community Engagement Strategies</h1>
    <div className="bg-green-50 border border-green-200 rounded p-4 mb-6">
      <p className="font-bold text-green-800 mb-2">Building Authentic Partnerships</p>
      <P>This section provides practical strategies for educators to engage meaningfully with local First Nations communities. It encourages embracing Indigenous pedagogy and moving beyond surface-level support toward genuine collaboration.</P>
    </div>

    <H2>Why Community Engagement Matters</H2>
    <P>Effective support for First Nations learners does not happen in isolation. It requires genuine relationships between educators, communities, families, and learners. When educators engage authentically with First Nations communities, they gain deeper understanding of the values, histories, and aspirations that shape each learner's journey.</P>
    <P>Community engagement is not about extracting knowledge or adding Indigenous content to existing curricula. It is about building reciprocal relationships where both educators and communities contribute to and benefit from the partnership.</P>

    <H2>Embracing Indigenous Pedagogy</H2>
    <P>Indigenous pedagogy is rooted in relational learning, storytelling, land-based education, and holistic approaches to knowledge. Educators can begin to embrace these approaches by:</P>
    <UL>
      <LI>Inviting Elders and Knowledge Keepers into learning spaces as teachers and guides</LI>
      <LI>Incorporating land-based learning opportunities that connect students to place and environment</LI>
      <LI>Using story and narrative as primary teaching methods alongside conventional approaches</LI>
      <LI>Recognizing that learning happens in circles, in community, and through experience — not only in classrooms</LI>
      <LI>Valuing oral traditions and experiential knowledge alongside written and academic forms</LI>
    </UL>

    <H2>Collaboration Between Education Providers</H2>
    <P>First Nations education providers and provincial or public education providers can strengthen outcomes for learners by working together. Practical strategies for collaboration include:</P>
    <UL>
      <LI>Pooling resources to co-develop programs that reflect both Indigenous and provincial learning outcomes</LI>
      <LI>Establishing regular communication channels — such as joint committees or liaison roles — to coordinate supports</LI>
      <LI>Co-hosting orientation events, family engagement nights, or transition workshops</LI>
      <LI>Sharing data (with appropriate consent and protocols) to identify gaps and track student progress</LI>
      <LI>Jointly determining what supports students need and how to deliver them effectively</LI>
      <LI>Creating shared spaces where First Nations and non-Indigenous educators can learn from each other</LI>
    </UL>

    <H2>Practical Steps to Get Started</H2>
    <UL>
      <LI>Reach out to the nearest First Nations education authority or band council to introduce yourself and your role</LI>
      <LI>Attend community events with an open mind and a willingness to listen</LI>
      <LI>Ask how your institution can better serve First Nations students — and then act on what you hear</LI>
      <LI>Learn about the specific Nations, treaties, and histories relevant to your region</LI>
      <LI>Offer your skills and resources in ways that are helpful, not prescriptive</LI>
    </UL>

    <ReflectionBox questions={[
      "What First Nations communities are near my institution, and what do I know about them?",
      "How can I move from surface-level acknowledgment to meaningful engagement?",
      "What barriers exist in my institution that prevent genuine collaboration with First Nations communities?",
      "How can I ensure that engagement is reciprocal and not extractive?",
    ]} />
  </div>
);

// ─── FOUNDATION: DISABILITIES & ACCOMMODATIONS ────────────────────────────────
const Lesson63 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Disabilities & Accommodations</h1>
    <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
      <p className="font-bold text-blue-800 mb-2">Understanding Your Rights and Supports</p>
      <P>This section covers learning disabilities and accommodations in post-secondary settings. Whether you are a learner navigating these systems for the first time or an educator supporting students, this information will help you understand the processes, rights, and resources available.</P>
    </div>

    <H2>IEPs and Psycho-Educational Assessments</H2>
    <P>An Individual Education Plan (IEP) is a document that outlines the specific learning needs, goals, and accommodations for a student with a disability. In elementary and secondary school, IEPs are created by school teams in collaboration with families. When transitioning to post-secondary, the IEP itself does not transfer — but the information it contains can be valuable in establishing new supports.</P>
    <P>A psycho-educational assessment is a formal evaluation conducted by a registered psychologist that identifies specific learning disabilities, cognitive strengths, and areas of need. Many post-secondary disability services offices require a recent psycho-educational assessment to provide accommodations. If you had one done in high school, request a copy. If you need a new one, your post-secondary institution or community health services may be able to help.</P>

    <H2>How to Self-Identify with a Disability Services Office</H2>
    <P>At most colleges and universities, you need to register with the disability services office (sometimes called accessibility services or student accessibility) to receive accommodations. Here is how the process typically works:</P>
    <UL>
      <LI>Contact the disability services office early — ideally before classes begin</LI>
      <LI>Bring any documentation you have: psycho-educational assessments, IEPs, medical records, or letters from health professionals</LI>
      <LI>Meet with an accessibility advisor who will review your documentation and discuss your needs</LI>
      <LI>Work together to create an accommodation plan tailored to your specific situation</LI>
      <LI>Your information is kept confidential — professors are only told what accommodations you need, not your diagnosis</LI>
    </UL>

    <H2>Common Accommodations Available</H2>
    <P>Post-secondary institutions offer a range of accommodations to support students with disabilities. These may include:</P>
    <UL>
      <LI>Extended time on exams (typically 1.5x or 2x the standard time)</LI>
      <LI>Access to a laptop or computer for exams and note-taking</LI>
      <LI>A quiet or private space for writing exams</LI>
      <LI>Note-taking services or permission to record lectures</LI>
      <LI>Assistive technology such as text-to-speech software or screen readers</LI>
      <LI>Flexible deadlines or alternative assignment formats when appropriate</LI>
      <LI>Priority seating in classrooms</LI>
      <LI>Reduced course load without affecting full-time status for funding purposes</LI>
    </UL>

    <H2>Who to Contact</H2>
    <P>Every post-secondary institution has a disability services or accessibility office. To find yours:</P>
    <UL>
      <LI>Search your institution's website for "accessibility services" or "disability services"</LI>
      <LI>Call the main student services number and ask to be connected</LI>
      <LI>Visit the student services centre on campus — they can direct you</LI>
      <LI>Ask your academic advisor or Indigenous student services office for a referral</LI>
    </UL>
    <P>You do not need to have everything figured out before reaching out. The accessibility team is there to help you navigate the process.</P>

    <ReflectionBox questions={[
      "Do I have any documentation of learning needs from previous schools that I should bring forward?",
      "What accommodations have helped me in the past, and what new ones might I need?",
      "Who can I reach out to at my institution to start the accommodation process?",
      "How can I advocate for myself while also accepting support from others?",
    ]} />
  </div>
);

// ─── FOUNDATION: BUDGETING & FINANCIAL LITERACY ───────────────────────────────
const Lesson64 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Budgeting & Financial Literacy</h1>
    <div className="bg-purple-50 border border-purple-200 rounded p-4 mb-6">
      <p className="font-bold text-purple-800 mb-2">Managing Money at Post-Secondary</p>
      <P>This section covers the basics of budgeting, understanding credit, and practical tips for making your money last through a semester. Financial literacy is a life skill that supports your independence and reduces stress during your education journey.</P>
    </div>

    <H2>The Basics of Budgeting</H2>
    <P>A budget is simply a plan for your money. It helps you understand what is coming in (income) and what is going out (expenses) so you can make informed decisions. Creating a budget does not mean you cannot enjoy yourself — it means you are in control of your choices.</P>
    <H3>Income Sources</H3>
    <P>Your income might come from several places:</P>
    <UL>
      <LI>Band funding or sponsorship for education</LI>
      <LI>Bursaries, scholarships, or grants</LI>
      <LI>Part-time employment</LI>
      <LI>OSAP or other student loans</LI>
      <LI>Family support</LI>
    </UL>
    <H3>Common Expenses</H3>
    <P>Typical expenses for post-secondary students include:</P>
    <UL>
      <LI>Rent and utilities</LI>
      <LI>Groceries and food</LI>
      <LI>Transportation (bus pass, gas, car maintenance)</LI>
      <LI>Textbooks and school supplies</LI>
      <LI>Phone and internet</LI>
      <LI>Personal items and clothing</LI>
      <LI>Social activities and entertainment</LI>
    </UL>

    <H2>Understanding Credit Cards</H2>
    <P>Credit card companies often target new post-secondary students with offers that seem attractive. It is important to understand how credit works before signing up:</P>
    <UL>
      <LI>A credit card is not free money — it is a loan that must be repaid, often with high interest rates (19-25%)</LI>
      <LI>If you only make the minimum payment each month, you will pay far more than the original purchase price over time</LI>
      <LI>Late payments can damage your credit score, which affects your ability to rent an apartment, get a phone plan, or borrow money in the future</LI>
      <LI>If you do use a credit card, try to pay the full balance every month</LI>
    </UL>
    <H3>Using Credit Responsibly</H3>
    <UL>
      <LI>Only charge what you can afford to pay off that month</LI>
      <LI>Set up automatic payments to avoid late fees</LI>
      <LI>Keep your credit utilization low (try to use less than 30% of your limit)</LI>
      <LI>Review your statements regularly for errors or unauthorized charges</LI>
      <LI>If you are struggling with debt, contact your institution's financial aid office — they can help</LI>
    </UL>

    <H2>Practical Tips for Making Money Last</H2>
    <UL>
      <LI>Cook at home as much as possible — meal prepping saves time and money</LI>
      <LI>Buy used textbooks or check if digital versions are available through the library</LI>
      <LI>Take advantage of student discounts (many stores, services, and transit systems offer them)</LI>
      <LI>Track your spending for one month to see where your money actually goes</LI>
      <LI>Set aside a small emergency fund, even if it is just $20 per pay period</LI>
      <LI>Avoid impulse purchases — wait 24 hours before buying something you did not plan for</LI>
      <LI>Use free campus resources: gyms, counselling, tutoring, food banks, and events with free meals</LI>
    </UL>

    <ReflectionBox questions={[
      "What are my main sources of income this semester, and are they reliable?",
      "What are my biggest expenses, and are there any I could reduce?",
      "Have I been approached about credit cards, and do I understand the risks?",
      "What is one small financial habit I can start this week?",
    ]} />
  </div>
);

// ─── FOUNDATION: FINDING FUNDING ──────────────────────────────────────────────
const Lesson65 = () => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Finding Funding: Building Your Bursary Basket</h1>
    <div className="bg-teal-50 border border-teal-200 rounded p-4 mb-6">
      <p className="font-bold text-teal-800 mb-2">There Is Money Available</p>
      <P>Many students do not realize how much funding is available to support their education. This section helps you understand the different types of funding, where to find opportunities, and how to prepare strong applications.</P>
    </div>

    <H2>Understanding the Types of Funding</H2>
    <P>Not all funding is the same. Here are the main types you should know about:</P>
    <UL>
      <LI><Bold>Bursaries</Bold> — Financial awards based on need. You do not have to pay them back. Many are specifically available for Indigenous students.</LI>
      <LI><Bold>Scholarships</Bold> — Awards based on academic achievement, community involvement, leadership, or other criteria. Also do not need to be repaid.</LI>
      <LI><Bold>Grants</Bold> — Funding provided by governments, organizations, or institutions for specific purposes. Usually need-based and non-repayable.</LI>
      <LI><Bold>Band Funding</Bold> — Many First Nations provide education funding through Post-Secondary Student Support Programs (PSSSP). Contact your band office or education department to learn about eligibility and application processes.</LI>
      <LI><Bold>Student Loans</Bold> — Government loans (such as OSAP in Ontario) that must be repaid after graduation. Interest rates are typically lower than credit cards.</LI>
    </UL>

    <H2>Where to Find Opportunities</H2>
    <UL>
      <LI>Your institution's financial aid or awards office — they maintain databases of available funding</LI>
      <LI>Indigenous student services at your college or university</LI>
      <LI>Indspire (indspire.ca) — a leading Indigenous organization that offers bursaries and scholarships</LI>
      <LI>Your band or tribal council education department</LI>
      <LI>Provincial and federal government websites</LI>
      <LI>Community organizations, friendship centres, and Indigenous professional associations</LI>
      <LI>Online scholarship databases such as ScholarshipsCanada.com or yconic.com</LI>
    </UL>

    <H2>Preparing Your Application</H2>
    <P>Most funding applications require some or all of the following documents. Start gathering them early:</P>
    <H3>Personal Statement or Letter of Intent</H3>
    <P>This is your chance to tell your story. Write about who you are, where you come from, what you are studying, and why it matters to you. Be honest and specific. Reviewers want to hear your voice, not a formal essay.</P>
    <H3>Transcripts</H3>
    <P>Request official transcripts from your current or previous schools. Some applications accept unofficial copies, but it is good to have official ones ready.</P>
    <H3>References</H3>
    <P>Choose people who know you well and can speak to your character, work ethic, or community involvement. Give them plenty of notice and share information about what the funding is for.</P>
    <H3>Proof of Indigenous Identity</H3>
    <P>Some funding requires proof of First Nations, Métis, or Inuit identity. This may include a status card, band membership letter, or community verification.</P>

    <H2>Tips for Strong Applications</H2>
    <UL>
      <LI>Apply to as many opportunities as you qualify for — do not limit yourself</LI>
      <LI>Read the eligibility criteria carefully and tailor each application</LI>
      <LI>Start early and keep track of deadlines in a calendar or spreadsheet</LI>
      <LI>Ask someone you trust to review your personal statement before submitting</LI>
      <LI>Save copies of everything you submit so you can reuse and adapt materials</LI>
      <LI>If you are not selected, do not be discouraged — apply again next cycle</LI>
    </UL>

    <ReflectionBox questions={[
      "What types of funding am I currently receiving, and are there gaps I could fill?",
      "Have I contacted my band office or education department about available supports?",
      "Do I have a personal statement drafted that I can adapt for different applications?",
      "What is one funding opportunity I can research and apply for this month?",
    ]} />
  </div>
);

// ─── CONTENT MAP ───────────────────────────────────────────────────────────────
const LESSON_CONTENT_MAP: Record<string, React.ReactNode> = {
  "before-you-begin-context-for-the-path-forward": <BeforeYouBegin />,
  "lesson-1-1-module-overview": <Lesson11 />,
  "lesson-1-2-preface-chapter-1-the-road-out": <Lesson12 />,
  "lesson-1-3-activities-tools-readiness-and-supports": <Lesson13 />,
  "lesson-2-1-module-overview": <Lesson21 />,
  "lesson-2-2-chapter-2-the-first-day": <Lesson22 />,
  "lesson-2-3-activities-tools-belonging-and-identity": <Lesson23 />,
  "lesson-3-1-module-overview": <Lesson31 />,
  "lesson-3-2-chapter-3-the-middle-space-2": <Lesson32 />,
  "lesson-3-3-activities-tools-life-skills-and-independence": <Lesson33 />,
  "lesson-4-1-module-overview": <Lesson41 />,
  "lesson-4-2-chapter-4-real-talk": <Lesson42 />,
  "lesson-4-3-activities-tools-wellness-coping-support": <Lesson43 />,
  "lesson-5-1-module-overview": <Lesson51 />,
  "lesson-5-2-chapter-5-the-way-back": <Lesson52 />,
  "lesson-5-3-activities-tools-planning-your-pathway": <Lesson53 />,
  "lesson-6-1-educator-accountability": <Lesson61 />,
  "lesson-6-2-community-engagement-strategies": <Lesson62 />,
  "lesson-6-3-disabilities-and-accommodations": <Lesson63 />,
  "lesson-6-4-budgeting-and-financial-literacy": <Lesson64 />,
  "lesson-6-5-finding-funding": <Lesson65 />,
};

export function getLessonContent(slug: string): React.ReactNode {
  return LESSON_CONTENT_MAP[slug] || (
    <div className="text-gray-500 italic">Content not found for this lesson.</div>
  );
}
