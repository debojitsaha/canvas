# Canvas Editor Project

## Overview

The Canvas Editor project is a web application that allows users to dynamically create and customize visual elements on an HTML canvas. Users can add captions, call-to-action buttons, and images to create visually appealing designs.

## Features

- **Canvas Editing:** Users can add and customize various elements on an HTML canvas, including text captions, call-to-action buttons, and images. The default value of the text captions and CTA button is rendered from a template data file.

- **Color Customization:** The application provides color customization options for the background color of the template with a color picker that supports 5 recent color history.

- **Image Upload:** Users can upload images to be displayed on the canvas mask area. By default a coffee beans image is rendered. The application supports only image file types.

- **Recent Colors:** The color picker includes a list of recently picked colors, allowing users to easily reuse colors.

- **Eye Dropper API:** Experimental EyeDropper API is integrated to allow users to pick colors directly from the page. It is only supported in Chrome, Opera and Edge browsers.

## Technologies Used

- **React:** The application is built using React.

- **Ant Design:** Ant Design components are used for the input fields and button in the user interface.

- **react-color:** The `ChromePicker` component from the `react-color` library is used for color picking functionality.

- **SCSS:** Styling is done using SCSS to enhance CSS features and maintainability.

- **Eye Dropper API:** The experimental EyeDropper API is used to allow users to pick colors directly from the page.

## How to Run

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/debojitsaha/canvas
   cd canvas
   ```
2. **Install Dependencies:**
   ```bash
    npm install
   ```
3. **Run the Application:**
   ```bash
    npm run dev
   ```
4. **Open the Application:**
   ```bash
   http://localhost:3000/
   ```
