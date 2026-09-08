import { Routes } from '@angular/router'
import { ProjectsComponent } from './features/projects/projects.component'
import { HomeLandingComponent } from './features/home-landing/home-landing.component'
import { BlogComponent } from './features/blog/blog.component'
import { BlogPostComponent } from './features/blog-post/blog-post.component'
import { ContactComponent } from './features/contact/contact.component'
import { PublicationsComponent } from './features/publications/publications.component'
import { PublicationDetailComponent } from './features/publication-detail/publication-detail.component'
import { ServicesComponent } from './features/services/services.component'
import { TermsComponent } from './features/terms/terms.component'
import { PrivacyComponent } from './features/privacy/privacy.component'

// The /cms route is unpublished on purpose. LiqPay reviews a merchant site for
// "неактивних меню" — half-built sections — and CmsComponent is a single sentence
// promising a feature that does not exist. The component is still in the repo;
// restore the route once it does something.

export const routes: Routes = [
  {
    path: '',
    title: 'titles.home',
    component: HomeLandingComponent,
  },
  {
    path: 'services',
    title: 'titles.services',
    component: ServicesComponent,
  },
  {
    path: 'projects',
    title: 'titles.projects',
    component: ProjectsComponent,
  },
  {
    path: 'blog',
    title: 'titles.blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:slug',
    title: 'titles.blogPost',
    component: BlogPostComponent,
  },
  {
    path: 'publications',
    title: 'titles.publications',
    component: PublicationsComponent,
  },
  {
    path: 'publications/:id',
    title: 'titles.publication',
    component: PublicationDetailComponent,
  },
  {
    path: 'contact',
    title: 'titles.contact',
    component: ContactComponent,
  },
  {
    path: 'terms',
    title: 'titles.terms',
    component: TermsComponent,
  },
  {
    path: 'privacy',
    title: 'titles.privacy',
    component: PrivacyComponent,
  },
]
