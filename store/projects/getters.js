export default {
  getCurrentProject: (state, getters) =>
    getters.getProjectByid(state.curProjectId),

  currentProjectID: (state) => state.curProjectId,

  getAllProjectsId: (state) => {
    const allPrjId_ = []
    state.allProjects.forEach((prj_) => allPrjId_.push(prj_.id))
    return allPrjId_
  },

  getProjectByid: (state) => (id_) => {
    return state.allProjects.find((prj_) => prj_.id === id_)
  },

  getThumbnailById: (state) => (id_) => {
    const prj_ = state.allProjects.find((prj_) => prj_.id === id_)
    let thb_ = 'http://via.placeholder.com/500c'

    if (prj_.thumbnail.asset != null) {
      try {
        const f_ = 'projects/' + prj_.id + '/' + prj_.thumbnail.asset
        thb_ = require('~/assets/' + f_)
      } catch (err) {
        // console.error(err)
      }
    } else if (prj_.thumbnail.link != null) {
      thb_ = prj_.thumbnail.link
    }

    return thb_
  },

  getImageSrc: (state) => (data_) => {
    const prj_ = state.allProjects.find((prj_) => prj_.id === data_.project_)
    let src_ = null

    if (prj_.medias != null) {
      const image_ = prj_.medias.find((img_) => img_.id === data_.image_)

      if (image_ != null) {
        if (Object.prototype.hasOwnProperty.call(image_, 'file')) {
          try {
            const f_ = 'projects/' + prj_.id + '/' + image_.file
            src_ = require('~/assets/' + f_)
          } catch (err) {
            // console.error(err)
          }
        } else if (Object.prototype.hasOwnProperty.call(image_, 'link')) {
          src_ = image_.link
        }
      }
    }

    return src_
  },

  getYears(state) {
    const allPrj_ = state.allProjects
    const d_ = new Date()
    let y0_ = d_.getFullYear()
    let y1_ = y0_

    allPrj_.forEach((p_) => {
      if (!isNaN(p_.years.y0)) {
        y0_ = p_.years.y0 < y0_ ? p_.years.y0 : y0_
      }

      if (!isNaN(p_.years.y1)) {
        y1_ = p_.years.y1 > y1_ ? p_.years.y1 : y1_
      }
    })

    return { y0: y0_, y1: y1_ }
  },

  getAllFiltersByType: (state) => (type_) => {
    const filters_ = []

    state.allProjects.forEach((p_) => {
      if (Object.prototype.hasOwnProperty.call(p_, type_)) {
        if (p_[type_] != null && p_[type_].length > 0) {
          p_[type_].forEach((f_) => {
            if (!filters_.includes(f_)) {
              filters_.push(f_)
            }
          })
        }
      }
    })
    return filters_
  },

  isFilterDisplay: (state) => (type_) => {
    return state.dispTypeFilter === type_
  },

  isTypeFilter: (state) => (type_) => {
    return state.selTypeFilters.includes(type_)
  },

  getFilterState: (state) => (filter_) => {
    let s_ = null

    if (state.selFilters.length > 0) {
      state.selFilters.forEach((f_) => {
        if (f_.type === filter_.type && f_.name === filter_.name) {
          s_ = f_.state
        }
      })
    }

    return s_
  },

  allFormats(state) {
    const allPrj_ = state.allProjects
    const allFrmt_ = []

    for (let i = 0; i < allPrj_.length; i++) {
      if (allPrj_[i].fields.length > 0) {
        for (let j = 0; j < allPrj_[i].fields.length; j++) {
          const frmt_ = allPrj_[i].fields[j]
          if (!allFrmt_.includes(frmt_)) {
            allFrmt_.push(frmt_)
          }
        }
      }
    }
    return allFrmt_
  },

  allFields(state) {
    const allPrj_ = state.allProjects
    const allFld_ = []

    for (let i = 0; i < allPrj_.length; i++) {
      if (allPrj_[i].fields.length > 0) {
        for (let j = 0; j < allPrj_[i].fields.length; j++) {
          const fld_ = allPrj_[i].fields[j]
          if (!allFld_.includes(fld_)) {
            allFld_.push(fld_)
          }
        }
      }
    }
    return allFld_
  },

  allSkills(state) {
    const allPrj_ = state.allProjects
    const allSkl_ = []

    for (let i = 0; i < allPrj_.length; i++) {
      if (allPrj_[i].skills.length > 0) {
        for (let j = 0; j < allPrj_[i].skills.length; j++) {
          const skl_ = allPrj_[i].skills[j]
          if (!allSkl_.includes(skl_)) {
            allSkl_.push(skl_)
          }
        }
      }
    }
    return allSkl_
  },

  allTools(state) {
    const allPrj_ = state.allProjects
    const allTls_ = []

    for (let i = 0; i < allPrj_.length; i++) {
      if (allPrj_[i].tools.length > 0) {
        for (let j = 0; j < allPrj_[i].tools.length; j++) {
          const frmt_ = allPrj_[i].tools[j]
          if (!allTls_.includes(frmt_)) {
            allTls_.push(frmt_)
          }
        }
      }
    }
    return allTls_
  },

  selectedProjectsId: (state, getters) => {
    const allPrj_ = state.allProjects
    let selPrjId_ = []
    const filters_ = state.selFilters

    // YEARS
    let fltYrs_ = []
    if (state.selYears != null) {
      const y0_ = state.selYears.y0
      const y1_ = state.selYears.y1
      allPrj_.forEach((prj_) => {
        if (!(prj_.years.y1 < y0_ || prj_.years.y0 > y1_)) {
          fltYrs_.push(prj_) // add project
        }
      })
    } else {
      fltYrs_ = allPrj_ // all projects if no selection
    }

    // FILTERS
    if (filters_.length > 0) {
      // Include
      filters_.forEach((filter_) => {
        const type_ = filter_.type
        const name_ = filter_.name
        const state_ = filter_.state

        if (state.selTypeFilters.includes(type_) && state_ === 'include') {
          fltYrs_.forEach((prj_) => {
            if (!selPrjId_.includes(prj_.id)) {
              if (Object.prototype.hasOwnProperty.call(prj_, type_)) {
                if (prj_[type_] != null) {
                  if (prj_[type_].includes(name_)) {
                    selPrjId_.push(prj_.id) // add project
                  }
                }
              }
            }
          })
        }
      })

      // Add
      filters_.forEach((filter_) => {
        const type_ = filter_.type
        const name_ = filter_.name
        const state_ = filter_.state

        if (state.selTypeFilters.includes(type_) && state_ === 'add') {
          fltYrs_.forEach((prj_) => {
            if (!selPrjId_.includes(prj_.id)) {
              if (Object.prototype.hasOwnProperty.call(prj_, type_)) {
                if (prj_[type_] != null) {
                  if (prj_[type_].includes(name_)) {
                    selPrjId_.push(prj_.id) // add project
                  }
                }
              }
            }
          })
        }
      })

      // // If no project selected return all projects
      if (selPrjId_.length === 0) {
        selPrjId_ = getters.getAllProjectsId
      }

      // Exclude
      filters_.forEach((filter_) => {
        const type_ = filter_.type
        const name_ = filter_.name
        const state_ = filter_.state

        if (state.selTypeFilters.includes(type_) && state_ === 'exclude') {
          fltYrs_.forEach((prj_) => {
            if (selPrjId_.includes(prj_.id)) {
              if (Object.prototype.hasOwnProperty.call(prj_, type_)) {
                if (prj_[type_] != null) {
                  if (prj_[type_].includes(name_)) {
                    const ind_ = state.selFilters.indexOf(prj_)
                    state.selFilters.splice(ind_, 1) // remove
                  }
                }
              }
            }
          })
        }
      })
    } else {
      fltYrs_.forEach((prj_) => selPrjId_.push(prj_.id)) // all projects if no selection
    }

    return selPrjId_
  }
}
