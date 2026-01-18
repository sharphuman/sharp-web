# Sharp Recruit Website - Layout & UX Redesign Prompt

## Project Overview

I need help reformatting the layout and UX of my Sharp Recruit landing page. **All existing copy and text must be preserved exactly** - we're only improving the visual layout, spacing, hierarchy, and user experience.

---

## Current Tech Stack

- **HTML5** - Static single-page site
- **Tailwind CSS** - Via CDN (`https://cdn.tailwindcss.com`)
- **Vanilla JavaScript** - Embedded in HTML
- **Font**: Nunito (Google Fonts) - weights 400, 500, 600, 700, 800
- **Hosting**: Cloudflare Pages
- **No build step** - Everything is inline/embedded

---

## Current Color Palette (Keep These)

| Color | Hex | Usage |
|-------|-----|-------|
| Pink (Primary) | `#ec4899` | Buttons, gradients, accents |
| Purple | `#a855f7` | Gradient highlights |
| Dark Background | `#1a1a1a` | Body background |
| Card Background | `rgba(10,10,10,0.85)` | Cards with backdrop blur |
| Text Primary | `#ffffff` | Headlines, important text |
| Text Secondary | `#9ca3af` (gray-400) | Body text, descriptions |
| Text Muted | `#6b7280` (gray-500) | Subtle text, captions |
| Green | `#10b981` | Success/checkmarks |
| Yellow | `#fbbf24` | Warnings/stars |

---

## Current Page Sections (In Order)

### 1. Navigation (Fixed)
- Logo + "Sharp Recruit" brand name
- Links: How It Works, Interview Analyzer, Pricing, Compare, Blog
- CTA Button: "Start Free"
- Mobile hamburger menu

### 2. Hero Section
**Headline:** "Hiring decisions you can actually explain."
**Subheadline:** "AI recruiting intelligence that scores interviews, screens CVs, and tells you exactly what to do next. Built from 25 years of technical hiring experience."
**CTAs:** "Start Free" (primary) + "See an Analysis" (secondary)
**Trust line:** "7-Day Free Trial · No credit card · Cancel anytime"

### 3. Done-For-You Services Section
**Section Title:** "Done-For-You AI Solutions"
**Section Subtitle:** "25 years of tech consulting across all industries. Not ready to DIY? Our team handles your AI strategy, implementation, marketing, and custom solutions while you focus on growth."

6 service cards:
1. Custom Sharp Recruit Implementation
2. AI Marketing Strategy
3. Cold Email Outreach
4. META Advertising
5. SEO & Content Strategy
6. AI Readiness Audit

**Expert Box:** "Expert Implementation Partner" + founder expertise description
**CTA:** "Book A Call" (Calendly integration)

### 4. Positive Framing (Short Section)
**Copy:** "Good hiring isn't magic. It's asking the right questions, catching the real signals, and knowing what matters for the role. Sharp Recruit makes that framework visible — so you can see the reasoning, trust the outcome, and move faster."

### 5. How It Works (The Flow)
**Section Title:** "Intelligence that follows the candidate."
**Subtitle:** "From JD to offer, nothing disappears. Every insight stays attached."

4 steps with numbered timeline:
1. **JD Writer** - "You talk. It writes." + description
2. **CV Screener** - "Fast signal, clear reasoning." + description
3. **Interview Analyzer** (FLAGSHIP badge) - "Evidence you can cite." + description
4. **Pipeline** - "No dead ends." + description

### 6. Interview Analyzer Deep Dive
**Section Title:** "Interview Analyzer" (Flagship badge)
**Subtitle:** "Six-pillar scoring. Quote-backed evidence. Decision frameworks that make sense."

Six pillar badges: Technical, Communication, Problem-Solving, Culture Fit, Leadership, Domain Knowledge

"Every analysis includes:" box with 4 items:
- Scores with evidence (green check)
- Hire If / Pass If (green check)
- Red & yellow flags (yellow warning)
- Follow-up questions (blue question mark)

**CTA:** "Analyze an Interview — Free"

### 7. Not An ATS Section
**Headline:** "This isn't another ATS."
**Copy:** "Sharp Recruit is an intelligence layer. It works alongside whatever you already use..."

3 small cards: "Sits alongside", "No migration", "Shows its work"

### 8. Use Cases Section
**Section Title:** "Real scenarios. Real results."

4 use case cards:
1. Agency Recruiter
2. Hiring Manager
3. Technical Recruiter
4. Small Agency

Each with: Challenge, How Sharp Recruit Helps, Result

