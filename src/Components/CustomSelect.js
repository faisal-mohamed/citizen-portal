import React, { memo } from "react";
import "../css/component.style.scss";
import ReactSelect from "react-select";
import { Label } from "reactstrap";

const changeHandler = (e, props) => {
  let value = null;
  if (e) value = e.value;
  props.onChangeFunc(props.name, value);

  if (!props.onValidateFunc) return;
};

const CustomSelect = (props) => {
  const customStyle = {
    control: (style, state) => {
      return {
        ...style,
        backgroundColor: "var(--vz-input-bg)",
        border: state.isFocused
          ? props.errorMsg
            ? "1 px solid red"
            : "none"
          : style.border,

        "&:hover": {
          border: state.isFocused && `1px solid #D5D5D5 `,
          cursor: "auto",
        },
      };
    },
  };
  const styles = {
    control: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      borderColor: state.isFocused ? "#ced4da" : "#ced4da",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#ced4da" : "#ced4da",
      },
    }),
    menu: (style) => ({
      ...style,
      background: "#fff",
    }),
    option: (style) => ({
      ...style,
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      color: "#000",
    }),
  };

  const inputProps = {
    name: props.name,
    placeholder: props.placeholder || `Select ${props.title}`,
    className: props.className,
    value: props.options.find((x) => x.value === props.value),
    options: props.options,
    onBlur: props.onBlur,
  };

  return (
    <div className={props.outerClassName}>
      <Label className="form-label">{props.title}</Label>
      <ReactSelect
        {...inputProps}
        styles={styles}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#E5E8EF",
            primary: "#E86665",
          },
        })}
        onChange={(e) => changeHandler(e, props)}
        components={{
          IndicatorSeparator: null,
        }}
      />
      {props.errorMsg && (
        <span className="text-danger">
          {props.errorMsg === true
            ? `Please select ${props.title}.`
            : props.errorMsg}
        </span>
      )}
    </div>
  );
};

export default memo(CustomSelect);
