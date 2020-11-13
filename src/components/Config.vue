<template>

  <div class="config">

    <ul id="slide-out2" class="sidenav2">
        <li><a>Settings</a></li>
       
        
        <li><div class="divider"></div></li>
        <!-- <li  @click= "emitMsg(item)" v-for="(item, index) in videoIn" :key="index"><a class="waves-effect" href="#!"><i class="material-icons" >input</i>Video {{item}}</a></li> -->
        <li><a class="waves-effect" href="#!"><i class="material-icons" >Settings</i>Network Switch Setting</a></li>

    
    </ul>
 <!-- <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>  -->

  </div>
</template>

<script>

export default {
  name: 'Config',
 
  data () {
    return {
        
    }
  },

  props:{},

  methods:{
 
  },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>