### 9. Testimonials Section
**Section Title:** "Trusted by recruiters who value evidence"

4 testimonial cards with: Avatar initial, Name, Role, Quote, 5-star rating

### 10. Trust Indicators Section
**Headline:** "Built for trust"

3 metric cards: "100% Transparent", "GDPR Compliant", "0 Data Sales"

### 11. Pricing Section
**Headline:** "Honest pricing. The 25/250 rule."
**Subtitle:** "10x capacity at each tier. No games."

3 pricing tiers:
- **Free** ($0): 25 CV screens, 5 interviews, unlimited JDs
- **Solo** ($25/mo, POPULAR): 250 CV screens, 25 interviews, unlimited JDs
- **Elite** ($250/mo): 2,500 CV screens, 250 interviews, 5 users

### 12. Founder Section
**Headline:** "Built from 25 Years of Tech Expertise"
4 paragraphs about founder's perspective and why Sharp Recruit is different

### 13. FAQ Section
**Title:** "Questions people actually ask"
11 FAQ items (accordion-style cards)

### 14. Contact Form Section
**Title:** "Get In Touch"
Fields: Name, Email, Company, Message
Cloudflare Turnstile CAPTCHA
Submit button

### 15. Final CTA Section
**Headline:** "See the evidence. Make the call."
**Subtitle:** "Start with a free interview analysis. You'll know in 2 minutes if this is for you."
**CTA:** "Start Free"

### 16. Footer
Logo, navigation links, legal links, copyright

---

## ALL COPY/TEXT TO PRESERVE

### Hero
```
Hiring decisions you can actually explain.

AI recruiting intelligence that scores interviews, screens CVs, and tells you exactly what to do next. Built from 25 years of technical hiring experience.

7-Day Free Trial · No credit card · Cancel anytime
```

### Done-For-You Services
```
Done-For-You AI Solutions

25 years of tech consulting across all industries. Not ready to DIY? Our team handles your AI strategy, implementation, marketing, and custom solutions while you focus on growth.

Custom Sharp Recruit Implementation
White-glove implementation and training for Sharp Recruit. We customize workflows, integrate with your existing systems, and train your team.

AI Marketing Strategy
Comprehensive AI marketing audit and strategy. We analyze your current approach, identify opportunities, and build a roadmap for AI-powered growth.

Cold Email Outreach
AI-powered sequences that get responses. We write, send, and optimize your outreach campaigns using proven AI techniques.

META Advertising
AI-optimized Facebook & Instagram campaigns. We handle creative, targeting, and optimization to maximize your ad spend ROI.

SEO & Content Strategy
AI-powered content creation and SEO strategy. We help you rank higher, attract more traffic, and convert visitors into customers.

AI Readiness Audit
Comprehensive audit of your business for AI opportunities. We identify quick wins, long-term strategies, and create an actionable implementation roadmap.

Expert Implementation Partner
25 years of tech consulting and technical hiring across enterprise, SMB, and startups. Built Sharp Recruit from the hiring manager perspective — understanding the pain points of evaluating technical talent. Experience spans all industries and IT niches including infrastructure, security, cloud, DevOps, SaaS, and AI implementation.

Let's discuss your project →
```

### Positive Framing
```
Good hiring isn't magic. It's asking the right questions, catching the real signals, and knowing what matters for the role. Sharp Recruit makes that framework visible — so you can see the reasoning, trust the outcome, and move faster.
```

### How It Works
```
How It Works
Intelligence that follows the candidate.
From JD to offer, nothing disappears. Every insight stays attached.

1. JD Writer
You talk. It writes.
Describe the role however you want — bullet points, notes, a voice memo transcript. Get a job description that reflects the actual job, not HR template nonsense.

2. CV Screener
Fast signal, clear reasoning.
Upload CVs against your JD. Get a ranked shortlist with explanations — not just "85% match" but why they match. Make confident hiring decisions faster.

3. Interview Analyzer (FLAGSHIP)
Evidence you can cite.
Upload a transcript. Get multi-pillar scoring backed by exact quotes from the interview. This is where Sharp Recruit earns its name.

4. Pipeline
No dead ends.
Drag candidates through stages. Screening scores, interview analysis, notes — all visible at every step. When you're ready to decide, everything's there.
```

