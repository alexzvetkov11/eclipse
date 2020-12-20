<!-- d3 4.12.2 -->
<template>
    <mdb-container>
        <!-- <mdb-navbar 
          style="z-index: 0; box-shadow: 0 0 0 0 rgba(0,0,0,0.16), 0 0 0 0 rgba(0,0,0,0.12)"
          expand="large"
          dark
          :toggler="false"
        >
            <mdb-form-inline class="align-items-end">
                <mdb-input type="text" class="text-default" placeholder="Search" aria-label="Search" label navInput  />
            </mdb-form-inline> 
            <mdb-navbar-nav right class="nav-flex-icons text-dark">
                <mdb-nav-item href="#" color="red" active icon="facebook-f" fab/>
                <mdb-nav-item href="#" icon="instagram" fab/>
                <mdb-nav-item href="#" active icon="facebook-f" fab/>
                <mdb-nav-item href="#" icon="instagram" fab/>
                <mdb-nav-item href="#" active icon="facebook-f" fab/>
                <mdb-nav-item href="#" icon="instagram" fab/>
                <mdb-nav-item href="#" active icon="facebook-f" fab/>
                <mdb-nav-item href="#" icon="instagram" fab/>
            </mdb-navbar-nav>

            <form data-v-ad4a49de="" data-v-aae30ed8="" class="align-items-end form-inline" data-v-2b9910e1="">
                <div data-v-bcf4a656="" data-v-aae30ed8="" class="text-default md-form" data-v-ad4a49de="">
                    <input data-v-bcf4a656=""  style="border-bottom-color:#000" type="text" placeholder="Search" value="" aria-label="Search" class="form-control text-dark change">
                </div>
            </form>
            <ul data-v-1c8503c4="" data-v-aae30ed8="" class="nav-flex-icons text-dark navbar-nav ml-auto" data-v-2b9910e1="">
                <li data-v-5bd92072="" data-v-aae30ed8="" class="nav-item ripple-parent" data-v-1c8503c4="" color="red">
                    <a data-v-5bd92072="" href="#" class="nav-link navbar-link active" style="color:red" >
                        <i data-v-c77fa86a="" data-v-5bd92072="" class="fab fa-facebook-f text-"></i>
                        <span data-v-5bd92072="" class="clearfix d-none d-sm-inline-block"></span>
                    </a>
                </li>
            </ul>
        </mdb-navbar>-->
        <mdb-row class="justify-content-between mt-3 mb-0">
            <mdb-col col="3">
                <mdb-input label="Search" type="text" class="active-cyan-2 active-purple-2 mt-0 mb-3" />
                <!-- <mdb-input type="text" placeholder="Search" class="col-3" /> -->
            </mdb-col>
            <mdb-col col="6">
                <mdb-btn-group sm class="mr-2">
                    <div @click="map"><mdb-badge color="white" class="mr-1" style="font-size:60%"><mdb-icon icon="map-marker-alt" style="color:#616161;" size="2x" /></mdb-badge></div>
                    <div @click="zoomin"><mdb-badge color="white" style="font-size:60%; border-top-left-radius:20px; border-bottom-left-radius: 20px;" class="mr"><mdb-icon icon="search-plus" style="color:#616161;" size="2x"/></mdb-badge></div>
                    <div @click="zoomout"><mdb-badge color="white" style="font-size:60%; border-top-right-radius:20px; border-bottom-right-radius: 20px;" class="mr-1"><mdb-icon icon="search-minus" style="color:#616161;" size="2x"/></mdb-badge></div>
                    <div @click="bookmarknode"><mdb-badge color="white" class="mr-1" style="font-size:60%;"><mdb-icon icon="bookmark" style="color:#616161;" size="2x"/></mdb-badge></div>
                    <div @click="bookmarkpath"><mdb-badge color="white" class="mr-1" style="font-size:60%;"><mdb-icon far icon="bookmark" style="color:#616161;" size="2x"/></mdb-badge></div>
                    <div @click="timing"><mdb-badge color="white" class="mr-1" style="font-size:60%;"><mdb-icon icon="clock" style="color:#616161;" size="2x"/></mdb-badge></div>
                    <div @click="calendar"><mdb-badge color="white" class="mr-1" style="font-size:60%;"><mdb-icon icon="calendar-alt" style="color:#616161;" size="2x"/></mdb-badge></div>
                    <div @click="searchright"><mdb-badge color="white"> 
                        <input class="form-control" style="height:20px; font-size: 12px;" type="text" placeholder="Search" aria-label="Search"/>
                    </mdb-badge></div>
                </mdb-btn-group>
            </mdb-col>
          
        </mdb-row> 
        
        <mdb-view >
            <mdb-container>
                <mdb-row>
                    <mdb-col col="9">                    
                        <svg id='svg' width="1000" height="800"></svg>
                    </mdb-col>
                    <mdb-col col="3">
                        <br/><br/><br/><br/>
                        <mdb-card>
                            <mdb-card-image src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%286%29.jpg" alt="Card image cap"></mdb-card-image>
                            <mdb-card-body>
                                <mdb-card-title>{{showcard.name}}</mdb-card-title>
                                <mdb-card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</mdb-card-text>
                                <!-- <mdb-btn color="primary">Button</mdb-btn> -->
                            </mdb-card-body>
                        </mdb-card>
                    </mdb-col>
                </mdb-row>
            </mdb-container>
        </mdb-view>
    </mdb-container>

