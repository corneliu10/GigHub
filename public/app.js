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
            addArtist: function () {
                let fname = document.getElementById("fname").value;
                let lname = document.getElementById("lname").value;
                let age = document.getElementById("age").value;
                let instruments = document.getElementById("instruments").value;
                let bio = document.getElementById("comment").value;

                if (!fname || !lname || !age || !instruments || !bio) {
                    alert("Not enough data!");
                    return;
                }

                let oo = {
                    fname: fname,
                    lname: lname,
                    age: age,
                    instruments: instruments,
                    bio: bio
                };

                axios.post('/api/artists', oo)
                    .then(_response => {
                        if (_response.data.ret === "OK") {
                            //Vue.set(this.currency, _response.data.id, oo);
                            alert("Artist added!");
                            document.getElementById("fname").value = "";
                            document.getElementById("lname").value = "";
                            document.getElementById("age").value = "";
                            document.getElementById("instruments").value = "";
                            document.getElementById("comment").value = "";
                        }
                    });
            },
            addGig: function() {
                let gigName = document.getElementById("gig_name");
                let location = document.getElementById("gig_location");
                let gigDate = document.getElementById("gig_date");
                let artistID = this.selectedArtist.id;

                if (!gigName.value || !location.value || !artistID || !gigDate.value) {
                    alert("Not enough data!");
                    return;
                }

                let oo = {
                    name: gigName.value,
                    location: location.value,
                    id: artistID,
                    date: gigDate.value,
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
                            };
                            gigDate.value = "";
                        }
                    });
            }
        }
    });

    $(function () {
          $('#datetimepicker1').datetimepicker();
       });
});
