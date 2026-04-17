Vue.createApp({
    data() {
        return {
            songs: [],
            baseUrl: "http://localhost:5121/api/songs",
            authurl: "http://localhost:5121/api/auth/login",
            search: "",
            adddata: {
                title: "",
                artist: "",
                duration: "",
                publicationYear: ""
            },
            auth: {
                username: "",
                password: ""
            },
            authMessage: "",
            jwtToken: "",
            role: null,
            loggedIn: false,
            message: "",
            updateData: {
                id: "",
                title: "",
                artist: "",
                duration: "",
                publicationYear: ""
            },
            updateMessage: "",
            deleteId: "",
            deleteMessage: ""

        }
    },
    methods: {

        login() {
            axios.post(this.authurl, this.auth)
                .then(response => {
                    this.jwtToken = response.data.token;
                    this.role = response.data.role;
                    this.loggedIn = true;
                    this.authMessage = "Authentication successful";
                    this.getAll(); // Fetch songs immediately after successful login
                }).catch(ex => {
                    this.authMessage = "Authentication failed - " + ex.message;
                });
        },
        logout() {
            this.jwtToken = null;
            this.role = null;
            this.loggedIn = false;
            this.auth = { username: "", password: "" };
            this.songs = [];
            this.message = null;
            this.authMessage = "Logged out successfully";
        },




        // Get all songs with optional filtering
        async getAll() {
            try {
                const config = {
                    params: { search: this.search }
                };
                if (this.jwtToken) {
                    config.headers = {
                        'Authorization': `Bearer ${this.jwtToken}`
                    };
                }
                const response = await axios.get(this.baseUrl, config);
                this.songs = response.data;
            }
            catch (error) {
                console.error(error);
                alert("Error retrieving songs!!");
            }
        },                //add method
        async add() {
            try {
                const config = {};
                if (this.jwtToken) {
                    config.headers = {
                        'Authorization': `Bearer ${this.jwtToken}`
                    };
                }
                await axios.post(this.baseUrl, this.adddata, config);
                this.getAll(); // Refresh the list after adding
            }
            catch {
                alert("error!")
            }
        },
        // Update method
        async update() {
            if (!this.updateData.id || !this.updateData.title || !this.updateData.artist || !this.updateData.duration || !this.updateData.publicationYear) {
                alert("Please fill in all fields.");
                return;
            }
            const url = this.baseUrl + "/" + this.updateData.id;
            try {
                const config = {};
                if (this.jwtToken) {
                    config.headers = {
                        'Authorization': `Bearer ${this.jwtToken}`
                    };
                }
                await axios.put(url, this.updateData, config);
                this.updateData.id = "";
                this.updateData.title = "";
                this.updateData.artist = "";
                this.updateData.duration = "";
                this.updateData.publicationYear = "";
                await this.getAll(); // Refresh the list after updating
                this.updateMessage = "Song updated successfully!";
            }
            catch {
                alert("error!")
            }
        },

        async deleteSong(id) {
            if (!id) {
                this.deleteMessage = "Please enter a valid song ID";
                return;
            }

            try {
                const config = {};
                if (this.jwtToken) {
                    config.headers = {
                        'Authorization': `Bearer ${this.jwtToken}`
                    };
                }
                await axios.delete(`${this.baseUrl}/${id}`, config);
                this.deleteMessage = "Song deleted successfully";
                this.deleteId = "";
                await this.getAll();
            } catch (error) {
                this.deleteMessage = "Error deleting song - it may not exist or you don't have permission";
                console.error(error);
            }
        },

    }
}).mount("#app")