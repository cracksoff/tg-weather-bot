import { bot } from '#app/utils'
import * as methods from '#app/weather'

const getStart = async () => {
	try {
		bot.command('start', async (ctx) => {
			try {
				const user = ctx.chat.id

				await bot.api.sendMessage(user, "Привет! Напиши город, погоду которого хочешь узнать или отправь мне свою гео-метку!")
			} catch (err) {
				console.log(`Failed to say Hi! after /start: ${err}`);
			}
		})
		
		bot.on('msg:text', async (ctx) => {
			const user = ctx.chat.id
			const message = ctx.message.text

			const data = await methods.getWeatherCity(message)

			if (!data) {
				await bot.api.sendMessage(user, "Такой город не найден! Напиши город, погоду которого хочешь узнать!")
			} else {
				await bot.api.sendMessage(user, `${data.cityName}, ${data.country}.\nНебо: ${data.weatherMain}, ${data.weatherDes}\nТемпература: Сейчас ${data.tempNow}°C, Ощущается как ${data.feelsLike}°C \n Минимальная температура ${data.tempMin}°C, Максимальная температура ${data.tempMax}°C\nПлотность облаков ${data.clouds}%\nСкорость ветра ${data.wind}м/с\nВлажность ${data.humidity}%`)

				await bot.api.sendMessage(user, "Напиши город, погоду которого хочешь узнать или отправь мне свою гео-метку!")
			}
		})

		bot.on('msg:location', async (ctx) => {
			const user = ctx.chat.id
			const location = ctx.message

			const data = await methods.getWeatherLocation(location)

			await bot.api.sendMessage(user, `${data.cityName}, ${data.country}.\nНебо: ${data.weatherMain}, ${data.weatherDes}\nТемпература: Сейчас ${data.tempNow}°C, Ощущается как ${data.feelsLike}°C \n Минимальная температура ${data.tempMin}°C, Максимальная температура ${data.tempMax}°C\nПлотность облаков ${data.clouds}%\nСкорость ветра ${data.wind}м/с\nВлажность ${data.humidity}%`)

			await bot.api.sendMessage(user, "Напиши город, погоду которого хочешь узнать или отправь мне свою гео-метку!")
		})

		bot.start()
		console.log('Sucessfully started!');
	} catch (err) {
		console.log(`Got an error in main getStart func: ${err}`);
	}
}

getStart()