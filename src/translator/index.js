import {YANDEX_TOKEN, FOLDER_ID} from '#app/utils'
import { got } from "got"

export const translateRu = async (message) => {
	try {
		const request = await got('https://translate.api.cloud.yandex.net/translate/v2/translate', {
			method: 'POST',
			json: {
				'targetLanguageCode': 'en',
				'texts': message,
				'folderId': FOLDER_ID
			},
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${YANDEX_TOKEN}`
			}
		}).json()

		const result = request.translations[0].text
	
		return result
	} catch (err) {
		console.log(`Something went wrong in translateRu func: ${err}`);
	}
}

export const translateEn = async (message) => {
	try {
		const request = await got('https://translate.api.cloud.yandex.net/translate/v2/translate', {
			method: 'POST',
			json: {
				'targetLanguageCode': 'ru',
				'texts': message,
				'folderId': FOLDER_ID
			},
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${YANDEX_TOKEN}`
			}
		}).json()

		const result = request.translations[0].text
	
		return result
	} catch (err) {
		console.log(`Something went wrong in translateRu func: ${err}`);
	}
}