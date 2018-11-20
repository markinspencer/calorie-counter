import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import {
  showFormAction,
  mealInputAction,
  caloriesInputAction,
  saveMealAction,
  deleteMealAction,
  editMealAction
} from "./update";

const {
  pre,
  div,
  h1,
  button,
  form,
  label,
  input,
  table,
  thead,
  th,
  tbody,
  tr,
  td,
  i
} = hh(h);

const cell = (tag, className, value) => {
  return tag({ className }, value);
};

const mealRow = (dispatch, className, meal) => {
  const { description, calories } = meal;
  return tr({ className }, [
    cell(td, "pa2 tl", description),
    cell(td, "pa2 tr", calories),
    cell(td, "pa2 tr", [
      i({
        className: "ph1 fa fa-trash-o pointer",
        onclick: () => dispatch(deleteMealAction(meal.id))
      }),
      i({
        className: "ph1 fa fa-pencil-square-o pointer",
        onclick: () => dispatch(editMealAction(meal.id))
      })
    ])
  ]);
};

const totalRow = meals => {
  const calories = R.pipe(
    R.map(meal => meal.calories),
    R.sum
  )(meals);

  return tr({}, [
    cell(td, "pa2 tr b bt", "Total:"),
    cell(td, "pa2 tr b bt", calories),
    cell(td, "bt", "")
  ]);
};

const mealsBody = (dispatch, className, meals) => {
  const rows = R.map(R.partial(mealRow, [dispatch, "stripe-dark"]), meals);
  const total = totalRow(meals);

  return tbody({ className }, [rows, total]);
};

const headerRow = () => {
  return tr({ className: "" }, [
    cell(th, "pa2 tl", "Meal"),
    cell(th, "pa2 tr", "Calories"),
    cell(th, "", "")
  ]);
};

const mealsHeader = () => thead({ className: "bg-gray white" }, headerRow());

const mealsTable = (dispatch, meals) => {
  if (meals.length === 0)
    return div({ className: "mv2 i black-50" }, "No meals to display...");

  return table({ className: "mw6 collapse w-100 center mv2" }, [
    mealsHeader(),
    mealsBody(dispatch, "", meals)
  ]);
};

const buttonSet = dispatch => {
  return div([
    button(
      {
        className: "f3 pv2 ph3 bg-blue white bn dim pointer mr2",
        type: "submit"
      },
      "Save"
    ),
    button(
      {
        className: "f3 pv2 ph3 bg-grey black bn dim pointer",
        type: "submit",
        onclick: () => dispatch(showFormAction(false))
      },
      "Cancel"
    )
  ]);
};

const fieldSet = (labelText, inputValue, oninput) => {
  return div([
    label({ className: "db mb1" }, labelText),
    input({
      className: "pa2 input-reset ba w-100 mb2",
      type: "text",
      value: inputValue,
      id: "mealInput",
      oninput
    })
  ]);
};

const formView = (dispatch, model) => {
  const { description, calories, showForm } = model;

  if (showForm)
    return form(
      {
        className: "w-100 mv2",
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealAction);
        }
      },
      [
        fieldSet("Meal", description, e =>
          dispatch(mealInputAction(e.target.value))
        ),
        fieldSet("Calories", calories || "", e =>
          dispatch(caloriesInputAction(e.target.value))
        ),
        buttonSet(dispatch)
      ]
    );

  return button(
    {
      className: "f3 pv2 ph3 bg-blue white bn",
      onclick: () => dispatch(showFormAction(true))
    },
    "Add Meal"
  );
};

const view = (dispatch, model) => {
  const { meals } = model;
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Calorie Counter"),
    formView(dispatch, model),
    mealsTable(dispatch, meals)
    //,pre(JSON.stringify(model, null, 2)) // Only for development
  ]);
};

export default view;
