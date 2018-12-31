new Vue({
    el: "#vue-app",
    data: {
        home: false,
        searchArtist: false,
        addArtist: true,
        addGig: false,
    },
    methods: {
        setHome: function() {
            this.home = true;
            this.searchArtist = false;
            this.addArtist = false;
            this.addGig = false;
        },
        setSearchArtist: function() {
            this.home = false;
            this.searchArtist = true;
            this.addArtist = false;
            this.addGig = false;
        },
        setAddArtist: function() {
            this.home = false;
            this.searchArtist = false;
            this.addArtist = true;
            this.addGig = false;
        },
        setAddGig: function() {
            this.home = false;
            this.searchArtist = false;
            this.addArtist = false;
            this.addGig = true;
        },
    }
});
