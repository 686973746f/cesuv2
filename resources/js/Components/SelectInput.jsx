import { forwardRef, useRef } from "react";

export default forwardRef(function SelectInput(
  { className = "", children, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  return (
    <select
      {...props}
      className={
        "form-select " +
        className
      }
      ref={input}
    >
      {children}
    </select>
  );
});
