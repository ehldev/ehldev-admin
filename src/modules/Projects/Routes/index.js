import ProjectsView from "../ProjectsView.vue";
import ProjectsList from "../Pages/List.vue";
import ProjectsEditor from "../Pages/Editor.vue";

const routes = [
  {
    path: '/projects',
    component: ProjectsView,
    children: [
      {
        path: '',
        name: 'projects-list',
        component: ProjectsList
      },
      // {
      //   path: '/load-products',
      //   name: 'load-products',
      //   component: LoadProducts
      // },
      // {
      //   path: '/update-stock',
      //   name: 'update-stock',
      //   component: UpdateStock
      // },
      // {
      //   path: '/update-prices',
      //   name: 'update-prices',
      //   component: UpdatePrices
      // },
      {
        path: 'create',
        name: 'projects-create',
        component: ProjectsEditor
      },
      {
        path: 'edit/:slug',
        name: 'projects-edit',
        component: ProjectsEditor
      },
      // {
      //   path: 'products/:id/edit',
      //   name: 'products-edit',
      //   component: ProductEditor
      // }
    ]
  },
]

export default routes
