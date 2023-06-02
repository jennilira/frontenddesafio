import React from 'react';

interface Props {
  errors: { [field: string]: string[] };
}

const MyComponent: React.FC<Props> = ({ errors }) => {
  return (
    <div>
      {Object.keys(errors).map((field) => (
        <div key={field}>
          {errors[field].map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
