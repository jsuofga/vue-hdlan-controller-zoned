<template>
  <div class = 'navbar'>

    <nav class="nav-extended">
        <div class="nav-wrapper">
            <div v-if = 'showZoneTitle' class="brand-logo center">{{zoneNames[zoneNumber]}}</div>
            <div v-else class="brand-logo center"><img src="@/assets/images/octava_logo_white-200.png"> </div>
            <ul class="hide-on-med-and-down">
                <li><a @click= "openModal1"><i class="material-icons">menu</i></a></li>
            </ul>
            <span class="right">HDLAN 111820 &nbsp;&nbsp;</span>
        </div>
    </nav>

    <!-- Modal Structure -->
    <div id="modal1" class="modal">
             <h5 class = 'center-align'>Power</h5>
             <div id = 'power'>
                <button @click= "PoE('on')" class="waves-effect waves-light btn green center-align">PoE On</button>
                <button @click= "PoE('off')" class="waves-effect waves-light btn red center-align">PoE Off</button>
             </div>

            <br>
            <h5 id='admin-settings-title' class = 'center-align'>Admin Access</h5>
            <div class="modal-content-admin">
                <label for="admin"></label>
                <i class="material-icons prefix blue-icon">persons</i>
                <input name="admin" v-model= "admin" placeholder="Enter admin password" type="text" required>
            </div>

            <div class="modal-footer">
                <a @click= "closeModal1" class="modal-close waves-effect waves-light btn red">Cancel</a>
                <a @click= "submit" class="modal-close waves-effect waves-light btn blue ">Submit</a>
            </div>
    </div>

    <div id="modal2" class="modal">
        <div class="modal-content-settings center-align">
            <ul class = "center-align">
                <router-link to="/ipaddress"><li @click= "closeModal2"><i class="material-icons blue-icon">settings_ethernet</i><span>Initialize Switch</span></li></router-link>
                <router-link to="/name-inputs"><li @click= "closeModal2"><i class="material-icons blue-icon">edit</i><span>Edit Video Inputs</span></li></router-link>
                <router-link to="/name-zones"><li @click= "closeModal2"><i class="material-icons blue-icon">edit</i><span>Edit Zones/Groups</span> </li></router-link>
                <router-link to="/name-outputs"><li @click= "closeModal2"><i class="material-icons blue-icon">edit</i><span>Edit Video Outputs</span></li></router-link>
                <li @click= "savePreset(1)" ><router-link to=""><i class="material-icons blue-icon"> save</i><span>Save to Preset 1</span></router-link></li>
                <li @click= "savePreset(2)" ><router-link to=""><i class="material-icons blue-icon">save</i><span>Save to Preset 2</span> </router-link></li>
                <li @click= "savePreset(3)" ><router-link to=""><i class="material-icons blue-icon">save</i><span>Save to Preset 3</span> </router-link></li>
            </ul>
        </div>
            <div class="modal-footer">
                <a id='cancelBtn' @click= "closeModal2" class="modal-close waves-effect waves-light btn red">Cancel</a>
               
            </div>
    </div>


</div>

</template>


<script>

export default {
    name: 'Navbar',
    props:['snmpStatus','zoneNames','zoneNumber'],
    data () {
        return {
            admin:'',
            showZoneTitle: false,
        }
    },
    watch:{
         $route: 'checkRoute'
    },
    methods:{
        checkRoute(){
            if(this.$route.name.includes('zone')){
                this.showZoneTitle = true
            }else{
                this.showZoneTitle = false
            }
        },
        PoE(on_off){
            const serverURL = `${location.hostname}:1880`
            // Send 
            fetch( `http://${serverURL}/poe/${on_off}`)
            .then(()=> {
                M.toast({ html: `PoE Power ${on_off}`, classes: "rounded blue" })
            })
            .catch(error => console.log(error));
        },
        openModal1(){
             this.modalInstance1.open();
             //console.log(this.$route)
        },
        closeModal1(){
            this.modalInstance1.close();
        },
        submit(){
            this.modalInstance1.close();
            if(this.admin =='octava'){
                this.admin = ''
                this.modalInstance2.open();
            }else{
                alert('No access')
            }
        },
        closeModal2(){
            this.modalInstance2.close();
        },
        goHome(){
            this.$router.push({ name: `home`})
        },
        savePreset(preset){
            const serverURL = `${location.hostname}:3000`
            let currentScene = {}
          
                // Save current scene 
                for(let i = 0; i < this.snmpStatus.rxCount; i++){
                currentScene[`tv${i+1}`] = this.snmpStatus.PortVlanMembership[i+this.snmpStatus.txCount] -1 // Example, tv1 = 1 (1, denotes source)
                }
           
               //Save to server
                fetch(`http://${serverURL}/write/Preset${preset}/${JSON.stringify(currentScene)}`)
                .then(()=>{
                    M.toast({ html: `Save to Preset${preset}`, classes: "rounded blue" })
                    this.closeModal2()
                })
                .catch(error => console.log(error));

            this.$router.push({ name: `zone1`})  //a hack. forces route to change to zone 1 ->home to force a re-read of server
            this.$router.push({ name: `home`})
        }

    },
    mounted(){
        M.AutoInit() // For Materialize to work!
    
        const modal1 = document.getElementById('modal1')
        this.modalInstance1 = M.Modal.init(modal1);

        const modal2 = document.getElementById('modal2')
        this.modalInstance2 = M.Modal.init(modal2);
    }

}
</script>

<style scoped>

    .nav-extended{
        background-color: rgb(28,28,30);
    }
    #power{
        display:flex;
        justify-content: center ;
        align-items: center ;
        margin-top:20px;
        border-bottom:1px solid  rgb(28,28,30); 
    }
    button{
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px
    }
 
    .blue-icon{
        color:#2196f3 !important;
        padding: 10px;
    }
    img{
        width: 100px;
        /* background-color: rgb(28,28,30); */
    }
    .modal{
        height:80vh;
 
    }
    .modal-content-admin {
        display:flex;
        flex-direction: row;
        justify-content: center ;
        align-items: center ;
        height:30vh
    }
     .modal-content-settings {
        display:flex;
        justify-content: center ;
        align-items: center ;
    
    }
    .modal-content-settings li{
        margin:10px;
        border:1px solid #2196f3 ;
        border-radius:8px ;
        padding-left:20px;
        padding-right:20px;
    }
    li:hover {
        background-color:lightskyblue
    }
    #cancelBtn{
        margin-right:25px
    }
    input[type=text]:focus{
     border-bottom: 1px solid #2196f3 !important ;
    }
</style>