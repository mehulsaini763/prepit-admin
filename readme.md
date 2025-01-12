![Logo](/public/screenshots/prepit_landscape.png)

# **PrepIt Admin**

A simple, clean & custom-built CMS for PrepIt. It features comprehensive content, user, and payment management.

## **CMS Features**

**Dashboard**
   - Quick overview of total revenue, sales, subscriptions, active users, recent queries (table), and recent sales.

   ![Dashboard Overview](/public/screenshots/dashboard.png)

**Questions Management**
   - Upload questions for three sections: quantitative aptitude (QA), data interpretation and logical reasoning (DILR), and verbal ability and reading comprehension (VARC) via a spreadsheet.
   - Downloadable spreadsheet format for ease of use.
   - Edit or delete specific questions.

   ![Questions Management](/public/screenshots/questions1.png)
   ![Questions Management](/public/screenshots/questions2.png)

**User Management**
   - View and manage main site users, including subscription status and the ability to ban/unban users.

**Payments**
   - View detailed records of all payments.

   ![Payments Management](/public/screenshots/payments.png)

**Coupons**
   - Manage discount coupons for subscriptions.

   ![Coupons Management](/public/screenshots/coupons.png)

**Settings**
   - Configure test settings, including:
     - Number of questions.
     - Test duration.
     - Case-based question inclusion.

   ![Test Settings](/public/screenshots/settings.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Firebase Keys:**
- `NEXT_PUBLIC_FIREBASE_apiKey`
- `NEXT_PUBLIC_FIREBASE_authDomain`
- `NEXT_PUBLIC_FIREBASE_projectId`
- `NEXT_PUBLIC_FIREBASE_storageBucket`
- `NEXT_PUBLIC_FIREBASE_messagingSenderId`
- `NEXT_PUBLIC_FIREBASE_appId`

**Other Keys:**
- `SECRET_KEY`
## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/mehulsaini763/prepit-admin.git
```
Navigate to the project directory:

```bash
cd prepit-admin
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```
## **Tech Stack**
- **Frontend**: React.js, Next.js
- **Backend**: Node.js, Firebase
- **UI**: Tailwind, ShadCN
- **Mails**: ZeptoMail 

## Links

-  **Main App**: [Github](https://github.com/mehulsaini763/prepit) | [Live](https://prepit.vercel.app/) 
- **CMS**: [Github](https://github.com/mehulsaini763/prepit-admin) | [Live](https://prepit-admin.vercel.app/) 