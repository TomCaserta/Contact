export default function contactExists(store, nextState, replace) {
  const contact = store.findById(parseInt(nextState.params.contactID, 10));
  if (!contact) {
    replace('/');
  }
}
