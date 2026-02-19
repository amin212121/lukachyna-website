import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'

gsap.registerPlugin(ScrollTrigger)

type SectionType = 'lead' | 'paragraph' | 'h2' | 'h3' | 'code' | 'quote' | 'callout' | 'list'

interface ContentSection {
  type: SectionType
  text?: string
  language?: string
  items?: string[]
}

interface BlogPostFull {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: number
  date: string
  tags: string[]
  sections: ContentSection[]
}

@Component({
  selector: 'ly-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
})
export class BlogPostComponent implements OnInit, AfterViewInit {
  readProgress = 0
  post: BlogPostFull | null = null
  notFound = false

  get otherPosts(): BlogPostFull[] {
    return this.posts.filter(p => p.slug !== this.post?.slug).slice(0, 3)
  }

  readonly posts: BlogPostFull[] = [
    {
      slug: 'ga4-nextjs-spa-referral-tracking',
      title: 'Connecting GA4 to Next.js SPAs Without Breaking Referral Tracking',
      excerpt:
        'After countless hours debugging ghost traffic and lost attribution, I found a pattern that works reliably across dynamic route changes in single-page apps.',
      category: 'Tech',
      readTime: 8,
      date: 'Jan 15, 2025',
      tags: ['Next.js', 'Analytics', 'GA4'],
      sections: [
        {
          type: 'lead',
          text: "After countless hours debugging ghost traffic and lost attribution in production, I finally found a reliable pattern for GA4 in Next.js SPAs. This isn't about installing gtag.js — it's about understanding why SPA routing silently breaks referral data and exactly what to do about it.",
        },
        { type: 'h2', text: 'The Problem: Referral Attribution in SPAs' },
        {
          type: 'paragraph',
          text: "In a traditional multi-page application, every navigation triggers a full page load. The browser sends a new request, the referrer header is set automatically, and analytics platforms intercept this at the network level. It's simple, automatic, and essentially invisible.",
        },
        {
          type: 'paragraph',
          text: "Single-page applications break this completely. When a user navigates from /blog to /contact in a Next.js app, no new document request fires. The router intercepts the click, pushes a history entry, and re-renders the component tree in JavaScript. GA4's page_view tracking — if you're using the standard gtag snippet — fires once on initial load and never again.",
        },
        { type: 'h2', text: 'Why the Standard Setup Fails' },
        {
          type: 'paragraph',
          text: "The most common approach is adding GA4 as a Script in _app.tsx and firing a page_view event on route changes by listening to the Next.js router. This works for page view counting — but it silently corrupts referral data in two specific scenarios.",
        },
        {
          type: 'list',
          items: [
            'A user arrives from an external source (Google, Twitter, newsletter) and immediately navigates to a second page. The referral is attributed to the landing page, not the acquisition source.',
            "A user lands directly on a deep-linked page. The referrer is correctly captured on load, but subsequent route changes lose the original referrer context entirely.",
          ],
        },
        {
          type: 'code',
          language: 'typescript',
          text: `// ❌ The broken pattern — avoid this
useEffect(() => {
  const handleRouteChange = (url: string) => {
    gtag('event', 'page_view', {
      page_path: url,
      // No referrer tracking — GA4 loses attribution context
    });
  };

  router.events.on('routeChangeComplete', handleRouteChange);
  return () => router.events.off('routeChangeComplete', handleRouteChange);
}, [router.events]);`,
        },
        { type: 'h2', text: 'The Fix: Session-Scoped Referrer Storage' },
        {
          type: 'paragraph',
          text: 'The key insight is that referral information should be captured once — at the session boundary — and associated with all subsequent events in that session. We can replicate this intent using sessionStorage as a lightweight bridge.',
        },
        {
          type: 'callout',
          text: "Treat document.referrer as sacred. Capture it before anything else runs, store it in sessionStorage, and pass it with every page_view event for the lifetime of that session.",
        },
        {
          type: 'code',
          language: 'typescript',
          text: `// lib/analytics.ts
export function initReferrerTracking(): void {
  if (sessionStorage.getItem('analytics_referrer')) return;

  sessionStorage.setItem(
    'analytics_referrer',
    document.referrer || 'direct'
  );
  sessionStorage.setItem(
    'analytics_landing_page',
    window.location.pathname
  );
}

export function trackPageView(path: string): void {
  const referrer = sessionStorage.getItem('analytics_referrer') ?? 'direct';
  const landingPage = sessionStorage.getItem('analytics_landing_page') ?? path;

  gtag('event', 'page_view', {
    page_path: path,
    page_referrer: referrer,
    session_landing_page: landingPage,
  });
}`,
        },
        {
          type: 'code',
          language: 'typescript',
          text: `// pages/_app.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initReferrerTracking, trackPageView } from '@/lib/analytics';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    initReferrerTracking();         // capture referrer first
    trackPageView(router.asPath);  // track initial view

    const onRouteChange = (url: string) => trackPageView(url);
    router.events.on('routeChangeComplete', onRouteChange);
    return () => router.events.off('routeChangeComplete', onRouteChange);
  }, []);

  return <Component {...pageProps} />;
}`,
        },
        { type: 'h2', text: 'Handling Edge Cases' },
        {
          type: 'paragraph',
          text: 'Browser privacy features (Firefox ETP, Safari ITP) will strip the referrer for cross-origin navigations. In these cases, document.referrer will be empty even when the user came from an external source. For campaign tracking, complement this pattern with UTM parameter persistence — stored in sessionStorage at first load and attached to all subsequent events.',
        },
        { type: 'h2', text: 'Results After Deploying' },
        {
          type: 'paragraph',
          text: 'After deploying this pattern across three production Next.js applications, direct traffic dropped by 31–45%, with the difference correctly redistributed to organic search, social referrals, and email campaigns. Attribution accuracy improved dramatically, making conversion analysis meaningful again.',
        },
        { type: 'h2', text: 'Key Takeaways' },
        {
          type: 'list',
          items: [
            'Capture document.referrer once per session, not on every route change.',
            'Use sessionStorage as a bridge between page load and subsequent SPA navigation events.',
            'Complement with UTM parameter persistence for campaign tracking.',
            'Test specifically for the deep-link scenario: user lands on /blog/post and then navigates elsewhere.',
            'Consider GA4 Measurement Protocol as a server-side fallback for critical conversion events.',
          ],
        },
      ],
    },
    {
      slug: 'architecture-interview-senior-frontend',
      title: 'The Architecture Interview: What Senior Frontend Engineers Actually Know',
      excerpt:
        'Most candidates can explain React hooks. Fewer can articulate trade-offs in state colocation, bundle splitting, or data-fetching strategies under pressure.',
      category: 'Career',
      readTime: 12,
      date: 'Dec 3, 2024',
      tags: ['Career', 'Architecture', 'Interviews'],
      sections: [
        {
          type: 'lead',
          text: "I've been on both sides of the frontend architecture interview. The questions that actually reveal seniority aren't about syntax or API surface — they're about trade-offs, failure modes, and the ability to reason under constraints.",
        },
        { type: 'h2', text: 'What Most Candidates Get Right' },
        {
          type: 'paragraph',
          text: "Most senior candidates can explain component composition, hooks, and basic performance patterns. They know what memoization does, can describe the virtual DOM, and have a mental model of how state flows through a React application. This is table stakes.",
        },
        { type: 'h2', text: 'The Questions That Actually Differentiate' },
        {
          type: 'paragraph',
          text: 'The questions that reveal genuine seniority involve architectural trade-offs with real constraints. "When would you not use React Query?" is more revealing than "What is React Query?" because it forces the candidate to articulate failure modes, not just features.',
        },
        {
          type: 'list',
          items: [
            'Given a team of 8 engineers and a codebase with 400+ components, how would you enforce consistent data-fetching patterns without a linting rule?',
            'Your app has 40% of users on 3G in Southeast Asia. What architectural decisions change because of this constraint?',
            "You've just taken over a codebase where every component fetches its own data. What's your phased migration path?",
          ],
        },
        { type: 'h2', text: 'State Colocation: A Reliable Signal' },
        {
          type: 'paragraph',
          text: "How a candidate thinks about state colocation reveals a lot about their mental model of React. The principle is simple — state should live as close as possible to where it's consumed. The execution is where judgment matters.",
        },
        {
          type: 'callout',
          text: "The right question is not \"where does this state belong?\" but \"what is the lifetime and ownership of this data?\" State owned by one user action should never outlive that action.",
        },
        { type: 'h2', text: 'Practical Preparation' },
        {
          type: 'paragraph',
          text: "If you're preparing for a senior frontend role, practice explaining architectural decisions you've made — including the ones that turned out to be wrong. The ability to articulate what you'd do differently, and why, is a strong positive signal in any architecture interview.",
        },
      ],
    },
    {
      slug: 'teaching-react-100-students',
      title: 'From Zero to Hero: Teaching React to 100+ Students',
      excerpt:
        'What I learned about explaining mental models, debugging live in front of an audience, and designing exercises that actually build lasting intuition.',
      category: 'Education',
      readTime: 6,
      date: 'Nov 20, 2024',
      tags: ['React', 'Teaching', 'Education'],
      sections: [
        {
          type: 'lead',
          text: "Teaching React to 100+ students across three cohorts taught me more about the framework than building with it did. Explaining things to beginners forces you to question every assumption, and their confusion is almost always a signal of a genuinely unclear concept.",
        },
        { type: 'h2', text: 'The Mental Model Problem' },
        {
          type: 'paragraph',
          text: 'The biggest barrier is the mental model. Students who try to understand React as "HTML with JavaScript" get confused immediately. The students who progress fastest are the ones who embrace the component-as-function model early: a component is a function, state triggers re-renders, the UI is a snapshot of state.',
        },
        { type: 'h2', text: 'Debugging Live Is a Superpower' },
        {
          type: 'paragraph',
          text: "Live coding mistakes in front of students turned out to be among the most valuable teaching moments. When you make an error, then reason through it visibly — checking the console, re-reading the code, forming and testing hypotheses — you're demonstrating the actual skill of debugging, not just the happy path.",
        },
        {
          type: 'callout',
          text: "Students don't need to see perfect code. They need to see how an experienced engineer thinks when the code isn't working.",
        },
        { type: 'h2', text: 'Exercises That Build Lasting Intuition' },
        {
          type: 'paragraph',
          text: 'The exercises that produced the most learning were the ones where students had to make architectural decisions and then defend them. Building a shopping cart from scratch with no guidance on state structure produced more learning than ten guided tutorials.',
        },
      ],
    },
    {
      slug: 'state-management-2025',
      title: 'State Management in 2025: Beyond Redux and Context',
      excerpt:
        'The landscape has shifted. Zustand, Jotai, TanStack Query — understanding when each pattern wins and when it creates complexity you never needed.',
      category: 'Tech',
      readTime: 10,
      date: 'Oct 8, 2024',
      tags: ['React', 'State', 'Architecture'],
      sections: [
        {
          type: 'lead',
          text: "The state management conversation has changed. Redux is no longer the default answer, Context is understood to have real performance limits, and a new generation of tools has made it genuinely easier to manage both client and server state. Here's how I think about the decision in 2025.",
        },
        { type: 'h2', text: 'The Core Distinction: Server vs. Client State' },
        {
          type: 'paragraph',
          text: 'The most important architectural decision is separating server state from client state. Server state — data that lives on a server and needs to be fetched, cached, and synchronized — should almost always be handled by a dedicated tool like TanStack Query or SWR. Client state — ephemeral UI state that does not persist — can often live in component-local state or Zustand.',
        },
        { type: 'h2', text: 'When Zustand Wins' },
        {
          type: 'paragraph',
          text: "Zustand wins when you need global client state with minimal boilerplate. Its store model is simpler than Redux and more explicit than Context, and it doesn't require a provider wrapper. For things like user preferences, shopping cart state, or UI mode toggles, Zustand is often the simplest correct answer.",
        },
        {
          type: 'code',
          language: 'typescript',
          text: `import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
}

const useCart = create<CartStore>((set) => ({
  items: [],
  add: (item) => set((state) => ({ items: [...state.items, item] })),
  remove: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),
}));`,
        },
        { type: 'h2', text: 'When Context Is Actually Fine' },
        {
          type: 'paragraph',
          text: 'Context is fine for low-frequency updates to large subtrees — things like theme, locale, or user authentication. The performance concerns with Context are real, but they only materialize when the context value changes frequently and there are many expensive components subscribed to it.',
        },
        {
          type: 'callout',
          text: 'The problem is never "Context is slow." The problem is using Context for high-frequency state that should be colocated or handled differently.',
        },
      ],
    },
    {
      slug: 'books-that-changed-how-i-think',
      title: "Clean Code Isn't Enough: The Books That Changed How I Think",
      excerpt:
        'Beyond Clean Code and SICP: a curated list of titles that rewired my approach to systems thinking, communication, and engineering philosophy.',
      category: 'Resources',
      readTime: 5,
      date: 'Sep 14, 2024',
      tags: ['Books', 'Learning'],
      sections: [
        {
          type: 'lead',
          text: "Clean Code and The Pragmatic Programmer are on every recommended list. They're there for good reason. But the books that actually changed how I think about engineering were less conventional — some aren't even about software.",
        },
        { type: 'h2', text: 'A Philosophy of Software Design' },
        {
          type: 'paragraph',
          text: "John Ousterhout's book made me rethink what \"clean code\" actually means. His argument that the primary goal of design is to reduce complexity — and that comments are not a failure of clarity but a necessary part of design — is one I've returned to many times.",
        },
        { type: 'h2', text: 'Thinking in Systems' },
        {
          type: 'paragraph',
          text: "Donella Meadows' systems thinking primer is not about software, but it's made me a better architect. The mental models for feedback loops, delays, and system boundaries apply directly to how I think about state management, caching, and distributed systems.",
        },
        { type: 'h2', text: "The Staff Engineer's Path" },
        {
          type: 'paragraph',
          text: "Tanya Reilly's book on staff-level engineering is the most practically useful thing I've read about technical leadership. The sections on writing good technical documents and the difference between organizational and technical influence changed how I work.",
        },
        { type: 'h2', text: 'Shape Up' },
        {
          type: 'paragraph',
          text: "Basecamp's approach to product development — with its fixed time / variable scope model and the concept of \"appetite\" rather than estimates — is controversial in some circles. I find it to be one of the most honest frameworks for managing uncertainty in software projects.",
        },
      ],
    },
    {
      slug: 'threejs-portfolio-lessons',
      title: 'Building a 3D Portfolio with Three.js: Lessons from the Deep End',
      excerpt:
        'GLTF imports, WebGL performance tuning, SSR compatibility — an honest account of every decision and dead-end encountered building this site.',
      category: 'Tech',
      readTime: 15,
      date: 'Aug 22, 2024',
      tags: ['Three.js', 'WebGL', 'Portfolio'],
      sections: [
        {
          type: 'lead',
          text: "Building the 3D character on this portfolio was the most technically challenging thing I've done in a frontend context. Here's what I wish I'd known before starting — the GLTF pipeline, WebGL performance, and how to make Three.js play nicely with Angular SSR.",
        },
        { type: 'h2', text: 'The GLTF Pipeline' },
        {
          type: 'paragraph',
          text: 'GLTF is the right format for web 3D — compact, fast-loading, with excellent Three.js support. But getting from Blender to a web-ready asset took longer than expected. The key steps: optimize geometry, bake textures, export with Draco compression, and validate with the glTF Viewer before integrating.',
        },
        { type: 'h2', text: 'The SSR Problem' },
        {
          type: 'paragraph',
          text: "Three.js depends on WebGL, which depends on a canvas element, which doesn't exist in Node.js. This means the LivingPortraitComponent had to be carefully isolated from the SSR render path. The solution: check isPlatformBrowser before initializing Three.js, and set a minimum height on the container to prevent layout shift.",
        },
        {
          type: 'code',
          language: 'typescript',
          text: `// Core pattern for Three.js + Angular SSR
ngAfterViewInit(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  // Safe to use WebGL here
  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  this.initScene();
  this.animate();
}`,
        },
        { type: 'h2', text: 'Performance: What Actually Matters' },
        {
          type: 'paragraph',
          text: 'The main performance levers for a Three.js portfolio scene: polygon count, texture resolution, draw calls, and animation complexity. The cartoon character was exported at ~18k polygons, uses a single 1024×1024 texture atlas, and runs at 60fps on mid-range mobile hardware.',
        },
        {
          type: 'callout',
          text: "Don't animate in a requestAnimationFrame loop if nothing is changing. Use a dirty flag to skip renders when the scene hasn't updated.",
        },
        { type: 'h2', text: "What I'd Do Differently" },
        {
          type: 'paragraph',
          text: "I'd start with a simpler model. The urge to use a highly-detailed character drove weeks of optimization work that a simpler low-poly model would have avoided entirely. For a portfolio piece, visual distinctiveness matters more than technical complexity.",
        },
      ],
    },
  ]

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug')
      const found = this.posts.find(p => p.slug === slug)
      this.post = found ?? null
      this.notFound = !found
    })
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    this.readProgress =
      scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return
    this.initAnimations()
  }

  private initAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })
    tl.from('.back-link', { opacity: 0, x: -16, duration: 0.45 })
      .from('.article-meta', { opacity: 0, y: -10, duration: 0.4 }, '-=0.2')
      .from('.article-title', { opacity: 0, y: 60, duration: 0.9, ease: 'power4.out' }, '-=0.3')
      .from('.article-hero__footer', { opacity: 0, y: 14, duration: 0.4 }, '-=0.35')

    gsap.from('.article-prose > *', {
      scrollTrigger: { trigger: '.article-prose', start: 'top 82%' },
      opacity: 0,
      y: 30,
      stagger: 0.06,
      duration: 0.6,
    })

    gsap.from('.author-bio', {
      scrollTrigger: { trigger: '.author-bio', start: 'top 85%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
    })

    gsap.from('.more-post-card', {
      scrollTrigger: { trigger: '.more-posts-grid', start: 'top 85%' },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
    })
  }
}