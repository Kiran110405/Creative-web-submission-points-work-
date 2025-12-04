# Creative-web-submission-points-work-
The different submission points for Creative web

My proposed web app concept

My proposed web app concept is a study assistant app that is specifically designed to help university students to help them plan their studies and task that they need to tackle. Help them to become more organised. Some key features would be implement a map API to show different study locations that they could go to, a calendar API where they can input different tasks and deadlines that they may have, and a more original feature that I want to add is an OpenAI personal assistant as I don't think many study web apps for students have that, so having that would make it more helpful and engaging for the student.

A web app that I am taking inspiration from would be "MyStudyLife". The part of the app that I will mostly be taking inspiration from is that layout, as I think it is clear and easy to understand, so I respect that that could be a good way that I could lay out my app, not to make a complete identical copy.

A way that it could use a database would be to store inputted small notes that the user wants to store onto the web app for specific topics that they are studying as well as log in/sign up details. Could also try and store all the sessions that the user have had with the openAI so they could go back and look at the information again.

For a novel user experience, I could try and use dynamic images, the addition of the OpenAI could be a big step in creating a brand-new experience for students as it will be implemented into the study web app.

The audience that I am trying to reach are students as this web app will help them the most when it comes to studying. The web app aligns with their needs because it comes with a built in calendar and map where they could put down their deadlines and tasks as well as a map to show them the different study locations within the area.

# Submission point 2 Admin/profile features.

## Admin feature 

What I had done for the admin feature was I first had to go onto mongoDB compass and create a whole new user who I would give the admin key too so that once the admin logs in with the username and password that I gave them, they would be taken to the admin page which is where they can delete different users and comments made in the social app. How I first did this, as said before, I made a fresh set of login details that were given the key to the admin features, so if you are to log in with those details (username: admin, password: password), you will be taken to the admin page. What I first did was add an isAdmin my my new user variable and set it to false, this is to ensure that not every user that registers is given the admin key. As well as this, I added isAdmin to my userSchema variable (isAdmin: { type: Boolean, default: false }). I also added a variable within my app.post login where it checks if the username used to log into the social app is the same as the username with the admin key, and if it is, once they have logged in the will be taken straight to the admin page of the web app. I also used app.get /admin to load the admin page and used res.render to to grab all of the users and posts on the social app and display them onto the page. I also added two admin deletion routes as the admin can delete two seperate pieces of information ( user and posts ).     "await userModel.userData.findByIdAndDelete(req.params.id);res.redirect("/admin");" this line of code here for example allows the admin to actually delete the information that they want to delete and red.redirect("/admin") makes sure thagt when they delete anything from this page they are kept on the admin page and not moved somewhere else in the app. To display this page I made an admin.ejs file to display everything. I included two lists, one of the usernames and another of the posts, and displayed them in columns with "admin delete users buttons" that will trigger the app.posts in the index.js file. 

## Profile-feature

How I started this process was I first created the profile page (profile.ejs). In this page I added to needed syntax where I can pull the firstName, lastName and username from the database so it can be displayed onto the web page. In the index.js file, under app.post /register, and I added a redirect so that once the users registers, they are taken to log in and then given the chance login again with the same details, once they have done that they are directed to the profiles page (made using ejs) and grabs information:
username: user.username,
firstName: user.firstName,
lastName: user.lastName,
and then displays them in ejs. 

# Submission point 3 Outline Creative web app.

- the purpose of my web app is to provide univeristy students with an environemnt where they can focus in on their education and help them to learn and keep on track with different educational tasks/deadlines that they may have. The intended audience are university students, and the overall aim of the web app is to help them with their studies
- The technology stack that I am using is express as, from lesson tutorials, I can understand it for the most part. As well as stylings such as GSAP.
- some major features of the app are spread into different pages, for example, I am in the process of trying to integrate openAI into my web app, to be used as such as a personal assistant for the student, as well as a notes page where the user can create notes where they could delete and edit them, as well as a map page where students can find areas around them where they are able to go and study.
- Challenges that I have faced on the way include the register and login part of the web app where the web app can create new users and add them to the database and be stored within mongoDB, but I was able to figure this how via the tutorial videos that were provided. anticipated challenges are the api calenders, and trying to include the feature of pop ups when students deadlines are approaching, as well as, not that it will be difficult, but with styling, trying to find a set theme for the web app to have.
- Experiments that I have undertaken include adding features into the map API, to make it easier to use as well as further developments which are going to me pointers that pin-point areas that the students can go to study. I have also experiemnted with different styling options that are available to me in GSAP, such as animations for headings to make the webapp have a more lively feel. But currently I am trying to work with calender APIS and trying different ones that I believe will be a good fit for the wbe app.
- Learning points from independent study include a almost full understanding of how the data in a backe-end application using express flows and how it works, as well as learning Javascript in a more in depth way via youtube tutorials and fixing and solving problems that I come across. I have also better learn how I can store user inputed data to mongoDB as well as how to work with data when it comes to the backened of the application.




