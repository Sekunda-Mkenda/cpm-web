import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/Authentication/LoginView.vue'
import SignupView from '@/views/Authentication/SignupView.vue'
import ProjectsView from '@/views/projects/_List.vue'
import ProjectTasksView from '@/views/projects/tasks/_List.vue'
// import ProjectTasksView from '@/views/products/categories/_List.vue'
import ServicesView from '@/views/Services/_List.vue'
import ServiceCategoriesView from '@/views/Services/Categories/_List.vue'
import ProductsView from '@/views/products/_List.vue'
import MembersView from '@/views/members/_List.vue'
import BasicChartView from '@/views/Charts/BasicChartView.vue'
import ECommerceView from '@/views/Dashboard/Dashboard.vue'
import FormElementsView from '@/views/Forms/FormElementsView.vue'
import FormLayoutView from '@/views/Forms/FormLayoutView.vue'
import SettingsView from '@/views/Pages/SettingsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TablesView from '@/views/TablesView.vue'
import AlertsView from '@/views/UiElements/AlertsView.vue'
import ButtonsView from '@/views/UiElements/ButtonsView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: ECommerceView,
    meta: {
      title: 'eCommerce Dashboard'
    }
  },
  // {
  //   path: '/projects',
  //   name: 'projects',
  //   component: ProjectsView,
  //   meta: {
  //     title: 'Project'
  //   }
  // },
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
    path: '/forms/form-elements',
    name: 'formElements',
    component: FormElementsView,
    meta: {
      title: 'Form Elements'
    }
  },
  {
    path: '/forms/form-layout',
    name: 'formLayout',
    component: FormLayoutView,
    meta: {
      title: 'Form Layout'
    }
  },
  {
    path: '/tables',
    name: 'tables',
    component: TablesView,
    meta: {
      title: 'Tables'
    }
  },
  {
    path: '/pages/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Settings'
    }
  },
  {
    path: '/charts/basic-chart',
    name: 'basicChart',
    component: BasicChartView,
    meta: {
      title: 'Basic Chart'
    }
  },
  {
    path: '/ui-elements/alerts',
    name: 'alerts',
    component: AlertsView,
    meta: {
      title: 'Alerts'
    }
  },
  {
    path: '/ui-elements/buttons',
    name: 'buttons',
    component: ButtonsView,
    meta: {
      title: 'Buttons'
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
  {
    path: '/auth/signup',
    name: 'signup',
    component: SignupView,
    meta: {
      title: 'Signup'
    }
  }
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

export default router
