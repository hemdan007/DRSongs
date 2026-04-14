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
 // Get all songs with optional filtering
        async getAll() {
            try {
                const response = await axios.get(this.baseUrl, {
                    params: { search: this.search }
                });
                this.songs = response.data;
            }
            catch (error) {
                console.error(error);
                alert("Error retrieving songs!");
            }
        },                //add method
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