import { Routes } from '@angular/router'
import { ProjectsComponent } from './features/projects/projects.component'
import { HomeLandingComponent } from './features/home-landing/home-landing.component'
import { BlogComponent } from './features/blog/blog.component'
import { ContactComponent } from './features/contact/contact.component'
import { PublicationsComponent } from './features/publications/publications.component'
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
    path: 'publications',
    title: 'Publications',
    component: PublicationsComponent,
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