### Interview Analyzer
```
Flagship
Interview Analyzer
Six-pillar scoring. Quote-backed evidence. Decision frameworks that make sense.

Six Pillars: Technical, Communication, Problem-Solving, Culture Fit, Leadership, Domain Knowledge

Every analysis includes:

✓ Scores with evidence
Not just "7/10" — the exact quote that earned that score. You can verify it yourself.

✓ Hire If / Pass If
Clear logic: "Hire if you need senior leadership. Pass if immediate hands-on is critical."

⚠ Red & yellow flags
Deflections, inconsistencies, gaps — surfaced with the evidence, not hunches.

? Follow-up questions
What to dig into next. Ranked by importance.

This is the framework that works for evaluating technical talent. Now it's documented, shareable, and consistent.
```

### Not An ATS
```
This isn't another ATS.
Sharp Recruit is an intelligence layer. It works alongside whatever you already use — your ATS, your spreadsheets, your process. We make decisions better. We don't replace your workflow.

Sits alongside - Your tools, your way
No migration - Start in 2 minutes
Shows its work - No black box AI
```

### Use Cases
```
How It's Used
Real scenarios. Real results.
See how recruiters and hiring managers use Sharp Recruit to make better decisions faster.

1. Agency Recruiter
The Challenge: Screening 50+ CVs per role, need to shortlist fast without missing strong candidates.
How Sharp Recruit Helps: Upload CVs against the JD. Get a ranked shortlist with clear explanations. Make confident hiring decisions in minutes, not hours.
Result: 3x faster shortlisting, better candidate quality

2. Hiring Manager
The Challenge: Conducted 8 interviews, need to compare candidates objectively and justify decisions to leadership.
How Sharp Recruit Helps: Upload interview transcripts. Get six-pillar scores with exact quotes. Clear Hire If / Pass If logic you can present to stakeholders.
Result: Evidence-based decisions, faster consensus

3. Technical Recruiter
The Challenge: Need to assess technical skills from interviews, but not a developer yourself.
How Sharp Recruit Helps: Interview Analyzer scores technical competency with supporting quotes. See exactly what signals the technical strength (or weakness).
Result: Confident technical assessments without technical background

4. Small Agency
The Challenge: Limited budget, need to compete with larger agencies on quality and speed.
How Sharp Recruit Helps: $25/mo gets you enterprise-quality analysis. Every recruiter on your team makes better decisions, faster. Pipeline keeps all insights attached.
Result: Level playing field, better margins
```

### Testimonials
```
What Recruiters Say
Trusted by recruiters who value evidence
See how Sharp Recruit helps teams make better hiring decisions.

Sarah M. - Agency Recruiter
"I used to spend hours screening CVs. Now I upload them, get a ranked list with explanations, and I can actually justify my shortlist to clients. The quote-backed scoring is a game changer."

James K. - Hiring Manager
"The Interview Analyzer saved me so much time. Instead of trying to remember what each candidate said, I have the exact quotes. Makes it easy to compare and present to my team."

Maria L. - Technical Recruiter
"I'm not a developer, but I need to assess technical skills. Sharp Recruit shows me exactly what signals technical strength — I can have confident conversations with hiring managers now."

David R. - Small Agency Owner
"For $25/month, I get enterprise-quality analysis. My whole team makes better decisions. It's like having expert evaluation on every candidate, but at scale."
```

### Trust Indicators
```
Built for trust
Transparency, security, and compliance you can count on.

100% Transparent - Every score shows the exact quote behind it
GDPR Compliant - EU & AU Privacy Act ready
0 Data Sales - We never sell your data
```

### Pricing
```
Pricing
Honest pricing. The 25/250 rule.
10x capacity at each tier. No games.

Free - For trying it on real work - $0
✓ 25 CV screens/month
✓ 5 interview analyses/month
✓ Unlimited JDs
✓ Pipeline access
If that's enough, stay here. Seriously.

Solo (POPULAR) - For individuals who hire regularly - $25/mo
✓ 250 CV screens/month
✓ 25 interview analyses/month
✓ Unlimited JDs
✓ Full pipeline

Elite - For teams - $250/mo
✓ 2,500 CV screens/month
✓ 250 interview analyses/month
✓ 5 team members
✓ Priority support
```

### Founder Section
```
Built from 25 Years of Tech Expertise

Most recruiting tools are built by recruiters, for recruiters. Sharp Recruit is different.

It's built by someone who's spent 25 years hiring technical talent — seeing what works and what doesn't from the other side of the table. Someone who's wasted countless hours on unqualified candidates and vague recruiter feedback.

Sharp Recruit analyzes interviews with the rigor you'd expect from a technical evaluation. It catches the red flags. It gives you the evidence trail you need to confidently say yes or no.

Because at the end of the day, you're not just filling a role. You're building a team. And that requires evidence, not gut feel.

— Founder, Sharp Human
```

