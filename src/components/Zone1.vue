<template>

  <div class="zone1">

        <div class = 'grid-container'>

            <div v-for="(item, index) in tvsInZone" :key="index" class='grid-item'>
              <div data-target="slide-out" @click= "emitMsg(item)" class="btn-large sidenav-trigger" style= 'color:black'>{{item.name}}<span>{{item.rxId}}</span></div>
              <div class = 'feedbackRX'>{{sourceNames[snmpStatus.PortVlanMembership[item.rxId-1+snmpStatus.txCount] -2]}}</div>

            </div>
        </div>

        <!-- Floating Action Button -->
          <div class="fixed-action-btn">
              <a class="btn-floating btn-large blue">
                <router-link to="/"><i class="large material-icons">home</i></router-link>
              </a>
          </div>
  </div>
</template>

<script>

export default {
  name: 'Zone1',
  props:['snmpStatus','zoneNames','tvNames','tvNamesZones','zones','sourceNames'],
  data () {
    return {
      zone: 1      // Enter Zone here
    }
  },
  computed:{
      tvsInZone: function(){
         // Filter all the TVs that are in Zone
         this.zoneTVs = this.tvNamesZones.filter((item,index) => item.zoneId == this.zone )
         console.log(this.zoneTVs)
         return (this.zoneTVs)
      }
  },
  methods:{
    emitMsg(item){
        this.$emit('msg-rxSelected', {rx:item})
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.zone1{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100vh;
  /* border:1px solid orange; */
}
.grid-container {
  color:white;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-content: center;
  align-items: center ;
  grid-gap: 10px;
  width:90%;
  height:100vh;
  /* border:1px solid red */
}
.grid-item{
  display:flex;
  flex-direction: column;
  align-items: center;
  /* border:1px solid green; */
}
.btn-large{
  background-color:white;
  border-radius: 4px;
  position:relative;
}
span{
  position:absolute;
  color:grey;
  bottom:-15px;
  right:1px;
  transform: scale(.7);
}
.btn-large:hover{
  background-color:#2196f3  !important ;
  color:white !important;
}

</style>