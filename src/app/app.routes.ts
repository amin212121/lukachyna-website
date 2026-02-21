import { Routes } from '@angular/router'
import { ProjectsComponent } from './features/projects/projects.component'
import { HomeLandingComponent } from './features/home-landing/home-landing.component'
import { BlogComponent } from './features/blog/blog.component'
import { BlogPostComponent } from './features/blog-post/blog-post.component'
import { ContactComponent } from './features/contact/contact.component'
import { PublicationsComponent } from './features/publications/publications.component'
import { PublicationDetailComponent } from './features/publication-detail/publication-detail.component'
import { CmsComponent } from './features/cms/cms.component'

export const routes: Routes = [
  {
    path: '',
    title: 'Lukachyna personal website',
    component: HomeLandingComponent,
  },
  {
    path: 'projects',
    title: 'Projects',
    component: ProjectsComponent,
  },
  {
    path: 'blog',
    title: 'Blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:slug',
    title: 'Blog Post',
    component: BlogPostComponent,
  },
  {
    path: 'publications',
    title: 'Publications',
    component: PublicationsComponent,
  },
  {
    path: 'publications/:id',
    title: 'Publication',
    component: PublicationDetailComponent,
  },
  {
    path: 'contact',
    title: 'Contact',
    component: ContactComponent,
  },
  {
    path: 'cms',
    title: 'CMS',
    component: CmsComponent,
  },
]