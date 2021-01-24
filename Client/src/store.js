import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        graph: {
            nodes: [],
            links: [],
        },
    },
    getters: {
        getGraphNodes: state => state.graph.nodes,
        getGraphLinks: state => state.graph.links,
    },
    mutations: {
        // setInfo: (state, { nodes }) => {
        //     state.graph.nodes = nodes;
        //     console.log("store: ", state.graph.nodes.ercot_da[0]);
        // },
        setInfo: (state, { nodes, links }) => {
            state.graph.nodes = nodes;
            state.graph.links = links;
        }
    },
    actions: {
        setNodeAndLinks({ commit }, { nodes, links }) {
            commit("setInfo", { nodes, links });
        },
    }
})