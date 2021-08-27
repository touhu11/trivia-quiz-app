Capstone: Creating a Trivia Quiz App for an API

# Fetching the data from the API
<ul>
    <li>Randomly selecting a category ID.</li>
    <li> Using a function to fetch the questions from the selected ID.</li>
    <li>Randomly selecting a question and display on the page.</li>
</ul>
# Display a question with its category on the page
    ## Using the screen management to turn on the target display screen 
    and all of the other screens are off.
    ## Using the id selection to make the different views on the screen.
    ## Using the class selection to style the sheets.
# Validing the user input
    ## Creating an input element and using the user input
    ## Validating the user input by comparing it with the data from the API 
        ### Making an object with some properties such as a question, an answer, 
            and a user answer
        ### usering the object to comparing those propeties.
# Creating some buttons to interact with the user input and display
    ## Creating the start, restart and end buttons.
    ## Testing the functionality of the buttons by using the sample category IDs.
        By using idArray = [14537,3466] and categoryID = idArray[Math.floor(Math.random()*2)] in the fetch function to check whether the buttons work as expected.
            ### categoryID = 14537 (countries)
                #### Clue Questions
                    0: "Thomas Hobbes,William of Ockham"
                    1: "Pico Della Mirandola,Boethius"
                    2: "John Dewey,John Rawls"
                    3: "Desidierius Erasmus,Baruch Spinoza"
                    4: "Robert Boyle,George Berkeley"
                #### Corresponding Answers
                    0: "Britain"
                    1: "Italy"
                    2: "the U.S."
                    3: "the Netherlands"
                    4: "Ireland"
            ### categoryID = 3466 (Hurricans)
                #### Clue Questions
                    0: "1985:Same as Steinem & Estefan"
                    1: "1991:Same as Fosse & Barker"
                    2: "1955:Same as Reno & Jackson"
                    3: "1983:Same as Witt & Silverstone"
                    4: "1979:Same as Remington & Chopin"
                #### Corresponding Answers
                    0: "Gloria"
                    1: "Bob"
                    2: "Janet"
                    3: "Alicia"
                    4: "Frederic"
    ##  Testing the functionality of all the category IDs from API using some key information from
        https:/jservice.io/search.

