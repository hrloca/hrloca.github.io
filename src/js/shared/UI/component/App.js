import React from 'react'
import Lang from './Lang'
import Search from './Search'
import Megamenu from './UI/Megamenu'
import Modal from './UI/Modal'
import Overlay from './UI/Overlay'

import Categorie from './Guidance/Categorie'
import Area from './Guidance/Area'
import Howto from './Guidance/Howto'

export default ({
  modal,
  isActiveOverlay,
  lang,
  label,
  search,
  megamenu,
  guidance,

  allHide,
  langChange,
  searchValue,
  searchSubmit,
}) => {

  const types = megamenu.types.split('/');
  const current = megamenu.current;
  const megaCategory = types[0];
  const megaSubtype = types[1];
  const megaData = guidance[megaCategory] || {};
  const megaContentsData = megaSubtype ? megaData[megaSubtype] : megaData;
  let contents = null

  switch (megaCategory) {
    case 'category':
      contents = <Categorie data={megaContentsData.data} id={megaSubtype} />;
      break;
    case 'area':
      contents = <Area data={megaContentsData.data} />;
      break;
    case 'howto':
      contents = <Howto list={megaContentsData.data} />;
      break;
  }

  return (
    <div>

      <Overlay
        type={1}
        onClick={allHide}
        active={isActiveOverlay} />

      <Modal active={modal[0]}>
        <Search
          inputValueHandler={searchValue}
          query={search.query}
          submit={searchSubmit}
          active={modal[0]}
          lang={lang.current}
          placeholder={search.placeholder} />
      </Modal>

      <Modal active={modal[1]}>
        <Lang
          onClick={langChange}
          list={lang.list}
          current={lang.current} />
      </Modal>

      <Modal
        type={1}
        active={modal[2]}>
        <Megamenu
          current={current}
          title={megaContentsData.label}
          active={modal[2]}
          category={megaCategory}
          id={megaContentsData.id}
          data={megaContentsData.data}
          close={{
            handler:allHide,
            label:label.close,
          }}
        >
        { contents }
        </Megamenu>
      </Modal>

    </div>
  )
}


///current={megamenu}
///data={guidance}
