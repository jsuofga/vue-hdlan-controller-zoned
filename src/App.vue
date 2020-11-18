<template>
  <div id="app">
    <Navbar v-bind:snmpStatus= "snmpStatus" 
        v-bind:zoneNames = "zoneNames" 
        v-bind:zoneNumber = "zoneNumber" 
    />
    <Sidenav @msg-txSelected= "tx" v-bind:rxSelected= "rxSelected" v-bind:sourceNames= "sourceNames" /> 
    <router-view 
        @msg-switchIp= "switchIp"
        @msg-rxSelected= "rx" 
        @msg-zoneSelected= "zoneSelected" 
        @msg-sourceNamesUpdated= "sourceNamesUpdated"
        @msg-tvNamesZonesUpdated= "tvNamesZonesUpdated" 
        v-bind:zones = "zones"  
        v-bind:zonesId = "zonesId" 
        v-bind:zoneNames = "zoneNames"  
        v-bind:zoneNamesToDisplay = "zoneNamesToDisplay"  
        v-bind:sourceNames = "sourceNames" 
        v-bind:tvNames = "tvNames" 
        v-bind:tvNamesZones = "tvNamesZones" 
        v-bind:snmpStatus= "snmpStatus" 
        v-bind:switchIpAddress= "switchIpAddress"
        v-bind:userPresetsExist= "userPresetsExist"
    />
    <Status @msg-status= "status" @msg-sourceNamesUpdated= "sourceNamesUpdated" @msg-tvNamesZonesUpdated= "tvNamesZonesUpdated"/>

  </div>
</template>

<script>

import M from 'materialize-css'
import Sidenav from '@/components/Sidenav'
import Navbar from '@/components/Navbar'
import Home from '@/components/Home'
import Zone1 from '@/components/Zone1'
import Zone2 from '@/components/Zone2'
import Zone3 from '@/components/Zone3'
import Zone4 from '@/components/Zone4'
import Config from '@/components/Config'
import Ipaddress from '@/components/Ipaddress'
import Status from '@/components/Status'
import Name_inputs from '@/components/Name_inputs'
import Name_outputs from '@/components/Name_outputs'
import Dashboard from "@/components/Dashboard";

export default {
  name: 'App',
  components:{
    Navbar,
    Home,
    Sidenav,
    Zone1,
    Zone2,
    Zone3,
    Zone4,
    Config,
    Ipaddress,
    Status,
    Name_inputs,
    Name_outputs,
    Dashboard

  },
  watch:{
     //$route:'get_tvZoneAssignment'
       $route:'readFromSever'
  },
  data () {
    return {
     rxSelected : '',
     txSelected :'',
     switchIpAddress: '',
     serverIpAddress: '',
     snmpStatus:{},
     sourceNames:[],
     tvNamesZones:[],
     tvNames:[],     
     zoneNames:[],  // complete list of zone names created
     zones:[],      //zone that each RX is assigned to
     zonesId:[],
     zoneNamesToDisplay: [],  //zone names that are actually assigned to tv
     zoneNumber: '', // zone selected 0-xxx to show on Navbar Title
     userPresetsExist:[false,false,false] // [userPreset1,userPreset2.userPreset3 ] true / false
    }
},

  methods:{
    rx(payload){
      console.log('RX selected =', payload)
      this.rxSelected = payload.rx
    },
    tx(payload){
      console.log('TX selected =', payload)
      this.txSelected = payload.tx
    },
    switchIp(payload){
      // console.log('Switch IP Address =', payload.switchIp)
      this.switchIpAddress = payload.switchIp
    
    },
    status(payload){
       console.log('status  =', payload)
       this.snmpStatus = payload
       this.serverIpAddress = payload.NodeRedIPAddress 
       console.log('ip  =', this.serverIpAddress)
    },
    sourceNamesUpdated(payload){
      //  console.log('sourceNames  =', payload)
      //  this.sourceNames = payload
    },
    tvNamesZonesUpdated(payload){
      //  console.log('tvNamesZones =', payload)
      //  this.tvNamesZones = payload
    },
    zoneSelected(payload){
      this.zoneNumber = payload.zoneId
    },
    readFromSever(){
        console.log('route changed')
        this.get_zoneNames()
        this.get_tvZoneAssignment()
        this.get_sourceNames()
        this.get_UserPresets()
    },
    get_zoneNames(){
         const serverURL = `${location.hostname}:3000`
         this.zoneNames=[]
        // Read from Server
          fetch(`http://${serverURL}/read/UserZoneNames`, {method: 'GET',})
          .then(response => response.json())
          .then(result => {
             //console.log('ZoneNames Success:', result);
             let item;
             for( item in result){
               this.zoneNames.push(result[item])
             }
              console.log('Zone names = ',this.zoneNames)
          })
          .catch(error => {
            console.error('Error:', error);
          });

    },
    get_tvZoneAssignment(){
        const serverURL = `${location.hostname}:3000`
        this.zones = [],
        this.zonesId = [],
        this.zoneNamesToDisplay = []
        this.tvNamesZones =[]
        this.tvNames = []
       
      // Read from Server
        fetch(`http://${serverURL}/read/UserTvNames`, {method: 'GET',})
        .then(response => response.json())
        .then(result => {
          console.log('Success:', result);
            let item;
            for( item in result){
              this.zones.push(result[item].zone)
              this.zonesId.push(result[item].zoneId)
              this.tvNames.push(result[item].name)
              this.tvNamesZones.push(result[item])
            }
            
            // Remove duplicates from zones to create unique set
            // this.zoneNamesToDisplay = [...new Set(this.zones)]
            this.zoneNamesToDisplay = [...new Set(this.zones)]
            console.log( this.zones)
            console.log( this.zonesId)
            console.log( this.zoneNamesToDisplay)
            console.log( this.tvNamesZones)
            console.log( this.tvNames)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    get_sourceNames(){
        this.sourceNames = []
        const serverURL = `${location.hostname}:3000`
        // Read from Server
          fetch(`http://${serverURL}/read/UserInputNames`, {method: 'GET',})
          .then(response => response.json())
          .then(result => {
            console.log('Success:', result);
             let item;
             for( item in result){
               //console.log(item)
               //console.log(result[item])
               this.sourceNames.push(result[item])
             }
              console.log(this.sourceNames)
          })
          .catch(error => {
            console.error('Error:', error);
          });
         
    },
    get_UserPresets(){
      const serverURL = location.hostname
      //Check if User Preset exist.
      // Check if Presets1,2,3 were created by user.
            for(let i=0;i<=2;i++){
                fetch(`http://${serverURL}:3000/read/UserPreset${i+1}`,{method: 'GET',})
                .then(response => response.json())
                .then(result => {
                  // console.log('Success:', result);
                  //Check if Preset1,2,3 is empty.
                  if(Object.keys(result).length == 0){
                    this.userPresetsExist[i] = false

                  //Preset exist
                  }else{
                    this.userPresetsExist[i] = true
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                });

            }
            //console.log('UserPresets Exist:', this.userPresetsExist)
    }

  },

  //Lifecycle Hooks
  mounted () {

    M.AutoInit() //Materialize Init
   
    this.readFromSever()

  },
}

</script>

<style>
#app {
  background-color: #2c3e50;
  /* box-sizing: border-box;  */

}
</style>
