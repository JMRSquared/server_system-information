<template>
  <vuestic-sidebar :hidden="false">
    <template slot="menu">
            <sidebar-link
              :to="{ name: 'dashboard' }">
              <span slot="title">
                <span
                  class="sidebar-menu-item-icon vuestic-icon vuestic-icon-statistics"></span>
                <span>dashboard</span>
              </span>
            </sidebar-link>
            <sidebar-link v-for="(app,i) in apps" :key="i" :to="{ path: app.link }">
              <span slot="title">
                <span class="sidebar-menu-item-icon vuestic-icon vuestic-icon-dashboard"></span>
                <span>{{ app.name }}</span>
              </span>
            </sidebar-link>
            <sidebar-link
              :to="{ name: 'login' }">
              <span slot="title">
                <span
                  class="sidebar-menu-item-icon vuestic-icon vuestic-icon-auth"></span>
                <span>Log out</span>
              </span>
            </sidebar-link>
</template>
  </vuestic-sidebar>
</template>

<script>
  import VuesticSidebar
  from '../../../vuestic-theme/vuestic-components/vuestic-sidebar/VuesticSidebar'
  import SidebarLink from './components/SidebarLink'
  import SidebarLinkGroup from './components/SidebarLinkGroup'
  
  export default {
    name: 'app-sidebar',
    components: {
      VuesticSidebar,
      SidebarLink,
      SidebarLinkGroup,
    },
    data() {
      return {
        apps: [{
          link: '/app/backend',
          name: 'Backend'
        }, {
          link: '/app/ovalleaf',
          name: 'Ovalleaf'
        }, {
          link: '/app/coportal',
          name: 'Coportal'
        }, {
          link: '/app/jmrsquared',
          name: 'JMRSquared'
        }]
      }
    }
  }
</script>
