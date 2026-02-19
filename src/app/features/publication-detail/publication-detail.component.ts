import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Publication {
  id: number
  year: string
  title: string
  authors: string
  type: 'journal' | 'conference'
  venue: string
  venueShort: string
  abstract: string
  keywords: string[]
  url?: string
}

@Component({
  selector: 'ly-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrl: './publication-detail.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class PublicationDetailComponent implements OnInit, AfterViewInit {
  publication: Publication | null = null
  notFound = false
  bibtexCopied = false

  get relatedPubs(): Publication[] {
    return this.publications.filter(p => p.id !== this.publication?.id)
  }

  get bibtexString(): string {
    if (!this.publication) return ''
    const p = this.publication
    const key = `lukachyna${p.year}${p.title.split(' ').slice(0, 2).join('').toLowerCase().replace(/[^a-z]/g, '')}`

    if (p.type === 'journal') {
      return `@article{${key},
  author  = {${p.authors}},
  title   = {{${p.title}}},
  journal = {${p.venue}},
  year    = {${p.year}}
}`
    } else {
      return `@inproceedings{${key},
  author    = {${p.authors}},
  title     = {{${p.title}}},
  booktitle = {${p.venue}},
  year      = {${p.year}}
}`
    }
  }

  readonly publications: Publication[] = [
    {
      id: 1,
      year: '2024',
      title: 'Performance Profiling and Optimization Strategies for Modern Single-Page Applications',
      authors: 'Lukachyna, S.',
      type: 'journal',
      venue: 'International Journal of Web Engineering and Technology',
      venueShort: 'IJWET · Vol. 19, No. 2',
      abstract:
        'Single-page applications have become the dominant paradigm for interactive web development, yet the tools and methodologies for systematic performance analysis remain fragmented. This paper presents a structured approach to profiling SPAs built with React, examining Core Web Vitals metrics, bundle composition analysis, and render-cycle optimization. A five-step profiling methodology is validated across six production applications, demonstrating average improvements of 34% in Largest Contentful Paint and 28% in Total Blocking Time.',
      keywords: ['SPA', 'Performance', 'React', 'Core Web Vitals', 'Bundle Analysis'],
    },
    {
      id: 2,
      year: '2023',
      title: 'Component-Driven Architecture: Scalability Patterns for Large React Codebases',
      authors: 'Lukachyna, S.',
      type: 'conference',
      venue: 'International Conference on Web Technologies and Applications',
      venueShort: 'ICWTA 2023 · Kyiv, Ukraine',
      abstract:
        'As React applications scale to hundreds of thousands of lines, ad-hoc component organization produces maintainability bottlenecks that reduce team velocity. This paper examines three architectural patterns — Feature-Sliced Design, domain-driven component hierarchies, and adapted atomic design — evaluating their impact on code navigation, testing overhead, and developer onboarding across teams of varying sizes.',
      keywords: ['React', 'Architecture', 'Component Design', 'Scalability', 'FSD'],
    },
    {
      id: 3,
      year: '2022',
      title: 'Tools for Management of Electronic Commerce Enterprises',
      authors: 'Lukachyna, S.',
      type: 'journal',
      venue: 'Herald of Uzhhorod University, Series: Economics',
      venueShort: 'UzhNU Economics · Issue 1(63)',
      abstract:
        'The paper examines the practical toolset for managing electronic commerce enterprises in the context of digital transformation. An analysis of existing management instruments is conducted, covering analytics platforms, CRM integrations, and performance monitoring systems. Recommendations are provided for selecting and implementing a coherent management information system tailored to the specific lifecycle stages of e-commerce businesses.',
      keywords: ['E-Commerce', 'Digital Management', 'Enterprise Tools', 'Analytics'],
      url: 'http://visnyk-ekon.uzhnu.edu.ua/article/view/303411',
    },
    {
      id: 4,
      year: '2021',
      title: 'Conceptual Principles of Management of Electronic Commerce Enterprises',
      authors: 'Lukachyna, S.',
      type: 'journal',
      venue: 'Herald of Uzhhorod University, Series: Economics',
      venueShort: 'UzhNU Economics · Issue 2(58)',
      abstract:
        'This paper establishes the conceptual and theoretical foundations for a systematic approach to managing electronic commerce enterprises. Drawing on contemporary management theory and digital economics, the study defines the structural components of an e-commerce management system and proposes a conceptual model applicable across various scales of online commercial activity.',
      keywords: ['E-Commerce', 'Management Theory', 'Digital Economics', 'Conceptual Model'],
      url: 'http://visnyk-ekon.uzhnu.edu.ua/article/view/278441',
    },
  ]

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      const found = this.publications.find(p => p.id === id)
      this.publication = found ?? null
      this.notFound = !found
    })
  }

  copyBibtex(): void {
    if (!isPlatformBrowser(this.platformId)) return
    navigator.clipboard.writeText(this.bibtexString).then(() => {
      this.bibtexCopied = true
      setTimeout(() => {
        this.bibtexCopied = false
      }, 2000)
    })
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return
    this.initAnimations()
  }

  private initAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 })

    tl.from('.back-link', { opacity: 0, x: -16, duration: 0.45 })
      .from('.pub-hero__eyebrow', { opacity: 0, y: -10, duration: 0.4 }, '-=0.2')
      .from('.pub-title', { opacity: 0, y: 60, duration: 0.9, ease: 'power4.out' }, '-=0.3')
      .from('.pub-hero__footer', { opacity: 0, y: 14, duration: 0.4 }, '-=0.35')

    gsap.from('.pub-section', {
      scrollTrigger: { trigger: '.pub-body', start: 'top 80%' },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.65,
    })

    gsap.from('.pub-cta', {
      scrollTrigger: { trigger: '.pub-cta', start: 'top 88%' },
      opacity: 0,
      y: 20,
      duration: 0.55,
    })

    gsap.from('.related-entry', {
      scrollTrigger: { trigger: '.related-list', start: 'top 85%' },
      opacity: 0,
      y: 25,
      stagger: 0.12,
      duration: 0.6,
    })
  }
}