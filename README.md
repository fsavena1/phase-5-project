Phase 5 capstone project 

Use a Rails API backend with a React frontend.

Have at least three models on the backend, that include the following:
  At least two one-to-many relationships.
  At least one reciprocal many-to-many relationship (implemented by using 2 has-many-through relationships). Note: in order to accomplish this, your project must include a joins table. This joins table must include a user submittable attribute.
  Full CRUD actions for at least one resource.
  Minimum of create and read actions for EACH resource.

Have at least three different client-side routes using React Router. Be sure to include a nav bar or other UI element that       allows users to navigate between routes.

Implement authentication/authorization, including password protection. A user must be able to:
  sign up with a new user account,
  log in to the site with a secure password and stay logged in via user ID in the session hash, and
  log out of the site.

#--------------------------------------------------------------------------------------------------------------------#

  # MODEL #
  users, movies, reviews 

    Mser will have many reviews and many movies through reviews 
    Movies will have many reviews and many users through reviews 
    Review will belong to the user and to the movie 

 #--------------------------------------------------------------------------------------------------------------------#

 # ROUTES #
  Login/ create profile 
  Home page displays # of objects 
  Search page 
  User profile page 
  Movie description page shows reviews with user info


#--------------------------------------------------------------------------------------------------------------------#


# COMPONENTS #

App 
  Navbar 
    User create form 
    User Card - profile info and movie reviewed/ saved info 
    Home page 
  Movie Container 
    Movie Card- movie data along with user reviews 
      Review Create page 
  Movie search 
  Create movie (if not available)
  

#--------------------------------------------------------------------------------------------------------------------#

# To Do #
- start DB create resources for User, Movie, and Review 
- Seed User DB 
- Start front end to fetch data from TMDB to post into Movie DB
  - check DB associations once Movie data is posted 
  - render movie compnents 
- Create Review component and review objects to check DB associations

#--------------------------------------------------------------------------------------------------------------------#
- user can add favotires and reviews to their profile 

- they can search by movie title or user names 

- view movie details along with reviews of the movies 

- view user profile information along with movies they have favorited 

- users can give their rating of a movie (implement stars )

- once a user has 10/20/30 reviews they get a new attribute (dan and kevin phase 4 project)

- scroll pages of movies (our phase 2 project )

- implement a carasole of scrolling (sam and sandy phase 2 project)

- Filtering movies along with search results (sam and sandy phase 2 project)