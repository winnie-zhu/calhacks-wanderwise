# WanderWise


## Inspiration
A few weeks prior to this hackathon, our team was struggling to plan a trip to Japan. That's when we realized how nice it would be to have a tool that plans the trip for us! So, we decided to take on the challenge to build this ourselves. 

## What it does
WanderWise uses an AI model to generate itineraries based on users' desired destination and timeframe. In addition to itinerary generation, WanderWise's simple and clean design makes it easy to visualize your itineraries the next time you plan to travel.

## How we built it
We used React to build the frontend and Express for the backend server. We utilized MindsDB to link our real-time data stored in CockroachDB to an OpenAI model API.

## Challenges we ran into
It was our first times using MindsDB and CockroachDB, so it took a while for us to get started and familiarize ourselves with the new technology. Also, integrating all different technologies caused unexpected issues.

## Accomplishments that we're proud of / What we learned
We were able to connect our MindsDB application to our CockroachDB database. With that, we were able to take advantage of the AI workflows that MindsDB offers. This is just one example the many new technologies we've learned to use while building this project.

## What's next for WanderWise
We have several goals for our app in the future:
- Persist itinerary data for different users so that users can look at their previously generated itineraries
- Improved UI for better UX (e.g. adjustable schedules, multimodal representation for landmarks)
- Adjusting queries to match users' budget as well as displaying the estimated costs
- Share/Save/Export itineraries
- Calendar integration for a better curated response

