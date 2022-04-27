import { defineConfig } from 'vite'
import axios from 'axios'
import hbs from 'handlebars';
import handlebars from 'vite-plugin-handlebars';
import json from "./resume.json"

const resumeURL = "https://gist.githubusercontent.com/zuramai/5481baa53f9b634362cce9d23c090da5/raw"

const getResumeJSON = async () => {
    let resume = {}
    await axios.get(resumeURL)
        .then(res => {
            resume = JSON.parse(JSON.stringify(res.data))
        })
    return resume
}

export default defineConfig(async ({ command, mode }) => {
    return {
        plugins: [
            handlebars({
                context: async () => {
                    const resume = json
                    return resume
                },
                helpers: {
                    breaklines: (text) => {
                        text = hbs.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new hbs.SafeString(text);
                    },
                    isNotEmpty: (arr) => {
                        return arr.length > 0
                    }
                }
            })
        ],
    }
  })
  
