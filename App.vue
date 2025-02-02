<template>
  <main>
    <inline-svg />
    <header>
      <div class="header-wrapper wrapper">
        <nav class="header-half">
          <ul class="nav-list">
            <li><a href="#">Каталог</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Оплата</a></li>
            <li><a href="#">Контакты</a></li>
            <li><a href="#">О компании</a></li>
          </ul>
        </nav>
        <div class="search-block-wrapper header-half">
          <div class="search-block">
            <input
              type="text"
              placeholder="поиск по названию картины"
              @keypress.enter="search"
              v-model="searchValue"
            /><button @click="search">Найти</button>
          </div>
        </div>
      </div>
    </header>

    <article>
      <div class="wrapper">
        <app-grid ref="gridRef" url="/goods.json" />
      </div>
    </article>

    <footer class="footer">
      <div class="footer__nav">
        <ul class="nav-list">
          <li><a href="#">Каталог</a></li>
          <li><a href="#">Доставка</a></li>
          <li><a href="#">Оплата</a></li>
          <li><a href="#">Контакты</a></li>
          <li><a href="#">О компании</a></li>
        </ul>
      </div>
      <div class="footer__contacts">
        <svg class="text-icon"><use xlink:href="#phone"></use></svg>
        <a href="tel:8125555555">+7 (812) 555-55-55</a>
      </div>
      <div class="footer__address">
        <svg class="text-icon">
          <use xlink:href="#place"></use>
        </svg>
        <a
          href="https://yandex.ru/maps/10174/saint-petersburg-and-leningrad-oblast/house/ulitsa_yefimova_3/Z0kYdQNjTEQPQFtjfXhxdnliYA==/?ll=30.352149%2C59.402428&z=15.09"
          target="_blank"
        >
          г. Санкт-Петербург, ул. Ефимова, 3
        </a>
      </div>
    </footer>
  </main>
</template>

<script>
import AppGrid from "./src/components/AppGrid.vue";
import InlineSvg from "./src/components/InlineSvg.vue";

export default {
  components: {
    AppGrid,
    InlineSvg
  },
  data() {
    return {
      // v-model поля поиска
      searchValue: "",
    };
  },
  methods: {
    search() {
      this.$refs.gridRef.filter = this.searchValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "src/styles/utils.scss";

main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

article {
  flex: 1;
}

.wrapper {
  max-width: 1216px;
  margin: 0 auto;
  padding: 0 utils.approx(8px, 20px, 320px, 1280px);
}

header {
  border-bottom: 1px solid #403432;
  padding: 20px 0;
  margin-bottom: 45px;
}

.header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
}

.header-half {
  text-align: center;
}

nav {
  flex: 1;
}

header .nav-list {
  text-align: center;
  margin-left: min(0px, calc((15px - 1vw) * 7));
}

.nav-list {
  display: inline-flex;
  flex-direction: row;
  gap: calc(1vw * 2.5);

  & a {
    font-size: 14px;
    color: inherit;
  }
}

.footer {
  background-color: #eceaea;
  padding: 2.6em 0;
  text-align: center;
  margin-top: 30px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  & div {
    white-space: nowrap;
    flex-basis: fit-content;
  }

  &__nav {
    flex: 3;
    min-width: 50%;
  }

  &__contacts,
  &__address {
    text-align: left;
    flex: 1;
  }
}

.text-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin: 0.5em;
}

.nav-list li a,
.footer,
.search-block input {
  font-size: utils.approx(11px, 14px, 320px, 1024px);
}

.search-block {
  & input {
    width: 294px;
    height: 48px;
  }

  & button {
    width: 122px;
    height: 48px;
  }
}

@media (max-width: 1000px) {
  .header-wrapper {
    flex-direction: column;
  }

  .search-block-wrapper {
    padding: 8px;
    max-width: 400px;
    width: 90%;
  }

  .search-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

    & input,
    & button {
      margin-top: 6px;
      height: 32px;
    }

    & input {
      flex: 1;
      display: block;
      min-width: auto;
      width: 100%;
    }

    & button {
      flex: 0;
    }
  }

  .footer {
    &__contacts,
    &__address {
      min-width: 100%;
      margin-left: 1em;
    }
  }
}
</style>
