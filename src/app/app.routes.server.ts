import { RenderMode, ServerRoute } from '@angular/ssr'

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { slug: 'ga4-nextjs-spa-referral-tracking' },
      { slug: 'architecture-interview-senior-frontend' },
      { slug: 'teaching-react-100-students' },
      { slug: 'state-management-2025' },
      { slug: 'books-that-changed-how-i-think' },
      { slug: 'threejs-portfolio-lessons' },
    ],
  },
  {
    path: 'publications/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
    ],
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
]