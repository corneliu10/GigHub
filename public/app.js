window.addEventListener("load", function () {
    Vue.prototype.axios = axios;
    let vueObj = new Vue({
        el: "#vue-app",
        data: {
            artists: [
            ],
            selectedArtist: {
                name: "Choose Artist",
                id: ""
            },
            gigs: [
                
            ],
        },
        created: function () {
            this.axios.get('/api/artists')
                .then((_response) => {
                    this.artists = _response.data.data;
                });

            this.axios.get('/api/gigs')
                .then((_response) => {
                    this.gigs = _response.data.data;
                });
        },
        methods: {
            add: function () {
                let name = document.getElementById("name").value;
                let age = document.getElementById("age").value;
                let instruments = document.getElementById("instruments").value;
                let bio = document.getElementById("comment").value;

                if (!name || !age || !instruments || !bio) {
                    alert("Not enough data!");
                    return;
                }

                let oo = {
                    name: name,
                    age: age,
                    instruments: instruments,
                    bio: bio
                };

                axios.post('/api/artists', oo)
                    .then(_response => {
                        if (_response.data.ret === "OK") {
                            //Vue.set(this.currency, _response.data.id, oo);
                            alert("Artist added!");
                            document.getElementById("name").value = "";
                            document.getElementById("age").value = "";
                            document.getElementById("instruments").value = "";
                            document.getElementById("comment").value = "";
                        }
                    });
            },
            addGig: function() {
                let gigName = document.getElementById("gig_name");
                let location = document.getElementById("gig_location");
                let artistID = this.selectedArtist.id;

                if (!gigName.value || !location.value || !artistID) {
                    alert("Not enough data!");
                    return;
                }

                let oo = {
                    name: gigName.value,
                    location: location.value,
                    id: artistID,
                };

                axios.post('/api/gigs', oo)
                    .then(_response => {
                        if (_response.data.ret === "OK") {
                            //Vue.set(this.currency, _response.data.id, oo);
                            alert("Gig added!");
                            gigName.value = "";
                            location.value = "";
                            this.selectedArtist = {
                                name: "Choose Artist",
                                id: ""
                            }
                        }
                    });
            }
        }
    });
});
