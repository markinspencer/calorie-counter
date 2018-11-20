const ACTIONS = {
  SHOW_FORM: "SHOW_FORM"
};

export function showFormMessage(showForm) {
  return {
    type: ACTIONS.SHOW_FORM,
    showForm
  };
}

function update(action, model) {
  switch (action.type) {
    case ACTIONS.SHOW_FORM:
      const { showForm } = action;
      return { ...model, description: "", calories: 0, showForm };
    default:
  }
  return model;
}

export default update;
