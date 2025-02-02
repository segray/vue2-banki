<template>
  <div>
    <div v-if="isLoading" class="loader"></div>
    <app-modal v-if="currentItem" @close="modalClose">
      <div class="modal-description">
        <app-slider
          :items="
            currentItem.img.map((img) => ({ src: img, alt: currentItem.title }))
          "
        />
        <h2>Описание товара:</h2>
        {{ currentItem.description }}
      </div>
    </app-modal>

    <h1>
      <template v-if="filter">
        <template v-if="goods.items.length">
          Поиск по запросу: "{{ filter }}"
        </template>
        <template v-else>Ничего не нашлось</template>
        <a @click.prevent="filter = ''">вернуться</a>
      </template>
      <template v-else>{{ goods.title }}</template>
    </h1>

    <ul class="grid">
      <li
        v-for="item in goods.items"
        :key="item.id"
        class="card"
        :class="{ 'card--sold': item.sold }"
      >
        <div class="card__image">
          <img
            :src="item.img[0]"
            :alt="item.title"
            @click="modalShow(item.id)"
          />
        </div>
        <div class="card__inner">
          <h2 @click.prevent="modalShow(item.id)">{{ item.title }}</h2>
          <div class="card-buy">
            <template v-if="!item.sold && item.price">
              <div class="price">
                <span v-if="item.price.old" class="price__old"
                  >{{ item.price.old.value }}
                  {{ item.price.old.currency }}</span
                >
                <span class="price__new"
                  >{{ item.price.new.value }}
                  {{ item.price.new.currency }}</span
                >
              </div>
              <button
                class="card-buy__button"
                :class="{
                  loading: cartPending[item.id],
                  ordered: cartStore.items[item.id],
                }"
                @click="buy(item.id)"
              >
                <template v-if="cartStore.items[item.id]">
                  <svg
                    width="16"
                    height="13"
                    viewBox="0 0 16 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use xlink:href="#feather"></use>
                  </svg>
                  В корзине
                </template>
                <template v-else> Купить </template>
              </button>
            </template>
            <template v-else>
              <h3 class="card-buy__sold">Продана на аукционе</h3>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import AppModal from "./AppModal.vue";
import AppSlider from "./AppSlider.vue";
import { useCartStore } from "../stores/cart.js";
import { mapStores } from "pinia";
import Vue from "vue";

export default {
  components: {
    AppModal,
    AppSlider,
  },
  props: {
    // TODO: router
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // катрочик, ожидающие добавления в корзину
      cartPending: {},

      // текущий инспектируемый товар (для модального окна)
      currentItem: null,

      // доступные товары
      goods: {},

      // фильтр поиска
      filter: "",

      // показ индикатора загрузки
      isLoading: false,
    };
  },
  mounted() {
    // инициализация корзины из localStorage
    this.cartStore.init();
    this.fetch();
  },
  methods: {
    // загрузка товаров c сервера
    fetch() {
      let params = "";
      if (this.filter) {
        params =
          "?" +
          new URLSearchParams({
            filter: this.filter,
          });
      }

      this.isLoading = true;

      fetch(new URL(this.url, window.location.origin) + params)
        .then((res) => res.json())
        .then((data) => {
          data.items = data.items.filter(
            (item) =>
              // заглушка, т.к. нет бека
              item.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
          );
          return data;
        })
        .then((data) => {
          this.goods = data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    modalShow(id) {
      this.currentItem = this.goods.items.find((item) => item.id === id);
    },
    modalClose() {
      this.currentItem = null;
    },
    buy(id) {
      // если уже в процессе добавления в корзину
      if (this.cartPending[id]) {
        return;
      }

      Vue.set(this.cartPending, id, true);
      setTimeout(() => {
        // требования ТЗ
        Vue.delete(this.cartPending, id);
        // повторный клик - убрать из корзины
        this.cartStore.toggleItem(id);
      }, 2000);
    },
  },
  computed: {
    ...mapStores(useCartStore),
  },
  watch: {
    filter() {
      this.fetch();
    },
    url() {
      this.fetch();
    }
  },
  expose: ["filter"],
};
</script>

<style lang="scss" scoped>
@use "../styles/utils.scss";

.grid {
  margin-top: 39px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: utils.approx(10px, 32px, 900px, 1280px);
}

.modal-description {
  width: utils.approx(280px, 920px, 320px, 1920px);
  & h2 {
    margin: 1em 0;
  }
}

h1 a {
  margin-left: 1em;
  text-decoration: underline;
  color: inherit;
  font-size: 12px;
  cursor: pointer;
}

.loader {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}

// ---------------------------------------------------------

.card {
  border: 1px solid #e1e1e1;

  &__image {
    width: 100%;
    aspect-ratio: 1.75;
    overflow: hidden;
    cursor: pointer;

    & > img {
      display: block;
      min-width: 100%;
      min-height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__inner {
    margin: 24px;

    & h2 {
      margin-bottom: 22px;
      cursor: pointer;
    }
  }
}

.card-buy {
  display: flex;
  flex-direction: row;
  gap: 8px;

  &__button {
    width: 118px;
    height: 48px;
    padding: 0 4px;

    &.ordered {
      background-color: #5b3a32;
    }

    & svg {
      vertical-align: middle;
      margin-top: -0.4em;
      margin-right: 0.4m;
      height: 1em;
    }
  }
}

.price {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  white-space: nowrap;

  &__old {
    text-decoration: line-through;
    font-size: 14px;
    font-weight: 300;
    color: #a0a0a0;
    line-height: 21px;
  }

  &__new {
    font-weight: bold;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
}

.card--sold {
  opacity: 0.5;
}

.card-buy__sold {
  margin-top: 15px;
}
</style>
