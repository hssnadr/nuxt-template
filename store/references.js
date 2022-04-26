export const state = () => ({
    allReferences: [
      {
        name: 'Strate - École de Design',
        id: 'strate',
        link: 'https://www.strate.design'
      },
      {
        name: 'Dassault Systèmes',
        id: 'dassaultsystemes',
        link: 'https://www.3ds.com'
      },
      {
        name: 'CRI Paris',
        id: 'cri-paris',
        link: 'https://www.cri-paris.org'
      },
      {
        name: 'Arts et Métiers ParisTech',
        id: 'am-paristech',
        link: 'https://www.artsetmetiers.fr'
      },
      {
        name: 'Leroy Merlin',
        id: 'leroymerlin',
        link: 'https://www.leroymerlin.fr'
      },
      {
        name: 'Guken',
        id: 'guken',
        link: 'https://www.behance.net/gallery/35618985/GUKEN'
      },
      {
        name: 'Illustrator',
        id: 'illustrator',
        link:
          'https://www.adobe.com/fr/products/illustrator.html?gclid=EAIaIQobChMImeGMq_fg6QIVyrTtCh2YuQoEEAAYASAAEgIEWPD_BwE&sdid=88X75SL1&mv=search&ef_id=EAIaIQobChMImeGMq_fg6QIVyrTtCh2YuQoEEAAYASAAEgIEWPD_BwE:G:s&s_kwcid=AL!3085!3!341240860988!e!!g!!adobe%20illustrator#scroll'
      },
      {
        name: 'Photoshop',
        id: 'photoshop',
        link:
          'https://www.adobe.com/fr/products/photoshop.html?gclid=EAIaIQobChMI04eN9fjg6QIViIXVCh2zWARsEAAYASAAEgJEpPD_BwE&sdid=88X75SL1&mv=search&ef_id=EAIaIQobChMI04eN9fjg6QIViIXVCh2zWARsEAAYASAAEgJEpPD_BwE:G:s&s_kwcid=AL!3085!3!394610509406!e!!g!!photoshop'
      },
      {
        name: 'After Effects',
        id: 'aftereffects',
        link:
          'https://www.adobe.com/fr/products/aftereffects.html?gclid=EAIaIQobChMIiaXxifng6QIVxeFRCh08UwAkEAAYASAAEgJxX_D_BwE&sdid=88X75SL1&mv=search&ef_id=EAIaIQobChMIiaXxifng6QIVxeFRCh08UwAkEAAYASAAEgJxX_D_BwE:G:s&s_kwcid=AL!3085!3!341216976145!e!!g!!after%20effects'
      },
      {
        name: 'Premiere',
        id: 'premiere',
        link:
          'https://www.adobe.com/fr/products/premiere.html?gclid=EAIaIQobChMIvNnfr_ng6QIVCfhRCh1GnwhqEAAYASAAEgIqv_D_BwE&sdid=88X75SL1&mv=search&ef_id=EAIaIQobChMIvNnfr_ng6QIVCfhRCh1GnwhqEAAYASAAEgIqv_D_BwE:G:s&s_kwcid=AL!3085!3!341217015790!e!!g!!premiere'
      },
      {
        name: 'InDesign',
        id: 'indesign',
        link:
          'https://www.adobe.com/fr/products/indesign.html?gclid=EAIaIQobChMIk42Fn_rg6QIVmYbVCh0yDAooEAAYASAAEgKUwPD_BwE&sdid=88X75SL1&mv=search&ef_id=EAIaIQobChMIk42Fn_rg6QIVmYbVCh0yDAooEAAYASAAEgKUwPD_BwE:G:s&s_kwcid=AL!3085!3!341217014080!e!!g!!indesign'
      },
      {
        name: 'Flash Professional',
        id: 'flash',
        link: 'https://fr.wikipedia.org/wiki/Adobe_Animate'
      },
      {
        name: 'CATIA',
        id: 'catia',
        link: 'https://www.3ds.com/fr/produits-et-services/catia/'
      },
      {
        name: 'Arduino',
        id: 'arduino',
        link: 'https://www.arduino.cc/'
      },
      {
        name: 'Processing',
        id: 'processing',
        link: 'https://processing.org/'
      },
      {
        name: 'Unity3D',
        id: 'unity3d',
        link: 'http://unity3d.com/'
      },
      {
        name: 'Pixate',
        id: 'pixate',
        link: 'https://www.pixate.com/'
      },
      {
        name: 'Matlab',
        id: 'matlab',
        link: 'https://www.mathworks.com/products/matlab.html'
      },
      {
        name: 'MAX',
        id: 'max',
        link: 'https://cycling74.com/products/max'
      },
      {
        name: 'Pure Data',
        id: 'pure-data',
        link: 'https://puredata.info/'
      },
      {
        name: 'C#',
        id: 'csharp',
        link: '' // <--------------------------------------------
      },
      {
        name: 'Python',
        id: 'python',
        link: '' // <--------------------------------------------
      },
      {
        name: 'Nuxt',
        id: 'nuxt',
        link: 'https://nuxtjs.org/'
      }
    ]
  })
  
  // Getters
  export const getters = {
    getName: (state) => (id_) => {
      let name_ = id_
      state.allReferences.forEach((element) => {
        if (element.id === id_) {
          name_ = element.name
        }
      })
      return name_
    },
    getLink: (state) => (id_) => {
      let link_ = null
      state.allReferences.forEach((element) => {
        if (element.id === id_ && element.link !== '') {
          link_ = element.link
        }
      })
      return link_
    }
  }
  