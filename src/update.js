import * as R from "ramda";

const ACTIONS = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT",
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_MEAL: "DELETE_MEAL",
  EDIT_MEAL: "EDIT_MEAL"
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

export const deleteMealAction = id => {
  return {
    type: ACTIONS.DELETE_MEAL,
    id
  };
};

export const editMealAction = id => {
  return {
    type: ACTIONS.EDIT_MEAL,
    id
  };
};

export const saveMealAction = {
  type: ACTIONS.SAVE_MEAL
};

const update = (action, model) => {
  switch (action.type) {
    case ACTIONS.SHOW_FORM: {
      const { showForm } = action;
      return { ...model, description: "", calories: 0, showForm };
    }

    case ACTIONS.MEAL_INPUT: {
      const { description } = action;
      return { ...model, description };
    }

    case ACTIONS.CALORIES_INPUT: {
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(action.calories);

      return { ...model, calories };
    }

    case ACTIONS.SAVE_MEAL: {
      const { editId } = model;
      const updatedModel = editId !== null ? edit(model) : add(model);
      return updatedModel;
    }

    case ACTIONS.DELETE_MEAL: {
      const { id } = action;
      const meals = R.filter(meal => meal.id !== id, model.meals);

      return {
        ...model,
        meals
      };
    }

    case ACTIONS.EDIT_MEAL: {
      const { id: editId } = action;
      const meal = R.find(meal => meal.id === editId, model.meals);

      const { description, calories } = meal;
      return { ...model, editId, description, calories, showForm: true };
    }

    default: {
      return model;
    }
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

const edit = model => {
  const { description, calories, editId } = model;
  const meals = R.map(
    meal => (meal.id === editId ? { ...meal, description, calories } : meal),
    model.meals
  );

  return {
    ...model,
    meals,
    description: "",
    calories: 0,
    showForm: false,
    editId: null
  };
};

export default update;
