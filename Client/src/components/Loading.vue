<template>
  <div class="video-background-page">
    <mdb-view>
      <video class="video-intro" poster="https://mdbootstrap.com/img/Photos/Others/background.jpg" playsInline autoPlay muted="" loop>
        <source src="../assets/1.mp4" type="video/mp4"/>
      </video>
      <mdb-mask class="d-flex align-items-center gradient">
        <mdb-container class="px-md-3 px-sm-0">
          <mdb-row>
            <mdb-col md="12" class="mt-5 white-text offset-1" style="text-align: left">
              <br/><br/><br/><br/><br/><br/>
              <h3 id='txt' class="display-4 font-weight-bold mb-0 pt-md-5">Loading </h3>
              <!-- <hr class="hr-light my-4 w-75"/> -->
              <br/>
              <mdb-row><mdb-col md="4">
                <!-- <mdb-progress bgColor="primary-color-dark" indeterminate   /> -->
                <div class="loader" >
                  <div class="loaderBar"></div>
                </div>
              </mdb-col></mdb-row>
            </mdb-col>
          </mdb-row>
        </mdb-container>
      </mdb-mask>
    </mdb-view>
  </div>
</template>

<script>
import {  
  // mdbProgress, 
mdbMask,   mdbView, mdbContainer,  mdbRow, mdbCol} from 'mdbvue';
// import axios from "axios";
export default {
  name: 'Loading',
  components: {
    mdbView,
    mdbMask,
    // mdbProgress,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
  mounted () {
    var v=this;
    setTimeout(function() {
      if ( localStorage.getItem("role")=="admin")
        v.$router.replace("/admin");
      else v.$router.push('/dashboard');

    }, 3000);
  },
  data() {
    return {
      showModal: false,
      showModalContact: false,
      message: "",
      contactmessage:"",

      login: {
          username: "",
          password: ""
      },
      contact:{
        username: "",
        email: "",
        subject: "",
        yourmsg: ""
      }
    }
  },
  
  methods:{
  
  }

};
</script>





<style scoped>
@keyframes borealisBar {
  0% {
    left:0%;
    right:20%;
    width:0%;
  }
  20% {
    left:0%;
    right:20%;
    width:30%;
  }
/*   
  50% {
    left:30%;
    right:30%;
    width:50%;
  } */
  
  80% {
    left:70%;
    right:100%;
    width:30%;
  } 
  100% {
    left:100%;
    right:100%;
    width:0%;
  } 

}
.video-background-page .view video {
  top: 0!important;
  left: 0!important;
  transform: none!important;
  height: calc(100vh );
  background-color: #f6e0a2;
}

.video-background-page .navbar {
  transition: background .5s ease-in-out,padding .5s ease-in-out;
}

.top-nav-collapse {
  background-color: #563e91 !important;
}


.loader { 
  /* width:500px;  */
  margin:0 auto;
  border-radius:10px;
  border:4px solid transparent;
  position:relative;
  padding:1px;
}
.loader:before {
  content:'';
  border:1px solid #fff; 
  border-radius:10px;
  position:absolute;
  top:-4px; 
  right:-4px; 
  bottom:-4px; 
  left:-4px;
}
.loader .loaderBar { 
  position:absolute;
  border-radius:10px;
  top:0;
  right:100%;
  bottom:0;
  left:0;
  background:#fff; 
  width:0;
  animation:borealisBar 1s linear infinite;
}
</style>