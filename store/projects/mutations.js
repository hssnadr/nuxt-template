export default {
  setCurrentProjectId(state, id_) {
    state.curProjectId = id_
  },

  setInstitute(state, institute_) {
    state.selInstitute = institute_
  },

  setFormat(state, format_) {
    state.selFormat = format_
  },

  setYears(state, years_) {
    state.selYears = years_
  },

  setField(state, dataFld_) {
    const field_ = dataFld_.id
    const isFld_ = dataFld_.state
    if (isFld_) {
      if (!state.selFields.includes(field_)) {
        state.selFields.push(field_) // add field if not already selected
      }
    } else if (state.selFields.includes(field_)) {
      const ind_ = state.selFields.indexOf(field_)
      state.selFields.splice(ind_, 1) // remove field if previously selected
    }
  },

  setSkill(state, dataSkl_) {
    const skill_ = dataSkl_.id
    const isSkl_ = dataSkl_.state
    if (isSkl_) {
      if (!state.selSkills.includes(skill_)) {
        state.selSkills.push(skill_) // add skill if not already selected
      }
    } else if (state.selSkills.includes(skill_)) {
      const ind_ = state.selSkills.indexOf(skill_)
      state.selSkills.splice(ind_, 1) // remove skill if previously selected
    }
  },

  setDisplayFilter(state, type_) {
    state.dispTypeFilter = type_
  },

  toggleTypeFilter(state, type_) {
    if (state.selTypeFilters.includes(type_)) {
      const ind_ = state.selTypeFilters.indexOf(type_)
      state.selTypeFilters.splice(ind_, 1) // remove type filter if already set
    } else {
      state.selTypeFilters.push(type_)
    }
  },

  setTypeFilter(state, data_) {
    const type_ = data_.type
    const state_ = data_.state

    if (!state_) {
      if (state.selTypeFilters.includes(type_)) {
        const ind_ = state.selTypeFilters.indexOf(type_)
        state.selTypeFilters.splice(ind_, 1) // remove type filter if already set
      }
    } else if (!state.selTypeFilters.includes(type_)) {
      state.selTypeFilters.push(type_)
    }
  },

  setFilter(state, data_) {
    state.selFilters.forEach((sel_) => {
      if (sel_.type === data_.type && sel_.name === data_.name) {
        const ind_ = state.selFilters.indexOf(sel_)
        state.selFilters.splice(ind_, 1) // remove filter if previously set
      }
    })

    if (data_.state !== 'skip') {
      state.selFilters.push(data_) // update filter if not skiped (include, add or exclude)
    }
  }
}
