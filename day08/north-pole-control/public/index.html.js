const LOCAL_BASE_URL = 'http://localhost:7071';
const REMOTE_BASE_URL = 'https://ngk25dos08.azurewebsites.net';

const getAPIBaseUrl = () => {
    const isLocal = /localhost/.test(window.location.href);
    return isLocal ? LOCAL_BASE_URL : REMOTE_BASE_URL;
}

const app = new Vue({
    el: '#app',
    data() {
        return {
            services: []
        }
    },
    methods: {
        async getServices() {
            try {
                const apiUrl = `${getAPIBaseUrl()}/api/getServices`;
                const response = await axios.get(apiUrl);
                app.services = response.data;
            } catch (ex) {
                console.error(ex);
            }
        }
    },
    created() {
        this.getServices();
    }
});

const connect = () => {
    const connection = new signalR.HubConnectionBuilder()
                            .withUrl(`${getAPIBaseUrl()}/api`)
                            .build();

    connection.onclose(()  => {
        console.log('SignalR connection disconnected');
        setTimeout(() => connect(), 2000);
    });

    connection.on('updated', updatedService => {
        const index = app.services.findIndex(s => s.id === updatedService.id);
        app.services.splice(index, 1, updatedService);
    });

    connection.start().then(() => {
        console.log("SignalR connection established");
    });
};

connect();