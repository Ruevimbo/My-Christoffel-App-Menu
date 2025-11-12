## Changelog

**2025-10-10 to 2025-10-21**
### **v1.0.0 – Core Screens & Initial Features**

#### Login Screen
- Created a **Login screen** as the app’s entry point.  
- Designed a clean and minimal layout to allow users to easily access the app.  
- Included input fields for **username** and **password**, along with a **login button** for navigation.  
- Implemented smooth transitions to guide users to the Home screen after logging in.  
- Added basic validation to prevent empty login submissions.  

#### Home Screen
- Developed the **Home screen** to display a list of added dishes dynamically.  
- Implemented a **flat list** to render all dishes fetched from the store.  
- Added a navigation bar for quick access to the Add Dish screen and other features.  
- Included placeholders and styling for when no dishes are available.  
- Integrated a clean, user-friendly UI with shadows and rounded cards for modern appeal.  

#### Add Dish Screen
- Created the **Add Dish screen** to allow users to add new menu items.  
- Added input fields for **Dish Name**, **Description**, **Course**, and **Price**.  
- Included image upload functionality using **Expo Image Picker** for visual presentation of dishes.  
- Integrated state management to store and update dishes effectively.  
- Implemented validation to ensure all required fields are filled before submission.  
- Styled the interface for clarity and accessibility, matching the overall app design.  

#### General Enhancements
- Ensured consistent styling and color schemes across all screens for a cohesive user experience.  
- Structured navigation between screens using **Expo Router** for better app flow.  
- Organized files and components into a maintainable folder structure.  

---

### **v0.1.0 – Project Setup**
- Initialized the Expo project with `create-expo-app`.  
- Installed required dependencies and configured initial file-based routing.  
- Set up the app folder structure for scalability and easier feature additions.


**2025-11-03 to 2025-11-12**
### **v1.1.0 – Major Updates & Improvements**

#### New Screens
- **Average Screen:**  
  Displays the average price per course (Starter, Main, Dessert, and Drink).  
  Helps users quickly view pricing trends across different meal categories.

- **Filter Screen:**  
  Allows users to filter dishes by course type for better organization and accessibility.

#### AddDish Screen Updates
- **feat:** replaced the `course` TextInput with a **Picker** for controlled selection.  
  - Changed the course input from a free-text field to a structured Picker component.  
  - Added fixed options: *Starter, Main, Dessert, Drink.*  
  - Ensures users only select valid course types, preventing typos or invalid inputs.  
  - Updates state correctly to integrate with the `addDish` function.  
  - Improves form reliability and aligns with project requirements for controlled inputs.  

#### Home Screen Updates
- Added **Average** button to the Home screen for quick access to the new Average screen.  
- Added a **logo** for better branding and visual appeal.  

#### General Improvements
- **Changed** the **Login screen** to a **Welcome screen** to enhance the user experience.  
- **Added detailed comments** across all screens to improve code readability and maintainability.  
- **Fixed the structure** of all pages for consistent formatting, cleaner imports, and better component organization.

---

### **v1.0.0 – Initial Release**
- Created the base Expo project structure.  
- Implemented navigation system and core screens.  
- Added dish creation and display functionality.  
- Set up state management for dish storage.  
- Prepared foundation for future updates (Average & Filter features).


