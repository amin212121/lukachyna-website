import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { RouterLink } from '@angular/router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LivingPortraitComponent } from '../../core/components/living-portrait/living-portrait.component'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'

gsap.registerPlugin(ScrollTrigger)

@Component({
  templateUrl: './home-landing.component.html',
  styleUrl: './home-landing.component.scss',
  imports: [LivingPortraitComponent, RouterLink, TranslatePipe],
  standalone: true,
})
export class HomeLandingComponent implements AfterViewInit {
  readonly skills = [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'React', level: 'Expert' },
    { name: 'Next.js', level: 'Expert' },
    { name: 'CSS / SCSS', level: 'Advanced' },
    { name: 'HTML5', level: 'Advanced' },
    { name: 'Performance Optimization', level: 'Advanced' },
    { name: 'Frontend Architecture', level: 'Advanced' },
    { name: 'Testing', level: 'Proficient' },
    { name: 'Git', level: 'Proficient' },
    { name: 'Webpack / Vite', level: 'Intermediate' },
    { name: 'PHP', level: 'Intermediate' },
    { name: 'Shopware', level: 'Advanced' },
    { name: 'WordPress', level: 'Intermediate' },
    { name: 'Claude Code', level: 'Intermediate' },
    { name: 'Node.js', level: 'Basic' },
    { name: 'Angular', level: 'Basic' },
  ]

  private readonly techStack = [
    'React',
    'TypeScript',
    'Next.js',
    'Angular',
    'Node.js',
    'CSS/SCSS',
    'Jest',
    'Webpack',
    'Vite',
    'Git',
    'JavaScript',
    'HTML5',
    'PHP',
    'Shopware',
    'WordPress',
    'Claude Code',
  ]

  // Tripled for seamless CSS marquee loop
  readonly marqueeItems = [...this.techStack, ...this.techStack, ...this.techStack]

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return
    this.initAnimations()
  }

  private initAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })

    tl.from('.hero__eyebrow', { opacity: 0, y: -12, duration: 0.6 })
      .from('.hero__name', { opacity: 0, y: 70, duration: 0.9, ease: 'power4.out' }, '-=0.2')
      .from('.hero__role', { opacity: 0, x: -24, duration: 0.5 }, '-=0.55')
      .from('.hero__bio', { opacity: 0, y: 18, duration: 0.5 }, '-=0.3')
      .from('.hero__cta', { opacity: 0, y: 18, duration: 0.5 }, '-=0.2')
      .from('.hero__metrics', { opacity: 0, y: 18, duration: 0.5 }, '-=0.2')
      .from('.hero__visual', { opacity: 0, x: 50, duration: 1.0, ease: 'power4.out' }, 0.2)
      .from('.scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.4')

    gsap.from('.expertise-card', {
      scrollTrigger: { trigger: '.expertise', start: 'top 75%' },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.7,
    })

    gsap.from('.skill-chip', {
      scrollTrigger: { trigger: '.skills-section', start: 'top 75%' },
      opacity: 0,
      scale: 0.88,
      stagger: 0.04,
      duration: 0.4,
    })

    gsap.from('.statement__text', {
      scrollTrigger: { trigger: '.statement', start: 'top 70%' },
      opacity: 0,
      y: 30,
      duration: 0.9,
    })

    gsap.from('.connect__inner', {
      scrollTrigger: { trigger: '.connect', start: 'top 75%' },
      opacity: 0,
      y: 40,
      duration: 0.9,
    })
  }
}
