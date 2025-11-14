
import Styles from './AuthInput.module.css';

interface AuthInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export function AuthInput({
  id,
  name,
  type,
  label,
  required = false,
  placeholder,
  error,
}: AuthInputProps) {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`${Styles.onboardingInput} ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
