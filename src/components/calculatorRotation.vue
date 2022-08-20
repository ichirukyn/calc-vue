<template>
  <div class="page">
    <h1 class="page__title">Калькулятор ротаций</h1>
    <div class="calculator">
      <div class="calculator__wrap">
        <mySelected :options="characters" />
        <p class="calculator__title">Ротация</p>
        <div
          class="calculator__item"
          v-for="item in rotationList"
          :key="item.id"
        >
          <img src="@/assets/svg/Minus.svg" @click="delRotation(item.id)" />
          <mySelected
            :options="rotation"
            :model-value="item.id"
            @update:model-value="updateListRotation"
          />
          <img
            src="@/assets/svg/Gear.svg"
            @click="showBonus($event, item.id)"
          />
          <div class="calculator__bonuses">
            <p
              :class="bonus.style"
              v-for="bonus in item.bonuses"
              :key="bonus.title"
            >
              {{ bonus.short }} {{ bonus.value }}
            </p>
          </div>
        </div>
        <img src="@/assets/svg/Plus.svg" @click="addRotation" />
      </div>
      <bonuses-form ref="bonus" v-on:bonus-update="bonusUpdate($event)" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import mySelected from "./calculator/mySelected.vue";
import bonusesForm from "./calculator/bonusesForm.vue";

export default {
  components: {
    mySelected,
    bonusesForm,
  },
  computed: {
    ...mapState({
      characters: (state) => state.calculatorGet.characters,
      rotation: (state) => state.calculatorGet.rotation,
      rotationList: (state) => state.calculatorGet.rotationList,
    }),
  },
  data() {
    return {
      bonusesOpt: [],
      btnGear: ["Gear.svg", "Gear_active.svg"],
    };
  },
  methods: {
    ...mapMutations(["addRotation"]),
    ...mapMutations(["delRotation"]),

    // Слушает событие `select` rotation(N1,N1a)
    updateListRotation(event) {
      this.rotationList[event.listId].rotation = event.optId;
    },

    // Показывает окно bonusesForm
    // Привязывает окно к itemId => rotationList.id
    showBonus(e, id) {
      // Исправляет все баги, когда input, "запоминает", другие данные
      this.$refs.bonus.bonuses = [];
      this.$refs.bonus.show = !this.$refs.bonus.show;
      this.$refs.bonus.itemId = id;
      this.btnActive(e, this.$refs.bonus.show);
    },

    // Изменяет иконку Шестеренки
    btnActive(e, bool) {
      let btn;

      if (bool) btn = this.btnGear[1];
      else btn = this.btnGear[0];

      e.target.attributes[0].value = require(`@/assets/svg/${btn}`);
    },

    // Обновляет данные о бонусах
    bonusUpdate(e) {
      this.rotationList.map((item) => {
        e.map((res) => {
          if (item.id === res.itemId) {
            this.rotationList[item.id].bonuses = res.bonus;
          }
        });
      });
    },
  },
};
</script>


<style lang='scss' scoped>
@import "./src/assets/scss/var.scss";

.page {
  padding: $pd_vbig;
  &__title {
    font-size: $heder_1;
    font-weight: $fw_base;
    text-align-last: center;
  }
}
.calculator {
  display: flex;
  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    margin-top: $mg_title_top;
    font-size: $heder_3;
    font-weight: $fw_base;
    text-align-last: center;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin: $mg_vbig;
  }

  &__bonuses {
    display: flex;
    position: absolute;
    left: 485px;
    z-index: 0;

    & p {
      padding: $pd_small;
      color: $color_dark;
      margin-left: $mg_base;
    }
    & .green {
      background: $bg_green;
    }
    & .white {
      background: $bg_white;
    }
    & .percent::after {
      content: "%";
    }
  }
}
</style>