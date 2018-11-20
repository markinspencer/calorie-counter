import * as R from "ramda";

const ACTIONS = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT",
  SAVE_MEAL: "SAVE_MEAL"
};

export const showFormAction = showForm => {
  return {
    type: ACTIONS.SHOW_FORM,
    showForm
  };
};

export const mealInputAction = description => {
  return {
    type: ACTIONS.MEAL_INPUT,
    description
  };
};

export const caloriesInputAction = calories => {
  return {
    type: ACTIONS.CALORIES_INPUT,
    calories
  };
};

export const saveMealAction = {
  type: ACTIONS.SAVE_MEAL
};

const update = (action, model) => {
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

    case ACTIONS.SAVE_MEAL:
      return add(model);

    default:
      return model;
  }
};

const add = model => {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal];

  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: "",
    calories: 0,
    showForm: false
  };
};

export default update;
