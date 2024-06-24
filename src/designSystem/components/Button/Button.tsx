import './Button.css';

export interface ButtonProps {
  buttonText: string;
}

export const Button = ({
  buttonText
}: ButtonProps) => {
  return (
    <button className="button">
      {buttonText}
    </button>
  );
};
