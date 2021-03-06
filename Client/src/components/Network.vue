<template>
  <div id="network" :style="{width: svgSize.width +'px', height: svgSize.height+'px'}">
    <div
      class="linkText"
      :style="linkTextPosition"
      v-show="linkTextVisible"
      v-text="linkTextContent"
    ></div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="svgSize.width"
      :height="svgSize.height"
      :style="{'background-color': theme.bgcolor}"
      @click="clickEle"
      @mouseover.prevent="svgMouseover"
      @mouseout="svgMouseout"
    >
      <g id="container">
        <!-- links and link-text Note: draw edges first -->
        <g>
          <g v-for="link in links" :key="link.index">
            <line
              :class="`${link[linkTypeKey]} ${link.selected} link element`"
              :stroke="theme.linkStroke"
              :stroke-width="linkWidth"
            ></line>
            <!-- dx dy The coordinates of the lower left corner of the text -->
            <text
              v-if="showLinkText"
              dx="0"
              dy="0"
              class="link-text"
              :fill="theme.textFill"
              :font-size="linkTextFrontSize"
            >{{link[linkTextKey]}}</text>
          </g>
        </g>

        <!-- node and node-text -->
        <g id="node-group">
          <g v-for="node in nodes" :key="node.index">
            <circle
              :fill="nodeColor(node[nodeTypeKey])"
              :stroke-width="highlightNodes.indexOf(node.id) == -1? 3:10"
              :stroke="highlightNodes.indexOf(node.id) == -1? theme.nodeStroke: 'gold' "
              :class="`${node[nodeTypeKey]} ${node.showText?'selected' : ''} node element`"
              :r="nodeSize"
            ></circle>
            <text
              v-show="node.showText"
              :dx="nodeSize + 5"
              dy="0"
              class="node-text"
              :fill="theme.textFill"
              :font-size="nodeTextFontSize"
            >{{node[nodeTextKey]}}</text>
          </g>
          <g></g>
        </g>
      </g>
    </svg>
  </div>
  <!-- </div> -->
</template>

<script>
import * as d3 from "d3";
// import * as d3Force from 'd3-force'
// import * as d3Zoom from 'd3-zoom'
// import * as d3Scale from 'd3-scale'
// import * as d3Selection from 'd3-selection'
// import * as d3Drag from 'd3-drag'
// import * as d3ScaleChromatic from 'd3-scale-chromatic'

// import d3SelectionMulti from "d3-selection-multi";

// const d3 = Object.assign({}, d3Force, d3Zoom, d3Scale, d3Selection, d3Drag)

// Elemental classList 是 DOMTokenList
DOMTokenList.prototype.indexOf = Array.prototype.indexOf;

