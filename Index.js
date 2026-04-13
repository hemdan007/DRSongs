Vue.createApp({
    data() {
        return {
                    songs: [] ,
                    baseUrl: " http://localhost:5121/api/songs" ,

               }
    },
    methods: {
                async getAll() {
                    try {
                        const response = await axios.get(this.baseUrl);
                        this.songs = response.data;
                    }
                    catch{
                        alert("error!")
                    }
                },
            }
}).mount("#app")