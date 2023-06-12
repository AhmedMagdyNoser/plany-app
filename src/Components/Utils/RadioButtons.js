import React from "react";

export function RadioButtonsGroup({ name, children, className }) {
  const childrenArray = React.Children.toArray(children);
  return (
    <div className={className}>
      {childrenArray.map(child => React.cloneElement(child, { name: name }))} {/* To pass the name for each child */}
      <style>
        {`
          input[type="radio"].radio:checked + label {
            color: white;
            background: #007bff; // Primary Color of Bootstrap
          }
        `}
      </style>
    </div>
  )
}

export function RadioButton({ name, value, checked }) {
  let id = Math.floor(Math.random() * 10 ** 9);
  return (
    <div>
      <input id={id} name={name} type="radio" value={value} defaultChecked={checked ? true : false} className="radio d-none" />
      <label htmlFor={id} className={"btn btn-outline-primary "} style={{ cursor: 'pointer' }}> {value} </label>
    </div>
  )
}