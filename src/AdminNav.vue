<template>
  <!-- { active: isActive(item) } -->
  <nav class="admin-nav h-100">
    <div class="admin-nav-list" @mouseleave="currentItem = null">
      <button
        type="button"
        class="admin-nav-item text-left text-decoration-none w-100 border-0 position-relative cursor-pointer"
        :class="{ active: isActive(item) }"
        v-for="(item, i) in items"
        :key="i"
        @click="toAction(item)"
        @mouseover="hoverItem(item.text)"
      >
        <div class="d-flex justify-content-between align-items-start">
          <div class="d-flex">
            <span class="admin-nav-icon" :class="{ active: isActive(item) }">
              <i :class="item.icon" aria-hidden="true"></i>
            </span>

            <div v-if="showSidebar">
              <span
                class="admin-nav-label d-inline-block"
                :class="{ active: isActive(item) }"
                >{{ item.text }}
              </span>
              <p class="admin-nav-description">{{ item.description }}</p>
            </div>
          </div>

          <span
            class="arrow-icon"
            :class="{ active: isActive(item) }"
            v-if="showSidebar"
          >
            <!-- <i
              class="fas fa-angle-right"
              aria-hidden="true"
              v-if="!item.subItems"
            ></i> -->

            <span v-if="item.subItems">
              <!-- <i
                class="fas fa-angle-down"
                aria-hidden="true"
                v-if="!item.showSubmenu"
              ></i>
              <i class="fas fa-angle-up" aria-hidden="true" v-else></i> -->

              <i class="ri-arrow-down-s-line" v-if="!item.showSubmenu"></i>
              <i class="ri-arrow-up-s-line" v-else></i>
            </span>
          </span>
        </div>

        <div v-if="item.subItems && item.showSubmenu && showSidebar">
          <ul class="subitems-list mb-0">
            <li v-for="subitem in item.subItems" :key="subitem.text">
              <a
                @click.prevent.stop="toAction(subitem)"
                class="admin-nav-label label-subitem d-inline-block"
                :class="{ active: isActive(subitem, item) }"
                >{{ subitem.text }}</a
              >
            </li>
          </ul>
        </div>

        <div
          class="admin-nav-tooltip"
          :class="{'d-flex align-items-center': !item.subItems}"
          @mouseleave="currentItem = null"
          v-if="currentItem == item.text"
        >
          <span class="text-white text-uppercase">{{ item.text }}</span>

          <div v-if="item.subItems && !showSidebar">
            <ul class="subitems-list mb-0 pl-5">
              <li v-for="subitem in item.subItems" :key="subitem.text">
                <a
                  @click.prevent.stop="toAction(subitem)"
                  class="admin-nav-label label-subitem d-inline-block"
                  :class="{ active: isActive(subitem, item) }"
                  >{{ subitem.text }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showNav: true,
      device: null,
      currentItem: null,
    };
  },
  mounted() {
    this.calcResize();
  },
  props: {
    items: Array,
    showSidebar: Boolean,
  },
  methods: {
    calcResize() {
      if (screen.width < 1024) this.device = "mobile";

      window.addEventListener("resize", () => {
        if (screen.width < 1024) this.device = "mobile";
      });
    },
    isActive(item) {
      if (item.externalRoute) {
        return false;
      }

      if (item.subItems && item.subItems.length) {
        let currentRoute = item.subItems.find(
          (i) => this.$route.name == i.routeName
        );
        if (currentRoute) {
          return true;
        }
      } else {
        if (this.$route.name == item.routeName) {
          return true;
        }
      }
    },
    toAction(item) {
      if (item.externalRoute) {
        window.open(item.externalRoute);

        return;
      }

      if (item.subItems) {
        this.toggleSubmenu(item);
      } else {
        this.$router.push({ name: item.routeName });
        if (this.device === "mobile") {
          this.$emit("hideSidebar");
        }
      }
    },
    toggleSubmenu(item) {
      item.showSubmenu = !item.showSubmenu;
    },
    hoverItem(value) {
      if (!this.showSidebar) {
        this.currentItem = value;
      }
    },
  },
};
</script>

<style lang="scss">
.admin-nav {
  position: relative;
  z-index: 20;

  &-item {
    min-height: 50px;
    background-color: transparent;
    color: rgba($admin-dark, 0.85);
    padding: 8px 16px;
    margin-bottom: 0;
    border-radius: 9px;
    box-shadow: 0px 0px 5px -1px rgba(var(--color-primary), 0.3) !important;

    &.active {
      background-color: rgba(white, 0.01) !important;
    }

    &:hover {
      .arrow-icon {
        color: white;
        transition: transform 0.5s;
      }
    }
  }

  &-label {
    font-size: 15px;
    font-weight: 500;
    color: rgba(white, 0.85) !important;
    transition: all 0.5s;

    &:hover {
      color: white !important;
      text-decoration: none;
    }

    &.active {
      color: var(--color-primary) !important;
      font-weight: 500;
    }

    &.label-subitem {
      margin-top: 8px;
    }
  }

  &-description {
    font-size: 10px;
    color: rgba(white, 0.65);
    margin-top: 2px;
  }

  .arrow-icon {
    font-weight: 500;
    color: rgba(white, 0.65);
  }

  &-icon {
    font-size: 15px;
    font-weight: 300;
    color: rgba(white, 0.65);
    margin-right: 8px;

    &.active {
      color: var(--color-primary);
    }
  }

  ul {
    color: rgba(white, 0.65);
    padding-left: 40px;
  }

  &-tooltip {
    width: 150px;
    min-height: 100%;
    background-color: $admin-dark;
    font-size: 13px;
    padding: 8px 16px;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 1000;

    .admin-nav-label {
      font-size: 13px;
    }
  }
}
</style>
