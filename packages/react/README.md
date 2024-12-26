# @hotform/react

A powerful and flexible form rendering library for React applications.

## Installation

```bash
npm install @hotform/react
```

## Usage

```jsx
import { HotForm } from '@hotform/react';
import formConfig from './form-config.json';

function App() {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const handleChange = (data) => {
    console.log('Form changed:', data);
  };

  return (
    <HotForm 
      src={formConfig} 
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}
```

## Form Configuration

The form configuration is a JSON object that defines the structure and behavior of your form:

```json
{
  "components": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "text",
      "label": "Email Address",
      "required": true,
      "validation": {
        "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
      }
    }
  ]
}
```

## Available Components

- Basic Components
  - Text Field
  - Checkbox
  - Radio
  - Select
  - Button

- Advanced Components
  - Date/Time
  - File Upload
  - Signature
  - OTP
  - Tags

- Layout Components
  - Container
  - Table
  - Tabs
  - Collapse

## License

MIT