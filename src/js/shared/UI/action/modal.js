export const INIT = 'UI_MODAL_INIT';
export const SHOW = 'UI_MODAL_SHOW';
export const HIDE = 'UI_MODAL_HIDE';
export const TOGGLE = 'UI_MODAL_TOGGLE';
export const ALL_HIDE = 'UI_MODAL_ALL_HIDE';
export const SHOW_ONLY = 'UI_MODAL_SHOW_ONLY';
export const TOGGLE_ONLY = 'UI_MODAL_TOGGLE_ONLY';

export const init = (index) => ({ type: INIT, index });
export const show = (index) => ({ type: SHOW, index });
export const hide = (index) => ({ type: HIDE, index });
export const toggle = (index) => ({ type: TOGGLE, index });
export const allHide = (igunoreIndex) => ({ type: ALL_HIDE, igunoreIndex });
export const showOnly = (index) => ({ type: SHOW_ONLY, index });
export const toggleOnly = (index) => ({ type: TOGGLE_ONLY, index });
