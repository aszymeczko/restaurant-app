const Button = ({ text, onClick }) => (
  <button className={"btn btn-primary"} onClick={onClick}>
    {text}
  </button>
);

export default Button;
