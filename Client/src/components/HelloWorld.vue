<template>
    <video-background :src="require('../assets/background.mp4')" poster="../assets/background.png" style="max-height: 100%; height: 100vh;">
        <mdb-navbar navStyle="margin-top: 60px" :color="'primary'" position="top" dark href="#" transparent scrolling>
            <mdb-navbar-brand href="#"><strong>Eclipse</strong></mdb-navbar-brand>
            <mdb-navbar-toggler style="max-width: 1140px">
                <mdb-navbar-nav>
                    <mdb-nav-item @click.native="showModalContact=true; contactmessage='';" waves-fixed class="red-text"><strong> Contact </strong></mdb-nav-item>
                    <mdb-nav-item @click.native="showModalAbout=true;" waves-fixed><strong> About</strong></mdb-nav-item>
                </mdb-navbar-nav>
            </mdb-navbar-toggler>
        </mdb-navbar>

        <!-- <mdb-container style="height:100vh"> -->
              
                  <mdb-container class="px-md-3 px-sm-0 d-flex h-100" style="height:100vh">
                      <mdb-row class="justify-content-center align-self-center">
                          <mdb-col md="12" class="mt-5 white-text offset-1 " :style="{'text-align': 'left'}">
                              <br /><br /><br /><br /><br /><br />
                              <h3 class="display-4 font-weight-bold mb-0 pt-md-5">Project Eclipse </h3>
                              <br />

                              <!-- <mdb-btn @click.native="showModal = true; message='';login.username='';login.password='';  " outline="white" rounded color="white"> -->
                                <mdb-btn @click.native="showModal = true; message='';" outline="white" rounded color="white">
                                  <mdb-icon icon="place-of-worship" /> Launch
                              </mdb-btn>
                              <form v-on:submit.prevent="asyncLogin">
                                  <mdb-modal :show="showModal" @close="showModal = false" cascade class="text-left">
                                      <mdb-modal-header class="primary-color white-text">
                                          <h4 class="title">
                                              <mdb-icon icon="pencil-alt" /> Login </h4>
                                      </mdb-modal-header>
                                      <mdb-modal-body class="grey-text">
                                          <mdb-input size="sm" v-model="login.username" label="Your name" icon="user" group type="text" required invalidFeedback="Invalid Username." error="wrong" success="right" />
                                          <mdb-input size="sm" v-model="login.password" label="Your password" icon="lock" group type="password" required invalidFeedback="Invalid Password." error="wrong" success="right" />
                                          <!-- <mdb-input size="sm" label="Subject" icon="tag" group type="text" validate error="wrong" success="right"/> -->
                                          <!-- <mdb-input  size="sm" :rows="2" :show="message.length>0" label="Your message" /> -->
                                          <div style="color:#f36371 " class="text-center"> <strong>{{message}} </strong></div>
                                      </mdb-modal-body>
                                      <mdb-modal-footer>
                                          <mdb-btn type="submit" class="text-white">Login</mdb-btn>
                                      </mdb-modal-footer>
                                  </mdb-modal>
                              </form>

                              <form v-on:submit.prevent="asyncContact">
                                  <mdb-modal :show="showModalContact" @close="showModalContact = false" cascade class="text-left">
                                      <mdb-modal-header class="primary-color white-text">
                                          <h4 class="title">
                                              <mdb-icon icon="paper-plane" /> Contact Us </h4>
                                      </mdb-modal-header>
                                      <mdb-modal-body class="grey-text">
                                          <mdb-input label="Your name" icon="user" group type="text" required validate error="wrong" success="right" />
                                          <mdb-input label="Your email" icon="envelope" group type="email" required validate error="wrong" success="right" />
                                          <mdb-input label="Subject" icon="tag" group type="text" required validate error="wrong" success="right" />
                                          <mdb-textarea :rows="2" label="Your message" icon="pencil-alt" />
                                          <div style="color:#f36371 " class="text-center"> <strong>{{contactmessage}} </strong></div>
                                      </mdb-modal-body>
                                      <mdb-modal-footer>
                                          <mdb-btn type="submit" class="text-white" rounded color="green">Send
                                              <mdb-icon far icon="paper-plane" class="ml-1" />
                                          </mdb-btn>
                                      </mdb-modal-footer>
                                  </mdb-modal>
                              </form>

                              <mdb-modal :show="showModalAbout" @close="showModalAbout = false" showModalAbout size="lg">
                                  <mdb-modal-header class="text-center black-text">
                                      <mdb-modal-title tag="h3" bold class="w-100 my-3">About us</mdb-modal-title>
                                  </mdb-modal-header>
                                  <mdb-modal-body class="mx-3 black-text">
                                      <mdb-container>
                                          <section class="demo-section pad1">
                                              <section>
                                                  <mdb-carousel :interval="4000" slide :items="intervalCarousel"></mdb-carousel>
                                              </section>
                                          </section>
                                          <mdb-row>

                                              <mdb-col class="ml-5 mr-5">
                                                  <br />
                                                  <h2 class="text-center"> Hello. How are you? Congratulation Your Christmas Holiday </h2>
                                                  <p>Ghukra is a leather bag and accessory company,
                                                      and their About Us page goes above and beyond.
                                                      Not only do they have the standard company history,
                                                      but they also include the history of the Ghurka soldiers they're named after,
                                                      a detailed dissection of their logo and in-depth information about their manufacturing.
                                                      Of course, not every store calls for such a robust About Us, but since this company's inspiration is steeped in Himalayan history,
                                                      this is an instance where it works very well.</p>
                                              </mdb-col>
                                          </mdb-row>
                                      </mdb-container>
                                  </mdb-modal-body>
                                  <mdb-modal-footer class="mx-5 pt-3 mb-1" end>
                                      <p class="font-small grey-text">Not a member? </p>
                                  </mdb-modal-footer>
                              </mdb-modal>

                          </mdb-col>
                      </mdb-row>
                  </mdb-container>
         <!-- </mdb-container> -->
    </video-background>
