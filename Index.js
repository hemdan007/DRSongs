Vue.createApp({
    data() {
        return {
                    songs: [] ,
                    baseUrl: " http://localhost:5121/api/songs" ,
                    adddata: {
                        title: "",
                        artist: "",
                        duration: "",
                        publicationYear: ""
                    }

               }
    },
    methods: {
        // get all Method
                async getAll() {
                    try {
                        const response = await axios.get(this.baseUrl);
                        this.songs = response.data;
                    }
                    catch{
                        alert("error!")
                    }
                },
                //add method
                async add() {
                    try {
                        
                        await axios.post(this.baseUrl, this.adddata);
                        this.getAll(); // Refresh the list after adding
                    }
                    catch{
                        alert("error!")
                    }
                }


            }
}).mount("#app")