# Weather_Dashboard
A Dashboard for gathering weather info


## My Task

My task was to create a simple calendar application that allows a user to save events for each hour of the day by modifying starter code. 

This app will runs in the browser and features dynamically updated HTML and CSS powered by jQuery.

## Challange

I was challenged to make a code quiz that is a series of questions that must be completed in an alloted time. It was to capture High Scores entered and have a HS page.

In this project you'll be creating a daily planner for keeping track of tasks. The HTML is given to you for this, you just have to create the JavaScript.

You must complete the following tasks for this project:

* Show the current day at the top of the calendar (day and date, see gif for format)
* A series of timeblock elements must exist on the page (you can create these dynamically in JavaScript or place them manually on the page, either will work for now). These should match the spec you see below.
* Each timeblock has an hour associated with it. Take the current time into account and compare it to the hour of the timeblock. Give each timeblock a specific color depending on if it has already happened, is happening now, or will happen in the future.
* You should have a textbox inside each timeblock, to allow entering events.
* There should be a button to the right of each timeblock. When this button is clicked, save the corresponding event to localstorage for that time slot.
* When loading the page, fetch all the stored data for each timeslot from localstorage and put those values in the corresponding textboxes for the given timeblocks.

## Extra Features

Added feature to add hours to the beginning and end of the day if you need to extend your work day.

Though this sounds easy, I had to rethink my data structure for storing the data since the addition of new data before and after made it difficult to use an array on its own. 

I ended up using an array of dictionaries to store key value pairs matching each hour. 

hour, text, and status.


## What I Learned

Really enjoyed how how great jQuery is to simply things and DayJS is really cool for time keeping. 

## Demo Images

![demo](./assets/Screenshot%202023-05-29%20at%206.50.33%20AM.png)



## GitHub Repository

[repo](https://github.com/1willcobb/Work_Day_Scheduler)

## Live Site

[Work Day Scheduler](https://1willcobb.github.io/Work_Day_Scheduler/)