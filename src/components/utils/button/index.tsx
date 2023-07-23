import "./index.scss";

interface IProps {
  onClick: () => void;
  textContent: string | JSX.Element;
}

const Button: React.FC<IProps> = ({ onClick, textContent }) => {
  return <button className="input-element" onClick={onClick}>{textContent}</button>;
};

export default Button;
