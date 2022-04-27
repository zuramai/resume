import { defineConfig } from 'vite'
import axios from 'axios'
import handlebars from 'vite-plugin-handlebars';

const resumeURL = "https://gist.githubusercontent.com/zuramai/5481baa53f9b634362cce9d23c090da5/raw/"

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
                    const resume = await getResumeJSON()
                    return resume
                },
            })
        ]
    }
  })
  
