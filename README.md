# CollegePlannerV3
Web Application Automated Testing
Dylan Martin 20063204

Unit testing App Features
• POST a subject and/or assignment
• GET a list of subjecs and/or assignments
• GET an individual subject or assignment using an ID
• PUT an individual subject or assignment using an ID
• DELETE an individual subject or assignment using an ID

Before Each hook for resetting data not working correctly. Data must be manually reset at the RESTful API after each test run.

Test Data:
Subjects
{
          "_id": "5bd0ba9efb6fc05968e0858f",
          "subjectName": "Web Application Development",
          "subjectRoom": "F02",
          "subjectTeacher": "David Drohan"
     },
     {
          "_id": "5bd0bad8fb6fc05968e085d9",
          "subjectName": "Business Analytics",
          "subjectRoom": "FTG13",
          "subjectTeacher": "Brenda Mullally"
     },
     {
          "_id": "5be0a6aaf00d522a9c17461b",
          "subjectName": "Enterprise Software Architecture",
          "subjectRoom": "IT202",
          "subjectTeacher": "William Doyle",
          "__v": 0
     }

Assignments
{
          "_id": "5bd0bec4fb6fc05968e08918",
          "assignmentName": "Web App",
          "assignmentSubject": "Web Applications Development",
          "assignmentGrade": 30
     },
     {
          "_id": "5bd0bed6fb6fc05968e08920",
          "assignmentName": "Project Questions",
          "assignmentSubject": "Project Management",
          "assignmentGrade": 15
     },
     {
          "_id": "5be0d0ab15f31c24c8addc0b",
          "assignmentName": "Excel Sheet",
          "assignmentSubject": "Business Analytics",
          "assignmentGrade": 50,
          "__v": 0
     }
https://github.com/Dylanm1995/CollegePlannerV3

