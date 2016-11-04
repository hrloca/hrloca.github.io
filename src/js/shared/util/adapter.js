import _ from 'lodash';

const store = {
  core: null,
  subscribers: []
};

export default (store_, view_) => {
  store.core = store_;
  store.core.subscribe(subscribeHandler)
  view_(store.core);
}

export const connect = (mapState, mapDispatch) => {
  if (!store.core) return;

  return ({initialize, render}) => {
    const mappedState = mapState(store.core.getState());
    const mappedProps = _.merge({}, mappedState, mapDispatch(store.core.dispatch));

    store.subscribers.push({ render, mapState, mapDispatch, prevState: mappedState });
    initialize(mappedProps);
  }

};

const subscribeHandler = () => {

  store.subscribers.forEach(({ render, mapState, mapDispatch, prevState }, i) => {
    const mappedState = _.assign({}, mapState(store.core.getState()));
    const mappedProps = _.merge({}, mappedState, mapDispatch(store.core.dispatch));
    if (_.isEqual(mappedState, prevState)) return;
    render(mappedProps);
    store.subscribers[i].prevState = mappedState;
  });

}
