V1-3:

    1.0

        -Add landing pages

            -Index page

            -Camprounds page that lists all initial campgrounds (currently in a hard-coded array)

                Contains: img and name

        -Added initial routes

    1.1

        -Added header/footer partials.

            -Linked them in landing.ejs

        -Enabled Bootstrap (added the link href in header.ejs)

    1.2

        -Added body.parse()  (npm install body-parser --save into our package.json)

        -set new campground POST routes - Take note of the variables that are established.

            We greated a new template (newCampground) that will post the same way to the campgrounds array.

            Also, note the res.redirect() to &#39;redirect you back to the &#39;new&#39; campgrounds page

        -setup route to show form - Take note of the action in the form HTML

        -Added unstyled form in /campgrounds/new.ejs

    1.3

        -More styling on the campgrounds page

        -Grid display for the individual campgrounds

        -Bootstrap: jumbotron, thumbnails, rows &amp; columns, captions, etc. SOME inline styling that will

            get removed later.

    1.4

        -More styling on the &quot;Add Campground&quot; form- centering, stacked forms

        -Added navbar

    2.0

        -Intalled mongoose and connected it in app.js. Will use yelp\_camp as the DB collection

        -Created the campground schema for the DB

        -Switched from hardcoded array with campgrounds to a mongo DB

    2.1

        -Added description to campground schema, input form on /new

        -Added /show route

    3.0

        -Create models dir

        -Refactor using modules.exports

    3.1

        -Create Seeds file seeds.js (seeds DB with data)

        -Create comments model

        -Added generic comment to seed

V4:

    4.0

        -added comment functionality, form and button

V5:

    5.0

        -Styled show page by adding stylesheet

            -padding, full width images within thumbnail

V6:

    6.0

        -Added authentication routes and npms

    6.1

        -functionality in navbar to hide/show certain elements when logged in, etc

V7:

    7.0

        -Massive Refactoring. added routes directory and split up app.js so compare this to v6 if you want to see how to refactor large app.js files

V8:

    8.0

        -changed comments schema (author is now object)

        -removed author from comments routes &amp; form

    8.1

        -prevent an unauthenticated user from creating a campground &amp; save username and id to newly created campground

V9

    9.0

        -create full CRUD functionality for updating &amp; deleting comments, compgrounds, etc

    9.1

        -refactored middleware into seperate js file

V10

    10.1

        -Added connect-flash npm which creates error flash messages

        -added slideshow to front page

        -installed nodemon which listens for changes to files and automaticals restarts server when needed







Routes

------------------------

Campgrounds:

INDEX       /campgrounds

NEW         /campgrounds/new

CREATE      /campgrounds

SHOW        /campgrounds/:id

EDIT        /campgrounds/:id/edit

UPDATE      /campgrounds/:id

DESTROY     /campgrounds/:id

Comments:

NEW         /campgrounds/:id/comments/new

CREATE      /campgrounds/:id/comments

UPDATE      /campgrounds/:id/comments/:comment\_id/edit

DESTOY      /campgrounds/:id/comments/:comment\_id
