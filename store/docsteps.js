import data from '~/static/docstep.json'

// State
export const state = () => ({
  allDocStep: data
})

// Getters
export const getters = {
  getDocData: (state) => (id_) => {
    let data_ = null
    state.allDocStep.forEach((element) => {
      if (element.id === id_) {
        data_ = element
      }
    })
    return data_
  }
}
