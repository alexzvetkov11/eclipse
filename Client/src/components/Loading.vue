<template>
<video-background :src="require('../assets/background.mp4')" poster="../assets/background.png" style="max-height: 100%; height: 100vh;">
    <mdb-container class="px-md-3 px-sm-0 d-flex h-100" style="height:100vh">
        <mdb-row class="justify-content-center align-self-center">
            <mdb-col md="12" class="mt-5 white-text offset-1 " :style="{'text-align': 'left'}">
                <br /><br /><br /><br /><br /><br />
                <h3 class="display-4 font-weight-bold mb-0 pt-md-5">Loading...</h3>
                <br />
                <mdb-row>
                    <mdb-col md="12">
                        <div class="loader">
                            <div class="loaderBar"></div>
                        </div>
                    </mdb-col>
                </mdb-row>
            </mdb-col>
        </mdb-row>
    </mdb-container>
</video-background>
</template>

<script>
import {
    mdbContainer,
    mdbRow,
    mdbCol
} from 'mdbvue';
import VideoBackground from 'vue-responsive-video-background-player';
import axios from 'axios';

export default {
    name: 'Loading',
    components: {
        mdbContainer,
        mdbRow,
        mdbCol,
        VideoBackground,
    },
    mounted() {
        this.asyncGetData();
    },
    methods: {
        async asyncGetData() {
            var nodes = {
                ercot_da: [],
                ercot_rt: []
            };
            var links = {};
            await axios.get("http://localhost:4000/search_node").then((res) => {
                if (res.data.msg != "ok") {
                    this.$swal("Error", res.data.msg, "error");
                    this.$router.replace("/login");
                } else {
                    nodes = res.data.nodes;
                }
            }).catch(err => {
                this.$swal("Error", err.message, "error");
                this.$router.replace("/login");
            });

            await axios.get("http://localhost:4000/search_link").then((ress) => {
                if (ress.data.msg != "ok") {
                    this.$swal("Error", ress.data.msg, "error");
                    this.$router.replace("/login");
                } else {
                    links = ress.data.links;
                }
            }).catch(err => {
                this.$swal("Error", err.message, "error");
                this.$router.replace("/login");
            });
            this.$store.dispatch('setNodeAndLinks', {nodes,links});
            setTimeout(() => this.$router.push("/dashboard"), 100);
        }
    },
    data() {
        return {

        }
    },
};
</script>

<style scoped>
@keyframes borealisBar {
    0% {
        left: 0%;
        right: 20%;
        width: 0%;
    }

    20% {
        left: 0%;
        right: 20%;
        width: 30%;
    }

    80% {
        left: 70%;
        right: 100%;
        width: 30%;
    }

    100% {
        left: 100%;
        right: 100%;
        width: 0%;
    }

}

.video-background-page .view video {
    top: 0 !important;
    left: 0 !important;
    transform: none !important;
    height: calc(100vh);
    background-color: #f6e0a2;
}

.video-background-page .navbar {
    transition: background .5s ease-in-out, padding .5s ease-in-out;
}

.top-nav-collapse {
    background-color: #563e91 !important;
}

.loader {
    /* width:500px;  */
    margin: 0 auto;
    border-radius: 10px;
    border: 4px solid transparent;
    position: relative;
    padding: 1px;
}

.loader:before {
    content: '';
    border: 1px solid #fff;
    border-radius: 10px;
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
}

.loader .loaderBar {
    position: absolute;
    border-radius: 10px;
    top: 0;
    right: 100%;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 0;
    animation: borealisBar 1s linear infinite;
}
</style>
