import { API_TOKEN, WEB_TOKEN } from "#app/utils";
import { got } from "got";
import * as methods from '#app/translator'

const kelToCel = (temp) => {
	const result = Math.round(Number(temp) - 273)
	return result
}

export const getWeatherLocation = async (data) => {
	try {
		const {latitude, longitude} = data.location
		
		const request = await got(`https://api.openweathermap.org/data/2.5/weather`, {
				method: 'GET',
				searchParams: {
					lat: latitude,
					lon: longitude,
					appid: API_TOKEN
				}
		}).json()
		
		const promises = [await methods.translateEn(request.name), await methods.translateEn(request.weather[0].main), await methods.translateEn(request.weather[0].description)]
		const translates = await Promise.all(promises)

		const result = {
			cityName: translates[0],
			country: request.sys.country,
			tempNow: kelToCel(request.main.temp),
			feelsLike: kelToCel(request.main.feels_like),
			tempMin: kelToCel(request.main.temp_min),
			tempMax: kelToCel(request.main.temp_max),
			humidity: request.main.humidity,
			wind: Math.round(request.wind.speed),
			clouds: request.clouds.all,
			weatherMain: translates[1],
			weatherDes: translates[2]
		}

		return result
	} catch (err) {
		console.log(`Failed to get user location: ${err}`);
	}
}

export const getWeatherCity = async (message) => {
	try {
		message = await methods.translateRu(message)

		const request = await got(`https://openweathermap.org/data/2.5/find`, {
					method: 'GET',
					searchParams: {
						appid: WEB_TOKEN,
						q: message,
						type: 'like',
						sort: 'population',
						_:1663316741671,
						cnt: 30
					}
			}).json()
		
		if (!request.count) return false

		const city = request.list[0]

		const promises = [await methods.translateEn(city.name), await methods.translateEn(city.weather[0].main), await methods.translateEn(city.weather[0].description)]
		const translates = await Promise.all(promises)
	
		const result = {
			tempNow: kelToCel(city.main.temp),
			feelsLike: kelToCel(city.main.feels_like),
			tempMin: kelToCel(city.main.temp_min),
			tempMax: kelToCel(city.main.temp_max),
			humidity: city.main.humidity,
			cityName: translates[0],
			country: city.sys.country,
			wind: Math.round(city.wind.speed),
			clouds: city.clouds.all,
			weatherMain: translates[1],
			weatherDes: translates[2]
		}

		return result
	} catch (err) {
		console.log(`Something went wrong in getWeatherCity func: ${err}`);
	}
}