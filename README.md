# HotForm Builder

A powerful and flexible form builder application built with React, Redux, and TypeScript. Create dynamic forms with drag-and-drop functionality, advanced components, and real-time preview.

## Features

### Component Library
- **Basic Form Elements**
  - Text Field
  - Checkbox
  - Radio
  - Select
  - Button

- **Advanced Components**
  - Date/Time Picker
  - File Upload
  - Signature Pad
  - OTP Input
  - Tags Input

- **Layout Components**
  - Container
  - Table
  - Tabs
  - Accordion

### Builder Features
- Drag-and-drop interface
- Real-time component preview
- Comprehensive property editor
- Component search functionality
- Responsive layout with horizontal/vertical orientation
- Component reordering within forms

### Property Editor
- **Display Tab**: Configure visual aspects and layout
- **Data Tab**: Manage data binding and default values
- **Validation Tab**: Set up validation rules and messages
- **Logic Tab**: Define conditional behavior and calculations

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React DnD
- Tailwind CSS
- Radix UI
- Lucide React Icons
- Zod

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hotform-builder.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── BasicComponents/
│   │   ├── TextField/
│   │   ├── Checkbox/
│   │   ├── Radio/
│   │   ├── Select/
│   │   └── Button/
│   ├── AdvancedComponents/
│   │   ├── DateTime/
│   │   ├── FileUpload/
│   │   ├── Signature/
│   │   ├── OTP/
│   │   └── Tags/
│   ├── LayoutComponents/
│   │   ├── Container/
│   │   ├── Table/
│   │   ├── Tabs/
│   │   └── Accordion/
│   └── HotFormBuilder/
├── context/
├── redux/
├── types/
└── utils/
```

## Component Properties

### Common Properties
- Label
- Required status
- Placeholder
- Custom CSS classes
- Validation rules
- Default values

### Advanced Properties
- Custom validation
- Error messages
- Conditional logic
- Calculation formulas

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React DnD](https://react-dnd.github.io/react-dnd/) for drag-and-drop functionality
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for icons
- [Radix UI](https://www.radix-ui.com/) for accessible components