import { defineStore } from "pinia";
import Vue from "vue";

const updateStorage = (items) => {
  localStorage.setItem("app-cart-329", JSON.stringify(items));
};

const fetchStorage = () => {
  const items = localStorage.getItem("app-cart-329");
  return items ? JSON.parse(items) : {};
};

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: {},
  }),

  actions: {
    addItem(id) {
      Vue.set(this.items, id, true);
      updateStorage(this.items);
    },

    removeItem(id) {
      Vue.delete(this.items, id);
      updateStorage(this.items);
    },

    toggleItem(id) {
      if (this.items[id]) {
        this.removeItem(id);
      } else {
        this.addItem(id);
      }
    },

    clear() {
      this.items = {};
      updateStorage(this.items);
    },

    init() {
      this.items = fetchStorage();
    },
  },

  getters: {},
});

