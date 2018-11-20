import * as R from "ramda";

const ACTIONS = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT"
};

export function showFormAction(showForm) {
  return {
    type: ACTIONS.SHOW_FORM,
    showForm
  };
}

export function mealInputAction(description) {
  return {
    type: ACTIONS.MEAL_INPUT,
    description
  };
}

export function caloriesInputAction(calories) {
  return {
    type: ACTIONS.CALORIES_INPUT,
    calories
  };
}

function update(action, model) {
  switch (action.type) {
    case ACTIONS.SHOW_FORM:
      const { showForm } = action;
      return { ...model, description: "", calories: 0, showForm };

    case ACTIONS.MEAL_INPUT:
      const { description } = action;
      return { ...model, description };

    case ACTIONS.CALORIES_INPUT:
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(action.calories);

      return { ...model, calories };

    default:
      return model;
  }
}

export default update;
