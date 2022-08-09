fn(state => {
  const { surname, age } = state.data;
  const fhirPayload = { name: surname, age };
  return { ...state, fhirPayload };
});
