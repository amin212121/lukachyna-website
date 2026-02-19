import { Component, signal, computed } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '../../shared/pipes/translate.pipe'

export type ProjectCategory = 'all' | 'web-app' | 'tool' | 'oss'

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  tech: string[]
  category: Exclude<ProjectCategory, 'all'>
  live?: string
  github?: string
  featured?: boolean
  year: number
  accentColor: string
}

@Component({
  selector: 'ly-projects-page',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
})
export class ProjectsComponent {
  readonly filters: { label: string; value: ProjectCategory }[] = [
    { label: 'All', value: 'all' },
    { label: 'Web Apps', value: 'web-app' },
    { label: 'Tools', value: 'tool' },
    { label: 'Open Source', value: 'oss' },
  ]

  readonly activeFilter = signal<ProjectCategory>('all')

  readonly projects: Project[] = [
    {
      id: 1,
      title: 'Merka Commerce',
      subtitle: 'E-commerce Platform',
      description:
        'A high-performance storefront serving 200k+ monthly visitors with real-time inventory, personalised recommendations, and sub-second LCP. Built for scale at twnty Digital with a micro-frontend architecture.',
      tech: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind'],
      category: 'web-app',
      live: 'https://example.com',
      featured: true,
      year: 2024,
      accentColor: '#4facfe',
    },
    {
      id: 2,
      title: 'Archetype DS',
      subtitle: 'Design System & Component Library',
      description:
        '60+ production-ready primitives with dark-mode token support, Storybook-driven docs, and full TypeScript inference. Adopted across three internal products.',
      tech: ['React', 'TypeScript', 'Storybook', 'CSS Modules'],
      category: 'oss',
      github: 'https://github.com',
      year: 2023,
      accentColor: '#a78bfa',
    },
    {
      id: 3,
      title: 'Prism Dashboard',
      subtitle: 'Real-time Analytics UI',
      description:
        'Configurable analytics board with live WebSocket feeds, responsive D3.js visualisations, and a drag-and-drop layout engine. Handles 50k events per second.',
      tech: ['React', 'TypeScript', 'D3.js', 'WebSockets'],
      category: 'web-app',
      github: 'https://github.com',
      live: 'https://example.com',
      year: 2023,
      accentColor: '#34d399',
    },
    {
      id: 4,
      title: 'scaffold-cli',
      subtitle: 'Project Scaffolding Tool',
      description:
        'Zero-config CLI that bootstraps React and Next.js projects with opinionated structure, ESLint, Prettier, and husky hooks in under 10 seconds.',
      tech: ['Node.js', 'TypeScript', 'Commander.js'],
      category: 'tool',
      github: 'https://github.com',
      year: 2023,
      accentColor: '#fb923c',
    },
    {
      id: 5,
      title: 'arch.school',
      subtitle: 'Developer Education Platform',
      description:
        'Interactive platform for front-end architecture courses: live code sandbox, progress tracking, and community forums. 100+ active learners enrolled.',
      tech: ['Next.js', 'TypeScript', 'MDX', 'Supabase'],
      category: 'web-app',
      live: 'https://example.com',
      year: 2024,
      accentColor: '#f472b6',
    },
    {
      id: 6,
      title: 'tiny-i18n',
      subtitle: 'Internationalisation Library',
      description:
        '1.4 kB (gzip) i18n library for JavaScript with ICU-message-format pluralisation, lazy-loading, and full TypeScript inference on translation keys.',
      tech: ['TypeScript', 'Rollup', 'Vitest'],
      category: 'oss',
      github: 'https://github.com',
      year: 2022,
      accentColor: '#4facfe',
    },
    {
      id: 7,
      title: 'DevLens',
      subtitle: 'Chrome Extension',
      description:
        'Browser extension that surfaces component render counts, prop diffs, and state snapshots for React apps in production — React DevTools for the wild.',
      tech: ['TypeScript', 'React', 'Chrome APIs'],
      category: 'tool',
      github: 'https://github.com',
      year: 2022,
      accentColor: '#facc15',
    },
  ]

  readonly featuredProject = this.projects.find(p => p.featured)!

  readonly gridProjects = computed(() => {
    const filter = this.activeFilter()
    const rest = this.projects.filter(p => !p.featured)
    if (filter === 'all') return rest
    return rest.filter(p => p.category === filter)
  })

  setFilter(value: ProjectCategory): void {
    this.activeFilter.set(value)
  }

  padId(id: number): string {
    return id.toString().padStart(2, '0')
  }
}