export default {
  name: "network",
  props: {
    nodeList: Array,
    linkList: Array,
    // node
    nodeSize: {
      type: Number,
      default: 14
    },
    nodeTextKey: {
      type: String,
      default: "id"
    },
    nodeTypeKey: {
      type: String,
      default: "group"
    },
    nodeTextFontSize: {
      type: Number,
      default: 14
    },
    // link
    linkWidth: {
      type: Number,
      default: 2
    },
    showLinkText: {
      type: Boolean,
      default: false
    },
    linkTextKey: {
      type: String,
      default: "value"
    },
    linkTypeKey: {
      type: String,
      default: "type"
    },
    linkTextFrontSize: {
      type: Number,
      default: 10
    },
    linkDistance: {
      type: Number,
      default: 50
    },
    // svg
    svgSize: {
      type: Object,
      default: () => {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    },
    svgTheme: {
      type: String,
      default: "light" // dark or light
    },
    bodyStrength: {
      type: Number,
      default: -150
    },
    // others
    highlightNodes: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      selection: {
        links: [],
        nodes: []
      },
      pinned: [], // 被订住的节点的下标
      force: null,
      zoom: d3.zoom(),
      nodeColor: d3.scaleOrdinal(d3.schemeCategory10),
      linkTextVisible: false,
      linkTextPosition: {
        top: 0,
        left: 0
      },
      linkTextContent: ""
    };
  },
  computed: {
    nodes() {
      // 去重
      let nodes = this.nodeList.slice();
      let nodeIds = [];
      nodes = nodes.filter(node => {
        if (nodeIds.indexOf(node.id) === -1) {
          nodeIds.push(node.id);
          return true;
        } else {
          return false;
        }
      });
      return nodes;
    },
    links() {
      return this.linkList;
    },
    theme() {
      if (this.svgTheme === "light") {
        return {
          bgcolor: "white",
          nodeStroke: "white",
          linkStroke: "lightgray",
          textFill: "black"
        };
      } else {
        // dark
        return {
          bgcolor: "black",
          nodeStroke: "white",
          linkStroke: "rgba(200,200,200)",
          textFill: "white"
        };
      }
    }
  },
  watch: {
    bodyStrength: function() {
      this.initData();
      this.$nextTick(function() {
        this.initDragTickZoom();
      });
    },
    linkDistance: function() {
      this.initData();
      this.$nextTick(function() {
        this.initDragTickZoom();
      });
    },
    nodes: function() {
      this.initData();
      this.$nextTick(function() {
        //The following function calls drag and drop on node again
        // Only useful after mounted
        // So use $nextTick 
        this.initDragTickZoom();
      });
    }
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initDragTickZoom();
  },
  methods: {
    initData() {
      this.force = d3
        .forceSimulation(this.nodes)
        .force(
          "link",
          d3
            .forceLink(this.links)
            .id(d => d.id)
            .distance(this.linkDistance)
        )
        .force("charge", d3.forceManyBody().strength(this.bodyStrength)) //The strength of the attraction or repulsion
        .force(
          "center",
          d3.forceCenter(this.svgSize.width / 2, this.svgSize.height / 2)
        );

      // console.log(this.nodes);
      // console.log(this.links);
    },
    initDragTickZoom() {
      // Add drag and drop to the node
      d3.selectAll(".node").call(this.drag(this.force));
      this.force.on("tick", () => {
        // Update connection coordinates
        d3.selectAll(".link")
          .data(this.links)
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
        // Update node coordinates
        d3.selectAll(".node")
          .data(this.nodes)
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
        // Update text coordinates
        d3.selectAll(".node-text")
          .data(this.nodes)
          .attr("x", d => d.x)
          .attr("y", d => d.y);
        d3.selectAll(".link-text")
          .data(this.links)
          .attr("x", d => (d.source.x + d.target.x) / 2)
          .attr("y", d => (d.source.y + d.target.y) / 2);
      });

      // initialization zoom
      this.zoom.scaleExtent([0.001, 100]).on("zoom", this.zoomed);

      d3.select("svg")
        .call(this.zoom)
        .on("dblclick.zoom", null);
    },
    clickLink(e) {
      this.$emit("clickLink", e, e.target.__data__);
    },
    clickNode(e) {
      if (this.pinned.length === 0) {
        this.pinnedState(e);
      } else {
        d3.selectAll(".element").style("opacity", 0.2);
        this.pinned = [];
      }
      this.$emit("clickNode", e, e.target.__data__);
    },
    clickEle(e) {
      if (e.target.tagName === "circle") {
        this.clickNode(e);
      } else if (e.target.tagName === "line") {
        this.clickLink(e);
      }
    },
    svgMouseover(e) {
      if (e.target.nodeName === "circle") {
        if (this.pinned.length === 0) {
          this.selectedState(e);
        }
        // Forced refresh
        this.$forceUpdate();
        this.$emit("hoverNode", e, e.target.__data__);
      } else if (e.target.nodeName === "line") {
        // this.linkTextPosition = {
        //   left: e.clientX + "px",
        //   top: e.clientY - 50 + "px"
        // };
        // this.linkTextContent = e.target.__data__[this.linkTextKey];
        // this.linkTextVisible = true;
        // this.$emit("hoverLink", e, e.target.__data__);
      }
    },
    svgMouseout(e) {
      this.linkTextVisible = false;
      if (e.target.nodeName === "circle") {
        if (this.pinned.length === 0) {
          this.noSelectedState(e);
        }
        // Forced refresh
        this.$forceUpdate();
      }
    },
    selectedState(e) {
      // The node itself displays text, adds selected class, and adds to selection
      e.target.__data__.showText = true;
      e.target.classList.add("selected");
      this.selection.nodes.push(e.target.__data__);
      // Surrounding nodes display text, edges and nodes add selected class and add to selection
      this.lightNeibor(e.target.__data__);
      // The transparency of other nodes except selected decreases
      d3.selectAll(".element").style("opacity", 0.2);
    },
    noSelectedState(e) {
      // The node itself does not display text, remove the selected class
      e.target.__data__.showText = false;
      // e.target.classList.remove("selected");
      // The surrounding nodes do not display text, edges and nodes Remove the selected class
      this.darkenNerbor();
      // Transparency restoration of all nodes
      d3.selectAll(".element").style("opacity", 1);
    },
    pinnedState(e) {
      this.pinned.push(e.target.__data__.index);
      d3.selectAll(".element").style("opacity", 0.05);
    },
    lightNeibor(node) {
      this.links.forEach(link => {
        if (link.source.index === node.index) {
          link.selected = "selected";
          this.selection.links.push(link);
          this.selection.nodes.push(link.target);
          this.lightNode(link.target);
        }
        if (link.target.index === node.index) {
          link.selected = "selected";
          this.selection.links.push(link);
          this.selection.nodes.push(link.source);
          this.lightNode(link.source);
        }
      });
    },
    lightNode(selectedNode) {
      this.nodes.forEach(node => {
        if (node.index === selectedNode.index) {
          node.showText = true;
        }
      });
    },
    darkenNerbor() {
      this.links.forEach(link => {
        this.selection.links.forEach(selectedLink => {
          if (selectedLink.id === link.id) {
            link.selected = "";
          }
        });
      });
      this.nodes.forEach(node => {
        this.selection.nodes.forEach(selectednode => {
          if (selectednode.id === node.id) {
            node.showText = false;
          }
        });
      });
      // 清空 selection
      this.selection.nodes = [];
      this.selection.links = [];
    },
    zoomed() {
      // Zooming: center on the mouse position
      d3.select("#container").attr(
        "transform",
        "translate(" +
          d3.event.transform.x +
          "," +
          d3.event.transform.y +
          ") scale(" +
          d3.event.transform.k +
          ")"
      );
    },
    drag(simulation) {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
  }
};
</script>

<style scoped>
svg {
  /* border-radius: 5px; */
}

.element {
  transition: opacity 0.5s ease;
}
.selected {
  opacity: 1 !important;
}
.node,
.link {
  cursor: pointer;
}
.linkText {
  position: absolute;
  z-index: 10;
  background-color: rgba(75, 75, 75, 0.596);
  border-radius: 10px;
  color: white;
  padding: 10px;
}
</style>

