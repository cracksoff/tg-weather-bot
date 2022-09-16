export const {BOT_TOKEN, API_TOKEN, WEB_TOKEN, PROJECT_ID, FOLDER_ID} = process.env
import fs from 'fs'
export const {YANDEX_TOKEN} = JSON.parse(fs.readFileSync('/home/ubuntu/projects/weather-bot/src/token.json'))
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
import { Bot, Keyboard} from "grammy"
export const bot = new Bot(BOT_TOKEN)

