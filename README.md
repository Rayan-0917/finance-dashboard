Setup:

1.Prerequisites:
Node.js (v16.0.0 or higher recommended)
npm or yarn

2.Clone the repository: https://github.com/Rayan-0917/finance-dashboard

3.Navigate into project directory: cd finance-dashboard

4. Install dependencies: npm install

5. Start development server: npm run dev

Overview of approach:
I focused on card based components with a grid like layout. Broke it down into focused and reusable components. Used static data to showcase the summary cards, insights and transaction table. Used a function to generate random mock data for time series charts. Focused on a clean UI which is easy on the user's eye.

Features:
1. Role based access: Can toggle between viewer and admin
   a. Viewer: Read-only access to charts and tables.
   b. Admin: Unlocks operational actions like the "Add Transaction" and "Edit" row buttons
2. Search and Filter in transaction table to get better insights on income and expenses.
3. Graphs: To visualize the data better
   a. Categorical graph: To understand the basic spending patterns
   b. Time based graph: Shows expenses month wise and also per day for any particular month.
4. Summary cards and insight card to show basic details cleanly.
5. Responsive, works on all devices.
