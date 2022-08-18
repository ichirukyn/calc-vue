<template>
  <div v-if="show" class="bonuses">
    <h3 class="bonuses__header">Бонусы</h3>
    <div class="bonuses__list" v-for="bonus in bonusesList" :key="bonus.id">
      <label v-show="!bonus.mod" class="bonuses__title">{{ bonus.title }}</label>
      <input
        class="bonuses__input"
        :placeholder="bonus.data"
        v-model.trim="checkData[bonus.id]"
        v-show="!bonus.mod"
      />
    </div>
    <div class="bonuses__button-list">
      <div class="bonuses__radio">
        <!-- checkData[12] -- Последний элемент в this.bonuses -->
        <input id="no" type="radio" v-model="checkData[12]" value="" />
        <label for="no">Нет</label>
        <input id="steam" type="radio" v-model="checkData[12]" value="Пар" />
        <label for="steam">Пар</label>
        <input id="melting" type="radio" v-model="checkData[12]" value="Таяние" />
        <label for="melting">Таяние</label>
      </div>
      <button class="bonuses__button" @click="saveInput()">Сохранить</button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "bonuses-form",
  data() {
    return {
      show: false,
      itemId: 0,
      bonuses: [],
      radio: [],
    };
  },
  computed: {
    ...mapGetters(["bonusesGet"]),
    ...mapState({
      bonusesList: (state) => state.calculatorGet.bonusesList,
    }),

    // Проверка, есть ли в `store` - itemId, и если True -- Обновляет данные на странице
    checkData() {
      let check = this.bonusesGet.filter((item) => item.itemId === this.itemId);

      if (check.length !== 0) {
        this.forItem(this.bonusesList, check[0].bonus, true);
        this.submitEvent(this.bonusesGet);
      }

      return this.bonuses;
    },

    // // Очищает input, при выключении окна
    // isShow() {
    //   if (!this.show) {
    //     this.clearInputs();
    //   }
    //   return this.show;
    // },
  },
  methods: {
    ...mapActions(["updateSubmit"]),

    // Сохраняет данные в `store`
    saveInput() {
      // Находит все input'ы, которые были изменены пользователем
      const bonus = this.forItem(this.bonusesList, this.bonuses, false);

      if (bonus.length !== 0) {
        const res = {
          itemId: this.itemId,
          bonus: bonus,
        };

        this.updateSubmit(res);
        this.submitEvent(res);
      }
    },

    // Отправка данных в родитель
    submitEvent(res) {
      this.$emit("update:model-value", res);
    },

    // "Универсальный" перебор данных
    // arr1 - Массив, для сравнения (Основной)
    // arr2 - Массив, который сравнивает свои данные (Побочный)
    // update - True -- обновляет данные на странице, False -- Убирает "пустые" данные
    forItem(arr1, arr2, update) {
      let res = [];

      arr1.map((item) => {
        arr2.map((v, k) => {
          if (update) {
            if (arr2[k].id === item.id) {
              this.bonuses.splice(item.id, 1, v.value);
            }
          } else if (k === item.id && v !== "") {
            // Заменяет пар, на таяние
            if (v == "Таяние")
              item = arr1[k+1]
            item.value = v;
            return res.push(item);
          }
        });
      });
    
      return res;
    },

    // Очищает input на странице
    clearInputs() {
      this.bonuses = this.bonusesList.map((v, i) => (v[i] = ""));
    },
  },
};
</script>


<style lang="scss" scoped>
@import "./src/assets/scss/var.scss";

.bonuses {
  margin-top: $mg_bonus_top;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: $width_bonuses;
  height: 100%;
  background: $bg_base;
  padding: $pd_base $pd_vbig;

  &__header {
    font-size: $heder_3;
    font-weight: $fw_base;
    margin-bottom: $mg_base;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: $mg_vsmall;
  }

  &__input {
    width: $width_input;
    background: $bg_input;
    padding: $pd_vsmall;
    text-align: center;

    &_percent::before {
      content: "%";
    }
  }

  &__button-list {
    width: 100%;
    & .bonuses__radio {
      display: flex;
      justify-content: space-between;

      & input[type="radio"] {
        display: none;
      }
      & label {
        width: 85px;
        display: inline-block;
        text-align: center;
        cursor: pointer;
        padding: $pd_base $pd_big;
        background: $bg_input;
        border: 1px solid $color_dark;
      }
      /* Checked */
      & input[type="radio"]:checked + label {
        background: $bg_checked;
        color: $color_dark;
      }
    }
    & .bonuses__button {
      background: $bg_input;
      margin-top: $mg_small;
      padding: $pd_small;
      width: 100%;
    }
  }
}
</style>