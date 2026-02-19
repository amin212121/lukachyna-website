import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { RouterLink } from '@angular/router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: number
  date: string
  featured: boolean
  tags: string[]
}

@Component({
  selector: 'ly-blog-page',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
})
export class BlogComponent implements AfterViewInit {
  readonly posts: BlogPost[] = [
    {
      slug: 'ga4-nextjs-spa-referral-tracking',
      title: 'Connecting GA4 to Next.js SPAs Without Breaking Referral Tracking',
      excerpt:
        'After countless hours debugging ghost traffic and lost attribution, I found a pattern that works reliably across dynamic route changes in single-page apps.',
      category: 'Tech',
      readTime: 8,
      date: 'Jan 15, 2025',
      featured: true,
      tags: ['Next.js', 'Analytics', 'GA4'],
    },
    {
      slug: 'architecture-interview-senior-frontend',
      title: 'The Architecture Interview: What Senior Frontend Engineers Actually Know',
      excerpt:
        'Most candidates can explain React hooks. Fewer can articulate trade-offs in state colocation, bundle splitting, or data-fetching strategies under pressure.',
      category: 'Career',
      readTime: 12,
      date: 'Dec 3, 2024',
      featured: false,
      tags: ['Career', 'Architecture', 'Interviews'],
    },
    {
      slug: 'teaching-react-100-students',
      title: 'From Zero to Hero: Teaching React to 100+ Students',
      excerpt:
        'What I learned about explaining mental models, debugging live in front of an audience, and designing exercises that actually build lasting intuition.',
      category: 'Education',
      readTime: 6,
      date: 'Nov 20, 2024',
      featured: false,
      tags: ['React', 'Teaching', 'Education'],
    },
    {
      slug: 'state-management-2025',
      title: 'State Management in 2025: Beyond Redux and Context',
      excerpt:
        'The landscape has shifted. Zustand, Jotai, TanStack Query — understanding when each pattern wins and when it creates complexity you never needed.',
      category: 'Tech',
      readTime: 10,
      date: 'Oct 8, 2024',
      featured: false,
      tags: ['React', 'State', 'Architecture'],
    },
    {
      slug: 'books-that-changed-how-i-think',
      title: "Clean Code Isn't Enough: The Books That Changed How I Think",
      excerpt:
        'Beyond Clean Code and SICP: a curated list of titles that rewired my approach to systems thinking, communication, and engineering philosophy.',
      category: 'Resources',
      readTime: 5,
      date: 'Sep 14, 2024',
      featured: false,
      tags: ['Books', 'Learning'],
    },
    {
      slug: 'threejs-portfolio-lessons',
      title: 'Building a 3D Portfolio with Three.js: Lessons from the Deep End',
      excerpt:
        'GLTF imports, WebGL performance tuning, SSR compatibility — an honest account of every decision and dead-end encountered building this site.',
      category: 'Tech',
      readTime: 15,
      date: 'Aug 22, 2024',
      featured: false,
      tags: ['Three.js', 'WebGL', 'Portfolio'],
    },
  ]

  readonly categories = ['All', 'Tech', 'Career', 'Education', 'Resources']
  activeCategory = 'All'

  get featuredPost(): BlogPost {
    return this.posts.find(p => p.featured)!
  }

  get showFeatured(): boolean {
    return this.activeCategory === 'All'
  }

  get gridPosts(): BlogPost[] {
    if (this.activeCategory === 'All') {
      return this.posts.filter(p => !p.featured)
    }
    return this.posts.filter(p => p.category === this.activeCategory)
  }

  getCardNumber(index: number): string {
    const offset = this.activeCategory === 'All' ? 2 : 1
    return (index + offset).toString().padStart(2, '0')
  }

  setCategory(cat: string): void {
    this.activeCategory = cat
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return
    this.initAnimations()
  }

  private initAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })

    tl.from('.blog-header__eyebrow', { opacity: 0, y: -12, duration: 0.5 })
      .from(
        '.title-line',
        { opacity: 0, y: 80, stagger: 0.15, duration: 0.9, ease: 'power4.out' },
        '-=0.25',
      )
      .from('.blog-header__meta', { opacity: 0, y: 14, duration: 0.4 }, '-=0.35')
      .from('.filter-chip', { opacity: 0, y: 10, stagger: 0.07, duration: 0.4 }, '-=0.2')

    gsap.from('.featured-post', {
      scrollTrigger: { trigger: '.featured-post', start: 'top 80%' },
      opacity: 0,
      y: 50,
      duration: 0.9,
    })

    gsap.from('.post-card', {
      scrollTrigger: { trigger: '.posts-grid', start: 'top 78%' },
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.65,
    })
  }
}