import Vue from 'vue'
import VueRouter from 'vue-router'
import UploadFileView from '@/views/UploadFileView.vue'
import ManageFileView from '@/views/ManageFileView.vue'
import SearchKnowledgeView from '@/views/SearchKnowledgeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/uploadfile',
    name: 'uploadfile',
    component: UploadFileView
  },
  {
    path: '/managefile',
    name: 'managefile',
    component: ManageFileView
  },
  {
    path: '/search',
    name: 'searchKnowledge',
    component: SearchKnowledgeView
  }
  ,{
    path: '/',
    redirect: '/search'
  }
]

const router = new VueRouter({
  routes
})

export default router
