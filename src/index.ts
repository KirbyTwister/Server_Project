import app from "./app"
import App from "./app"

try {
    new App({
        port: 8080,
        applicationName: 'TS Server'
    }).run()
} catch (e){
    console.error(e.message)
};
