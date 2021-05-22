import { Input } from "@chakra-ui/input";

interface InputFieldProps {
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  color: string;
}

export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      onChange={props.handleChange}
      type={props.type}
      color={props.color}
      {...props}
    ></Input>
  );
};
