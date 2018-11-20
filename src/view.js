import * as R from "ramda";
import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import {
  showFormAction,
  mealInputAction,
  caloriesInputAction,
  saveMealAction
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
  td
} = hh(h);

const cell = (tag, className, value) => {
  return tag({ className }, value);
};

const mealRow = (className, meal) => {
  const { description, calories } = meal;
  return tr({ className }, [
    cell(td, "pa2 tl", description),
    cell(td, "pa2 tr", calories)
  ]);
};

const totalRow = meals => {
  const calories = R.pipe(
    R.map(meal => meal.calories),
    R.sum
  )(meals);

  return tr({}, [
    cell(td, "pa2 tr b bt", "Total:"),
    cell(td, "pa2 tr b bt", calories)
  ]);
};

const mealsBody = (className, meals) => {
  const rows = R.map(R.partial(mealRow, ["stripe-dark"]), meals);
  return tbody({ className }, [rows, totalRow(meals)]);
};

const headerRow = () => {
  return tr({ className: "" }, [
    cell(th, "pa2 tl", "Meal"),
    cell(th, "pa2 tr", "Calories")
  ]);
};

const mealsHeader = () => thead({ className: "bg-gray white" }, headerRow());

const mealsTable = model => {
  const { meals } = model;

  if (meals.length)
    return table({ className: "mw6 collapse w-100 center ma2" }, [
      mealsHeader(),
      mealsBody("", meals)
    ]);

  return null;
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
  return div({ className: "mw6 center" }, [
    h1({ className: "f2 pv2 bb" }, "Calorie Counter"),
    formView(dispatch, model),
    mealsTable(model),
    pre(JSON.stringify(model, null, 2))
  ]);
};

export default view;
