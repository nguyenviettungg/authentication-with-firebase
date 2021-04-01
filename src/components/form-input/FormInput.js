import React from "react";

import "./FormInput.scss";

const FormInput = ({ handChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" onChange={handChange} {...otherProps} />{" "}
      {label ? (
        <label
          className={`${
            otherProps.value.lenght ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
