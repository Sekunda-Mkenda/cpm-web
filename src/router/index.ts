import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/Authentication/LoginView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import ProjectsView from '@/views/projects/_List.vue'
import ProjectTasksView from '@/views/projects/tasks/_List.vue'
import ServicesView from '@/views/Services/_List.vue'
import ServiceCategoriesView from '@/views/Services/Categories/_List.vue'
import MembersView from '@/views/members/_List.vue'
import ECommerceView from '@/views/Dashboard/Dashboard.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useCookies } from '@vueuse/integrations/useCookies'

const token = useCookies()

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: ECommerceView,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/members',
    name: 'members',
    component: MembersView,
    meta: {
      title: 'Members '
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
    meta: {
      title: 'projects '
    }
  },
  {
    path: '/project/:id/tasks',
    name: 'ProjectTasksView',
    component: ProjectTasksView,
    meta: {
      title: 'Tasks'
    },
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: {
      title: 'Services '
    }
  },
  {
    path: '/services/categories',
    name: 'ServiceCategoriesView',
    component: ServiceCategoriesView,
    meta: {
      title: 'Categories'
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | CPM`
  next()
})

router.beforeEach((to, from, next) => {
  const accessToken = token.get('ACCESS_TOKEN_COOKIE')
  if ((to.name !== 'login' && to.name !== 'signup') && (accessToken === 'undefined' || accessToken == '')) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
