import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../component/App';
import * as ModalUIAction from './../action/modal';
import * as megamenuAction from './../action/megamenu';
import * as searchAction from './../../domain/action/search';
import { langChange, search } from './../../UI/util/location';
import { CATEGORY_MAP } from './../../domain/enum';

import Area from './../component/Guidance/Area';
import Categorie from './../component/Guidance/Categorie';
import Howto from './../component/Guidance/Howto';

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    isActiveOverlay: [state.modal[0], state.modal[1]].some(v => !!v),
    lang: state.lang,
    label: state.label,
    search: state.search,
    megamenu: state.megamenu,
    guidance: state.guidance,
  }
};

const mapDispatchToProps = (dispatch) => ({

  allHide() {
    dispatch(megamenuAction.setCurrent(''));
    dispatch(ModalUIAction.allHide());
  },

  langChange: (id) => langChange(id),

  searchValue(val) {
    dispatch(searchAction.setQuery(val))
  },

  searchSubmit(query, lang, e) {
    search(query, lang);
    e.preventDefault();
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