### FAQ (All Questions)
```
Questions people actually ask

What does Interview Analyzer actually do?
You upload a transcript. Sharp Recruit scores it across six pillars — technical, communication, problem-solving, culture fit, leadership, domain knowledge. Every score comes with the exact quote that supports it. Plus Hire If / Pass If logic, flags, and follow-up questions.

Is this trying to replace my ATS?
No. Sharp Recruit sits alongside whatever you already use. We make decisions better, not replace your workflow.

What's the catch with the free trial?
No catch. 7-day free trial with 5 CV screens, 2 interview analyses, unlimited JDs. No credit card required. Try it risk-free.

Is my data safe?
Yes. GDPR and AU Privacy Act compliant. We don't sell data. You control what's stored.

Why should I trust the analysis?
Because you can see the work. Every score links to a quote. If you disagree, you know exactly why the AI thought what it thought.

Can I cancel anytime?
Yes. No contracts. Cancel in one click.

How accurate is the analysis?
The analysis is based on the content you provide. It's designed to surface signals and patterns that indicate candidate quality. You always have the final say — the AI shows its reasoning so you can verify it.

Can I export my data?
Yes. You can export all your analyses, CV screenings, and pipeline data at any time. Your data belongs to you.

What file formats do you support?
CVs: PDF, DOC, DOCX. Interview transcripts: Text, PDF, or paste directly. Job descriptions: Any text format.

Do you integrate with my ATS?
Sharp Recruit works alongside your ATS. You can export analyses and import them, or use our pipeline. We're not trying to replace what you already use.

What languages are supported?
Currently optimized for English. We're working on additional language support based on user demand.
```

### Contact Section
```
Get In Touch
Ready to transform your hiring process? Let's talk.
```

### Final CTA
```
See the evidence. Make the call.
Start with a free interview analysis. You'll know in 2 minutes if this is for you.
```

### Footer
```
GDPR & AU Privacy ready · Evidence-based AI · Built for people who hire
© 2025 Sharp Human. All rights reserved.
```

---

## Current Design Issues to Address

1. **Background**: Currently using a large fixed logo watermark (logo1-3.png at 150% size, 0.7 opacity) that may overwhelm content
2. **Section spacing**: Some sections may feel cramped or inconsistently spaced
3. **Visual hierarchy**: Hero could have stronger visual impact
4. **Card layouts**: The services grid (6 cards) and use cases (4 cards) could be more visually engaging
5. **Timeline/How It Works**: The numbered flow could be more visually dynamic
6. **Mobile responsiveness**: Needs review for optimal mobile experience

---

## What I Want Improved

1. **Layout & Spacing**: Better visual rhythm between sections, consistent padding/margins
2. **Visual Hierarchy**: Clear focal points, better use of whitespace
3. **Card Design**: More visually appealing cards that don't all look the same
4. **Responsive Design**: Ensure excellent mobile experience
5. **Micro-interactions**: Subtle hover effects, smooth transitions
6. **Section Differentiation**: Make each section feel distinct while cohesive
7. **CTA Prominence**: Make call-to-action buttons stand out more effectively

---

## Important Technical Constraints

1. **Keep Tailwind CSS** (via CDN)
2. **Keep Nunito font**
3. **Keep the color palette** (pink/purple gradients on dark background)
4. **Preserve all JavaScript functionality** (contact form, Turnstile, mobile menu, Calendly)
5. **Keep SEO elements** (meta tags, structured data, canonical URLs)
6. **Keep accessibility features** (skip links, ARIA labels, semantic HTML)
7. **No build tools** - everything stays inline/CDN-based

---

## External Links & Assets

- **App URL**: https://recruit.sharphuman.com
- **Blog URL**: https://sharphuman.com/blog
- **Calendly**: https://calendly.com/sharphuman/60min
- **Logo**: ./logo1-3.png
- **Contact API**: https://api.sharphuman.com/api/contact
- **Turnstile Sitekey**: 0x4AAAAAACM1uSSbLeft9zy7

---

## Deliverable

Please redesign the layout and UX of this landing page while:
1. Keeping ALL existing copy/text exactly as provided
2. Keeping the tech stack (Tailwind CDN, Nunito, vanilla JS)
3. Keeping the color scheme
4. Preserving all functionality
5. Improving visual hierarchy, spacing, and overall UX
6. Making it more engaging and professional

Focus on layout, spacing, visual hierarchy, and micro-interactions - not content changes.
