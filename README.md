# Airtribe-Learning-Hub
![Airtribe Platform](https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/Airtribe.jpeg)

Airtribe is an online platform designed to facilitate application-based courses, connecting instructors with eager learners interested in specific topics or skills.

## User Roles

- **Instructors**: Individuals who create and manage courses on Airtribe.
- **Learners**: Individuals who apply for courses offered by instructors.

## Database Schema

- **Instructors Table**: Stores information about instructors including their name, email, and bio.
- **Courses Table**: Contains details about each course such as the course name, maximum number of seats, start date, and the instructor who created it.
- **Course Registrations Table**: Stores applications submitted by learners for courses. Includes fields for name, email, phone number, LinkedIn profile, and status (applied, accepted, rejected, or waitlisted).
- Instructors able to add comments to the course table
- ## ERD digram

  ![ERD digram ](https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/ERDDigram%20.png)

## Node.js Server

- **Framework**: Utilizes Express.js, a popular Node.js framework, to create a server.
- **API Endpoints**:
    - **Create Course API**: Enables instructors to create new courses by providing necessary details.
    - get instructors data from get method 
    -   ![get data](https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/firstOne.png)
    - **Update Course Details API**: Allows instructors to modify course information such as name, maximum seats, and start date.
    -  ![get data](https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/couseUpdateThedata%20.png)
    - ![postdata]( https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/coursePostdata.png)
    - **Course Registration API**: Allows learners to apply for courses by submitting their personal information including name, email, phone number, and LinkedIn profile.
    - ![postdata](https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/applyforCOurse.png)
    - **Lead Update API**: Enables instructors to change the status of leads (applications) to accept, reject, or waitlist them.
    - ![update](https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/instructabletogetUpdate%20the%20Status%20.png)
    - **Add Comment API**: Allows instructors to add comments to leads for internal communication or feedback purposes.
    - ![addcomment](https://github.com/anshumanbehera27/Airtribe-Learning-Hub/blob/main/images/able%20to%20add%20comment%20.png)

## Purpose

- **Efficiency for Instructors and Learners**: The project aims to create a streamlined platform where instructors can effortlessly manage courses, while learners can easily apply for courses matching their interests and skills.

- **Enhanced Accessibility and Communication**: By providing a user-friendly interface, the platform empowers learners to explore and apply for courses, while enabling instructors to communicate effectively with applicants through features like lead comments.

- **Optimized Course Management**: Through automated administrative tasks and efficient course creation tools, instructors can focus on delivering quality content, ultimately enhancing the learning experience for all participants.

## Tech Stack

- **Database**: MySQL
- **Backend**: Node.js
- **API Testing**: Postman

1. Clone the repository:

```bash
git clone https://github.com/yourusername/airtribe-course-management.git
```

2. Install dependencies:
   ```bash
    cd airtribe-course-management
    npm install
   ```
4. Set up MySQL database and configure connection in the code.

5. Run the server:
   ```bash
    npm start
   ```
   

