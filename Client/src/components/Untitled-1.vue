<!-- d3 4.12.2 -->
<template>
<mdb-container fluid>
    <br />
    <mdb-row class="justify-content-between mt-3 mb-0">
        <mdb-col col="3">
            <mdb-input label="Search" type="text" class="active-cyan-2 active-purple-2 mt-0 mb-3" />
        </mdb-col>
        <mdb-col col="3">
            <mdb-btn class="float-right" @click="isOpen = ! isOpen;">Node and Path</mdb-btn>
        </mdb-col>
    </mdb-row>
    <div id="divsvg"></div>
    <mdb-view>
        <mdb-container>
            <mdb-row>
                <mdb-col col="9">

                </mdb-col>
            </mdb-row>
        </mdb-container>
    </mdb-view>

    <div>
        <hsc-window-style-metal>
            <!-- <hsc-window title="Pannel" :style="{left:wleft, top:htop}" :closeButton="true" :isOpen.sync="isOpen"> -->
            <hsc-window title="Pannel" :top="200" :left=wleft :closeButton="true" :isOpen.sync="isOpen">
                <!-- <fieldset>
                    <legend>&alpha;</legend>
                    <input type="range" />
                </fieldset>
                <fieldset>
                    <legend>&beta;</legend>
                    <input type="range" />
                </fieldset> -->
                <br />
                <mdb-row>
                    <mdb-col col="12">
                        <mdb-btn-group sm class="mr-2 mb-2 float-left">
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
                        <h5> {{showinfo.name}}</h5>
                        <!-- <h5> {{showinfo.info}}</h5> -->
                    </mdb-col>
                </mdb-row>
            </hsc-window>
        </hsc-window-style-metal>
    </div>
</mdb-container>
</template>

<script>
import {
    mdbContainer,
    mdbView,
    mdbInput,
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
    mdbBtn,
} from 'mdbvue';

import * as d3 from "d3";
// import graph from "../data/miserables.json";

export default {
    name: 'dashboard',
    components: {
        mdbContainer,
        mdbView,
        mdbInput,
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
        mdbBtn,
    },
    data() {
        return {
            // nodes: this.$store.state.graph.nodes,
            // links: this.$store.state.graph.links,
            nodes: undefined,
            links: undefined,
            showinfo: {
                name: "",
                info: undefined,
            },
            selected: false,
            isOpen: false,
            wleft: window.innerWidth - 250,
        }
    },
    mounted() {
        //this.graph = this.$clone(this.graphObserve);
        // this.links.forEach(e=> e.source = JSON.parse(JSON.stringify( e.source)));
        this.nodes = this.$store.getters.getGraphNodes;
        this.links = this.$store.getters.getGraphLinks;
        console.log( "dashboard" , this.nodes );
        console.log( "dashboard" , this.links );
        this.showChat();
    },
    methods: {
        showChat() {
            const v = this;
            const width = 1000;
            const height = 800;

            const svg = d3.select("#divsvg").append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
                })).append("g");

            const color = d3.scaleOrdinal(d3.schemeCategory20);
            this.simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function (d) {
                    return d.pnodeid;
                }).distance(60).strength(1))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2));

            this.link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(v.links)
                .enter().append("line")
                .attr("stroke", "#999")
                .attr("stroke-width", function () {
                    return Math.sqrt(1);
                })
                .on('click', function () {
                    v.showinfo = {
                        name: "lines",
                        info: this,
                    };
                });

            this.node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("g")
                .data(v.nodes.ercot_da)
                .enter().append("g");

            this.node.append("circle")
                .attr("r", 2)
                .attr("fill", function (d) {
                    return color(d.group);
                })
                .attr("stroke-width", "1.5px")
                .call(d3.drag()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended))
                .on('click', function () {
                    v.showinfo = {
                        name: "nodes",
                        info: this,
                    };
                });

            this.node.append("text")
                .text(function (d) {
                    return d.pnodeid;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "5px")
                .attr('x', 6)
                .attr('y', 3);

            this.node.append("title")
                .text(function (d) {
                    return d.pnodeid;
                });

            this.simulation
                .nodes(v.nodes.ercot_da)
                .on("tick", this.ticked);

            this.simulation.force("link")
                .links(v.links);
        },
        ticked() {
            console.log("ticked");
            this.link
                .attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            this.node
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
        },
        dragstarted(d) {
            if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        },

        dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        },

        dragended(d) {
            if (!d3.event.active) this.simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        },

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
    },

}
</script>

<style scoped>
</style>
