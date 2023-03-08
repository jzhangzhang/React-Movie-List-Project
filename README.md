# React-Movie-List-Project

Header:
- [x] There should be a header showing icon and"HOME", "Favorite" and “Rated”
- [x] There should be a login button in the header
- [x] Clicking home will navigate to root url. Clicking “Favorite” to “/favorite”, Clicking “Rated” to “/rated”
- [x] Clicking “login” to “/login”
- [x] If user has login, we should show user name
- [x] Clicking the username should allow people to logout.

Login Page
- [x] “/login” url should show login page
- [x] Page should show a “Login” title
- [x] Page should show a two input box for “Username” and “Password”
- [x] Page should show a “submit” button
- [x] Clicking “submit” button should show a loading icon while logging in
- [x] If success, it should navigate to home page
- [ ] If failed, it should show error message
- [ ] Page should show error message if no username or password is typed.

Home page
- [x] Page should load the first page of “now playing” by default
- [x] Page should show movie in a Grid format with 4 movies cards in a row
- [x] it should have a pagination controller allowing user to navigate between pages for current category
- [x] It should have a category dropdown selector with “Now playing”, “Top rated”, “Popular” and “Upcoming” options.
- [x] Select category should load the first page of the selected category
- [ ] App should cache the data that is already viewed. It means the app shouldn’t make api call for a viewed category page. Eg, if I view the second page of the now playing category from the first page, and then I turn back to the first page, the app shouldn’t call api for the first page data again because it is already cached in client side. 

Movie Card
- [x] it should show movie poster on the top, title below the poster and average rating on the button left and heart icon on the button right.
- [x] If the movie is user favorite movie, the heart icon should be filled with red, otherwise empty.
- [x] Clicking on the title will navigate to the movie details page “/movies/:movieId”
- [x] It should show user’s own rating as wellin “Rate” page
- [x] If user is login, clicking on the heart should toggle if user likes the movie
- [x] If user is not login, clicking on the heart shouldn’t do anything.

Favorite & Rated Page:
- [x] It should load user’s favorites and rated movies for “Favorite” and “Rated” page.
- [x] The movie should be displayed in the Grid style
- [x] The page shouldn’t show pagination controller
- [x] If user is not login, both pages shouldn’t not show anything.

Movie details Page:
- [x] Should show details for the movie with id in the url ( demo as reference).
- [x] The page should show user’s rate if user rated the movie, otherwise should “not yet”
- [x] The page should have a rate selector from 1- 10 and a “Rate it” button.
- [x] Clicking on the “Rate it” button should rate the movie with the score user selected.