</template>

<script>
import {
    mdbModalTitle,
    mdbCarousel,
    mdbModal,
    mdbTextarea,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    mdbNavbar,
    // mdbMask,
    mdbBtn,
    mdbNavbarToggler,
    mdbIcon,
    mdbNavbarBrand,
    // mdbView,
    mdbNavbarNav,
    mdbNavItem,
    mdbContainer,
    mdbRow,
    mdbCol
} from 'mdbvue';
import axios from "axios";
import VideoBackground from 'vue-responsive-video-background-player';
export default {
    name: 'HelloWorld',
    components: {
        // mdbView,
        // mdbMask,
        mdbBtn,
        mdbIcon,
        mdbNavbarBrand,
        mdbNavbarToggler,
        mdbNavbar,
        mdbNavbarNav,
        mdbNavItem,
        mdbContainer,
        mdbRow,
        mdbCol,
        mdbInput,
        mdbModal,
        mdbModalHeader,
        mdbModalBody,
        mdbModalFooter,
        mdbTextarea,
        mdbCarousel,
        mdbModalTitle,
        VideoBackground,
    },
    data() {
        return {
            showModal: false,
            showModalContact: false,
            showModalAbout: false,

            message: "",
            contactmessage: "",

            login: {
                username: "test",
                password: "test1234"
            },
            contact: {
                username: "",
                email: "",
                subject: "",
                yourmsg: ""
            },

            carousel: 0,
            carouselWithLoader: 0,
            multi: 2,
            intervalCarousel: [{
                    img: true,
                    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg",
                    mask: "black-light",
                    alt: "First Slide"
                },
                {
                    img: true,
                    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg",
                    mask: "black-strong"
                },
                {
                    img: true,
                    src: "https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg",
                    mask: "black-slight"
                }
            ],
        }
    },
    mounted() {
        // localStorage.removeItem("jwt");
        // localStorage.removeItem("role");
    },
    methods: {
        asyncLogin(e) {
            e.preventDefault();
            // this.$swal("Success", "ok", "success");
            if (this.login.username != "" && this.login.password != "") {
                axios.post("http://localhost:4000/login", this.login)
                    .then(res => {
                        let token = res.data.token;
                        if (token) {
                            var permission  = res.data.user.permission;
                            localStorage.setItem("jwt", token);
                            localStorage.setItem("role", permission);
                            if (permission == "admin"){
                                this.$router.replace("/admin").catch(()=>{});
                            } else{
                                this.$router.replace("/loading").catch(() => {});
                            }
                        } else {
                            this.message = res.data.msg;
                            this.login.password = "";
                        }
                    }).catch(error => {
                        this.message = error.message;
                        console.log(error);
                    })
                    .finally(() => {
                        this.login.password = "";
                    });
            } else {
                console.log("A username and password must be present");
            }
            return false;
        },
        asyncContact(e) {
            e.preventDefault();
            this.showModalContact = false;
        }
    }

};
</script>

<style scoped>
/* .video-background-page .gradient {
    background: -moz-linear-gradient(45deg, rgba(213, 15, 61, 0.6), rgba(13, 17, 198, 0.69) 100%);
    background: -webkit-linear-gradient(45deg, rgba(213, 15, 61, 0.6), rgba(13, 17, 198, 0.69) 100%);
    background: linear-gradient(45deg, rgba(213, 15, 61, 0.6), rgba(13, 17, 198, 0.69) 100%);
} */

.video-background-page .view video {
    top: 0 !important;
    left: 0 !important;
    transform: none !important;
    height: calc(100vh);
    background-color: #f6e0a2;
}

.video-background-page .navbar {
    transition: background .5s ease-in-out, padding .5s ease-in-out;
}

.top-nav-collapse {
    background-color: #563e91 !important;
}
</style>
