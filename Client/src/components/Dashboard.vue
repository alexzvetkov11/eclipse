<template>
<div id="app">
    <el-button class="setting-box-button" icon="el-icon-s-operation" circle @click="showSettingCard=!showSettingCard"></el-button>
    <div class="setting-box-search">
        <el-input placeholder="Search" v-model="search" prefix-icon="el-icon-search"></el-input>
    </div>
    <el-card class="setting-box-card" v-if="showSettingCard">
        <div slot="header" class="clearfix">
            <span>Show Detail</span>
            <el-button style="float: right; padding: 3px 0" icon="el-icon-close" @click="showSettingCard=!showSettingCard"></el-button>
        </div>
        <mdb-row>
            <mdb-col col="12">
                <mdb-btn-group sm class="mr-2 mb-2">
                    <div @click="map">
                        <mdb-badge color="white" class="mr-1" style="font-size:60%">
                            <mdb-icon icon="map-marker-alt" style="color:#616161;" size="2x" />
                        </mdb-badge>
                    </div>
                    <div @click="zoomin">
                        <mdb-badge color="white" style="font-size:60%; border-top-left-radius:20px; border-bottom-left-radius: 20px;" class="mr">
                            <mdb-icon icon="search-plus" style="color:#616161;" size="2x" />
                        </mdb-badge>
                    </div>
                    <div @click="zoomout">
                        <mdb-badge color="white" style="font-size:60%; border-top-right-radius:20px; border-bottom-right-radius: 20px;" class="mr-1">
                            <mdb-icon icon="search-minus" style="color:#616161;" size="2x" />
                        </mdb-badge>
                    </div>
                    <div @click="bookmarknode">
                        <mdb-badge color="white" class="mr-1" style="font-size:60%;">
                            <mdb-icon icon="bookmark" style="color:#616161;" size="2x" />
                        </mdb-badge>
                    </div>
                    <div @click="bookmarkpath">
                        <mdb-badge color="white" class="mr-1" style="font-size:60%;">
                            <mdb-icon far icon="bookmark" style="color:#616161;" size="2x" />
                        </mdb-badge>
                    </div>
                    <div @click="timing">
                        <mdb-badge color="white" class="mr-1" style="font-size:60%;">
                            <mdb-icon icon="clock" style="color:#616161;" size="2x" />
                        </mdb-badge>
                    </div>
                    <div @click="calendar">
                        <mdb-badge color="white" class="mr-1" style="font-size:60%;">
                            <mdb-icon icon="calendar-alt" style="color:#616161;" size="2x" />
                        </mdb-badge>
                    </div>
                </mdb-btn-group>
            </mdb-col>
        </mdb-row>
        <mdb-row>
            <mdb-col class="text-left">
                <!-- <h5> {{showinfo.name}}</h5> -->
                <!-- <h5> {{showinfo.info}}</h5> -->
            </mdb-col>
        </mdb-row>
        <!-- <el-slider v-model="nodeSize" show-input :max="50"></el-slider>Connection width
      <el-slider v-model="linkWidth" show-input :max="20"></el-slider>Connection length
      <el-slider v-model="linkDistance" show-input :max="300" :step="50" show-stops></el-slider>Force
      <el-slider v-model="bodyStrength" show-input :min="-1000" :max="0" :step="50" show-stops></el-slider>
      <br>
      <div>
        <el-switch v-model="svgTheme" active-text="Dark mode" inactive-text="Bright mode"></el-switch>
      </div> -->
    </el-card>

    <network :nodeList="nodes" :linkList="links" :nodeSize="nodeSize" :linkWidth="linkWidth" :linkDistance="linkDistance" :svgTheme="svgTheme?'dark':'light'" :bodyStrength="bodyStrength"></network>
</div>
</template>

<script>
import Network from "./Network.vue";
import axios from "axios";

import {
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbBtnGroup,
    mdbBadge,

    // mdbCard,
    // mdbCardImage,
    // mdbCardBody,
    // mdbCardTitle,
    // mdbCardText,
    // mdbBtn,
} from 'mdbvue';

export default {
    name: "app",
    components: {
        Network,
        mdbRow,
        mdbCol,
        mdbIcon,
        mdbBtnGroup,
        mdbBadge,
    },
    data() {
        return {
            nodes: [],
            links: [],
            showSettingCard: false,
            nodeSize: 9,
            linkWidth: 2,
            linkDistance: 150,
            bodyStrength: -150,
            svgTheme: false, // light

            search: "",
        };
    },
    created() {
        axios
            .get("http://localhost:8080/data/example.json")
            .then(response => {
                this.nodes = response.data.nodes;
                this.links = response.data.links;
            })
            .catch(err => console.log(err));
        // let temp = this.$store.getters.getGraphNodes;
        // this.nodes = temp.ercot_da;
        // this.links = this.$store.getters.getGraphLinks;
        // console.log(this.nodes, this.links);
    },
    methods :{
      map() {
            this.$swal("success", "map", "success");
        },
        zoomin() {
            this.$swal("success", "zoomin", "success");
        },
        zoomout() {
            this.$swal("success", "zoomout", "success");
        },
        bookmarknode() {
            this.$swal("success", "bookmarknode", "success");
        },
        bookmarkpath() {
            this.$swal("success", "bookmarkpath", "success");
        },
        timing() {
            this.$swal("success", "timing", "success");
        },
        calendar() {
            this.$swal("success", "calendar", "success");
        },
        searchright() {
            this.$swal("success", "searchright", "success");
        },
    }
};
</script>

<style>
body {
    margin: 0;
}

.setting-box-button {
    position: fixed;
    overflow: auto;
    top: 20px;
    right: 40px;
    border: 2px solid rebeccapurple;
}

.setting-box-search {
    position: fixed;
    overflow: auto;
    top: 20px;
    left: 40px;
    max-width: 30%;
    float: left;
    z-index: 11;
}

.setting-box-card {
    position: fixed;
    z-index: 10;
    overflow: auto;
    top: 15px;
    right: 15px;
    width: 500px;
    max-height: 700px;
}
</style>
