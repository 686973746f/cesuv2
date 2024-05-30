import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextAreaInput(
  { className = "", isFocused = false, children, ...props },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      className={
        "form-control " +
        className
      }
      ref={input}
    >
      {children}
    </textarea>
  );
});
