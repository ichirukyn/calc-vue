export default ({
  actions: {
    updateSubmit(ctx, res) {
      let itemCheck = ctx.state.bonuses.filter(item => item.itemId === res.itemId)

      if (itemCheck.length === 0) {
        ctx.commit('addBonus', res)
      }
      else {
        ctx.commit('updateBonus', {itemCheck, res})
      }

    }
  },


  mutations: {
    addBonus(state, bonus) {
      state.bonuses.push(bonus)
    },
    updateBonus(state, data) {
      state.bonuses[state.bonuses.indexOf(data.itemCheck[0])] = data.res
    },
    addRotation(state) {
      state.rotationList.push({ id: state.rotationList.length, rotation: 0, bonuses: 0 });
    },
    delRotation(state, index) {
      let arr = state.rotationList.map(item => item.id != index)
      state.rotationList.splice(arr.indexOf(false), 1)
    },
  },
  state: {
    characters: [
      { id: 0, value: "Ёимия" },
      { id: 1, value: "Кли" },
      { id: 2, value: "Ху Тао" },
    ],
    rotation: [
      { id: 0, value: "N1a" },
      { id: 1, value: "N1b" },
      { id: 2, value: "N2" },
      { id: 3, value: "N3" },
    ],

    // В процессе
    rotationList: [{ id: 0, rotation: 0, bonuses: 0 }],
    bonuses: [],

    // short -- Возвращается в родитель
    // data -- Сейчас как placeholder
    // percent -- Добавит класс :before %, в строку
    // mod -- Есть ли реакция, и заглушка для страницы..
    bonusesList: [
      { id: 0, short: "Урон", title: "+ATK/HP/DEF, %", data: "0%", percent: true, value: "" },
      { id: 1, short: "Урон", title: "+ATK/HP/DEF", data: 0, value: "" },
      { id: 2, short: "Урон", title: "+ATK/HP/DEF, %", data: "0%", value: "" },
      { id: 3, short: "Урон", title: "+ATK/HP/DEF", data: 0, value: "" },
      { id: 4, short: "Урон", title: "+ATK/HP/DEF, %", data: "0%", value: "" },
      { id: 5, short: "Урон", title: "+ATK/HP/DEF", data: 0, value: "" },
      { id: 6, short: "Урон", title: "+ATK/HP/DEF, %", data: "0%", value: "" },
      { id: 7, short: "Урон", title: "+ATK/HP/DEF", data: 0, value: "" },
      { id: 8, short: "Урон", title: "+ATK/HP/DEF, %", data: "0%", value: "" },
      { id: 9, short: "Урон", title: "+ATK/HP/DEF", data: 0, value: "" },
      { id: 10, short: "Урон", title: "+ATK/HP/DEF, %", data: "0%", value: "" },
      { id: 11, short: "Урон", title: "+ATK/HP/DEF", data: 0, value: "" },
      { id: 12, short: "Пар", title: "steam", data: 0, value: "", mod:true },
      { id: 13, short: "Таяние", title: "melting", data: 0, value: "", mod:true },
    ],
  },
  getters: {
    bonusesGet: (state) => {return state.bonuses},
  }
})