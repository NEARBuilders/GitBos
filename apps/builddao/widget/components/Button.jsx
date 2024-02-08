const StyledButton = styled.button`
  all: unset;
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  font-weight: var(--font-weight-medium, 500);
  font-size: 0.875rem;
  transition: all 300ms;

  ${(props) =>
    props.type === "icon" &&
    `
    display: flex;
    width: 40px;
    height: 40px;
    padding: 5px;
    flex-shrink: 0;
    border-radius: 50%;
  `}

  /* Colors based on variant prop */
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "var(--button-primary-bg, #FFAF51)";
      case "outline":
        return "var(--button-outline-bg, transparent)";
      default:
        return "var(--button-default-bg, #23242B)";
    }
  }};

  color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "var(--button-primary-color, #000)";
      case "outline":
        return "var(--button-outline-color, #fff)";
      default:
        return "var(--button-default-color, #CDD0D5)";
    }
  }};

  border: ${(props) =>
    props.variant === "outline"
      ? "1px solid var(--stroke-color, rgba(255, 255, 255, 0.20))"
      : ""};

  /* Hover states */
  &:hover {
    background: ${(props) => {
      switch (props.variant) {
        case "primary":
          return "var(--button-primary-hover-bg, #e49b48)";
        case "outline":
          return "var(--button-outline-hover-bg, rgba(255, 255, 255, 0.20))";
        default:
          return "var(--button-default-hover-bg, #17181c)";
      }
    }};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Button({ id, children, variant, type, onClick, className, style, disabled }) {

  const isDisabled = disabled === undefined ? false : disabled

  return (
    <StyledButton
      id={id}
      disabled={disabled}
      key={`Button-${type ?? "Normal"}-${variant ?? "Default"}-${id}`}
      className={className}
      variant={variant}
      type={type}
      style={style}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

return { Button };
