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




