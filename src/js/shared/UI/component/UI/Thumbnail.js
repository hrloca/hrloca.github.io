import React from 'react'

/*
 * interaction
 * 0: none
 * 1: shadow(default)
 * 2: overlay
 *
 * caption type
 * 0: none
 * 1: bottom(default)
 * 2: center
 *
 * caption size
 * 0: S
 * 1: M(default)
 * 2: L
 * */

const INTERACTION = [
  'none',
  'shadow',
  'overlay',
];

const CAPTION_TYPE = [
  'none',
  'bottom',
  'center',
];

const CAPTION_SIZE = [
  'S',
  'M',
  'L',
];

const thumbnailInteraction = (type) => INTERACTION[type] || INTERACTION[1];
const thumbnailCaptionType = (type) => CAPTION_TYPE[type] || CAPTION_TYPE[1];
const thumbnailCaptionSize = (type) => CAPTION_SIZE[type] || CAPTION_SIZE[0];

const Link = ({href, children}) => href ?
  <a className="c-thumb__area" href={href}>{ children }</a> :
  <div className="c-thumb__area" >{ children }</div>;

const SubCaption = ({label}) => label ? <div className={`
  c-thumb__subCaption
  t-over-ellipsis
`}>{label}</div> : null

export default ({
    href,
    type,
    imgPath,
    caption,
    subCaption,
    ico,
    captionType,
    captionSize,
    interaction,
  }) =>  {
  return (
    <div className="c-thumb">
      <div className="c-thumb__ico"> { ico } </div>
      <Link href={href}>
        <div className="c-thumb__img">
          <div className="u-trim"><img src={imgPath} width="100%" /></div>
        </div>
        <div className={`c-thumb__interaction --${thumbnailInteraction(interaction)}`}>
          <div className={`
            t-over-ellipsis
            c-thumb__captionArea
            --${thumbnailCaptionType(captionType)}
            --size-${thumbnailCaptionSize(captionSize)}`}>
            <div className="c-thumb__caption t-over-ellipsis">{caption}</div>
            <SubCaption label={subCaption} />
          </div>
        </div>
      </Link>
    </div>
  );

};
