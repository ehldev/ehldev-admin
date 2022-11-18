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
        component: ProjectsList,
        meta: {
          auth: true
        }
      },
      {
        path: 'create',
        name: 'projects-create',
        component: ProjectsEditor
      },
      {
        path: 'edit/:slug',
        name: 'projects-edit',
        component: ProjectsEditor
      }
    ]
  },
]

export default routes
