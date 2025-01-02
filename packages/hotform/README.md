# HotForm Builder for React

A powerful and flexible form builder component for React applications that allows you to create dynamic forms with advanced UI components.

## Installation

```bash
npm install @hotformbuilder/react
```

## Usage

```tsx
import { HotForm } from '@hotformbuilder/react';

const formConfig = {
  components: [
    {
      id: '1',
      type: 'text',
      label: 'Name',
      required: true
    },
    {
      id: '2',
      type: 'email',
      label: 'Email',
      required: true
    }
  ]
};

function App() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <HotForm
      src={{ components: formConfig }}
      onSubmit={handleSubmit}
    />
  );
}
```

## Available Components

### Basic Components
- TextField (`text`)
- Checkbox (`checkbox`)
- Radio (`radio`)
- Select (`select`)
- Button (`button`)

### Advanced Components
- DateTime (`datetime`)
- FileUpload (`fileupload`)
- Signature (`signature`)
- OTP (`otp`)
- Tags (`tags`)

### Premium Components
- Wizard (`wizard`)
- Language (`language`)

### Layout Components
- Container (`container`)
- Table (`table`)
- Tabs (`tabs`)
- Collapse (`collapse`)

### Chart Components
- PieChart (`pie-chart`)
- DoughnutChart (`doughnut-chart`)
- BarChart (`bar-chart`)
- LineChart (`line-chart`)

### API Components
- RestAPITrigger (`rest-api`)

## Props

| Prop | Type | Description |
|------|------|-------------|
| src | object | Form configuration object containing components array |
| onSubmit | function | Callback function called when form is submitted |
| onChange | function | Callback function called when any form value changes |

## License

MIT