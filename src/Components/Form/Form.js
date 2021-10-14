import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [valueInput, setValueInput] = useState({
    qwery: "",
  });

    const handleChange = (e) => {
    //   console.log(e.currentarget.value)
    setValueInput({
      qwery: e.currentTarget.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(valueInput.qwery);
    reset();
  };
  const reset = () => {
    setValueInput({
      qwery: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="search"
          value={valueInput.qwery}
        />
        <button type="submit">Search</button>
      </form>
      <ul></ul>
    </>
  );
};
export default Form;
