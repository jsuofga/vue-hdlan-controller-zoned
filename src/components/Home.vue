<template>
 <div class="home">

     <div class = "zone" >
          <div @click= "showZone(item,index)" class = "waves-effect waves-light roundBtn btn-large" v-for="(item,index) in zoneNamesToDisplay" :key="index">{{zoneNamesToDisplay[index]}}</div>
          <div @click= "switchAll" data-target="slide-out" class="waves-effect waves-light roundBtn btn-large sidenav-trigger">Select ALL</div>
    </div>
  
     <!-- Floating Action Button -->
    <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
            <small class = 'preset'>Presets</small>
            <!-- <i class="large material-icons">bookmark</i> -->
        </a>
        <ul>
            <li @click= 'switchPreset(1)'><a class="btn-floating red"><i class="material-icons">looks_one</i></a></li>
            <li @click= 'switchPreset(2)'><a class="btn-floating blue"><i class="material-icons">looks_two</i></a></li>
            <li @click= 'switchPreset(3)'><a class="btn-floating green darken-1"><i class="material-icons">looks_3</i></a></li>
        </ul>
    </div>

</div>

</template>

<script>
export default {
  name: 'Home',
  props: ['zoneNamesToDisplay'],
  data () {
    return {

    }
  },
  methods:{
         showZone(item,index){
           let zone = index+1
           this.$emit('msg-zoneSelected', {zoneId: index})
           this.$router.push({ name: `zone${zone}`})
        },
         switchAll(){
          this.$emit('msg-rxSelected', {rx:{rxId:'all'}})
         },
         switchPreset(preset){
            const serverURL = `${location.hostname}:1880`
            // Send API Command to NodeRed to do switching. 
            fetch(`http://${serverURL}/switchRX/UserPreset/${preset}`)
            .then(()=>{
                M.toast({ html: `Switch to Preset${preset}`, classes: "rounded blue" })
            })
            .catch(error => console.log(error)); 
         }
         
  },

  //Life Cycle Hooks
  mounted(){
       M.AutoInit() // For Materialize to work!

  }

}
</script>

<style scoped>
.home{
  display:flex;
  justify-content: center;
  width: 100%;
}
.zone{
    display: grid;
    grid-template-columns: repeat(4,auto);
    grid-column-gap: 50px;
    justify-content: center;
    align-items: center;
    height:100vh;
}
.roundBtn{
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
   border:5px solid white;
   font-size: 2rem;
   height:200px;
   width:200px;
   border-radius: 50%;
   background-color: rgb(28,28,30) ;
}
.roundBtn:hover {
  background-color:#2196f3 !important;
}

</style>
