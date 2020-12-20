<template>
    <div id="chart_title">
        <label>
            <input v-model="message" placeholder="Insert the chart title" v-bind:class="[ {'is-collapsed' : collapsed }, 'inputHide' ]" type="text">
        </label>
        <h2>
          {{ message }} 
          <button class="hideshow" v-on:click=" collapsed = !collapsed">
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </h2>
    </div>
</template>
<script>
export default {
    name: "Charttitle",
    data(){
        return { 
            message: 'TABLE TITLE',
            collapsed: true,
        }
    }
}
</script>

