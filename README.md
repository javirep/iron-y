# iron-y

## Description
iron-y is a responsive web page were users can create/read/update/delete (CRUD) different challenges during their time in ironhack (i.e. making their pull-request on time or sleeping a decent amount of time). By joining and achieving this challenges ironhack students will increase their motivation and mental health, so what are you waiting to join iron-y?

## MVP
- Using 3 Schemes (Users, PersonalChallenges, SocialChallenges);
- Doing a Sign up & Log in wireframes with validations in the front-end and back-end
- To give the user the posibility of creating, reading, updating and deleting their personal challenges. 
-To give the user the posibility of reading and joining social challenges.

## Backlog
- User will have a given life and experience which will be modified as they complete their challenges
- The logo of the landing page will contain animation features. 
- Profile Update

## Data Structure:
```
Irongame
  |_ models
  |    |_ Users.js
  |    |_ PersonalChallenge.js
  |    |_ SocialChallenge.js
  |
  |_ public
  |    |_ images
  |    |_ styleSheets
  |    |_ javascript (front-end Validation)
  |    
  |_ routes
  |    |_ index.js
  |    |_ auth.js
  |    |_ private.js
  |  
  |_ views
  |    |_ auth              (Back-end Validation)
  |    |    |_ login.hbs
  |    |    |_ signup.hbs
  |    |    
  |    |_ index.hbs
  |    |_ profile.hbs
  |    |_ newChallenge.hbs
  |    |_ editChallenge.hbs
  |    |_ socialChallenges.hbs
  |    |_ ChallengeDetail.hbs
  |
  |_ app.js
 ```
  
## Routes:
get("/")
get("/login")
post("/login")
get("/signup")
post("/signsup")
get("/profile")
post("/challenge-achieved")
post("/challenge-failed")
get("/cahllenge-modify")
post("/challenge-delete")
get("/challenge-details")
get("/challenge-add")
get("/social-challenges")
get("/social-challenge-details")
post("/social-challenge-join)

  
  ## Views:
  - Landing page
  - Sign up form
  - Log in form
  - Profile
  - Creating / Updating personal challenges
  - Social Challenges List
  - Challenge Details
  
  ## States y States Transitions
Not MVP. TBD in a later stage


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)

       
       
       
       
  
