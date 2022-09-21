import React from 'react';
import { useForm } from 'react-hook-form';
import './InputField.scss';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div className="login__form-item">
        <label className="login__form-item-label" htmlFor="email">
          Email
        </label>
        <input
          className="login__form-item-input"
          type="email"
          id="email"
          placeholder="god.mentor@kms-technology.com"
          {...register('email', { required: true })}
        />
        {errors.email && <span className="login__form-item--error">This field is required</span>}
      </div>
    </div>
  );
};

export default InputField;
