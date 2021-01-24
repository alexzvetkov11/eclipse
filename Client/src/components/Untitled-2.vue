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
//import graph from "../data/miserables.json";

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
        this.nodes = this.$store.getters.getGraphNodes;
        this.links = this.$store.getters.getGraphLinks;
        console.log(this.links);
        this.showChat();
    },
    methods: {
        showChat() {
            const width = 1000;
            const height = 800;
            let forceProperties ={
                center: {
                    x: 0.5,
                    y: 0.5
                },
                charge: {
                    enabled: true,
                    strength: -100,
                    distanceMin: 1,
                    distanceMax: 1000,
                },
                collide: {
                    enabled: true,
                    strength: 0.7,
                    iterations: 2,
                    radius: 15,
                    muiticolor: false,
                },
                forceX: {
                    enabled: false,
                    strength: .1,
                    x: .5
                },
                forceY: {
                    enabled: false,
                    strength: .1,
                    y: .5
                },
                link: {
                    enabled: true,
                    distance: 250,
                    iterations: 1,
                    opacity: 1,
                },
                text:{
                    enabled: true,
                    size: 15,
                }
            };

            const color = d3.scaleOrdinal(d3.schemeCategory20);

            const svg = d3.select("#divsvg").append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
                })).append("g");

            this.simulation = d3.forceSimulation();
            this.link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(this.links)
                .enter().append("line")
                .attr("stroke", "#999")
                .attr("stroke-width", forceProperties.link.enabled ? 1 : .5 )
                .attr("opacity", forceProperties.link.opacity  );

            this.node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("g")
                .data(this.nodes.ercot_da)
                .enter().append("g");

            this.node.append("circle")
                .attr("r", forceProperties.collide.radius)
                .attr("fill", function(d){
                    return forceProperties.collide.muiticolor==true?color(d.group) : "red";
                })
                // .attr("stroke", forceProperties.charge.strength > 0 ? "blue" : "red")
                .attr("stroke-width", forceProperties.charge.enabled == false ? 0 : Math.abs(forceProperties.charge.strength) / 15)
                .call(d3.drag()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended));

            this.node.append("title")
                .text(function (d) {
                    return d.pnodeid;
                });
            
            this.node.append("text")
                .text(function (d) {
                    return d.pnodeid;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", forceProperties.text.enabled == true ? forceProperties.text.size : 0)
                .attr('x', 6)
                .attr('y', 3);


            this.simulation.nodes(this.nodes.ercot_da);
            this.simulation
                .force("link", d3.forceLink())
                .force("charge", d3.forceManyBody())
                .force("collide", d3.forceCollide())
                .force("center", d3.forceCenter())
                .force("forceX", d3.forceX())
                .force("forceY", d3.forceY());
            this.simulation.force("center")
                .x(width * forceProperties.center.x)
                .y(height * forceProperties.center.y);
            this.simulation.force("charge")
                .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
                .distanceMin(forceProperties.charge.distanceMin)
                .distanceMax(forceProperties.charge.distanceMax);
            this.simulation.force("collide")
                .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
                .radius(forceProperties.collide.radius)
                .iterations(forceProperties.collide.iterations);
            this.simulation.force("forceX")
                .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
                .x(width * forceProperties.forceX.x);
            this.simulation.force("forceY")
                .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
                .y(height * forceProperties.forceY.y);
            this.simulation.force("link")
                .id(function (d) {
                    return d.pnodeid;
                })
                .distance(forceProperties.link.distance)
                .iterations(forceProperties.link.iterations)
                .links(forceProperties.link.enabled ? this.links : []);

            // updates ignored until this is run
            // restarts the simulation (important if simulation has already slowed down)
            this.simulation.alpha(1).restart();
            this.simulation.on("tick", this.ticked);
        },
     
        ticked() {
            // console.log("ticked");
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
            if (!d3.event.active) this.simulation.alphaTarget(0.0001);
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
