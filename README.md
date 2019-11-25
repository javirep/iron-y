# iron-y

## Description
iron-y is a mobile app were users can create/read/update/delete (CRUD) different challenges during their time in ironhack (i.e. making their pull-request on time or sleeping a decent amount of time). By joining and achieving this challenges students will increase their motivation and mental health, so what are you waiting to join iron-y?

## MVP
- Allowing users to sign up and log in, while recording their data in a data base (using MongoDB / Atlas). 
- The sign up and log in must have minimum validation requirements. 
- The user should have the posibility of creating, reading, updating and deleting (CRUD) personal challenges.
- The user should have the posibility of joining social challenges already created by us.
- The user should be able of modifying his/her personal info and profile image. His/her profile images will be storage in a cloud (cloudinary)

## Backlog
- Completing or failing the challenges will result in life / experience gain or lost by the user. 
- The logo of the landing page will contain animation features. 

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
```
get("/")
get("/login")
post("/login")
get("/signup")
post("/signup")
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
```
  
  ## Views:
  - Landing page
  - Sign up form
  - Log in form
  - Profile
  - Creating / Updating personal challenges
  - Social Challenges List
  - Challenge Details
  
### Git
URls for the project repo and deploy
[Link Repo](https://github.com/javirep/iron-y)
[Link Deploy](https://iron-y.herokuapp.com/)


### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1jnZN63kbEE9yj2-IEGzcw2-tsDWi1SK2FF4h5Yz_kyk/edit?usp=sharing)

       
       
       
       
  
