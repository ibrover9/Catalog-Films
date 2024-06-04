/* eslint-disable react/prop-types */

export default function Checkbox({ dispatch, id, values, checked }) {
  function handleCheckboxChange(event) {
    dispatch({
      type: "change_checkbox",
      index: id,
      newValue: event.target.checked,
    });
  }

  return (
    <>
      <input
        className="genre"
        type="checkbox"
        id={id}
        onChange={(event) => handleCheckboxChange(event)}
        checked={checked}
      />
      <label htmlFor={id}>{values}</label>
    </>
  );
}