</template>

<script>
  import { mdbContainer,
    mdbView,
    mdbInput,
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbBtnGroup,
    mdbBadge,

    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    // mdbBtn,

  } from 'mdbvue';
  import * as d3 from "d3";
  import graph from "../data/miserables.json";
  export default {
    name: 'dashboard',
    data(){
      return{
          showcard: {
              show: false,
              name:"",
          },
          selected:false,
      }
    },
    mounted(){
      this.showChat();
    },
    methods:{
        showChat(){
            const v=this;
            const svg = d3.select("svg");
            const width = svg.attr("width");
            const height = svg.attr("height");

            const color = d3.scaleOrdinal(d3.schemeCategory20);
            this.simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d) {
                    return d.id;
                }))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2));
            this.link = svg.append("g")
                    .attr("class", "links")
                    .selectAll("line")
                    .data(graph.links)
                    .enter().append("line")
                    .attr("stroke","#999")
                    .attr("stroke-width", function(d) {
                        return Math.sqrt(d.value);
                    })
                    .on('mouseover', function(){
                        v.showcard={
                            show:true,
                            name:"lines",
                        };
                        
                    })
                    .on("mouseout", function(){
                        v.showcard= {
                            show:false,
                            name:"lines",
                        };
                    });
            this.node = svg.append("g")
                    .attr("class", "nodes")
                    .on('mouseover', function() {
                        v.showcard={
                            show:true,
                            name:"nodes",
                        };
                    })
                    .on('mouseout', function(){
                        v.showcard={
                            show:false,
                            name:"nodes",
                        };
                    })
                    .selectAll("g")
                    .data(graph.nodes)
                    .enter().append("g");
            this.node.append("circle")
                .attr("r", 5)
                .attr("fill", function(d) {
                    return color(d.group);
                })
                .attr("stroke-width", "1.5px")
                .call(d3.drag()
                    .on("start", this.dragstarted)
                    .on("drag", this.dragged)
                    .on("end", this.dragended));

            this.node.append("text")
                .text(function(d) {
                    return d.id;
                })
                .attr("font-family","sans-serif")
                .attr("font-size", "10px")
                .attr('x', 6)
                .attr('y', 3);

            this.node.append("title")
                .text(function(d) {
                    return d.id;
                });

            this.simulation
                .nodes(graph.nodes)
                .on("tick", this.ticked);

            this.simulation.force("link")
                .links(graph.links);
        },
        ticked() {
                this.link
                    .attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });

                this.node
                    .attr("transform", function(d) {
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


        map(){
            this.$swal("success", "map", "success");
        },
        zoomin(){
            this.$swal("success", "zoomin", "success");
        },
        zoomout(){
            this.$swal("success", "zoomout", "success");
        },
        bookmarknode(){
            this.$swal("success", "bookmarknode", "success");
        },
        bookmarkpath(){
            this.$swal("success", "bookmarkpath", "success");
        },
        timing(){
            this.$swal("success", "timing", "success");
        },
        calendar(){
            this.$swal("success", "calendar", "success");
        },
        searchright(){
            this.$swal("success", "searchright", "success");
        },
    },
   
    components: {
        mdbContainer,
        mdbView,
        mdbInput,
        mdbRow,
        mdbCol,
        mdbIcon,
        mdbBtnGroup,
        mdbBadge,

        mdbCard,
        mdbCardImage,
        mdbCardBody,
        mdbCardTitle,
        mdbCardText,
        // mdbBtn,
    }
  }
</script>


<style scoped>
</style>

