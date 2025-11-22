[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ZGhVjoS9)
# Web 2 - Lab Day 1

**Goal:** Create a city search and weather web app using Open-Meteo API

**Demo:** [https://drive.google.com/file/d/11eIFN9yehA3auTzPKWY5rVhXhZML2KRy/view?usp=sharing]

## Instructions

1. Recreate the demo video provided for this exercise
2. Using an input field, fetch the city data first and then the weather data. Pass the latitude and longitude from the city data as parameters to fetch the weather
3. The webpage will turn dark if it is currently night time in the city. Also, use the `day.jpg` and `night.jpg` as background images depending on if it is day or night (**Hint:** There's a property called `is_day` in the weather data)
4. The CSS doesn't need to match exactly as the demo
5. Commit and push your changes once done

## API Endpoints

- **City:** [https://geocoding-api.open-meteo.com/v1/search?name=Vancouver&count=1&language=en&format=json]
- **Weather:** [https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1]

The *city name*, *latitude*, and *longitude* on the endpoints are currently pointing to Vancouver. You need to modify it and make it accept variables. For example:

```js
`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
```

```js
`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
```
